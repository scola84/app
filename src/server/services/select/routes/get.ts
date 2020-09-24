import { FastifyInstance } from 'fastify'

export function get (router: FastifyInstance): void {
  router.route({
    handler: async () => {
      return Promise.resolve({
        test1: [
          {
            text: 'Locaties',
            value: 'locs'
          }, {
            selected: true,
            text: 'Installaties',
            value: 'cases'
          }
        ]
      })
    },
    method: 'GET',
    url: '/api/select'
  })
}
