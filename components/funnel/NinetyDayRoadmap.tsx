'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, CheckCircle, Zap, TrendingUp, Target, FileText, BarChart3, Users, Camera, Settings, Calculator, ArrowRight } from 'lucide-react'

const roadmap = [
  {
    month: 'Month 1',
    title: 'Capture & Launch',
    subtitle: 'Build the foundation, start generating',
    color: '#E8192C',
    installs: '+3',
    baseline: '20 → 23',
    leads: '~96',
    additionalGP: '€7,200',
    items: [
      { text: 'Video content shoot: 2 days on-site capturing installs, testimonials, team footage', icon: Camera },
      { text: 'Publish 10 SEO articles targeting 9,500+ monthly searches', icon: FileText },
      { text: 'Fix technical SEO issues (meta, schema, Core Web Vitals)', icon: Zap },
      { text: 'Launch Meta Ads with proven Irish solar creatives', icon: TrendingUp },
    ],
    keyDeliverable: 'Live ads running + all SEO content published. Pipeline building.',
  },
  {
    month: 'Month 2',
    title: 'Optimise & Scale',
    subtitle: 'Refine what works, cut what doesn\'t',
    color: '#F5921E',
    installs: '+8',
    baseline: '23 → 31',
    leads: '~96',
    additionalGP: '€19,200',
    items: [
      { text: 'Analyse Month 1 ad performance, double down on winning creatives', icon: BarChart3 },
      { text: 'A/B test landing pages and ad variations', icon: Target },
      { text: 'Add localised pages (Cork, Dublin, regional targeting)', icon: FileText },
      { text: 'Implement automated follow-up sequences in CRM', icon: Settings },
    ],
    keyDeliverable: 'First ETOTO-sourced sales closing. Optimised campaigns running.',
  },
  {
    month: 'Month 3',
    title: 'Compound & Grow',
    subtitle: 'Full pipeline converting, SEO compounding',
    color: '#22C55E',
    installs: '+16',
    baseline: '31 → 47',
    leads: '~96+',
    additionalGP: '€38,400',
    items: [
      { text: 'SEO content starts ranking (organic leads increase)', icon: TrendingUp },
      { text: 'Scale winning ad sets with retargeting audiences built', icon: Zap },
      { text: 'Review collection system active (build social proof)', icon: Users },
      { text: 'Prepare for capacity scaling (47+ installs ready)', icon: BarChart3 },
    ],
    keyDeliverable: 'Full pipeline converting. Combined organic + paid at scale.',
  },
]

