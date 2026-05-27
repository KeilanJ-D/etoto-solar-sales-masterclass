'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Battery,
  CheckCircle2,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react'
import { inverters } from '@/lib/solaflow-products'
import { getInverterRecommendation } from '@/lib/solaflow/recommendation-engine'

type Phase = 'single' | 'three'

const G98_SINGLE_LIMIT = 3.68
const G98_THREE_LIMIT = 11.04

/**
 * Inverter sizing mini-widget for /knowledge/inverter-sizing.
 * Slimmer free version of the full /tools/inverter-sizing tool.
 * Uses SolaFlow's getInverterRecommendation directly so numbers
 * match dashboard + funnel exactly.
 */
export default function InverterSizingWidget() {
  const [pvKwp, setPvKwp] = useState(6)
  const [batteryKwh, setBatteryKwh] = useState(10)
  const [phase, setPhase] = useState<Phase>('single')

  const sfRec = useMemo(
    () => getInverterRecommendation(pvKwp, batteryKwh, batteryKwh > 0 ? 1 : 0),
    [pvKwp, batteryKwh],
  )

  // DNO check
  const exceedsG98 =
    phase === 'single'
      ? sfRec.recommendedPowerKw > G98_SINGLE_LIMIT
      : sfRec.recommendedPowerKw > G98_THREE_LIMIT

  // Top 3 matching SolaFlow inverters (filter by phase + in-band)
  const matchingInverters = useMemo(() => {
    if (sfRec.recommendedPowerKw <= 0) return []
    return inverters
      .filter(
        (i) =>
          !i.isGateway &&
          i.ratingKw > 0 &&
          (phase === 'single'
            ? i.phaseType === 'Single Phase'
            : i.phaseType === 'Three Phase' || i.phaseType === 'Single Phase') &&
          i.ratingKw >= sfRec.minAcceptablePowerKw &&
          i.ratingKw <= sfRec.maxAcceptablePowerKw,
      )
      .slice(0, 3)
  }, [sfRec, phase])

  return (
    <div className="my-8 sm:my-10 bg-white border-2 border-[#E8192C]/20 rounded-2xl overflow-hidden shadow-lg">
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-5 sm:px-7 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-[#F5921E]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5921E]">
            Interactive · powered by SolaFlow
          </p>
        </div>
        <h3 className="font-black text-lg sm:text-xl mb-1">Inverter sizing — quick check</h3>
        <p className="text-sm text-slate-300">
          Tell me your PV + battery + phase. I&apos;ll tell you the inverter SolaFlow
          would recommend, the DNO classification, and 3 real products that match.
        </p>
      </header>

      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              <Sun className="inline w-3.5 h-3.5 mr-1 text-amber-500" />
              PV system size: <span className="text-[#E8192C]">{pvKwp} kWp</span>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={pvKwp}
              onChange={(e) => setPvKwp(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0 (battery-only)</span>
              <span>20 kWp</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              <Battery className="inline w-3.5 h-3.5 mr-1 text-emerald-500" />
              Battery (usable):{' '}
              <span className="text-[#E8192C]">{batteryKwh} kWh</span>
            </label>
            <input
              type="range"
              min={0}
              max={40}
              step={2.5}
              value={batteryKwh}
              onChange={(e) => setBatteryKwh(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>None</span>
              <span>40 kWh</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              Property supply
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['single', 'three'] as Phase[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPhase(p)}
                  className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all min-h-[44px] ${
                    phase === p
                      ? 'bg-[#E8192C] border-[#E8192C] text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-[#E8192C]/40'
                  }`}
                >
                  {p === 'single' ? 'Single-phase' : 'Three-phase'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* OUTPUTS */}
        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            SolaFlow recommendation
          </p>

          {sfRec.recommendedPowerKw > 0 ? (
            <>
              {/* Headline number */}
              <div className="bg-white rounded-lg p-4 border-2 border-[#E8192C]/30 shadow-sm text-center">
                <p className="text-[10px] uppercase text-slate-500 font-semibold tracking-wide mb-1">
                  Recommended inverter size
                </p>
                <p className="text-4xl font-black text-[#E8192C] mb-1">
                  {sfRec.recommendedPowerKw} kW
                </p>
                <p className="text-xs text-slate-500">
                  Acceptable range: {sfRec.minAcceptablePowerKw} – {sfRec.maxAcceptablePowerKw} kW
                </p>
                <p className="text-xs text-slate-600 mt-2 italic">{sfRec.explanation}</p>
              </div>

              {/* DNO chip */}
              <div
                className={`rounded-lg p-3 flex items-start gap-2 ${
                  exceedsG98
                    ? 'bg-amber-100 border border-amber-300'
                    : 'bg-emerald-100 border border-emerald-300'
                }`}
              >
                {exceedsG98 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                )}
                <div className="text-xs">
                  <p
                    className={`font-bold ${exceedsG98 ? 'text-amber-900' : 'text-emerald-900'}`}
                  >
                    {exceedsG98 ? 'G99 required' : 'G98 — notify only'}
                  </p>
                  <p
                    className={`mt-0.5 ${exceedsG98 ? 'text-amber-800' : 'text-emerald-800'}`}
                  >
                    {exceedsG98
                      ? `${sfRec.recommendedPowerKw} kW > ${phase === 'single' ? G98_SINGLE_LIMIT : G98_THREE_LIMIT} kW. Apply 4 – 6 weeks before install.`
                      : `${sfRec.recommendedPowerKw} kW within G98 limits. Notify within 28 days of commissioning.`}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-sm text-slate-500">
              Add PV or battery to see the recommendation.
            </div>
          )}
        </div>
      </div>

      {/* MATCHING INVERTERS */}
      {matchingInverters.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E8192C]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8192C]">
              SolaFlow products in this range
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {matchingInverters.map((inv) => (
              <Link
                key={inv.sku}
                href={`/products/${inv.brand.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-lg ring-1 ring-slate-200 hover:ring-[#E8192C]/30 p-3 transition-all"
              >
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-slate-500">
                      {inv.brand}
                    </p>
                    <p className="font-bold text-slate-900 text-sm leading-tight">
                      {inv.name}
                    </p>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                </div>
                <p className="text-xl font-black text-[#E8192C] mb-1">
                  {inv.ratingKw} <span className="text-xs">kW</span>
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {inv.phaseType} · {inv.efficiency}
                </p>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700">
              Need DNO depth, EV/heat-pump loads, charge-time analysis?
            </p>
            <Link
              href="/tools/inverter-sizing"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-full transition-all text-sm whitespace-nowrap"
            >
              Open the full Inverter Sizing Tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
