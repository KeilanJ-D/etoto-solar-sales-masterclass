/**
 * lib/solaflow/audit-calc.ts
 * ============================================
 * SolaFlow's canonical Instant Estimate calculator.
 * LIFTED directly from the SolaFlow Dashboard codebase
 * (SaaS-Dashboard-Pro 3/client/src/lib/audit-calc.ts).
 *
 * Pure functions, zero dependencies — safe to use anywhere.
 * Used in the masterclass demo dashboard so masterclass numbers
 * match SolaFlow numbers exactly.
 * ============================================
 */

export type SelfConsumptionMode =
  | 'solar-only'
  | 'hybrid'
  | 'battery-optimised'
  | 'battery-only'

export const SELF_CONSUMPTION_SPLITS: Record<
  SelfConsumptionMode,
  { selfConsumed: number; exported: number; label: string; explanation: string }
> = {
  'solar-only': {
    selfConsumed: 0.3,
    exported: 0.7,
    label: 'Solar only',
    explanation:
      '30% of generation is used in the home (typical daytime occupancy), 70% is exported.',
  },
  hybrid: {
    selfConsumed: 0.7,
    exported: 0.3,
    label: 'Solar self-consumption (hybrid)',
    explanation:
      'Battery sits idle for backup; 70% of solar generation offsets your bill and 30% is exported. No off-peak arbitrage in this mode.',
  },
  'battery-optimised': {
    selfConsumed: 0.0,
    exported: 1.0,
    label: 'Solar + battery optimisation',
    explanation:
      'All solar is exported at the SEG rate, and the battery covers usage from cheap off-peak grid charging (full daily cycle).',
  },
  'battery-only': {
    selfConsumed: 0.0,
    exported: 0.0,
    label: 'Battery only',
    explanation:
      'No panels; battery does a full charge/discharge cycle every day at the off-peak vs peak arbitrage spread.',
  },
}

export const BILL_TO_KWH_DIVISOR = 0.34
export const DEFAULT_ANNUAL_USAGE_KWH = 3500
export const DEFAULT_GRID_RATE_PENCE = 28
export const DEFAULT_OFFPEAK_RATE_PENCE = 7
export const DEFAULT_EXPORT_RATE_PENCE = 12
export const PEAK_SUN_HOURS = 3.5
export const ANNUAL_INFLATION_RATE = 0.07
export const DAYS_PER_YEAR = 365
export const SOLAR_CO2_KG_PER_KWH = 0.233
export const BATTERY_CO2_KG_PER_KWH = 0.1

export const PROJECTION_YEARS = [1, 5, 10, 25] as const

export interface ProjectionRow {
  year: number
  annualSavings: number
  cumulativeSavings: number
  netPosition: number
}

export function buildProjectionRows(
  annualBenefit: number,
  systemCost: number,
  rate: number = ANNUAL_INFLATION_RATE,
  years: readonly number[] = PROJECTION_YEARS,
): ProjectionRow[] {
  return years.map((year) => {
    const annualSavings =
      annualBenefit > 0 ? annualBenefit * Math.pow(1 + rate, year - 1) : 0
    const cumulativeSavings = compoundedSavings(annualBenefit, year, rate)
    return {
      year,
      annualSavings,
      cumulativeSavings,
      netPosition: cumulativeSavings - systemCost,
    }
  })
}

export function determineSelfConsumptionMode(opts: {
  hasBattery: boolean
  hasPanels: boolean
  batteryOptimised: boolean
}): SelfConsumptionMode {
  if (!opts.hasBattery) return 'solar-only'
  if (!opts.hasPanels) return 'battery-only'
  return opts.batteryOptimised ? 'battery-optimised' : 'hybrid'
}

export function compoundedSavings(
  annualBenefit: number,
  years: number,
  rate: number = ANNUAL_INFLATION_RATE,
): number {
  if (annualBenefit <= 0 || years <= 0) return 0
  if (rate === 0) return annualBenefit * years
  return (annualBenefit * (Math.pow(1 + rate, years) - 1)) / rate
}

