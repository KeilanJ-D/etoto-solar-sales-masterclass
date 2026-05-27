import Link from 'next/link'
import { Headphones } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import StepsNav from '@/components/funnel/StepsNav'
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
import { TestimonialRow } from '@/components/shared/TestimonialRow'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { SalesScriptCTA, FormulaCheatSheetCTA } from '@/components/shared/ResourceCTA'
import { InlineProof } from '@/components/shared/InlineProof'
import { NextStepCTA } from '@/components/shared/NextStepCTA'
import { getTestimonialsByIds, getVideoTestimonialById } from '@/lib/social-proof-data'

export const metadata = {
  title: 'The 9-Step Solar Sales Formula — ETOTO Media',
  description: 'The complete sales process from introduction to deposit. Scripts, formulas, and a live calculator.',
  openGraph: {
    title: 'The 9-Step Solar Sales Formula — ETOTO Media',
    description: 'The complete sales process from introduction to deposit. Scripts, formulas, and a live calculator.',
  },
}

export default function StepsPage() {
  const ukRenewablesVideo = getVideoTestimonialById('uk-renewables')
  const endTestimonials = getTestimonialsByIds(['yeers', 'mcj', 'alltech'])
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      <StepsNav />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            The Complete Training
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The 9-Step Solar Sales Formula
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            From first contact to signed contract. Each step builds on the last.
            Master all nine and you&apos;ll close consistently.
          </p>
          <Link
            href="/live-call"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 rounded-full text-sm font-semibold text-white transition-all"
          >
            <Headphones className="w-4 h-4" />
            Hear all 9 steps in one recorded close (45 min)
          </Link>
        </div>
      </section>
      
      {/* Steps 1-3 */}
      <Step1Rapport />
      <Step2Discovery />
      <Step3EnergyAudit />
      
      {/* Solar Solutions Oxford Proof - After Step 3 */}
      <section className="py-6 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
          <InlineProof
            quote="A Solar Solutions Oxford customer completed their SolaFlow estimate at 6:17 PM. By 6:22 PM, a rep was on the phone. The maths were already done."
            context="In the real world — the energy audit step can be automated by SolaFlow"
            icon="timeline"
            variant="highlight"
          />
        </div>
      </section>
      
      {/* Cross-link after Step 3 */}
      <section className="py-6 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <FormulaCheatSheetCTA />
        </div>
      </section>
      
      {/* Steps 4-7 */}
      <Step4BatteryValue />
      <Step5SolarValue />
      <Step6Financials />
      <Step7Objections />
      
      {/* Crafted Electrics Proof - After Step 7 (Objections) */}
      <section className="py-6 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
          <InlineProof
            quote="I've had another quote cheaper, but using Fox equipment and I've looked online and seen that the Sigenergy stuff is loads better like you said."
            context="Real objection from a Crafted Electrics customer — they overcame it themselves because SolaFlow pre-educated them on product quality"
            icon="quote"
            variant="highlight"
          />
        </div>
      </section>
      
      {/* UK Renewables Video Testimonial */}
      {ukRenewablesVideo && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
                Client Success Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;{ukRenewablesVideo.stat}&rdquo;
              </h2>
            </div>
            <VideoTestimonial testimonial={ukRenewablesVideo} />
          </div>
        </section>
      )}
      
      {/* Steps 8-9 */}
      <Step8Close />
      
      {/* UPS Solar Proof - After Step 8 (Close) */}
      <section className="py-6 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
          <InlineProof
            quote="Cheers! Deposit paid."
            context="Deposit paid same day as proposal. Total time from ad to deposit: 3 days. System value: £13,100. — UPS Solar customer"
            icon="stat"
            variant="highlight"
          />
        </div>
      </section>
      
      <Step9FollowUp />
      
      {/* Cross-link after Step 9 */}
      <section className="py-8 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <SalesScriptCTA />
        </div>
      </section>
      
      {/* Testimonials - specific ones */}
      <TestimonialRow 
        testimonials={endTestimonials} 
        title="Real results from real installers"
      />
      
      {/* Next Step in funnel */}
      <section className="py-8 px-4 sm:px-6 bg-white">
        <NextStepCTA currentStep="learn" />
      </section>
      
      <Footer />
    </main>
  )
}
