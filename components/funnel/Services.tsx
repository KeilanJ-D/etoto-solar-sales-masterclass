'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, BarChart3, Megaphone, Palette, Bot, Globe } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'SEO Overhaul',
    desc: 'Technical fixes, keyword strategy, local SEO for all counties. Get found when homeowners search.',
    items: ['Technical audit fixes', 'Keyword mapping', 'Local landing pages', 'Schema markup']
  },
  {
    icon: BarChart3,
    title: 'Conversion Optimisation',
    desc: 'Transform your website from a brochure into a lead generation machine that qualifies and captures.',
    items: ['Gated calculators', 'Multi-step forms', 'Exit intent popups', 'A/B testing']
  },
  {
    icon: Megaphone,
    title: 'Paid Media',
    desc: 'Meta and Google campaigns that target high-intent homeowners and deliver leads at scale.',
    items: ['Campaign strategy', 'Creative production', 'Audience targeting', 'Continuous optimisation']
  },
  {
    icon: Palette,
    title: 'Brand Refresh',
    desc: 'Cohesive visual identity that builds trust and differentiates you from every other solar installer.',
    items: ['Visual identity', 'Messaging framework', 'Brand guidelines', 'Asset library']
  },
  {
    icon: Bot,
    title: 'AI Content Engine',
    desc: 'Automated blog content, SEO-optimised articles, and social posts running on autopilot.',
    items: ['Weekly articles', 'Content clusters', 'Social automation', 'Performance tracking']
  },
  {
    icon: Globe,
    title: 'Lead Automation',
    desc: 'CRM integration, instant follow-up sequences, and lead scoring to prioritise hot prospects.',
    items: ['CRM setup', 'Email sequences', 'SMS follow-up', 'Lead scoring']
  },
]

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#DCFCE7] text-[#166534] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Here Is How We Fix It
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            A comprehensive growth system tailored specifically for Solar Path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div 
                key={service.title}
                className={`group bg-white border border-[#E2E8F0] rounded-2xl p-6 transition-all duration-700 hover:shadow-xl hover:-translate-y-1 hover:border-[#E8192C]/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E8192C] group-hover:border-[#E8192C] transition-all">
                  <Icon className="w-7 h-7 text-[#64748B] group-hover:text-white transition-all" />
                </div>
                
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
                <p className="text-[#64748B] text-sm mb-6">{service.desc}</p>
                
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
