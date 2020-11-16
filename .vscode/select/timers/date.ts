import { ServiceHelpers } from '@scola/lib'
import { scheduleJob } from 'node-schedule'

export function date ({ queuer }: ServiceHelpers): void {
  let counter = 0

  scheduleJob('* * * * *', () => {
    queuer
      .add('select', {
        counter: counter++,
        time: new Date()
      })
      .catch((error: Error) => {
        queuer.log.error(error)
      })
  })
}
