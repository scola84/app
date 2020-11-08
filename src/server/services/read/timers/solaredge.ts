import { Inverter } from '../../../entities'
import { ServiceHelpers } from '@scola/lib'
import { getConnection } from 'typeorm'
import { scheduleJob } from 'node-schedule'

export function solaredge ({ queuer }: ServiceHelpers): void {
  scheduleJob('0 * * * *', () => {
    getConnection('v2')
      .createQueryBuilder()
      .select([
        'inverter_id',
        'activated',
        'serial_number'
      ])
      .addSelect((qb) => {
        return qb
          .select('location_setting.value', 'value')
          .from('location_inverter', 'location_inverter')
          .leftJoin(
            'location_setting',
            'location_setting',
            'location_inverter.location_id = location_setting.location_id'
          )
          .where('location_inverter.inverter_id = inverter.inverter_id')
          .andWhere('location_setting.name = "solaredge.site_id"')
      }, 'site_id')
      .from('inverter', 'inverter')
      .where('activated IS NOT NULL')
      .andWhere('manufacturer = "solaredge"')
      .andWhere('inverter_id = 388')
      .limit(1)
      .stream()
      .then((stream) => {
        stream.on('data', (item: Inverter) => {
          item.inverter_id = 1
          item.activated = String(new Date(2020, 10, 10).valueOf())
          item.timezone = 'Europe/Amsterdam'

          queuer
            .add('read-solaredge-data', item)
            .catch(queuer.log.error)
        })
      })
      .catch(queuer.log.error.bind(queuer.log))
  })
}
