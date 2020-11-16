import fetch, {
  Response
} from 'node-fetch'

import { Readable } from 'stream'
import queue from './queue'

export interface Data {
  data: {
    count?: number,
    telemetries?: Datum[]
  } | undefined
}

export interface Datum {
  date: string
  totalActivePower: number
  dcVoltage: number
  powerLimit: number
  totalEnergy?: number
  temperature: number
  inverterMode: string
  operationMode: number
  L1Data: {
    acCurrent: number
    acVoltage: number
    acFrequency: number
    apparentPower: number
    activePower: number
    reactivePower: number
    cosPhi: number
  }
}

export interface DataReaderOptions {
  apiKey: string
  endTime?: Date
  maxTries?: number
  numDays?: number
  serialNumber: string
  siteId: string
  startTime: Date
}

export class DataReader extends Readable {
  public apiKey: string

  public data: Datum[] = []

  public endTime?: Date

  public fetch = fetch

  public maxTries: number

  public nextStartTime: Date

  public numDays: number

  public path: string

  public startTime: Date

  public constructor (options: DataReaderOptions) {
    super({
      objectMode: true
    })

    const {
      apiKey,
      endTime,
      maxTries,
      numDays,
      serialNumber,
      siteId,
      startTime
    } = options

    this.apiKey = apiKey
    this.endTime = endTime
    this.maxTries = maxTries ?? 3
    this.numDays = numDays ?? 6
    this.startTime = startTime

    this.path = [
      '/equipment',
      siteId,
      serialNumber,
      'data.json'
    ].join('/')
  }

  public _read (): void {
    if (this.data.length) {
      this.push(this.data.shift())
    } else if (this.nextStartTime > new Date()) {
      this.push(null)
    } else {
      this.readData()
    }
  }

  protected handleDataJSON (response: Response): void {
    response
      .json()
      .then((data: Data) => {
        if (data.data?.telemetries) {
          this.handleTelemetries(data)
        } else {
          this.emit('error', new Error('No telemetries found'))
        }
      })
      .catch((error: Error) => {
        this.emit('error', new Error(`Could not process JSON data: ${error.message}`))
      })
  }

  protected handleDataText (response: Response): void {
    response
      .text()
      .then((data: string) => {
        this.emit('error', new Error(`Unexpected response: ${data}`))
      })
      .catch((error: unknown) => {
        this.emit('error', new Error(`Could not process text data: ${String(error)}`))
      })
  }

  protected handleError (response: Response): void {
    if (response.headers.get('Content-Type')?.includes('json') === true) {
      this.handleErrorJSON(response)
    } else {
      this.handleErrorText(response)
    }
  }

  protected handleErrorJSON (response: Response): void {
    response
      .json()
      .then((data: unknown) => {
        this.emit(
          'error',
          new Error(`Response error (${response.status}): ${JSON.stringify(data)}`)
        )
      })
      .catch((error: Error) => {
        this.emit('error', new Error(`Could not process JSON error: ${error.message}`))
      })
  }

  protected handleErrorText (response: Response): void {
    response
      .text()
      .then((data: string) => {
        this.emit('error', new Error(`Response error (${response.status}): ${data}`))
      })
      .catch((error: unknown) => {
        this.emit('error', new Error(`Could not process text error: ${String(error)}`))
      })
  }

  protected handleResponse (response: Response, numTries = 0): void {
    if (response.status === 200) {
      if (response.headers.get('Content-Type')?.includes('json') === true) {
        this.handleDataJSON(response)
      } else {
        this.handleDataText(response)
      }
    } else if (response.status > 405 && numTries < this.maxTries) {
      this.readData(numTries + 1)
    } else {
      this.handleError(response)
    }
  }

  protected handleTelemetries (data: Data): void {
    this.data = data.data?.telemetries ?? []
    this.startTime = this.nextStartTime
    this._read()
  }

  protected readData (numTries?: number): void {
    const { startTime } = this
    let { endTime } = this

    if (endTime === undefined) {
      endTime = new Date(startTime)
      endTime.setDate(endTime.getDate() + this.numDays)
    }

    this.nextStartTime = endTime
    const url = new URL(this.path, 'https://monitoringapi.solaredge.com')

    url.searchParams.append(
      'api_key',
      this.apiKey
    )

    url.searchParams.append(
      'startTime',
      startTime
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    )

    url.searchParams.append(
      'endTime',
      endTime
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
    )

    queue.push((callback) => {
      this.fetch(url)
        .then((response) => {
          callback()
          this.handleResponse(response, numTries)
        })
        .catch((error: unknown) => {
          callback()
          this.emit('error', `Request error: ${String(error)}`)
        })
    })
  }
}
