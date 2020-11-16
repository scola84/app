import {
  DataReader,
  Datum
} from '../../../helpers/solaredge'

import {
  TaskRun,
  TaskRunner,
  getConnection
} from '@scola/lib'

import { Log } from '../../../entities'
import { LogWriter } from '../../../helpers/log'
import { Transform } from 'stream'
import luxon from 'luxon'

interface Payload {
  activated: string | null
  api_key: string | null
  inverter_id: number
  lastLog: Log
  serial_number: string | null
  site_id: string | null
  timezone: string | null
}

export function solarEdgeData (): void {
  const runner = new TaskRunner({
    name: 'read-solaredge-data-main'
  })

  const lastLogSelector = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      getConnection('local')
        .createQueryBuilder()
        .select([
          'offset',
          'timestamp'
        ])
        .from('inverter_0000.inverter_log', 'inverter_log')
        .where('id = :inverter_id', run.item.payload)
        .andWhere('name = "energy.e.pv.out"')
        .orderBy('timestamp', 'DESC')
        .limit(1)
        .execute()
        .then(([lastLog]: (Log | undefined)[]) => {
          run.item.payload.lastLog = lastLog ?? {
            id: 0,
            name: '',
            offset: 0,
            timestamp: run.item.payload.activated ?? String(Date.now()),
            value: '0'
          }
          callback(null, run)
        })
        .catch((error: Error) => {
          run.code = 'err_last_log_selector'
          run.reason = error.message
          callback(null, run)
        })
    }
  })

  const logProcessor = new Transform({
    objectMode: true,
    transform (run: TaskRun<Payload>, encoding, callback): void {
      if (run.code !== 'pending') {
        callback(null, run)
        return
      }

      if (run.item.payload.api_key === null) {
        run.code = 'err_processor'
        run.reason = 'API key is undefined'
        callback(null, run)
        return
      }

      if (run.item.payload.activated === null) {
        run.code = 'err_processor'
        run.reason = 'Activated is undefined'
        callback(null, run)
        return
      }

      if (run.item.payload.serial_number === null) {
        run.code = 'err_processor'
        run.reason = 'Serial number is undefined'
        callback(null, run)
        return
      }

      if (run.item.payload.site_id === null) {
        run.code = 'err_processor'
        run.reason = 'Site ID is undefined'
        callback(null, run)
        return
      }

      const mapper = new Transform({
        objectMode: true,
        transform (datum: Datum, mapperEncoding, mapperCallback): void {
          if (datum.totalEnergy === undefined) {
            mapperCallback()
            return
          }

          const date = luxon.DateTime.fromSQL(datum.date, {
            zone: run.item.payload.timezone ?? undefined
          })

          mapperCallback(null, [
            'energy.e.pv.out',
            run.item.payload.inverter_id,
            date.valueOf(),
            date.offset * 60,
            String(datum.totalEnergy)
          ])
        }
      })

      const reader = new DataReader({
        apiKey: run.item.payload.api_key,
        serialNumber: run.item.payload.serial_number,
        siteId: run.item.payload.site_id,
        startTime: new Date(Number(run.item.payload.lastLog.timestamp) +
              (run.item.payload.lastLog.offset * 1000) +
               1000)
      })

      const writer = new LogWriter({
        table: 'inverter_0000.inverter_log'
      })

      mapper.once('error', (error) => {
        run.code = 'err_mapper'
        run.reason = error.message
        callback(null, run)
      })

      reader.once('error', (error) => {
        run.code = 'err_reader'
        run.reason = error.message
        callback(null, run)
      })

      writer.once('finish', () => {
        callback(null, run)
      })

      reader
        .pipe(mapper)
        .pipe(writer)
    }
  })

  runner
    .pipe(lastLogSelector)
    .pipe(logProcessor)
    .pipe(runner)
    .start()
}
