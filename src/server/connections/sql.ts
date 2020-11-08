import { ConnectionOptions } from 'typeorm'
import { secrets } from 'docker-secret'

export const sql: ConnectionOptions[] = [{
  entities: [
    './entities/*.ts'
  ],
  logging: ['error'],
  type: 'postgres',
  url: `postgres://${secrets.postgres}@postgres`
}, {
  logging: ['error'],
  name: 'local',
  type: 'mysql',
  url: 'mysql://root:root@192.168.1.106:3306'
}, {
  logging: ['error'],
  name: 'v2',
  type: 'mysql',
  url: `mysql://${secrets.mysql}@ssh-v2:7701/platform?supportBigNumbers=true`
}]
