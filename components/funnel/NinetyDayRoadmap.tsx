'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, CheckCircle, Zap, TrendingUp, Target, FileText, BarChart3, Users, ArrowRight, Calculator } from 'lucide-react'

const roadmap = [
  {
    month: 'Month 1',
    title: 'Foundation',
    subtitle: 'Build the lead engine',
    color: '#E8192C',
    installs: '20 → 25',
    leads: '40-50',
    items: [
      { text: 'Publish 10 SEO articles targeting 9,500+ monthly searches', icon: FileText },
      { text: 'Fix 83 technical SEO issues (meta, schema, Core Web Vitals)', icon: Zap },
      { text: 'Launch lead-gated solar calculator (capture every visitor)', icon: Target },
      { text: 'Deploy CRM + automated follow-up (no lead left behind)', icon: BarChart3 },
    ],
    metrics: [
      { label: 'Organic Keywords', value: '40+', note: 'rankings started' },
      { label: 'Lead Capture Rate', value: '8-12%', note: 'vs current ~2%' },
      { label: 'Response Time', value: '<5 min', note: 'automated' },
    ],
  },
  {
    month: 'Month 2',
    title: 'Scale',
    subtitle: 'Turn on paid acquisition',
    color: '#F5921E',
    installs: '25 → 35',
    leads: '60-80',
    items: [
      { text: 'Launch Meta Ads (proven Irish creatives, €16 CPL target)', icon: TrendingUp },
      { text: 'Publish 4 localised pages (Cork, Dublin, Galway, Limerick)', icon: FileText },
      { text: 'Implement review collection (5-star social proof engine)', icon: CheckCircle },
      { text: 'A/B test landing pages (conversion rate optimisation)', icon: Target },
    ],
    metrics: [
      { label: 'Cost Per Lead', value: '€16-25', note: 'paid channels' },
      { label: 'Organic Leads', value: '15-20', note: 'SEO kicking in' },
      { label: 'Total Pipeline', value: '€400k+', note: 'quoted value' },
    ],
  },
  {
    month: 'Month 3',
    title: 'Compound',
    subtitle: 'Hit 50 install capacity',
    color: '#22C55E',
    installs: '35 → 50',
    leads: '100-120',
    items: [
      { text: 'Scale winning ad creatives (double budget on performers)', icon: TrendingUp },
      { text: 'SEO content hits page 1 (organic leads compound)', icon: BarChart3 },
      { text: 'Lead nurture sequences fully operational (warm → hot)', icon: Zap },
      { text: 'Installer capacity planning (prepare for growth)', icon: Users },
    ],
    metrics: [
      { label: 'Monthly Leads', value: '100+', note: 'combined channels' },
      { label: 'Close Rate', value: '25%+', note: 'qualified leads' },
      { label: 'Revenue Pipeline', value: '€1M+', note: 'annual run rate' },
    ],
  },
]

const investmentBreakdown = {
  retainer: 2000,
  adSpend: 2000,
  total: 4000,
  roi: {
    leads: 100,
    closeRate: 0.25,
    avgInstall: 8500,
    revenue: 212500,
    multiple: 53,
  }
}

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
            A data-driven roadmap to 2.5x your installation capacity. Based on real metrics from Irish solar campaigns.
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
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold" style={{ backgroundColor: month.color }}>
                    <Users className="w-4 h-4" />
                    <span>{month.installs} installs</span>
                  </div>
                </div>
              </div>

              {/* Content grid */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Actions */}
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Key Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Target Metrics</h4>
                    <div className="space-y-3">
                      {month.metrics.map((metric, i) => (
                        <div key={i} className="bg-slate-900 rounded-xl p-4">
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-xs text-slate-400">{metric.label}</span>
                            <span className="text-lg font-black text-white">{metric.value}</span>
                          </div>
                          <span className="text-xs text-slate-500">{metric.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className={`mt-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-[#F5921E]" />
            <h3 className="text-lg md:text-xl font-bold text-white">
              Month 3 ROI: The Conservative Maths
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Monthly Investment</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">ETOTO Retainer</span>
                  <span className="text-white font-bold">£{investmentBreakdown.retainer.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Recommended Ad Spend</span>
                  <span className="text-white font-bold">€{investmentBreakdown.adSpend.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-slate-400">Total Monthly</span>
                  <span className="text-xl font-black text-white">~£{investmentBreakdown.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Returns */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Month 3 Returns</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-white font-bold">{investmentBreakdown.roi.leads}</span> leads
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-white font-bold">{(investmentBreakdown.roi.closeRate * 100)}%</span> close
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span className="text-white font-bold">{investmentBreakdown.roi.leads * investmentBreakdown.roi.closeRate}</span> installs
                </div>
                <div className="text-slate-400 text-xs">
                  At €{investmentBreakdown.roi.avgInstall.toLocaleString()} average install value
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400">Monthly Revenue</span>
                  <span className="text-2xl font-black text-[#22C55E]">€{investmentBreakdown.roi.revenue.toLocaleString()}</span>
                </div>
                <div className="text-right text-sm text-[#22C55E] font-bold mt-1">
                  {investmentBreakdown.roi.multiple}× ROI
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-6 text-center text-sm text-slate-400">
            <span className="text-[#F5921E] font-semibold">Note:</span> These are conservative estimates. 
            Premier Energy achieved €16.18 CPL and 482 leads in 3 months.
          </div>
        </div>
      </div>
    </section>
  )
}
