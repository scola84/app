/* eslint-disable max-classes-per-file */

import { Log } from '../../entities'
import { Transform } from 'stream'

export interface LogAggregatorOptions {
  capacity?: number | null
}

interface AggregatorOptions {
  aggregator: LogAggregator
  capacity?: number | null
  id: number
  name: string
}

class Aggregator {
  public aggregator: LogAggregator

  public capacity: number | null = null

  public currentTimestamp = 0

  public currentValue = 0

  public delta = 0

  public id: number

  public max = Infinity

  public name: string

  public previousOffset = 0

  public previousTimestamp = 0

  public previousTimestampDelta = 0

  public previousValue = 0

  public constructor (options: AggregatorOptions) {
    const {
      aggregator,
      capacity = null,
      id,
      name
    } = options

    this.aggregator = aggregator
    this.capacity = capacity
    this.id = id
    this.name = name
  }

  public final (): void {
    this.push()
  }

  public transform (log: Log): void {
    const date = new Date(Number(log.timestamp))
    date.setMilliseconds(0)
    date.setSeconds(0)
    date.setMinutes(Math.floor(date.getMinutes() / 15) * 15)

    this.currentTimestamp = date.valueOf()
    this.currentValue = Number(log.value)

    if (this.currentTimestamp !== this.previousTimestamp) {
      this.push(log)
    }

    let diff = this.currentValue - this.previousValue

    if (this.previousValue === 0) {
      diff = 0
    } else if (diff < 0) {
      diff = 0
    } else if (diff > this.max) {
      diff = 0
    }

    this.delta += diff
    this.previousValue = this.currentValue

    if (diff > 0) {
      this.previousTimestampDelta = this.currentTimestamp
    }
  }

  protected push (log?: Log): void {
    if (this.previousTimestamp !== 0) {
      this.aggregator.push([
        this.name,
        this.id,
        String(this.previousTimestamp),
        this.previousOffset,
        String(this.delta)
      ])

      this.max = this.capacity === null
        ? Infinity
        : 2 * this.capacity * (this.currentTimestamp - this.previousTimestampDelta) / 3600000
    }

    this.delta = 0
    this.previousOffset = log?.offset ?? 0
    this.previousTimestamp = this.currentTimestamp
  }
}

export class LogAggregator extends Transform {
  public aggregators: Map<number, Aggregator> = new Map<number, Aggregator>()

  public capacity: number | null = null

  public constructor (options: LogAggregatorOptions) {
    super({
      objectMode: true
    })

    const {
      capacity = null
    } = options

    this.capacity = capacity
  }

  public _final (callback: () => void): void {
    this.aggregators.forEach((aggregator) => {
      aggregator.final()
    })

    callback()
  }

  public _transform (log: Log, encoding: string, callback: () => void): void {
    if (!this.aggregators.has(log.id)) {
      this.aggregators.set(log.id, new Aggregator({
        aggregator: this,
        capacity: this.capacity,
        id: log.id,
        name: log.name
      }))
    }

    this.aggregators.get(log.id)?.transform(log)
    callback()
  }
}
