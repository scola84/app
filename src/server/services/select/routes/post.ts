import { FastifyInstance } from 'fastify'
import { Select } from '../../../entities'

export function post (router: FastifyInstance): void {
  router.route({
    handler: async (request, reply) => {
      await reply.status(201).send('')
    },
    method: 'POST',
    schema: {
      body: Select.schema
    },
    url: '/api/select'
  })
}
