import MasterclassNav from '@/components/funnel/MasterclassNav'
import LiveCallRecording from '@/components/funnel/LiveCallRecording'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { SalesScriptCTA, QuizCTA } from '@/components/shared/ResourceCTA'
import { InlineProof } from '@/components/shared/InlineProof'
import { NextStepCTA } from '@/components/shared/NextStepCTA'
import { getVideoTestimonialById } from '@/lib/social-proof-data'

export const metadata = {
  title: 'Watch a Real Solar Sales Call — ETOTO Media',
  description: 'Keilan closing a solar deal over the phone. Every step of the 9-step formula applied in real time.',
  openGraph: {
    title: 'Watch a Real Solar Sales Call — ETOTO Media',
    description: 'Keilan closing a solar deal over the phone. Every step of the 9-step formula applied in real time.',
  },
}

export default function LiveCallPage() {
  const haloTestimonial = getVideoTestimonialById('halo')
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* Cinematic Header */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture" />
        
        {/* Cinematic glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E8192C]/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/10 text-white/90 text-sm font-medium rounded-full mb-6">
            Live Demonstration
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Watch a Real Sales Call
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            See every step of the formula applied in a real conversation. 
            This is what it looks like when everything clicks.
          </p>
          
          {/* Pre-roll context */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-2xl mx-auto text-left">
            <h3 className="text-[#E8192C] font-bold text-sm uppercase tracking-wide mb-3">The Setup</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Keilan is calling a homeowner who enquired through a Facebook ad 2 hours ago. 
              They&apos;ve had two other quotes. They haven&apos;t committed to anyone yet. 
              Watch how the 9-step formula turns this into a closed deal.
            </p>
          </div>
        </div>
      </section>
      
      <LiveCallRecording />
      
      {/* Key Moments - consolidated timestamp section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Key Moments
          </h3>
          <div className="grid gap-4">
            {[
              { time: '5:12', insight: 'The customer says "so basically it pays for itself?" — that\'s self-selling. The maths did the work.' },
              { time: '8:30', insight: 'Battery value explained with peak shaving. Instant, tangible savings the customer can visualise.' },
              { time: '14:00', insight: 'The objection is handled without arguing. No pushback, just data and reassurance.' },
              { time: '18:30', insight: 'The proposal is sent DURING the call, not after. That\'s the key to maintaining momentum.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 sm:p-5 bg-white rounded-xl border border-slate-200">
                <span className="flex-shrink-0 px-4 py-2 bg-[#E8192C] text-white text-sm sm:text-base font-bold rounded-lg w-fit min-h-[40px] flex items-center font-mono">
                  {item.time}
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Halo Video Testimonial - Matt's 67 sales result */}
      {haloTestimonial && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
                Result
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;{haloTestimonial.stat}&rdquo;
              </h2>
              <p className="text-slate-600 mt-2">
                Matt from Halo Renewables used this exact method
              </p>
            </div>
            <VideoTestimonial testimonial={haloTestimonial} />
          </div>
        </section>
      )}
      
      {/* SolaFlow + Process Proof */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
              When This Process Runs Through SolaFlow
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              The Method is the Same. SolaFlow Automates Steps 1-3.
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
              <p className="text-3xl font-black text-[#E8192C] mb-1">5 min</p>
              <p className="text-sm text-slate-600">Estimate to call</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
              <p className="text-3xl font-black text-slate-900 mb-1">3 days</p>
              <p className="text-sm text-slate-600">Ad to deposit</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
              <p className="text-3xl font-black text-green-600 mb-1">£24,400</p>
              <p className="text-sm text-slate-600">2 deals, 2 weeks</p>
            </div>
          </div>

          <InlineProof
            quote="The process in the recording is the same process YEERS used through SolaFlow. Ad → Estimate → Call → Survey → Close. £24,400 in the first 2 weeks."
            context="The method is the same. SolaFlow just automates steps 1-3."
            icon="timeline"
            variant="highlight"
          />
        </div>
      </section>
      
      {/* Cross-links */}
      <section className="py-8 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto space-y-4">
          <SalesScriptCTA />
          <QuizCTA />
        </div>
      </section>
      
      <SolaFlowDemo />
      
      {/* Next Step in funnel */}
      <NextStepCTA currentStep="watch" />
      
      <Footer />
    </main>
  )
}
