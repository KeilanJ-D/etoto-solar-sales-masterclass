'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Battery,
  Calculator,
  Sparkles,
  Sun,
  TrendingUp,
  Zap,
} from 'lucide-react'
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
} from '@/lib/solaflow/recommendation-engine'

const PANEL_PRICE = 95
const BATTERY_PRICE_DEFAULT = 1800
const INVERTER_PRICE_DEFAULT = 1100
const LABOUR_PER_KWP = 700

/**
 * Inline Energy Audit widget. Uses SolaFlow's actual computeAudit + the
 * recommendation engine, so numbers match the SolaFlow dashboard and
 * funnel exactly. Lightweight version of the full /tools/instant-estimator
 * Energy Audit stage — designed to live INSIDE a knowledge page.
 */
export default function EnergyAuditWidget() {
  const [monthlyBill, setMonthlyBill] = useState(180)
  const [unitRatePence, setUnitRatePence] = useState(DEFAULT_GRID_RATE_PENCE)
  const [offPeakRatePence, setOffPeakRatePence] = useState(DEFAULT_OFFPEAK_RATE_PENCE)

  const audit = useMemo(
    () =>
      computeAudit({
        monthlyBill,
        unitRatePence,
        offPeakRatePence,
        exportRatePence: DEFAULT_EXPORT_RATE_PENCE,
        panelCount: 0, // recommendation engine will tell us
        panelWattage: 470,
        batteryUsableKwh: 0,
        batteryQuantity: 0,
        batteryPricePerUnit: 0,
        batteryOptimised: true,
        solarCost: 0,
        customSystemCost: null,
      }),
    [monthlyBill, unitRatePence, offPeakRatePence],
  )

  const panelRec = useMemo(
    () => calculateRecommendedPanels(audit.annualKwh, 470),
    [audit.annualKwh],
  )
  const batteryRec = useMemo(
    () => getBatteryRecommendation(audit.annualKwh),
    [audit.annualKwh],
  )

  // Build a recommended system for the savings preview using SolaFlow recommendations
  const recommendedSystem = useMemo(() => {
    if (panelRec.recommendedPanels <= 0) return null
    const systemKwp = panelRec.estimatedSystemKwp
    const batteryKwh = batteryRec.recommendedUsableCapacityKwh
    const inverterRec = getInverterRecommendation(systemKwp, batteryKwh, batteryKwh > 0 ? 1 : 0)
    const solarCost = panelRec.recommendedPanels * PANEL_PRICE + systemKwp * LABOUR_PER_KWP + INVERTER_PRICE_DEFAULT
    const batteryCost = batteryKwh > 0 ? Math.round((batteryKwh / 5) * BATTERY_PRICE_DEFAULT) : 0
    const fullAudit = computeAudit({
      monthlyBill,
      unitRatePence,
      offPeakRatePence,
      exportRatePence: DEFAULT_EXPORT_RATE_PENCE,
      panelCount: panelRec.recommendedPanels,
      panelWattage: 470,
      batteryUsableKwh: batteryKwh,
      batteryQuantity: 1,
      batteryPricePerUnit: batteryCost,
      batteryOptimised: true,
      solarCost,
      customSystemCost: null,
    })
    return { fullAudit, inverterRec, systemKwp, batteryKwh }
  }, [panelRec, batteryRec, monthlyBill, unitRatePence, offPeakRatePence])

  return (
    <div className="my-8 sm:my-10 bg-white border-2 border-[#E8192C]/20 rounded-2xl overflow-hidden shadow-lg">
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-5 sm:px-7 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-4 h-4 text-[#F5921E]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5921E]">
            Interactive · powered by SolaFlow
          </p>
        </div>
        <h3 className="font-black text-lg sm:text-xl mb-1">Energy Audit</h3>
        <p className="text-sm text-slate-300">
          Same maths as the SolaFlow dashboard. Tweak the inputs, see the recommendation
          + savings update in real time.
        </p>
      </header>

      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              Monthly bill (£): <span className="text-[#E8192C]">£{monthlyBill}</span>
            </label>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>£50</span>
              <span>£400</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
                Peak rate
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                <input
                  type="number"
                  value={unitRatePence}
                  onChange={(e) => setUnitRatePence(Math.max(0, Number(e.target.value) || 0))}
                  className="flex-1 px-3 py-2.5 bg-transparent text-base font-mono focus:outline-none"
                />
                <span className="px-3 text-slate-500 text-sm">p/kWh</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
                Off-peak
              </label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                <input
                  type="number"
                  value={offPeakRatePence}
                  onChange={(e) => setOffPeakRatePence(Math.max(0, Number(e.target.value) || 0))}
                  className="flex-1 px-3 py-2.5 bg-transparent text-base font-mono focus:outline-none"
                />
                <span className="px-3 text-slate-500 text-sm">p/kWh</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">SolaFlow uses a fixed £0.34/kWh divisor</span> to
              estimate annual kWh from a bill — locked to the funnel for parity.
            </p>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Live audit
          </p>
          <OutputRow
            label="Annual spend"
            value={`£${audit.annualSpend.toLocaleString()}`}
          />
          <OutputRow
            label="Annual usage"
            value={`${audit.annualKwh.toLocaleString()} kWh`}
          />
          <OutputRow
            label="Daily kWh"
            value={`${audit.dailyKwh.toFixed(1)} kWh`}
          />
          <OutputRow
            label="Daily running cost"
            value={`£${audit.dailyCost.toFixed(2)}`}
            highlight
          />
        </div>
      </div>

      {/* RECOMMENDED SYSTEM */}
      {recommendedSystem && (
        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E8192C]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8192C]">
              SolaFlow recommends for this customer
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <RecChip
              icon={Sun}
              label="Panels"
              value={`${panelRec.recommendedPanels}× 470W`}
              sub={`${recommendedSystem.systemKwp.toFixed(2)} kWp`}
            />
            <RecChip
              icon={Battery}
              label="Battery"
              value={`${recommendedSystem.batteryKwh} kWh`}
              sub={batteryRec.bandLabel}
            />
            <RecChip
              icon={Zap}
              label="Inverter"
              value={`${recommendedSystem.inverterRec.recommendedPowerKw} kW`}
              sub={`Range ${recommendedSystem.inverterRec.minAcceptablePowerKw}–${recommendedSystem.inverterRec.maxAcceptablePowerKw} kW`}
            />
            <RecChip
              icon={TrendingUp}
              label="Payback"
              value={
                recommendedSystem.fullAudit.paybackYears
                  ? `${recommendedSystem.fullAudit.paybackYears} yrs`
                  : '—'
              }
              sub={`£${Math.round(recommendedSystem.fullAudit.totalAnnualBenefit).toLocaleString()}/yr saved`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white rounded-lg p-4 border border-slate-200">
            <div>
              <p className="text-xs text-slate-500">Indicative system cost</p>
              <p className="text-xl font-black text-slate-900">
                £{recommendedSystem.fullAudit.effectiveSystemCost.toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 font-semibold">
                25-year saving: £{Math.round(recommendedSystem.fullAudit.twentyFiveYearTotal).toLocaleString()}
              </p>
            </div>
            <Link
              href="/tools/instant-estimator"
              className="inline-flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md whitespace-nowrap"
            >
              Open the Instant Estimator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function OutputRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 ${highlight ? 'bg-[#E8192C]/5 border border-[#E8192C]/20 rounded-lg p-3' : 'border-b border-slate-100 pb-2'}`}
    >
      <span className="text-sm text-slate-700">{label}</span>
      <span
        className={`font-mono font-bold whitespace-nowrap ${highlight ? 'text-[#E8192C] text-lg' : 'text-slate-900 text-base'}`}
      >
        {value}
      </span>
    </div>
  )
}

function RecChip({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Sun
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="bg-white rounded-lg ring-1 ring-slate-200 p-3">
      <Icon className="w-4 h-4 text-[#E8192C] mb-1" />
      <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wide">
        {label}
      </p>
      <p className="text-base font-black text-slate-900 leading-tight my-0.5">
        {value}
      </p>
      <p className="text-[10px] text-slate-500 leading-tight">{sub}</p>
    </div>
  )
}
