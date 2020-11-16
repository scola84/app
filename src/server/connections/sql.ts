import {
  ConnectionOptions,
  Item,
  Queue,
  QueueRun,
  Task,
  TaskOption,
  TaskRun
} from '@scola/lib'

import { secrets } from 'docker-secret'

export const sql: ConnectionOptions[] = [{
  logging: ['error'],
  name: 'local',
  type: 'mysql',
  url: 'mysql://root:root@192.168.1.106:3306'
}, {
  logging: ['error'],
  name: 'v2',
  type: 'mysql',
  url: `mysql://${secrets.mysql}@ssh-v2:7701/platform?supportBigNumbers=true`
}, {
  dropSchema: true,
  entities: [
    Item,
    Queue,
    QueueRun,
    Task,
    TaskOption,
    TaskRun
  ],
  logging: ['error'],
  name: 'docker',
  synchronize: true,
  type: 'postgres',
  url: 'postgres://postgres:postgres@postgres'
}]