const investmentItems = [
  { label: 'Video content production (1 shoot)', gbp: '£5,000', eur: '€5,790', desc: '2 shoot days · 5-10 testimonials · 100+ stills · 20+ short-form videos · 10+ ads ready to run' },
  { label: 'Monthly retainer × 3', gbp: '£6,000', eur: '€6,960', desc: '£2,000/month (standard is £3,000)' },
  { label: 'Monthly ad budget × 3', gbp: '£6,000', eur: '€6,960', desc: '€2,400/month generating ~240 leads' },
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
            From <span className="text-[#E8192C]">20</span> to <span className="text-[#22C55E]">47</span> Installs Per Month
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            €2,400/month ad budget. ~96 leads/month at €25 CPL. 16 additional sales at full run rate. Here's how we get there.
          </p>
        </div>

        {/* The Numbers */}
        <div className={`bg-slate-900 rounded-2xl p-6 md:p-8 mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-[#E8192C]" />
            <h3 className="text-lg font-bold text-white">The Numbers Behind The Plan</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-black text-white">€25</p>
              <p className="text-xs text-slate-400 mt-1">Cost per lead (conservative)</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-black text-white">1 in 6</p>
              <p className="text-xs text-slate-400 mt-1">Close rate</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-black text-white">€12,000</p>
              <p className="text-xs text-slate-400 mt-1">Average order value</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-2xl md:text-3xl font-black text-[#22C55E]">€2,400</p>
              <p className="text-xs text-slate-400 mt-1">Gross profit per install (20%)</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Note: Our Irish campaigns delivered €14-16 CPL. We're using €25 here to be ultra-conservative. As video creative and retargeting mature, CPL typically drops 20-30% — meaning real returns could be significantly higher.
          </p>
        </div>

        {/* Progress bar */}
        <div className={`mb-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        </div>

        {/* Month selector */}
        <div className={`flex justify-center gap-2 md:gap-4 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm">
                      {month.leads} leads
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm">
                      {month.baseline}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white font-bold text-sm" style={{ backgroundColor: month.color }}>
                      <TrendingUp className="w-4 h-4" />
                      <span>{month.installs} installs</span>
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

                {/* End of month projection */}
                <div className="bg-slate-900 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">End of Month</p>
                      <p className="text-sm text-white font-medium">{month.keyDeliverable}</p>
                    </div>
                  </div>
                  <div className="bg-[#22C55E] rounded-lg px-4 py-2 text-center">
                    <p className="text-xs text-green-900 font-medium">Additional GP</p>
                    <p className="text-lg font-black text-white">{month.additionalGP}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 90-Day Investment Breakdown */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 text-center mb-8">Your Total 90-Day Investment</h3>
          
          <div className="bg-slate-50 rounded-2xl overflow-hidden">
            <div className="divide-y divide-slate-200">
              {investmentItems.map((item, i) => (
                <div key={i} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{item.gbp}</p>
                    <p className="text-sm text-slate-500">{item.eur}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
              <p className="font-bold text-white text-lg">TOTAL 90-DAY INVESTMENT</p>
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-black text-white">£17,000</p>
                <p className="text-slate-400">€20,190</p>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className={`mt-12 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 text-center mb-8">What €20,190 Buys You</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {roadmap.map((month, i) => (
              <div key={i} className="bg-white border-2 border-slate-200 rounded-xl p-5 text-center hover:border-slate-300 transition-colors">
                <p className="text-sm font-semibold text-slate-500 mb-2">{month.month}</p>
                <p className="text-3xl font-black text-slate-900">{month.installs}</p>
                <p className="text-sm text-slate-500 mb-3">extra installs</p>
                <div className="flex items-center justify-center gap-2 text-[#22C55E]">
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-bold">{month.additionalGP} GP</span>
                </div>
              </div>
            ))}
          </div>

          {/* Big ROI number */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-center">
            <p className="text-slate-400 mb-2">Total Additional Gross Profit Over 90 Days</p>
            <p className="text-4xl md:text-6xl font-black text-white mb-4">€64,800</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8 pt-8 border-t border-slate-700">
              <div>
                <p className="text-sm text-slate-400">Total Investment</p>
                <p className="text-xl font-bold text-white">€20,190</p>
              </div>
              <div className="hidden md:block text-slate-600">→</div>
              <div>
                <p className="text-sm text-slate-400">Net Profit (after all costs)</p>
                <p className="text-xl font-bold text-[#22C55E]">€44,610</p>
              </div>
              <div className="hidden md:block text-slate-600">→</div>
              <div>
                <p className="text-sm text-slate-400">Return on Investment</p>
                <p className="text-xl font-bold text-[#E8192C]">3.2×</p>
              </div>
            </div>

            <p className="text-2xl md:text-3xl font-black text-white mt-8">
              Every €1 you invest returns <span className="text-[#22C55E]">€3.21</span> in gross profit.
            </p>
          </div>
        </div>

        {/* Bottom callout */}
        <div className={`mt-8 bg-[#E8192C] rounded-2xl p-6 md:p-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl font-black text-white mb-2">
            €20,190 in. €44,610 net profit. 90 days.
          </p>
          <p className="text-sm md:text-base text-red-100 max-w-2xl mx-auto">
            These are gross profit numbers — not revenue. After you've paid for materials, labour, and every euro of marketing spend, you're still €44k better off than if you'd done nothing. And Month 4 onwards, the retargeting audience is built, the video content is running, and the pipeline never stops filling. At steady state that's 16 extra installs/month = €38k additional GP every single month.
          </p>
        </div>
      </div>
    </section>
  )
}
