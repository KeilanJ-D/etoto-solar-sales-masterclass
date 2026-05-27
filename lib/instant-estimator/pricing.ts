// lib/instant-estimator/pricing.ts
// ============================================
// Indicative trade pricing for the Instant Estimator training tool.
// These are TRAINING numbers — real SolaFlow uses tenant-configured
// pricing tiers. Reps practising here should learn the SHAPE of the
// quote, then verify against their company's actual pricing config
// inside the real SolaFlow dashboard.
// ============================================

/** Installed price per panel (panel + labour share + fixings) */
export const PANEL_PRICE = 95

/** Per-kWp labour + scaffolding baseline added on top of panel price */
export const PRICE_PER_KWP_LABOUR = 700

/** £ per battery unit (training defaults — editable in real SolaFlow) */
export const BATTERY_PRICE_MAP: Record<string, number> = {
  'anker-solix-x1-5kwh': 1800,
  'bexie-bxb-5klv-pro-5kwh': 2400,
  'ecoflow-powerocean-5kwh': 1500,
  'foxess-ep6-5.76kwh': 1750,
  'foxess-ep12-11.52kwh': 3200,
  'powervault-p5-5kwh': 1900,
  'sigenergy-6.0-5.84kwh': 2800,
  'sigenergy-10.0-9.04kwh': 4200,
  'tesla-powerwall-3-13.5kwh': 7800,
}

/** £ per inverter unit (training defaults) */
export const INVERTER_PRICE_MAP: Record<string, number> = {
  // Anker
  'anker-solix-3.68kw': 950,
  'anker-solix-4.6kw': 1100,
  'anker-solix-5kw': 1200,
  'anker-solix-6kw': 1450,
  // FOX ESS H1 (battery hybrid)
  'foxess-h1-3.7kw': 950,
  'foxess-h1-5kw': 1100,
  'foxess-h1-6kw': 1300,
  // FOX K series
  'foxess-k-3.7kw': 850,
  'foxess-k-5kw': 1000,
  // Sigenergy
  'sigenergy-5kw': 1450,
  'sigenergy-6kw': 1650,
  'sigenergy-8kw': 1950,
  // EcoFlow
  'ecoflow-5kw': 850,
  'ecoflow-6kw': 1050,
  // Tesla (Gateway only — Powerwall 3 is hybrid)
  'tesla-gateway': 950,
  // Powervault
  'powervault-inv-5kw': 1200,
  // Bexie
  'bexie-1ph-5kw': 1300,
}

export const FALLBACK_BATTERY_PRICE = 2000
export const FALLBACK_INVERTER_PRICE = 1200

/** Roof-type surcharge per panel (over baseline tile) */
export const ROOF_SURCHARGE_PER_PANEL: Record<string, number> = {
  tile: 0,
  slate: 25,
  flat: 35,
}

export function getBatteryPrice(sku: string | null | undefined): number {
  if (!sku) return 0
  return BATTERY_PRICE_MAP[sku] ?? FALLBACK_BATTERY_PRICE
}

export function getInverterPrice(sku: string | null | undefined): number {
  if (!sku) return 0
  return INVERTER_PRICE_MAP[sku] ?? FALLBACK_INVERTER_PRICE
}

/** Compute installed solar cost: panels + per-kWp labour + roof surcharge */
export function computeSolarCost(opts: {
  panelCount: number
  panelWattage: number
  roofType: keyof typeof ROOF_SURCHARGE_PER_PANEL
}): { panelCost: number; labourCost: number; roofSurcharge: number; total: number } {
  const panelCost = opts.panelCount * PANEL_PRICE
  const kwp = (opts.panelCount * opts.panelWattage) / 1000
  const labourCost = Math.round(kwp * PRICE_PER_KWP_LABOUR)
  const roofSurcharge = opts.panelCount * (ROOF_SURCHARGE_PER_PANEL[opts.roofType] ?? 0)
  return {
    panelCost,
    labourCost,
    roofSurcharge,
    total: panelCost + labourCost + roofSurcharge,
  }
}
