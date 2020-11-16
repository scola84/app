import { Transform } from 'stream'

export interface CacheLogTransformerOptions {
  id: number
  name: string
}

export class CacheLogTransformer extends Transform {
  public id: number

  public name: string

  public constructor (options: CacheLogTransformerOptions) {
    super({
      objectMode: true
    })

    const {
      id,
      name
    } = options

    this.id = id
    this.name = name
  }

  public _transform (
    [tsos, value]: [string, string],
    encoding: string,
    callback: (error: Error | null, value: unknown) => void
  ): void {
    callback(null, [
      this.name,
      this.id,
      ...tsos.split('-'),
      value
    ])
  }
}
