'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  
  const seoScore = useCountUp(34, 1500, showStats)
  const issues = useCountUp(6, 1200, showStats)
  const revenue = useCountUp(47, 1800, showStats)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setShowStats(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 py-16 md:py-20 bg-gradient-to-br from-white via-slate-50/50 to-red-50/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-[#E8192C]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 md:w-[500px] md:h-[500px] bg-[#F5921E]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#E8192C]/3 to-[#F5921E]/3 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#E8192C]/20 rounded-full animate-float hidden md:block"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        />
      ))}

      {/* Logos */}
      <div className={`flex items-center gap-3 md:gap-6 mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
          alt="ETOTO Media" 
          className="h-8 md:h-14 object-contain"
        />
        <span className="text-[#E8192C] font-black text-xl md:text-3xl animate-pulse">×</span>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
          alt="Solar Path" 
          className="h-8 md:h-14 object-contain"
        />
      </div>

      {/* Badge */}
      <div className={`mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs md:text-sm font-medium px-4 py-2 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
          Exclusive Website Audit — March 2026
        </span>
      </div>

      {/* Main headline */}
      <div className={`text-center max-w-5xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 text-balance">
          Your Website Is
          <span className="block text-[#E8192C] relative">
            Leaking Leads.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/20" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="3" className="animate-draw" />
            </svg>
          </span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-3">
          We have conducted a forensic audit of <span className="font-semibold text-slate-900">solarpath.ie</span> and discovered critical gaps costing you thousands in lost revenue every month.
        </p>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
          This complimentary audit reveals exactly where your digital presence is underperforming — and how to fix it.
        </p>
      </div>

      {/* Animated stats */}
      <div className={`grid grid-cols-3 gap-2 md:gap-6 mt-10 md:mt-14 w-full max-w-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {[
          { value: seoScore, suffix: '/100', label: 'SEO Score', color: '#DC2626' },
          { value: issues, suffix: '', label: 'Critical Issues', color: '#E8192C' },
          { value: revenue, prefix: '£', suffix: 'K+', label: 'Revenue at Risk', color: '#F5921E' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="text-center px-2 md:px-6 py-4 md:py-6 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-default"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p className="text-2xl md:text-5xl font-black transition-transform group-hover:scale-110" style={{ color: stat.color }}>
              {stat.prefix}{stat.value}{stat.suffix}
            </p>
            <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a 
        href="#problems"
        className={`mt-10 md:mt-12 inline-flex items-center gap-2 md:gap-3 bg-[#E8192C] hover:bg-[#D01622] text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#E8192C]/30 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '700ms' }}
      >
        See What We Found
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
      </a>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
