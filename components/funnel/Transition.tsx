'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Users, Target, AlertCircle, Clock } from 'lucide-react'

export default function Transition() {
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

  const meetingPoints = [
    { icon: Target, text: 'Your current run rate: 20 installs/month at €12,000 AOV' },
    { icon: Users, text: 'Your target: 50 installs/month with 2nd install team ready to deploy' },
    { icon: AlertCircle, text: 'Your frustration: 3+ disconnected providers, none of them talking to each other' },
    { icon: Clock, text: 'Your timeline: current agency gone end of March, decision needed now' },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F5921E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Calendar className="w-4 h-4 text-[#E8192C]" />
          <span className="text-sm font-medium text-slate-400 tracking-wide uppercase">
            24th March 2026 — Post-Meeting Proposal
          </span>
        </div>

        {/* Main headline */}
        <h2 className={`text-3xl md:text-5xl lg:text-6xl font-black text-center mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          We've Talked. <span className="text-[#E8192C]">Now Let's Build.</span>
        </h2>

        {/* Body text */}
        <p className={`text-lg md:text-xl text-slate-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Everything above was produced before we'd even spoken. Based on public data only. On our call, we went deeper — into your numbers, your sales process, your CRM, your targets. What follows is the commercial engine designed specifically for Solar Path, built around everything we now know.
        </p>

        {/* Meeting context bullets */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {meetingPoints.map((point, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-300"
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#E8192C]/20 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-[#E8192C]" />
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Divider arrow */}
        <div className={`flex justify-center mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-12 h-12 rounded-full border-2 border-[#E8192C] flex items-center justify-center animate-bounce">
            <svg className="w-5 h-5 text-[#E8192C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
