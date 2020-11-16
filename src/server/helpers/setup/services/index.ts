import {
  setupAddressBalancer,
  setupAddressInverter,
  setupAddressPrepareBalancer,
  setupAddressPrepareInverter,
  setupBalancer,
  setupInverter,
  setupLocationBalancer,
  setupLocationInverter,
  setupLocationPrepareBalancer,
  setupLocationPrepareInverter,
  setupOrganisation,
  setupOrganisationPrepare
} from './aggregate'

import {
  setupSolarEdge
} from './read'

export async function setupServices (): Promise<void> {
  const solarEdgeQueue = await setupSolarEdge()

  const balancerQueue = await setupBalancer()
  const addressPrepareBalancerQueue = await setupAddressPrepareBalancer(balancerQueue)
  const locationPrepareBalancerQueue = await setupLocationPrepareBalancer(balancerQueue)

  const inverterQueue = await setupInverter(solarEdgeQueue)
  const addressPrepareInverterQueue = await setupAddressPrepareInverter(inverterQueue)
  const locationPrepareInverterQueue = await setupLocationPrepareInverter(inverterQueue)

  await setupAddressBalancer(addressPrepareBalancerQueue)
  await setupLocationBalancer(locationPrepareBalancerQueue)
  await setupAddressInverter(addressPrepareInverterQueue)
  await setupLocationInverter(locationPrepareInverterQueue)

  await setupOrganisation(await setupOrganisationPrepare())
}
