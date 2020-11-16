import {
  InsertResult,
  getConnection
} from '@scola/lib'

import { Writable } from 'stream'

export interface LogWriterOptions {
  maxLength?: number
  maxTries?: number
  table: string
}

export class LogWriter<T> extends Writable {
  public maxLength: number

  public maxTries: number

  public table: string

  protected values: T[] = []

  public constructor (options: LogWriterOptions) {
    super({
      objectMode: true
    })

    const {
      maxLength = 1000,
      maxTries = 3,
      table
    } = options

    this.maxLength = maxLength
    this.maxTries = maxTries
    this.table = table
  }

  public _final (callback: (error?: Error) => void): void {
    this
      .commit(this.values.splice(0))
      .then(() => {
        callback()
      })
      .catch((error) => {
        callback(error)
      })
  }

  public _write (value: T, encoding: string, callback: (error?: Error) => void): void {
    this.values.push(value)

    if (this.values.length >= this.maxLength) {
      this
        .commit(this.values.splice(0, this.maxLength))
        .then(() => {
          callback()
        })
        .catch((error) => {
          callback(error)
        })
    } else {
      callback()
    }
  }

  protected async commit (values: T[], numTries = 0): Promise<InsertResult> {
    return getConnection('local')
      .createQueryBuilder()
      .insert()
      .into(this.table, [
        'name',
        'id',
        'timestamp',
        'offset',
        'value'
      ])
      .orUpdate({
        overwrite: ['value']
      })
      .values(values)
      .execute()
      .catch(async (error): Promise<InsertResult> => {
        if (numTries < this.maxTries) {
          return this.commit(values, numTries + 1)
        }

        throw new Error(`Log write error: ${String(error)}`)
      })
  }
}
