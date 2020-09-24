import fluent from 'fluent-schema'

export class Select {
  public static schema = fluent
    .object()
    .id('select')
    .prop('test', fluent.number())
    .prop('test1', fluent.number())
}
