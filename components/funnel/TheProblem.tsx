'use client'

import { useEffect, useRef, useState } from 'react'
import { Package, Calculator, Clock } from 'lucide-react'

const problemCards = [
  { 
    icon: Package, 
    title: 'They Lead With Product',
    detail: 'Most reps pitch panel specs and inverter brands. The customer doesn\'t care about panel efficiency — they care about how much they\'ll save.',
  },
  { 
    icon: Calculator, 
    title: 'They Don\'t Do the Maths',
    detail: 'They send a quote in a PDF and hope for the best. The customer has no idea what the numbers mean because nobody walked them through it live.',
  },
  { 
    icon: Clock, 
    title: 'They Close After the Call',
    detail: 'The proposal arrives 24 hours later when the customer has cooled off, talked to their partner, and Googled three more competitors. Close on the call, not after it.',
  },
]

export default function TheProblem() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [sectionVisible, setSectionVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            problemCards.forEach((_, index) => {
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
  }, [mounted])

  if (!mounted) return null

  return (
    <section id="problem" ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-red-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse" />
            The Industry Problem
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Why Most Solar Sales Fail.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            It&apos;s not because the product is bad. It&apos;s because nobody taught you how to sell it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {problemCards.map((card, index) => {
            const Icon = card.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                className={`group relative bg-white border border-slate-100 rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-slate-200 ${
                  isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-red-50 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-[#E8192C] transition-colors duration-300" />
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3">{card.title}</h3>

                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{card.detail}</p>

                {/* Hover gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        {/* Callout banner */}
        <div className={`mt-10 md:mt-14 text-center transition-all duration-700 delay-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col items-center gap-3 bg-[#E8192C] text-white rounded-2xl px-6 md:px-8 py-5 md:py-6 shadow-xl">
            <p className="text-sm md:text-lg font-medium max-w-2xl leading-relaxed">
              &ldquo;You&apos;re not selling solar panels. You&apos;re selling <span className="font-bold">£2,500/year</span> in savings and income. If the customer can see that number, the price of the system becomes irrelevant.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
