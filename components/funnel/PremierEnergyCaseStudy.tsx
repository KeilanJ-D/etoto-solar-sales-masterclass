'use client'

import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Users, Target, Zap, AlertTriangle, CheckCircle, XCircle, Clock, Phone, Calendar, FileText } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

const adExamples = [
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14%20Panel%20%26%205kWh%20Battery%20Package%20Ad%20V1-BOrCjBjfx9Pe1TxrPJekGDbIyZxAJp.png', 
    title: '14 Panel + Battery Package', 
    leads: 47,
    cpl: '€18.04',
    description: 'Best performer. Clear pricing with SEAI grant, professional imagery, strong value proposition.' 
  },
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4%2010%20Panel%20Package%20Ad%20V2-dKl3A3NnX3qAtsMQLh6aq1RnZKLkZR.png', 
    title: 'Starting from €4,799 V2', 
    leads: 106,
    cpl: '€14.29',
    description: 'Highest volume. Entry-level pricing appeals to first-time buyers with budget-friendly messaging.' 
  },
  { 
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Breaking%20News%20Grant-M2QurqMxxrUTkNEdTWEj2KS6zCHBji.png', 
    title: 'Breaking News Format', 
    leads: 0,
    cpl: 'Engagement',
    description: 'Pattern interrupt for brand awareness. 318 likes, 778 clicks — builds audience for retargeting.' 
  },
]

const pipelineStages = [
  { stage: 'Quote Given (+45 Days)', count: 78, value: '€542,500', color: '#F5921E', severity: 'orange', note: 'Quoted and abandoned. 45+ days with no follow-up.' },
  { stage: 'New Leads (untouched)', count: 32, value: '€22,500', color: '#EF4444', severity: 'red', note: 'Never contacted. Never called. Never emailed.' },
  { stage: 'Further Action Required', count: 21, value: '€157,500', color: '#EF4444', severity: 'red', note: 'Flagged for action that never came.' },
  { stage: 'Site Visit Required', count: 10, value: '€72,500', color: '#EF4444', severity: 'red', note: 'Agreed to a visit. Nobody went.' },
  { stage: 'Outside Service Area', count: 6, value: '€45,000', color: '#64748B', severity: 'grey', note: 'Legitimate disqualification.' },
  { stage: 'Quote Required', count: 4, value: '€30,000', color: '#EF4444', severity: 'red', note: 'Waiting for a quote that never came.' },
  { stage: 'Called (No Answer)', count: 2, value: '€15,000', color: '#EF4444', severity: 'red', note: 'Called once. Never again.' },
  { stage: 'Call Back Arranged', count: 2, value: '€15,000', color: '#EF4444', severity: 'red', note: 'Callback booked. Never made.' },
]

const killerStats = [
  { 
    number: 78, 
    color: '#F5921E',
    text: 'Leads were quoted and then abandoned',
    subtext: '45+ days with no follow-up. No chase. No call. No email. €542,500 in quoted pipeline value left to rot.',
    context: 'These homeowners were interested enough to get a quote. They were waiting to hear back. Nobody called.'
  },
  { 
    number: 32, 
    color: '#EF4444',
    text: 'Leads never left the "New Leads" stage',
    subtext: 'Never contacted. Never called. Never emailed. They filled in a form, handed over their details, and were ignored.',
    context: 'At €16.18 per lead, that is €518 in ad spend generating leads that nobody ever spoke to.'
  },
  { 
    number: 0, 
    color: '#EF4444',
    text: 'Zero closed deals. Zero installations. Zero revenue.',
    subtext: 'Out of 245 leads and €900,000 in pipeline value — not a single euro of revenue was generated.',
    context: 'The campaigns worked. The leads were real. The sales process did not exist.'
  },
]

