import { Select } from '../../../entities'
import { ServiceHelpers } from '@scola/lib'

export function post ({ server }: ServiceHelpers): void {
  server.route({
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
