'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

function AnimatedCounter({ end, prefix = '', suffix = '', duration = 1500 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function ProposalHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
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
      <div className={`flex items-center gap-4 md:gap-8 mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className="bg-slate-900 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-xl">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
            alt="ETOTO Media" 
            className="h-6 md:h-10 object-contain"
          />
        </div>
        <span className="text-[#E8192C] font-black text-xl md:text-3xl animate-pulse">×</span>
        <div className="bg-slate-900 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-xl">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar%20path%20logo-gb9aYzjnVnp3LFRgT565BJqotuLeRG.png" 
            alt="Solar Path" 
            className="h-6 md:h-10 object-contain"
          />
        </div>
      </div>

      {/* Badge */}
      <div className={`mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <span className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs md:text-sm font-medium px-4 py-2 rounded-full shadow-sm">
          <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
          90-Day Solar Scaler — Prepared for Ken Hegarty & Jackie Murphy
        </span>
      </div>

      {/* Main headline */}
      <div className={`text-center max-w-5xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 text-balance">
          From 20 Installs to
          <span className="block text-[#E8192C] relative">
            50.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/20" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="3" className="animate-draw" />
            </svg>
          </span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-3">
          You have built a business that installs quality systems with teams people actually like. 
          You have invested in customer experience infrastructure most installers ignore.
        </p>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto">
          Now it is time to feed it the volume it deserves.
        </p>
      </div>

      {/* Animated stats */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-10 md:mt-14 w-full max-w-3xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="text-center px-2 md:px-6 py-4 md:py-6 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <p className="text-2xl md:text-5xl font-black text-slate-900 transition-transform group-hover:scale-110">
            <AnimatedCounter end={12000} prefix="€" />
          </p>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2">Your Average Order Value</p>
        </div>
        
        <div className="text-center px-2 md:px-6 py-4 md:py-6 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <p className="text-2xl md:text-5xl font-black transition-transform group-hover:scale-110">
            <span className="text-slate-900">20</span>
            <span className="text-slate-400 mx-2">→</span>
            <span className="text-[#E8192C]">50</span>
          </p>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2">Monthly Install Target</p>
        </div>
        
        <div className="text-center px-2 md:px-6 py-4 md:py-6 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
          <p className="text-2xl md:text-5xl font-black text-[#22C55E] transition-transform group-hover:scale-110">
            <AnimatedCounter end={600} prefix="€" suffix="K" />
          </p>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2">Monthly Revenue at Target</p>
        </div>
      </div>

      {/* CTA Button */}
      <a 
        href="#where-you-are"
        className={`mt-10 md:mt-12 inline-flex items-center gap-2 md:gap-3 bg-[#E8192C] hover:bg-[#D01622] text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#E8192C]/30 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '700ms' }}
      >
        See the Plan
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
