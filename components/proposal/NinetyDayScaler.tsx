'use client'

import { Check } from 'lucide-react'

export default function NinetyDayScaler() {
  const months = [
    {
      number: 1,
      focus: 'BUILD + LAUNCH',
      title: 'Foundation & First Leads',
      items: [
        'Go High Level CRM overhaul — automations, pipelines, lead routing, review collection',
        'SolaFlow quiz funnel built and branded for Solar Path (Irish market config)',
        'Meta campaigns built — awareness, engagement, lead gen',
        'First ads live within 7 days of signing',
        'Weekly performance calls',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: '€10',
      },
      borderColor: '#E8192C',
      bgColor: '#FFFFFF',
    },
    {
      number: 2,
      focus: 'OPTIMISE',
      title: 'Data-Driven Refinement',
      items: [
        'A/B testing on ad creative and copy',
        'Audience refinement based on lead quality feedback',
        'CRM automation tuning — response times, follow-up sequences',
        'First content shoot planning',
        'Lead-to-sale tracking calibration',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: 'Target €8–10',
      },
      borderColor: '#E8192C',
      bgColor: '#FFFFFF',
    },
    {
      number: 3,
      focus: 'PROVE',
      title: 'Full System Operational',
      items: [
        'Video content from first shoot feeding campaigns',
        'Retargeting audiences mature and converting',
        'Sales team receiving pre-qualified leads with full context',
        'Pipeline velocity measurable and improving',
        'Ready to scale ad spend based on proven ROI',
      ],
      results: {
        budget: '€2,400',
        leads: '~240',
        cpl: 'Target €8',
      },
      borderColor: '#22C55E',
      bgColor: '#F0FDF4',
    },
  ]

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          The 90-Day Solar Scaler
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6 animate-on-scroll stagger-1">
          Three Months to Prove It Works
        </h2>
        <p className="text-[#6B7280] text-lg max-w-2xl mb-12 animate-on-scroll stagger-2">
          A structured ramp-up designed to build infrastructure, prove the model, and give you full visibility 
          before committing to scale.
        </p>
        
        {/* Month cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {months.map((month, idx) => (
            <div 
              key={month.number}
              className={`relative border-t-[3px] p-6 animate-on-scroll stagger-${idx + 1}`}
              style={{ borderColor: month.borderColor, backgroundColor: month.bgColor }}
            >
              {/* Month number watermark */}
              <span 
                className="absolute top-4 right-4 font-heading text-[80px] font-bold leading-none"
                style={{ color: month.borderColor, opacity: 0.1 }}
              >
                {month.number}
              </span>
              
              <p 
                className="text-xs font-semibold tracking-wider mb-3"
                style={{ color: month.borderColor }}
              >
                {month.focus}
              </p>
              <h3 className="font-heading text-xl font-bold text-[#0A0A0A] mb-4">
                {month.title}
              </h3>
              
              <ul className="space-y-3 mb-6">
                {month.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Results box */}
              <div 
                className="border-l-4 bg-[#F8F9FA] p-4 mt-auto"
                style={{ borderColor: month.borderColor }}
              >
                <p className="text-sm text-[#6B7280] mb-1">Projected at {month.results.budget} ad spend:</p>
                <p className="font-semibold text-[#0A0A0A]">
                  {month.results.leads} leads at {month.results.cpl} CPL
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* The Month 3 Math */}
        <div className="border-l-4 border-[#E8192C] bg-[#0A0A0A] p-6 md:p-8 animate-on-scroll">
          <h3 className="font-heading text-xl font-bold text-white mb-6">The Month 3 Maths</h3>
          
          <div className="space-y-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-[#9CA3AF]">Ad budget:</span>
              <span className="font-semibold">€2,400</span>
              <span className="text-[#9CA3AF]">÷</span>
              <span className="font-semibold">€10/lead</span>
              <span className="text-[#9CA3AF]">=</span>
              <span className="font-bold text-[#E8192C]">240 leads</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold">240 leads</span>
              <span className="text-[#9CA3AF]">×</span>
              <span className="font-semibold">1-in-6 close rate</span>
              <span className="text-[#9CA3AF]">=</span>
              <span className="font-bold text-[#E8192C]">40 sales</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="font-semibold">40 sales</span>
              <span className="text-[#9CA3AF]">×</span>
              <span className="font-semibold">€12,000 AOV</span>
              <span className="text-[#9CA3AF]">=</span>
              <span className="font-heading text-2xl md:text-3xl font-bold text-[#E8192C]">€480,000 revenue</span>
            </div>
          </div>
          
          <p className="text-[#9CA3AF] text-sm mt-6 pt-6 border-t border-[#374151]">
            Total monthly investment: ~€4,800 (retainer + ad spend) · <span className="text-white font-semibold">100:1 return</span>
          </p>
        </div>
      </div>
    </section>
  )
}
