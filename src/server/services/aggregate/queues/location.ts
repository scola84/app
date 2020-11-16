import {
  day,
  final,
  hour,
  month,
  prepareBalancer,
  prepareInverter
} from './location/'

export function aggregateLocation (): void {
  day()
  final()
  hour()
  month()
  prepareBalancer()
  prepareInverter()
}
