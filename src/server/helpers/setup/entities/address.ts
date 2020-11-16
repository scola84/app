/* eslint-disable no-await-in-loop */

import { getConnection } from '@scola/lib'

export async function setupAddress (): Promise<void> {
  const connection = getConnection('local')

  await connection
    .createQueryBuilder()
    .delete()
    .from('address_0000.address_log')
    .where('name LIKE "energy.e.pv.in.aggregated"')
    .execute()

  await connection
    .createQueryBuilder()
    .delete()
    .from('platform.address')
    .where('address_id > 10000')
    .execute()

  for (let index = 1; index <= 32; index += 1) {
    await connection
      .createQueryBuilder()
      .insert()
      .orIgnore()
      .into('platform.address', [
        'address_id',
        'address_level2',
        'address_line1',
        'address_line2',
        'country_code',
        'owner',
        'postal_code',
        'shard',
        'state',
        'type'
      ])
      .values([{
        address_id: 10000 + index,
        address_level2: 'Rotterdam',
        address_line1: 'Algoritmestraat',
        address_line2: String(index),
        country_code: 'NL',
        owner: 1,
        postal_code: '1000AA',
        shard: 0,
        state: 0,
        type: 'private'
      }])
      .execute()
  }
}
