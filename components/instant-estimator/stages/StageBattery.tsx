'use client'

import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, Battery as BatteryIcon, Minus, Plus, AlertTriangle } from 'lucide-react'
import ProductPicker, { type ProductPickerItem } from '../ProductPicker'
import { batteries, inverters, type Battery, type Inverter } from '@/lib/solaflow-products'
import type { AuditCalcOutputs } from '@/lib/solaflow/audit-calc'
import type { BatteryRecommendation, InverterRecommendation } from '@/lib/solaflow/recommendation-engine'
import { getBatteryPrice, getInverterPrice } from '@/lib/instant-estimator/pricing'

export interface BatteryStageProps {
  selectedBatterySku: string | null
  batteryQuantity: number
  offPeakRatePence: number
  selectedInverterSku: string | null
  audit: AuditCalcOutputs
  batteryRec: BatteryRecommendation
  inverterRec: InverterRecommendation
  onChange: (patch: {
    selectedBatterySku?: string | null
    batteryQuantity?: number
    offPeakRatePence?: number
    selectedInverterSku?: string | null
  }) => void
  onNext: () => void
  onBack: () => void
}

export default function StageBattery({
  selectedBatterySku,
  batteryQuantity,
  offPeakRatePence,
  selectedInverterSku,
  audit,
  batteryRec,
  inverterRec,
  onChange,
  onNext,
  onBack,
}: BatteryStageProps) {
  const selectedBattery: Battery | undefined = useMemo(
    () => batteries.find((b) => b.sku === selectedBatterySku),
    [selectedBatterySku],
  )

  const needsSeparateInverter = selectedBattery && !selectedBattery.hybrid

  // Battery picker items with recommendation badging
  const batteryItems: ProductPickerItem[] = useMemo(
    () =>
      batteries.map((b) => {
        const totalIfMin = b.capacityKwh * 1
        const inBand =
          totalIfMin >= batteryRec.minUsableCapacityKwh &&
          totalIfMin <= batteryRec.maxUsableCapacityKwh
        return {
          sku: b.sku,
          brand: b.brand,
          name: b.name,
          imagePath: b.imagePath,
          primarySpec: `${b.capacityKwh} kWh usable`,
          secondarySpec: b.hybrid
            ? 'Hybrid (inverter built-in)'
            : `Max ${b.maxPerStack ?? 4} per stack`,
          pricePerUnit: getBatteryPrice(b.sku),
          badge: b.badge,
          isRecommended: inBand,
        }
      }),
    [batteryRec.minUsableCapacityKwh, batteryRec.maxUsableCapacityKwh],
  )

  // Compatible inverters (brand-locked, battery-compatible, not gateways)
  const compatibleInverters: Inverter[] = useMemo(() => {
    if (!selectedBattery || !needsSeparateInverter) return []
    return inverters.filter(
      (inv) =>
        inv.batteryCompatible &&
        !inv.isGateway &&
        (inv.compatibleBrands.includes(selectedBattery.brand) ||
          inv.compatibleBrands.includes('Universal')),
    )
  }, [selectedBattery, needsSeparateInverter])

  const inverterItems: ProductPickerItem[] = useMemo(
    () =>
      compatibleInverters.map((inv) => {
        const inBand =
          inv.ratingKw >= inverterRec.minAcceptablePowerKw &&
          inv.ratingKw <= inverterRec.maxAcceptablePowerKw
        return {
          sku: inv.sku,
          brand: inv.brand,
          name: inv.name,
          imagePath: inv.imagePath,
          primarySpec: `${inv.ratingKw} kW`,
          secondarySpec: inv.phaseType,
          pricePerUnit: getInverterPrice(inv.sku),
          badge: inv.badge,
          isRecommended: inBand,
        }
      }),
    [compatibleInverters, inverterRec.minAcceptablePowerKw, inverterRec.maxAcceptablePowerKw],
  )

  // Auto-clear inverter when battery changes & previously-selected becomes incompatible
  const inverterStillValid = compatibleInverters.some((i) => i.sku === selectedInverterSku)

  const maxQty = selectedBattery?.maxPerStack ?? 4
  const totalCapacity = (selectedBattery?.capacityKwh ?? 0) * batteryQuantity

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          <BatteryIcon className="w-3.5 h-3.5" />
          Stage 2 of 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Battery sizing & selection
        </h2>
        <p className="text-slate-600">
          Recommended around{' '}
          <strong className="text-slate-900">{batteryRec.recommendedUsableCapacityKwh} kWh usable</strong>{' '}
          for {batteryRec.dailyKwh.toFixed(1)} kWh/day usage. Bigger isn&apos;t always better — over-sized
          batteries sit half-full and never pay back.
        </p>
      </div>

      {/* Battery picker */}
      <ProductPicker
        label="Choose a battery"
        items={batteryItems}
        selectedSku={selectedBatterySku}
        onSelect={(sku) => {
          onChange({ selectedBatterySku: sku })
          // If new battery is hybrid, clear separate inverter
          const newBattery = batteries.find((b) => b.sku === sku)
          if (newBattery?.hybrid) onChange({ selectedInverterSku: null })
        }}
        hint={batteryRec.bandLabel}
      />

      {/* Quantity stepper + capacity readout */}
      {selectedBattery && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                How many {selectedBattery.brand} {selectedBattery.name} units?
              </p>
              <p className="text-xs text-slate-500">
                Max {maxQty} per stack. Total capacity:{' '}
                <strong className="text-slate-900">{totalCapacity.toFixed(1)} kWh</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({ batteryQuantity: Math.max(1, batteryQuantity - 1) })
                }
                disabled={batteryQuantity <= 1}
                className="w-11 h-11 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-16 text-center">
                <span className="text-2xl font-black text-slate-900">{batteryQuantity}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onChange({ batteryQuantity: Math.min(maxQty, batteryQuantity + 1) })
                }
                disabled={batteryQuantity >= maxQty}
                className="w-11 h-11 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Off-peak rate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="off-peak-rate" className="text-sm font-semibold text-slate-700">
            Off-peak charging rate
          </label>
          <div className="flex items-center gap-2">
            <input
              id="off-peak-rate"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              value={offPeakRatePence || ''}
              onChange={(e) => onChange({ offPeakRatePence: Number(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px]"
              placeholder="7"
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">p / kWh</span>
          </div>
          <p className="text-xs text-slate-500">
            Octopus Cosy/Go ~7p, Economy 7 ~10p.
          </p>
        </div>
      </div>

      {/* Inverter picker (conditional) */}
      {needsSeparateInverter && (
        <>
          {compatibleInverters.length === 0 ? (
            <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900 mb-1">
                  No compatible inverter found
                </p>
                <p className="text-xs text-red-700">
                  This battery brand has no inverter in the catalogue. Pick a different battery or
                  check the real SolaFlow product list with your manager.
                </p>
              </div>
            </div>
          ) : (
            <ProductPicker
              label="Choose a compatible inverter"
              items={inverterItems}
              selectedSku={inverterStillValid ? selectedInverterSku : null}
              onSelect={(sku) => onChange({ selectedInverterSku: sku })}
              hint={`Recommended: ~${inverterRec.recommendedPowerKw} kW`}
            />
          )}
        </>
      )}

      {selectedBattery?.hybrid && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
          <BatteryIcon className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-emerald-900 mb-0.5">All-in-one unit</p>
            <p className="text-xs text-emerald-800">
              {selectedBattery.brand} {selectedBattery.name} includes the inverter internally — no
              separate inverter required.
            </p>
          </div>
        </div>
      )}

      {/* Live battery snapshot */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
          Battery economics
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Coverage</p>
            <p className="text-xl font-black">
              {audit.coveragePercent.toFixed(0)}<span className="text-sm font-normal text-slate-400">%</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Covered/day</p>
            <p className="text-xl font-black">
              {audit.coveredKwh.toFixed(1)}<span className="text-sm font-normal text-slate-400"> kWh</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Surplus/day</p>
            <p className="text-xl font-black text-teal-400">
              {audit.surplusKwh.toFixed(1)}<span className="text-sm font-normal text-slate-400"> kWh</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Annual saving</p>
            <p className="text-xl font-black text-emerald-400">
              £{Math.round(audit.modes.batteryOnly.batterySaving).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8192C] text-white font-bold rounded-xl hover:bg-[#D01622] active:bg-[#B01220] transition-all shadow-md min-h-[48px]"
        >
          Next: Solar panels
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
