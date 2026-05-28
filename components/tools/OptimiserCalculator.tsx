'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  AlertCircle, Calculator, CheckCircle2, Grid3x3, GraduationCap,
  Lightbulb, RotateCw, Sun, TrendingUp,
} from 'lucide-react'
import { SOLAFLOW_CONSTANTS, panels } from '@/lib/solaflow-products'

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

// Real SolaFlow catalogue picker — Aiko first since it's the cell-level
// shade-tolerant pick we recommend in option C.
const PANEL_PICKER_SKUS = [
  'aiko-470w',
  'aiko-475w',
  'aiko-480w',
  'aiko-510w',
  'jinko-460w',
  'dmegc-450w',
  'dmegc-455w',
  'eurener-500w',
  'exiom-510w',
  'bexie-520w',
] as const

export default function OptimiserCalculator() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(5)
  const [selectedPanelSku, setSelectedPanelSku] = useState<string>('aiko-470w')
  const [panelStates, setPanelStates] = useState<PanelState[]>(() =>
    Array(15).fill('clean' as PanelState)
  )

  const selectedPanel = useMemo(
    () => panels.find((p) => p.sku === selectedPanelSku) ?? panels[0],
    [selectedPanelSku],
  )
  const panelWattage = selectedPanel.wattage
  const isAikoSelected = selectedPanel.brand === 'Aiko'

  // Aliased to keep downstream variable name `panels` intact for the calc
  const panelGrid = panelStates

  const togglePanel = (idx: number) => {
    setPanelStates((prev) => {
      const next = [...prev]
      next[idx] = next[idx] === 'clean' ? 'shaded' : 'clean'
      return next
    })
  }

  const resetGrid = (newRows: number, newCols: number) => {
    setRows(newRows)
    setCols(newCols)
    setPanelStates(Array(newRows * newCols).fill('clean' as PanelState))
  }

  const clearShade = () => {
    setPanelStates(panelStates.map(() => 'clean' as PanelState))
  }

  const result = useMemo(() => {
    const totalPanels = panelGrid.length
    const shadedPanels = panelGrid.filter((p) => p === 'shaded').length
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

    // Best option pick.
    // KEY PHYSICS: you can't put 1-3 panels on their own string. Modern
    // hybrid inverters need ~4+ panels per input to reach the ~90V MPPT
    // start-up voltage. So "smart stringing" is NOT a fix for low shaded
    // counts — it's an orientation tool that needs 4+ contiguous panels.
    // Default for any shading: optimisers (works for any count).
    let recommendation:
      | 'none'
      | 'stringing'
      | 'optimisers'
      | 'aiko' = 'none'

    if (shadedPanels === 0) recommendation = 'none'
    else if (shadedPanels >= 6 && totalPanels >= 10)
      recommendation = 'aiko' // Aiko swap competitive at heavy-shade scale
    else recommendation = 'optimisers' // default for any shading scenario

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
  }, [panelGrid, panelWattage])

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
              Panel (SolaFlow catalogue)
            </label>
            <select
              value={selectedPanelSku}
              onChange={(e) => setSelectedPanelSku(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white"
            >
              {PANEL_PICKER_SKUS.map((sku) => {
                const p = panels.find((pp) => pp.sku === sku)
                if (!p) return null
                return (
                  <option key={sku} value={sku}>
                    {p.brand} {p.name} — {p.wattage}W
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        {/* Selected panel chip — confirms which product is on the roof */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="w-14 h-14 bg-white rounded-lg border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image
              src={selectedPanel.imagePath}
              alt={`${selectedPanel.brand} ${selectedPanel.name}`}
              width={48}
              height={48}
              className="object-contain max-h-full max-w-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wider font-bold text-slate-500">
              On the roof
            </p>
            <p className="text-sm font-bold text-slate-900 truncate">
              {selectedPanel.brand} {selectedPanel.name} · {selectedPanel.wattage}W · {selectedPanel.efficiency}
            </p>
          </div>
          {isAikoSelected && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full flex-shrink-0">
              Cell-level shade tolerance
            </span>
          )}
        </div>

        {/* Roof grid — styled like a real PV array on a roof.
            No cards around each panel. Tiles touch with a thin dark line
            between them (the "panel junction"). Tap any tile to toggle shade. */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-900">
              👆 Tap any panel to mark it as shaded
            </p>
            <button
              onClick={clearShade}
              className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-[#E8192C] transition-colors"
            >
              <RotateCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* The "roof" — neutral surround that lets the panels read as the array */}
          <div className="mx-auto" style={{ maxWidth: `${Math.min(cols * 90, 560)}px` }}>
            <div
              className="grid bg-slate-900 p-px rounded-md shadow-xl ring-1 ring-slate-300"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: '1px',
              }}
            >
              {Array.from({ length: rows * cols }).map((_, idx) => {
                const state = panelGrid[idx] || 'clean'
                const isShaded = state === 'shaded'
                return (
                  <button
                    key={idx}
                    onClick={() => togglePanel(idx)}
                    className={`relative aspect-[2/3] overflow-hidden transition-all bg-white ${
                      isShaded
                        ? 'cursor-pointer'
                        : 'cursor-pointer hover:brightness-110 active:brightness-95'
                    }`}
                    aria-label={`Panel ${idx + 1}: ${state}`}
                  >
                    <Image
                      src={selectedPanel.imagePath}
                      alt=""
                      fill
                      sizes="90px"
                      className={`object-cover transition-all ${
                        isShaded ? 'opacity-25 grayscale-[80%]' : 'opacity-100'
                      }`}
                    />
                    {isShaded && (
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-900/55 text-slate-100 text-base font-bold">
                        ☁
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-center text-[11px] text-slate-500 italic mt-2">
              Each tile is a real {selectedPanel.brand} {selectedPanel.name} ({selectedPanel.wattage}W) — shaded panels are dimmed and marked with ☁
            </p>
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

        {/* Cost of doing nothing — with TRANSPARENT math breakdown.
            The customer sees exactly where the £/year number came from. */}
        {result.shadedPanels > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase text-red-700 tracking-wide mb-1">
                  Cost of doing nothing
                </p>
                <p className="text-3xl sm:text-4xl font-black text-red-700 mb-1 leading-none">
                  £{Math.round(result.annualLossDoNothingGBP).toLocaleString('en-GB')}/year
                </p>
                <p className="text-sm text-red-900">
                  {Math.round(result.annualLossDoNothingKwh).toLocaleString('en-GB')} kWh lost annually
                  {' '}· £{Math.round(result.annualLossDoNothingGBP * 25).toLocaleString('en-GB')}
                  {' '}over the system&apos;s 25-year life
                </p>
              </div>
            </div>

            {/* Always-visible step-by-step calculation — teach the formula,
                don't hide it behind a "show maths" toggle */}
            <div className="bg-white rounded-lg border border-red-200 p-3 sm:p-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 text-red-700 font-bold mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Where £{Math.round(result.annualLossDoNothingGBP).toLocaleString('en-GB')} comes from</span>
              </div>
              <ol className="space-y-1.5 font-mono text-[11px] sm:text-xs text-slate-700">
                <li>
                  <span className="text-slate-400">①</span>{' '}
                  {result.totalPanels} panels × {panelWattage}W = <strong className="text-slate-900">{(result.totalPanels * panelWattage).toLocaleString()} W</strong> full string output
                </li>
                <li>
                  <span className="text-slate-400">②</span>{' '}
                  Shaded panel drops whole string to 35% → lose <strong className="text-slate-900">{Math.round(result.totalPanels * panelWattage * (1 - SHADE_DERATE_NO_FIX)).toLocaleString()} W</strong> during shade
                </li>
                <li>
                  <span className="text-slate-400">③</span>{' '}
                  × {SHADE_HOURS_PER_DAY} hrs/day shade × {SHADE_DAYS_PER_YEAR} days/yr ÷ 1,000 = <strong className="text-slate-900">{result.annualLossDoNothingKwh.toFixed(0)} kWh/yr lost</strong>
                </li>
                <li>
                  <span className="text-slate-400">④</span>{' '}
                  × {(UNIT_RATE_GBP * 100).toFixed(0)}p unit rate = <strong className="text-red-700">£{Math.round(result.annualLossDoNothingGBP).toLocaleString('en-GB')} / year</strong>
                </li>
              </ol>

              <details className="mt-3 pt-3 border-t border-red-100">
                <summary className="text-[11px] sm:text-xs font-semibold text-red-700 cursor-pointer hover:underline list-none flex items-center gap-1">
                  <span className="inline-block transition-transform">▶</span> Why these assumptions?
                </summary>
                <ul className="mt-2 space-y-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-3">
                  <li>
                    <strong className="text-slate-900">{SHADE_HOURS_PER_DAY} hrs/day:</strong> Typical UK chimney, tree or neighbour-roof shade lands on the array for about 3 hours per day during the months when the sun is low enough to cast it.
                  </li>
                  <li>
                    <strong className="text-slate-900">{SHADE_DAYS_PER_YEAR} days/yr:</strong> Roughly 6 months — autumn through early spring. In high summer the sun clears most obstructions.
                  </li>
                  <li>
                    <strong className="text-slate-900">35% derate:</strong> A traditional string inverter can only operate at the lowest panel&apos;s voltage. One shaded panel = the whole string limps along at that reduced voltage. The 35% figure is the conservative industry rule of thumb for partial shade on one panel in a string.
                  </li>
                  <li>
                    <strong className="text-slate-900">28p unit rate:</strong> Ofgem cap baseline. The lost kWh is electricity the customer has to BUY at this rate to make up for it.
                  </li>
                </ul>
              </details>
            </div>
          </div>
        )}

        {/* COACHING CARD — reactive to current configuration.
            Tells the rep WHICH option to recommend (and why) based on
            shaded count, total panels, and whether Aiko is selected. */}
        {result.shadedPanels > 0 && (
          <CoachingCard
            shadedPanels={result.shadedPanels}
            totalPanels={result.totalPanels}
            isAikoSelected={isAikoSelected}
            panelBrand={selectedPanel.brand}
            optimiserCost={result.optimiserCost}
            aikoCost={result.aikoCost}
          />
        )}

        {/* Three options compared */}
        {result.shadedPanels > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
              Your three options
            </h3>
            <div className="space-y-3">
              {/* Option 1 — Optimisers (DEFAULT recommendation for any shading) */}
              <OptionCard
                title={`Tigo optimisers on ${result.shadedPanels} panel${result.shadedPanels === 1 ? '' : 's'}`}
                subtitle="£45 trade per panel — the surgical fix"
                cost={`£${result.optimiserCost}`}
                annualSaving={result.optimiserNetAnnualSaving}
                payback={
                  isFinite(result.optimiserPaybackYears)
                    ? `${result.optimiserPaybackYears.toFixed(1)} yrs`
                    : '∞'
                }
                viability="best-free"
                rationale="Works for any shade pattern — clustered or scattered, 1 panel or many. Each shaded panel becomes voltage-independent so the rest of the string keeps producing."
                isRecommended={result.recommendation === 'optimisers'}
              />
              {/* Option 2 — Aiko swap (or built-in callout if already Aiko) */}
              {!isAikoSelected ? (
                <OptionCard
                  title="Swap to Aiko (cell-level shade tolerance)"
                  subtitle={`£15 premium × ${result.totalPanels} = £${result.aikoCost}`}
                  cost={`£${result.aikoCost}`}
                  annualSaving={result.aikoNetAnnualSaving}
                  payback={
                    isFinite(result.aikoPaybackYears)
                      ? `${result.aikoPaybackYears.toFixed(1)} yrs`
                      : '∞'
                  }
                  viability={result.shadedPanels > 6 ? 'best-paid' : 'viable'}
                  rationale={
                    result.shadedPanels > 6
                      ? 'Cell-level shade tolerance on EVERY panel. Cleanest spec, future-proofed against new shading. At this scale of shade, cheaper than optimisers per-panel.'
                      : 'Overkill for this much shade today — but future-proofs the whole array. Worth comparing £ vs optimisers if customer plans to stay 10+ years.'
                  }
                  isRecommended={result.recommendation === 'aiko'}
                />
              ) : (
                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-emerald-900 text-sm sm:text-base">
                      You&apos;re already on Aiko — cell-level bypass is built into every panel
                    </h4>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Aiko ABC panels handle partial shade on their own. Add optimisers on top
                    ONLY if shade is heavy (6+ panels) — the two technologies stack at scale.
                  </p>
                </div>
              )}
              {/* Option 3 — MPPT split / string separation
                  CONDITIONAL: only shown as viable for ≥4 shaded panels.
                  This is really an ORIENTATION tool, not a shading tool —
                  flagged honestly in the rationale. */}
              <OptionCard
                title="MPPT split / string separation"
                subtitle="£0 if your inverter has a spare MPPT input"
                cost="£0"
                annualSaving={result.stringingSavingGBP}
                payback="Instant"
                viability={
                  result.shadedPanels >= 4
                    ? 'viable'
                    : 'not-recommended'
                }
                rationale={
                  result.shadedPanels < 4
                    ? `Not viable with ${result.shadedPanels} shaded panel${result.shadedPanels === 1 ? '' : 's'}. Inverters need ≥4 panels per string to reach MPPT start-up voltage (~90V). This option is really for splitting roof orientations (east + west on two MPPTs), not for shading a small number of panels.`
                    : `Viable IF your ${result.shadedPanels} shaded panels are a contiguous block on a separate roof face. If they're scattered across the same face, stick with optimisers. If they're on a different orientation entirely, this is your free fix.`
                }
                isRecommended={false}
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
              {Math.round(result.annualLossDoNothingGBP).toLocaleString('en-GB')} a year — £
              {Math.round(result.annualLossDoNothingGBP * 25).toLocaleString('en-GB')} over the system&apos;s
              lifetime. The fix is{' '}
              {result.recommendation === 'optimisers'
                ? `£${result.optimiserCost} in optimisers — small devices behind the shaded ${result.shadedPanels === 1 ? 'panel' : 'panels'} that make ${result.shadedPanels === 1 ? 'it' : 'them'} voltage-independent. The rest of the system never knows ${result.shadedPanels === 1 ? "it's there" : "they're there"}. Pays back inside a year.`
                : `swapping to Aiko panels — they handle partial shade at the cell level, no external hardware. The £${result.aikoCost} premium across all ${result.totalPanels} panels works out cheaper than ${result.shadedPanels} optimisers AND future-proofs the whole array.`}
              &rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// COACHING CARD
// Reactive advice based on shaded count, total, and panel choice.
// Teaches the rep WHICH option to pitch + the principle behind it.
// ============================================

interface CoachingCardProps {
  shadedPanels: number
  totalPanels: number
  isAikoSelected: boolean
  panelBrand: string
  optimiserCost: number
  aikoCost: number
}

type CoachTone = 'aiko-already' | 'optimisers-1-2' | 'optimisers' | 'aiko-swap' | 'aiko-heavy'

function deriveCoach(props: CoachingCardProps): {
  tone: CoachTone
  headline: string
  why: string
  action: string
  principle: string
} {
  const { shadedPanels, totalPanels, isAikoSelected, optimiserCost, aikoCost } = props
  const ratio = shadedPanels / totalPanels

  // Aiko + heavy shade — optimisers still help at this scale even with cell bypass
  if (isAikoSelected && shadedPanels >= 6) {
    return {
      tone: 'aiko-heavy',
      headline: `${shadedPanels} shaded panels is heavy — even Aiko benefits from optimisers here`,
      why: `Aiko's cell-level bypass handles partial shade on individual panels brilliantly. But with ${shadedPanels} panels in shade across the string, the inverter is still tracking a compromised voltage profile. Adding optimisers on the shaded panels makes them voltage-independent — each one outputs its own optimised power.`,
      action: `Quote ${shadedPanels} × £45 in optimisers (£${optimiserCost}). Customer keeps the Aiko aesthetic + warranty AND gets surgical shade recovery.`,
      principle:
        'Aiko bypass = the panel handles its own shade (cell-level). Optimisers = the panel handles its own VOLTAGE (string-level). Together: best-in-class shade recovery.',
    }
  }

  // Aiko + low/moderate shade — cell bypass already handles it
  if (isAikoSelected) {
    return {
      tone: 'aiko-already',
      headline: `You're already on Aiko — ${shadedPanels === 0 ? 'no fix needed' : 'cell-level bypass handles this'}`,
      why: `Aiko's split-cell ABC architecture has bypass diodes at every cell. When ${shadedPanels === 1 ? 'that panel' : 'those panels'} hit shade, the affected cells route around themselves — the panel keeps producing from its unshaded cells, and the string is rarely bottlenecked at this scale.`,
      action: `No optimisers needed. Tell the customer: "we put cell-level shade tolerance on every panel — that's why we chose Aiko for your roof." Sells the spec.`,
      principle:
        'Aiko ABC = shade tolerance baked into every panel by design. The optimiser conversation only re-opens if shade gets extreme (6+ panels).',
    }
  }

  // 1–2 shaded panels (non-Aiko) — OPTIMISERS only.
  // You can't make a viable string from 1-2 panels — they don't produce
  // enough voltage to start a modern MPPT (~90V minimum, ~4 panels in
  // series). Treating MPPT split as a "free fix" here is physically wrong.
  if (shadedPanels >= 1 && shadedPanels <= 2) {
    return {
      tone: 'optimisers-1-2',
      headline: `${shadedPanels === 1 ? 'One shaded panel' : 'Two shaded panels'} — optimisers, full stop`,
      why: `You can't put 1 or 2 panels on their own string. Modern hybrid inverters need at least 4 panels in series to reach the ~90V MPPT start-up voltage — anything less and the string never wakes up. Optimisers solve it differently: a small DC-DC converter mounts behind each shaded panel and makes it voltage-independent, so the rest of the string runs at full power and never sees the shade.`,
      action: `Quote ${shadedPanels} × £45 = £${optimiserCost} in Tigo optimisers. With 3 hrs/day of shade on ${shadedPanels === 1 ? 'one panel' : 'two panels'}, this pays back inside a year.`,
      principle:
        'Optimisers = the surgical fix. "Smart stringing" needs ≥4 contiguous panels — physics, not preference. MPPT split is really an orientation tool, not a shading tool.',
    }
  }

  // Non-Aiko + heavy shade — Aiko swap becomes cost-competitive
  if (ratio >= 0.5 || shadedPanels >= 6) {
    return {
      tone: 'aiko-swap',
      headline: `Heavy shading (${shadedPanels} of ${totalPanels}) — Aiko swap is the cheapest long-term fix`,
      why: `At this much shade, optimisers on every shaded panel get expensive fast — and they're still hardware that can fail. Aiko Neostar 2P has cell-level bypass built into every panel. The cost premium (£15/panel) is less than optimisers at this scale, AND every panel gets shade tolerance — not just the shaded ones today. If shade patterns change (tree grows, new build next door), you're already covered.`,
      action: `Aiko swap: £15 × ${totalPanels} panels = £${aikoCost}. Optimisers: ${shadedPanels} × £45 = £${optimiserCost}. ${aikoCost < optimiserCost ? 'Aiko wins on £ today AND future-proofs.' : 'Optimisers cheaper today, Aiko wins on resilience — compare with the customer.'}`,
      principle:
        'Lots of shade = cell-level bypass beats per-panel optimisers on price AND resilience. Optimisers fix today\'s shade; Aiko fixes today\'s and tomorrow\'s.',
    }
  }

  // Default: 3–5 shaded panels — optimisers stay the safest call
  return {
    tone: 'optimisers',
    headline: `${shadedPanels} shaded panels — optimisers stay the safest call`,
    why: `Optimisers work for any shade pattern — clustered or scattered. MPPT split is only cheaper if your shaded panels happen to be a contiguous block of 4+ on a separate roof face (different orientation) AND you have a spare MPPT input. Without those specifics, optimisers win.`,
    action: `Quote ${shadedPanels} × £45 = £${optimiserCost}. If you can confirm the shaded panels are on a separate roof face, the MPPT-split option (£0) becomes viable — see Option 3 below.`,
    principle:
      'Optimisers = surgical, work for any shade pattern. MPPT split needs ≥4 contiguous panels on a separate face. Different problems, different tools.',
  }
}

const TONE_STYLES: Record<
  CoachTone,
  { bg: string; border: string; eyebrow: string; icon: typeof Lightbulb; iconColor: string; actionBg: string }
> = {
  'aiko-already': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    eyebrow: 'text-emerald-700',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600',
    actionBg: 'bg-emerald-100/60 border-emerald-300',
  },
  'optimisers-1-2': {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    eyebrow: 'text-blue-700',
    icon: GraduationCap,
    iconColor: 'text-blue-600',
    actionBg: 'bg-blue-100/60 border-blue-300',
  },
  optimisers: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    eyebrow: 'text-amber-700',
    icon: GraduationCap,
    iconColor: 'text-amber-600',
    actionBg: 'bg-amber-100/60 border-amber-300',
  },
  'aiko-swap': {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    eyebrow: 'text-purple-700',
    icon: AlertCircle,
    iconColor: 'text-purple-600',
    actionBg: 'bg-purple-100/60 border-purple-300',
  },
  'aiko-heavy': {
    bg: 'bg-slate-100',
    border: 'border-slate-300',
    eyebrow: 'text-slate-700',
    icon: Lightbulb,
    iconColor: 'text-slate-700',
    actionBg: 'bg-white border-slate-300',
  },
}

function CoachingCard(props: CoachingCardProps) {
  const coach = deriveCoach(props)
  const style = TONE_STYLES[coach.tone]
  const Icon = style.icon

  return (
    <div className={`${style.bg} ${style.border} border-2 rounded-xl p-5`}>
      <div className="flex items-start gap-3 mb-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] uppercase tracking-widest font-bold ${style.eyebrow} mb-1`}>
            Coach&apos;s take · live for your config
          </p>
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            {coach.headline}
          </h3>
        </div>
      </div>

      <p className="text-sm text-slate-700 leading-relaxed mb-4">{coach.why}</p>

      <div className={`${style.actionBg} border rounded-lg p-3 mb-3`}>
        <p className={`text-[10px] uppercase tracking-wider font-bold ${style.eyebrow} mb-1`}>
          Action for this quote
        </p>
        <p className="text-sm text-slate-900 font-medium leading-snug">{coach.action}</p>
      </div>

      <div className="flex items-start gap-2 text-[11px] text-slate-600 italic">
        <Sun className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>
          <strong className="not-italic text-slate-700">Principle:</strong> {coach.principle}
        </span>
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