export interface AuditCalcInputs {
  monthlyBill: number
  unitRatePence: number
  offPeakRatePence: number
  exportRatePence: number
  panelCount: number
  panelWattage: number
  batteryUsableKwh: number
  batteryQuantity: number
  batteryPricePerUnit: number
  batteryCostOverride?: number | null
  batteryOptimised: boolean
  solarCost: number
  customSystemCost: number | null
  annualUsageKwh?: number | null
  extrasCost?: number | null
}

export interface AuditCalcOutputs {
  annualSpend: number
  annualKwh: number
  dailyKwh: number
  dailyCost: number
  totalCapacity: number
  batteryCost: number
  coveredKwh: number
  surplusKwh: number
  coveragePercent: number
  systemKwp: number
  dailyGeneration: number
  annualGeneration: number
  selfConsumptionMode: SelfConsumptionMode
  selfConsumedKwh: number
  exportedKwh: number
  annualSelfConsumeSaving: number
  annualSolarExport: number
  annualSurplusExport: number
  annualBatterySaving: number
  totalAnnualBenefit: number
  calculatedSystemCost: number
  effectiveSystemCost: number
  paybackYears: number | null
  fifteenYearTotal: number
  twentyFiveYearTotal: number
  annualCo2SavingsKg: number
  yearlyProjections: ProjectionRow[]
  modes: AllModeBenefits
}

export interface AllModeBenefits {
  solarOnly: { selfConsume: number; export: number; total: number }
  batteryOnly: { batterySaving: number; total: number }
  hybrid: { selfConsume: number; export: number; total: number }
  batteryOptimised: { batterySaving: number; export: number; total: number }
}

