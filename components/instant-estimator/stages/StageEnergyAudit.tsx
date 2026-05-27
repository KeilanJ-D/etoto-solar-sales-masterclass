'use client'

import { ArrowRight, Home, Zap } from 'lucide-react'
import type { AuditCalcOutputs } from '@/lib/solaflow/audit-calc'
import type { PropertyType } from '@/lib/solaflow/recommendation-engine'

export interface EnergyAuditStageProps {
  monthlyBill: number
  unitRatePence: number
  propertyType: PropertyType | ''
  roofType: 'tile' | 'slate' | 'flat'
  audit: AuditCalcOutputs
  onChange: (patch: {
    monthlyBill?: number
    unitRatePence?: number
    propertyType?: PropertyType | ''
    roofType?: 'tile' | 'slate' | 'flat'
  }) => void
  onNext: () => void
}

const PROPERTY_OPTIONS: { value: PropertyType | ''; label: string; hint: string }[] = [
  { value: '', label: '— Not specified —', hint: 'Generic defaults' },
  { value: 'terraced', label: 'Terraced', hint: '~9 panels typical' },
  { value: 'semi-detached', label: 'Semi-detached', hint: '~13 panels typical' },
  { value: 'detached', label: 'Detached', hint: '~16 panels typical' },
  { value: 'bungalow', label: 'Bungalow', hint: '~14 panels typical' },
  { value: 'flat-non-homeowner', label: 'Flat (long lease)', hint: 'Often ~12 panels' },
  { value: 'flat-homeowner', label: 'Flat (owner)', hint: 'Usually not suitable' },
  { value: 'other', label: 'Other', hint: '~12 panels generic' },
]

const ROOF_OPTIONS: { value: 'tile' | 'slate' | 'flat'; label: string; hint: string }[] = [
  { value: 'tile', label: 'Concrete tile', hint: 'Baseline — no surcharge' },
  { value: 'slate', label: 'Slate', hint: '+£25 per panel (careful handling)' },
  { value: 'flat', label: 'Flat / EPDM', hint: '+£35 per panel (frame system)' },
]

export default function StageEnergyAudit({
  monthlyBill,
  unitRatePence,
  propertyType,
  roofType,
  audit,
  onChange,
  onNext,
}: EnergyAuditStageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          <Zap className="w-3.5 h-3.5" />
          Stage 1 of 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          What does the home currently cost to run?
        </h2>
        <p className="text-slate-600">
          Bill, property and roof together tell us system size, panel count and labour cost.
          This is the foundation — get this stage right and every downstream number is real.
        </p>
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly bill */}
        <div className="space-y-1.5">
          <label htmlFor="monthly-bill" className="text-sm font-semibold text-slate-700">
            Monthly electricity bill
          </label>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium text-lg">£</span>
            <input
              id="monthly-bill"
              type="number"
              inputMode="decimal"
              min={0}
              value={monthlyBill || ''}
              onChange={(e) => onChange({ monthlyBill: Number(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px]"
              placeholder="180"
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">/month</span>
          </div>
          <p className="text-xs text-slate-500">
            Use the latest 12-month average if usage varies seasonally.
          </p>
        </div>

        {/* Unit rate */}
        <div className="space-y-1.5">
          <label htmlFor="unit-rate" className="text-sm font-semibold text-slate-700">
            Unit rate
          </label>
          <div className="flex items-center gap-2">
            <input
              id="unit-rate"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              value={unitRatePence || ''}
              onChange={(e) => onChange({ unitRatePence: Number(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px]"
              placeholder="28"
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">p / kWh</span>
          </div>
          <p className="text-xs text-slate-500">
            Ofgem cap is around 27p (Apr–Jun 2026). Always check the customer&apos;s latest bill.
          </p>
        </div>

        {/* Property type */}
        <div className="space-y-1.5">
          <label htmlFor="property-type" className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <Home className="w-4 h-4" /> Property type
          </label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => onChange({ propertyType: e.target.value as PropertyType | '' })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px] bg-white"
          >
            {PROPERTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.hint}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500">
            Seeds the default panel count in Stage 3.
          </p>
        </div>

        {/* Roof type */}
        <div className="space-y-1.5">
          <label htmlFor="roof-type" className="text-sm font-semibold text-slate-700">
            Roof type
          </label>
          <select
            id="roof-type"
            value={roofType}
            onChange={(e) => onChange({ roofType: e.target.value as 'tile' | 'slate' | 'flat' })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px] bg-white"
          >
            {ROOF_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {opt.hint}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500">
            Slate and flat roofs add labour cost — applied in Stage 4.
          </p>
        </div>
      </div>

      {/* Live outputs */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Live snapshot
        </p>
        <p className="text-2xl sm:text-3xl font-black mb-4">
          This home costs{' '}
          <span className="text-[#E8192C]">£{audit.dailyCost.toFixed(2)}</span> a day to run.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mb-1">Annual usage</p>
            <p className="text-base sm:text-xl font-bold">
              {audit.annualKwh.toLocaleString()}
              <span className="text-xs font-normal text-slate-400 ml-1">kWh</span>
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mb-1">Daily usage</p>
            <p className="text-base sm:text-xl font-bold">
              {audit.dailyKwh.toFixed(1)}
              <span className="text-xs font-normal text-slate-400 ml-1">kWh</span>
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 mb-1">Annual spend</p>
            <p className="text-base sm:text-xl font-bold text-[#E8192C]">
              £{audit.annualSpend.toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 italic">
          Bill ÷ £0.34/kWh (SolaFlow funnel divisor) = annual kWh. Conservative on purpose
          so we don&apos;t over-promise savings.
        </p>
      </div>

      {/* Next button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8192C] text-white font-bold rounded-xl hover:bg-[#D01622] active:bg-[#B01220] transition-all shadow-md min-h-[48px]"
        >
          Next: Battery sizing
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
