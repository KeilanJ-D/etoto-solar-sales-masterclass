'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, CheckCircle, Zap, TrendingUp, Target, FileText, BarChart3, Users, Camera, Settings } from 'lucide-react'

const roadmap = [
  {
    month: 'Month 1',
    title: 'Capture & Launch',
    subtitle: 'Build the foundation, start generating',
    color: '#E8192C',
    installs: '20 → 25',
    leadsGenerated: '€2,000 worth',
    items: [
      { text: 'Capture content on-site (install footage, team photos, testimonials)', icon: Camera },
      { text: 'Publish 10 SEO articles targeting 9,500+ monthly searches', icon: FileText },
      { text: 'Fix technical SEO issues (meta, schema, Core Web Vitals)', icon: Zap },
      { text: 'Launch Meta Ads with proven Irish solar creatives', icon: TrendingUp },
    ],
    keyDeliverable: 'Live ads + all SEO content published. Lead flow starts.',
  },
  {
    month: 'Month 2',
    title: 'Optimise & Scale',
    subtitle: 'Refine what works, cut what doesn\'t',
    color: '#F5921E',
    installs: '25 → 35',
    leadsGenerated: '€2,000 worth',
    items: [
      { text: 'Analyse Month 1 ad performance, double down on winners', icon: BarChart3 },
      { text: 'A/B test landing pages and ad creatives', icon: Target },
      { text: 'Add localised pages (Cork, Dublin, regional targeting)', icon: FileText },
      { text: 'Implement automated follow-up sequences in CRM', icon: Settings },
    ],
    keyDeliverable: 'Optimised campaigns running. CRM automation live.',
  },
  {
    month: 'Month 3',
    title: 'Compound & Grow',
    subtitle: 'SEO kicks in, organic compounds paid',
    color: '#22C55E',
    installs: '35 → 50',
    leadsGenerated: '€2,000 worth',
    items: [
      { text: 'SEO content starts ranking (organic leads increase)', icon: TrendingUp },
      { text: 'Scale winning ad sets with increased budget', icon: Zap },
      { text: 'Review collection system active (build social proof)', icon: Users },
      { text: 'Prepare for capacity scaling (50+ installs ready)', icon: BarChart3 },
    ],
    keyDeliverable: 'Combined organic + paid generating 50+ install capacity.',
  },
]

export default function NinetyDayRoadmap() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeMonth, setActiveMonth] = useState(0)
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
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E8192C] via-[#F5921E] to-[#22C55E]" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4" />
            90-Day Growth Plan
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            From <span className="text-[#E8192C]">20</span> to <span className="text-[#22C55E]">50</span> Installs Per Month
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            We generate €2,000 worth of leads each month. You close them. Simple.
          </p>
        </div>

        {/* Progress bar */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between text-sm font-bold mb-2">
            <span className="text-[#E8192C]">20 installs/mo</span>
            <span className="text-[#22C55E]">50 installs/mo</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#E8192C] via-[#F5921E] to-[#22C55E] transition-all duration-1000 ease-out"
              style={{ width: isVisible ? `${((activeMonth + 1) / 3) * 100}%` : '0%' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {roadmap.map((month, i) => (
              <span key={i} className="text-xs text-slate-400">{month.installs}</span>
            ))}
          </div>
        </div>

        {/* Month selector */}
        <div className={`flex justify-center gap-2 md:gap-4 mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {roadmap.map((month, index) => (
            <button
              key={index}
              onClick={() => setActiveMonth(index)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                activeMonth === index 
                  ? 'text-white shadow-lg' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              style={{ backgroundColor: activeMonth === index ? month.color : undefined }}
            >
              {month.month}
            </button>
          ))}
        </div>

        {/* Active month card */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {roadmap.map((month, index) => (
            <div
              key={index}
              className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
                activeMonth === index ? 'opacity-100 scale-100' : 'hidden'
              }`}
              style={{ borderColor: month.color }}
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b" style={{ borderColor: `${month.color}30` }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: month.color }} />
                      <h3 className="text-xl md:text-2xl font-black text-slate-900">{month.title}</h3>
                    </div>
                    <p className="text-slate-500">{month.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold text-sm">
                      {month.leadsGenerated} leads
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: month.color }}>
                      <Users className="w-4 h-4" />
                      <span>{month.installs}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">What We Deliver</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {month.items.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div 
                        key={i}
                        className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
                      >
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${month.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: month.color }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700 leading-tight">{item.text}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Key deliverable */}
                <div className="bg-slate-900 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">End of Month Deliverable</p>
                    <p className="text-sm text-white font-medium">{month.keyDeliverable}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple investment summary */}
        <div className={`mt-12 bg-slate-50 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
              The Simple Maths
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-black text-[#E8192C]">€2k</p>
                <p className="text-xs text-slate-500">Leads/month</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-black text-[#F5921E]">£2k</p>
                <p className="text-xs text-slate-500">Retainer/month</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-2xl md:text-3xl font-black text-[#22C55E]">30</p>
                <p className="text-xs text-slate-500">Extra installs</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              At €8,500 average install value, 30 extra installs = <span className="font-bold text-slate-900">€255,000 additional revenue.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
