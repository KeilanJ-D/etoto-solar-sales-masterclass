// lib/solaflow-products.ts
// ============================================
// CANONICAL SolaFlow product database.
// Mirrors /d-products/ in the Vercel-Estimator codebase.
// Used everywhere the masterclass references a product —
// guarantees masterclass content stays in lock-step with what
// SolaFlow can actually quote.
//
// To update: re-sync from /Users/keilanjames-devereux/Vercel-Estimator 2/d-products/
// ============================================

export type ProductTier = 'budget' | 'value' | 'premium' | 'specialty'
export type PriceBand = 'low' | 'mid' | 'high' | 'flagship'
export type IdealUseCase =
  | 'modular-stackable'
  | 'ev-ready'
  | 'heat-pump-household'
  | 'budget-conscious'
  | 'premium-aesthetic'
  | 'small-home'
  | 'large-home'
  | 'shaded-roof'
  | 'all-black-look'
  | 'european-made'
  | 'all-in-one'
  | 'three-phase'

// ============================================
// PANELS (11 SKUs across 6 brands)
// ============================================

export interface Panel {
  sku: string
  brand: string
  name: string
  wattage: number
  efficiency: string
  warranty: string
  weightKg: number
  dimensionsMm: string
  badge?: string
  tier: ProductTier
  priceBand: PriceBand
  description: string[]
  imagePath: string
  datasheetPath: string
}

export const panels: Panel[] = [
  {
    sku: 'aiko-470w',
    brand: 'Aiko',
    name: 'Neostar 470W',
    wattage: 470,
    efficiency: '20.4%',
    warranty: '25 years performance',
    weightKg: 27.2,
    dimensionsMm: '2278×1134×35',
    badge: 'Value',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Cost-effective solution',
      'Reliable performance',
      '25-year performance warranty',
      'Quality construction',
    ],
    imagePath: '/products/panels/AIKO.png',
    datasheetPath: '/products/panels/Aiko-Neostar-470W-500W.pdf',
  },
  {
    sku: 'aiko-475w',
    brand: 'Aiko',
    name: 'Neostar 475W',
    wattage: 475,
    efficiency: '20.6%',
    warranty: '25 years performance',
    weightKg: 27.5,
    dimensionsMm: '2278×1134×35',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Balanced performance',
      'Great value option',
      '25-year performance warranty',
      'Trusted quality',
    ],
    imagePath: '/products/panels/AIKO.png',
    datasheetPath: '/products/panels/Aiko-Neostar-470W-500W.pdf',
  },
  {
    sku: 'aiko-480w',
    brand: 'Aiko',
    name: 'Neostar 480W',
    wattage: 480,
    efficiency: '20.8%',
    warranty: '25 years performance',
    weightKg: 27.8,
    dimensionsMm: '2278×1134×35',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'High-efficiency performance',
      'Reliable power output',
      '25-year performance warranty',
      'Proven durability',
    ],
    imagePath: '/products/panels/AIKO.png',
    datasheetPath: '/products/panels/Aiko-Neostar-470W-500W.pdf',
  },
  {
    sku: 'aiko-510w',
    brand: 'Aiko',
    name: 'Neostar 510W All-Black',
    wattage: 510,
    efficiency: '21.6%',
    warranty: '25 years performance',
    weightKg: 28.5,
    dimensionsMm: '2278×1134×35',
    badge: 'Premium',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Premium all-black aesthetics',
      'Industry-leading efficiency',
      '25-year performance warranty',
      'Exceptional low-light performance',
    ],
    imagePath: '/products/panels/AIKO.png',
    datasheetPath: '/products/panels/Aiko-Neostar-500W-520W.pdf',
  },
  {
    sku: 'bexie-520w',
    brand: 'Bexie',
    name: 'Bexie 520W',
    wattage: 520,
    efficiency: 'Up to 23.3%',
    warranty: '25 years product, 30 years performance',
    weightKg: 31.5,
    dimensionsMm: '2278×1134×30',
    badge: 'Premium',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'European Made',
      'High efficiency module',
      'Strong low-light performance',
      'Durable double-glass design',
    ],
    imagePath: '/products/panels/BEXIE.png',
    datasheetPath: '/products/panels/bexie-520w-n-type-abc.pdf',
  },
  {
    sku: 'dmegc-450w',
    brand: 'DMEGC',
    name: 'DMEGC 450W',
    wattage: 450,
    efficiency: '19.9%',
    warranty: '25 years performance',
    weightKg: 26.5,
    dimensionsMm: '2278×1134×35',
    badge: 'Budget',
    tier: 'budget',
    priceBand: 'low',
    description: [
      'Most affordable option',
      'Reliable output',
      '25-year performance warranty',
      'Great value',
    ],
    imagePath: '/products/panels/DMEG.png',
    datasheetPath: '/products/panels/DMEGC-445W-460W.pdf',
  },
  {
    sku: 'dmegc-455w',
    brand: 'DMEGC',
    name: 'DMEGC 455W',
    wattage: 455,
    efficiency: '20.1%',
    warranty: '25 years performance',
    weightKg: 26.8,
    dimensionsMm: '2278×1134×35',
    tier: 'budget',
    priceBand: 'low',
    description: [
      'Budget-friendly option',
      'Solid performance',
      '25-year performance warranty',
      'Established manufacturer',
    ],
    imagePath: '/products/panels/DMEG.png',
    datasheetPath: '/products/panels/DMEGC-445W-460W.pdf',
  },
  {
    sku: 'eurener-500w',
    brand: 'Eurener',
    name: 'Nexa 500W',
    wattage: 500,
    efficiency: '23.10%',
    warranty: '30 years performance',
    weightKg: 27,
    dimensionsMm: '1909×1134×30',
    tier: 'premium',
    priceBand: 'high',
    description: [
      '500W high-output panel',
      'Reliable all-weather operation',
      '30-year warranty',
      'Designed for long-term performance',
    ],
    imagePath: '/products/panels/EURENER.png',
    datasheetPath: '/products/panels/Eurener-Nexa-500W-Datasheet.pdf',
  },
  {
    sku: 'exiom-440w',
    brand: 'Exiom',
    name: 'Exiom 440W',
    wattage: 440,
    efficiency: 'Up to 22.9%',
    warranty: '25 years product, 30 years performance',
    weightKg: 25,
    dimensionsMm: '1961×1134×30',
    badge: 'Value',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'European Made',
      'Designed for lower LCOE',
      'Half-cut cell design reduces hot-spot risk',
      'Excellent performance in harsh environments',
    ],
    imagePath: '/products/panels/EXIOM.png',
    datasheetPath: '/products/panels/510-exiom.pdf',
  },
  {
    sku: 'exiom-510w',
    brand: 'Exiom',
    name: 'Exiom 510W',
    wattage: 510,
    efficiency: '22.9%',
    warranty: '25 years product, 30 years performance',
    weightKg: 25,
    dimensionsMm: '1961×1134×30',
    badge: 'High Output',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'European Made',
      'Up to 22.9% module efficiency',
      'Half-cut cell design',
      'Excellent performance in harsh environments',
    ],
    imagePath: '/products/panels/EXIOM.png',
    datasheetPath: '/products/panels/510-exiom.pdf',
  },
  {
    sku: 'jinko-460w',
    brand: 'Jinko',
    name: 'JKM 460W',
    wattage: 460,
    efficiency: '21.32%',
    warranty: '12 years product, 30 years performance',
    weightKg: 24.2,
    dimensionsMm: '1903×1134×30',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'N-type mono technology',
      'High efficiency module',
      '30-year linear power warranty',
      'Excellent PID and environmental resistance',
    ],
    imagePath: '/products/panels/JINKO.png',
    datasheetPath: '/products/panels/JKM460-480N-60HL4-(V)-F1-EN.pdf',
  },
]

