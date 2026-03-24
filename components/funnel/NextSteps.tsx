'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, FileSignature, CreditCard, Rocket, ArrowRight, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Calendar,
    title: 'Book Strategy Call',
    description: 'Pick a 30-minute slot this week. We will walk through this proposal together and answer any questions.',
    cta: 'Book Now',
    ctaLink: 'https://calendly.com/etotomedia',
  },
  {
    icon: FileSignature,
    title: 'Sign Agreement',
    description: 'Simple, plain-English contract. 3-month initial term. No hidden clauses.',
    cta: null,
  },
  {
    icon: CreditCard,
    title: 'First Invoice',
    description: '£2,000 for Month 1. Payable upon signing. Then monthly on the same date.',
    cta: null,
  },
  {
    icon: Rocket,
    title: 'We Launch',
    description: 'Week 1 kick-off. Blog content live. CRM set up. Ads in review. You start seeing progress immediately.',
    cta: null,
  },
]

export default function NextSteps() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            What Happens Next
          </h2>
          <p className="text-base md:text-lg text-slate-500">
            Four simple steps to start generating more leads for Solar Path.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4 md:space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <div className="flex items-start gap-4 md:gap-6 bg-white border border-slate-200 rounded-xl p-5 md:p-6 hover:border-[#E8192C] hover:shadow-lg transition-all duration-300 group">
                  {/* Step number + icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#E8192C]/10 flex items-center justify-center group-hover:bg-[#E8192C] transition-colors duration-300">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#E8192C] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#E8192C] text-white text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm md:text-base text-slate-500">{step.description}</p>
                    
                    {step.cta && (
                      <a 
                        href={step.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-[#E8192C] font-semibold text-sm hover:underline"
                      >
                        {step.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Completion indicator */}
                  <div className="flex-shrink-0 hidden md:block">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-[#22C55E] group-hover:bg-[#22C55E] transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-slate-200 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 md:left-7 top-full w-0.5 h-4 md:h-6 bg-slate-200" />
                )}
              </div>
            )
          })}
        </div>

        {/* Urgency note */}
        <div className={`mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-[#E8192C]/5 border border-[#E8192C]/20 rounded-xl p-6 text-center">
            <p className="text-slate-700">
              <span className="font-bold text-[#E8192C]">Launch partner pricing expires 31st March.</span>
              <br className="hidden md:block" />
              After that, the retainer returns to £3,000/month.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
