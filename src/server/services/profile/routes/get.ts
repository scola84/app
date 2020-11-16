import { FastifyInstance } from 'fastify'

export function get (server: FastifyInstance): void {
  server.route({
    handler: async () => {
      return Promise.resolve({
        checkbox2: 'checkbox2value',
        color: '#00FF00',
        family_name: 'van den Boogaart',
        given_name: 'Koen',
        radio: 'radiovalue2',
        range: 44,
        switch: 'switchvalue'
      })
    },
    method: 'GET',
    url: '/api/profile'
  })
}
