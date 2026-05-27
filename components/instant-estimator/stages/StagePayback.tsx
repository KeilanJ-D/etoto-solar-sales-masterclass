'use client'

import { ArrowLeft, TrendingUp, Printer, Leaf } from 'lucide-react'
import type { AuditCalcOutputs } from '@/lib/solaflow/audit-calc'
import { compoundedSavings } from '@/lib/solaflow/audit-calc'

export interface PaybackStageProps {
  extrasCost: number
  customSystemCost: number | null
  audit: AuditCalcOutputs
  batteryCost: number
  solarCost: number
  inverterCost: number
  onChange: (patch: {
    extrasCost?: number
    customSystemCost?: number | null
  }) => void
  onBack: () => void
  onPrint: () => void
}

export default function StagePayback({
  extrasCost,
  customSystemCost,
  audit,
  batteryCost,
  solarCost,
  inverterCost,
  onChange,
  onBack,
  onPrint,
}: PaybackStageProps) {
  // 25-year projection (sample 6 points for chart)
  const projectionYears = [0, 5, 10, 15, 20, 25]
  const projectionPoints = projectionYears.map((y) => ({
    year: y,
    cumulative: y === 0 ? 0 : compoundedSavings(audit.totalAnnualBenefit, y),
  }))
  const maxValue = Math.max(
    audit.effectiveSystemCost,
    projectionPoints[projectionPoints.length - 1].cumulative,
  )

  // SVG chart dimensions
  const W = 600
  const H = 220
  const PAD_L = 40
  const PAD_R = 16
  const PAD_T = 16
  const PAD_B = 28
  const innerW = W - PAD_L - PAD_R
  const innerH = H - PAD_T - PAD_B
  const xFor = (y: number) => PAD_L + (y / 25) * innerW
  const yFor = (v: number) => PAD_T + innerH - (v / Math.max(1, maxValue)) * innerH

  const linePath = projectionPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xFor(p.year)} ${yFor(p.cumulative)}`)
    .join(' ')
  const costY = yFor(audit.effectiveSystemCost)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          Stage 4 of 4
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          The numbers that close the deal
        </h2>
        <p className="text-slate-600">
          Total system cost, total annual benefit, payback period, and the 25-year projection at 7%
          energy inflation. This is the part you walk the customer through in plain English.
        </p>
      </div>

      {/* Payback hero */}
      <div className="rounded-2xl bg-gradient-to-br from-[#E8192C] to-[#B01220] p-6 sm:p-8 text-white text-center">
        <p className="text-xs sm:text-sm uppercase tracking-widest text-white/70 mb-2 font-bold">
          Payback period
        </p>
        {audit.paybackYears != null ? (
          <p className="text-5xl sm:text-6xl font-black mb-2">
            {audit.paybackYears}<span className="text-2xl sm:text-3xl font-bold"> years</span>
          </p>
        ) : (
          <p className="text-3xl sm:text-4xl font-black mb-2 opacity-80">No payback</p>
        )}
        <p className="text-sm sm:text-base text-white/80">
          {audit.paybackYears != null
            ? `After year ${audit.paybackYears}, every £${Math.round(audit.totalAnnualBenefit).toLocaleString()}/yr in savings is pure profit.`
            : 'Annual benefit not yet positive — revisit Stage 2/3 settings.'}
        </p>
      </div>

      {/* Cost breakdown + Benefit breakdown side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cost */}
        <div className="rounded-2xl bg-white border-2 border-slate-200 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
            System cost
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Solar ({audit.systemKwp.toFixed(1)} kWp)</dt>
              <dd className="text-slate-900 font-semibold">£{solarCost.toLocaleString()}</dd>
            </div>
            {inverterCost > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Inverter</dt>
                <dd className="text-slate-900 font-semibold">£{inverterCost.toLocaleString()}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-slate-600">Battery</dt>
              <dd className="text-slate-900 font-semibold">£{batteryCost.toLocaleString()}</dd>
            </div>
            {extrasCost > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Extras</dt>
                <dd className="text-slate-900 font-semibold">£{extrasCost.toLocaleString()}</dd>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-base">
              <dt className="font-bold text-slate-900">Total</dt>
              <dd className="font-black text-[#E8192C]">£{audit.effectiveSystemCost.toLocaleString()}</dd>
            </div>
          </dl>

          {/* Extras input */}
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="extras" className="text-xs font-semibold text-slate-700">
                Extras (EV charger, bird mesh, scaffolding etc.)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">£</span>
                <input
                  id="extras"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={extrasCost || ''}
                  onChange={(e) => onChange({ extrasCost: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="custom-price" className="text-xs font-semibold text-slate-700">
                Or override with custom price (for discounts)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">£</span>
                <input
                  id="custom-price"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={customSystemCost ?? ''}
                  onChange={(e) =>
                    onChange({
                      customSystemCost:
                        e.target.value === '' ? null : Number(e.target.value) || null,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none"
                  placeholder="leave blank to use calculated"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefit */}
        <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3">
            Annual benefit
          </p>
          <dl className="space-y-2 text-sm">
            {audit.annualSelfConsumeSaving > 0 && (
              <div className="flex justify-between">
                <dt className="text-emerald-900">Solar self-consumption</dt>
                <dd className="text-emerald-900 font-semibold">
                  £{Math.round(audit.annualSelfConsumeSaving).toLocaleString()}/yr
                </dd>
              </div>
            )}
            {audit.annualBatterySaving > 0 && (
              <div className="flex justify-between">
                <dt className="text-emerald-900">Battery off-peak arbitrage</dt>
                <dd className="text-emerald-900 font-semibold">
                  £{Math.round(audit.annualBatterySaving).toLocaleString()}/yr
                </dd>
              </div>
            )}
            {audit.annualSolarExport > 0 && (
              <div className="flex justify-between">
                <dt className="text-emerald-900">Solar export (SEG)</dt>
                <dd className="text-emerald-900 font-semibold">
                  £{Math.round(audit.annualSolarExport).toLocaleString()}/yr
                </dd>
              </div>
            )}
            <div className="border-t border-emerald-300 pt-2 flex justify-between text-base">
              <dt className="font-bold text-emerald-900">Total /year</dt>
              <dd className="font-black text-emerald-700">
                £{Math.round(audit.totalAnnualBenefit).toLocaleString()}
              </dd>
            </div>
          </dl>

          <div className="mt-4 pt-4 border-t border-emerald-200 grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 mb-0.5">
                15-year cumulative
              </p>
              <p className="text-xl font-black text-emerald-900">
                £{Math.round(audit.fifteenYearTotal).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-emerald-700 mb-0.5">
                25-year cumulative
              </p>
              <p className="text-xl font-black text-emerald-900">
                £{Math.round(audit.twentyFiveYearTotal).toLocaleString()}
              </p>
            </div>
          </div>
          {audit.annualCo2SavingsKg > 0 && (
            <p className="mt-3 pt-3 border-t border-emerald-200 text-xs text-emerald-800 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <strong>{(audit.annualCo2SavingsKg / 1000).toFixed(2)} tonnes</strong> CO₂ saved per year
            </p>
          )}
        </div>
      </div>

      {/* 25-year projection chart */}
      <div className="rounded-2xl bg-white border-2 border-slate-200 p-5">
        <div className="flex items-baseline justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            25-year cumulative savings projection
          </p>
          <p className="text-[10px] text-slate-400 italic">Compounded at 7% energy inflation</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="25-year projection chart">
          {/* Y axis labels (3 ticks) */}
          {[0, 0.5, 1].map((frac) => {
            const v = Math.round(maxValue * frac)
            const y = yFor(v)
            return (
              <g key={frac}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" />
                <text x={PAD_L - 4} y={y + 3} fontSize="9" fill="#94a3b8" textAnchor="end">
                  £{(v / 1000).toFixed(0)}k
                </text>
              </g>
            )
          })}
          {/* X axis labels */}
          {projectionYears.map((y) => (
            <text key={y} x={xFor(y)} y={H - 8} fontSize="9" fill="#94a3b8" textAnchor="middle">
              {y}y
            </text>
          ))}
          {/* System cost reference line */}
          <line
            x1={PAD_L}
            y1={costY}
            x2={W - PAD_R}
            y2={costY}
            stroke="#E8192C"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x={W - PAD_R - 4} y={costY - 4} fontSize="9" fill="#E8192C" textAnchor="end" fontWeight="700">
            System cost £{(audit.effectiveSystemCost / 1000).toFixed(1)}k
          </text>
          {/* Cumulative savings curve */}
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" />
          {/* Data points */}
          {projectionPoints.map((p) => (
            <circle key={p.year} cx={xFor(p.year)} cy={yFor(p.cumulative)} r="3.5" fill="#10b981" />
          ))}
          {/* Final value label */}
          <text
            x={xFor(25)}
            y={yFor(projectionPoints[projectionPoints.length - 1].cumulative) - 8}
            fontSize="10"
            fill="#10b981"
            fontWeight="800"
            textAnchor="end"
          >
            £{Math.round(projectionPoints[projectionPoints.length - 1].cumulative / 1000)}k
          </text>
        </svg>
      </div>

      {/* Nav */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 active:bg-slate-700 transition-all shadow-md min-h-[48px]"
        >
          <Printer className="w-4 h-4" />
          Print / save summary
        </button>
      </div>
    </div>
  )
}
