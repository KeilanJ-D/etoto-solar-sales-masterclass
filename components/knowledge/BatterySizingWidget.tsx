'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Battery,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react'
import { batteries } from '@/lib/solaflow-products'
import { getBatteryRecommendation } from '@/lib/solaflow/recommendation-engine'

type Tariff = 'go' | 'cosy' | 'flat'
const TARIFF_WINDOWS: Record<Tariff, { hours: number; label: string }> = {
  go: { hours: 4, label: 'Octopus Go (4h off-peak)' },
  cosy: { hours: 6, label: 'Octopus Cosy (6h off-peak)' },
  flat: { hours: 0, label: 'Flat rate (no off-peak window)' },
}

/**
 * Battery sizing mini-widget for /knowledge/battery-and-inverter.
 * Takes annual usage + tariff, recommends a battery + inverter
 * throughput. Identifies matching SolaFlow products. Critically:
 * checks whether the recommended battery can ACTUALLY fill in the
 * off-peak window — the trap most installers miss.
 */
export default function BatterySizingWidget() {
  const [annualKwh, setAnnualKwh] = useState(5500)
  const [tariff, setTariff] = useState<Tariff>('cosy')

  const rec = useMemo(() => getBatteryRecommendation(annualKwh), [annualKwh])
  const offPeakHours = TARIFF_WINDOWS[tariff].hours

  // Minimum inverter throughput to fill the battery in the off-peak window
  const requiredThroughputKw = useMemo(() => {
    if (offPeakHours <= 0) return 0
    return Math.ceil(((rec.recommendedUsableCapacityKwh / offPeakHours) * 1.1) * 10) / 10
  }, [rec.recommendedUsableCapacityKwh, offPeakHours])

  // Match SolaFlow batteries against the recommendation band
  const matchingBatteries = useMemo(() => {
    return batteries.filter(
      (b) =>
        b.capacityKwh >= rec.minUsableCapacityKwh &&
        b.capacityKwh <= rec.maxUsableCapacityKwh,
    )
  }, [rec])

  return (
    <div className="my-8 sm:my-10 bg-white border-2 border-[#E8192C]/20 rounded-2xl overflow-hidden shadow-lg">
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-5 sm:px-7 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Battery className="w-4 h-4 text-[#F5921E]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5921E]">
            Interactive · powered by SolaFlow
          </p>
        </div>
        <h3 className="font-black text-lg sm:text-xl mb-1">Battery sizing</h3>
        <p className="text-sm text-slate-300">
          Enter the customer&apos;s annual usage + tariff. SolaFlow tells you the
          battery size, the throughput your inverter needs, and which products fit.
        </p>
      </header>

      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              Annual usage:{' '}
              <span className="text-[#E8192C]">
                {annualKwh.toLocaleString()} kWh
              </span>
            </label>
            <input
              type="range"
              min={2000}
              max={15000}
              step={250}
              value={annualKwh}
              onChange={(e) => setAnnualKwh(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>2,000 kWh</span>
              <span>15,000 kWh</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              Customer&apos;s tariff
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['go', 'cosy', 'flat'] as Tariff[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTariff(t)}
                  className={`px-3 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                    tariff === t
                      ? 'bg-[#E8192C] border-[#E8192C] text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#E8192C]/40'
                  }`}
                >
                  {TARIFF_WINDOWS[t].label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-bold">SolaFlow rule:</span> battery sized for 1 full
              day of usage. The trap installers miss: making sure the inverter can
              actually <em>fill</em> the battery in the off-peak window.
            </p>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            SolaFlow recommendation
          </p>

          <RecRow
            icon={Battery}
            label="Battery size"
            value={`${rec.recommendedUsableCapacityKwh} kWh`}
            sub={`${rec.dailyKwh.toFixed(1)} kWh/day · band ${rec.minUsableCapacityKwh}–${rec.maxUsableCapacityKwh} kWh`}
            highlight
          />

          {offPeakHours > 0 ? (
            <>
              <RecRow
                icon={Clock}
                label="Off-peak window"
                value={`${offPeakHours} hours`}
                sub={TARIFF_WINDOWS[tariff].label}
              />
              <RecRow
                icon={Zap}
                label="Min inverter throughput"
                value={`${requiredThroughputKw} kW`}
                sub={`${rec.recommendedUsableCapacityKwh} kWh ÷ ${offPeakHours}h × 1.1 safety`}
                highlight
                warning={requiredThroughputKw > 5}
              />
            </>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
              <AlertTriangle className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
              Flat-rate tariff means no off-peak charging window. ROI on the battery
              halves. Strongly recommend switching to Octopus Go/Cosy.
            </div>
          )}
        </div>
      </div>

      {/* MATCHING BATTERIES */}
      {matchingBatteries.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E8192C]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8192C]">
              SolaFlow products that match this spec
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {matchingBatteries.slice(0, 6).map((b) => (
              <Link
                key={b.sku}
                href={`/products/${b.brand.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-lg ring-1 ring-slate-200 hover:ring-[#E8192C]/30 p-3 transition-all"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-500">
                      {b.brand}
                    </p>
                    <p className="font-bold text-slate-900 text-sm leading-tight">
                      {b.name}
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                </div>
                <p className="text-xl font-black text-[#E8192C] mb-1">
                  {b.capacityKwh} <span className="text-xs">kWh</span>
                </p>
                <p className="text-[10px] text-slate-500">
                  {b.hybrid ? '✓ Integrated inverter' : `Stackable to ${b.maxPerStack ?? 1}`}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/formula-cheat-sheet"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-full transition-all text-sm"
            >
              Run the maths in the Formula Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function RecRow({
  icon: Icon,
  label,
  value,
  sub,
  highlight,
  warning,
}: {
  icon: typeof Battery
  label: string
  value: string
  sub: string
  highlight?: boolean
  warning?: boolean
}) {
  return (
    <div
      className={`rounded-lg p-3 ${
        warning
          ? 'bg-amber-100 border border-amber-300'
          : highlight
            ? 'bg-white border border-slate-200 shadow-sm'
            : 'bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${warning ? 'text-amber-700' : 'text-[#E8192C]'}`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs text-slate-700 font-semibold">{label}</p>
            <p
              className={`font-mono font-bold whitespace-nowrap ${highlight ? 'text-base text-slate-900' : 'text-sm text-slate-700'}`}
            >
              {value}
            </p>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{sub}</p>
        </div>
      </div>
    </div>
  )
}
