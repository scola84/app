/* eslint-disable no-await-in-loop */

import { getConnection } from '@scola/lib'

export async function setupBalancer (): Promise<void> {
  const connection = getConnection('local')

  await connection
    .createQueryBuilder()
    .delete()
    .from('balancer_0000.balancer_log')
    .where('name LIKE "energy.e.pv.out.aggregated"')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.balancer')
    .where('balancer_id IN (17, 767)')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.balancer_address')
    .where('balancer_id IN (17, 767)')
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.balancer', [
      'activated',
      'balancer_id',
      'channels',
      'owner',
      'serial_number',
      'shard',
      'state'
    ])
    .values([{
      activated: 1517439600000,
      balancer_id: 17,
      channels: '8-8',
      owner: 1,
      serial_number: '0283.2017.12.1.25.12.MG',
      shard: 0,
      state: 0
    }, {
      activated: 1546297200000,
      balancer_id: 767,
      channels: '7-7',
      owner: 1,
      serial_number: '0326.2018.08.1.25.14.MG',
      shard: 0,
      state: 0
    }])
    .execute()

  for (let index = 1; index <= 16; index += 1) {
    await connection
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into('platform.balancer_address', [
        'address_id',
        'balancer_id',
        'group',
        'index'
      ])
      .values([{
        address_id: 10000 + index + 2,
        balancer_id: 17,
        group: Math.ceil(index / 8),
        index: (index % 8) + 1
      }])
      .execute()
  }

  for (let index = 1; index <= 14; index += 1) {
    await connection
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into('platform.balancer_address', [
        'address_id',
        'balancer_id',
        'group',
        'index'
      ])
      .values([{
        address_id: 10000 + index + 2 + 16,
        balancer_id: 767,
        group: Math.ceil(index / 7),
        index: (index % 7) + 1
      }])
      .execute()
  }
}
