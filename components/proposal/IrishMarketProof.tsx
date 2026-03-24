'use client'

import { useEffect, useState, useRef } from 'react'
import { TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react'

function AnimatedCounter({ end, decimals = 0, prefix = '', suffix = '', duration = 1500 }: { end: number; decimals?: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

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
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>
}

function AnimatedBar({ width, color, delay = 0 }: { width: number; color: string; delay?: number }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), delay)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="h-full transition-all duration-1000 ease-out"
      style={{
        width: animated ? `${width}%` : '0%',
        backgroundColor: color,
      }}
    />
  )
}

export default function IrishMarketProof() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="proof" className="py-16 md:py-28 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#E8192C]/10 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/20 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            The Irish Market Proof
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-white mb-4">
            We Have Already Done This in Ireland
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl">
            Earlier this year, we ran campaigns for an Irish solar installer. The leads came in cheap. 
            The pipeline filled up. But then something went wrong — and it was not the marketing.
          </p>
        </div>
        
        {/* Campaign Data Panel */}
        <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 md:p-8 mb-8 transition-all duration-700 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="font-bold text-lg text-white mb-1">LIVE CAMPAIGN DATA — IRISH SOLAR INSTALLER</h3>
              <p className="text-slate-500 text-sm">Meta Ads Manager export. Feb 25 – Jun 1, 2025. Real numbers.</p>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#E8192C] text-white text-xs font-semibold px-3 py-1 rounded-full mt-2 md:mt-0">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ETOTO MANAGED
            </span>
          </div>
          
          {/* Data grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Results</p>
              <p className="text-2xl font-bold text-white">229</p>
              <p className="text-[#E8192C] text-xs font-medium">leads generated</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Cost Per Lead</p>
              <p className="text-2xl font-bold text-[#22C55E]">€16.18</p>
              <p className="text-slate-500 text-xs">avg CPL</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Reach</p>
              <p className="text-2xl font-bold text-white">88,937</p>
              <p className="text-slate-500 text-xs">unique people</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs mb-1">Total Spend</p>
              <p className="text-2xl font-bold text-white">€4,451</p>
              <p className="text-slate-500 text-xs">investment</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700">
            <p className="text-center text-sm text-slate-400">
              Total Investment: <span className="text-white font-semibold">€4,451</span> — 
              <span className="text-[#E8192C] font-semibold"> 229 leads</span> — 
              <span className="text-white font-semibold"> €16.18 avg CPL</span>
            </p>
          </div>
        </div>
        
        {/* Top performers */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transition-all duration-700 delay-300 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/5 backdrop-blur-sm border-l-4 border-[#22C55E] rounded-r-xl p-5 hover:bg-white/10 transition-all duration-300">
            <p className="text-[#22C55E] text-xs font-semibold tracking-wider mb-2">BEST PERFORMER</p>
            <p className="text-3xl font-black text-white mb-1">
              <AnimatedCounter end={14.29} decimals={2} prefix="€" /> CPL
            </p>
            <p className="text-slate-400 text-sm">&quot;Starting from €4,799&quot; V2 — 106 leads</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border-l-4 border-[#F5921E] rounded-r-xl p-5 hover:bg-white/10 transition-all duration-300">
            <p className="text-[#F5921E] text-xs font-semibold tracking-wider mb-2">HIGHEST VOLUME</p>
            <p className="text-3xl font-black text-white mb-1">
              <AnimatedCounter end={15.46} decimals={2} prefix="€" /> CPL
            </p>
            <p className="text-slate-400 text-sm">&quot;Starting from €4,799&quot; V1 — 43 leads</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border-l-4 border-[#1B6FE8] rounded-r-xl p-5 hover:bg-white/10 transition-all duration-300">
            <p className="text-[#1B6FE8] text-xs font-semibold tracking-wider mb-2">ENGAGEMENT</p>
            <p className="text-3xl font-black text-white mb-1">
              <AnimatedCounter end={0.70} decimals={2} prefix="€" /> / like
            </p>
            <p className="text-slate-400 text-sm">1,065 page followers · €3.26 CPM</p>
          </div>
        </div>
        
        {/* CRM Graveyard section */}
        <div className={`transition-all duration-700 delay-400 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-[#F5921E]" />
            <h3 className="text-2xl font-black text-white">But Here Is What Happened in the CRM.</h3>
          </div>
          <p className="text-slate-400 text-base md:text-lg mb-8 max-w-3xl">
            166 Meta leads landed in their pipeline. Total value: <span className="text-white font-semibold">€1,245,000</span>. 
            That is what €4,451 in ad spend generated. Here is where it went:
          </p>
          
          {/* Pipeline bar */}
          <div className="bg-slate-800 h-12 md:h-14 mb-8 flex overflow-hidden rounded-full">
            <AnimatedBar width={37.3} color="#F5921E" delay={0} />
            <AnimatedBar width={18.7} color="#E8192C" delay={100} />
            <AnimatedBar width={13.3} color="#6B7280" delay={200} />
            <AnimatedBar width={12.7} color="#9CA3AF" delay={300} />
            <AnimatedBar width={18} color="#374151" delay={400} />
          </div>
          
          {/* Pipeline breakdown */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="border-l-4 border-[#F5921E] bg-slate-800/50 rounded-r-xl p-4 hover:bg-slate-800 transition-all duration-300">
              <p className="text-3xl font-black text-white">62</p>
              <p className="text-slate-400 text-sm">Quoted but stalled</p>
              <p className="text-[#F5921E] text-sm font-semibold">€542,500 in limbo</p>
            </div>
            
            <div className="border-l-4 border-[#E8192C] bg-slate-800/50 rounded-r-xl p-4 hover:bg-slate-800 transition-all duration-300">
              <p className="text-3xl font-black text-white">31</p>
              <p className="text-slate-400 text-sm">Never contacted</p>
              <p className="text-[#E8192C] text-sm font-semibold">€270,000 untouched</p>
            </div>
            
            <div className="border-l-4 border-[#6B7280] bg-slate-800/50 rounded-r-xl p-4 hover:bg-slate-800 transition-all duration-300">
              <p className="text-3xl font-black text-white">2</p>
              <p className="text-slate-400 text-sm">Total installs from 245 leads</p>
              <p className="text-slate-500 text-sm font-semibold">0.8% close rate</p>
            </div>
            
            <div className="border-l-4 border-[#22C55E] bg-slate-800/50 rounded-r-xl p-4 hover:bg-slate-800 transition-all duration-300">
              <p className="text-3xl font-black text-[#22C55E]">27</p>
              <p className="text-slate-400 text-sm">What Solar Path would close at 25%</p>
              <p className="text-[#22C55E] text-sm font-semibold">€324,000</p>
            </div>
          </div>
          
          {/* Callout */}
          <div className="bg-gradient-to-r from-[#E8192C] to-[#D01622] p-6 md:p-8 rounded-2xl text-center">
            <p className="text-xl md:text-2xl font-black text-white mb-3">
              The leads were there. The pipeline value was there. The sales process was not.
            </p>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
              Solar Path already has what this client did not: a refined sales process, SDRs in training, 
              and a founder who understands that leads without follow-up are just expensive database entries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
