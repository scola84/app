import { ServiceHelpers } from '@scola/lib'

interface RequestInterface {
  Querystring?: {
    'cursor'?: number
    'order-col'?: string
    'order-dir'?: string
    'organisationId': string
    'search'?: string
    'page-size'?: number
  }
}

export function getList ({ server }: ServiceHelpers): void {
  server.route<RequestInterface>({
    handler: async (request) => {
      return new Promise((resolve) => {
        const items = []
        const cursor = Number(request.query?.cursor ?? 0)
        const order = `${request.query?.['order-col'] ?? ''}:${request.query?.['order-dir'] ?? ''}`
        const search = request.query?.search ?? ''
        const size = Number(request.query?.['page-size'] ?? 10)
        const max = cursor + size

        for (let i = cursor; i < max; i += 1) {
          items.push({
            id: String(i),
            serialnumber: `sn ${i} ${search} ${order}`
          })
        }

        resolve({
          cursor: max > 40 ? undefined : items[items.length - 1].id,
          items: search === 'a' ? [] : items
        })
      })
    },
    method: 'GET',
    schema: {
      querystring: {
        properties: {
          'cursor': {
            type: 'string'
          },
          'order-col': {
            type: 'string'
          },
          'order-dir': {
            type: 'string'
          },
          'organisation-id': {
            type: 'string'
          },
          'page-size': {
            type: 'number'
          },
          'search': {
            type: 'string'
          }
        },
        type: 'object'
      }
    },
    url: '/api/inverter'
  })
}
