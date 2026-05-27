'use client'

import { RotateCw, PoundSterling, Zap, Battery, Sun, TrendingUp } from 'lucide-react'

export interface SummaryFooterProps {
  dailyKwh: number
  batterySummary: string | null
  panelSummary: string | null
  totalCost: number
  paybackYears: number | null
  onReset: () => void
}

export default function SummaryFooter({
  dailyKwh,
  batterySummary,
  panelSummary,
  totalCost,
  paybackYears,
  onReset,
}: SummaryFooterProps) {
  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] print:hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* Daily usage */}
          <div className="flex-shrink-0 px-3 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-slate-600" />
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 leading-none mb-0.5">Daily</p>
              <p className="text-xs font-bold text-slate-900 leading-none">
                {dailyKwh.toFixed(1)} kWh
              </p>
            </div>
          </div>

          {/* Battery */}
          {batterySummary && (
            <div className="flex-shrink-0 px-3 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
              <Battery className="w-3.5 h-3.5 text-emerald-600" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-500 leading-none mb-0.5">Battery</p>
                <p className="text-xs font-bold text-slate-900 leading-none whitespace-nowrap">{batterySummary}</p>
              </div>
            </div>
          )}

          {/* Panels */}
          {panelSummary && (
            <div className="flex-shrink-0 px-3 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-500 leading-none mb-0.5">Panels</p>
                <p className="text-xs font-bold text-slate-900 leading-none whitespace-nowrap">{panelSummary}</p>
              </div>
            </div>
          )}

          {/* Cost */}
          {totalCost > 0 && (
            <div className="flex-shrink-0 px-3 py-2 bg-[#E8192C]/10 rounded-lg flex items-center gap-2">
              <PoundSterling className="w-3.5 h-3.5 text-[#E8192C]" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#E8192C]/80 leading-none mb-0.5">Cost</p>
                <p className="text-xs font-bold text-[#E8192C] leading-none whitespace-nowrap">
                  £{totalCost.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Payback */}
          {paybackYears != null && (
            <div className="flex-shrink-0 px-3 py-2 bg-emerald-100 rounded-lg flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-emerald-700/80 leading-none mb-0.5">Payback</p>
                <p className="text-xs font-bold text-emerald-800 leading-none whitespace-nowrap">
                  {paybackYears}y
                </p>
              </div>
            </div>
          )}

          {/* Reset push to right */}
          <div className="ml-auto flex-shrink-0">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-[36px]"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
