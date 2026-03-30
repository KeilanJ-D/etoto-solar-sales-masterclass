'use client'

import { useEffect, useRef, useState } from 'react'
import { Smartphone, User, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const useCases = [
  {
    icon: Smartphone,
    title: 'For Appointment Setters',
    description: 'Run the customer through SolaFlow while on the phone. They enter their postcode, property type, and energy usage. SolaFlow generates an instant recommendation with pricing. The customer has a number before the appointment is even booked.',
  },
  {
    icon: User,
    title: 'For Sales Reps (in-person)',
    description: 'SolaFlow\'s estimate becomes the starting point. Once you\'re on-site and can see the roof, you design the REAL system. 9 times out of 10: "We can actually fit more panels than SolaFlow estimated, and your system costs less than the initial quote." The customer feels they\'re getting a better deal.',
  },
  {
    icon: TrendingUp,
    title: 'The Psychology',
    description: 'SolaFlow sets a price anchor HIGH. The rep delivers a more accurate quote that\'s often LOWER. The customer feels value — not an upsell. This is the "good news" close.',
  },
]

export default function SolaFlowDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-sm font-medium text-[#F5921E] tracking-wide uppercase">
            Your Secret Weapon
          </span>
        </div>

        {/* Main headline */}
        <h2 className={`text-3xl md:text-5xl font-black text-center mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          SolaFlow — The Tool That Warms Leads Before You Arrive
        </h2>

        {/* Body text */}
        <p className={`text-lg md:text-xl text-slate-300 text-center max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Your appointment setters use this on the initial call. The customer gets an instant estimate before the sales rep even shows up.
        </p>

        {/* SolaFlow Embed */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-white">
            <iframe
              src="https://vercel-solar-estimator.vercel.app"
              width="100%"
              frameBorder="0"
              loading="lazy"
              className="w-full h-[500px] md:h-[700px] lg:h-[800px]"
              title="SolaFlow Solar Estimator"
            />
          </div>
        </div>

        {/* SolaFlow CTA */}
        <div className={`mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-white/10 text-center transition-all duration-700 delay-350 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-base sm:text-lg text-slate-300 mb-4">
            Want this branded to <strong className="text-white">YOUR</strong> business? <span className="text-[#F5921E] font-semibold">SolaFlow — £200/month</span>
          </p>
          <Link
            href="/solaflow"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-bold py-4 px-6 rounded-xl sm:rounded-full transition-all min-h-[56px] touch-action-manipulation"
          >
            <span>Get SolaFlow for Your Business</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Use Case Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E8192C]/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#E8192C]" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{useCase.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
