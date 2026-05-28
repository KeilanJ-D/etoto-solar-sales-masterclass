'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Grid3x3,
  Sparkles,
  Sun,
  TrendingDown,
} from 'lucide-react'
import { SOLAFLOW_CONSTANTS } from '@/lib/solaflow-products'

const PANEL_WATTAGE = 470
const OPTIMISER_PRICE_PER_PANEL = 45 // SolaFlow Extras trade price
const AIKO_PREMIUM_PER_PANEL = 15
const SHADE_HOURS_PER_DAY = 3
const SHADE_DAYS_PER_YEAR = 220
const SHADE_DERATE_NO_FIX = 0.35
const SHADE_DERATE_OPTIMISED = 0.85
const UNIT_RATE = SOLAFLOW_CONSTANTS.defaultPeakRatePence / 100

/**
 * Optimiser ROI mini-widget for /knowledge/optimisers. Total panels +
 * shaded panels sliders → ranked 3 options (smart stringing / Tigo-style
 * optimisers / Aiko 510W All-Black swap). Uses SolaFlow yield constants
 * (3.5 PSH × 0.85 SLF) so numbers match the full Optimiser ROI Calculator.
 */
export default function OptimiserWidget() {
  const [totalPanels, setTotalPanels] = useState(14)
  const [shadedPanels, setShadedPanels] = useState(3)

  const result = useMemo(() => {
    const safeShaded = Math.min(shadedPanels, totalPanels)
    const systemKwp = (totalPanels * PANEL_WATTAGE) / 1000

    // £ lost / year if we do nothing — whole string drops to 35% during shade hours
    const fullPowerPerHour = totalPanels * PANEL_WATTAGE
    const lostWhPerShadeHour =
      safeShaded > 0 ? fullPowerPerHour * (1 - SHADE_DERATE_NO_FIX) : 0
    const annualLossDoNothingKwh =
      (lostWhPerShadeHour * SHADE_HOURS_PER_DAY * SHADE_DAYS_PER_YEAR) / 1000
    const annualLossDoNothingGBP = Math.round(annualLossDoNothingKwh * UNIT_RATE)

    // OPTION A: Smart stringing (free)
    const stringingLossGBP = Math.round(
      ((safeShaded * PANEL_WATTAGE * (1 - SHADE_DERATE_OPTIMISED)) *
        SHADE_HOURS_PER_DAY *
        SHADE_DAYS_PER_YEAR) /
        1000 *
        UNIT_RATE,
    )
    const stringingSavingGBP = annualLossDoNothingGBP - stringingLossGBP

    // OPTION B: Optimisers on shaded panels
    const optimiserCost = safeShaded * OPTIMISER_PRICE_PER_PANEL
    const optimiserSavingGBP = annualLossDoNothingGBP - stringingLossGBP // similar net effect
    const optimiserPaybackYrs =
      optimiserSavingGBP > 0 ? optimiserCost / optimiserSavingGBP : Infinity

    // OPTION C: Aiko 510W All-Black across the array (~£15 premium per panel)
    const aikoCost = totalPanels * AIKO_PREMIUM_PER_PANEL
    const aikoLossGBP = Math.round(stringingLossGBP * 1.2)
    const aikoSavingGBP = annualLossDoNothingGBP - aikoLossGBP
    const aikoPaybackYrs = aikoSavingGBP > 0 ? aikoCost / aikoSavingGBP : Infinity

    // Pick the recommended option.
    // KEY PHYSICS: inverters need ≥4 panels per string to start (~90V MPPT
    // minimum). So 1-3 shaded panels can't go "on their own string" — the
    // string wouldn't wake up. Optimisers are the default for any shading;
    // Aiko swap competes at heavy-shade scale.
    let recommendation: 'none' | 'stringing' | 'optimisers' | 'aiko' = 'none'
    if (safeShaded === 0) recommendation = 'none'
    else if (safeShaded >= 6 && totalPanels >= 10) recommendation = 'aiko'
    else recommendation = 'optimisers'

    return {
      safeShaded,
      systemKwp,
      annualLossDoNothingGBP,
      stringingSavingGBP,
      optimiserCost,
      optimiserSavingGBP,
      optimiserPaybackYrs,
      aikoCost,
      aikoSavingGBP,
      aikoPaybackYrs,
      recommendation,
    }
  }, [totalPanels, shadedPanels])

  return (
    <div className="my-8 sm:my-10 bg-white border-2 border-[#E8192C]/20 rounded-2xl overflow-hidden shadow-lg">
      <header className="bg-gradient-to-br from-slate-900 to-slate-800 text-white px-5 sm:px-7 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Grid3x3 className="w-4 h-4 text-[#F5921E]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#F5921E]">
            Interactive · powered by SolaFlow
          </p>
        </div>
        <h3 className="font-black text-lg sm:text-xl mb-1">Optimiser ROI — quick check</h3>
        <p className="text-sm text-slate-300">
          How many panels? How many in shade? I&apos;ll rank the three options by £
          and tell you which one wins.
        </p>
      </header>

      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              <Sun className="inline w-3.5 h-3.5 mr-1 text-amber-500" />
              Total panels: <span className="text-[#E8192C]">{totalPanels}</span>
            </label>
            <input
              type="range"
              min={4}
              max={20}
              value={totalPanels}
              onChange={(e) => {
                const v = Number(e.target.value)
                setTotalPanels(v)
                if (shadedPanels > v) setShadedPanels(v)
              }}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4 panels</span>
              <span>20 panels</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {result.systemKwp.toFixed(2)} kWp system at {PANEL_WATTAGE}W per panel
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700 mb-1.5">
              Panels in shade (3h/day, 220 days/year):{' '}
              <span className="text-[#E8192C]">{result.safeShaded}</span>
            </label>
            <input
              type="range"
              min={0}
              max={totalPanels}
              value={shadedPanels}
              onChange={(e) => setShadedPanels(Number(e.target.value))}
              className="w-full accent-[#E8192C]"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>None</span>
              <span>{totalPanels} (all shaded)</span>
            </div>
          </div>
        </div>

        {/* COST OF DOING NOTHING */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-red-700 font-bold mb-1">
                If you do nothing
              </p>
              {result.safeShaded > 0 ? (
                <>
                  <p className="text-3xl font-black text-red-700 mb-1">
                    £{result.annualLossDoNothingGBP.toLocaleString('en-GB')}/yr lost
                  </p>
                  <p className="text-xs text-red-900">
                    £{(result.annualLossDoNothingGBP * 25).toLocaleString('en-GB')}
                    {' '}over the system&apos;s 25-year life
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-black text-emerald-700 mb-1">
                    Clean roof, no fix needed
                  </p>
                  <p className="text-xs text-emerald-800">
                    No optimisers, no premium panels. Don&apos;t upsell what isn&apos;t
                    needed.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* THREE OPTIONS */}
      {result.safeShaded > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#E8192C]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8192C]">
              Your three options
            </p>
          </div>

          <div className="space-y-3">
            {/* Option 1 — Optimisers (default for any shading) */}
            <OptionCard
              title={`Optimisers on ${result.safeShaded} panel${result.safeShaded === 1 ? '' : 's'}`}
              subtitle="£45 trade each — the surgical fix"
              cost={`£${result.optimiserCost}`}
              annualSaving={result.optimiserSavingGBP}
              payback={
                isFinite(result.optimiserPaybackYrs)
                  ? `${result.optimiserPaybackYrs.toFixed(1)} yrs`
                  : '∞'
              }
              rationale="Works for any shade pattern — clustered or scattered, 1 panel or many. Each shaded panel becomes voltage-independent so the rest of the string keeps producing."
              recommended={result.recommendation === 'optimisers'}
            />
            {/* Option 2 — Aiko swap */}
            <OptionCard
              title="Aiko 510W All-Black across the array"
              subtitle={`£15 premium × ${totalPanels} = £${result.aikoCost}`}
              cost={`£${result.aikoCost}`}
              annualSaving={result.aikoSavingGBP}
              payback={
                isFinite(result.aikoPaybackYrs)
                  ? `${result.aikoPaybackYrs.toFixed(1)} yrs`
                  : '∞'
              }
              rationale={
                result.safeShaded > 6
                  ? 'ABC cell-level bypass on every panel. Cheaper than optimisers at this scale AND future-proofs against new shading.'
                  : 'Future-proofs the whole array against shading changes. Compare £ vs optimisers if customer plans to stay 10+ years.'
              }
              recommended={result.recommendation === 'aiko'}
            />
            {/* Option 3 — MPPT split (conditional, honest about its limits) */}
            <OptionCard
              title="MPPT split / string separation"
              subtitle="£0 if a spare MPPT is available"
              cost="£0"
              annualSaving={result.stringingSavingGBP}
              payback="Instant"
              rationale={
                result.safeShaded < 4
                  ? `Not viable — inverters need ≥4 panels per string (~90V MPPT minimum). With ${result.safeShaded} shaded, you can't form a separate string. This option is for splitting roof orientations, not for shading a few panels.`
                  : `Viable IF your ${result.safeShaded} shaded panels are a contiguous block on a separate roof face. Otherwise stick with optimisers.`
              }
              recommended={false}
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-sm text-slate-700">
              Want the visual roof grid + per-panel customer-facing maths?
            </p>
            <Link
              href="/tools/optimiser-roi"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-full transition-all text-sm whitespace-nowrap"
            >
              Open the full Optimiser Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function OptionCard({
  title,
  subtitle,
  cost,
  annualSaving,
  payback,
  rationale,
  recommended,
}: {
  title: string
  subtitle: string
  cost: string
  annualSaving: number
  payback: string
  rationale: string
  recommended: boolean
}) {
  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        recommended
          ? 'border-emerald-300 bg-emerald-50/30'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">{title}</h4>
            {recommended && (
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <CheckCircle2 className="w-3 h-3" />
                Recommended
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase">Cost</p>
          <p className="font-bold text-slate-900 text-base">{cost}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-slate-100">
        <div>
          <p className="text-slate-500">Annual saving</p>
          <p className="font-bold text-emerald-600">
            £{Math.max(0, annualSaving)}/yr
          </p>
        </div>
        <div>
          <p className="text-slate-500">Payback</p>
          <p className="font-bold text-slate-900">{payback}</p>
        </div>
      </div>
      <p className="text-xs text-slate-600 mt-3 leading-relaxed">{rationale}</p>
    </div>
  )
}
