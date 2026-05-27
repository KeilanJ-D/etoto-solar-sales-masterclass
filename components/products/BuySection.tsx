'use client'

import { Check, ArrowRight, Banknote, Sparkles } from 'lucide-react'
import { COMPLETE_MASTERCLASS } from '@/lib/pricing'

interface BuySectionProps {
  productName?: string // legacy prop, ignored — kept for backward compat with existing callers
  price?: string
  bundlePrice?: string
  buyLink?: string
  bundleLink?: string
  features?: string[]
}

export default function BuySection({}: BuySectionProps) {
  if (process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true') return null

  const features = [
    'The full 9-step sales framework with audio from real calls',
    '7-topic technical Knowledge Library (inverter sizing, MPPT, optimisers, phase, panels)',
    '4 Systems Playbooks (SolaFlow, HighLevel CRM, OpenSolar, Customer Discovery)',
    'Interactive Inverter Sizing Tool + Optimiser ROI Calculator',
    'Role-based portals for setters, reps and partner agencies',
    'Lifetime access. All future updates included.',
    'Secure payment via Stripe · 14-day money-back guarantee',
  ]

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4" />
            One purchase. Lifetime access.
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-balance leading-tight">
            {COMPLETE_MASTERCLASS.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            {COMPLETE_MASTERCLASS.tagline}
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/10">
          <div className="text-center mb-8">
            <p className="text-sm text-slate-400 mb-2">
              Comparable value: <span className="line-through">{COMPLETE_MASTERCLASS.comparableValueHeadline}</span>
            </p>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl md:text-6xl font-black text-white">
                {COMPLETE_MASTERCLASS.priceHeadline}
              </span>
              <span className="text-slate-400 text-xl">
                {COMPLETE_MASTERCLASS.priceVatNote}
              </span>
            </div>
            <p className="text-sm text-emerald-400 font-medium">
              or {COMPLETE_MASTERCLASS.priceMonthly}
            </p>
          </div>

          <ul className="space-y-3 mb-8 max-w-xl mx-auto">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm sm:text-base text-slate-200"
              >
                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={COMPLETE_MASTERCLASS.stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-4 sm:py-5 px-6 rounded-xl transition-all min-h-[56px] sm:min-h-[64px] text-base sm:text-lg shadow-lg shadow-[#E8192C]/20"
          >
            <span>
              Pay in full — {COMPLETE_MASTERCLASS.priceHeadline}{' '}
              {COMPLETE_MASTERCLASS.priceVatNote}
            </span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <a
            href={COMPLETE_MASTERCLASS.iwocaPayLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold py-3.5 px-6 rounded-xl transition-all min-h-[52px]"
          >
            <Banknote className="w-5 h-5 text-emerald-400" />
            <span className="text-sm sm:text-base">
              Apply for iwocaPay finance — {COMPLETE_MASTERCLASS.iwocaPayDeposit}, then{' '}
              {COMPLETE_MASTERCLASS.iwocaPayMonthly}
            </span>
          </a>

          <p className="text-center text-xs text-slate-500 mt-4">
            {COMPLETE_MASTERCLASS.iwocaPaySubtext} ·{' '}
            {COMPLETE_MASTERCLASS.guaranteeNote}
          </p>
        </div>
      </div>
    </section>
  )
}
