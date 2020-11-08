import fetch, {
  Response
} from 'node-fetch'

import { Readable } from 'stream'

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
  totalEnergy: number
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
  serialNumber: string
  siteId: string
  startTime: Date
}

export class DataReader extends Readable {
  public apiKey: string

  public data: Datum[] = []

  public endTime?: Date

  public fetch = fetch

  public nextStartTime: Date

  public path: string

  public startTime: Date

  public tries = 0

  public constructor (options: DataReaderOptions) {
    super({
      objectMode: true
    })

    const {
      apiKey,
      endTime,
      serialNumber,
      siteId,
      startTime
    } = options

    this.apiKey = apiKey
    this.endTime = endTime
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

  protected handleResponse (response: Response): void {
    if (response.status === 200) {
      if (response.headers.get('Content-Type')?.includes('json') === true) {
        this.handleDataJSON(response)
      } else {
        this.handleDataText(response)
      }
    } else if (response.status > 405 && this.tries < 3) {
      this.readData()
    } else {
      this.handleError(response)
    }
  }

  protected handleTelemetries (data: Data): void {
    this.data = data.data?.telemetries ?? []
    this.startTime = this.nextStartTime
    this.tries = 0

    if (this.data.length) {
      this.push(this.data.shift())
    } else {
      this.push(null)
    }
  }

  protected readData (): void {
    const { startTime } = this
    let { endTime } = this

    if (endTime === undefined) {
      endTime = new Date(startTime)
      endTime.setDate(endTime.getDate() + 1)
    }

    this.nextStartTime = endTime
    this.tries += 1

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

    this.fetch(url)
      .then((response) => {
        this.handleResponse(response)
      })
      .catch((error: unknown) => {
        this.emit('error', `Request error: ${String(error)}`)
      })
  }
}
