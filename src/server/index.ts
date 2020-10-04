import * as services from './services'
import { createConnections } from 'typeorm'
import { createServer } from '@scola/lib'
import { secrets } from 'docker-secret'
import { strings } from '../common'

const server = createServer({
  formatter: {
    lang: 'nl',
    strings
  },
  patterns: process.env.SERVICES?.split(':'),
  services
})

createConnections([{
  entities: [
    './entities/*.ts'
  ],
  type: 'postgres',
  url: `postgres://${secrets.postgres}@postgres`
}]).catch((error) => {
  server.log.error(error)
})
