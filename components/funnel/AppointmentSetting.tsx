'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, XCircle, UserCheck, Check, X } from 'lucide-react'

const qualifications = [
  'Homeowner (not renting)',
  'Monthly electricity bill £100+ (ideally £150+)',
  'Planning to stay in the property 5+ years',
  'Suitable roof (not exclusively north-facing, not heavily shaded)',
  'Decision-maker available for the appointment',
]

const redFlags = [
  { flag: 'Renting the property', action: 'disqualify' },
  { flag: 'Moving in less than 6 months', action: 'flag to sales' },
  { flag: 'Under £80/month electricity', action: 'low ROI, flag' },
  { flag: 'Listed building or conservation area', action: 'needs research, not auto-DQ' },
]

const positioning = [
  { text: '"We\'ll review whether solar and battery makes financial sense for your home."', correct: true },
  { text: '"We\'re coming to sell you solar."', correct: false },
  { text: '"We guarantee savings."', correct: false },
  { text: '"It\'s free so you may as well."', correct: false },
]

export default function AppointmentSetting() {
  const sectionRef = useRef<HTMLElement>(null)
  // Render visibly from first paint — observer-gated visibility hid the
  // appointment setting section.
  const [isVisible] = useState(true)

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-red-50/30 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <UserCheck className="w-4 h-4 text-[#E8192C]" />
          <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">
            Appointment Setters
          </span>
        </div>

        {/* Main headline */}
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black text-center mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Make It Impossible for the Rep NOT to Close
        </h2>

        {/* Body text */}
        <p className={`text-base md:text-lg text-slate-500 text-center max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Your job is not to sell solar. Your job is to qualify the lead, build excitement, and hand a warm prospect to the sales rep.
        </p>

        {/* The Role Definition */}
        <div className={`bg-slate-900 text-white rounded-xl p-6 mb-10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm md:text-base leading-relaxed">
            <span className="font-bold">The Role:</span> Qualify the lead. Build excitement using SolaFlow. Book the appointment. Hand over clean intel. That&apos;s it.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Qualification Checklist */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Qualification Checklist
            </h3>
            <div className="space-y-3">
              {qualifications.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Red Flags
            </h3>
            <div className="space-y-3">
              {redFlags.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-700 text-sm font-medium">{item.flag}</span>
                    <span className="text-slate-500 text-sm"> → {item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Position */}
        <div className={`mb-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="font-bold text-slate-900 mb-4 text-center">How to Position the Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {positioning.map((item, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  item.correct 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.correct ? 'bg-green-600' : 'bg-slate-400'
                }`}>
                  {item.correct ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <X className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className={`text-sm ${item.correct ? 'text-green-800 font-medium' : 'text-slate-600'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Script */}
        <div className={`bg-slate-900 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-slate-400 text-sm font-medium">Booking Script</span>
          </div>
          <div className="text-slate-100 text-sm md:text-base leading-relaxed font-mono whitespace-pre-wrap break-words overflow-hidden">
{`"Based on what you've told me and the estimate from our calculator, it looks like a system could save you around [SolaFlow estimate] per year.

What we'd like to do is send one of our energy consultants to take a proper look at your roof and confirm those numbers.

It's a free, no-obligation visit — they'll design the system right there and show you exactly what the savings and income look like.

Can we get that booked in?"`}
          </div>
        </div>
      </div>
    </section>
  )
}
