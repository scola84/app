import {
  DataReader,
  Datum
} from '../../../helpers/solaredge'

import {
  Inverter,
  Log
} from '../../../entities'

import {
  SelectQueryBuilder,
  getConnection
} from 'typeorm'

import { ServiceHelpers } from '@scola/lib'
import luxon from 'luxon'

export function solarEdgeData ({ queuer }: ServiceHelpers): void {
  function selectLastLog (item: Inverter): SelectQueryBuilder<unknown> {
    return getConnection('local')
      .createQueryBuilder()
      .select('timestamp')
      .from('inverter_0000.inverter_log', 'inverter_log')
      .where('id = :inverter_id', item)
      .andWhere('name = "energy.e.pv.out"')
      .orderBy('timestamp', 'DESC')
      .limit(1)
  }

  function writeLogs ({ tries = 0, values }: { tries?: number, values: unknown[]}): void {
    getConnection('local')
      .createQueryBuilder()
      .insert()
      .into(
        'inverter_0000.inverter_log',
        ['name', 'id', 'timestamp', 'offset', 'value']
      )
      .orIgnore()
      .values(values)
      .execute()
      .catch((error) => {
        if (tries < 3) {
          writeLogs({
            tries: tries + 1,
            values
          })
        } else {
          queuer.log.error(error)
        }
      })
  }

  queuer.consume<Inverter>('read-solaredge-data', (item, callback) => {
    selectLastLog(item)
      .execute()
      .then(([lastLog]: (Log | undefined)[]) => {
        if (
          item.activated === null ||
          item.serial_number === null ||
          item.site_id === null
        ) {
          return
        }

        const stream = new DataReader({
          apiKey: process.env.SOLAREDGE_API_KEY ?? '',
          serialNumber: item.serial_number,
          siteId: item.site_id,
          startTime: new Date(Number(lastLog?.timestamp ?? item.activated))
        })

        const values: unknown[] = []

        stream.once('end', () => {
          writeLogs({
            values: values.splice(0)
          })

          stream.removeAllListeners()
          callback()
        })

        stream.once('error', (error) => {
          stream.removeAllListeners()
          callback(error)
        })

        stream.on('data', (log: Datum) => {
          const date = luxon.DateTime.fromSQL(log.date, {
            zone: item.timezone ?? undefined
          })

          values.push([
            'energy.e.pv.out',
            item.inverter_id,
            date.valueOf(),
            date.offset * 60,
            String(log.totalEnergy)
          ])

          if (values.length > 999) {
            writeLogs({
              values: values.splice(0, 1000)
            })
          }
        })
      })
      .catch(callback)
  })

}
