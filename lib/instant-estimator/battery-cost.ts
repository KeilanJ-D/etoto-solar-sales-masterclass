// lib/instant-estimator/battery-cost.ts
// ============================================
// Battery + inverter quantity/cost helpers that match real SolaFlow
// pricing semantics for the two edge cases the basic unit × qty math
// missed:
//
// 1. EXPANSION PACK pricing — Tesla Powerwall 3 ships as "1 main unit +
//    up to 3 expansion packs". Expansion packs are cheaper per unit than
//    a full new Powerwall. Without this, a rep modelling 4× PW3 sees a
//    number thousands of pounds higher than the real SolaFlow output.
//
// 2. requiresInverterPerStack — EcoFlow PowerOcean, Powervault P5,
//    Sigenergy SigenStor all need a dedicated inverter PER STACK of
//    batteries. Currently capped at single-stack in the picker but the
//    logic is here for when multi-stack support lands.
//
// Both maps are TRAINING defaults — real SolaFlow uses tenant-configured
// pricing tiers. Verify against your company's SolaFlow before quoting.
// ============================================

import type { Battery } from '@/lib/solaflow-products'
import { getBatteryPrice } from './pricing'

/** £ per expansion pack unit (cheaper than buying another main battery).
 * Tesla PW3 expansion pack confirmed cheaper per the catalogue description.
 * Number is indicative — please verify against tenant SolaFlow config. */
export const EXPANSION_PACK_PRICE_MAP: Record<string, number> = {
  'tesla-powerwall-3-13.5kwh': 6800, // vs £7,800 main unit
}

export interface BatteryCostBreakdown {
  total: number
  baseUnitPrice: number
  baseQuantity: number
  expansionUnitPrice: number
  expansionQuantity: number
  /** Human-readable breakdown string for display in cost summary */
  description: string
}

/**
 * Compute battery cost factoring in expansion-pack pricing.
 * For batteries WITHOUT an expansion pack option, falls back to unit × qty.
 * Mirrors real SolaFlow's `computeBatteryCost` in productCalc.ts.
 */
export function computeBatteryCost(
  battery: Battery | undefined,
  quantity: number,
): BatteryCostBreakdown {
  if (!battery || quantity <= 0) {
    return {
      total: 0,
      baseUnitPrice: 0,
      baseQuantity: 0,
      expansionUnitPrice: 0,
      expansionQuantity: 0,
      description: '',
    }
  }

  const baseUnitPrice = getBatteryPrice(battery.sku)
  const expansionUnitPrice = EXPANSION_PACK_PRICE_MAP[battery.sku] ?? baseUnitPrice
  const hasExpansionPack = !!battery.expansionPack && expansionUnitPrice < baseUnitPrice

  if (hasExpansionPack && quantity > 1) {
    const expansionQuantity = quantity - 1
    const total = baseUnitPrice + expansionQuantity * expansionUnitPrice
    return {
      total,
      baseUnitPrice,
      baseQuantity: 1,
      expansionUnitPrice,
      expansionQuantity,
      description: `1× ${battery.name} (£${baseUnitPrice.toLocaleString()}) + ${expansionQuantity}× Expansion Pack (£${expansionUnitPrice.toLocaleString()} each)`,
    }
  }

  return {
    total: baseUnitPrice * quantity,
    baseUnitPrice,
    baseQuantity: quantity,
    expansionUnitPrice: 0,
    expansionQuantity: 0,
    description: `${quantity}× ${battery.name} (£${baseUnitPrice.toLocaleString()} each)`,
  }
}

/**
 * Compute number of inverter units a system needs.
 *
 * - No battery + no panels → 0 (nothing to invert)
 * - Hybrid battery (e.g. Tesla PW3) → 0 (inverter built into battery)
 * - requiresInverterPerStack → ceil(batteryQuantity / maxPerStack)
 * - Battery (non-hybrid, no per-stack req) → 1 inverter handles everything
 * - Solar-only (no battery) → 1 inverter
 */
export function computeInverterQuantity(
  battery: Battery | undefined,
  batteryQuantity: number,
  hasPanels: boolean,
): number {
  // Nothing to invert
  if (!battery && !hasPanels) return 0

  // Hybrid battery includes its own inverter
  if (battery?.hybrid) return 0

  // No battery selected but panels present → solar-only needs 1 inverter
  if (!battery || batteryQuantity <= 0) {
    return hasPanels ? 1 : 0
  }

  // Per-stack requirement (EcoFlow, Powervault, Sigenergy)
  if (battery.requiresInverterPerStack && battery.maxPerStack) {
    return Math.max(1, Math.ceil(batteryQuantity / battery.maxPerStack))
  }

  // Standard single-inverter setup (Anker, FoxESS EP6/EP12, Bexie)
  return 1
}
