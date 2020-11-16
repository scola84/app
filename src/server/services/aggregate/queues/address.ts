import {
  day,
  final,
  hour,
  month,
  prepareBalancer,
  prepareInverter
} from './address/'

export function aggregateAddress (): void {
  day()
  final()
  hour()
  month()
  prepareBalancer()
  prepareInverter()
}
