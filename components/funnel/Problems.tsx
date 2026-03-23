'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Smartphone, Gauge, Shield, Palette, Target } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const scoreCards = [
  { icon: Search, title: 'SEO Health', score: 34, maxScore: 100, status: 'CRITICAL', statusColour: '#DC2626', detail: 'Missing meta descriptions, thin content, poor internal linking structure.' },
  { icon: Smartphone, title: 'Mobile Experience', score: 58, maxScore: 100, status: 'NEEDS WORK', statusColour: '#F59E0B', detail: 'Touch targets too small, content shifts on load, slow mobile rendering.' },
  { icon: Gauge, title: 'Page Speed', score: 42, maxScore: 100, status: 'POOR', statusColour: '#DC2626', detail: 'Large unoptimised images, render-blocking resources, no lazy loading.' },
  { icon: Shield, title: 'Trust Signals', score: 45, maxScore: 100, status: 'WEAK', statusColour: '#F59E0B', detail: 'Limited reviews displayed, no accreditation badges, missing case studies.' },
  { icon: Palette, title: 'Brand Consistency', score: 52, maxScore: 100, status: 'INCONSISTENT', statusColour: '#F59E0B', detail: 'Colour palette varies across pages, typography lacks hierarchy.' },
  { icon: Target, title: 'Lead Capture', score: 28, maxScore: 100, status: 'FAILING', statusColour: '#DC2626', detail: 'Calculators have no email gate, no lead magnets, weak CTAs throughout.' },
]

function AnimatedScore({ score, isVisible, color }: { score: number; isVisible: boolean; color: string }) {
  const count = useCountUp(score, 1500, isVisible)
  return <span style={{ color }}>{count}</span>
}

export default function Problems() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [sectionVisible, setSectionVisible] = useState(false)
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
            Our audit revealed significant gaps across your digital presence. Here is where Solar Path stands today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {scoreCards.map((card, index) => {
            const Icon = card.icon
            const isVisible = visibleCards.includes(index)
            const percentage = (card.score / card.maxScore) * 100

            return (
              <div
                key={index}
                className={`group relative bg-white border border-slate-100 rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200 ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
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

                {/* Hover gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        <div className={`mt-10 md:mt-14 text-center transition-all duration-700 delay-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 bg-red-50 border border-red-100 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-[#E8192C] rounded-full animate-ping" />
            <p className="text-slate-700 text-sm md:text-lg">
              Combined, these issues are costing Solar Path an estimated <span className="font-bold text-[#E8192C]">£47,000+ annually</span> in lost leads.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
