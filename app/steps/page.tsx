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
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { StepProgress } from '@/components/shared/StepProgress'
import { SalesScriptCTA, FormulaCheatSheetCTA } from '@/components/shared/ResourceCTA'
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
      
      {/* Steps 1-3 */}
      <Step1Rapport />
      <Step2Discovery />
      <Step3EnergyAudit />
      
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
      
      <Footer />
    </main>
  )
}
