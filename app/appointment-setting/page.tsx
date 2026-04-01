import MasterclassNav from '@/components/funnel/MasterclassNav'
import AppointmentSetting from '@/components/funnel/AppointmentSetting'
import Footer from '@/components/funnel/Footer'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { AppointmentQuizCTA, SolaFlowCTA } from '@/components/shared/ResourceCTA'
import { NextStepCTA } from '@/components/shared/NextStepCTA'
import { getVideoTestimonialById } from '@/lib/social-proof-data'

export const metadata = {
  title: 'Solar Appointment Setter Playbook — ETOTO Media',
  description: 'How to qualify leads, build excitement, and book appointments that close. The complete setter\'s guide.',
  openGraph: {
    title: 'Solar Appointment Setter Playbook — ETOTO Media',
    description: 'How to qualify leads, build excitement, and book appointments that close. The complete setter\'s guide.',
  },
}

export default function AppointmentSettingPage() {
  const carterVideo = getVideoTestimonialById('carter-electrical')
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            For Appointment Setters
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The Setter Playbook
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Your job isn&apos;t to sell solar. It&apos;s to book appointments that close. 
            Here&apos;s how to qualify, position, and hand off like a pro.
          </p>
        </div>
      </section>
      
      <AppointmentSetting />
      
      {/* RESULTS FROM THE FIELD - Stat-led section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
              Results from the field
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              What appointment setters achieve
            </h2>
          </div>
          
          {/* Three key stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-black text-[#E8192C] mb-2">5 min</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">Estimate to call</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">50%</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">Close rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-black text-[#E8192C] mb-2">5 wks</p>
              <p className="text-sm sm:text-base text-slate-600 font-medium">Booked ahead</p>
            </div>
          </div>

          {/* Testimonial quotes as inline text */}
          <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 space-y-4 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <span className="text-sm font-semibold text-[#E8192C] uppercase tracking-wide">MCJ</span>
              <p className="text-slate-700">&ldquo;Phil&apos;s now booking 5 weeks out.&rdquo;</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-sm font-semibold text-[#E8192C] uppercase tracking-wide">Alltech</span>
                <p className="text-slate-700">&ldquo;7 appts/week, 50% close rate&rdquo;</p>
              </div>
            </div>
          </div>

          {/* Carter Electrical Video Testimonial */}
          {carterVideo && (
            <div className="mb-10">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs sm:text-sm font-medium rounded-full mb-2">
                  Client success story
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  &ldquo;{carterVideo.stat}&rdquo;
                </h3>
              </div>
              <VideoTestimonial testimonial={carterVideo} />
            </div>
          )}

          {/* CTAs side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppointmentQuizCTA />
            <SolaFlowCTA />
          </div>
        </div>
      </section>
      
      {/* Next Step in funnel */}
      <section className="py-8 px-4 sm:px-6 bg-white border-t border-slate-100">
        <NextStepCTA currentStep="watch" />
      </section>
      
      <Footer />
    </main>
  )
}
