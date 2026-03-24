'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Check, X } from 'lucide-react'
import { useCountUp } from '@/hooks/use-animate-on-scroll'

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
  { name: 'Cork', status: 'none', leads: 'No page (HQ!)' },
  { name: 'Limerick', status: 'none', leads: '0' },
  { name: 'Galway', status: 'none', leads: '0' },
]

export default function Pipeline() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const missedLeads = useCountUp(200, 1500, isVisible)

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

  const strongCounties = counties.filter(c => c.status === 'strong')
  const moderateCounties = counties.filter(c => c.status === 'moderate')
  const weakCounties = counties.filter(c => c.status === 'weak' || c.status === 'none')

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs md:text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            Geographic Coverage
          </span>
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-4">
            Where Your Leads Are Coming From
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            Your SEO presence is strongest in Dublin and Wicklow, but you are missing significant opportunities across Ireland.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Strong Coverage */}
          <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm transition-all duration-700 delay-100 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base">Strong Coverage</h3>
                <p className="text-xs md:text-sm text-slate-500">Ranking well organically</p>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              {strongCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600" />
                    <span className="font-medium text-green-700 text-sm md:text-base">{county.name}</span>
                  </div>
                  <span className="text-xs md:text-sm text-green-600 font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Moderate Coverage */}
          <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm transition-all duration-700 delay-200 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base">Moderate Coverage</h3>
                <p className="text-xs md:text-sm text-slate-500">Some visibility, room to grow</p>
              </div>
            </div>
            <div className="space-y-2 md:space-y-3">
              {moderateCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                    <span className="font-medium text-amber-700 text-sm md:text-base">{county.name}</span>
                  </div>
                  <span className="text-xs md:text-sm text-amber-600 font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>

          {/* No Coverage */}
          <div className={`bg-white rounded-xl md:rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm transition-all duration-700 delay-300 hover:shadow-xl md:col-span-2 lg:col-span-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm md:text-base">Missing Opportunities</h3>
                <p className="text-xs md:text-sm text-slate-500">No organic presence</p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
              {weakCounties.map((county, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-slate-50 rounded-lg opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
                    <span className="font-medium text-slate-500 text-sm md:text-base">{county.name}</span>
                  </div>
                  <span className="text-xs md:text-sm text-slate-400 font-semibold">{county.leads}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom insight */}
        <div className={`mt-8 md:mt-12 bg-gradient-to-r from-[#E8192C] to-[#F5921E] rounded-xl md:rounded-2xl p-5 md:p-8 text-white text-center transition-all duration-700 delay-500 hover:shadow-2xl hover:shadow-[#E8192C]/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
            You are invisible in 8 out of 12 key counties.
          </p>
          <p className="text-white/80 text-sm md:text-base">
            That is an estimated <span className="font-bold text-white">{missedLeads}+ leads per month</span> going to your competitors.
          </p>
        </div>
      </div>
    </section>
  )
}
