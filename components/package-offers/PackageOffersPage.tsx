'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, BadgePercent, Battery, Calculator, ChevronRight, Home,
  PoundSterling, Sigma, Sparkles, Sun, TrendingUp, Users, Zap,
} from 'lucide-react'
import { packageOffers, type PackageOffer } from '@/lib/package-offers/packages'
import { SOLAFLOW_CONSTANTS } from '@/lib/solaflow-products'

// Live formula constants (mirror SolaFlow funnel)
const PSH = SOLAFLOW_CONSTANTS.peakSunHours // 3.5
const SLF = SOLAFLOW_CONSTANTS.systemLossFactor // 0.85
const PEAK_P = SOLAFLOW_CONSTANTS.defaultPeakRatePence // 28
const OFFPEAK_P = SOLAFLOW_CONSTANTS.defaultOffPeakRatePence // 7
const EXPORT_P = SOLAFLOW_CONSTANTS.defaultExportRatePence // 12
const DAYS_PER_YEAR = 365

interface FormulaBreakdown {
  systemKwp: number
  dailyGenerationKwh: number
  annualGenerationKwh: number
  annualBatterySaving: number
  annualExportIncome: number
  totalAnnualBenefit: number
}

function computeBreakdown(pkg: PackageOffer): FormulaBreakdown | null {
  if (pkg.panelCount === null && pkg.batteryKwhUsable === null) return null

  const panelCount = pkg.panelCount ?? 0
  const battery = pkg.batteryKwhUsable ?? 0
  const systemKwp = (panelCount * pkg.assumedPanelWattage) / 1000
  const dailyGenerationKwh = systemKwp * PSH * SLF
  const annualGenerationKwh = dailyGenerationKwh * DAYS_PER_YEAR

  // Battery-optimised mode (SolaFlow default): all solar exports, battery
  // cycles from cheap grid → peak savings
  const arbitragePerKwh = (PEAK_P - OFFPEAK_P) / 100
  const annualBatterySaving = battery * arbitragePerKwh * DAYS_PER_YEAR
  const annualExportIncome = annualGenerationKwh * (EXPORT_P / 100)
  const totalAnnualBenefit = Math.round(annualBatterySaving + annualExportIncome)

  return {
    systemKwp,
    dailyGenerationKwh,
    annualGenerationKwh,
    annualBatterySaving: Math.round(annualBatterySaving),
    annualExportIncome: Math.round(annualExportIncome),
    totalAnnualBenefit,
  }
}