// ============================================
// BATTERIES (9 SKUs across 7 brands)
// ============================================

export interface Battery {
  sku: string
  brand: string
  name: string
  capacityKwh: number
  warranty: string
  cycles: string
  hybrid: boolean
  maxPerStack?: number
  maxStacks?: number
  requiresInverterPerStack?: boolean
  expansionPack?: { maxQty: number; label: string }
  badge?: string
  tier: ProductTier
  priceBand: PriceBand
  description: string[]
  imagePath: string
  datasheetPath: string
  idealFor: IdealUseCase[]
}

export const batteries: Battery[] = [
  {
    sku: 'anker-solix-x1-5kwh',
    brand: 'Anker',
    name: 'SOLIX X1',
    capacityKwh: 5,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 3,
    maxStacks: 3,
    requiresInverterPerStack: false,
    badge: 'Modular',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'LFP chemistry for safety',
      '3 batteries per stack maximum',
      'Up to 3 stacks (45 kWh total)',
      'IP66 rated for outdoor installation',
    ],
    imagePath: '/products/batteries/ANKER-SOLIX.png',
    datasheetPath: '/products/batteries/anker-solix-x1.pdf',
    idealFor: ['modular-stackable', 'budget-conscious', 'small-home', 'large-home'],
  },
  {
    sku: 'bexie-bxb-5klv-pro-5kwh',
    brand: 'Bexie',
    name: 'BXB 5KLV Pro',
    capacityKwh: 5,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 14,
    badge: 'Exclusive',
    tier: 'premium',
    priceBand: 'high',
    description: [
      '5 kWh LiFePO4 battery',
      'High safety and long cycle life',
      'European Made',
      'Modular expandable system (up to 70 kWh per stack)',
    ],
    imagePath: '/products/batteries/BEXIE-BXB-5KLV-PRO.png',
    datasheetPath: '/products/batteries/BXB-5KLV-PRO-BATTERY.pdf',
    idealFor: ['european-made', 'modular-stackable', 'large-home', 'premium-aesthetic'],
  },
  {
    sku: 'ecoflow-powerocean-5kwh',
    brand: 'EcoFlow',
    name: 'PowerOcean',
    capacityKwh: 5,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 3,
    maxStacks: 3,
    requiresInverterPerStack: true,
    badge: 'Modular',
    tier: 'budget',
    priceBand: 'low',
    description: [
      'Stackable modular design',
      '3 batteries per stack maximum',
      'Requires dedicated inverter per stack',
      'Smart energy management',
    ],
    imagePath: '/products/batteries/POWEROCEAN.png',
    datasheetPath: '/products/batteries/ecoflow.pdf',
    idealFor: ['budget-conscious', 'modular-stackable', 'small-home'],
  },
  {
    sku: 'foxess-ep12-11.52kwh',
    brand: 'FOX ESS',
    name: 'EP12',
    capacityKwh: 11.52,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 4,
    badge: 'Large Capacity',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'High capacity single unit',
      'Up to 4 batteries maximum (46 kWh total)',
      'Compatible with FOX ESS inverters',
      'Space-efficient design',
    ],
    imagePath: '/products/batteries/FOX-EP12.png',
    datasheetPath: '/products/batteries/FOXESS-EP12.pdf',
    idealFor: ['large-home', 'heat-pump-household', 'ev-ready'],
  },
  {
    sku: 'foxess-ep6-5.76kwh',
    brand: 'FOX ESS',
    name: 'EP6',
    capacityKwh: 5.76,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 4,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Compact and reliable',
      'Up to 4 batteries maximum (23 kWh total)',
      'Compatible with FOX ESS inverters',
      'Proven performance',
    ],
    imagePath: '/products/batteries/FOX-EP6.png',
    datasheetPath: '/products/batteries/FOXESS-EP6.pdf',
    idealFor: ['modular-stackable', 'small-home', 'budget-conscious'],
  },
  {
    sku: 'powervault-p5-5kwh',
    brand: 'Powervault',
    name: 'P5',
    capacityKwh: 5,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 4,
    maxStacks: 3,
    requiresInverterPerStack: true,
    badge: 'Modular',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Compact modular system',
      'Stackable to 20 kWh per stack',
      'AC/DC hybrid compatible',
      'Requires dedicated inverter per stack',
    ],
    imagePath: '/products/batteries/POWERVAULT-P5.png',
    datasheetPath: '/products/batteries/powervault-p5.pdf',
    idealFor: ['modular-stackable', 'small-home'],
  },
  {
    sku: 'sigenergy-10.0-9.04kwh',
    brand: 'Sigenergy',
    name: 'SigenStor 10.0',
    capacityKwh: 9.04,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 6,
    maxStacks: 6,
    requiresInverterPerStack: true,
    badge: 'Premium',
    tier: 'premium',
    priceBand: 'flagship',
    description: [
      'High-capacity storage solution',
      'Up to 6 batteries per stack',
      'Requires Sigenergy inverter per stack',
      'Maximum scalability (up to 54 kWh per stack)',
    ],
    imagePath: '/products/batteries/SIG.png',
    datasheetPath: '/products/batteries/Sigenstor.pdf',
    idealFor: [
      'premium-aesthetic',
      'large-home',
      'modular-stackable',
      'heat-pump-household',
      'ev-ready',
    ],
  },
  {
    sku: 'sigenergy-6.0-5.84kwh',
    brand: 'Sigenergy',
    name: 'SigenStor 6.0',
    capacityKwh: 5.84,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: false,
    maxPerStack: 6,
    maxStacks: 6,
    requiresInverterPerStack: true,
    badge: 'High Capacity',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Advanced battery technology',
      'Up to 6 batteries per stack',
      'Requires Sigenergy inverter per stack',
      'Intelligent power management',
    ],
    imagePath: '/products/batteries/SIG.png',
    datasheetPath: '/products/batteries/Sigenstor.pdf',
    idealFor: ['premium-aesthetic', 'modular-stackable', 'small-home', 'large-home'],
  },
  {
    sku: 'tesla-powerwall-3-13.5kwh',
    brand: 'Tesla',
    name: 'Powerwall 3',
    capacityKwh: 13.5,
    warranty: '10 years',
    cycles: '6000+',
    hybrid: true,
    maxPerStack: 4,
    expansionPack: { maxQty: 3, label: 'Expansion Pack' },
    badge: 'All-in-One',
    tier: 'premium',
    priceBand: 'flagship',
    description: [
      'Integrated battery and inverter — no separate inverter needed',
      'Up to 4 units maximum (54 kWh total)',
      'Tesla smart energy ecosystem',
      'Expansion packs available for cheaper kWh additions',
    ],
    imagePath: '/products/batteries/TESLA.png',
    datasheetPath: '/products/batteries/Tesla-Powerwall-3.pdf',
    idealFor: [
      'all-in-one',
      'premium-aesthetic',
      'large-home',
      'ev-ready',
      'heat-pump-household',
    ],
  },
]

