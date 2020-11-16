import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupBalancer (): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-balancer'
  queue.query = `
    SELECT 
      activated,
      balancer_id
    FROM
      platform.balancer
    WHERE
      balancer_id IN (17, 767)
  `
  queue.schedule = '15 * * * *'
  queue.scheduleBegin = new Date(2020, 0, 1)
  queue.scheduleEnd = new Date(2021, 0, 1)
  // queue.scheduleNext = new Date(2020, 0, 1)

  const hourTask = new Task()
  hourTask.name = 'hour'
  hourTask.order = 1

  const dayTask = new Task()
  dayTask.name = 'day'
  dayTask.order = 2

  const monthTask = new Task()
  monthTask.name = 'month'
  monthTask.order = 3

  queue.tasks = [hourTask, dayTask, monthTask]

  return getManager('docker').save(queue)
}
