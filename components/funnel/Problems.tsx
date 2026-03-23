'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, Smartphone, Gauge, Shield, Palette, Target } from 'lucide-react'

const scoreCards = [
  {
    icon: Search,
    title: 'SEO Health',
    score: 34,
    maxScore: 100,
    status: 'CRITICAL',
    statusColour: '#DC2626',
    detail: 'Missing meta descriptions, thin content, poor internal linking structure.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Experience',
    score: 58,
    maxScore: 100,
    status: 'NEEDS WORK',
    statusColour: '#F59E0B',
    detail: 'Touch targets too small, content shifts on load, slow mobile rendering.',
  },
  {
    icon: Gauge,
    title: 'Page Speed',
    score: 42,
    maxScore: 100,
    status: 'POOR',
    statusColour: '#DC2626',
    detail: 'Large unoptimised images, render-blocking resources, no lazy loading.',
  },
  {
    icon: Shield,
    title: 'Trust Signals',
    score: 45,
    maxScore: 100,
    status: 'WEAK',
    statusColour: '#F59E0B',
    detail: 'Limited reviews displayed, no accreditation badges, missing case studies.',
  },
  {
    icon: Palette,
    title: 'Brand Consistency',
    score: 52,
    maxScore: 100,
    status: 'INCONSISTENT',
    statusColour: '#F59E0B',
    detail: 'Colour palette varies across pages, typography lacks hierarchy.',
  },
  {
    icon: Target,
    title: 'Lead Capture',
    score: 28,
    maxScore: 100,
    status: 'FAILING',
    statusColour: '#DC2626',
    detail: 'Calculators have no email gate, no lead magnets, weak CTAs throughout.',
  },
]

export default function Problems() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scoreCards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index])
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="problems" ref={sectionRef} className="py-24 md:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#FEE2E2] text-[#DC2626] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Executive Snapshot
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Six Critical Areas Bleeding Revenue
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Our audit revealed significant gaps across your digital presence. Here is where Solar Path stands today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scoreCards.map((card, index) => {
            const Icon = card.icon
            const isVisible = visibleCards.includes(index)
            const percentage = (card.score / card.maxScore) * 100

            return (
              <div
                key={index}
                className={`group relative bg-white border border-[#E2E8F0] rounded-2xl p-6 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: card.statusColour }}
                >
                  {card.status}
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center mb-4 group-hover:bg-[#FEE2E2] transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#64748B] group-hover:text-[#E8192C] transition-colors duration-300" />
                </div>

                <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">{card.title}</h3>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-3xl font-black" style={{ color: card.statusColour }}>
                      {card.score}
                    </span>
                    <span className="text-sm text-[#94A3B8]">/ {card.maxScore}</span>
                  </div>
                  <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? `${percentage}%` : '0%',
                        backgroundColor: card.statusColour,
                      }}
                    />
                  </div>
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed">{card.detail}</p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#64748B] text-lg">
            Combined, these issues are costing Solar Path an estimated <span className="font-bold text-[#E8192C]">£47,000+ annually</span> in lost leads.
          </p>
        </div>
      </div>
    </section>
  )
}
