'use client'

import { useEffect, useState, useRef } from 'react'
import { MessageSquare, Database, BarChart, Users } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: 'The Green Light',
    description: 'Review this with Jackie. Decide if you want to proceed. Let me know.',
  },
  {
    number: 2,
    icon: Database,
    title: 'GHL Access',
    description: 'Add Keilan as a staff member in Go High Level so we can start scoping the CRM build.',
  },
  {
    number: 3,
    icon: BarChart,
    title: 'Google Ads + GA4',
    description: 'Grant access for the free audit. We want to see what you are currently spending and where.',
  },
  {
    number: 4,
    icon: Users,
    title: 'Rocky Update',
    description: 'Let me know how the conversation landed. If the funding model opens up, we will factor it in.',
  },
]

export default function NextSteps() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            steps.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleSteps(prev => [...prev, idx])
              }, idx * 150)
            })
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
    <section ref={sectionRef} id="next-steps" className="py-16 md:py-28 px-4 md:px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/10 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
            Next Steps
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900">
            What We Need From You
          </h2>
        </div>
        
        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon
            const isVisible = visibleSteps.includes(idx)
            
            return (
              <div 
                key={step.number}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#E8192C] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-black">{step.number}</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-[#E8192C]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#E8192C] transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
        
        {/* Urgency callout */}
        <div className={`bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-[#E8192C] p-6 md:p-8 rounded-r-2xl text-center transition-all duration-700 delay-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl font-black text-slate-900 mb-2">
            Your current agency ends this week.
          </p>
          <p className="text-slate-600">
            We can have campaigns live within <span className="font-bold text-[#E8192C]">7 days</span> of signing.
          </p>
        </div>
      </div>
    </section>
  )
}
