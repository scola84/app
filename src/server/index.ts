import 'reflect-metadata'
import 'source-map-support/register'
import * as services from './services'

import {
  Formatter,
  QueueManager,
  QueueRunner,
  ServerError,
  TaskRunner,
  createConnections
} from '@scola/lib'

import fastify, {
  FastifyInstance
} from 'fastify'

import {
  redis,
  sql
} from './connections'

import cookie from 'fastify-cookie'
import formbody from 'fastify-formbody'
import { isMatch } from 'micromatch'
import multer from 'fastify-multer'
import { setup } from './helpers/setup'
import strings from '../common/strings'

const logLevel = process.env.LOG_LEVEL ?? 'info'
const queueFilter = process.env.QUEUE_FILTER
const serviceFilter = process.env.SERVICE_FILTER?.split(':') ?? '*'

const server = fastify({
  ajv: {
    customOptions: {
      allErrors: true,
      verbose: true
    }
  },
  logger: {
    level: logLevel
  }
})

const queueManager = new QueueManager({
  entityManager: 'docker',
  filter: queueFilter,
  listenerClient: redis,
  logger: server.log,
  schedule: '* * * * *'
})

Formatter.strings = strings

QueueRunner.options = {
  entityManager: 'docker',
  logger: server.log,
  maxLength: 1024 * 1024,
  queueClient: redis
}

TaskRunner.options = {
  entityManager: 'docker',
  logger: server.log,
  maxLength: 1024 * 1024,
  queueClient: redis
}

createConnections(sql)
  .then(async () => {
    await setup()

    Object.entries(services).forEach(([sr, service]) => {
      Object.entries(service).forEach(([sc, section]) => {
        Object.entries(section).forEach(([mt, method]) => {
          if (isMatch(`${sr}.${sc}.${mt}`, serviceFilter)) {
            (method as (server: FastifyInstance) => void)(server)
          }
        })
      })
    })

    queueManager.start()
    queueManager.callSchedule()

    return server
      .addHook('preSerialization', (request, reply, data, done) => {
        done(null, reply.statusCode >= 400 ? data : {
          code: `OK_${reply.statusCode}`,
          data
        })
      })
      .setErrorHandler(({ code, validation }, request, reply) => {
        reply
          .send(new ServerError(code, validation))
          .then(() => {}, (error: Error) => {
            server.log.error(String(error))
          })
      })
      .setNotFoundHandler((request, reply) => {
        reply
          .code(404)
          .send(new ServerError('ERR_RESPONSE_404'))
          .then(() => {}, (error: Error) => {
            server.log.error(String(error))
          })
      })
      .register(cookie)
      .register(formbody)
      .register(multer.contentParser)
      .listen(3000, '0.0.0.0')
  })
  .catch((error: Error) => {
    server.log.error(String(error))
  })
