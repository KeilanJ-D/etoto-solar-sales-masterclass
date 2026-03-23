'use client'

import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'SEO Overhaul',
    desc: 'Technical fixes, keyword strategy, local SEO for all 26 counties. Get found when homeowners search.',
    items: ['Technical audit fixes', 'Keyword mapping', 'Local landing pages', 'Schema markup']
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: 'Conversion Optimization',
    desc: 'Transform your website from a brochure into a lead generation machine that qualifies and captures.',
    items: ['Gated calculators', 'Multi-step forms', 'Exit intent popups', 'A/B testing']
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: 'Paid Media',
    desc: 'Meta and Google campaigns that target high-intent homeowners and deliver leads at scale.',
    items: ['Campaign strategy', 'Creative production', 'Audience targeting', 'Continuous optimization']
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Brand Refresh',
    desc: 'Cohesive visual identity that builds trust and differentiates you from every other solar installer.',
    items: ['Visual identity', 'Messaging framework', 'Brand guidelines', 'Asset library']
  },
]

export default function Services() {
  const { ref, isVisible } = useAnimateOnScroll(0.1)

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-[#E8192C]/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div 
          ref={ref}
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#E8192C] text-sm font-bold tracking-widest mb-4 block">THE SOLUTION</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Here Is How We Fix It
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            A comprehensive growth system tailored specifically for Solar Path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const { ref: cardRef, isVisible: cardVisible } = useAnimateOnScroll(0.2)
            return (
              <div 
                key={service.title}
                ref={cardRef}
                className={`group relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 transition-all duration-700 hover:bg-white/[0.04] hover:border-[#E8192C]/30 hover:-translate-y-2 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-[#E8192C]/10 border border-[#E8192C]/30 rounded-2xl flex items-center justify-center text-[#E8192C] mb-6 group-hover:bg-[#E8192C] group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/50 mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <svg className="w-4 h-4 text-[#E8192C]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
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
