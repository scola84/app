import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupLocationBalancer (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-location'
  queue.query = `
    SELECT DISTINCT
      location_id,
      ? as queueRunId
    FROM platform.location_balancer
    WHERE location_id IN (10003)
  `

  const hourTask = new Task()
  hourTask.name = 'hour'
  hourTask.order = 1

  const dayTask = new Task()
  dayTask.name = 'day'
  dayTask.order = 2

  const monthTask = new Task()
  monthTask.name = 'month'
  monthTask.order = 3

  const finalTask = new Task()
  finalTask.name = 'final'
  finalTask.order = 4

  queue.previousQueue = previousQueue
  queue.tasks = [hourTask, dayTask, monthTask, finalTask]

  return getManager('docker').save(queue)
}

export async function setupLocationInverter (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-location'
  queue.query = `
    SELECT DISTINCT
      location_id,
      ? AS queueRunId
    FROM platform.location_inverter
    WHERE location_id IN (10001, 10002)
  `

  const hourTask = new Task()
  hourTask.name = 'hour'
  hourTask.order = 1

  const dayTask = new Task()
  dayTask.name = 'day'
  dayTask.order = 2

  const monthTask = new Task()
  monthTask.name = 'month'
  monthTask.order = 3

  const finalTask = new Task()
  finalTask.name = 'final'
  finalTask.order = 4

  queue.previousQueue = previousQueue
  queue.tasks = [hourTask, dayTask, monthTask, finalTask]

  return getManager('docker').save(queue)
}

export async function setupLocationPrepareBalancer (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-location-prepare-balancer'
  queue.query = `
    SELECT
      *
    FROM
      platform.location_balancer
    WHERE
      balancer_id IN (17, 767)
  `

  const mainTask = new Task()
  mainTask.name = 'main'
  mainTask.order = 1

  queue.previousQueue = previousQueue
  queue.tasks = [mainTask]

  return getManager('docker').save(queue)
}

export async function setupLocationPrepareInverter (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-location-prepare-inverter'
  queue.query = `
    SELECT
      *
    FROM
      platform.location_inverter
    WHERE
      inverter_id IN (10001, 10002)
  `

  const mainTask = new Task()
  mainTask.name = 'main'
  mainTask.order = 1

  queue.previousQueue = previousQueue
  queue.tasks = [mainTask]

  return getManager('docker').save(queue)
}
