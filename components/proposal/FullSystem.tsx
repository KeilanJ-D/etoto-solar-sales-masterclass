'use client'

import { useEffect, useState, useRef } from 'react'
import { Target, Settings, Zap, Globe, Camera, Search } from 'lucide-react'

const services = [
  {
    icon: Target,
    title: 'Meta Campaign Management',
    description: 'Full-funnel Facebook & Instagram advertising. Awareness campaigns to build brand recognition. Engagement campaigns to grow your following. Lead generation campaigns to fill your pipeline. Weekly optimisation and reporting.',
  },
  {
    icon: Settings,
    title: 'CRM & Pipeline Infrastructure',
    description: 'Go High Level overhaul. Automated welcome sequences, call-back scheduling, quote reminders, and long-term nurture flows. Pipeline stages that match your actual sales process. Review collection automation.',
  },
  {
    icon: Zap,
    title: 'SolaFlow Quiz Funnel',
    tag: 'FREE',
    description: 'Our proprietary lead qualification tool, branded to Solar Path. Configured for the Irish market — SEAI grants, Eircode, € pricing. Recommends system sizes and delivers pre-qualified leads with full context.',
  },
  {
    icon: Globe,
    title: 'Website Management & CRO',
    description: 'Ongoing optimisation of solarpath.ie. Landing pages for campaigns. Conversion rate improvements. Content uploads and ad-hoc changes as needed. We treat your website as a sales tool, not a brochure.',
  },
  {
    icon: Camera,
    title: 'Ad Creative Production',
    description: 'Carousels, educational content, package offers. Mythbuster posts. Everything designed to stop the scroll and speak to Irish homeowners considering solar. Video content from quarterly shoots woven into campaigns.',
  },
  {
    icon: Search,
    title: 'SEO & Google Ads Audit',
    tag: 'FREE',
    description: 'Once we have access to your Google Ads and GA4, we will conduct a full audit. Honest assessment of what is working, what is not, and what it would cost to fix. No commitment required.',
  },
]

export default function FullSystem() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            services.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, idx])
              }, idx * 100)
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
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/10 text-[#E8192C] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#E8192C] rounded-full animate-pulse" />
            The Full System
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4">
            Everything Under One Roof
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            No more juggling multiple agencies who do not talk to each other. The funnel feeds the CRM. 
            The CRM feeds the ads. The content feeds everything.
          </p>
        </div>
        
        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(idx)
            
            return (
              <div 
                key={service.title}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#E8192C]" />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#E8192C]" />
                  </div>
                  {service.tag && (
                    <span className="bg-[#22C55E] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Hover gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
