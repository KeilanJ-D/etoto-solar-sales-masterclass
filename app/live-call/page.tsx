import MasterclassNav from '@/components/funnel/MasterclassNav'
import LiveCallRecording from '@/components/funnel/LiveCallRecording'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { SalesScriptCTA, QuizCTA } from '@/components/shared/ResourceCTA'
import { InlineProof } from '@/components/shared/InlineProof'
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
      
      {/* Video Timestamps + Chapters */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#E8192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Call Chapters
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { time: '0:00', step: '1', label: 'Rapport', desc: 'Quick intro, set expectations' },
              { time: '2:15', step: '2', label: 'Discovery', desc: 'Understanding their situation' },
              { time: '5:12', step: '3', label: 'Energy Audit', desc: 'The maths that sells itself' },
              { time: '8:30', step: '4', label: 'Battery Value', desc: 'Peak shaving explained' },
              { time: '11:00', step: '5', label: 'Solar Value', desc: 'Real savings, no fluff' },
              { time: '14:00', step: '6', label: 'Objection', desc: 'Handled with data' },
              { time: '16:45', step: '7', label: 'Finance', desc: 'Monthly vs lump sum' },
              { time: '18:30', step: '8', label: 'Close', desc: 'The money moment' },
              { time: '20:00', step: '9', label: 'Follow-up', desc: 'Proposal sent live' },
            ].map((chapter, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 card-lift group cursor-pointer">
                <span className="flex-shrink-0 w-8 h-8 bg-[#E8192C] text-white text-xs font-bold rounded-lg flex items-center justify-center">
                  {chapter.step}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm group-hover:text-[#E8192C] transition-colors">{chapter.label}</p>
                  <p className="text-slate-500 text-xs truncate">{chapter.desc}</p>
                </div>
                <span className="text-[#E8192C] text-xs font-mono font-medium">{chapter.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to listen for */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Things to notice in this call
          </h3>
          <div className="grid gap-4">
            {[
              { time: '5:12', insight: 'The customer says "so basically it pays for itself?" — that\'s self-selling. The maths did the work.' },
              { time: 'Step 6', insight: 'He doesn\'t mention price until Step 6. The customer is already sold on the value before they hear a number.' },
              { time: '14:00', insight: 'The objection is handled without arguing. No pushback, just data and reassurance.' },
              { time: 'End', insight: 'The proposal is sent DURING the call, not after. That\'s the key to maintaining momentum.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="flex-shrink-0 px-3 py-1.5 bg-[#E8192C] text-white text-xs font-bold rounded-lg">
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
      
      <Footer />
    </main>
  )
}
