import { Log } from '../../../entities/log'
import { Transform } from 'stream'

export class DatabaseLogTransformer extends Transform {
  public constructor () {
    super({
      objectMode: true
    })
  }

  public _transform (log: Log, encoding: string, callback: () => void): void {
    this.push([
      log.name,
      log.id,
      log.timestamp,
      0,
      String(log.value)
    ])

    callback()
  }
}
