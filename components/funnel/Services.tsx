'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, BarChart3, Megaphone, Palette, Bot, Globe, Check } from 'lucide-react'

const services = [
  { icon: Search, title: 'SEO Overhaul', desc: 'Technical fixes, keyword strategy, local SEO for all counties. Get found when homeowners search.', items: ['Technical audit fixes', 'Keyword mapping', 'Local landing pages', 'Schema markup'] },
  { icon: BarChart3, title: 'Conversion Optimisation', desc: 'Transform your website from a brochure into a lead generation machine that qualifies and captures.', items: ['Gated calculators', 'Multi-step forms', 'Exit intent popups', 'A/B testing'] },
  { icon: Megaphone, title: 'Paid Media', desc: 'Meta and Google campaigns that target high-intent homeowners and deliver leads at scale.', items: ['Campaign strategy', 'Creative production', 'Audience targeting', 'Continuous optimisation'] },
  { icon: Palette, title: 'Brand Refresh', desc: 'Cohesive visual identity that builds trust and differentiates you from every other solar installer.', items: ['Visual identity', 'Messaging framework', 'Brand guidelines', 'Asset library'] },
  { icon: Bot, title: 'AI Content Engine', desc: 'Automated blog content, SEO-optimised articles, and social posts running on autopilot.', items: ['Weekly articles', 'Content clusters', 'Social automation', 'Performance tracking'] },
  { icon: Globe, title: 'Lead Automation', desc: 'CRM integration, instant follow-up sequences, and lead scoring to prioritise hot prospects.', items: ['CRM setup', 'Email sequences', 'SMS follow-up', 'Lead scoring'] },
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Check className="w-4 h-4" />
            The Solution
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Here Is How We Fix It
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            A comprehensive growth system tailored specifically for Solar Path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div 
                key={service.title}
                className={`group bg-white border border-slate-100 rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-[#E8192C]/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 md:w-14 md:h-14 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#E8192C] group-hover:border-[#E8192C] group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5 md:w-7 md:h-7 text-slate-400 group-hover:text-white transition-all" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 md:mb-2">{service.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">{service.desc}</p>
                
                <ul className="space-y-1.5 md:space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8192C] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-b-xl md:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
