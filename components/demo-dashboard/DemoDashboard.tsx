'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  ArrowDownToLine,
  Battery,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Leaf,
  Lightbulb,
  PoundSterling,
  RotateCw,
  Settings,
  Sparkles,
  Sun,
  TrendingUp,
  Zap,
} from 'lucide-react'
import {
  computeAudit,
  DEFAULT_GRID_RATE_PENCE,
  DEFAULT_OFFPEAK_RATE_PENCE,
  DEFAULT_EXPORT_RATE_PENCE,
} from '@/lib/solaflow/audit-calc'
import {
  calculateRecommendedPanels,
  getBatteryRecommendation,
  getInverterRecommendation,
} from '@/lib/solaflow/recommendation-engine'
import {
  panels,
  batteries,
  inverters,
  type Panel,
  type Battery as BatteryProduct,
  type Inverter,
} from '@/lib/solaflow-products'

type Screen = 'audit' | 'products' | 'quote'

// Fixed indicative trade pricing for demo. Real SolaFlow uses tenant-configured tiers.
const PANEL_PRICE = 95 // £ per panel, installed
const PRICE_PER_KWP_LABOUR = 700 // £/kWp labour + scaffolding baseline
const BATTERY_PRICE_MAP: Record<string, number> = {
  'anker-solix-x1-5kwh': 1800,
  'bexie-bxb-5klv-pro-5kwh': 2400,
  'ecoflow-powerocean-5kwh': 1500,
  'foxess-ep6-5.76kwh': 1750,
  'foxess-ep12-11.52kwh': 3200,
  'powervault-p5-5kwh': 1900,
  'sigenergy-6.0-5.84kwh': 2800,
  'sigenergy-10.0-9.04kwh': 4200,
  'tesla-powerwall-3-13.5kwh': 7800,
}
const INVERTER_PRICE_MAP: Record<string, number> = {
  // Anker
  'anker-solix-3.68kw': 950,
  'anker-solix-4.6kw': 1100,
  'anker-solix-5kw': 1200,
  'anker-solix-6kw': 1450,
  // FOX ESS H1
  'foxess-h1-3.7kw': 950,
  'foxess-h1-5kw': 1100,
  'foxess-h1-6kw': 1300,
  // Sigenergy
  'sigenergy-5kw': 1450,
  'sigenergy-6kw': 1650,
  'sigenergy-8kw': 1950,
  // EcoFlow
  'ecoflow-5kw': 850,
  'ecoflow-6kw': 1050,
}

interface DemoState {
  monthlyBill: number
  unitRatePence: number
  offPeakRatePence: number
  exportRatePence: number
  selectedPanelSku: string
  panelCount: number
  selectedBatterySku: string
  batteryQuantity: number
  selectedInverterSku: string
  batteryOptimised: boolean
}

const INITIAL_STATE: DemoState = {
  monthlyBill: 180,
  unitRatePence: DEFAULT_GRID_RATE_PENCE,
  offPeakRatePence: DEFAULT_OFFPEAK_RATE_PENCE,
  exportRatePence: DEFAULT_EXPORT_RATE_PENCE,
  selectedPanelSku: 'aiko-470w',
  panelCount: 12,
  selectedBatterySku: 'foxess-ep6-5.76kwh',
  batteryQuantity: 2,
  selectedInverterSku: 'foxess-h1-5kw',
  batteryOptimised: true,
}