// ============================================
// INVERTERS (20+ SKUs across 7 brands)
// ============================================

export interface Inverter {
  sku: string
  brand: string
  name: string
  ratingKw: number
  efficiency: string
  warranty: string
  phaseType: 'Single Phase' | 'Three Phase' | 'N/A'
  batteryCompatible: boolean
  solarOnlyCompatible?: boolean
  isGateway?: boolean
  badge?: string
  tier: ProductTier
  priceBand: PriceBand
  description: string[]
  imagePath: string
  datasheetPath?: string
  compatibleBrands: string[]
}

export const inverters: Inverter[] = [
  // ANKER
  {
    sku: 'anker-solix-3.68kw',
    brand: 'Anker',
    name: 'SOLIX X1 3.68kW',
    ratingKw: 3.68,
    efficiency: '97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'G98 Compliant',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Single-phase hybrid inverter',
      '97.6% efficiency',
      'IP66 rated for outdoor use',
      '10ms backup switchover',
    ],
    imagePath: '/products/inverters/ANKER-INV.png',
    datasheetPath: '/products/inverters/anker-solix-x1.pdf',
    compatibleBrands: ['Anker'],
  },
  {
    sku: 'anker-solix-4.6kw',
    brand: 'Anker',
    name: 'SOLIX X1 4.6kW',
    ratingKw: 4.6,
    efficiency: '97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'UK Popular',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'UK market specification',
      'Single-phase hybrid inverter',
      '97.6% efficiency',
      'IP66 + C5-M coastal rated',
    ],
    imagePath: '/products/inverters/ANKER-INV.png',
    datasheetPath: '/products/inverters/anker-solix-x1.pdf',
    compatibleBrands: ['Anker'],
  },
  {
    sku: 'anker-solix-5kw',
    brand: 'Anker',
    name: 'SOLIX X1 5kW',
    ratingKw: 5,
    efficiency: '97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'Popular',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Best-selling power rating',
      'Single-phase hybrid inverter',
      '97.6% efficiency',
      'Smart energy management',
    ],
    imagePath: '/products/inverters/ANKER-INV.png',
    datasheetPath: '/products/inverters/anker-solix-x1.pdf',
    compatibleBrands: ['Anker'],
  },
  {
    sku: 'anker-solix-6kw',
    brand: 'Anker',
    name: 'SOLIX X1 6kW',
    ratingKw: 6,
    efficiency: '97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'High Power',
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Maximum single-phase output',
      '6.6 kW off-grid continuous',
      '97.6% efficiency',
      'Scales up to 18 kW parallel',
    ],
    imagePath: '/products/inverters/ANKER-INV.png',
    datasheetPath: '/products/inverters/anker-solix-x1.pdf',
    compatibleBrands: ['Anker'],
  },
  // BEXIE
  {
    sku: 'bexie-1ph-hybrid-3.6kw',
    brand: 'Bexie',
    name: '1PH Hybrid 3.6kW',
    ratingKw: 3.6,
    efficiency: 'Up to 97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    badge: 'Hybrid',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Single phase hybrid inverter',
      'High efficiency conversion',
      'Supports battery storage',
      'European Made',
    ],
    imagePath: '/products/inverters/BEXIE-1PH.png',
    datasheetPath: '/products/inverters/bexie-1ph-hybrid.pdf',
    compatibleBrands: ['Bexie'],
  },
  {
    sku: 'bexie-1ph-hybrid-5kw',
    brand: 'Bexie',
    name: '1PH Hybrid 5kW',
    ratingKw: 5,
    efficiency: 'Up to 97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    badge: 'Hybrid',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Single phase hybrid inverter',
      'High efficiency conversion',
      'Supports battery storage',
      'European Made',
    ],
    imagePath: '/products/inverters/BEXIE-1PH.png',
    datasheetPath: '/products/inverters/bexie-1ph-hybrid.pdf',
    compatibleBrands: ['Bexie'],
  },
  {
    sku: 'bexie-1ph-hybrid-6kw',
    brand: 'Bexie',
    name: '1PH Hybrid 6kW',
    ratingKw: 6,
    efficiency: 'Up to 97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    badge: 'Hybrid',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Single phase hybrid inverter',
      'High efficiency conversion',
      'Supports battery storage',
      'European Made',
    ],
    imagePath: '/products/inverters/BEXIE-1PH.png',
    datasheetPath: '/products/inverters/bexie-1ph-hybrid.pdf',
    compatibleBrands: ['Bexie'],
  },
  // ECOFLOW
  {
    sku: 'ecoflow-3kw',
    brand: 'EcoFlow',
    name: 'PowerOcean 3kW',
    ratingKw: 3,
    efficiency: '97.5%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'budget',
    priceBand: 'low',
    description: [
      'Compact hybrid inverter',
      'Perfect for small systems',
      'Integrated MPPT',
      'Smart battery management',
    ],
    imagePath: '/products/inverters/ECOFLOW-INV.png',
    datasheetPath: '/products/inverters/ecoflow.pdf',
    compatibleBrands: ['EcoFlow'],
  },
  {
    sku: 'ecoflow-5kw',
    brand: 'EcoFlow',
    name: 'PowerOcean 5kW',
    ratingKw: 5,
    efficiency: '97.8%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'Popular',
    tier: 'budget',
    priceBand: 'low',
    description: [
      'Best-selling model',
      'Excellent efficiency',
      'Smart energy management',
      'Proven reliability',
    ],
    imagePath: '/products/inverters/ECOFLOW-INV.png',
    datasheetPath: '/products/inverters/ecoflow.pdf',
    compatibleBrands: ['EcoFlow'],
  },
  {
    sku: 'ecoflow-6kw',
    brand: 'EcoFlow',
    name: 'PowerOcean 6kW',
    ratingKw: 6,
    efficiency: '97.9%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'budget',
    priceBand: 'low',
    description: [
      'High-capacity solution',
      'Maximum power output',
      'Advanced grid features',
      'Premium performance',
    ],
    imagePath: '/products/inverters/ECOFLOW-INV.png',
    datasheetPath: '/products/inverters/ecoflow.pdf',
    compatibleBrands: ['EcoFlow'],
  },
  // FOX ESS H1 series (single-phase)
  {
    sku: 'foxess-h1-3.7kw',
    brand: 'FOX ESS',
    name: 'H1 3.7kW',
    ratingKw: 3.7,
    efficiency: '97.5%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Reliable hybrid inverter',
      'FOX ESS ecosystem',
      'Proven technology',
      'Cost-effective solution',
    ],
    imagePath: '/products/inverters/FOX-H1.png',
    datasheetPath: '/products/inverters/FoxESS-H1-3kW-6kW.pdf',
    compatibleBrands: ['FOX ESS'],
  },
  {
    sku: 'foxess-h1-5kw',
    brand: 'FOX ESS',
    name: 'H1 5kW',
    ratingKw: 5,
    efficiency: '97.7%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Popular hybrid choice',
      'FOX battery compatible',
      'Great performance',
      'Trusted brand',
    ],
    imagePath: '/products/inverters/FOX-H1.png',
    datasheetPath: '/products/inverters/FoxESS-H1-3kW-6kW.pdf',
    compatibleBrands: ['FOX ESS'],
  },
  {
    sku: 'foxess-h1-6kw',
    brand: 'FOX ESS',
    name: 'H1 6kW',
    ratingKw: 6,
    efficiency: '97.8%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'High-capacity H1 series',
      'FOX ESS integration',
      'Enhanced features',
      'Reliable power',
    ],
    imagePath: '/products/inverters/FOX-H1.png',
    datasheetPath: '/products/inverters/FoxESS-H1-3kW-6kW.pdf',
    compatibleBrands: ['FOX ESS'],
  },
  // FOX ESS K series (higher power, mixed phase)
  {
    sku: 'foxess-k-7kw',
    brand: 'FOX ESS',
    name: 'K Series 7kW',
    ratingKw: 7,
    efficiency: '97.9%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    tier: 'value',
    priceBand: 'high',
    description: [
      'Advanced K series',
      'High-power capability',
      'FOX battery optimized',
      'Professional grade',
    ],
    imagePath: '/products/inverters/FOX-K.png',
    datasheetPath: '/products/inverters/FoxESS-K-Series-7kW-10.5kW.pdf',
    compatibleBrands: ['FOX ESS'],
  },
  {
    sku: 'foxess-k-10kw',
    brand: 'FOX ESS',
    name: 'K Series 10kW',
    ratingKw: 10,
    efficiency: '98.1%',
    warranty: '10 years',
    phaseType: 'Three Phase',
    batteryCompatible: true,
    solarOnlyCompatible: true,
    badge: 'High Power',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Maximum K series power',
      'Three-phase capable',
      'FOX ecosystem flagship',
      'Premium features',
    ],
    imagePath: '/products/inverters/FOX-K.png',
    datasheetPath: '/products/inverters/FoxESS-K-Series-7kW-10.5kW.pdf',
    compatibleBrands: ['FOX ESS'],
  },
  // POWERVAULT
  {
    sku: 'powervault-3.6kw',
    brand: 'Powervault',
    name: 'Powervault 3.6kW',
    ratingKw: 3.6,
    efficiency: '95%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Customisable LED display',
      'AC/DC flexibility',
      'Works with Powervault batteries',
      'Compact design',
    ],
    imagePath: '/products/inverters/POWERVAULT-INV.png',
    datasheetPath: '/products/inverters/powervault-p5.pdf',
    compatibleBrands: ['Powervault'],
  },
  {
    sku: 'powervault-6kw',
    brand: 'Powervault',
    name: 'Powervault 6kW',
    ratingKw: 6,
    efficiency: '95%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'value',
    priceBand: 'mid',
    description: [
      'Customisable LED display',
      'AC/DC flexibility',
      'Works with Powervault batteries',
      'Higher power output',
    ],
    imagePath: '/products/inverters/POWERVAULT-INV.png',
    datasheetPath: '/products/inverters/powervault-p5.pdf',
    compatibleBrands: ['Powervault'],
  },
  // SIGENERGY (single + three phase)
  {
    sku: 'sigenergy-3.6kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 3.6kW',
    ratingKw: 3.6,
    efficiency: '97.6%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Smart hybrid inverter',
      'Optimised for Sigenergy batteries',
      'AI-powered management',
      'Compact design',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  {
    sku: 'sigenergy-5kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 5kW',
    ratingKw: 5,
    efficiency: '97.8%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    badge: 'Recommended',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Most popular Sigenergy choice',
      'Perfect for Sigenergy systems',
      'Advanced energy optimization',
      'Exceptional efficiency',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  {
    sku: 'sigenergy-6kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 6kW',
    ratingKw: 6,
    efficiency: '97.9%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'premium',
    priceBand: 'high',
    description: [
      'High-performance inverter',
      'Sigenergy ecosystem integration',
      'Smart load management',
      'Future-ready technology',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  {
    sku: 'sigenergy-8kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 8kW',
    ratingKw: 8,
    efficiency: '98.0%',
    warranty: '10 years',
    phaseType: 'Single Phase',
    batteryCompatible: true,
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Large system solution',
      'Maximum single-phase Sigenergy capacity',
      'Advanced grid support',
      'Premium features',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  {
    sku: 'sigenergy-10kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 10kW',
    ratingKw: 10,
    efficiency: '98.1%',
    warranty: '10 years',
    phaseType: 'Three Phase',
    batteryCompatible: true,
    tier: 'premium',
    priceBand: 'flagship',
    description: [
      'Enterprise-grade power',
      'Maximum scalability',
      'Three-phase capable',
      'Professional solution',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  {
    sku: 'sigenergy-12kw',
    brand: 'Sigenergy',
    name: 'Sigen Energy Controller 12kW',
    ratingKw: 12,
    efficiency: '98.2%',
    warranty: '10 years',
    phaseType: 'Three Phase',
    batteryCompatible: true,
    badge: 'Maximum Power',
    tier: 'premium',
    priceBand: 'flagship',
    description: [
      'Highest capacity available',
      'Commercial-grade performance',
      'Three-phase output',
      'Ultimate scalability',
    ],
    imagePath: '/products/inverters/SIG-INV.png',
    datasheetPath: '/products/inverters/SigEnergy-Inverter-3kW-12kW.pdf',
    compatibleBrands: ['Sigenergy'],
  },
  // GATEWAYS
  {
    sku: 'tesla-gateway',
    brand: 'Tesla',
    name: 'Tesla Gateway',
    ratingKw: 0,
    efficiency: 'N/A',
    warranty: '10 years',
    phaseType: 'N/A',
    batteryCompatible: true,
    isGateway: true,
    badge: 'Required',
    tier: 'premium',
    priceBand: 'high',
    description: [
      'Powerwall system gateway',
      'Backup gateway functionality',
      'Tesla app integration',
      'Automatic grid management',
    ],
    imagePath: '/products/inverters/TESLA-GATE.png',
    datasheetPath: '/products/inverters/tesla-gateway.pdf',
    compatibleBrands: ['Tesla'],
  },
]

// ============================================
// EXTRAS
// ============================================

export interface Extra {
  sku: string
  name: string
  description: string
  type: 'toggle' | 'quantity'
  maxQty: number
}

export const extras: Extra[] = [
  {
    sku: 'optimisers',
    name: 'Power Optimisers',
    description:
      'Individual panel optimization for maximum efficiency, especially useful for shaded roofs',
    type: 'quantity',
    maxQty: 20,
  },
  {
    sku: 'ev-charger',
    name: '7kW EV Charger',
    description: 'Smart EV charger with solar integration and app control',
    type: 'toggle',
    maxQty: 1,
  },
  {
    sku: 'iboost-power-diverter',
    name: 'iBoost Power Diverter',
    description: 'Routes excess PV generation to your hot water cylinder',
    type: 'toggle',
    maxQty: 1,
  },
  {
    sku: 'bird-protection',
    name: 'Bird Protection Mesh',
    description: 'Prevents birds nesting under solar panels, protecting wiring and efficiency',
    type: 'toggle',
    maxQty: 1,
  },
  {
    sku: 'monitoring-system',
    name: 'Premium Monitoring System',
    description: 'Advanced real-time monitoring with detailed analytics and alerts',
    type: 'toggle',
    maxQty: 1,
  },
  {
    sku: 'eps-13a-rcd-socket',
    name: 'Emergency Power Supply Socket',
    description: 'Emergency power supply 13A socket with integrated RCD for backup circuits',
    type: 'toggle',
    maxQty: 1,
  },
]

// ============================================
// BRAND METADATA (editorial — used by /products showcase)
// ============================================

export type BrandSlug =
  | 'aiko'
  | 'bexie'
  | 'dmegc'
  | 'eurener'
  | 'exiom'
  | 'jinko'
  | 'tesla'
  | 'sigenergy'
  | 'fox-ess'
  | 'anker'
  | 'ecoflow'
  | 'powervault'

export interface Brand {
  slug: BrandSlug
  displayName: string
  exactName: string // Use this exact casing everywhere in copy
  tier: ProductTier
  priceBand: PriceBand
  oneLineHook: string
  longDescription: string
  origin: string
  yearsInUk: string
  productCategories: Array<'panels' | 'batteries' | 'inverters'>
  usps: string[]
  useThisWhen: string[]
  dontUseThisWhen: string[]
  idealFor: IdealUseCase[]
  logoPath?: string
}

export const brands: Brand[] = [
  {
    slug: 'aiko',
    displayName: 'Aiko',
    exactName: 'Aiko',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook:
      'Industry-leading efficiency at a workhorse price. The default panel choice for most UK installs.',
    longDescription:
      'Aiko is a Chinese manufacturer that disrupted the premium panel market with its ABC (All-Back Contact) cell technology — giving you Tier-1 efficiency (up to 21.6%) and a premium all-black aesthetic at a price between budget and flagship. For most UK domestic installs, Aiko hits the sweet spot.',
    origin: 'China (ABC cell tech)',
    yearsInUk: '5+',
    productCategories: ['panels'],
    usps: [
      '20.4 – 21.6% module efficiency across the range',
      'All-black 510W option for design-conscious homeowners',
      '25-year performance warranty as standard',
      'ABC cell technology = excellent low-light + cell-level shade tolerance',
    ],
    useThisWhen: [
      'Customer wants premium aesthetic without flagship price',
      'Roof has some shade — Aiko\'s cell-level bypass handles it without optimisers',
      'Budget is mid-tier and you need efficiency to justify panel count',
      'Most domestic 4-15 panel installs',
    ],
    dontUseThisWhen: [
      'Customer is ultra-budget-led (DMEGC is cheaper)',
      'Customer specifically requires European-made (use Bexie or Exiom)',
    ],
    idealFor: ['premium-aesthetic', 'shaded-roof', 'all-black-look'],
  },
  {
    slug: 'bexie',
    displayName: 'Bexie',
    exactName: 'Bexie',
    tier: 'premium',
    priceBand: 'high',
    oneLineHook:
      'European-made flagship across panels, batteries, and inverters. The premium full-stack choice.',
    longDescription:
      'Bexie offers the most complete European-made product range in the SolaFlow catalogue. Their 520W panel hits 23.3% efficiency with double-glass construction and a 30-year performance warranty. The BXB 5KLV Pro battery scales to 70 kWh per stack. Premium quality, premium price.',
    origin: 'Europe',
    yearsInUk: '3+',
    productCategories: ['panels', 'batteries', 'inverters'],
    usps: [
      '23.3% efficiency on the 520W panel — among the highest available',
      '25-year product / 30-year performance warranty on panels',
      'European-made — strong appeal for design-conscious buyers',
      'Battery scales to 70 kWh per stack (14 units max)',
      'Hybrid inverters with battery + solar-only modes',
    ],
    useThisWhen: [
      'Customer asks specifically for European-made',
      'Premium install where every spec needs to be flagship',
      'Large home wanting maximum battery capacity in one stack',
      'Customer values 30-year warranty over 25-year',
    ],
    dontUseThisWhen: [
      'Budget-led install — premium price reflects premium spec',
      'Customer just needs a working system at lowest cost',
    ],
    idealFor: ['european-made', 'premium-aesthetic', 'large-home', 'modular-stackable'],
  },
  {
    slug: 'tesla',
    displayName: 'Tesla',
    exactName: 'Tesla',
    tier: 'premium',
    priceBand: 'flagship',
    oneLineHook:
      'Powerwall 3 = integrated battery + inverter in one box. Brand recognition that sells itself.',
    longDescription:
      'The Powerwall 3 is fundamentally different from every other battery in the SolaFlow catalogue: the battery and inverter are in the same enclosure. No separate hybrid inverter to spec, fewer components on the wall, single warranty. The Tesla app is also the best-in-class consumer experience. Premium pricing but customers ask for it by name.',
    origin: 'USA',
    yearsInUk: '8+ (Powerwall 1-3)',
    productCategories: ['batteries'],
    usps: [
      'Integrated inverter — no separate hybrid needed',
      'Up to 4 units = 54 kWh in a single home',
      'Expansion Pack mode adds cheaper kWh after the first unit',
      'Tesla app is the gold-standard customer experience',
      'Brand recognition shortcuts the "is this trustworthy?" objection',
    ],
    useThisWhen: [
      'Customer asked for Tesla by name',
      'Premium install where brand matters',
      'Heat pump + EV household wanting single-vendor reliability',
      'Avoiding "too many separate components" objection',
    ],
    dontUseThisWhen: [
      'Customer wants modular kWh under £400/kWh — Tesla is flagship-priced',
      'Tesla Gateway adds cost vs systems where inverter is included',
      'Customer wants to mix-and-match panels/inverters from other brands',
    ],
    idealFor: ['all-in-one', 'premium-aesthetic', 'large-home', 'ev-ready', 'heat-pump-household'],
  },
  {
    slug: 'sigenergy',
    displayName: 'Sigenergy',
    exactName: 'Sigenergy',
    tier: 'premium',
    priceBand: 'flagship',
    oneLineHook:
      'AI-powered energy management with the deepest battery + inverter range in the catalogue.',
    longDescription:
      'Sigenergy (formerly the SigenStor range) gives you the most flexible Sigenergy ecosystem: batteries from 5.84 kWh to 9.04 kWh, stackable to 54 kWh per stack, with inverters from 3.6 kW single-phase up to 12 kW three-phase. Plus AI-powered load management and a strong app. Premium-priced — and worth it for large or complex installs.',
    origin: 'China',
    yearsInUk: '3+',
    productCategories: ['batteries', 'inverters'],
    usps: [
      'Battery + inverter from same ecosystem — perfect compatibility',
      '6 batteries per stack × 6 stacks = up to 325 kWh maximum',
      'Three-phase inverters available up to 12 kW',
      'AI-powered energy management',
      '10-year warranty across the range',
    ],
    useThisWhen: [
      'Large home or complex install where you need 20 kWh+ of battery',
      'Three-phase supply property',
      'Customer with EV + heat pump wanting smart load balancing',
      'You want a single-brand stack from panels-aside',
    ],
    dontUseThisWhen: [
      'Budget install — Sigenergy is flagship-priced',
      'Single small battery requirement (FOX EP6 is cheaper)',
    ],
    idealFor: [
      'premium-aesthetic',
      'large-home',
      'modular-stackable',
      'three-phase',
      'ev-ready',
      'heat-pump-household',
    ],
  },
  {
    slug: 'fox-ess',
    displayName: 'FOX ESS',
    exactName: 'FOX ESS',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook:
      'The dependable mid-market workhorse. H1 series for single-phase, K series for higher power.',
    longDescription:
      'FOX ESS is the value-tier full stack: EP6 (5.76 kWh) and EP12 (11.52 kWh) batteries, H1 hybrid inverters 3.7-6 kW single phase, K Series 7-10 kW up to three phase. Less premium than Sigenergy or Tesla, less budget than EcoFlow. The "just works" choice for most installs that don\'t need a specific brand pitch.',
    origin: 'China',
    yearsInUk: '6+',
    productCategories: ['batteries', 'inverters'],
    usps: [
      'EP6 (5.76 kWh) is the most common 1-stack battery in the UK',
      'EP12 (11.52 kWh) gives 46 kWh in one stack (4 units × EP12)',
      'H1 hybrid inverters battery-compatible AND solar-only compatible',
      'K Series scales up to 10 kW three-phase',
      'Strong UK installer support',
    ],
    useThisWhen: [
      'Mid-market install — customer wants quality without flagship price',
      'Solar-only customer who might add battery later (H1 is hybrid-ready)',
      'Need 10 kW+ output without going to Sigenergy/Tesla pricing',
    ],
    dontUseThisWhen: [
      'Budget-led — EcoFlow is cheaper',
      'Premium-led — Tesla/Sigenergy/Bexie have stronger brand pull',
    ],
    idealFor: ['modular-stackable', 'large-home', 'heat-pump-household', 'three-phase'],
  },
  {
    slug: 'anker',
    displayName: 'Anker',
    exactName: 'Anker',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook:
      'Consumer-electronics brand recognition + solid Tier-1 specs. The "people have heard of us" battery.',
    longDescription:
      'Anker is a household name from phone chargers and power banks. Their SOLIX X1 range brings that brand to home energy: 5 kWh LFP battery stackable to 45 kWh (3 × 3 stacks), inverters 3.68-6 kW with 97.6% efficiency. Brand familiarity makes the sale easier — most customers have already bought an Anker product without thinking.',
    origin: 'China',
    yearsInUk: '2+ (X1 launched 2024)',
    productCategories: ['batteries', 'inverters'],
    usps: [
      'Consumer brand recognition (smartphone chargers etc.)',
      'LFP chemistry for safety',
      'IP66 + C5-M coastal rated for outdoor install',
      'UK Popular 4.6 kW inverter sized for G98 + capacity',
      '10ms backup switchover',
    ],
    useThisWhen: [
      'Customer responds well to recognisable brand names',
      'Coastal or outdoor-install property (C5-M rated)',
      'Budget-conscious customer who wants "name brand" peace of mind',
    ],
    dontUseThisWhen: [
      'Customer wants maximum capacity in single stack (FOX EP12 or Tesla wins)',
      'Premium install where brand prestige matters (Tesla > Anker)',
    ],
    idealFor: ['modular-stackable', 'budget-conscious', 'small-home'],
  },
  {
    slug: 'ecoflow',
    displayName: 'EcoFlow',
    exactName: 'EcoFlow',
    tier: 'budget',
    priceBand: 'low',
    oneLineHook:
      'Most affordable full-stack hybrid system in the catalogue. The price-led choice.',
    longDescription:
      'EcoFlow PowerOcean is the lowest priced full stack in SolaFlow — 5 kWh battery, 3-6 kW hybrid inverters, and a required Gateway for monitoring. Best for budget-conscious customers or starter systems where every £100 matters. Quality is solid Tier-1; brand prestige is lower than Tesla or Anker.',
    origin: 'China',
    yearsInUk: '4+',
    productCategories: ['batteries', 'inverters'],
    usps: [
      'Lowest entry point in the catalogue',
      '97.5-97.9% inverter efficiency across the range',
      'Stackable up to 15 kWh per stack (3 × 5 kWh)',
      'Smart energy management via app',
      'Best £/kWh for new buyers',
    ],
    useThisWhen: [
      'Budget is the deciding factor',
      'Smaller home or starter system (5-10 kWh battery)',
      'Customer prioritises £ over brand prestige',
    ],
    dontUseThisWhen: [
      'Large home needing 20 kWh+ (Anker or FOX scales further per stack)',
      'Premium install where brand matters',
      'Customer wants Tier-1 brand-led marketing language',
    ],
    idealFor: ['budget-conscious', 'small-home', 'modular-stackable'],
  },
  {
    slug: 'powervault',
    displayName: 'Powervault',
    exactName: 'Powervault',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook:
      'UK-made battery brand. Customisable LED display, modular AC/DC flexibility.',
    longDescription:
      'Powervault is a UK-based battery and inverter brand — their P5 5 kWh battery stacks to 20 kWh per stack (3 stacks max), with the option of either AC-coupled or DC-coupled inverters in the same product range. The customisable LED display is a small touch customers notice. Mid-market positioning.',
    origin: 'United Kingdom',
    yearsInUk: '10+',
    productCategories: ['batteries', 'inverters'],
    usps: [
      'UK-based brand and support',
      'Customisable LED display (kids love it)',
      'AC/DC inverter flexibility',
      'Stackable to 20 kWh per stack',
    ],
    useThisWhen: [
      'Customer prioritises British-made brand support',
      'Retrofit install where AC-coupling makes sense',
      'Mid-market budget',
    ],
    dontUseThisWhen: [
      'Need maximum capacity in one stack (other brands scale higher)',
      'Premium pricing requires brand prestige (Tesla wins)',
    ],
    idealFor: ['modular-stackable', 'small-home'],
  },
  {
    slug: 'dmegc',
    displayName: 'DMEGC',
    exactName: 'DMEGC',
    tier: 'budget',
    priceBand: 'low',
    oneLineHook: 'The most affordable Tier-1 panel option. When £ per W beats everything else.',
    longDescription:
      'DMEGC offers the budget panel slot in SolaFlow — 450W and 455W modules with 19.9-20.1% efficiency. They\'re Tier-1, they have a 25-year warranty, they work. They just aren\'t Aiko or Bexie in efficiency or aesthetic. Use when budget is the deciding factor.',
    origin: 'China',
    yearsInUk: '5+',
    productCategories: ['panels'],
    usps: [
      'Lowest £/W in the panel catalogue',
      '25-year performance warranty',
      'Tier-1 manufacturer',
      'Solid, reliable, no surprises',
    ],
    useThisWhen: [
      'Budget-led customer where every panel\'s £ matters',
      'Volume installs where margin is tight',
      'Customer doesn\'t care about aesthetic or brand',
    ],
    dontUseThisWhen: [
      'Customer wants all-black aesthetic (Aiko 510W)',
      'Customer asked about Aiko, Bexie, or Jinko by name',
    ],
    idealFor: ['budget-conscious', 'small-home', 'large-home'],
  },
  {
    slug: 'eurener',
    displayName: 'Eurener',
    exactName: 'Eurener',
    tier: 'premium',
    priceBand: 'high',
    oneLineHook: '30-year warranty + 23.10% efficiency. Premium panel with longest performance guarantee.',
    longDescription:
      'Eurener Nexa 500W panels lead the catalogue on warranty length — 30-year performance warranty, longest in SolaFlow. 23.10% efficiency, compact form factor (1909×1134), and 27 kg weight. Premium-priced for the warranty alone.',
    origin: 'Europe',
    yearsInUk: '3+',
    productCategories: ['panels'],
    usps: [
      '30-year performance warranty (industry-leading)',
      '23.10% efficiency',
      'Compact form factor — fits where larger panels won\'t',
      'European-made',
    ],
    useThisWhen: [
      'Customer specifically asks about warranty length',
      'Tight roof space where compact dimensions matter',
      'Premium install with European-made preference',
    ],
    dontUseThisWhen: [
      'Budget install — Eurener is premium-priced',
      'Customer doesn\'t care about warranty (Aiko hits same efficiency at lower cost)',
    ],
    idealFor: ['european-made', 'premium-aesthetic', 'small-home'],
  },
  {
    slug: 'exiom',
    displayName: 'Exiom',
    exactName: 'Exiom',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook: 'European-made value panel with 22.9% efficiency. The "made in Europe at mid-tier price" option.',
    longDescription:
      'Exiom 440W and 510W panels give you European manufacturing at a mid-tier price point. 22.9% efficiency, half-cut cell design, 25-year product warranty + 30-year linear performance warranty. Designed for low LCOE and reduced balance-of-system cost.',
    origin: 'Europe',
    yearsInUk: '4+',
    productCategories: ['panels'],
    usps: [
      'European Made at mid-tier price',
      '22.9% efficiency',
      'Half-cut cell design — reduced hot-spot risk',
      '25-year product / 30-year performance warranty',
    ],
    useThisWhen: [
      'Customer wants European-made without Bexie/Eurener premium',
      'Volume installs where consistent supply matters',
    ],
    dontUseThisWhen: [
      'Customer wants the absolute highest efficiency (Bexie 23.3% wins)',
      'Budget install where panel brand doesn\'t matter (DMEGC is cheaper)',
    ],
    idealFor: ['european-made'],
  },
  {
    slug: 'jinko',
    displayName: 'Jinko',
    exactName: 'Jinko',
    tier: 'value',
    priceBand: 'mid',
    oneLineHook:
      'Global Tier-1 brand with N-type tech and 30-year performance warranty. The conservative spec choice.',
    longDescription:
      'Jinko is one of the largest solar panel manufacturers globally — their JKM 460W N-type module gives you 21.32% efficiency, 30-year linear power warranty, and a global support footprint. The conservative choice when you want a name that will definitely still be honouring warranties in 25 years.',
    origin: 'China (global manufacturer)',
    yearsInUk: '10+',
    productCategories: ['panels'],
    usps: [
      'N-type mono technology',
      '21.32% module efficiency',
      '12-year product / 30-year performance warranty',
      'One of the largest solar manufacturers globally — warranty risk is low',
    ],
    useThisWhen: [
      'Customer asks "what if the manufacturer goes bust?" — Jinko is your answer',
      'Mid-market install where brand longevity matters',
    ],
    dontUseThisWhen: [
      'Premium aesthetic install (Aiko all-black or Bexie wins)',
      'Ultra-budget install (DMEGC is cheaper)',
    ],
    idealFor: ['premium-aesthetic', 'large-home'],
  },
]

// ============================================
// LOOKUP HELPERS
// ============================================

export const brandBySlug = (slug: string) => brands.find((b) => b.slug === slug)
export const panelsByBrand = (brand: string) => panels.filter((p) => p.brand === brand)
export const batteriesByBrand = (brand: string) => batteries.filter((b) => b.brand === brand)
export const invertersByBrand = (brand: string) =>
  inverters.filter((i) => i.brand === brand)

// SolaFlow constants — used to ensure calculator alignment.
// DO NOT change without updating SolaFlow Estimator + Dashboard in parallel.
export const SOLAFLOW_CONSTANTS = {
  peakSunHours: 3.5,
  systemLossFactor: 0.85,
  selfConsumptionSolarOnly: 0.3,
  selfConsumptionHybrid: 0.7,
  batteryCyclesPerYear: 365,
  defaultPeakRatePence: 28,
  defaultOffPeakRatePence: 7,
  defaultExportRatePence: 12,
  co2KgPerKwh: 0.233,
} as const
