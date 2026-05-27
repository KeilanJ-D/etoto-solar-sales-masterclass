'use client'

import { useState, useMemo } from 'react'
import { CheckCircle2, Grid3x3, Lightbulb, RotateCw, Sun, TrendingUp } from 'lucide-react'
import { SOLAFLOW_CONSTANTS } from '@/lib/solaflow-products'

type PanelState = 'clean' | 'shaded'

// Aligned with SolaFlow: 3.5 PSH × 0.85 SLF × 365 = 1086 kWh/kWp/year
const ANNUAL_KWH_PER_KWP =
  SOLAFLOW_CONSTANTS.peakSunHours *
  SOLAFLOW_CONSTANTS.systemLossFactor *
  365
const UNIT_RATE_GBP = SOLAFLOW_CONSTANTS.defaultPeakRatePence / 100
const SHADE_DERATE_NO_FIX = 0.35 // shaded panel drags string to 35% during shade hours
const SHADE_DERATE_OPTIMISED = 0.85 // optimised shaded panel only loses its own contribution
const SHADE_HOURS_PER_DAY = 3 // typical UK chimney/tree shade duration
const SHADE_DAYS_PER_YEAR = 220 // when sun is at angle to cast shade

const OPTIMISER_PRICE_PER_PANEL = 45 // Tigo trade
const AIKO_PREMIUM_PER_PANEL = 15

