// lib/solaflow/product-compatibility.ts
// ============================================
// Lifted from SolaFlow Dashboard `client/src/lib/productCalc.ts`.
// Determines whether an inverter is compatible with a given battery —
// used by the Instant Estimator picker and the auto-clear effect that
// drops a stale inverter SKU when the user switches battery brand.
//
// Same logic everywhere prevents the masterclass and the real tool
// from showing different compatible inverter lists.
// ============================================

import type { Battery, Inverter } from '@/lib/solaflow-products'

/** True if this inverter can be paired with this battery. */
export function isInverterBatteryCompatible(
  inverter: Inverter,
  battery: Battery,
): boolean {
  if (!inverter.batteryCompatible) return false
  if (inverter.isGateway) return false
  return (
    inverter.compatibleBrands.includes(battery.brand) ||
    inverter.compatibleBrands.includes('Universal')
  )
}

/** Filter a list of inverters to only those compatible with the battery. */
export function getCompatibleInverters(
  inverters: Inverter[],
  battery: Battery,
): Inverter[] {
  return inverters.filter((inv) => isInverterBatteryCompatible(inv, battery))
}
