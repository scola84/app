import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupAddressBalancer (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-address'
  queue.query = `
    SELECT DISTINCT
      address_id,
      ? AS queueRunId
    FROM
      platform.balancer_address
    WHERE
      balancer_id IN (17, 767)
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

export async function setupAddressInverter (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-address'
  queue.query = `
    SELECT DISTINCT
      address_id,
      ? AS queueRunId
    FROM
      platform.inverter_address
    WHERE
      inverter_id IN (10001, 10002)
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

export async function setupAddressPrepareBalancer (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-address-prepare-balancer'
  queue.query = `
    SELECT
      *
    FROM
      platform.balancer_address
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

export async function setupAddressPrepareInverter (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-address-prepare-inverter'
  queue.query = `
    SELECT
      *
    FROM
      platform.inverter_address
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
