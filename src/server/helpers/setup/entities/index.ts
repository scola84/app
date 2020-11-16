import { setupAddress } from './address'
import { setupBalancer } from './balancer'
import { setupInverter } from './inverter'
import { setupLocation } from './location'
import { setupOrganisation } from './organisation'

export async function setupEntities (): Promise<void> {
  await setupAddress()
  await setupBalancer()
  await setupInverter()
  await setupLocation()
  await setupOrganisation()
}
