'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, X, Sparkles, ArrowRight, Gift } from 'lucide-react'

const includedItems = [
  'Full Meta Ads management (creative, targeting, optimisation)',
  'SEO content strategy + monthly blog articles',
  'CRM setup + lead nurturing automation',
  'Weekly performance reporting',
  'Dedicated account manager',
  'Landing page optimisation',
  'Competitor monitoring',
  'Quarterly strategy reviews',
]

const bonusItems = [
  { item: '10 SEO articles (10,590 words)', value: '£2,500' },
  { item: 'Technical SEO audit + fixes', value: '£750' },
  { item: 'Lead-gated calculator setup', value: '£500' },
]

export default function Investment() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-28 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            The Investment
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4">
            One Fee. Everything Included.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
            No hidden costs. No surprise invoices. Just predictable growth.
          </p>
        </div>

        {/* Main pricing card */}
        <div className={`bg-white border-2 border-[#E8192C] rounded-3xl overflow-hidden shadow-2xl shadow-[#E8192C]/10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          {/* Discount banner */}
          <div className="bg-[#E8192C] text-white py-3 px-6 text-center">
            <p className="font-semibold text-sm md:text-base">
              Launch Partner Discount — <span className="line-through opacity-75">£3,000</span> now <span className="font-black">£2,000/month</span>
            </p>
          </div>

          <div className="p-6 md:p-10">
            {/* Price display */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl md:text-7xl font-black text-slate-900">£2,000</span>
                <span className="text-xl text-slate-500">/month</span>
              </div>
              <p className="text-slate-500 mt-2">3-month minimum commitment</p>
            </div>

            {/* Included items */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-4">Everything included:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {includedItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                      transition: `all 0.5s ease ${400 + index * 50}ms`
                    }}
                  >
                    <Check className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus items */}
            <div className="bg-[#F5921E]/10 border border-[#F5921E]/30 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-[#F5921E]" />
                <h3 className="font-bold text-slate-900">Bonus: Included at No Extra Cost</h3>
              </div>
              <div className="space-y-3">
                {bonusItems.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{bonus.item}</span>
                    <span className="text-sm font-semibold text-[#F5921E] line-through">{bonus.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#F5921E]/30 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Bonus Value</span>
                <span className="font-black text-[#F5921E]">£3,750 FREE</span>
              </div>
            </div>

            {/* Comparison callout */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3">The Consolidation Opportunity</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-slate-500 text-sm">Current combined spend (SEO agency + ads)</p>
                  <p className="text-2xl font-bold text-slate-400 line-through">~£2,500+/month</p>
                </div>
                <ArrowRight className="w-6 h-6 text-[#E8192C] hidden md:block" />
                <div className="text-center md:text-right">
                  <p className="text-slate-500 text-sm">ETOTO All-in-One</p>
                  <p className="text-2xl font-bold text-[#22C55E]">£2,000/month</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center md:text-left">
                One partner. One invoice. One strategy. Better results.
              </p>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-slate-500">
            No long-term lock-in. After 3 months, continue month-to-month or walk away. 
            <span className="font-semibold text-slate-700"> We earn your business every month.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
