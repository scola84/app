import {
  SelectQueryBuilder,
  getConnection
} from 'typeorm'

import { Inverter } from '../../../entities/inverter'
import { Log } from '../../../entities/log'
import { ServiceHelpers } from '@scola/lib'

export function inverterHour ({ queuer }: ServiceHelpers): void {
  function selectLastLog (item: Inverter): SelectQueryBuilder<unknown> {
    return getConnection('v2')
      .createQueryBuilder()
      .select(
        'UNIX_TIMESTAMP(FROM_UNIXTIME(timestamp / 1000, "%Y-%m-%d %H:00")) * 1000',
        'timestamp'
      )
      .select('timestamp')
      .from('inverter_0000.inverter_log', 'inverter_log')
      .where('id = :inverter_id', item)
      .andWhere('name = "energy.e.pv.out.hour"')
      .orderBy('timestamp', 'DESC')
      .limit(1)
  }

  function selectLogs (item: Inverter, timestamp: number): SelectQueryBuilder<unknown> {
    return getConnection('v2')
      .createQueryBuilder()
      .select('inverter_log.*')
      .from('inverter_0000.inverter_log', 'inverter_log')
      .where('inverter_log.id = :inverter_id', item)
      .andWhere('inverter_log.name = "energy.e.pv.out"')
      .andWhere(`inverter_log.timestamp >= ${timestamp}`)
      .orderBy('timestamp', 'ASC')
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

  queuer.consume<Inverter>('aggr-inverter-hour', (item, callback) => {
    selectLastLog(item)
      .execute()
      .then(([lastLog]: (Log | undefined)[]) => {
        selectLogs(item, Number(lastLog?.timestamp ?? 0))
          .stream()
          .then((stream) => {
            let currentTimestamp = 0
            let currentValue = 0
            let date = new Date()
            let delta = 0
            let max = 0
            let previousOffset = 0
            let previousTimestamp = 0
            let previousValue = 0
            let total = 0

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
              date = new Date(Number(log.timestamp))
              date.setMilliseconds(0)
              date.setSeconds(0)
              date.setMinutes(Math.floor(date.getMinutes() / 15) * 15)

              currentTimestamp = date.valueOf()
              currentValue = Number(log.value)

              if (currentTimestamp !== previousTimestamp) {
                if (previousTimestamp !== 0) {
                  values.push([
                    'energy.e.pv.out.hour',
                    item.inverter_id,
                    String(previousTimestamp),
                    previousOffset,
                    String(total)
                  ])

                  max = item.capacity === null
                    ? Infinity
                    : 2 * item.capacity * (currentTimestamp - previousTimestamp) / 3600000
                }

                if (values.length > 999) {
                  writeLogs({
                    values: values.splice(0, 1000)
                  })
                }

                total = 0
                previousOffset = log.offset
                previousTimestamp = currentTimestamp
              }

              delta = currentValue - previousValue

              if (previousValue === 0) {
                delta = 0
              } else if (delta < 0) {
                delta = 0
              } else if (delta > max) {
                delta = 0
              }

              total += delta
              previousValue = currentValue
            })
          })
          .catch(callback)
      })
      .catch(callback)
  })
}
