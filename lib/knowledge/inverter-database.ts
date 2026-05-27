// Real UK-stocked inverters used by ETOTO partner installers.
// Updated 2026-05-27. Verify trade prices with current supplier.

export type InverterSpec = {
  id: string
  brand: string
  model: string
  phase: 'single' | 'three'
  acPowerKw: number
  batteryPowerKw: number // continuous battery charge/discharge
  mpptCount: number
  type: 'hybrid' | 'string' | 'battery-only'
  approxTradePriceGBP: number
  notes?: string
}

export const inverterDatabase: InverterSpec[] = [
  // Single-phase hybrid
  {
    id: 'solis-s6-eh1p-3.6k',
    brand: 'Solis',
    model: 'S6-EH1P-3.6K',
    phase: 'single',
    acPowerKw: 3.6,
    batteryPowerKw: 3.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 750,
    notes: 'G98 compatible. Entry-level hybrid.',
  },
  {
    id: 'solis-s6-eh1p-5k',
    brand: 'Solis',
    model: 'S6-EH1P-5K',
    phase: 'single',
    acPowerKw: 5.0,
    batteryPowerKw: 5.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 950,
    notes: 'Requires G99. Workhorse single-phase hybrid.',
  },
  {
    id: 'solis-s6-eh1p-6k',
    brand: 'Solis',
    model: 'S6-EH1P-6K',
    phase: 'single',
    acPowerKw: 6.0,
    batteryPowerKw: 6.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1150,
    notes: 'G99 required. Best for fast battery charging.',
  },
  {
    id: 'givenergy-gen3-5kw',
    brand: 'GivEnergy',
    model: 'Gen3 Hybrid 5kW',
    phase: 'single',
    acPowerKw: 5.0,
    batteryPowerKw: 5.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1250,
    notes: '10-year warranty. Strong UK app + cloud monitoring.',
  },
  {
    id: 'givenergy-gen3-6kw',
    brand: 'GivEnergy',
    model: 'Gen3 Hybrid 6kW',
    phase: 'single',
    acPowerKw: 6.0,
    batteryPowerKw: 6.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1450,
  },
  {
    id: 'fox-h1-6.0',
    brand: 'Fox ESS',
    model: 'H1 6.0',
    phase: 'single',
    acPowerKw: 6.0,
    batteryPowerKw: 5.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1100,
  },

  // Three-phase hybrid
  {
    id: 'solis-s6-eh3p-8k',
    brand: 'Solis',
    model: 'S6-EH3P-8K',
    phase: 'three',
    acPowerKw: 8.0,
    batteryPowerKw: 8.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1550,
    notes: 'G98 on most DNOs (under 11kW). Excellent 3-phase entry.',
  },
  {
    id: 'sungrow-sh10rt',
    brand: 'Sungrow',
    model: 'SH10RT',
    phase: 'three',
    acPowerKw: 10.0,
    batteryPowerKw: 9.6,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 1850,
    notes: '10-year warranty. Strong battery support.',
  },
  {
    id: 'sigenergy-sigenstor-8kw',
    brand: 'Sigenergy',
    model: 'SigenStor 8kW',
    phase: 'three',
    acPowerKw: 8.0,
    batteryPowerKw: 12.0,
    mpptCount: 2,
    type: 'hybrid',
    approxTradePriceGBP: 2250,
    notes: 'Battery rate exceeds AC — built for fast battery cycling.',
  },
  {
    id: 'sigenergy-sigenstor-12kw',
    brand: 'Sigenergy',
    model: 'SigenStor 12kW',
    phase: 'three',
    acPowerKw: 12.0,
    batteryPowerKw: 18.0,
    mpptCount: 3,
    type: 'hybrid',
    approxTradePriceGBP: 3100,
    notes: '3 MPPTs — handles complex roof + EV + heat pump combos.',
  },
  {
    id: 'sigenergy-sigenstor-25kw',
    brand: 'Sigenergy',
    model: 'SigenStor 25kW',
    phase: 'three',
    acPowerKw: 25.0,
    batteryPowerKw: 25.0,
    mpptCount: 3,
    type: 'hybrid',
    approxTradePriceGBP: 5800,
    notes: 'Commercial-grade. For 20 kWh+ banks and EV-heavy households.',
  },
]
