import { FastifyInstance } from 'fastify'
import { Queuer } from '@scola/lib'
import { scheduleJob } from 'node-schedule'

export function date (router: FastifyInstance, queuer: Queuer): void {
  let counter = 0

  scheduleJob('* * * * *', () => {
    queuer
      .add('select', {
        counter: counter++,
        time: new Date()
      })
      .catch((error: Error) => {
        router.log.error(error)
      })
  })
}
