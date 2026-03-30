'use client'

import dynamic from 'next/dynamic'
import SalesStep, { ScriptBox, WhyCard, FormulaBlock, ExampleBlock } from './SalesStep'

// Dynamic import - FormulaCalculator is 1,200+ lines with Recharts
const FormulaCalculator = dynamic(() => import('./FormulaCalculator'), {
  loading: () => (
    <div className="bg-white rounded-xl border border-slate-200 p-8 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-6" />
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[1,2,3,4,5].map(i => <div key={i} className="h-10 bg-slate-100 rounded" />)}
      </div>
      <div className="space-y-4">
        <div className="h-12 bg-slate-100 rounded" />
        <div className="h-12 bg-slate-100 rounded" />
        <div className="h-32 bg-slate-100 rounded" />
      </div>
    </div>
  ),
  ssr: false,
})

export default function Step3EnergyAudit() {
  return (
    <SalesStep
      id="step-3"
      stepNumber={3}
      title="The Energy Audit — Do the Maths Live"
      goal="Become the expert in the room in 60 seconds."
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">The Formula</h3>
      <FormulaBlock>
        <div className="space-y-2">
          <p>Annual spend ÷ Unit rate = <span className="text-[#E8192C] font-bold">Annual kWh</span></p>
          <p>Annual kWh ÷ 365 = <span className="text-[#E8192C] font-bold">Daily kWh</span></p>
          <p>Daily kWh × Unit rate = <span className="text-[#E8192C] font-bold">Daily running cost</span></p>
        </div>
      </FormulaBlock>

      <ExampleBlock title="Example from the call">
        <div className="space-y-1">
          <p>£1,200 ÷ £0.2189 = <span className="text-[#E8192C] font-bold">5,714 kWh</span> per year</p>
          <p>5,714 ÷ 365 = <span className="text-[#E8192C] font-bold">15.65 kWh</span> per day</p>
          <p>15.65 × £0.2189 = <span className="text-[#E8192C] font-bold">£3.28</span> per day</p>
        </div>
        <p className="mt-4 text-slate-600 font-sans not-italic">&ldquo;Your house costs £3.28 a day to run.&rdquo;</p>
      </ExampleBlock>

      <ScriptBox title="What to Say">
{`"So if you're spending £1,200 a year at roughly 21p per unit, let me work that out for you. That means your home uses around 5,714 kilowatt hours per year, or about 15 to 16 kWh per day.

That's really useful because it tells us exactly how much energy your home needs on an average day. And now I can show you how we change that number."`}
      </ScriptBox>

      <h3 className="text-lg font-bold text-slate-900 mb-4">Why You Do This Live</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <WhyCard title="They hear you calculating">
          Not reading from a script. This builds immediate credibility.
        </WhyCard>
        <WhyCard title="They can follow along">
          And verify the numbers themselves. Trust through transparency.
        </WhyCard>
        <WhyCard title="Creates a baseline">
          £3.28/day becomes the anchor you&apos;ll dramatically reduce next.
        </WhyCard>
        <WhyCard title="Positions you as the expert">
          &ldquo;This person knows their stuff.&rdquo;
        </WhyCard>
      </div>

      {/* Interactive Calculator */}
      <div className="mt-10">
        <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Try It Yourself</h3>
        <p className="text-slate-500 text-center text-sm mb-6">Enter your numbers to see the maths in action</p>
        <FormulaCalculator />
      </div>
    </SalesStep>
  )
}
