import {
  CacheLogTransformer,
  LogWriter
} from '../../../../helpers/log'

import {
  Log,
  TaskRun,
  TaskRunner,
  ZScanner
} from '@scola/lib'

import { Transform } from 'stream'

interface Payload {
  location_id: number
  queueRunId: string
}

export function hour (): void {
  const runner = new TaskRunner({
    name: 'aggregate-location-hour'
  })

  const processor = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      const key = [
        'location',
        'aggregates',
        run.item.payload.location_id,
        run.item.payload.queueRunId
      ].join('-')

      const scanner = new ZScanner({
        client: runner.readClient.options,
        del: true,
        key
      })

      const transformer = new CacheLogTransformer({
        id: run.item.payload.location_id,
        name: 'energy.e.pv.in.hour'
      })

      const writer = new LogWriter<Log>({
        table: 'location_0000.location_log'
      })

      scanner.once('error', (error) => {
        scanner.destroy()
        run.code = 'err_scanner'
        run.reason = error.message
        callback(null, run)
      })

      transformer.once('error', (error) => {
        scanner.destroy()
        run.code = 'err_transformer'
        run.reason = error.message
        callback(null, run)
      })

      writer.once('error', (error) => {
        scanner.destroy()
        run.code = 'err_writer'
        run.reason = error.message
        callback(null, run)
      })

      writer.once('finish', () => {
        scanner.destroy()
        callback(null, run)
      })

      scanner
        .pipe(transformer)
        .pipe(writer)
    }
  })

  runner
    .pipe(processor)
    .pipe(runner)
    .start()
}
