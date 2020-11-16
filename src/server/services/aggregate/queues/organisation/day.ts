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
  organisation_id: number
  queueRunId: string
}

export function day (): void {
  const runner = new TaskRunner({
    name: 'aggregate-organisation-day'
  })

  const processor = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      const key = [
        'organisation',
        'aggregates',
        run.item.payload.organisation_id,
        run.item.payload.queueRunId
      ].join('-')

      const scanner = new ZScanner({
        client: runner.readClient.options,
        del: true,
        key
      })

      const transformer = new CacheLogTransformer({
        id: run.item.payload.organisation_id,
        name: 'energy.e.pv.in.day'
      })

      const writer = new LogWriter<Log>({
        table: 'organisation_0000.organisation_log'
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
