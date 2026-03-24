'use client'

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
    description: '3× posts per week — Mythbusters, educational, carousels. Video content from shoots woven in. Builds to 5–7 posts/week organic strategy.',
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
  return (
    <section className="bg-[#F2F4F7] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 animate-on-scroll">
          Optional Add-Ons
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6 animate-on-scroll stagger-1">
          Scale Further When Ready
        </h2>
        <p className="text-[#6B7280] text-lg max-w-2xl mb-12 animate-on-scroll stagger-2">
          Not required for the core system to work. Available when you want to accelerate.
        </p>
        
        {/* Add-on cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOns.map((addon, idx) => (
            <div 
              key={addon.title}
              className={`bg-white border-t-[3px] border-[#E2E5EA] hover:border-[#F5921E] transition-colors p-6 animate-on-scroll stagger-${idx + 1}`}
            >
              <addon.icon className="w-8 h-8 text-[#0A0A0A] mb-4" />
              <h3 className="font-heading text-lg font-bold text-[#0A0A0A] mb-2">
                {addon.title}
              </h3>
              <p className="font-heading text-2xl font-bold text-[#0A0A0A] mb-1">
                {addon.price}
              </p>
              <p className="text-[#6B7280] text-sm mb-1">{addon.priceEur}</p>
              {addon.details && (
                <p className="text-[#E8192C] text-xs font-semibold mb-4">{addon.details}</p>
              )}
              <p className="text-[#6B7280] text-sm leading-relaxed mt-4">
                {addon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
