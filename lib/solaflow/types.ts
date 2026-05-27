// lib/solaflow/types.ts
// ============================================
// Shared product type definitions.
// Lives separately from the 1,579-line solaflow-products.ts data file so
// callers that only need a type (e.g. the Estimator stages, calc helpers)
// can import from here without pulling the catalogue data into IDE indexing.
//
// solaflow-products.ts re-exports these for backward compatibility — any
// existing `import { Battery } from '@/lib/solaflow-products'` still works.
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

export interface Extra {
  sku: string
  name: string
  description: string
  type: 'toggle' | 'quantity'
  maxQty: number
}

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
