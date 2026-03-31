import MasterclassNav from '@/components/funnel/MasterclassNav'
import LiveCallRecording from '@/components/funnel/LiveCallRecording'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'

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
      
      <LiveCallRecording />
      
      {/* Key Moments - 1x1 cards */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            Key Moments
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { time: '5:12', title: 'Self-Selling', insight: 'Customer says "so basically it pays for itself?" The maths did the work.' },
              { time: '8:30', title: 'Battery Value', insight: 'Peak shaving explained. Instant, tangible savings they can visualise.' },
              { time: '14:00', title: 'Objection Handled', insight: 'No pushback, just data and reassurance. No arguing.' },
              { time: '18:30', title: 'Proposal Sent Live', insight: 'Sent DURING the call, not after. Maintains momentum.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#E8192C] text-white text-sm font-bold rounded-lg font-mono">
                    {item.time}
                  </span>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.insight}</p>
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
            quote="The process in the recording is the same process Green Energy Solar used through SolaFlow. Ad → Estimate → Call → Survey → Close. £24,400 in the first 2 weeks."
            context="The method is the same. SolaFlow just automates steps 1-3."
            icon="timeline"
            variant="highlight"
          />
        </div>
      </section>
      
      <SolaFlowDemo />
      
      {/* Next Step in funnel */}
      <section className="py-8 px-4 sm:px-6 bg-white">
        <NextStepCTA currentStep="watch" />
      </section>
      
      <Footer />
    </main>
  )
}
