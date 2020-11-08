import * as services from './services'

import {
  Formatter,
  Queuer,
  ServerError,
  ServiceMethod
} from '@scola/lib'

import {
  redis,
  sql
} from './connections'

import cookie from 'fastify-cookie'
import { createConnections } from 'typeorm'
import fastify from 'fastify'
import formbody from 'fastify-formbody'
import micromatch from 'micromatch'
import multer from 'fastify-multer'
import strings from '../common/strings'

Formatter.strings = strings

const server = fastify({
  ajv: {
    customOptions: {
      allErrors: true,
      verbose: true
    }
  },
  logger: {
    level: 'debug'
  }
})

server.addHook('preSerialization', (request, reply, data, done) => {
  done(null, reply.statusCode >= 400 ? data : {
    code: `OK_${reply.statusCode}`,
    data
  })
})

server.setErrorHandler(({ code, validation }, request, reply) => {
  reply
    .send(new ServerError(code, validation))
    .then(() => {}, server.log.error)
})

server.setNotFoundHandler((request, reply) => {
  reply
    .code(404)
    .send(new ServerError('ERR_RESPONSE_404'))
    .then(() => {}, server.log.error)
})

const queuer = new Queuer(redis)
queuer.log = server.log

createConnections(sql)
  .then(() => {
    Object.entries(services).forEach(([serviceName, service]) => {
      Object.entries(service).forEach(([sectionName, section]) => {
        Object.entries(section).forEach(([methodName, method]) => {
          if (micromatch.isMatch(
            `${serviceName}.${sectionName}.${methodName}`,
            process.env.SERVICES?.split(':') ?? '*'
          )) {
            (method as ServiceMethod)({
              queuer,
              server
            })
          }
        })
      })
    })

    server
      .register(cookie)
      .register(formbody)
      .register(multer.contentParser)
      .listen({
        host: process.env.BIND_ADDRESS ?? '0.0.0.0',
        port: Number(process.env.BIND_PORT ?? 3000)
      })
      .catch((error: Error) => {
        server.log.error(error)
      })
  })
  .catch((error) => {
    server.log.error(error)
  })
