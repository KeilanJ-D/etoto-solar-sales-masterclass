'use client'

import { useEffect, useRef, useState } from 'react'
import { Phone, Camera, Globe, ExternalLink } from 'lucide-react'

export default function AddOns() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const addOns = [
    {
      icon: Phone,
      title: 'Appointment Setter',
      price: '£1,000/month',
      euroPrice: '~€1,155/month',
      description: 'Dedicated appointment setter calling your leads, booking sat appointments for your sales team. First 10 appointments per month included free.',
      extra: '+ £75 per sat appointment (~€86.50) — only payable after the first 10. You only pay for appointments that actually happen.',
      color: '#E8192C',
    },
    {
      icon: Camera,
      title: 'Organic Social Media',
      price: '£750/month',
      euroPrice: '~€860/month',
      description: '3 static posts per week — Mythbusters, educational, carousel content. Plus video shoot content (B-roll, stills, short-form) weaved in to create a 5–7 post/week organic strategy.',
      extra: 'Graphic design, caption writing, scheduling — all managed by us. Completely hands-off for you.',
      color: '#F5921E',
    },
    {
      icon: Globe,
      title: 'Brand New Website',
      price: '£5,000 one-off',
      euroPrice: '~€5,750–€5,790',
      description: '8+ pages minimum. SEO foundations laid from day one. Built to turn traffic into booked surveys. Not a brochure — a conversion machine.',
      extra: null,
      color: '#22C55E',
      portfolioLinks: [
        { name: 'Halo Renewables', url: 'https://halo-renewables.co.uk' },
        { name: 'GRM Energy', url: 'https://grmenergyltd.com' },
        { name: 'Fore UK', url: 'https://foreuk.co.uk' },
        { name: 'Generate Solar', url: 'https://generate-solarev.co.uk' },
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block px-4 py-1.5 bg-slate-200 text-slate-600 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase">
            Optional Add-Ons
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4">
            Scale When You're Ready
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            These sit on top of the core package. Add any at any time — no lock-in.
          </p>
        </div>

        {/* Add-on cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {addOns.map((addon, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${addon.color}15` }}
              >
                <addon.icon className="w-6 h-6" style={{ color: addon.color }} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{addon.title}</h3>
              
              <div className="mb-4">
                <span className="text-2xl font-black text-slate-900">{addon.price}</span>
                <span className="text-sm text-slate-500 ml-2">{addon.euroPrice}</span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                {addon.description}
              </p>

              {addon.extra && (
                <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                  {addon.extra}
                </p>
              )}

              {addon.portfolioLinks && (
                <div className="border-t border-slate-100 pt-3 mt-3">
                  <p className="text-xs text-slate-500 mb-2">See our work:</p>
                  <div className="flex flex-wrap gap-2">
                    {addon.portfolioLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#E8192C] hover:underline"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
