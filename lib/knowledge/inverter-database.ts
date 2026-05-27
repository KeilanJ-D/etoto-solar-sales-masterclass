// lib/knowledge/inverter-database.ts
// ============================================
// Inverter database used by /tools/inverter-sizing.
// Re-exports from the canonical SolaFlow products library
// so the masterclass + SolaFlow stay in lock-step.
// ============================================

import { inverters as solaflowInverters } from '@/lib/solaflow-products'

export type InverterSpec = {
  id: string
  brand: string
  model: string
  phase: 'single' | 'three'
  acPowerKw: number
  batteryPowerKw: number
  mpptCount: number
  type: 'hybrid' | 'string' | 'battery-only'
  approxTradePriceGBP: number
  notes?: string
}

// Mapped from the canonical SolaFlow inverter list.
// Battery throughput + MPPT count + indicative trade prices are
// editorial overlays on top of the SolaFlow spec data — these are
// the sales-side details an installer cares about that don't
// live in the consumer-facing /d-products JSON.
export const inverterDatabase: InverterSpec[] = solaflowInverters
  .filter((i) => !i.isGateway && i.ratingKw > 0)
  .map((inv) => {
    const phase: 'single' | 'three' =
      inv.phaseType === 'Three Phase' ? 'three' : 'single'
    // Battery throughput estimates — based on published spec sheets +
    // observed install behaviour. Override default = ratingKw × 0.95
    const batteryPowerKw = batteryPowerEstimate(inv.brand, inv.ratingKw)
    const mpptCount = mpptEstimate(inv.brand, inv.ratingKw, phase)
    const price = tradePriceEstimate(inv.brand, inv.ratingKw)
    return {
      id: inv.sku,
      brand: inv.brand,
      model: inv.name,
      phase,
      acPowerKw: inv.ratingKw,
      batteryPowerKw,
      mpptCount,
      type: 'hybrid',
      approxTradePriceGBP: price,
      notes: inv.description?.[0],
    }
  })

function batteryPowerEstimate(brand: string, ratingKw: number): number {
  // Sigenergy hybrid inverters can usually push higher battery rate than AC rate
  if (brand === 'Sigenergy') return Math.round(ratingKw * 1.2 * 10) / 10
  // Tesla Powerwall is integrated, treated separately
  // Most others: battery throughput ≈ AC rating
  return ratingKw
}

function mpptEstimate(
  brand: string,
  ratingKw: number,
  phase: 'single' | 'three',
): number {
  // Three-phase + 10kW+ usually 3 MPPTs
  if (phase === 'three' && ratingKw >= 10) return 3
  // Mid-range Sigenergy + FOX K usually 2-3 MPPTs
  if (brand === 'Sigenergy' && ratingKw >= 8) return 3
  if (brand === 'FOX ESS' && ratingKw >= 7) return 2
  // Most hybrid inverters in 3-6kW range have 2 MPPTs
  if (ratingKw >= 3.6) return 2
  return 1
}

function tradePriceEstimate(brand: string, ratingKw: number): number {
  // Indicative UK trade prices Q2 2026. Update as suppliers change.
  const brandMultipliers: Record<string, number> = {
    EcoFlow: 180, // budget tier
    Powervault: 200,
    Anker: 220,
    'FOX ESS': 220,
    Bexie: 280, // premium European
    Sigenergy: 320, // flagship
    Tesla: 0, // integrated; sold with Powerwall
  }
  const base = brandMultipliers[brand] || 220
  return Math.round((base * ratingKw) / 10) * 10
}
