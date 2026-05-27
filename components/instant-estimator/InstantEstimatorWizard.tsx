'use client'

import { useEffect, useMemo, useState } from 'react'
import { Battery, Sun, TrendingUp, Zap, Sparkles, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import {
  computeAudit,
  DEFAULT_EXPORT_RATE_PENCE,
  DEFAULT_GRID_RATE_PENCE,
  DEFAULT_OFFPEAK_RATE_PENCE,
} from '@/lib/solaflow/audit-calc'
import {
  calculateRecommendedPanels,
  getBatteryRecommendation,
  getInverterRecommendation,
  PROPERTY_PANEL_DEFAULTS,
  type PropertyType,
} from '@/lib/solaflow/recommendation-engine'
import { batteries, inverters, panels } from '@/lib/solaflow-products'
import { isInverterBatteryCompatible } from '@/lib/solaflow/product-compatibility'
import {
  computeSolarCost,
  getBatteryPrice,
  getInverterPrice,
} from '@/lib/instant-estimator/pricing'
import {
  computeBatteryCost,
  computeInverterQuantity,
} from '@/lib/instant-estimator/battery-cost'
import StageEnergyAudit from './stages/StageEnergyAudit'
import StageBattery from './stages/StageBattery'
import StagePanels from './stages/StagePanels'
import StagePayback from './stages/StagePayback'
import SummaryFooter from './SummaryFooter'

type StageIndex = 0 | 1 | 2 | 3

interface EstimatorState {
  // Stage 1
  monthlyBill: number
  unitRatePence: number
  propertyType: PropertyType | ''
  roofType: 'tile' | 'slate' | 'flat'
  // Stage 2
  selectedBatterySku: string | null
  batteryQuantity: number
  offPeakRatePence: number
  selectedInverterSku: string | null
  // Stage 3
  selectedPanelSku: string
  panelCount: number
  /** True once the user has manually touched panelCount. Prevents
   * handlePropertyChange from silently overwriting their edit. */
  panelCountUserSet: boolean
  exportRatePence: number
  batteryOptimised: boolean
  // Stage 4
  extrasCost: number
  customSystemCost: number | null
}

const INITIAL_STATE: EstimatorState = {
  monthlyBill: 180,
  unitRatePence: DEFAULT_GRID_RATE_PENCE,
  propertyType: 'semi-detached',
  roofType: 'tile',
  selectedBatterySku: 'foxess-ep6-5.76kwh',
  batteryQuantity: 2,
  offPeakRatePence: DEFAULT_OFFPEAK_RATE_PENCE,
  selectedInverterSku: 'foxess-h1-5kw',
  selectedPanelSku: 'aiko-470w',
  panelCount: 13,
  panelCountUserSet: false,
  exportRatePence: DEFAULT_EXPORT_RATE_PENCE,
  batteryOptimised: true,
  extrasCost: 0,
  customSystemCost: null,
}

const TABS = [
  { idx: 0 as StageIndex, label: 'Energy audit', short: 'Audit', icon: Zap, accent: 'amber' },
  { idx: 1 as StageIndex, label: 'Battery', short: 'Battery', icon: Battery, accent: 'emerald' },
  { idx: 2 as StageIndex, label: 'Solar panels', short: 'Solar', icon: Sun, accent: 'amber' },
  { idx: 3 as StageIndex, label: 'Payback', short: 'Payback', icon: TrendingUp, accent: 'red' },
] as const

export default function InstantEstimatorWizard() {
  const [state, setState] = useState<EstimatorState>(INITIAL_STATE)
  const [activeStage, setActiveStage] = useState<StageIndex>(0)

  /**
   * Patch with two automatic flags:
   * - Any patch touching `panelCount` sets `panelCountUserSet=true` so
   *   subsequent property-type changes don't silently overwrite it.
   * - Doesn't fire on the auto-seed path (which uses raw setState in
   *   handlePropertyChange below).
   */
  const patch = (p: Partial<EstimatorState>) =>
    setState((s) => {
      const next: EstimatorState = { ...s, ...p }
      if ('panelCount' in p && p.panelCount !== s.panelCount) {
        next.panelCountUserSet = true
      }
      return next
    })

  // Resolve selected products
  const selectedPanel = useMemo(
    () => panels.find((p) => p.sku === state.selectedPanelSku),
    [state.selectedPanelSku],
  )
  const selectedBattery = useMemo(
    () => batteries.find((b) => b.sku === state.selectedBatterySku),
    [state.selectedBatterySku],
  )

  // Pricing — uses helpers that mirror real SolaFlow productCalc.ts:
  // - computeBatteryCost handles Tesla PW3 expansion-pack pricing
  // - computeInverterQuantity handles requiresInverterPerStack (EcoFlow,
  //   Powervault, Sigenergy) so cost reflects the right number of inverters
  const batteryPriceUnit = getBatteryPrice(state.selectedBatterySku)
  const batteryDetail = computeBatteryCost(selectedBattery, state.batteryQuantity)
  const batteryCost = batteryDetail.total

  const hasPanels =
    (selectedPanel?.wattage ?? 0) > 0 && state.panelCount > 0
  const inverterQuantity = computeInverterQuantity(
    selectedBattery,
    state.batteryQuantity,
    hasPanels,
  )
  const inverterPriceUnit =
    inverterQuantity > 0 ? getInverterPrice(state.selectedInverterSku) : 0
  const inverterCost = inverterQuantity * inverterPriceUnit

  const solarBreakdown = computeSolarCost({
    panelCount: state.panelCount,
    panelWattage: selectedPanel?.wattage ?? 0,
    roofType: state.roofType,
  })

  // Audit computation
  const audit = useMemo(
    () =>
      computeAudit({
        monthlyBill: state.monthlyBill,
        unitRatePence: state.unitRatePence,
        offPeakRatePence: state.offPeakRatePence,
        exportRatePence: state.exportRatePence,
        panelCount: state.panelCount,
        panelWattage: selectedPanel?.wattage ?? 0,
        batteryUsableKwh: selectedBattery?.capacityKwh ?? 0,
        batteryQuantity: state.batteryQuantity,
        batteryPricePerUnit: batteryPriceUnit,
        // Pass the expansion-pack-aware total as an override so the audit
        // doesn't silently multiply unit × qty and discard the saving.
        batteryCostOverride: batteryCost,
        batteryOptimised: state.batteryOptimised,
        solarCost: solarBreakdown.total + inverterCost,
        customSystemCost: state.customSystemCost,
        extrasCost: state.extrasCost,
      }),
    [
      state.monthlyBill,
      state.unitRatePence,
      state.offPeakRatePence,
      state.exportRatePence,
      state.panelCount,
      selectedPanel?.wattage,
      selectedBattery?.capacityKwh,
      state.batteryQuantity,
      batteryPriceUnit,
      batteryCost,
      state.batteryOptimised,
      solarBreakdown.total,
      inverterCost,
      state.customSystemCost,
      state.extrasCost,
    ],
  )

  // Recommendations
  const panelRec = useMemo(
    () => calculateRecommendedPanels(audit.annualKwh, selectedPanel?.wattage ?? 470),
    [audit.annualKwh, selectedPanel?.wattage],
  )
  const batteryRec = useMemo(
    () => getBatteryRecommendation(audit.annualKwh),
    [audit.annualKwh],
  )
  const inverterRec = useMemo(
    () =>
      getInverterRecommendation(audit.systemKwp, audit.totalCapacity, state.batteryQuantity),
    [audit.systemKwp, audit.totalCapacity, state.batteryQuantity],
  )

  /**
   * Auto-seed panel count when property type changes — but only if the
   * user hasn't already manually set the count. Uses raw setState so the
   * auto-seed doesn't trigger the patch's "user-set" flag.
   */
  const handlePropertyChange = (next: EstimatorState['propertyType']) => {
    setState((s) => {
      if (!next) return { ...s, propertyType: next }
      const def = PROPERTY_PANEL_DEFAULTS[next as PropertyType]
      if (def?.recommended != null && !s.panelCountUserSet) {
        // Auto-seed; deliberately does NOT mark panelCountUserSet=true
        return { ...s, propertyType: next, panelCount: def.recommended }
      }
      return { ...s, propertyType: next }
    })
  }

  /**
   * Auto-clear `selectedInverterSku` when the chosen inverter is no longer
   * compatible with the chosen battery — covers the case where a rep picks
   * FoxESS H1, then swaps to a Tesla PW3 (hybrid → no inverter needed) or
   * to an EcoFlow battery (different brand). Mirrors the source's effect
   * + toast pattern; we drop the toast for simplicity.
   */
  useEffect(() => {
    if (!state.selectedInverterSku) return
    // Hybrid battery or no battery? Inverter is unused — clear it
    if (selectedBattery?.hybrid || !selectedBattery) {
      setState((s) =>
        s.selectedInverterSku ? { ...s, selectedInverterSku: null } : s,
      )
      return
    }
    // Non-hybrid battery: check current inverter is still brand-compatible
    const currentInverter = inverters.find(
      (i) => i.sku === state.selectedInverterSku,
    )
    if (
      currentInverter &&
      !isInverterBatteryCompatible(currentInverter, selectedBattery)
    ) {
      setState((s) => ({ ...s, selectedInverterSku: null }))
    }
  }, [selectedBattery, state.selectedInverterSku])

  const reset = () => {
    setState(INITIAL_STATE)
    setActiveStage(0)
  }

  // Summary footer derived data
  const batterySummary = selectedBattery
    ? `${state.batteryQuantity}× ${selectedBattery.name} = ${audit.totalCapacity.toFixed(1)} kWh`
    : null
  const panelSummary = selectedPanel && state.panelCount > 0
    ? `${state.panelCount}× ${selectedPanel.wattage}W = ${audit.systemKwp.toFixed(1)} kWp`
    : null

  const goto = (idx: StageIndex) => {
    setActiveStage(idx)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Training mode banner */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-4 py-2.5 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider">Training mode</span>
            <span className="hidden sm:inline opacity-70">·</span>
            <span className="font-medium">
              Indicative numbers — verify against your company&apos;s SolaFlow pricing before quoting a customer
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#E8192C] font-bold mb-1">
              Training tool
            </p>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Instant Estimator
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Practise the SolaFlow 4-stage flow — Audit, Battery, Panels, Payback.
            </p>
          </div>
          <Link
            href="/solaflow"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#E8192C] transition-colors flex-shrink-0 pt-2"
          >
            About SolaFlow
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Tab strip */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 print:hidden">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeStage === tab.idx
              return (
                <button
                  key={tab.idx}
                  type="button"
                  onClick={() => goto(tab.idx)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 min-h-[40px] ${
                    isActive
                      ? 'bg-[#E8192C] text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                    }`}
                  >
                    {tab.idx + 1}
                  </span>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.short}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Active stage content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {activeStage === 0 && (
          <StageEnergyAudit
            monthlyBill={state.monthlyBill}
            unitRatePence={state.unitRatePence}
            propertyType={state.propertyType}
            roofType={state.roofType}
            audit={audit}
            onChange={(p) => {
              if (p.propertyType !== undefined) {
                handlePropertyChange(p.propertyType)
              }
              const rest: Partial<EstimatorState> = { ...p }
              delete (rest as { propertyType?: unknown }).propertyType
              if (Object.keys(rest).length) patch(rest)
            }}
            onNext={() => goto(1)}
          />
        )}
        {activeStage === 1 && (
          <StageBattery
            selectedBatterySku={state.selectedBatterySku}
            batteryQuantity={state.batteryQuantity}
            offPeakRatePence={state.offPeakRatePence}
            selectedInverterSku={state.selectedInverterSku}
            audit={audit}
            batteryRec={batteryRec}
            inverterRec={inverterRec}
            onChange={patch}
            onNext={() => goto(2)}
            onBack={() => goto(0)}
          />
        )}
        {activeStage === 2 && (
          <StagePanels
            selectedPanelSku={state.selectedPanelSku}
            panelCount={state.panelCount}
            exportRatePence={state.exportRatePence}
            batteryOptimised={state.batteryOptimised}
            hasBattery={(selectedBattery?.capacityKwh ?? 0) * state.batteryQuantity > 0}
            audit={audit}
            panelRec={panelRec}
            onChange={patch}
            onNext={() => goto(3)}
            onBack={() => goto(1)}
          />
        )}
        {activeStage === 3 && (
          <StagePayback
            extrasCost={state.extrasCost}
            customSystemCost={state.customSystemCost}
            audit={audit}
            batteryCost={batteryCost}
            batteryDescription={batteryDetail.description}
            solarCost={solarBreakdown.total}
            inverterCost={inverterCost}
            inverterQuantity={inverterQuantity}
            onChange={patch}
            onBack={() => goto(2)}
            onPrint={() => {
              if (typeof window !== 'undefined') window.print()
            }}
          />
        )}

        {/* Footer cross-link */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-1">
                Want the real thing?
              </p>
              <p className="text-sm sm:text-base text-slate-700">
                This estimator mirrors the SolaFlow flow. The real product handles tenant pricing,
                CRM sync, branded PDFs and live signing — talk to your manager about getting set up.
              </p>
            </div>
            <Link
              href="/solaflow"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all whitespace-nowrap min-h-[44px]"
            >
              Learn about SolaFlow
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky summary footer */}
      <SummaryFooter
        dailyKwh={audit.dailyKwh}
        batterySummary={batterySummary}
        panelSummary={panelSummary}
        totalCost={audit.effectiveSystemCost}
        paybackYears={audit.paybackYears}
        onReset={reset}
      />
    </div>
  )
}
