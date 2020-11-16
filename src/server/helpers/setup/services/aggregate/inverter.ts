import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupInverter (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-inverter'
  queue.query = `
    SELECT 
      activated,
      inverter_id,
      (SELECT 
              SUM(panel.amount * panel.capacity)
          FROM
              platform.inverter_panel panel
          WHERE
              panel.inverter_id = inverter.inverter_id) AS capacity
    FROM
      platform.inverter
    WHERE
      inverter_id IN (10001, 10002)
  `
  queue.schedule = '0 * * * *'
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

  queue.previousQueue = previousQueue
  queue.tasks = [hourTask, dayTask, monthTask]

  return getManager('docker').save(queue)
}
