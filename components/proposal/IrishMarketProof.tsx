'use client'

import { useEffect, useState, useRef } from 'react'

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
  return (
    <section className="bg-[#0A0A0A] text-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          The Irish Market Proof
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 animate-on-scroll stagger-1">
          We&apos;ve Already Done This in Ireland
        </h2>
        <p className="text-[#9CA3AF] text-lg max-w-3xl mb-12 animate-on-scroll stagger-2">
          Earlier this year, we ran campaigns for an Irish solar installer. The leads came in cheap. 
          The pipeline filled up. But then something went wrong — and it wasn&apos;t the marketing.
        </p>
        
        {/* Campaign Data Panel */}
        <div className="border-t-[3px] border-[#E8192C] bg-[#111827] p-6 md:p-8 mb-8 animate-on-scroll stagger-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-white mb-1">LIVE CAMPAIGN DATA — IRISH SOLAR INSTALLER</h3>
              <p className="text-[#6B7280] text-sm">Meta Ads Manager export. Feb 25 – Jun 1, 2025. Real numbers.</p>
            </div>
            <span className="text-[#E8192C] text-xs font-semibold tracking-wider mt-2 md:mt-0">ETOTO MANAGED</span>
          </div>
          
          {/* Data table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#374151]">
                  <th className="text-left py-3 text-[#9CA3AF] font-medium">Metric</th>
                  <th className="text-right py-3 text-[#E8192C] font-semibold">Lead Generation</th>
                  <th className="text-right py-3 text-[#E8192C] font-semibold">Engagement</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">Results</td>
                  <td className="py-3 text-right font-semibold">229 leads</td>
                  <td className="py-3 text-right font-semibold">1,065 page likes</td>
                </tr>
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">Cost Per Result</td>
                  <td className="py-3 text-right font-semibold">€16.18</td>
                  <td className="py-3 text-right font-semibold">€0.70</td>
                </tr>
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">Reach</td>
                  <td className="py-3 text-right">35,290</td>
                  <td className="py-3 text-right">53,647</td>
                </tr>
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">Impressions</td>
                  <td className="py-3 text-right">214,006</td>
                  <td className="py-3 text-right">229,055</td>
                </tr>
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">CPM</td>
                  <td className="py-3 text-right">€17.31</td>
                  <td className="py-3 text-right">€3.26</td>
                </tr>
                <tr className="border-b border-[#1F2937]">
                  <td className="py-3 text-[#9CA3AF]">Total Spend</td>
                  <td className="py-3 text-right">€3,705</td>
                  <td className="py-3 text-right">€746</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#374151]">
            <p className="text-center text-lg">
              <span className="text-[#9CA3AF]">Total Investment:</span>{' '}
              <span className="font-bold">€4,451</span>{' '}
              <span className="text-[#9CA3AF]">—</span>{' '}
              <span className="font-bold text-[#E8192C]">229 leads</span>{' '}
              <span className="text-[#9CA3AF]">—</span>{' '}
              <span className="font-bold">€16.18 avg CPL</span>
            </p>
          </div>
        </div>
        
        {/* Top performers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-on-scroll stagger-4">
          <div className="border-t-[3px] border-[#22C55E] bg-[#111827] p-6">
            <p className="text-[#22C55E] text-xs font-semibold tracking-wider mb-3">BEST PERFORMER</p>
            <p className="font-heading text-2xl font-bold mb-2">
              <AnimatedCounter end={14.29} decimals={2} prefix="€" /> CPL
            </p>
            <p className="text-[#9CA3AF] text-sm">&quot;Starting from €4,799&quot; V2 — 106 leads</p>
          </div>
          
          <div className="border-t-[3px] border-[#F5921E] bg-[#111827] p-6">
            <p className="text-[#F5921E] text-xs font-semibold tracking-wider mb-3">HIGHEST VOLUME</p>
            <p className="font-heading text-2xl font-bold mb-2">
              <AnimatedCounter end={15.46} decimals={2} prefix="€" /> CPL
            </p>
            <p className="text-[#9CA3AF] text-sm">&quot;Starting from €4,799&quot; V1 — 43 leads</p>
          </div>
          
          <div className="border-t-[3px] border-[#1B6FE8] bg-[#111827] p-6">
            <p className="text-[#1B6FE8] text-xs font-semibold tracking-wider mb-3">ENGAGEMENT</p>
            <p className="font-heading text-2xl font-bold mb-2">
              <AnimatedCounter end={0.70} decimals={2} prefix="€" /> / like
            </p>
            <p className="text-[#9CA3AF] text-sm">1,065 page followers · €3.26 CPM</p>
          </div>
        </div>
        
        {/* CRM Graveyard section */}
        <div className="animate-on-scroll stagger-5">
          <h3 className="font-heading text-2xl font-bold mb-4">But Here&apos;s What Happened in the CRM.</h3>
          <p className="text-[#9CA3AF] text-lg mb-8 max-w-3xl">
            166 Meta leads landed in their pipeline. Total value: <span className="text-white font-semibold">€1,245,000</span>. 
            That&apos;s what €4,451 in ad spend generated. Here&apos;s where it went:
          </p>
          
          {/* Pipeline bar */}
          <div className="bg-[#1F2937] h-12 mb-8 flex overflow-hidden">
            <AnimatedBar width={37.3} color="#F5921E" delay={0} />
            <AnimatedBar width={18.7} color="#E8192C" delay={100} />
            <AnimatedBar width={13.3} color="#6B7280" delay={200} />
            <AnimatedBar width={12.7} color="#9CA3AF" delay={300} />
            <AnimatedBar width={18} color="#374151" delay={400} />
          </div>
          
          {/* Pipeline breakdown */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="border-l-4 border-[#F5921E] bg-[#111827] p-4">
              <p className="font-heading text-2xl font-bold">62</p>
              <p className="text-[#9CA3AF] text-sm">Quoted but stalled</p>
              <p className="text-[#F5921E] text-sm font-semibold">€542,500 in limbo</p>
            </div>
            
            <div className="border-l-4 border-[#E8192C] bg-[#111827] p-4">
              <p className="font-heading text-2xl font-bold">31</p>
              <p className="text-[#9CA3AF] text-sm">Never contacted</p>
              <p className="text-[#E8192C] text-sm font-semibold">€270,000 untouched</p>
            </div>
            
            <div className="border-l-4 border-[#6B7280] bg-[#111827] p-4">
              <p className="font-heading text-2xl font-bold">2</p>
              <p className="text-[#9CA3AF] text-sm">Total installs from 245 leads</p>
              <p className="text-[#6B7280] text-sm font-semibold">0.8% close rate</p>
            </div>
            
            <div className="border-l-4 border-[#22C55E] bg-[#111827] p-4">
              <p className="font-heading text-2xl font-bold text-[#22C55E]">27</p>
              <p className="text-[#9CA3AF] text-sm">What Solar Path would have closed at 25%</p>
              <p className="text-[#22C55E] text-sm font-semibold">€324,000</p>
            </div>
          </div>
          
          {/* Callout */}
          <div className="bg-[#E8192C] p-8 text-center">
            <p className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
              The leads were there. The pipeline value was there. The sales process wasn&apos;t.
            </p>
            <p className="text-white/80">
              Solar Path already has what this client didn&apos;t: a refined sales process, SDRs in training, 
              and a founder who understands that leads without follow-up are just expensive database entries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
