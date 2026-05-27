'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  
  const steps = useCountUp(9, 1500, showStats)
  const avgGP = useCountUp(2500, 1800, showStats)
  const avgMins = useCountUp(25, 1200, showStats)

  useEffect(() => {
    setIsVisible(true)
    // Trigger count-up immediately on mount — the previous 800ms delay
    // meant first paint showed "0 Steps · £0+ · <0 mins" before the
    // animation kicked in. Now stats animate from 0 → target right away
    // and the visible 0-state only flashes for a single frame at most.
    setShowStats(true)
  }, [])

  const stats = [
    { 
      value: steps, 
      suffix: ' Steps', 
      label: 'The complete sales flow', 
      color: '#E8192C',
    },
    { 
      prefix: '£',
      value: avgGP, 
      suffix: '+', 
      label: 'Average GP per closed deal', 
      color: '#F5921E',
    },
    { 
      prefix: '<',
      value: avgMins, 
      suffix: ' mins', 
      label: 'Average call to close', 
      color: '#E8192C',
    },
  ]

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-slate-50/50 to-red-50/30 overflow-hidden">
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

      {/* Logo - ETOTO wordmark, confident and large */}
      <div className={`mb-8 md:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ETOTO_Joel-Sp4sI6W29ziGLLM0CGKbh7tBi3HDbM.png" 
          alt="ETOTO Media" 
          width={200}
          height={56}
          style={{ width: 'auto', height: 'auto', maxHeight: '56px', maxWidth: '100%' }}
          className="object-contain"
        />
      </div>

      {/* Badge — single merged credibility pill */}
      <div className={`mb-6 flex justify-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <a
          href="/agency"
          className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-xs md:text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:border-amber-300 hover:bg-amber-50/40 transition-all"
        >
          <svg className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/>
          </svg>
          <span className="font-semibold text-slate-900">Award-winning agency</span>
          <span className="text-slate-300">·</span>
          <span>200+ UK installers</span>
        </a>
      </div>

      {/* Main headline */}
      <div className={`text-center max-w-5xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 text-balance">
          Sell Solar Like You Built It.
          <span className="block text-[#E8192C] relative">
            The 9-Step Formula That Closes.
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#E8192C]/20" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="currentColor" strokeWidth="3" className="animate-draw" />
            </svg>
          </span>
        </h1>
        <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A complete sales system for solar installers — from the first phone call to the 25% deposit. Scripts, live maths, real call recordings, and the exact formula we use across <span className="font-semibold text-slate-900">200+ clients</span>.
        </p>
      </div>

      {/* Animated stats */}
      <div className={`grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-14 w-full max-w-3xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="text-center relative"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div 
              className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 md:hover:-translate-y-2 group h-full"
            >
              <p className="text-lg sm:text-2xl md:text-5xl font-black transition-transform group-hover:scale-110" style={{ color: stat.color }}>
                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-medium mt-1 md:mt-2 leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
        <a 
          href="#problem"
          className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-[#E8192C]/30 group min-h-[48px] touch-action-manipulation"
        >
          Learn The Formula
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
        </a>
        <a 
          href="/live-call"
          className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-slate-100 text-slate-700 px-6 sm:px-8 py-3.5 sm:py-4 text-base font-medium rounded-full transition-all duration-300 border border-slate-200 hover:border-slate-300 min-h-[48px] touch-action-manipulation group"
        >
          Watch It Work
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

          </section>
  )
}
