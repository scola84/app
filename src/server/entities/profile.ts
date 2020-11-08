import fluent from 'fluent-schema'

export class Profile {
  public static schema = fluent
    .object()
    .id('profile')
    .prop('given_name', fluent
      .string()
      .required())
    .prop('family_name', fluent
      .string()
      .required())
    .prop('range', fluent
      .number()
      .minimum(10)
      .maximum(30))
}
