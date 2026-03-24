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

export default function WhereYouAre() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          Where You Are Today
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6 animate-on-scroll stagger-1">
          The Numbers You Told Us
        </h2>
        <p className="text-[#6B7280] text-lg max-w-2xl mb-12 animate-on-scroll stagger-2">
          Four to five installs per week. One team on the road, bones of a second ready to split out. 
          Premium Sigenergy and Aiko systems. A customer journey most installers couldn&apos;t dream of building.
        </p>
        
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="border-t-[3px] border-[#E8192C] bg-[#F8F9FA] p-6 animate-on-scroll stagger-1">
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">
              <AnimatedCounter end={20} />
            </p>
            <p className="font-semibold text-[#374151] mb-1">Installs Per Month</p>
            <p className="text-[#9CA3AF] text-sm">4–5 per week, 1 team on the road</p>
          </div>
          
          <div className="border-t-[3px] border-[#E8192C] bg-[#F8F9FA] p-6 animate-on-scroll stagger-2">
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">
              <AnimatedCounter end={12} prefix="€" suffix="K" />
            </p>
            <p className="font-semibold text-[#374151] mb-1">Average Order Value</p>
            <p className="text-[#9CA3AF] text-sm">Sig / Aiko systems, premium positioning</p>
          </div>
          
          <div className="border-t-[3px] border-[#E8192C] bg-[#F8F9FA] p-6 animate-on-scroll stagger-3">
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-2">
              <AnimatedCounter end={240} prefix="€" suffix="K" />
            </p>
            <p className="font-semibold text-[#374151] mb-1">Current Monthly Revenue</p>
            <p className="text-[#9CA3AF] text-sm">20 installs × €12,000</p>
          </div>
          
          <div className="border-t-[3px] border-[#22C55E] bg-[#F0FDF4] p-6 animate-on-scroll stagger-4">
            <p className="font-heading text-3xl md:text-4xl font-bold text-[#22C55E] mb-2">
              <AnimatedCounter end={600} prefix="€" suffix="K" />
            </p>
            <p className="font-semibold text-[#374151] mb-1">Target Monthly Revenue</p>
            <p className="text-[#9CA3AF] text-sm">50 installs × €12,000 — the goal</p>
          </div>
        </div>
        
        {/* Callout box */}
        <div className="border-l-4 border-[#E8192C] bg-[#FEF2F2] p-6 md:p-8 animate-on-scroll">
          <p className="text-[#374151] text-lg leading-relaxed">
            <strong className="text-[#0A0A0A]">The gap between €240K and €600K isn&apos;t talent.</strong> It isn&apos;t install quality. 
            It isn&apos;t your teams. It&apos;s the engine that feeds them work. You&apos;ve built everything else — 
            the customer portal, the cleanliness standards, the process refinements. Now it&apos;s time to 
            build the infrastructure that fills your calendar with high-intent homeowners who already 
            want what you sell.
          </p>
        </div>
      </div>
    </section>
  )
}
