'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Smartphone, Gauge, Shield, Palette, Target, Info, X } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const scoreCards = [
  { 
    icon: Search, 
    title: 'SEO Health', 
    score: 34, 
    maxScore: 100, 
    status: 'CRITICAL', 
    statusColour: '#DC2626', 
    detail: 'Missing meta descriptions, thin content, poor internal linking structure.',
    context: 'We ran solarpath.ie through Google Lighthouse and Screaming Frog. Key findings: 12 of 15 pages lack unique meta descriptions. Average content length is 280 words (industry standard: 800+). Internal linking is minimal—most pages have fewer than 3 internal links. No schema markup detected, meaning Google cannot display rich snippets for your services.'
  },
  { 
    icon: Smartphone, 
    title: 'Mobile Experience', 
    score: 58, 
    maxScore: 100, 
    status: 'NEEDS WORK', 
    statusColour: '#F59E0B', 
    detail: 'Touch targets too small, content shifts on load, slow mobile rendering.',
    context: 'Mobile accounts for 68% of solar enquiry traffic in Ireland. Your site has a Cumulative Layout Shift (CLS) of 0.34 (should be <0.1). Several buttons are smaller than the 48×48px minimum for touch. First Contentful Paint on mobile is 4.2s—Google recommends under 1.8s. These issues directly hurt your Google rankings and user experience.'
  },
  { 
    icon: Gauge, 
    title: 'Page Speed', 
    score: 42, 
    maxScore: 100, 
    status: 'POOR', 
    statusColour: '#DC2626', 
    detail: 'Large unoptimised images, render-blocking resources, no lazy loading.',
    context: 'Your homepage loads 4.8MB of images—many are uncompressed PNGs. We detected 8 render-blocking JavaScript files. No lazy loading implemented, so all images load immediately even if below the fold. Total page load time: 7.3 seconds. For every 1-second delay, conversion rates drop by 7%.'
  },
  { 
    icon: Shield, 
    title: 'Trust Signals', 
    score: 45, 
    maxScore: 100, 
    status: 'WEAK', 
    statusColour: '#F59E0B', 
    detail: 'Limited reviews displayed, no accreditation badges, missing case studies.',
    context: 'Top-ranking Irish solar installers prominently display MCS certification, SEAI accreditation, and Trustpilot widgets. Your site shows no third-party review integration. No video testimonials. No named case studies with measurable results. Trust is the #1 conversion factor in solar—homeowners are spending €12,000+; they need reassurance.'
  },
  { 
    icon: Palette, 
    title: 'Brand Consistency', 
    score: 52, 
    maxScore: 100, 
    status: 'INCONSISTENT', 
    statusColour: '#F59E0B', 
    detail: 'Colour palette varies across pages, typography lacks hierarchy.',
    context: 'We identified 7 different button styles across your site. Font sizes range from 12px to 22px body text with no clear system. The orange brand colour appears in 4 different hex values. This inconsistency makes the site feel unprofessional and reduces trust. Strong brands use maximum 3 button styles and consistent typography.'
  },
  { 
    icon: Target, 
    title: 'Lead Capture', 
    score: 28, 
    maxScore: 100, 
    status: 'FAILING', 
    statusColour: '#DC2626', 
    detail: 'Calculators have no email gate, no lead magnets, weak CTAs throughout.',
    context: 'Your solar calculator is a lead generation gold mine—but you are giving away the value for free. Users get their savings estimate without entering any details. No email is captured. The contact form asks for too much information upfront (7 fields). No lead magnet (e.g., "Free Solar Guide") to capture visitors not ready to enquire. You are losing an estimated 40+ leads per month.'
  },
]

function AnimatedScore({ score, isVisible, color }: { score: number; isVisible: boolean; color: string }) {
  const count = useCountUp(score, 1500, isVisible)
  return <span style={{ color }}>{count}</span>
}

export default function Problems() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [sectionVisible, setSectionVisible] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            scoreCards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index])
              }, index * 120)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="problems" ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-red-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            Executive Snapshot
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Six Critical Areas Bleeding Revenue
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Our audit revealed significant gaps across your digital presence. Tap any card to see the full analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {scoreCards.map((card, index) => {
            const Icon = card.icon
            const isVisible = visibleCards.includes(index)
            const percentage = (card.score / card.maxScore) * 100
            const isExpanded = expandedCard === index

            return (
              <div
                key={index}
                className={`group relative bg-white border border-slate-100 rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                } ${isExpanded ? 'ring-2 ring-[#E8192C] shadow-2xl' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
              >
                <div 
                  className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-white animate-pulse"
                  style={{ backgroundColor: card.statusColour, animationDuration: '2s' }}
                >
                  {card.status}
                </div>

                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-[#E8192C] transition-colors duration-300" />
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3">{card.title}</h3>

                <div className="mb-3 md:mb-4">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-2xl md:text-3xl font-black">
                      <AnimatedScore score={card.score} isVisible={isVisible} color={card.statusColour} />
                    </span>
                    <span className="text-xs md:text-sm text-slate-400">/ {card.maxScore}</span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${percentage}%` : '0%',
                        backgroundColor: card.statusColour,
                        transitionDelay: `${index * 100 + 300}ms`
                      }}
                    />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{card.detail}</p>

                <button className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#E8192C] transition-colors">
                  <Info className="w-3 h-3" />
                  {isExpanded ? 'Hide analysis' : 'See full analysis'}
                </button>

                {/* Expanded context */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 animate-fade-in-up">
                    <div className="bg-slate-50 rounded-lg p-4 text-xs md:text-sm text-slate-600 leading-relaxed">
                      {card.context}
                    </div>
                  </div>
                )}

                {/* Hover gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        <div className={`mt-10 md:mt-14 text-center transition-all duration-700 delay-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#E8192C] rounded-full animate-ping" />
              <p className="text-slate-700 text-sm md:text-lg">
                Combined, these issues are costing Solar Path an estimated <span className="font-bold text-[#E8192C]">€48,000+ annually</span>
              </p>
            </div>
            <p className="text-xs md:text-sm text-slate-500 max-w-xl">
              Based on: 4 lost leads/month × €12,000 average installation × 12 months = €48,000. Calculated from competitor traffic analysis and industry conversion benchmarks of 3.2% for optimised solar websites.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
