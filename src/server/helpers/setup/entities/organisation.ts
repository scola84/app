import { getConnection } from '@scola/lib'

export async function setupOrganisation (): Promise<void> {
  const connection = getConnection('local')

  await connection
    .createQueryBuilder()
    .delete()
    .from('organisation_0000.organisation_log')
    .where('name LIKE "energy.e.pv.in.aggregated"')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.organisation')
    .where('organisation_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.organisation_location')
    .where('organisation_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.organisation_setting')
    .where('organisation_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.organisation', [
      'name',
      'organisation_id',
      'owner',
      'shard',
      'state'
    ])
    .values([{
      name: 'AI',
      organisation_id: 10001,
      owner: 1,
      shard: 0,
      state: 0
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.organisation_location', [
      'location_id',
      'organisation_id',
      'type'
    ])
    .values([{
      location_id: 10001,
      organisation_id: 10001,
      type: 'administrator'
    }, {
      location_id: 10002,
      organisation_id: 10001,
      type: 'administrator'
    }, {
      location_id: 10003,
      organisation_id: 10001,
      type: 'administrator'
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.organisation_setting', [
      'name',
      'organisation_id',
      'setting_id',
      'value'
    ])
    .values([{
      name: 'solaredge.api_key',
      organisation_id: 10001,
      setting_id: 10001,
      value: process.env.SOLAREDGE_API_KEY
    }])
    .execute()
}
