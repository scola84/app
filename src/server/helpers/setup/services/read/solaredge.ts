import {
  Queue,
  Task,
  getManager
} from '@scola/lib'

export async function setupSolarEdge (): Promise<Queue> {
  const queue = new Queue()
  queue.connection = 'local'
  queue.name = 'read-solaredge-data'
  queue.query = `
    SELECT 
      inverter.inverter_id,
      inverter.activated,
      inverter.serial_number,
      location.timezone,
      (SELECT 
              organisation_setting.value
          FROM
              platform.organisation_location
                  LEFT JOIN
              platform.organisation_setting 
                  ON organisation_location.organisation_id = organisation_setting.organisation_id
          WHERE
              organisation_location.location_id = location_inverter.location_id
                  AND organisation_setting.name = 'solaredge.api_key') AS api_key,
      (SELECT 
              location_setting.value
          FROM
          platform.location_setting
          WHERE
              location_setting.location_id = location_inverter.location_id
                  AND location_setting.name = 'solaredge.site_id') AS site_id
    FROM
      platform.inverter
          LEFT JOIN
      platform.location_inverter ON inverter.inverter_id = location_inverter.inverter_id
          LEFT JOIN
      platform.location ON location_inverter.location_id = location.location_id
    WHERE
      inverter.activated IS NOT NULL
          AND inverter.manufacturer = 'solaredge'
          AND inverter.inverter_id IN (10001, 10002)
  `
  queue.schedule = '0 * * * *'
  queue.scheduleBegin = new Date(2020, 0, 1)
  queue.scheduleEnd = new Date(2021, 0, 1)
  queue.scheduleNext = new Date(2020, 0, 1)

  const task = new Task()
  task.name = 'main'
  task.order = 1

  queue.tasks = [task]

  return getManager('docker').save(queue)
}
