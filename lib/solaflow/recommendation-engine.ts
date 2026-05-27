/**
 * lib/solaflow/recommendation-engine.ts
 * ============================================
 * SolaFlow's canonical sizing recommendation engine.
 * LIFTED directly from the SolaFlow Dashboard codebase
 * (SaaS-Dashboard-Pro 3/client/src/lib/recommendationEngine.ts).
 *
 * Pure functions, zero dependencies — safe to use anywhere.
 * Used in the masterclass demo dashboard for realistic sizing
 * recommendations that match what SolaFlow actually suggests.
 * ============================================
 */

export interface BatteryRecommendation {
  recommendedUsableCapacityKwh: number
  minUsableCapacityKwh: number
  maxUsableCapacityKwh: number
  dailyKwh: number
  bandLabel: string
}

export interface PanelRecommendation {
  recommendedPanels: number
  assumedPanelWattage: number
  estimatedSystemKwp: number
  explanation: string
}

export interface InverterRecommendation {
  recommendedPowerKw: number
  minAcceptablePowerKw: number
  maxAcceptablePowerKw: number
  explanation: string
}

export interface InverterFitCheck {
  withinBand: boolean
  status: 'ok' | 'undersized' | 'oversized' | 'no-system'
  message: string
}

export const RECOMMENDATION_PSH = 3.2
export const PERFORMANCE_RATIO = 0.78
export const MIN_PANELS = 4
export const MAX_PANELS = 20

const RECOMMENDATION_BAND = 0.2
const FALLBACK_BATTERY_USABLE_KWH = 10

export type PropertyType =
  | 'terraced'
  | 'semi-detached'
  | 'detached'
  | 'bungalow'
  | 'other'
  | 'flat-homeowner'
  | 'flat-non-homeowner'

export interface PropertyPanelDefault {
  min: number | null
  max: number | null
  recommended: number | null
  skip: boolean
}

export const PROPERTY_PANEL_DEFAULTS: Record<PropertyType, PropertyPanelDefault> = {
  terraced: { min: 8, max: 10, recommended: 9, skip: false },
  'semi-detached': { min: 12, max: 14, recommended: 13, skip: false },
  detached: { min: 14, max: 18, recommended: 16, skip: false },
  bungalow: { min: 12, max: 16, recommended: 14, skip: false },
  other: { min: 10, max: 14, recommended: 12, skip: false },
  'flat-homeowner': { min: null, max: null, recommended: null, skip: true },
  'flat-non-homeowner': { min: 10, max: 14, recommended: 12, skip: false },
}

export function checkInverterFit(
  selectedPowerKw: number,
  rec: InverterRecommendation,
): InverterFitCheck {
  if (rec.recommendedPowerKw <= 0) {
    return { withinBand: true, status: 'no-system', message: '' }
  }
  if (selectedPowerKw < rec.minAcceptablePowerKw) {
    return {
      withinBand: false,
      status: 'undersized',
      message: `Undersized — recommended ≥${rec.minAcceptablePowerKw.toFixed(1)} kW for this system.`,
    }
  }
  if (selectedPowerKw > rec.maxAcceptablePowerKw) {
    return {
      withinBand: false,
      status: 'oversized',
      message: `Oversized — recommended ≤${rec.maxAcceptablePowerKw.toFixed(1)} kW for this system.`,
    }
  }
  return { withinBand: true, status: 'ok', message: '' }
}

export function getBatteryRecommendation(annualUsageKwh: number): BatteryRecommendation {
  if (annualUsageKwh <= 0) {
    const min = Math.round(FALLBACK_BATTERY_USABLE_KWH * (1 - RECOMMENDATION_BAND))
    const max = Math.round(FALLBACK_BATTERY_USABLE_KWH * (1 + RECOMMENDATION_BAND))
    return {
      recommendedUsableCapacityKwh: FALLBACK_BATTERY_USABLE_KWH,
      minUsableCapacityKwh: min,
      maxUsableCapacityKwh: max,
      dailyKwh: 0,
      bandLabel: `Recommended ${FALLBACK_BATTERY_USABLE_KWH} kWh (default)`,
    }
  }
  const dailyKwh = annualUsageKwh / 365
  const recommendedUsableCapacityKwh = Math.round(dailyKwh)
  const minUsableCapacityKwh = Math.round(
    recommendedUsableCapacityKwh * (1 - RECOMMENDATION_BAND),
  )
  const maxUsableCapacityKwh = Math.round(
    recommendedUsableCapacityKwh * (1 + RECOMMENDATION_BAND),
  )
  return {
    recommendedUsableCapacityKwh,
    minUsableCapacityKwh,
    maxUsableCapacityKwh,
    dailyKwh,
    bandLabel: `Recommended for ${Math.round(dailyKwh)} kWh/day`,
  }
}

export function calculateRecommendedPanels(
  annualUsageKwh: number,
  assumedPanelWattage = 470,
): PanelRecommendation {
  if (annualUsageKwh <= 0 || assumedPanelWattage <= 0) {
    return {
      recommendedPanels: 0,
      assumedPanelWattage,
      estimatedSystemKwp: 0,
      explanation: 'Enter a monthly bill to compute a panel recommendation',
    }
  }
  const targetKwp =
    annualUsageKwh / (RECOMMENDATION_PSH * 365 * PERFORMANCE_RATIO)
  const rawCount = Math.ceil((targetKwp * 1000) / assumedPanelWattage)
  const recommendedPanels = Math.min(MAX_PANELS, Math.max(MIN_PANELS, rawCount))
  const estimatedSystemKwp = (recommendedPanels * assumedPanelWattage) / 1000
  return {
    recommendedPanels,
    assumedPanelWattage,
    estimatedSystemKwp,
    explanation: `~${recommendedPanels}× ${assumedPanelWattage}W panels (${estimatedSystemKwp.toFixed(2)} kWp) sized for ${Math.round(annualUsageKwh).toLocaleString()} kWh/yr at 3.2 PSH × 0.78 PR`,
  }
}

export function getInverterRecommendation(
  systemKwp: number,
  totalCapacityKwh: number,
  batteryQuantity: number,
): InverterRecommendation {
  if (systemKwp <= 0 && batteryQuantity <= 0) {
    return {
      recommendedPowerKw: 0,
      minAcceptablePowerKw: 0,
      maxAcceptablePowerKw: 0,
      explanation: 'configure panels or battery to compute inverter sizing',
    }
  }

  const solarBasedKw = Math.max(0, systemKwp) / 1.2
  const batteryBasedKw =
    batteryQuantity > 0 ? Math.max(0, totalCapacityKwh) / 5 : 0
  const raw = Math.max(solarBasedKw, batteryBasedKw)
  const recommendedPowerKw = Math.round(raw * 10) / 10

  const minRaw = Math.max(
    systemKwp > 0 ? systemKwp / 1.4 : 0,
    batteryBasedKw * 0.9,
    1,
  )
  const minAcceptablePowerKw = Math.round(minRaw * 10) / 10
  const maxAcceptablePowerKw = Math.round(recommendedPowerKw * 1.3 * 10) / 10

  const parts: string[] = []
  if (systemKwp > 0) parts.push(`${systemKwp.toFixed(2)} kWp solar`)
  if (batteryQuantity > 0 && totalCapacityKwh > 0) {
    parts.push(`${totalCapacityKwh.toFixed(2)} kWh battery`)
  }
  const explanation =
    parts.length > 0
      ? `sized for ${parts.join(' + ')}`
      : 'no system configured'

  return {
    recommendedPowerKw,
    minAcceptablePowerKw,
    maxAcceptablePowerKw,
    explanation,
  }
}
