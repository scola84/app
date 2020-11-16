import { setupEntities } from './entities'
import { setupServices } from './services'

export async function setup (): Promise<void> {
  await setupEntities()
  await setupServices()
}
