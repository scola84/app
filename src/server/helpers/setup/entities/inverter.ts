import { getConnection } from '@scola/lib'

export async function setupInverter (): Promise<void> {
  const connection = getConnection('local')

  await connection
    .createQueryBuilder()
    .delete()
    .from('inverter_0000.inverter_log')
    .where('name LIKE "energy.e.pv.out.aggregated"')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.inverter')
    .where('inverter_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.inverter_address')
    .where('inverter_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.inverter_panel')
    .where('inverter_id > 10000')
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.inverter', [
      'activated',
      'inverter_id',
      'manufacturer',
      'owner',
      'serial_number',
      'shard',
      'state'
    ])
    .values([{
      activated: 1530522000000,
      inverter_id: 10001,
      manufacturer: 'solaredge',
      owner: 1,
      serial_number: '731C51FE-DE',
      shard: 0,
      state: 0
    }, {
      activated: 1539162000000,
      inverter_id: 10002,
      manufacturer: 'solaredge',
      owner: 1,
      serial_number: '731D6326-19',
      shard: 0,
      state: 0
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.inverter_address', [
      'address_id',
      'inverter_id'
    ])
    .values([{
      address_id: 10001,
      inverter_id: 10001
    }, {
      address_id: 10002,
      inverter_id: 10002
    }])
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .orIgnore()
    .into('platform.inverter_panel', [
      'amount',
      'azimuth',
      'capacity',
      'inverter_id',
      'manufacturer',
      'number',
      'panel_id',
      'production',
      'tilt'
    ])
    .values([{
      amount: 6,
      azimuth: 194,
      capacity: 295,
      inverter_id: 10001,
      manufacturer: 'qcells',
      number: 1,
      panel_id: 10001,
      production: 1657,
      tilt: 35
    }, {
      amount: 8,
      azimuth: 106,
      capacity: 295,
      inverter_id: 10002,
      manufacturer: 'qcells',
      number: 1,
      panel_id: 10002,
      production: 1922,
      tilt: 35
    }])
    .execute()
}
