import { FastifyInstance } from 'fastify'
import { Queuer } from '@scola/lib'

export function load (router: FastifyInstance, queuer: Queuer): void {
  queuer.consume(
    'select',
    'select',
    process.env.HOSTNAME ?? '',
    (error?: Error, item?: unknown, callback: () => void = (): void => {}) => {
      if (error) {
        router.log.error(error)
        return
      }

      setTimeout(() => {
        console.log('Joehoe!', item)
        callback()
      }, 1000)
    }
  )
}
