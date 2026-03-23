'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-br from-white via-[#FEFBFB] to-[#FFF9F5] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8192C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#E8192C]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F5921E]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Logos */}
      <div className={`flex items-center gap-4 md:gap-6 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
          alt="ETOTO Media" 
          className="h-10 md:h-14 object-contain"
        />
        <span className="text-[#E8192C] font-black text-2xl md:text-3xl">×</span>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
          alt="Solar Path" 
          className="h-10 md:h-14 object-contain"
        />
      </div>

      {/* Main headline */}
      <div className={`text-center max-w-5xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-[#E8192C] font-semibold tracking-widest uppercase text-sm md:text-base mb-4">
          Exclusive Website Audit
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A2E] leading-[1.1] mb-6 text-balance">
          Your Website Is
          <span className="block text-[#E8192C]">Leaking Leads.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed mb-4">
          We have conducted a forensic audit of <span className="font-semibold text-[#1A1A2E]">solarpath.ie</span> and discovered critical gaps costing you thousands in lost revenue every month.
        </p>
        <p className="text-base text-[#718096] max-w-xl mx-auto">
          This complimentary audit reveals exactly where your digital presence is underperforming — and how to fix it.
        </p>
      </div>

      {/* Stats preview */}
      <div className={`grid grid-cols-3 gap-3 md:gap-8 mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {[
          { value: '34/100', label: 'SEO Score', color: '#DC2626' },
          { value: '6', label: 'Critical Issues', color: '#E8192C' },
          { value: '£47K+', label: 'Revenue at Risk', color: '#F5921E' },
        ].map((stat, i) => (
          <div key={i} className="text-center px-3 md:px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <p className="text-xl md:text-4xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs md:text-sm text-[#64748B] font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <a 
        href="#problems"
        className={`mt-10 inline-flex items-center gap-3 bg-[#E8192C] hover:bg-[#D01622] text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#E8192C]/20 ${isVisible ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-8'}`}
      >
        See What We Found
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-xs text-[#94A3B8] uppercase tracking-widest">Scroll to explore</span>
      </div>
    </section>
  )
}
