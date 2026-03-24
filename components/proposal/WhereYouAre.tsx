'use client'

import { useEffect, useState, useRef } from 'react'
import { TrendingUp, Users, Banknote, Target } from 'lucide-react'

function AnimatedCounter({ end, prefix = '', suffix = '', duration = 1500 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const metrics = [
  {
    icon: Users,
    value: 20,
    suffix: '',
    label: 'Installs Per Month',
    subtext: '4–5 per week, 1 team on the road',
    color: '#E8192C',
  },
  {
    icon: Banknote,
    value: 12,
    prefix: '€',
    suffix: 'K',
    label: 'Average Order Value',
    subtext: 'Sig / Aiko systems, premium positioning',
    color: '#E8192C',
  },
  {
    icon: TrendingUp,
    value: 240,
    prefix: '€',
    suffix: 'K',
    label: 'Current Monthly Revenue',
    subtext: '20 installs × €12,000',
    color: '#E8192C',
  },
  {
    icon: Target,
    value: 600,
    prefix: '€',
    suffix: 'K',
    label: 'Target Monthly Revenue',
    subtext: '50 installs × €12,000 — the goal',
    color: '#22C55E',
  },
]

export default function WhereYouAre() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            metrics.forEach((_, idx) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, idx])
              }, idx * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="where-you-are" className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-red-50/50 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#E8192C] rounded-full" />
            Where You Are Today
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4">
            The Numbers You Told Us
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl">
            Four to five installs per week. One team on the road, bones of a second ready to split out. 
            Premium Sigenergy and Aiko systems. A customer journey most installers could not dream of building.
          </p>
        </div>
        
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            const isVisible = visibleCards.includes(idx)
            
            return (
              <div 
                key={idx}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ backgroundColor: metric.color }}
                />
                
                {/* Icon */}
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${metric.color}15` }}
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: metric.color }} />
                </div>
                
                <p className="text-2xl md:text-4xl font-black mb-2" style={{ color: metric.color }}>
                  <AnimatedCounter end={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                </p>
                <p className="font-semibold text-slate-900 mb-1 text-sm md:text-base">{metric.label}</p>
                <p className="text-slate-500 text-xs md:text-sm">{metric.subtext}</p>
              </div>
            )
          })}
        </div>
        
        {/* Callout box */}
        <div className={`bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-[#E8192C] p-6 md:p-8 rounded-r-2xl transition-all duration-700 delay-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-slate-700 text-base md:text-lg leading-relaxed">
            <strong className="text-slate-900">The gap between €240K and €600K is not talent.</strong> It is not install quality. 
            It is not your teams. It is the engine that feeds them work. You have built everything else — 
            the customer portal, the cleanliness standards, the process refinements. Now it is time to 
            build the infrastructure that fills your calendar with high-intent homeowners who already 
            want what you sell.
          </p>
        </div>
      </div>
    </section>
  )
}
