import {
  TaskRun,
  TaskRunner,
  getConnection
} from '@scola/lib'

import {
  Transform,
  Writable
} from 'stream'

import { Log } from '../../../../../entities'

interface Payload {
  address_id: number
  aggregated: Log
}

export function prepareBalancer (): void {
  const runner = new TaskRunner({
    name: 'aggregate-address-prepare-balancer-main'
  })

  const adder = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      const key = [
        'address',
        'aggregated',
        run.item.payload.address_id,
        run.queueRun.id
      ].join('-')

      runner.writeClient
        .zadd(
          key,
          run.item.payload.aggregated.timestamp,
          run.item.payload.aggregated.timestamp
        )
        .then(() => {
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_adder'
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
        .from('address_0000.address_log', 'address_log')
        .where('id = :address_id', run.item.payload)
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

  const deleter = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      const aggregatedKey = [
        'address',
        'aggregated',
        run.item.payload.address_id,
        run.queueRun.id
      ].join('-')

      const aggregatesKey = [
        'address',
        'aggregates',
        run.item.payload.address_id,
        run.queueRun.id
      ].join('-')

      runner.writeClient
        .del(
          aggregatedKey,
          aggregatesKey
        )
        .then(() => {
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_deleter'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  const incrementor = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      getConnection('local')
        .createQueryBuilder()
        .select()
        .from('balancer_0000.balancer_log', 'balancer_log')
        .where('balancer_log.balancer_id = :balancer_id', run.item.payload)
        .andWhere('balancer_log.group = :group', run.item.payload)
        .andWhere('balancer_log.index = :index', run.item.payload)
        .andWhere('balancer_log.name = "energy.e.pv.out.hour"')
        .andWhere('timestamp >= :value', run.item.payload.aggregated)
        .orderBy('timestamp', 'ASC')
        .stream()
        .then((reader) => {
          const key = [
            'address',
            'aggregates',
            run.item.payload.address_id,
            run.queueRun.id
          ].join('-')

          const writer = new Writable({
            objectMode: true,
            write (log: Log, writerEncoding, writerCallback): void {
              runner.writeClient
                .zincrby(key, Number(log.value), `${log.timestamp}-${log.offset}`)
                .then(() => {
                  run.item.payload.aggregated = log
                  writerCallback()
                })
                .catch((error: Error) => {
                  writerCallback(error)
                })
            }
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
            .pipe(writer)
        })
        .catch((error: Error) => {
          run.code = 'err_incrementor'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  runner
    .pipe(selector)
    .pipe(deleter)
    .pipe(incrementor)
    .pipe(adder)
    .pipe(runner)
    .start()
}
