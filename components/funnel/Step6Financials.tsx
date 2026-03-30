'use client'

import SalesStep, { ScriptBox, KeyLine, FromTheCall } from './SalesStep'
import { CheckCircle, ArrowRight } from 'lucide-react'

const sequence = [
  { text: 'Customer hears daily cost drop (£3.28 → £1.12)', done: true },
  { text: 'Customer hears annual saving (£788)', done: true },
  { text: 'Customer hears annual income (£1,729)', done: true },
  { text: 'Customer hears total benefit (£2,517)', done: true },
  { text: 'NOW — and only now — customer hears the price (£12,567)', highlight: true },
  { text: 'Customer immediately divides mentally: ~5 year payback', done: false },
  { text: 'Customer thinks: "That\'s actually pretty good."', done: false },
]

export default function Step6Financials() {
  return (
    <SalesStep
      id="step-6"
      stepNumber={6}
      title="Show Them the Full Picture"
      goal="Combine everything. The price only lands after the customer already knows the return."
      dark
    >
      <h3 className="text-lg font-bold text-white mb-4">The Formula</h3>
      <div className="bg-white/10 rounded-xl p-6 font-mono text-sm md:text-base text-white mb-6">
        <div className="space-y-2">
          <p>Annual battery saving + Annual solar income = <span className="text-[#E8192C] font-bold">Total annual benefit</span></p>
          <p>System cost ÷ Total annual benefit = <span className="text-[#E8192C] font-bold">Payback period (years)</span></p>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-[#E8192C] uppercase tracking-wide mb-3">Example</p>
        <div className="text-white font-mono text-sm md:text-base space-y-1">
          <p>£788 + £1,729 = <span className="text-[#E8192C] font-bold">£2,517</span> total annual benefit</p>
          <p>£12,567 ÷ £2,517 = <span className="text-[#E8192C] font-bold">4.99 years</span> payback</p>
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
{`"So here's the full picture. Between your battery savings and your solar export income, you're looking at a net benefit of £2,517 per year.

The system costs £12,567. Divide one by the other — you've paid for the entire system in just under 5 years.

Everything after that? Pure profit. Free energy and income for the next 20 years."`}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-4">The Critical Sequence</h3>
      <div className="space-y-3 mb-8">
        {sequence.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
              item.highlight 
                ? 'bg-[#E8192C] text-white' 
                : 'bg-white/5 border border-white/10'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              item.highlight ? 'bg-white/20' : item.done ? 'bg-green-500/20' : 'bg-white/10'
            }`}>
              {item.done ? (
                <CheckCircle className={`w-4 h-4 ${item.highlight ? 'text-white' : 'text-green-400'}`} />
              ) : item.highlight ? (
                <ArrowRight className="w-4 h-4 text-white" />
              ) : (
                <span className="text-slate-400 text-xs">{index + 1}</span>
              )}
            </div>
            <span className={`text-sm ${item.highlight ? 'font-bold' : 'text-slate-300'}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
        <p className="text-slate-300 text-sm leading-relaxed">
          The price is contextualised by the benefit, not isolated as a standalone number. By the time they hear £12,567, they already know they&apos;re getting £2,517 back every year. It&apos;s a 5-year investment, not a 12-and-a-half thousand pound expense.
        </p>
      </div>

      <div className="bg-[#E8192C] text-white rounded-xl p-5 md:p-6 mb-6">
        <p className="text-sm md:text-base font-medium leading-relaxed text-center">
          &ldquo;Everything after that is pure profit.&rdquo; — This is the line that closes deals. 20+ years of free energy after a 5-year payback.
        </p>
      </div>

      <div className="bg-slate-800 border-l-4 border-[#F5921E] rounded-r-xl p-5">
        <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">From the Real Call</p>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          Mark: &ldquo;I&apos;ve always thought it would take about five years to pay back.&rdquo; Keilan confirmed it with the maths. Mark was already there before the price was even said.
        </p>
      </div>
    </SalesStep>
  )
}