export default function PackageOffersPage() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] rounded-full text-xs sm:text-sm font-semibold mb-5 border border-[#E8192C]/30">
            <BadgePercent className="w-3.5 h-3.5" />
            Real ETOTO-client ad creatives
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight text-balance">
            Package offers on the market.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            These are real package ads ETOTO clients run on Facebook and Google. For each one we&apos;ve
            broken down the system + the savings using the same SolaFlow formula you use on calls.
            <strong className="text-white"> Use these as anchors when matching a customer to the right system.</strong>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill icon={Sigma}>Formula-driven</Pill>
            <Pill icon={Sun}>{PSH} PSH × {SLF} SLF</Pill>
            <Pill icon={Zap}>{PEAK_P}p peak / {OFFPEAK_P}p off-peak</Pill>
            <Pill icon={TrendingUp}>{EXPORT_P}p SEG export</Pill>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="bg-amber-50 border-y border-amber-200 px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm text-amber-900 leading-relaxed">
            <strong>How to use this page:</strong> Ask the customer their monthly bill on the call.
            Find the package closest to their <code className="bg-amber-100 px-1.5 py-0.5 rounded">bill range</code>{' '}
            or <code className="bg-amber-100 px-1.5 py-0.5 rounded">daily kWh</code>. The formula below
            each ad is the savings story you walk them through. Then upsell or downsell as their
            answers reveal more (EV plans, heat pump, multi-orientation roof, etc).
          </div>
        </div>
      </section>

      {/* PACKAGE GRID */}
      <section className="bg-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          {packageOffers.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 py-14 sm:py-18">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#E8192C] mb-3">
            Want to spec something off-list?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Run any combination through the Formula Calculator.
          </h2>
          <p className="text-base text-slate-300 mb-6 max-w-2xl mx-auto">
            Same constants, same SolaFlow alignment, fully customisable. Match the customer&apos;s
            exact bill, pick the panel + battery + tariff, see the maths.
          </p>
          <Link
            href="/formula-cheat-sheet"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold rounded-xl shadow-lg transition-all min-h-[52px]"
          >
            Open the Formula Calculator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

// ============================================
// PACKAGE CARD
// ============================================

function PackageCard({ pkg }: { pkg: PackageOffer }) {
  const breakdown = computeBreakdown(pkg)

  return (
    <article className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      {/* Ad image */}
      <div className="relative aspect-square lg:aspect-auto bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex items-center justify-center p-4 sm:p-6">
        <Image
          src={pkg.imagePath}
          alt={`${pkg.brand} ad — ${pkg.title}`}
          width={420}
          height={420}
          className="object-contain max-h-[420px] max-w-full"
        />
        {pkg.financeHook && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white px-2 py-1 rounded-full shadow">
            <BadgePercent className="w-3 h-3" />
            {pkg.financeHook}
          </span>
        )}
      </div>

      {/* Spec + Formula */}
      <div className="p-5 sm:p-6 lg:p-7 flex flex-col">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-0.5">
              {pkg.brand} · {pkg.shape === 'all-in-one' ? 'All-in-one' : 'Modular'}
            </p>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Spec strip */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <SpecChip
            icon={Sun}
            label="Panels"
            value={pkg.panelCount ? `${pkg.panelCount}× ${pkg.assumedPanelWattage}W` : 'Varies'}
          />
          <SpecChip
            icon={Battery}
            label="Battery"
            value={pkg.batteryKwhUsable ? `${pkg.batteryKwhUsable} kWh usable` : 'Varies'}
          />
          <SpecChip
            icon={Zap}
            label="Inverter"
            value={pkg.shape === 'all-in-one' ? 'Built in' : 'Sized to spec'}
          />
        </div>

        {/* One-line angle */}
        <p className="text-sm text-slate-700 leading-relaxed mb-4 flex-1">{pkg.oneLineAngle}</p>

        {/* Formula breakdown */}
        {breakdown ? (
          <div className="bg-slate-900 rounded-xl p-4 text-white mb-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 mb-3 flex items-center gap-1.5">
              <Sigma className="w-3 h-3" />
              The formula on this system
            </p>
            <dl className="space-y-1.5 text-xs sm:text-sm">
              {breakdown.systemKwp > 0 && (
                <>
                  <FormulaRow
                    label="System size"
                    value={`${breakdown.systemKwp.toFixed(2)} kWp`}
                  />
                  <FormulaRow
                    label="Daily generation"
                    value={`${breakdown.dailyGenerationKwh.toFixed(1)} kWh/day`}
                  />
                  <FormulaRow
                    label="Annual generation"
                    value={`${breakdown.annualGenerationKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh/yr`}
                  />
                </>
              )}
              <div className={`${breakdown.systemKwp > 0 ? 'border-t border-white/10 mt-2 pt-2' : ''} space-y-1.5`}>
                {breakdown.annualBatterySaving > 0 && (
                  <FormulaRow
                    label={`Battery savings (${PEAK_P}p − ${OFFPEAK_P}p × 365)`}
                    value={`£${breakdown.annualBatterySaving.toLocaleString()}/yr`}
                    accent="emerald"
                  />
                )}
                {breakdown.annualExportIncome > 0 && (
                  <FormulaRow
                    label={`Solar export (×${EXPORT_P}p SEG)`}
                    value={`£${breakdown.annualExportIncome.toLocaleString()}/yr`}
                    accent="amber"
                  />
                )}
              </div>
              <div className="border-t border-emerald-400/40 pt-2 mt-2 flex justify-between items-baseline">
                <dt className="text-sm font-bold text-white">Total annual benefit</dt>
                <dd className="text-2xl font-black text-emerald-400">
                  £{breakdown.totalAnnualBenefit.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 text-xs text-slate-600 italic">
            Spec varies in this ad — pull the customer&apos;s exact usage on the call, then run the
            numbers in the{' '}
            <Link href="/formula-cheat-sheet" className="text-[#E8192C] font-semibold underline">
              Formula Calculator
            </Link>
            .
          </div>
        )}

        {/* Fit row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <FitChip icon={PoundSterling} label="Fits" value={pkg.fitsBillRange} />
          <FitChip icon={Home} label="Daily kWh" value={pkg.fitsDailyKwhRange} />
        </div>

        {/* Marketing note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-amber-800 mb-0.5">
              Why this ad works (rep insight)
            </p>
            <p className="text-xs text-amber-900 leading-relaxed">{pkg.marketingNote}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function SpecChip({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
      <div className="flex items-center gap-1 mb-0.5">
        <Icon className="w-3 h-3 text-slate-500" />
        <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500">{label}</p>
      </div>
      <p className="text-xs font-bold text-slate-900 leading-tight">{value}</p>
    </div>
  )
}

function FitChip({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="bg-[#E8192C]/5 border border-[#E8192C]/20 rounded-lg p-2.5">
      <div className="flex items-center gap-1 mb-0.5">
        <Icon className="w-3 h-3 text-[#E8192C]" />
        <p className="text-[9px] uppercase tracking-wider font-bold text-[#E8192C]">{label}</p>
      </div>
      <p className="text-xs font-bold text-slate-900 leading-tight">{value}</p>
    </div>
  )
}

function FormulaRow({
  label, value, accent,
}: {
  label: string
  value: string
  accent?: 'emerald' | 'amber'
}) {
  const accentClass =
    accent === 'emerald' ? 'text-emerald-400' : accent === 'amber' ? 'text-amber-400' : 'text-white'
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-slate-400">{label}</dt>
      <dd className={`font-bold ${accentClass} text-right whitespace-nowrap`}>{value}</dd>
    </div>
  )
}

function Pill({ icon: Icon, children }: { icon: typeof Sun; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 backdrop-blur text-white text-xs rounded-full border border-white/20">
      <Icon className="w-3 h-3" />
      {children}
    </span>
  )
}
