import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupOrganisation (previousQueue: Queue): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-organisation'
  queue.query = `
    SELECT DISTINCT
      organisation_id,
      ? as queueRunId
    FROM
      platform.organisation_location
    WHERE
      organisation_id IN (10001)
  `

  const dayTask = new Task()
  dayTask.name = 'day'
  dayTask.order = 1

  const monthTask = new Task()
  monthTask.name = 'month'
  monthTask.order = 2

  const finalTask = new Task()
  finalTask.name = 'final'
  finalTask.order = 3

  queue.previousQueue = previousQueue
  queue.tasks = [dayTask, monthTask, finalTask]

  return getManager('docker').save(queue)
}

export async function setupOrganisationPrepare (): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'aggregate-organisation-prepare-location'
  queue.query = `
    SELECT
      *
    FROM
      platform.organisation_location
    WHERE
      organisation_id IN (10001)
  `
  queue.schedule = '30 * * * *'
  queue.scheduleBegin = new Date(2020, 0, 1)
  queue.scheduleEnd = new Date(2021, 0, 1)
  // queue.scheduleNext = new Date(2020, 0, 1)

  const mainTask = new Task()
  mainTask.name = 'main'
  mainTask.order = 1

  queue.tasks = [mainTask]

  return getManager('docker').save(queue)
}
