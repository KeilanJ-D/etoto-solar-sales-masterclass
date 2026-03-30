import MasterclassNav from '@/components/funnel/MasterclassNav'
import Step1Rapport from '@/components/funnel/Step1Rapport'
import Step2Discovery from '@/components/funnel/Step2Discovery'
import Step3EnergyAudit from '@/components/funnel/Step3EnergyAudit'
import Step4BatteryValue from '@/components/funnel/Step4BatteryValue'
import Step5SolarValue from '@/components/funnel/Step5SolarValue'
import Step6Financials from '@/components/funnel/Step6Financials'
import Step7Objections from '@/components/funnel/Step7Objections'
import Step8Close from '@/components/funnel/Step8Close'
import Step9FollowUp from '@/components/funnel/Step9FollowUp'
import Footer from '@/components/funnel/Footer'
import JumpToCalcButton from '@/components/funnel/JumpToCalcButton'
import { TestimonialRow } from '@/components/shared/TestimonialRow'
import { StepProgress } from '@/components/shared/StepProgress'
import { testimonials } from '@/lib/social-proof-data'

export const metadata = {
  title: 'The 9-Step Solar Sales Formula — ETOTO Media',
  description: 'The complete sales process from introduction to deposit. Scripts, formulas, and a live calculator.',
  openGraph: {
    title: 'The 9-Step Solar Sales Formula — ETOTO Media',
    description: 'The complete sales process from introduction to deposit. Scripts, formulas, and a live calculator.',
  },
}

export default function StepsPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      <JumpToCalcButton />
      <StepProgress />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            The Complete Training
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The 9-Step Solar Sales Formula
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            From first contact to signed contract. Each step builds on the last. 
            Master all nine and you&apos;ll close consistently.
          </p>
        </div>
      </section>
      
      {/* All 9 Steps */}
      <Step1Rapport />
      <Step2Discovery />
      <Step3EnergyAudit />
      <Step4BatteryValue />
      <Step5SolarValue />
      <Step6Financials />
      <Step7Objections />
      <Step8Close />
      <Step9FollowUp />
      
      {/* Testimonials */}
      <TestimonialRow 
        testimonials={testimonials.slice(0, 3)} 
        title="Real results from real installers"
      />
      
      <Footer />
    </main>
  )
}
