'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, CheckCircle, Zap, TrendingUp, Target, FileText, BarChart3 } from 'lucide-react'

const roadmap = [
  {
    month: 'Month 1',
    title: 'Foundation',
    subtitle: 'Fix what is broken',
    color: '#E8192C',
    items: [
      { text: 'Publish all 10 SEO articles', icon: FileText },
      { text: 'Fix technical SEO issues (meta tags, schema, speed)', icon: Zap },
      { text: 'Launch lead-gated solar calculator', icon: Target },
      { text: 'Set up CRM + automated follow-up sequences', icon: BarChart3 },
    ],
    outcome: '40+ organic keyword rankings started',
  },
  {
    month: 'Month 2',
    title: 'Scale',
    subtitle: 'Build momentum',
    color: '#F5921E',
    items: [
      { text: 'Launch Meta Ads campaign (proven Irish creatives)', icon: TrendingUp },
      { text: 'Publish 4 additional localised content pieces', icon: FileText },
      { text: 'Implement review collection system', icon: CheckCircle },
      { text: 'A/B test landing pages for conversion', icon: Target },
    ],
    outcome: 'First paid leads at sub-£30 CPL',
  },
  {
    month: 'Month 3',
    title: 'Optimise',
    subtitle: 'Compound results',
    color: '#22C55E',
    items: [
      { text: 'Scale winning ad creatives', icon: TrendingUp },
      { text: 'SEO content starts ranking (page 1 positions)', icon: BarChart3 },
      { text: 'Lead nurture sequences fully operational', icon: Zap },
      { text: 'Monthly reporting + strategy refinement', icon: FileText },
    ],
    outcome: '15+ qualified leads/month target',
  },
]

const week1Tasks = [
  { day: 'Mon', task: 'Kick-off call + brand assets handover', status: 'first' },
  { day: 'Tue', task: 'CRM access + ad account setup', status: 'active' },
  { day: 'Wed', task: 'Blog content uploaded + scheduled', status: 'active' },
  { day: 'Thu', task: 'Technical SEO fixes deployed', status: 'active' },
  { day: 'Fri', task: 'First Meta Ads draft for review', status: 'active' },
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
            90-Day Solar Scaler
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            The Roadmap to
            <span className="text-[#E8192C]"> 15+ Leads/Month</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            A clear, month-by-month plan to transform Solar Path from invisible to industry leader.
          </p>
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
              className={`bg-white border-2 rounded-2xl p-6 md:p-8 transition-all duration-500 ${
                activeMonth === index ? 'opacity-100 scale-100' : 'hidden'
              }`}
              style={{ borderColor: month.color }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: month.color }}
                    />
                    <h3 className="text-xl md:text-2xl font-black text-slate-900">{month.title}</h3>
                  </div>
                  <p className="text-slate-500">{month.subtitle}</p>
                </div>
                <div 
                  className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
                  style={{ backgroundColor: month.color }}
                >
                  {month.outcome}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {month.items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={i}
                      className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${month.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: month.color }} />
                      </div>
                      <span className="text-sm md:text-base font-medium text-slate-700">{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Week 1 timeline */}
        <div className={`mt-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6 text-center">
            Week 1: We Hit the Ground Running
          </h3>
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            {week1Tasks.map((task, index) => (
              <div 
                key={index}
                className="flex-1 relative"
              >
                <div className={`bg-white border-2 border-slate-200 rounded-xl md:rounded-none ${
                  index === 0 ? 'md:rounded-l-xl' : ''
                } ${index === week1Tasks.length - 1 ? 'md:rounded-r-xl' : ''} p-4 h-full hover:border-[#E8192C] hover:bg-red-50 transition-all duration-300`}>
                  <div className="text-xs font-bold text-[#E8192C] mb-1">{task.day}</div>
                  <div className="text-sm text-slate-700">{task.task}</div>
                </div>
                {index < week1Tasks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-4 bg-white border-2 border-slate-200 rotate-45 -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ROI calculation */}
        <div className={`mt-12 bg-slate-900 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-6 text-center">
            Month 3 Maths: The Conservative Case
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">15</p>
              <p className="text-xs text-slate-400">Qualified Leads</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">×</p>
              <p className="text-xs text-slate-400 opacity-0">multiply</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-white">20%</p>
              <p className="text-xs text-slate-400">Close Rate</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-[#22C55E]">= 3</p>
              <p className="text-xs text-slate-400">New Installs</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm mb-2">At £8,500 average install value</p>
            <p className="text-3xl md:text-4xl font-black text-[#22C55E]">£25,500 Revenue</p>
            <p className="text-sm text-slate-400 mt-2">
              vs £2,000 retainer = <span className="text-[#22C55E] font-bold">12.75× ROI</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
