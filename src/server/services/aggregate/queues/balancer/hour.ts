import {
  LogAggregator,
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
  capacity: number | null
  lastLog: Log
}

export function hour (): void {
  const runner = new TaskRunner({
    name: 'aggregate-balancer-hour'
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
        .select([
          'balancer_log.id',
          'balancer_log.offset',
          'balancer_log.timestamp',
          'balancer_log.value'
        ])
        .addSelect('"energy.e.pv.out.hour"', 'name')
        .from('balancer_0000.balancer_log', 'balancer_log')
        .where('balancer_log.balancer_id = :balancer_id', run.item.payload)
        .andWhere('balancer_log.name = "energy.e.pv.out"')
        .andWhere('timestamp >= :timestamp', run.item.payload.lastLog)
        .orderBy('timestamp', 'ASC')
        .stream()
        .then((reader) => {
          const aggregator = new LogAggregator({
            capacity: run.item.payload.capacity
          })

          const writer = new LogWriter<Log>({
            table: 'balancer_0000.balancer_log'
          })

          aggregator.once('error', (error) => {
            run.code = 'err_aggregator'
            run.reason = error.message
            callback(null, run)
          })

          reader.once('error', (error) => {
            run.code = 'err_reader'
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
            .pipe(aggregator)
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
        .from('balancer_0000.balancer_log', 'balancer_log')
        .where('balancer_id = :balancer_id', run.item.payload)
        .andWhere('name = "energy.e.pv.out"')
        .andWhere(() => {
          return `timestamp < (${connection
            .createQueryBuilder()
            .select('timestamp')
            .from('balancer_0000.balancer_log', 'balancer_log')
            .where('balancer_id = :balancer_id', run.item.payload)
            .andWhere('name = "energy.e.pv.out.hour"')
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