export default function DemoDashboard() {
  const [screen, setScreen] = useState<Screen>('audit')
  const [state, setState] = useState<DemoState>(INITIAL_STATE)

  const selectedPanel = useMemo(
    () => panels.find((p) => p.sku === state.selectedPanelSku),
    [state.selectedPanelSku],
  )
  const selectedBattery = useMemo(
    () => batteries.find((b) => b.sku === state.selectedBatterySku),
    [state.selectedBatterySku],
  )
  const selectedInverter = useMemo(
    () => inverters.find((i) => i.sku === state.selectedInverterSku),
    [state.selectedInverterSku],
  )

  const batteryPrice =
    BATTERY_PRICE_MAP[state.selectedBatterySku] ?? 2000
  const inverterPrice =
    INVERTER_PRICE_MAP[state.selectedInverterSku] ?? 1200
  const panelTotal = state.panelCount * PANEL_PRICE
  const systemKwp = ((selectedPanel?.wattage ?? 0) * state.panelCount) / 1000
  const labourCost = Math.round(systemKwp * PRICE_PER_KWP_LABOUR)
  const solarCost = panelTotal + labourCost + inverterPrice

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
        batteryPricePerUnit: batteryPrice,
        batteryOptimised: state.batteryOptimised,
        solarCost,
        customSystemCost: null,
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
      batteryPrice,
      state.batteryOptimised,
      solarCost,
    ],
  )

  const panelRec = useMemo(
    () =>
      calculateRecommendedPanels(audit.annualKwh, selectedPanel?.wattage ?? 470),
    [audit.annualKwh, selectedPanel?.wattage],
  )
  const batteryRec = useMemo(
    () => getBatteryRecommendation(audit.annualKwh),
    [audit.annualKwh],
  )
  const inverterRec = useMemo(
    () =>
      getInverterRecommendation(
        audit.systemKwp,
        audit.totalCapacity,
        state.batteryQuantity,
      ),
    [audit.systemKwp, audit.totalCapacity, state.batteryQuantity],
  )

  const resetState = () => setState(INITIAL_STATE)

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      {/* PRACTICE MODE BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-amber-950 px-4 sm:px-6 py-2.5 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold uppercase tracking-wider">Practice mode</span>
            <span className="hidden sm:inline opacity-70">·</span>
            <span className="font-medium">
              Numbers and configs only — nothing is saved or sent
            </span>
          </div>
          <button
            onClick={resetState}
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
          >
            <RotateCw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] min-h-[calc(100vh-44px)]">
        {/* SIDEBAR */}
        <aside className="bg-slate-900 text-white px-4 py-6 lg:py-8 border-b lg:border-b-0 lg:border-r border-slate-800">
          <div className="flex items-center gap-2.5 mb-7 px-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E8192C] to-[#F5921E] flex items-center justify-center font-black text-sm shadow-lg">
              S
            </div>
            <div>
              <p className="font-black text-sm leading-none">SolaFlow</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Demo Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarLink
              icon={Calculator}
              label="Energy Audit"
              active={screen === 'audit'}
              onClick={() => setScreen('audit')}
            />
            <SidebarLink
              icon={Settings}
              label="Products"
              active={screen === 'products'}
              onClick={() => setScreen('products')}
            />
            <SidebarLink
              icon={FileText}
              label="Quote Preview"
              active={screen === 'quote'}
              onClick={() => setScreen('quote')}
            />
          </nav>

          <div className="mt-8 px-2">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">
              Live spec
            </p>
            <div className="bg-white/5 rounded-lg p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>System</span>
                <span className="font-semibold text-white">
                  {audit.systemKwp.toFixed(2)} kWp
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Battery</span>
                <span className="font-semibold text-white">
                  {audit.totalCapacity.toFixed(1)} kWh
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Inverter</span>
                <span className="font-semibold text-white">
                  {selectedInverter?.ratingKw ?? 0} kW
                </span>
              </div>
              <div className="border-t border-white/10 pt-1.5 mt-1.5 flex justify-between">
                <span className="text-slate-400">Total</span>
                <span className="font-black text-[#F5921E]">
                  £{audit.effectiveSystemCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
          {screen === 'audit' && (
            <AuditScreen
              state={state}
              setState={setState}
              audit={audit}
              panelRec={panelRec}
              batteryRec={batteryRec}
              selectedPanel={selectedPanel}
              selectedBattery={selectedBattery}
              onContinue={() => setScreen('products')}
            />
          )}
          {screen === 'products' && (
            <ProductsScreen
              state={state}
              setState={setState}
              selectedPanel={selectedPanel}
              selectedBattery={selectedBattery}
              selectedInverter={selectedInverter}
              inverterRec={inverterRec}
              batteryRec={batteryRec}
              onBack={() => setScreen('audit')}
              onContinue={() => setScreen('quote')}
            />
          )}
          {screen === 'quote' && (
            <QuoteScreen
              state={state}
              audit={audit}
              selectedPanel={selectedPanel}
              selectedBattery={selectedBattery}
              selectedInverter={selectedInverter}
              panelTotal={panelTotal}
              labourCost={labourCost}
              batteryPrice={batteryPrice}
              inverterPrice={inverterPrice}
              onBack={() => setScreen('products')}
            />
          )}
        </main>
      </div>
    </div>
  )
}

