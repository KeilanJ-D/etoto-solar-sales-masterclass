'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Check, X } from 'lucide-react'

const counties = [
  { name: 'Dublin', status: 'strong', leads: '~180/mo' },
  { name: 'Wicklow', status: 'strong', leads: '~45/mo' },
  { name: 'Kildare', status: 'moderate', leads: '~30/mo' },
  { name: 'Meath', status: 'moderate', leads: '~25/mo' },
  { name: 'Louth', status: 'weak', leads: '~8/mo' },
  { name: 'Wexford', status: 'weak', leads: '~6/mo' },
  { name: 'Carlow', status: 'none', leads: '0' },
  { name: 'Kilkenny', status: 'none', leads: '0' },
  { name: 'Waterford', status: 'none', leads: '0' },
  { name: 'Cork', status: 'none', leads: '0' },
  { name: 'Limerick', status: 'none', leads: '0' },
  { name: 'Galway', status: 'none', leads: '0' },
]

export default function Pipeline() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const strongCounties = counties.filter(c => c.status === 'strong')
  const moderateCounties = counties.filter(c => c.status === 'moderate')
  const weakCounties = counties.filter(c => c.status === 'weak' || c.status === 'none')

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-gradient-to-b from-white to-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-[#E0F2FE] text-[#0369A1] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Geographic Coverage
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
            Where Your Leads Are Coming From
          </h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Your SEO presence is strongest in Dublin and Wicklow, but you are missing significant opportunities across Ireland.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Strong Coverage */}
          <div className={`bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                <Check className="w-5 h-5 text-[#166534]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E]">Strong Coverage</h3>
                <p className="text-sm text-[#64748B]">Ranking well organically</p>
              </div>
            </div>
            <div className="space-y-3">
              {strongCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#F0FDF4] rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#166534]" />
                    <span className="font-medium text-[#166534]">{county.name}</span>
                  </div>
                  <span className="text-sm text-[#166534] font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moderate Coverage */}
          <div className={`bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#92400E]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E]">Moderate Coverage</h3>
                <p className="text-sm text-[#64748B]">Some visibility, room to grow</p>
              </div>
            </div>
            <div className="space-y-3">
              {moderateCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#FFFBEB] rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#92400E]" />
                    <span className="font-medium text-[#92400E]">{county.name}</span>
                  </div>
                  <span className="text-sm text-[#92400E] font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>

          {/* No Coverage */}
          <div className={`bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <X className="w-5 h-5 text-[#991B1B]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A1A2E]">Missing Opportunities</h3>
                <p className="text-sm text-[#64748B]">No organic presence</p>
              </div>
            </div>
            <div className="space-y-3">
              {weakCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg opacity-60">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#64748B]" />
                    <span className="font-medium text-[#64748B]">{county.name}</span>
                  </div>
                  <span className="text-sm text-[#94A3B8] font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom insight */}
        <div className={`mt-12 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-2xl p-8 text-white text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl font-bold mb-2">
            You are invisible in 8 out of 12 key counties.
          </p>
          <p className="text-white/80">
            That is an estimated <span className="font-bold text-white">200+ leads per month</span> going to your competitors.
          </p>
        </div>
      </div>
    </section>
  )
}
