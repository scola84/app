import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { secrets } from 'docker-secret'

export const postgres: PostgresConnectionOptions[] = [{
  entities: [
    './entities/*.ts'
  ],
  type: 'postgres',
  url: `postgres://${secrets.postgres}@postgres`
}]
