'use client'

import { useEffect, useState, useRef } from 'react'
import { Phone, Share2, Globe } from 'lucide-react'

const addOns = [
  {
    icon: Phone,
    title: 'Appointment Setter',
    price: '£1,000/month',
    priceEur: '~€1,155',
    details: '+ £75 (~€86.50) per SAT appointment after first 10',
    description: 'Dedicated appointment setter working your leads. First 10 sat appointments per month included. Performance-based pricing after that.',
  },
  {
    icon: Share2,
    title: 'Organic Social Media',
    price: '£750/month',
    priceEur: '~€860',
    details: null,
    description: '3x posts per week — Mythbusters, educational, carousels. Video content from shoots woven in. Builds to 5–7 posts/week organic strategy.',
  },
  {
    icon: Globe,
    title: 'Brand New Website',
    price: '£5,000',
    priceEur: '~€5,750–€5,790',
    details: 'One-off',
    description: '8+ pages. SEO foundations. Built to convert traffic into booked surveys. See examples: grmenergyltd.com, halo-renewables.co.uk',
  },
]

export default function OptionalAddOns() {
  const [sectionVisible, setSectionVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
            addOns.forEach((_, idx) => {
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
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#F5921E]/10 text-[#F5921E] text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#F5921E] rounded-full" />
            Optional Add-Ons
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4">
            Scale Further When Ready
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Not required for the core system to work. Available when you want to accelerate.
          </p>
        </div>
        
        {/* Add-on cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {addOns.map((addon, idx) => {
            const Icon = addon.icon
            const isVisible = visibleCards.includes(idx)
            
            return (
              <div 
                key={addon.title}
                className={`group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Top accent - orange */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-[#F5921E]" />
                
                <div className="w-12 h-12 rounded-xl bg-[#F5921E]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#F5921E]" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {addon.title}
                </h3>
                <p className="text-2xl font-black text-slate-900 mb-1">
                  {addon.price}
                </p>
                <p className="text-slate-500 text-sm mb-1">{addon.priceEur}</p>
                {addon.details && (
                  <p className="text-[#E8192C] text-xs font-semibold mb-3">{addon.details}</p>
                )}
                <p className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-100">
                  {addon.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