export default function OptimiserCalculator() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(5)
  const [panelWattage, setPanelWattage] = useState(415)
  const [panels, setPanels] = useState<PanelState[]>(() =>
    Array(15).fill('clean' as PanelState)
  )

  const togglePanel = (idx: number) => {
    setPanels((prev) => {
      const next = [...prev]
      next[idx] = next[idx] === 'clean' ? 'shaded' : 'clean'
      return next
    })
  }

  const resetGrid = (newRows: number, newCols: number) => {
    setRows(newRows)
    setCols(newCols)
    setPanels(Array(newRows * newCols).fill('clean' as PanelState))
  }

  const clearShade = () => {
    setPanels(panels.map(() => 'clean' as PanelState))
  }

  const result = useMemo(() => {
    const totalPanels = panels.length
    const shadedPanels = panels.filter((p) => p === 'shaded').length
    const systemKwp = (totalPanels * panelWattage) / 1000

    // Annual loss if we do nothing
    const cleanPanelsContribution = totalPanels - shadedPanels
    const stringDailyLoss =
      shadedPanels > 0
        ? // whole-string drag during shade hours
          totalPanels *
            (panelWattage / 1000) *
            SHADE_HOURS_PER_DAY *
            (1 - SHADE_DERATE_NO_FIX)
        : 0
    const annualLossDoNothingKwh = (stringDailyLoss * SHADE_DAYS_PER_YEAR) / totalPanels * cleanPanelsContribution / Math.max(cleanPanelsContribution, 1) * SHADE_DAYS_PER_YEAR / SHADE_DAYS_PER_YEAR

    // Simpler model: shaded panels drag entire system during shade hours
    const fullProductionWhPerShadeHour = totalPanels * panelWattage
    const draggedWhPerShadeHour = fullProductionWhPerShadeHour * SHADE_DERATE_NO_FIX
    const lostWhPerShadeHour = fullProductionWhPerShadeHour - draggedWhPerShadeHour
    const annualLossDoNothingKwhV2 =
      shadedPanels > 0
        ? (lostWhPerShadeHour * SHADE_HOURS_PER_DAY * SHADE_DAYS_PER_YEAR) / 1000
        : 0
    const annualLossDoNothingGBP = annualLossDoNothingKwhV2 * UNIT_RATE_GBP

    // Optimised: only shaded panels lose their own contribution
    const lostWithOptimisersPerHour =
      shadedPanels * panelWattage * (1 - SHADE_DERATE_OPTIMISED)
    const annualLossOptimisedKwh =
      (lostWithOptimisersPerHour * SHADE_HOURS_PER_DAY * SHADE_DAYS_PER_YEAR) / 1000
    const annualLossOptimisedGBP = annualLossOptimisedKwh * UNIT_RATE_GBP
    const optimiserCost = shadedPanels * OPTIMISER_PRICE_PER_PANEL
    const optimiserNetAnnualSaving = annualLossDoNothingGBP - annualLossOptimisedGBP
    const optimiserPaybackYears =
      optimiserNetAnnualSaving > 0 ? optimiserCost / optimiserNetAnnualSaving : Infinity

    // Smart stringing: put shaded panels on own MPPT - assume free, only shaded panels lose their own contribution
    const stringingSavingGBP = annualLossDoNothingGBP - annualLossOptimisedGBP

    // Aiko swap: all panels get cell-level bypass premium
    const aikoCost = totalPanels * AIKO_PREMIUM_PER_PANEL
    const aikoLossGBP = annualLossOptimisedGBP * 1.2 // slightly less effective than optimisers but still very good
    const aikoNetAnnualSaving = annualLossDoNothingGBP - aikoLossGBP
    const aikoPaybackYears =
      aikoNetAnnualSaving > 0 ? aikoCost / aikoNetAnnualSaving : Infinity

    // Best option pick
    let recommendation:
      | 'none'
      | 'stringing'
      | 'optimisers'
      | 'aiko' = 'none'

    if (shadedPanels === 0) recommendation = 'none'
    else if (shadedPanels <= 3 && totalPanels >= 8)
      recommendation = 'stringing' // smart stringing is free
    else if (shadedPanels <= 6) recommendation = 'optimisers'
    else recommendation = 'aiko'

    return {
      totalPanels,
      shadedPanels,
      systemKwp,
      annualLossDoNothingKwh: annualLossDoNothingKwhV2,
      annualLossDoNothingGBP,
      annualLossOptimisedKwh,
      annualLossOptimisedGBP,
      optimiserCost,
      optimiserNetAnnualSaving,
      optimiserPaybackYears,
      stringingSavingGBP,
      aikoCost,
      aikoNetAnnualSaving,
      aikoPaybackYears,
      recommendation,
    }
  }, [panels, panelWattage])

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-900 text-white px-5 sm:px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E8192C] flex items-center justify-center">
            <Grid3x3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg sm:text-xl">Optimiser ROI Calculator</h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Click panels to mark shade. See the £ cost of doing nothing — and the
              cheapest fix.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Grid size + panel wattage controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 mb-2 block">
              Rows
            </label>
            <select
              value={rows}
              onChange={(e) => resetGrid(Number(e.target.value), cols)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 mb-2 block">
              Columns
            </label>
            <select
              value={cols}
              onChange={(e) => resetGrid(rows, Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              {[3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-slate-500 mb-2 block">
              Panel watts
            </label>
            <select
              value={panelWattage}
              onChange={(e) => setPanelWattage(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              <option value={400}>400W</option>
              <option value={415}>415W (Longi)</option>
              <option value={440}>440W (Aiko)</option>
              <option value={450}>450W</option>
            </select>
          </div>
        </div>

        {/* Roof grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">
              Click any panel to toggle shade
            </p>
            <button
              onClick={clearShade}
              className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-[#E8192C] transition-colors"
            >
              <RotateCw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <div className="bg-slate-100 rounded-xl p-4 sm:p-6">
            <div
              className="grid gap-2 mx-auto max-w-xl"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: rows * cols }).map((_, idx) => {
                const state = panels[idx] || 'clean'
                return (
                  <button
                    key={idx}
                    onClick={() => togglePanel(idx)}
                    className={`aspect-[3/4] rounded-md border-2 transition-all flex items-center justify-center text-xs font-bold ${
                      state === 'shaded'
                        ? 'bg-slate-700 border-slate-900 text-slate-200'
                        : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 border-blue-700 text-white hover:scale-105'
                    }`}
                    aria-label={`Panel ${idx + 1}: ${state}`}
                  >
                    {state === 'shaded' ? '☁' : <Sun className="w-3 h-3 opacity-80" />}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-5 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gradient-to-br from-blue-400 to-blue-600 border border-blue-700" />
                <span className="text-slate-600">Clean</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-slate-700 border border-slate-900" />
                <span className="text-slate-600">Shaded</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
              System size
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {result.systemKwp.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500">kWp</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
            <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide">
              Panels
            </p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {result.totalPanels}
            </p>
            <p className="text-xs text-slate-500">total</p>
          </div>
          <div className="bg-slate-900 text-white rounded-xl p-3 sm:p-4">
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
              Shaded
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#E8192C] mt-1">
              {result.shadedPanels}
            </p>
            <p className="text-xs text-slate-400">panels</p>
          </div>
        </div>

        {/* Cost of doing nothing */}
        {result.shadedPanels > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase text-red-700 tracking-wide mb-1">
                  Cost of doing nothing
                </p>
                <p className="text-2xl sm:text-3xl font-black text-red-700 mb-1">
                  £{result.annualLossDoNothingGBP.toFixed(0)}/year
                </p>
                <p className="text-sm text-red-900">
                  {result.annualLossDoNothingKwh.toFixed(0)} kWh lost annually = £
                  {(result.annualLossDoNothingGBP * 25).toFixed(0)} over the system&apos;s 25-year life
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Three options compared */}
        {result.shadedPanels > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Your three options
            </h3>
            <div className="space-y-3">
              {/* Option A — smart stringing */}
              <OptionCard
                title="Smart stringing"
                subtitle="Put shaded panels on their own MPPT"
                cost="£0"
                annualSaving={result.stringingSavingGBP}
                payback="Instant"
                viability={
                  result.shadedPanels <= 6 && result.totalPanels >= 8
                    ? 'best-free'
                    : result.shadedPanels > 6
                      ? 'not-recommended'
                      : 'viable'
                }
                rationale={
                  result.shadedPanels <= 6 && result.totalPanels >= 8
                    ? 'Free fix — uses the inverter\'s 2nd MPPT.'
                    : result.totalPanels < 8
                      ? 'Array too small — not enough panels to make a clean string split.'
                      : 'Too many shaded panels for stringing alone.'
                }
                isRecommended={result.recommendation === 'stringing'}
              />
              {/* Option B — optimisers */}
              <OptionCard
                title={`Tigo optimisers on ${result.shadedPanels} panel${result.shadedPanels === 1 ? '' : 's'}`}
                subtitle="£45 trade per panel"
                cost={`£${result.optimiserCost}`}
                annualSaving={result.optimiserNetAnnualSaving}
                payback={
                  isFinite(result.optimiserPaybackYears)
                    ? `${result.optimiserPaybackYears.toFixed(1)} yrs`
                    : '∞'
                }
                viability="viable"
                rationale="Surgical fix — only shaded panels affected. Works with any inverter."
                isRecommended={result.recommendation === 'optimisers'}
              />
              {/* Option C — Aiko */}
              <OptionCard
                title="Swap to Aiko Neostar 2P (all panels)"
                subtitle={`£15 premium × ${result.totalPanels} = £${result.aikoCost}`}
                cost={`£${result.aikoCost}`}
                annualSaving={result.aikoNetAnnualSaving}
                payback={
                  isFinite(result.aikoPaybackYears)
                    ? `${result.aikoPaybackYears.toFixed(1)} yrs`
                    : '∞'
                }
                viability={
                  result.shadedPanels > 6 ? 'best-paid' : 'viable'
                }
                rationale={
                  result.shadedPanels > 6
                    ? 'Cell-level shade tolerance — cleanest spec, longest warranty.'
                    : 'Overkill for this much shade — optimisers cheaper.'
                }
                isRecommended={result.recommendation === 'aiko'}
              />
            </div>
          </div>
        )}

        {/* No shade */}
        {result.shadedPanels === 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 mb-1">Clean roof — no fix needed</p>
                <p className="text-sm text-emerald-800">
                  No optimisers, no Aiko premium, standard inverter. Don&apos;t upsell what
                  isn&apos;t needed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* What to say */}
        {result.shadedPanels > 0 && (
          <div className="bg-slate-900 text-white rounded-xl p-5">
            <div className="flex items-start gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                What to say to the customer
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-100 italic">
              &ldquo;You have {result.shadedPanels}{' '}
              {result.shadedPanels === 1 ? 'panel' : 'panels'} in shade for part of the day.
              Without addressing it, that costs you about £
              {result.annualLossDoNothingGBP.toFixed(0)} a year — £
              {(result.annualLossDoNothingGBP * 25).toFixed(0)} over the system&apos;s
              lifetime. The fix is{' '}
              {result.recommendation === 'stringing'
                ? 'free — we just wire the shaded panels to their own circuit on the inverter.'
                : result.recommendation === 'optimisers'
                  ? `£${result.optimiserCost} in optimisers — they make each shaded panel independent so the rest of the system is not dragged down.`
                  : `swapping to Aiko panels — they handle partial shade at the cell level. The premium pays back in ${result.aikoPaybackYears.toFixed(1)} years.`}
              &rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function OptionCard({
  title,
  subtitle,
  cost,
  annualSaving,
  payback,
  viability,
  rationale,
  isRecommended,
}: {
  title: string
  subtitle: string
  cost: string
  annualSaving: number
  payback: string
  viability: 'best-free' | 'best-paid' | 'viable' | 'not-recommended'
  rationale: string
  isRecommended: boolean
}) {
  return (
    <div
      className={`rounded-xl border-2 p-4 sm:p-5 ${
        isRecommended
          ? 'border-emerald-300 bg-emerald-50/30'
          : viability === 'not-recommended'
            ? 'border-slate-200 bg-slate-50 opacity-60'
            : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">{title}</h4>
            {isRecommended && (
              <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase">Cost</p>
          <p className="font-bold text-slate-900 text-base">{cost}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-100">
        <div>
          <p className="text-slate-500">Annual saving</p>
          <p className="font-bold text-emerald-600">£{Math.max(0, annualSaving).toFixed(0)}/yr</p>
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