export default function PremierEnergyCaseStudy() {
  const [isVisible, setIsVisible] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [activeAd, setActiveAd] = useState(0)
  const [expandedStat, setExpandedStat] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const leadsGenerated = useCountUp(245, 2000, showStats)
  const costPerLead = useCountUp(16, 1500, showStats)
  const pipelineValue = useCountUp(900, 2000, showStats)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowStats(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveAd(prev => (prev + 1) % adExamples.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#E8192C]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F5921E]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#F5921E]/20 text-[#F5921E] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            Irish Market Case Study
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-balance">
            What <span className="text-[#F5921E]">€900,000</span> in Pipeline Looks Like
            <br className="hidden md:block" />
            <span className="text-[#EF4444]"> When Nobody Follows Up.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            We generated 245 leads for an Irish solar installer through Meta campaigns. €16.18 average cost per lead. 
            The leads entered their Go High Level CRM. Here is where every single one of them sits today — right now, as you read this.
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-4 italic">
            Note: Some leads in the ad account don't appear in the CRM — likely never imported, or lost in handoff. The numbers below are what we can verify in the system.
          </p>
        </div>

        {/* Top Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Users, label: 'Leads Generated', value: leadsGenerated, suffix: '', context: 'Feb - Jun 2025', good: true },
            { icon: Target, label: 'Cost Per Lead', value: costPerLead, prefix: '€', suffix: '.18', context: 'vs €40+ industry avg', good: true },
            { icon: Zap, label: 'Pipeline Value', value: pipelineValue, prefix: '€', suffix: 'k', context: 'Total quoted value', good: false },
          ].map((stat, i) => (
            <div 
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.good ? 'text-[#22C55E]' : 'text-[#F5921E]'}`} />
              <p className="text-3xl md:text-4xl font-black text-white">
                {stat.prefix}{stat.value}{stat.suffix}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              <p className={`text-xs mt-2 flex items-center justify-center gap-1 ${stat.good ? 'text-[#22C55E]' : 'text-[#F5921E]'}`}>
                {stat.good ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />} {stat.context}
              </p>
            </div>
          ))}
        </div>

        {/* Pipeline Visualisation */}
        <div className={`mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F5921E]" />
            The CRM Graveyard — Where Every Lead Sits Today
          </h3>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6">
            {/* Stacked bar */}
            <div className="h-12 md:h-16 rounded-xl overflow-hidden flex mb-6">
              {pipelineStages.map((stage, i) => {
                const total = pipelineStages.reduce((acc, s) => acc + s.count, 0)
                const width = (stage.count / total) * 100
                return (
                  <div 
                    key={i}
                    className="h-full flex items-center justify-center text-xs font-bold text-white/90 transition-all duration-500 hover:brightness-110 cursor-pointer"
                    style={{ 
                      width: `${width}%`, 
                      backgroundColor: stage.color,
                      transitionDelay: `${400 + i * 50}ms`
                    }}
                    title={`${stage.stage}: ${stage.count} leads (${stage.value})`}
                  >
                    {width > 8 && stage.count}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {pipelineStages.map((stage, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: stage.color }} />
                  <div>
                    <p className="text-white font-medium">{stage.stage}</p>
                    <p className="text-slate-500">{stage.count} leads · {stage.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom line */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-center">
              <div>
                <p className="text-2xl font-black text-[#22C55E]">0</p>
                <p className="text-xs text-slate-500">Closed Won</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#22C55E]">0</p>
                <p className="text-xs text-slate-500">Installed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#22C55E]">0</p>
                <p className="text-xs text-slate-500">Happy Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Four Killer Stats */}
        <div className={`mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg font-bold text-white mb-6">The Numbers That Matter</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {killerStats.map((stat, i) => (
              <div 
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:bg-white/10 transition-all duration-300"
                style={{ borderLeftColor: stat.color, borderLeftWidth: '4px' }}
                onClick={() => setExpandedStat(expandedStat === i ? null : i)}
              >
                <p className="text-4xl font-black mb-2" style={{ color: stat.color }}>{stat.number}</p>
                <p className="text-sm font-bold text-white mb-2">{stat.text}</p>
                <p className="text-xs text-slate-400">{stat.subtext}</p>
                
                {expandedStat === i && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-300 italic">{stat.context}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Two columns: Ads + What Solar Path Would Do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ad carousel */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#22C55E]" />
              The Ads We Ran (They Worked)
            </h3>
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 mb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg shadow-lg">
                {adExamples.map((ad, i) => (
                  <img 
                    key={i}
                    src={ad.image} 
                    alt={ad.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      activeAd === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}
              </div>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {adExamples.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeAd === i ? 'bg-white w-6' : 'bg-white/50 w-2'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white">{adExamples[activeAd].title}</h4>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[#22C55E] font-bold">{adExamples[activeAd].leads} leads</span>
                  <span className="text-slate-400">{adExamples[activeAd].cpl} CPL</span>
                </div>
              </div>
              <p className="text-sm text-slate-400">{adExamples[activeAd].description}</p>
            </div>
          </div>

          {/* What Solar Path Would Have Done */}
          <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#22C55E]" />
              What Solar Path Would Have Done Differently
            </h3>
            
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-5">
              <p className="text-sm text-slate-300 mb-4">
                If Solar Path had received these same 245 leads with their current sales process — SDRs making contact within hours, 
                site surveys booked within days, quotes turned around same-week — even a conservative 1-in-6 close rate produces:
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-black text-[#22C55E]">40</p>
                  <p className="text-xs text-slate-400">Sales</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-[#22C55E]">€12k</p>
                  <p className="text-xs text-slate-400">AOV</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black text-[#22C55E]">€480k</p>
                  <p className="text-xs text-slate-400">Revenue</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 italic">
                From the same leads. Same ad spend. Different process.
              </p>
            </div>

            {/* What Solar Path already has */}
            <div className="mt-4 space-y-2">
              {[
                { icon: Users, text: 'A structured sales process with defined stages and timelines' },
                { icon: Phone, text: 'SDRs being recruited specifically to handle initial contact' },
                { icon: Clock, text: 'A plan to respond to leads within hours, not days' },
                { icon: FileText, text: 'Go High Level as their CRM (they just need the automations built)' },
                { icon: Calendar, text: 'Install capacity (2 teams) that can handle the volume' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-[#22C55E] flex-shrink-0" />
                  <span className="text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Question */}
        <div className={`bg-slate-800 rounded-2xl p-6 md:p-8 mb-8 transition-all duration-700 delay-650 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-lg md:text-xl font-bold text-white mb-4">
            "How can you have clients doing £3.2 million in sales... and clients who sell nothing?"
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Fair question. Halo Solar (UK) has generated £3.2m+ in closed revenue using the exact same ETOTO strategy. 
            Same creative frameworks. Same ad account management. Same targeting methodology. Same everything.
          </p>
          <p className="text-sm text-slate-300 mb-4">
            <span className="font-semibold text-white">The difference?</span> Halo has a sales team that calls leads within 10 minutes. 
            They have a CRM process that chases quotes. They have owners who live in the pipeline.
          </p>
          <p className="text-sm text-slate-400 italic">
            We learned the hard way that marketing can only fill the top of the funnel — we can't close deals for you. 
            Which is exactly why we've evolved our service to include appointment setting and sales training for clients who need it.
          </p>
        </div>

        {/* Final Callout */}
        <div className={`bg-[#E8192C] rounded-2xl p-6 md:p-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl md:text-2xl font-black text-white mb-3">
            €900,000 in pipeline. Zero revenue.
          </h3>
          <p className="text-base text-white/90 mb-4">
            The leads were never the problem.
          </p>
          <p className="text-sm text-white/70 max-w-2xl mx-auto">
            Solar Path already has what this client did not — a sales process, a team, and a founder who will not let a single lead sit untouched. 
            The only missing piece is a system that fills the pipeline at scale. That is what we build.
          </p>
        </div>

        {/* Data note */}
        <div className={`mt-8 text-center transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-slate-500">
            Data source: Meta Ads Manager (Realm Energy Solutions) + Go High Level CRM live dashboard. Campaign period: 25 Feb - 1 Jun 2025.
          </p>
        </div>
      </div>
    </section>
  )
}
