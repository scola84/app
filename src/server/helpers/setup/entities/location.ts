/* eslint-disable no-await-in-loop */

import { getConnection } from '@scola/lib'

export async function setupLocation (): Promise<void> {
  const connection = getConnection('local')

  await connection
    .createQueryBuilder()
    .delete()
    .from('location_0000.location_log')
    .where('name LIKE "energy.e.pv.in.aggregated"')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.location')
    .where('location_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.location_address')
    .where('location_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.location_balancer')
    .where('location_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.location_inverter')
    .where('location_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.location_setting')
    .where('location_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .into('platform.location', [
      'address_level2',
      'location_id',
      'name',
      'owner',
      'shard',
      'state',
      'timezone',
      'type'
    ])
    .orIgnore()
    .values([{
      address_level2: 'Rotterdam',
      location_id: 10001,
      name: 'Algoritmestraat 1',
      owner: 1,
      shard: 0,
      state: 0,
      timezone: 'Europe/Amsterdam',
      type: 'GG'
    }, {
      address_level2: 'Rotterdam',
      location_id: 10002,
      name: 'Algoritmestraat 3',
      owner: 1,
      shard: 0,
      state: 0,
      timezone: 'Europe/Amsterdam',
      type: 'GG'
    }, {
      address_level2: 'Rotterdam',
      location_id: 10003,
      name: 'Algoritmestraat GB',
      owner: 1,
      shard: 0,
      state: 0,
      timezone: 'Europe/Amsterdam',
      type: 'GB'
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .into('platform.location_address', [
      'address_id',
      'location_id'
    ])
    .orIgnore()
    .values([{
      address_id: 10001,
      location_id: 10001
    }, {
      address_id: 10002,
      location_id: 10002
    }])
    .execute()

  for (let index = 1; index <= 32; index += 1) {
    await connection
      .createQueryBuilder()
      .insert()
      .into('platform.location_address', [
        'address_id',
        'location_id'
      ])
      .orIgnore()
      .values([{
        address_id: 10000 + index + 2,
        location_id: 10003
      }])
      .execute()
  }

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.location_balancer', [
      'balancer_id',
      'location_id'
    ])
    .values([{
      balancer_id: 17,
      location_id: 10003
    }, {
      balancer_id: 767,
      location_id: 10003
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.location_inverter', [
      'inverter_id',
      'location_id'
    ])
    .values([{
      inverter_id: 10001,
      location_id: 10001
    }, {
      inverter_id: 10002,
      location_id: 10002
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.location_setting', [
      'location_id',
      'name',
      'setting_id',
      'value'
    ])
    .values([{
      location_id: 10001,
      name: 'solaredge.site_id',
      setting_id: 10001,
      value: '941828'
    }, {
      location_id: 10002,
      name: 'solaredge.site_id',
      setting_id: 10002,
      value: '1027397'
    }])
    .execute()
}
