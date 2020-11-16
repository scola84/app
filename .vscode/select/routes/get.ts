import { ServiceHelpers } from '@scola/lib'

export function get ({ server }: ServiceHelpers): void {
  server.route({
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
