import { Inverter } from '../../../entities'
import { ServiceHelpers } from '@scola/lib'
import { getConnection } from 'typeorm'
import { scheduleJob } from 'node-schedule'

// https://lens.mijnherman.nl/#/view-inverter:inverter_id=76@main/list-inverter@menu
// https://lens.mijnherman.nl/#/view-inverter:inverter_id=388@main/list-inverter@menu
// queue next tasks from hour to day to month
// use entities
// use logwriter
// add address/location/organisation
// add balancer
// queue + task???

export function inverter ({ queuer }: ServiceHelpers): void {
  scheduleJob('0 * * * *', () => {
    getConnection('v2')
      .createQueryBuilder()
      .select([
        'inverter_id',
        'activated'
      ])
      .addSelect((qb) => {
        return qb
          .select('SUM(panel.amount * panel.capacity)')
          .from('platform.inverter_panel', 'panel')
          .where('panel.inverter_id = inverter.inverter_id')
      }, 'capacity')
      .from('platform.inverter', 'inverter')
      .where('inverter_id = 388')
      .orderBy('created')
      .limit(1)
      .stream()
      .then((stream) => {
        stream.on('data', (item: Inverter) => {
          item.inverter_id = 1

          queuer
            .add('aggr-inverter-hour', item)
            .catch(queuer.log.error)
        })
      })
      .catch(queuer.log.error)
  })
}
