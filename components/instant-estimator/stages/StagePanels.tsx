'use client'

import { useMemo } from 'react'
import { ArrowLeft, ArrowRight, Sun, Minus, Plus, Battery as BatteryIcon } from 'lucide-react'
import ProductPicker, { type ProductPickerItem } from '../ProductPicker'
import { panels, type Panel } from '@/lib/solaflow-products'
import type { AuditCalcOutputs } from '@/lib/solaflow/audit-calc'
import type { PanelRecommendation } from '@/lib/solaflow/recommendation-engine'

export interface PanelsStageProps {
  selectedPanelSku: string
  panelCount: number
  exportRatePence: number
  batteryOptimised: boolean
  hasBattery: boolean
  audit: AuditCalcOutputs
  panelRec: PanelRecommendation
  onChange: (patch: {
    selectedPanelSku?: string
    panelCount?: number
    exportRatePence?: number
    batteryOptimised?: boolean
  }) => void
  onNext: () => void
  onBack: () => void
}

export default function StagePanels({
  selectedPanelSku,
  panelCount,
  exportRatePence,
  batteryOptimised,
  hasBattery,
  audit,
  panelRec,
  onChange,
  onNext,
  onBack,
}: PanelsStageProps) {
  const selectedPanel: Panel | undefined = useMemo(
    () => panels.find((p) => p.sku === selectedPanelSku),
    [selectedPanelSku],
  )

  const panelItems: ProductPickerItem[] = useMemo(
    () =>
      panels.map((p) => ({
        sku: p.sku,
        brand: p.brand,
        name: p.name,
        imagePath: p.imagePath,
        primarySpec: `${p.wattage}W`,
        secondarySpec: `${p.efficiency} efficiency`,
        badge: p.badge,
        isRecommended: p.wattage >= 470 && p.wattage <= 510, // sensible band for UK roofs
      })),
    [],
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          <Sun className="w-3.5 h-3.5" />
          Stage 3 of 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Solar generation
        </h2>
        <p className="text-slate-600">
          Recommended: <strong className="text-slate-900">{panelRec.recommendedPanels} panels</strong>{' '}
          ({panelRec.estimatedSystemKwp.toFixed(1)} kWp) to cover annual usage at 3.2 PSH (peak
          sun hours) × 0.78 PR (performance ratio — losses from heat, wiring, soiling).
        </p>
      </div>

      {/* Panel picker */}
      <ProductPicker
        label="Choose a panel"
        items={panelItems}
        selectedSku={selectedPanelSku}
        onSelect={(sku) => onChange({ selectedPanelSku: sku })}
        compact
      />

      {/* Panel count stepper */}
      {selectedPanel && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                Number of {selectedPanel.brand} {selectedPanel.name}
              </p>
              <p className="text-xs text-slate-500">
                System size:{' '}
                <strong className="text-slate-900">{audit.systemKwp.toFixed(2)} kWp</strong>{' '}
                · Daily generation:{' '}
                <strong className="text-slate-900">{audit.dailyGeneration.toFixed(1)} kWh</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChange({ panelCount: Math.max(0, panelCount - 1) })}
                disabled={panelCount <= 0}
                className="w-11 h-11 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Decrease panel count"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={30}
                value={panelCount}
                onChange={(e) =>
                  onChange({
                    panelCount: Math.max(0, Math.min(30, Number(e.target.value) || 0)),
                  })
                }
                className="w-16 text-center text-2xl font-black text-slate-900 bg-transparent border-b-2 border-slate-300 focus:border-[#E8192C] focus:outline-none py-1"
              />
              <button
                type="button"
                onClick={() => onChange({ panelCount: Math.min(30, panelCount + 1) })}
                disabled={panelCount >= 30}
                className="w-11 h-11 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Increase panel count"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export rate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="export-rate" className="text-sm font-semibold text-slate-700">
            SEG export rate (Smart Export Guarantee)
          </label>
          <div className="flex items-center gap-2">
            <input
              id="export-rate"
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              value={exportRatePence || ''}
              onChange={(e) => onChange({ exportRatePence: Number(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none text-slate-900 font-medium text-base min-h-[48px]"
              placeholder="12"
            />
            <span className="text-slate-500 text-sm whitespace-nowrap">p / kWh</span>
          </div>
          <p className="text-xs text-slate-500">
            Octopus Outgoing ~15p, EDF/British Gas SEG ~7-12p.
          </p>
        </div>
      </div>

      {/* Self-consumption mode (only if battery present) */}
      {hasBattery && (
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-6">
          <p className="text-sm font-bold text-slate-900 mb-1">
            How does the system route solar?
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Battery-optimised is the default — squeezes every penny out of off-peak arbitrage and
            full export.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onChange({ batteryOptimised: false })}
              className={`text-left rounded-xl border-2 p-4 transition-all ${
                !batteryOptimised
                  ? 'border-[#E8192C] bg-[#E8192C]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-4 h-4 text-amber-600" />
                <p className="font-bold text-sm text-slate-900">Self-consume first (70/30)</p>
              </div>
              <p className="text-xs text-slate-600">
                70% solar self-consumed, 30% exported. Battery sits idle as backup.
              </p>
            </button>
            <button
              type="button"
              onClick={() => onChange({ batteryOptimised: true })}
              className={`text-left rounded-xl border-2 p-4 transition-all ${
                batteryOptimised
                  ? 'border-[#E8192C] bg-[#E8192C]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <BatteryIcon className="w-4 h-4 text-emerald-600" />
                <p className="font-bold text-sm text-slate-900">Battery-optimised (recommended)</p>
              </div>
              <p className="text-xs text-slate-600">
                100% solar exported, battery cycles from off-peak grid. Bigger total benefit.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Live solar snapshot */}
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
          Solar economics
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">System size</p>
            <p className="text-xl font-black">
              {audit.systemKwp.toFixed(1)}<span className="text-sm font-normal text-slate-400"> kWp</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Daily gen.</p>
            <p className="text-xl font-black">
              {audit.dailyGeneration.toFixed(1)}<span className="text-sm font-normal text-slate-400"> kWh</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Self-consume</p>
            <p className="text-xl font-black">
              £{Math.round(audit.annualSelfConsumeSaving).toLocaleString()}
              <span className="text-sm font-normal text-slate-400">/yr</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">Export income</p>
            <p className="text-xl font-black">
              £{Math.round(audit.annualSolarExport).toLocaleString()}
              <span className="text-sm font-normal text-slate-400">/yr</span>
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
          Next: Payback
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
