'use client'

import Link from 'next/link'
import SalesStep, { ScriptBox, WhyCard, KeyLine, FromTheCall } from './SalesStep'
import { ArrowRight, Sun, TrendingUp, PlusCircle } from 'lucide-react'

export default function Step5SolarValue() {
  return (
    <SalesStep
      id="step-5"
      stepNumber={5}
      title="Solar = Income. The Cherry on Top."
      goal="They're already saving £788/year on batteries. Now show them the money-making machine."
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">The Formula</h3>
      <div className="bg-slate-100 rounded-xl p-6 font-mono text-sm md:text-base text-slate-800 mb-6">
        <div className="space-y-2">
          <p>Panel W × Number of panels = <span className="text-[#E8192C] font-bold">System kWp</span></p>
          <p>System kWp × 3.5 peak hours = <span className="text-[#E8192C] font-bold">Daily kWh generated</span></p>
          <p>Daily kWh × Export rate = <span className="text-[#E8192C] font-bold">Daily income</span></p>
          <p>Daily income × 365 = <span className="text-[#E8192C] font-bold">Annual export income</span></p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm">
        <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-3">Example</p>
        <div className="text-slate-700 font-mono text-sm md:text-base space-y-1">
          <p>470W × 14 panels = <span className="text-[#E8192C] font-bold">6.58 kWp</span></p>
          <p>6.58 × 4.5 = <span className="text-[#E8192C] font-bold">29.61 kWh</span> per day generated</p>
          <p>29.61 × £0.16 = <span className="text-[#E8192C] font-bold">£4.73</span> per day earned</p>
          <p>£4.73 × 365 = <span className="text-[#E8192C] font-bold">£1,729</span> per year</p>
        </div>
      </div>

      <ScriptBox>
{`"Now here's where it gets exciting. You don't even need to use your solar — your batteries are already covering your daily usage with cheap overnight energy.

So we take ALL of your solar generation and sell it back to the grid at 16p per unit. That's £4.73 per day, or £1,729 per year in pure income.

That's not savings. That's revenue. Money coming INTO your account."`}
      </ScriptBox>

      <h3 className="text-lg font-bold text-slate-900 mb-4">The Psychology</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <WhyCard title="Benefits stack in real time">
          They already have the saving (£788). Now you ADD income (£1,729). The total benefit builds before their eyes.
        </WhyCard>
        <WhyCard title="Pure income, not savings">
          &ldquo;Pure income&rdquo; / &ldquo;pure revenue&rdquo; — these words hit differently. This is money coming IN.
        </WhyCard>
        <WhyCard title="They do the maths themselves">
          The customer is calculating payback in their head before you even say the price. They&apos;re selling themselves.
        </WhyCard>
        <WhyCard title="Solar is the bonus">
          Battery savings are locked in. Solar income is the cherry on top. Order matters.
        </WhyCard>
      </div>

      {/* Running Total Visual */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6 text-white">
        <h4 className="font-bold text-center mb-4">Running Total</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5921E]/20 flex items-center justify-center">
                <Sun className="w-4 h-4 text-[#F5921E]" />
              </div>
              <span className="text-slate-300">Battery savings</span>
            </div>
            <span className="font-bold text-[#F5921E]">£788/year</span>
          </div>
          <div className="flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-slate-500" />
          </div>
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E8192C]/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-[#E8192C]" />
              </div>
              <span className="text-slate-300">Solar income</span>
            </div>
            <span className="font-bold text-[#E8192C]">£1,729/year</span>
          </div>
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Total annual benefit</span>
              <span className="text-2xl font-black text-[#E8192C]">£2,517/year</span>
            </div>
          </div>
        </div>
      </div>

      <FromTheCall>
        Mark&apos;s response: &ldquo;Exactly. And this is pure pure revenue.&rdquo; He said it himself. Keilan didn&apos;t have to convince him.
      </FromTheCall>

      {/* Technical deep-links */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          href="/knowledge/inverter-sizing"
          className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-4 transition-all"
        >
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
            Behind the pitch
          </p>
          <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2 text-sm">
            How to size the inverter that delivers this generation
            <ArrowRight className="w-4 h-4" />
          </p>
        </Link>
        <Link
          href="/knowledge/panel-selection"
          className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-4 transition-all"
        >
          <p className="text-xs font-semibold uppercase text-slate-500 mb-1">
            Choosing the panels
          </p>
          <p className="font-bold text-slate-900 group-hover:text-[#E8192C] transition-colors flex items-center gap-2 text-sm">
            Aiko vs Longi vs JA Solar — when to use which
            <ArrowRight className="w-4 h-4" />
          </p>
        </Link>
      </div>
    </SalesStep>
  )
}
