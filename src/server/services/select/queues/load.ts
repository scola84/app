import { ServiceHelpers } from '@scola/lib'

export function load ({ queuer }: ServiceHelpers): void {
  queuer.consume('select', (item, callback) => {
    setTimeout(() => {
      console.log(item)
      callback()
    }, 1000)
  })
}
