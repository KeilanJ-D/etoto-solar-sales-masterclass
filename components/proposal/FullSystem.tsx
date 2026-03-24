'use client'

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
    description: 'Go High Level overhaul. Automated welcome sequences, call-back scheduling, quote reminders, and long-term nurture flows. Pipeline stages that match your actual sales process. Review collection automation. Everything talks to everything.',
  },
  {
    icon: Zap,
    title: 'SolaFlow Quiz Funnel',
    tag: 'FREE',
    description: 'Our proprietary lead qualification tool, branded to Solar Path. Configured for the Irish market — SEAI grants, Eircode, € pricing. Recommends system sizes based on roof space and energy usage. Delivers pre-qualified leads with full context to your sales team.',
  },
  {
    icon: Globe,
    title: 'Website Management & CRO',
    description: 'Ongoing optimisation of solarpath.ie. Landing pages for campaigns. Conversion rate improvements. Content uploads and ad-hoc changes as needed. We treat your website as a sales tool, not a brochure.',
  },
  {
    icon: Camera,
    title: 'Ad Creative Production',
    description: 'Carousels, educational content, package offers. Mythbuster posts. Everything designed to stop the scroll and speak to Irish homeowners considering solar. Video content from quarterly shoots woven into ongoing campaigns.',
  },
  {
    icon: Search,
    title: 'SEO & Google Ads Audit',
    tag: 'FREE',
    description: 'Once we have access to your Google Ads and GA4, we will conduct a full audit. Honest assessment of what is working, what is not, and what it would cost to fix. No commitment required for the audit — we want to see it.',
  },
]

export default function FullSystem() {
  return (
    <section className="bg-[#F2F4F7] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          The Full System
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6 animate-on-scroll stagger-1">
          Everything Under One Roof
        </h2>
        <p className="text-[#6B7280] text-lg max-w-2xl mb-12 animate-on-scroll stagger-2">
          No more juggling multiple agencies who do not talk to each other. The funnel feeds the CRM. 
          The CRM feeds the ads. The content feeds everything.
        </p>
        
        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={service.title}
              className={`bg-white border-t-[3px] border-[#E8192C] p-6 animate-on-scroll stagger-${(idx % 6) + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <service.icon className="w-8 h-8 text-[#E8192C]" />
                {service.tag && (
                  <span className="bg-[#22C55E] text-white text-xs font-bold px-2 py-1">
                    {service.tag}
                  </span>
                )}
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0A0A0A] mb-3">
                {service.title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
