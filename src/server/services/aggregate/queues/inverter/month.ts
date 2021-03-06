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
  lastLog: Log
}

export function month (): void {
  const runner = new TaskRunner({
    name: 'aggregate-inverter-month'
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
        .addSelect('"energy.e.pv.out.month"', 'name')
        .addSelect(
          'UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-1")) * 1000',
          'timestamp'
        )
        .addSelect('SUM(value)', 'value')
        .from('inverter_0000.inverter_log', 'inverter_log')
        .where('id = :inverter_id', run.item.payload)
        .andWhere('name = "energy.e.pv.out.day"')
        .andWhere('timestamp >= :timestamp', run.item.payload.lastLog)
        .orderBy('timestamp', 'ASC')
        .groupBy('UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-1")) * 1000')
        .stream()
        .then((reader) => {
          const transformer = new DatabaseLogTransformer()

          const writer = new LogWriter<Log>({
            table: 'inverter_0000.inverter_log'
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
      const connection = getConnection('local')

      connection
        .createQueryBuilder()
        .select('timestamp')
        .from('inverter_0000.inverter_log', 'inverter_log')
        .where('id = :inverter_id', run.item.payload)
        .andWhere('name = "energy.e.pv.out.day"')
        .andWhere(() => {
          return `timestamp < (${connection
            .createQueryBuilder()
            .select('timestamp')
            .from('inverter_0000.inverter_log', 'inverter_log')
            .where('id = :inverter_id', run.item.payload)
            .andWhere('name = "energy.e.pv.out.month"')
            .orderBy('timestamp', 'DESC')
            .limit(1)
            .getQuery()})`
        })
        .orderBy('timestamp', 'DESC')
        .limit(1)
        .execute()
        .then(([lastLog]: (Log | undefined)[]) => {
          run.item.payload.lastLog = lastLog ?? {
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
