import {
  DatabaseLogTransformer,
  LogWriter
} from '../../../../helpers/log'

import {
  TaskRun,
  TaskRunner,
  getConnection
} from '@scola/lib'

import { Log } from '../../../../entities'
import { Transform } from 'stream'

interface Payload {
  aggregated: Log
}

export function month (): void {
  const runner = new TaskRunner({
    name: 'aggregate-organisation-month'
  })

  const processor = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      getConnection('local')
        .createQueryBuilder()
        .select('id')
        .addSelect('"energy.e.pv.in.month"', 'name')
        .addSelect(
          'UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-1")) * 1000',
          'timestamp'
        )
        .addSelect('SUM(value)', 'value')
        .from('organisation_0000.organisation_log', 'organisation_log')
        .where('id = :organisation_id', run.item.payload)
        .andWhere('name = "energy.e.pv.in.day"')
        .andWhere('timestamp >= :value', run.item.payload.aggregated)
        .orderBy('timestamp', 'ASC')
        .groupBy('UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-1")) * 1000')
        .stream()
        .then((reader) => {
          const transformer = new DatabaseLogTransformer()

          const writer = new LogWriter<Log>({
            table: 'organisation_0000.organisation_log'
          })

          reader.once('error', (error) => {
            run.code = 'err_reader'
            run.reason = error.message
            callback(null, run)
          })

          transformer.once('error', (error) => {
            run.code = 'err_transformer'
            run.reason = error.message
            callback(null, run)
          })

          writer.once('error', (error) => {
            run.code = 'err_writer'
            run.reason = error.message
            callback(null, run)
          })

          writer.once('finish', () => {
            callback(null, run)
          })

          reader
            .pipe(transformer)
            .pipe(writer)
        })
        .catch((error: Error) => {
          run.code = 'err_reader'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  const selector = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      getConnection('local')
        .createQueryBuilder()
        .select('value')
        .from('location_0000.location_log', 'location_log')
        .where('id = :location_id', run.item.payload)
        .andWhere('name = "energy.e.pv.in.aggregated"')
        .execute()
        .then(([aggregated]: (Log | undefined)[]) => {
          run.item.payload.aggregated = aggregated ?? {
            id: 0,
            name: '',
            offset: 0,
            timestamp: '0',
            value: '0'
          }
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_selector'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  runner
    .pipe(selector)
    .pipe(processor)
    .pipe(runner)
    .start()
}
