import MasterclassNav from '@/components/funnel/MasterclassNav'
import LiveCallRecording from '@/components/funnel/LiveCallRecording'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import { TestimonialRow } from '@/components/shared/TestimonialRow'
import { testimonials } from '@/lib/social-proof-data'

export const metadata = {
  title: 'Watch a Real Solar Sales Call — ETOTO Media',
  description: 'Keilan closing a solar deal over the phone. Every step of the 9-step formula applied in real time.',
  openGraph: {
    title: 'Watch a Real Solar Sales Call — ETOTO Media',
    description: 'Keilan closing a solar deal over the phone. Every step of the 9-step formula applied in real time.',
  },
}

export default function LiveCallPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            Live Demonstration
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Watch a Real Sales Call
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            See every step of the formula applied in a real conversation. 
            This is what it looks like when everything clicks.
          </p>
        </div>
      </section>
      
      <LiveCallRecording />
      
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
              <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="flex-shrink-0 px-2.5 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs font-bold rounded">
                  {item.time}
                </span>
                <p className="text-slate-700 text-sm sm:text-base">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialRow 
        testimonials={testimonials.slice(0, 3)} 
        title="What our clients say"
      />
      
      <SolaFlowDemo />
      
      <Footer />
    </main>
  )
}
