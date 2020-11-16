import { FastifyInstance } from 'fastify'
import { Profile } from '../../../entities'
import multer from 'fastify-multer'

export function post (server: FastifyInstance): void {
  server.route({
    handler: async (request, reply) => {
      console.log(request.body)
      await reply.status(201).send('')
    },
    method: 'POST',
    preValidation: multer().none(),
    schema: {
      body: Profile.schema
    },
    url: '/api/profile'
  })
}
