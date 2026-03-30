'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Battery, Sun, Calculator } from 'lucide-react'

const steps = [
  { number: 1, title: 'Introduction & Rapport', subtitle: 'Set the tone in 30 seconds' },
  { number: 2, title: 'Discovery', subtitle: 'Understand their world before you pitch' },
  { number: 3, title: 'Energy Audit', subtitle: 'Live maths, their real numbers' },
  { number: 4, title: 'Battery Value', subtitle: 'Show the saving FIRST' },
  { number: 5, title: 'Solar Value', subtitle: 'Then show the income' },
  { number: 6, title: 'Combined Financials', subtitle: 'Total benefit + payback' },
  { number: 7, title: 'Objections', subtitle: 'Handle with data, not pressure' },
  { number: 8, title: 'Close', subtitle: 'Proposal on-call, deposit secured' },
  { number: 9, title: 'Follow-Up', subtitle: 'Stay in control of the timeline' },
]

const principles = [
  { 
    icon: Battery, 
    text: 'Battery = Savings. Solar = Income. Always lead with savings.' 
  },
  { 
    icon: Calculator, 
    text: 'Do the maths live. Never send a quote the customer hasn\'t already seen the numbers for.' 
  },
  { 
    icon: Sun, 
    text: 'The customer should know their payback period before you tell them the price.' 
  },
]

export default function TheMethod() {
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
    <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase">
            The ETOTO Method
          </span>
        </div>

        {/* Main headline */}
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-center mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          The 9-Step Formula
        </h2>

        {/* Body text */}
        <p className={`text-lg md:text-xl text-slate-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          This is the exact process used on every sales call. It works over the phone. It works in person. It works because the maths does the selling for you.
        </p>

        {/* 9 Step Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-[#E8192C]/30 hover:bg-white/10 transition-all duration-300"
              style={{ transitionDelay: `${400 + index * 50}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#E8192C] flex items-center justify-center flex-shrink-0 font-black text-lg">
                {step.number}
              </div>
              <div>
                <h3 className="font-bold text-white text-sm md:text-base">{step.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm mt-0.5">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Principle cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="bg-[#E8192C]/20 border border-[#E8192C]/30 rounded-xl p-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#E8192C]/30 flex items-center justify-center mx-auto mb-3">
                <principle.icon className="w-6 h-6 text-[#E8192C]" />
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{principle.text}</p>
            </div>
          ))}
        </div>

        {/* Scroll CTA */}
        <div className={`flex flex-col items-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-slate-400 text-sm mb-4">Let&apos;s break each one down</p>
          <a href="#step1" className="w-12 h-12 rounded-full border-2 border-[#E8192C] flex items-center justify-center animate-bounce hover:bg-[#E8192C]/20 transition-colors">
            <ChevronDown className="w-5 h-5 text-[#E8192C]" />
          </a>
        </div>
      </div>
    </section>
  )
}
