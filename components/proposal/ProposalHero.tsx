'use client'

import { useEffect, useState, useRef } from 'react'

function AnimatedCounter({ end, prefix = '', suffix = '', duration = 1500 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
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
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function ProposalHero() {
  return (
    <section className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Subtle radial glow */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle at center, #E8192C 0%, transparent 70%)',
        }}
      />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        {/* Eyebrow */}
        <p className="text-[#E8192C] text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-6 animate-on-scroll">
          90-Day Solar Scaler — Prepared for Ken Hegarty & Jackie Murphy
        </p>
        
        {/* Main headline */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8 animate-on-scroll stagger-1">
          From 20 Installs to <span className="text-[#E8192C]">50.</span><br />
          Here&apos;s the Engine.
        </h1>
        
        {/* Subtext */}
        <p className="text-[#9CA3AF] text-lg md:text-xl max-w-2xl mb-16 leading-relaxed animate-on-scroll stagger-2">
          You&apos;ve built a business that installs quality systems with teams people actually like. 
          You&apos;ve invested in customer experience infrastructure most installers ignore. 
          Now it&apos;s time to feed it the volume it deserves.
        </p>
        
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll stagger-3">
          <div className="border-l-[3px] border-[#E8192C] pl-6 py-4">
            <p className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              <AnimatedCounter end={12000} prefix="€" />
            </p>
            <p className="text-[#9CA3AF] text-sm">Your Average Order Value</p>
          </div>
          
          <div className="border-l-[3px] border-[#E8192C] pl-6 py-4">
            <p className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              20 → <span className="text-[#E8192C]">50</span>
            </p>
            <p className="text-[#9CA3AF] text-sm">Monthly Install Target</p>
          </div>
          
          <div className="border-l-[3px] border-[#E8192C] pl-6 py-4">
            <p className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              <AnimatedCounter end={600} prefix="€" suffix="K" />
            </p>
            <p className="text-[#9CA3AF] text-sm">Monthly Revenue at Target</p>
          </div>
        </div>
      </div>
    </section>
  )
}
