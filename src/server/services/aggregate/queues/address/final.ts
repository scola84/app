import {
  TaskRun,
  TaskRunner,
  getConnection
} from '@scola/lib'

import { Transform } from 'stream'

interface Payload {
  address_id: number
  aggregated: string
  queueRunId: string
}

export function final (): void {
  const runner = new TaskRunner({
    name: 'aggregate-address-final'
  })

  const deleter = new Transform({
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
        run.item.payload.queueRunId
      ].join('-')

      runner
        .writeClient
        .del(key)
        .then(() => {
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_cleaner'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  const inserter = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      getConnection('local')
        .createQueryBuilder()
        .insert()
        .into('address_0000.address_log', [
          'id',
          'name',
          'offset',
          'timestamp',
          'value'
        ])
        .values({
          id: run.item.payload.address_id,
          name: 'energy.e.pv.in.aggregated',
          offset: 0,
          timestamp: '0',
          value: run.item.payload.aggregated
        })
        .orUpdate({
          overwrite: ['value']
        })
        .execute()
        .then(() => {
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_insert'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  const popper = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      const key = [
        'address',
        'aggregated',
        run.item.payload.address_id,
        run.item.payload.queueRunId
      ].join('-')

      runner
        .writeClient
        .zpopmin(key)
        .then(([timestamp]: (string | undefined)[] = []) => {
          run.item.payload.aggregated = timestamp ?? '0'
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_pop'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  runner
    .pipe(popper)
    .pipe(inserter)
    .pipe(deleter)
    .pipe(runner)
    .start()
}