function SidebarLink({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Calculator
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-[#E8192C] text-white shadow-lg shadow-[#E8192C]/30'
          : 'text-slate-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {active && <ChevronRight className="w-4 h-4 opacity-70" />}
    </button>
  )
}

// ============================================
// SCREEN: ENERGY AUDIT
// ============================================

function AuditScreen({
  state,
  setState,
  audit,
  panelRec,
  batteryRec,
  selectedPanel,
  selectedBattery,
  onContinue,
}: {
  state: DemoState
  setState: React.Dispatch<React.SetStateAction<DemoState>>
  audit: ReturnType<typeof computeAudit>
  panelRec: ReturnType<typeof calculateRecommendedPanels>
  batteryRec: ReturnType<typeof getBatteryRecommendation>
  selectedPanel: Panel | undefined
  selectedBattery: BatteryProduct | undefined
  onContinue: () => void
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Step 1 of 3
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
            Energy audit
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Enter the customer&apos;s bill + tariff. SolaFlow runs the maths in real time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5 lg:gap-7 mb-7">
        {/* INPUTS */}
        <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-slate-900 mb-1">Customer inputs</h2>

          <Field label="Monthly electricity bill (£)">
            <input
              type="number"
              value={state.monthlyBill}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  monthlyBill: Math.max(0, Number(e.target.value) || 0),
                }))
              }
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Peak rate (p/kWh)">
              <input
                type="number"
                value={state.unitRatePence}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    unitRatePence: Math.max(0, Number(e.target.value) || 0),
                  }))
                }
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none"
              />
            </Field>
            <Field label="Off-peak rate (p/kWh)">
              <input
                type="number"
                value={state.offPeakRatePence}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    offPeakRatePence: Math.max(0, Number(e.target.value) || 0),
                  }))
                }
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none"
              />
            </Field>
          </div>

          <Field label="SEG export rate (p/kWh)">
            <input
              type="number"
              value={state.exportRatePence}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  exportRatePence: Math.max(0, Number(e.target.value) || 0),
                }))
              }
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-[#E8192C]/20 focus:border-[#E8192C] outline-none"
            />
          </Field>

          <div className="border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={state.batteryOptimised}
                onChange={(e) =>
                  setState((s) => ({ ...s, batteryOptimised: e.target.checked }))
                }
                className="w-5 h-5 accent-[#E8192C]"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Battery-optimised mode
                </p>
                <p className="text-xs text-slate-500">
                  Export 100% of solar at SEG rate + cycle battery on off-peak
                  arbitrage. Off = hybrid (70% self-consume).
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* AUDIT OUTPUTS */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#F5921E]" />
            Live calculation
          </h2>

          <StatRow
            label="Annual spend"
            value={`£${audit.annualSpend.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`}
            sub="Monthly bill × 12"
          />
          <StatRow
            label="Annual usage"
            value={`${audit.annualKwh.toLocaleString()} kWh`}
            sub="Bill ÷ £0.34 (SolaFlow funnel divisor)"
          />
          <StatRow
            label="Daily kWh"
            value={`${audit.dailyKwh.toFixed(1)} kWh`}
            sub="Annual ÷ 365"
          />
          <StatRow
            label="Daily running cost"
            value={`£${audit.dailyCost.toFixed(2)}`}
            sub="Daily kWh × peak rate"
          />

          <div className="bg-white/5 rounded-lg p-3.5 text-sm">
            <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-1.5">
              SolaFlow recommendations
            </p>
            <p className="text-slate-200 leading-relaxed">
              <span className="font-semibold text-white">{panelRec.recommendedPanels}× panels</span>{' '}
              ({panelRec.estimatedSystemKwp.toFixed(2)} kWp) ·{' '}
              <span className="font-semibold text-white">
                {batteryRec.recommendedUsableCapacityKwh} kWh
              </span>{' '}
              battery
            </p>
            <p className="text-xs text-slate-400 mt-1.5">{panelRec.explanation}</p>
          </div>
        </div>
      </div>

      {/* WHAT TO SAY */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 mb-7">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-1">
              Sales rep script
            </p>
            <p className="text-slate-800 text-sm sm:text-base italic leading-relaxed">
              &ldquo;So your bill is £{state.monthlyBill}/month, which works out at about{' '}
              {audit.annualKwh.toLocaleString()} kWh per year, or {audit.dailyKwh.toFixed(1)} kWh
              per day. That&apos;s {' '}
              <span className="font-bold not-italic">£{audit.dailyCost.toFixed(2)} a day</span>{' '}
              to run your house. Now let me show you how solar + battery changes that
              number.&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
        >
          Continue to products
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ============================================
// SCREEN: PRODUCTS
// ============================================

function ProductsScreen({
  state,
  setState,
  selectedPanel,
  selectedBattery,
  selectedInverter,
  inverterRec,
  batteryRec,
  onBack,
  onContinue,
}: {
  state: DemoState
  setState: React.Dispatch<React.SetStateAction<DemoState>>
  selectedPanel: Panel | undefined
  selectedBattery: BatteryProduct | undefined
  selectedInverter: Inverter | undefined
  inverterRec: ReturnType<typeof getInverterRecommendation>
  batteryRec: ReturnType<typeof getBatteryRecommendation>
  onBack: () => void
  onContinue: () => void
}) {
  const [tab, setTab] = useState<'panels' | 'batteries' | 'inverters'>('panels')

  const compatibleInverters = useMemo(() => {
    if (!selectedBattery) return inverters
    return inverters.filter((i) =>
      i.compatibleBrands.includes(selectedBattery.brand),
    )
  }, [selectedBattery])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Step 2 of 3
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
            Products
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Pick the spec. Inverters auto-filter by battery brand for compatibility.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-1 sm:gap-2 mb-5 border-b border-slate-200">
        {(['panels', 'batteries', 'inverters'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 sm:px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors capitalize ${
              tab === t
                ? 'border-[#E8192C] text-[#E8192C]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PANELS */}
      {tab === 'panels' && (
        <div>
          <div className="mb-4">
            <Field label={`Panel quantity: ${state.panelCount}`}>
              <input
                type="range"
                min={4}
                max={20}
                value={state.panelCount}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    panelCount: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#E8192C]"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4 panels</span>
                <span>20 panels</span>
              </div>
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {panels.map((p) => (
              <ProductCard
                key={p.sku}
                selected={state.selectedPanelSku === p.sku}
                onClick={() =>
                  setState((s) => ({ ...s, selectedPanelSku: p.sku }))
                }
                title={p.name}
                brand={p.brand}
                spec={`${p.wattage}W`}
                metaLine={`${p.efficiency} · ${p.warranty}`}
                badge={p.badge}
              />
            ))}
          </div>
        </div>
      )}

      {/* BATTERIES */}
      {tab === 'batteries' && (
        <div>
          <div className="mb-4">
            <Field label={`Battery quantity: ${state.batteryQuantity}`}>
              <input
                type="range"
                min={0}
                max={Math.min(6, selectedBattery?.maxPerStack ?? 6)}
                value={state.batteryQuantity}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    batteryQuantity: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#E8192C]"
              />
              <p className="text-xs text-amber-700 mt-1">
                💡 SolaFlow recommendation: {batteryRec.bandLabel}
              </p>
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {batteries.map((b) => (
              <ProductCard
                key={b.sku}
                selected={state.selectedBatterySku === b.sku}
                onClick={() => {
                  setState((s) => ({ ...s, selectedBatterySku: b.sku }))
                }}
                title={b.name}
                brand={b.brand}
                spec={`${b.capacityKwh} kWh`}
                metaLine={`${b.warranty} · ${b.cycles}`}
                badge={b.badge}
                accent={b.hybrid ? 'integrated' : undefined}
              />
            ))}
          </div>
        </div>
      )}

      {/* INVERTERS */}
      {tab === 'inverters' && (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 mb-4 text-sm text-amber-900">
            <p className="font-semibold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              SolaFlow inverter recommendation: {inverterRec.recommendedPowerKw} kW
            </p>
            <p className="text-xs text-amber-800 mt-1">
              {inverterRec.explanation} · Acceptable range{' '}
              {inverterRec.minAcceptablePowerKw} – {inverterRec.maxAcceptablePowerKw} kW
            </p>
            {selectedBattery && (
              <p className="text-xs text-amber-800 mt-1">
                Showing inverters compatible with {selectedBattery.brand} batteries only.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibleInverters
              .filter((i) => !i.isGateway && i.ratingKw > 0)
              .map((inv) => {
                const inRange =
                  inv.ratingKw >= inverterRec.minAcceptablePowerKw &&
                  inv.ratingKw <= inverterRec.maxAcceptablePowerKw
                return (
                  <ProductCard
                    key={inv.sku}
                    selected={state.selectedInverterSku === inv.sku}
                    onClick={() =>
                      setState((s) => ({ ...s, selectedInverterSku: inv.sku }))
                    }
                    title={inv.name}
                    brand={inv.brand}
                    spec={`${inv.ratingKw} kW`}
                    metaLine={`${inv.phaseType} · ${inv.efficiency}`}
                    badge={inv.badge}
                    accent={
                      inverterRec.recommendedPowerKw > 0
                        ? inRange
                          ? 'in-range'
                          : 'out-of-range'
                        : undefined
                    }
                  />
                )
              })}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-7">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-slate-900 font-semibold text-sm"
        >
          ← Back to audit
        </button>
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
        >
          Generate quote preview
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ============================================
// SCREEN: QUOTE PREVIEW
// ============================================

function QuoteScreen({
  state,
  audit,
  selectedPanel,
  selectedBattery,
  selectedInverter,
  panelTotal,
  labourCost,
  batteryPrice,
  inverterPrice,
  onBack,
}: {
  state: DemoState
  audit: ReturnType<typeof computeAudit>
  selectedPanel: Panel | undefined
  selectedBattery: BatteryProduct | undefined
  selectedInverter: Inverter | undefined
  panelTotal: number
  labourCost: number
  batteryPrice: number
  inverterPrice: number
  onBack: () => void
}) {
  const batteryTotal = batteryPrice * state.batteryQuantity
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Step 3 of 3
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
            Quote preview
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            What the customer would see if you sent this to them. In the real SolaFlow,
            this generates a branded PDF.
          </p>
        </div>
      </div>

      {/* HEADLINE NUMBERS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        <Kpi
          icon={Sun}
          label="System size"
          value={`${audit.systemKwp.toFixed(2)} kWp`}
          sub={`${state.panelCount} × ${selectedPanel?.wattage ?? 0}W`}
        />
        <Kpi
          icon={Battery}
          label="Battery"
          value={`${audit.totalCapacity.toFixed(1)} kWh`}
          sub={`${state.batteryQuantity} × ${selectedBattery?.name ?? '—'}`}
        />
        <Kpi
          icon={Zap}
          label="Inverter"
          value={`${selectedInverter?.ratingKw ?? 0} kW`}
          sub={selectedInverter?.brand ?? '—'}
        />
        <Kpi
          icon={Leaf}
          label="CO₂ saved"
          value={`${(audit.annualCo2SavingsKg / 1000).toFixed(1)} t/yr`}
          sub="Equivalent to ~50 trees"
        />
      </div>

      {/* COST + SAVINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
        <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PoundSterling className="w-4 h-4 text-[#E8192C]" />
            Cost breakdown
          </h2>
          <dl className="space-y-2.5 text-sm">
            <CostRow label={`Panels (${state.panelCount} × ${selectedPanel?.brand ?? '—'} ${selectedPanel?.wattage ?? 0}W)`} value={panelTotal} />
            <CostRow
              label={
                selectedBattery
                  ? `Battery (${state.batteryQuantity} × ${selectedBattery.brand} ${selectedBattery.capacityKwh} kWh)`
                  : 'Battery'
              }
              value={batteryTotal}
            />
            <CostRow
              label={`Inverter (${selectedInverter?.brand ?? '—'} ${selectedInverter?.ratingKw ?? 0} kW)`}
              value={inverterPrice}
            />
            <CostRow
              label={`Labour + scaffolding (${audit.systemKwp.toFixed(2)} kWp × £${(labourCost / Math.max(audit.systemKwp, 1)).toFixed(0)}/kWp)`}
              value={labourCost}
            />
            <div className="border-t border-slate-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-[#E8192C]">
                  £{audit.effectiveSystemCost.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Indicative — real SolaFlow uses tenant-configured pricing tiers
              </p>
            </div>
          </dl>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl ring-1 ring-emerald-200 p-5 sm:p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Customer-facing savings
          </h2>
          <div className="space-y-3 text-sm">
            <SavingsRow label="Annual benefit" value={`£${Math.round(audit.totalAnnualBenefit).toLocaleString()}`} highlight />
            <SavingsRow
              label="Payback period"
              value={
                audit.paybackYears
                  ? `${audit.paybackYears} years`
                  : 'No payback'
              }
            />
            <SavingsRow
              label="15-year total saving"
              value={`£${Math.round(audit.fifteenYearTotal).toLocaleString()}`}
              sub="Compounded at 7%/yr"
            />
            <SavingsRow
              label="25-year total saving"
              value={`£${Math.round(audit.twentyFiveYearTotal).toLocaleString()}`}
              sub="Lifetime"
              highlight
            />
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <p className="text-xs font-semibold uppercase text-emerald-700 mb-2">
              Mode breakdown
            </p>
            <div className="space-y-1.5 text-xs">
              <ModeRow label="Solar only" value={audit.modes.solarOnly.total} />
              <ModeRow label="Hybrid (battery idle)" value={audit.modes.hybrid.total} />
              <ModeRow
                label="Battery optimised (selected)"
                value={audit.modes.batteryOptimised.total}
                active
              />
              <ModeRow label="Battery only" value={audit.modes.batteryOnly.total} />
            </div>
          </div>
        </div>
      </div>

      {/* YEARLY PROJECTIONS */}
      <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-5 sm:p-6 mb-7">
        <h2 className="font-bold text-slate-900 mb-4">Yearly projections</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-slate-500 border-b border-slate-200">
                <th className="py-2 font-semibold">Year</th>
                <th className="py-2 font-semibold text-right">Annual saving</th>
                <th className="py-2 font-semibold text-right">Cumulative</th>
                <th className="py-2 font-semibold text-right">Net (vs cost)</th>
              </tr>
            </thead>
            <tbody>
              {audit.yearlyProjections.map((p) => (
                <tr key={p.year} className="border-b border-slate-100 last:border-0">
                  <td className="py-2.5 font-semibold">Year {p.year}</td>
                  <td className="py-2.5 text-right font-mono">
                    £{Math.round(p.annualSavings).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-right font-mono">
                    £{Math.round(p.cumulativeSavings).toLocaleString()}
                  </td>
                  <td
                    className={`py-2.5 text-right font-mono font-bold ${p.netPosition >= 0 ? 'text-emerald-600' : 'text-slate-500'}`}
                  >
                    {p.netPosition >= 0 ? '+' : ''}
                    £{Math.round(p.netPosition).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1.5">
            In the real SolaFlow
          </p>
          <p className="font-bold leading-tight text-base sm:text-lg">
            This screen generates a branded PDF + emails it to the customer
            automatically.
          </p>
        </div>
        <a
          href="https://etoto-growth-plan.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md whitespace-nowrap"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Get SolaFlow for your business
        </a>
      </div>

      <div className="flex justify-between mt-7">
        <button
          onClick={onBack}
          className="text-slate-600 hover:text-slate-900 font-semibold text-sm"
        >
          ← Back to products
        </button>
      </div>
    </div>
  )
}

// ============================================
// SHARED PRIMITIVES
// ============================================

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function StatRow({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <p className="text-sm text-slate-300">{label}</p>
        {sub && <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>}
      </div>
      <p className="text-lg font-black text-white font-mono">{value}</p>
    </div>
  )
}

function ProductCard({
  selected,
  onClick,
  title,
  brand,
  spec,
  metaLine,
  badge,
  accent,
}: {
  selected: boolean
  onClick: () => void
  title: string
  brand: string
  spec: string
  metaLine: string
  badge?: string
  accent?: 'in-range' | 'out-of-range' | 'integrated'
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white rounded-xl p-4 border-2 transition-all ${
        selected
          ? 'border-[#E8192C] shadow-lg shadow-[#E8192C]/15'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[10px] font-semibold uppercase text-slate-500">{brand}</p>
          <p className="font-bold text-slate-900 text-sm leading-tight">{title}</p>
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-[#E8192C] mb-1">{spec}</p>
      <p className="text-xs text-slate-500">{metaLine}</p>
      {accent === 'in-range' && (
        <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
          <Check className="w-3 h-3" /> In recommended range
        </p>
      )}
      {accent === 'out-of-range' && (
        <p className="text-xs text-amber-600 font-semibold mt-2">
          ⚠ Outside recommended range
        </p>
      )}
      {accent === 'integrated' && (
        <p className="text-xs text-blue-600 font-semibold mt-2">
          ✓ Integrated inverter (no separate hybrid needed)
        </p>
      )}
      {selected && (
        <div className="mt-2 text-xs font-bold text-[#E8192C] flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Selected
        </div>
      )}
    </button>
  )
}

function Kpi({
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
    <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-4">
      <Icon className="w-4 h-4 text-[#E8192C] mb-1.5" />
      <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
        {label}
      </p>
      <p className="text-xl font-black text-slate-900 leading-tight my-1">{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  )
}

function CostRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className="text-slate-700 flex-1">{label}</span>
      <span className="font-mono font-semibold text-slate-900 whitespace-nowrap">
        £{value.toLocaleString()}
      </span>
    </div>
  )
}

function SavingsRow({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <div className="flex-1">
        <span className={`block ${highlight ? 'font-bold text-slate-900' : 'text-slate-700'}`}>{label}</span>
        {sub && <span className="block text-xs text-slate-500">{sub}</span>}
      </div>
      <span
        className={`font-mono font-bold whitespace-nowrap ${highlight ? 'text-emerald-600 text-lg' : 'text-slate-900'}`}
      >
        {value}
      </span>
    </div>
  )
}

function ModeRow({
  label,
  value,
  active,
}: {
  label: string
  value: number
  active?: boolean
}) {
  return (
    <div
      className={`flex justify-between items-baseline gap-3 px-2 py-1 rounded ${active ? 'bg-emerald-100 font-semibold' : ''}`}
    >
      <span className="text-slate-700">{label}</span>
      <span className="font-mono text-slate-900">£{Math.round(value).toLocaleString()}/yr</span>
    </div>
  )
}
