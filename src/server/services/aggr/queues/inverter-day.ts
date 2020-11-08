import {
  SelectQueryBuilder,
  getConnection
} from 'typeorm'

import { Inverter } from '../../../entities/inverter'
import { Log } from '../../../entities/log'
import { ServiceHelpers } from '@scola/lib'

export function inverterDay ({ queuer }: ServiceHelpers): void {
  function selectLastLog (item: Inverter): SelectQueryBuilder<unknown> {
    return getConnection('local')
      .createQueryBuilder()
      .select('UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-%d")) * 1000', 'timestamp')
      .from('inverter_0000.inverter_log', 'inverter_log')
      .where('id = :inverter_id', item)
      .andWhere('name = "energy.e.pv.out.day"')
      .orderBy('timestamp', 'DESC')
      .limit(1)
  }

  function selectLogs (item: Inverter, timestamp: number): SelectQueryBuilder<unknown> {
    return getConnection('local')
      .createQueryBuilder()
      .select('UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-%d")) * 1000', 'timestamp')
      .addSelect('SUM(value)', 'value')
      .from('inverter_0000.inverter_log', 'inverter_log')
      .where('id = :inverter_id', item)
      .andWhere('name = "energy.e.pv.out.hour"')
      .andWhere(`timestamp >= ${timestamp}`)
      .orderBy('timestamp', 'ASC')
      .groupBy('UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-%d")) * 1000')
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

  queuer.consume<Inverter>('aggr-inverter-day', (item, callback) => {
    selectLastLog(item)
      .execute()
      .then(([lastLog]: (Log |undefined)[]) => {
        selectLogs(item, Number(lastLog?.timestamp ?? 0))
          .stream()
          .then((stream) => {
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

            stream.on('data', (log: Log) => {
              values.push([
                'energy.e.pv.out.day',
                item.inverter_id,
                String(log.timestamp),
                0,
                String(log.value)
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
      .catch(callback)
  })
}
