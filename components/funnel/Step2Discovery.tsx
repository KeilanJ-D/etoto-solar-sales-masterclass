'use client'

import SalesStep, { WhyCard, KeyLine, FromTheCall } from './SalesStep'
import { CheckCircle } from 'lucide-react'

const questions = [
  {
    question: '"What motivated you to look into solar?"',
    why: 'Savings? Independence? Environmental? EV? This tells you which benefit to lead with later.',
  },
  {
    question: '"Roughly how much do you spend on electricity per year?"',
    why: 'This is THE number. Everything else flows from it.',
  },
  {
    question: '"Do you know your current tariff rate — the price per kWh?"',
    why: 'If they don\'t know, ask what they pay monthly and work backwards. Or check their supplier\'s standard rate.',
  },
  {
    question: '"What\'s your roof like — orientation and any shading?"',
    why: 'South = best. East-west = good (85%). North = limited. Shading affects panel count.',
  },
  {
    question: '"Do you have an EV or plan to get one?"',
    why: 'EV owners are the best battery customers. They already understand off-peak charging.',
  },
  {
    question: '"Have you had any other quotes? What did they suggest?"',
    why: 'Don\'t ask "how much were they" — ask "what did they suggest you should get." You get the spec AND the price without directly asking.',
  },
]

export default function Step2Discovery() {
  return (
    <SalesStep
      id="step-2"
      stepNumber={2}
      title="Understand Their World Before You Pitch"
      goal="Gather the numbers you need for the maths AND understand what they actually care about."
      dark
    >
      <h3 className="text-lg font-bold text-white mb-6">The Discovery Questions</h3>
      <div className="space-y-4 mb-8">
        {questions.map((item, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#E8192C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm md:text-base mb-1">{item.question}</p>
                <p className="text-slate-400 text-sm">{item.why}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FromTheCall>
        Mark revealed: £1,200/year, 21.89p unit rate, new build, slate roof, east-west facing, plug-in hybrid, quotes for 14 panels and 10 panels, one company didn&apos;t visit the house. &ldquo;Every single one of those facts feeds directly into Step 3. Nothing is wasted.&rdquo;
      </FromTheCall>

      <div className="bg-[#F5921E]/20 border border-[#F5921E]/30 rounded-xl p-5 mt-6">
        <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">Pro Tip</p>
        <p className="text-slate-200 text-sm leading-relaxed">
          Let them talk. The more they share, the more ammunition you have. If they tell you about a competitor&apos;s quote, you know exactly what to beat — and exactly what they got wrong.
        </p>
      </div>
    </SalesStep>
  )
}