export function computeAudit(i: AuditCalcInputs): AuditCalcOutputs {
  const annualSpend = i.monthlyBill * 12
  let annualKwh: number
  if (i.annualUsageKwh != null && i.annualUsageKwh > 0) {
    annualKwh = Math.round(i.annualUsageKwh)
  } else if (i.monthlyBill > 0) {
    annualKwh = Math.round(annualSpend / BILL_TO_KWH_DIVISOR)
  } else {
    annualKwh = 0
  }
  const dailyKwh = annualKwh / DAYS_PER_YEAR
  const dailyCost = dailyKwh * (i.unitRatePence / 100)

  const totalCapacity = i.batteryUsableKwh * i.batteryQuantity
  const batteryCost =
    i.batteryCostOverride != null && i.batteryCostOverride >= 0
      ? i.batteryCostOverride
      : i.batteryPricePerUnit * i.batteryQuantity
  const hasBattery = totalCapacity > 0
  const hasPanels = i.panelCount > 0 && i.panelWattage > 0

  const coveredKwh = Math.min(totalCapacity, dailyKwh)
  const surplusKwh = Math.max(0, totalCapacity - dailyKwh)
  const coveragePercent =
    dailyKwh > 0 ? Math.min(100, (totalCapacity / dailyKwh) * 100) : 0

  const systemKwp = (i.panelCount * i.panelWattage) / 1000
  const dailyGeneration = hasPanels ? systemKwp * PEAK_SUN_HOURS : 0
  const annualGeneration = dailyGeneration * DAYS_PER_YEAR

  const arbitrageRate = Math.max(
    0,
    (i.unitRatePence - i.offPeakRatePence) / 100,
  )
  const batteryCyclesKwh = totalCapacity * DAYS_PER_YEAR
  const batteryCycleSaving = batteryCyclesKwh * arbitrageRate

  const gridRate = i.unitRatePence / 100
  const segRate = i.exportRatePence / 100

  const solarOnlySelfConsume = annualGeneration * 0.3 * gridRate
  const solarOnlyExport = annualGeneration * 0.7 * segRate
  const solarOnlyTotal = solarOnlySelfConsume + solarOnlyExport

  const hybridSelfConsume = annualGeneration * 0.7 * gridRate
  const hybridExport = annualGeneration * 0.3 * segRate
  const hybridTotal = hybridSelfConsume + hybridExport

  const batteryOptimisedExport = annualGeneration * 1.0 * segRate
  const batteryOptimisedTotal = batteryOptimisedExport + batteryCycleSaving

  const batteryOnlyTotal = batteryCycleSaving

  const modes: AllModeBenefits = {
    solarOnly: {
      selfConsume: solarOnlySelfConsume,
      export: solarOnlyExport,
      total: solarOnlyTotal,
    },
    batteryOnly: {
      batterySaving: batteryCycleSaving,
      total: batteryOnlyTotal,
    },
    hybrid: {
      selfConsume: hybridSelfConsume,
      export: hybridExport,
      total: hybridTotal,
    },
    batteryOptimised: {
      batterySaving: batteryCycleSaving,
      export: batteryOptimisedExport,
      total: batteryOptimisedTotal,
    },
  }

  const mode = determineSelfConsumptionMode({
    hasBattery,
    hasPanels,
    batteryOptimised: i.batteryOptimised,
  })
  const split = SELF_CONSUMPTION_SPLITS[mode]

  let annualSelfConsumeSaving = 0
  let annualSolarExport = 0
  let annualBatterySaving = 0
  const annualSurplusExport = 0

  switch (mode) {
    case 'solar-only':
      annualSelfConsumeSaving = solarOnlySelfConsume
      annualSolarExport = solarOnlyExport
      break
    case 'hybrid':
      annualSelfConsumeSaving = hybridSelfConsume
      annualSolarExport = hybridExport
      break
    case 'battery-optimised':
      annualSolarExport = batteryOptimisedExport
      annualBatterySaving = batteryCycleSaving
      break
    case 'battery-only':
      annualBatterySaving = batteryCycleSaving
      break
  }

  const selfConsumedKwh = annualGeneration * split.selfConsumed
  const exportedKwh = annualGeneration * split.exported

  const totalAnnualBenefit =
    annualSelfConsumeSaving + annualSolarExport + annualBatterySaving

  const extrasCost = Math.max(0, i.extrasCost ?? 0)
  const calculatedSystemCost = batteryCost + i.solarCost + extrasCost
  const rawEffectiveSystemCost =
    i.customSystemCost != null && i.customSystemCost > 0
      ? i.customSystemCost
      : calculatedSystemCost
  const effectiveSystemCost = Math.round(rawEffectiveSystemCost)

  const paybackYears =
    totalAnnualBenefit > 0 && effectiveSystemCost > 0
      ? Math.round((effectiveSystemCost / totalAnnualBenefit) * 10) / 10
      : null

  const fifteenYearTotal = compoundedSavings(totalAnnualBenefit, 15)
  const twentyFiveYearTotal = compoundedSavings(totalAnnualBenefit, 25)

  let annualCo2SavingsKg = 0
  if (hasPanels) {
    annualCo2SavingsKg = annualGeneration * SOLAR_CO2_KG_PER_KWH
  } else if (hasBattery) {
    annualCo2SavingsKg = batteryCyclesKwh * BATTERY_CO2_KG_PER_KWH
  }

  const yearlyProjections = buildProjectionRows(
    totalAnnualBenefit,
    effectiveSystemCost,
  )

  return {
    annualSpend,
    annualKwh,
    dailyKwh,
    dailyCost,
    totalCapacity,
    batteryCost,
    coveredKwh,
    surplusKwh,
    coveragePercent,
    systemKwp,
    dailyGeneration,
    annualGeneration,
    selfConsumptionMode: mode,
    selfConsumedKwh,
    exportedKwh,
    annualSelfConsumeSaving,
    annualSolarExport,
    annualSurplusExport,
    annualBatterySaving,
    totalAnnualBenefit,
    calculatedSystemCost,
    effectiveSystemCost,
    paybackYears,
    fifteenYearTotal,
    twentyFiveYearTotal,
    annualCo2SavingsKg,
    yearlyProjections,
    modes,
  }
}
