'use client'

import SalesStep, { ScriptBox, WhyCard, KeyLine, FormulaBlock, ExampleBlock } from './SalesStep'
import { Battery, TrendingDown, Zap } from 'lucide-react'

export default function Step4BatteryValue() {
  return (
    <SalesStep
      id="step4"
      stepNumber={4}
      title="Battery = Savings. Always Lead Here."
      goal="Show the customer their daily cost dropping — before you mention a single solar panel."
      dark
    >
      <h3 className="text-lg font-bold text-white mb-4">The Formula</h3>
      <div className="bg-white/10 rounded-xl p-6 font-mono text-sm md:text-base text-white mb-6">
        <div className="space-y-2">
          <p>Daily kWh × Off-peak rate = <span className="text-[#E8192C] font-bold">New daily cost</span></p>
          <p>Old daily cost − New daily cost = <span className="text-[#E8192C] font-bold">Daily saving</span></p>
          <p>Daily saving × 365 = <span className="text-[#E8192C] font-bold">Annual saving</span></p>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-3">Example</p>
        <div className="text-white font-mono text-sm md:text-base space-y-1">
          <p>15.65 kWh × £0.07 = <span className="text-[#E8192C] font-bold">£1.12</span> per day (new cost)</p>
          <p>£3.28 − £1.12 = <span className="text-[#E8192C] font-bold">£2.16</span> per day saved</p>
          <p>£2.16 × 365 = <span className="text-[#E8192C] font-bold">£788.40</span> per year</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 md:p-8 mb-8 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-slate-400 text-sm font-medium">What to Say</span>
        </div>
        <div className="text-slate-100 text-sm md:text-base leading-relaxed font-mono whitespace-pre-wrap">
{`"Right now, your house costs £3.28 a day to run. What if I told you we could get that down to £1.12?

We fill your batteries up overnight at 7p per unit instead of the 21p you're paying now. That's an immediate saving of £788 per year — just by buying your energy at a different time of day.

And that is literally just through battery storage. We haven't even talked about solar panels yet."`}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-4">Why Battery Comes First</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <div className="w-10 h-10 rounded-lg bg-[#E8192C]/20 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5 text-[#E8192C]" />
          </div>
          <h4 className="font-bold text-white text-sm mb-2">Savings are concrete</h4>
          <p className="text-slate-400 text-sm">No sunshine required. No roof debate. Just maths. The customer&apos;s existing bill is the anchor — you reduce it.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <div className="w-10 h-10 rounded-lg bg-[#E8192C]/20 flex items-center justify-center mb-3">
            <Battery className="w-5 h-5 text-[#E8192C]" />
          </div>
          <h4 className="font-bold text-white text-sm mb-2">Already bought in</h4>
          <p className="text-slate-400 text-sm">By showing £788/year in savings from batteries alone, solar becomes the cherry on top, not the core pitch.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <div className="w-10 h-10 rounded-lg bg-[#E8192C]/20 flex items-center justify-center mb-3">
            <TrendingDown className="w-5 h-5 text-[#E8192C]" />
          </div>
          <h4 className="font-bold text-white text-sm mb-2">Reframes the conversation</h4>
          <p className="text-slate-400 text-sm">Competitors pitch &ldquo;panels that generate energy.&rdquo; You pitch &ldquo;a system that cuts your daily cost from £3.28 to £1.12.&rdquo;</p>
        </div>
      </div>

      {/* Before/After Visual */}
      <div className="bg-white/10 rounded-xl p-6 mb-6">
        <h4 className="text-white font-bold text-center mb-4">The Transformation</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Before</p>
            <p className="text-2xl md:text-3xl font-black text-white">£3.28<span className="text-sm font-normal">/day</span></p>
            <p className="text-slate-400 text-sm mt-1">£1,197/year</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#E8192C] flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">After (Battery)</p>
            <p className="text-2xl md:text-3xl font-black text-[#E8192C]">£1.12<span className="text-sm font-normal">/day</span></p>
            <p className="text-[#E8192C] text-sm mt-1">Save £788/year</p>
          </div>
        </div>
      </div>

      <div className="bg-[#E8192C] text-white rounded-xl p-5 md:p-6">
        <p className="text-sm md:text-base font-medium leading-relaxed text-center">
          &ldquo;That is LITERALLY just through battery storage.&rdquo; — Mark heard this and was already hooked. Solar hadn&apos;t been mentioned once.
        </p>
      </div>
    </SalesStep>
  )
}
