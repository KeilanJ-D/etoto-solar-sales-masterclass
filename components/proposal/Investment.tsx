'use client'

import { Check } from 'lucide-react'

export default function Investment() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <p className="text-[#E8192C] text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center animate-on-scroll">
          The Investment
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-12 text-center animate-on-scroll stagger-1">
          What It Costs
        </h2>
        
        {/* Main price card */}
        <div className="border-2 border-[#E8192C] p-8 md:p-10 animate-on-scroll stagger-2">
          {/* Discount badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-[#E8192C] text-white text-xs font-bold px-4 py-2 tracking-wider">
              £1,000/MONTH DISCOUNT — IRISH MARKET LAUNCH RATE
            </span>
          </div>
          
          {/* Original price crossed out */}
          <p className="text-center text-[#9CA3AF] line-through mb-2">
            Standard retainer: £3,000/month
          </p>
          
          {/* Main price */}
          <div className="text-center mb-8">
            <p className="font-heading text-5xl md:text-6xl font-bold text-[#0A0A0A]">
              £2,000<span className="text-2xl font-normal text-[#6B7280]">/month</span>
            </p>
            <p className="text-[#6B7280] mt-2">Retainer (~€2,400)</p>
          </div>
          
          {/* Includes */}
          <div className="border-t border-[#E2E5EA] pt-6 mb-6">
            <p className="font-semibold text-[#0A0A0A] mb-4">Retainer includes:</p>
            <ul className="space-y-2">
              {[
                'Meta campaign management (awareness, engagement, lead gen)',
                'Go High Level CRM overhaul and ongoing management',
                'SolaFlow quiz funnel (branded, Irish market configured)',
                'Website management & CRO optimisation',
                'Ad creative production',
                'Weekly performance calls',
                'SEO & Google Ads audit (once access granted)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
                  <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ad budget */}
          <div className="border-t border-[#E2E5EA] pt-6 mb-6">
            <p className="font-semibold text-[#0A0A0A] mb-2">Recommended ad budget:</p>
            <p className="font-heading text-2xl font-bold text-[#0A0A0A]">
              £2,000<span className="text-base font-normal text-[#6B7280]">/month (~€2,400)</span>
            </p>
            <p className="text-[#6B7280] text-sm mt-2">
              Based on our Irish campaign data, this generates ~240 leads/month at €10 CPL
            </p>
          </div>
          
          {/* Video production */}
          <div className="border-t border-[#E2E5EA] pt-6 mb-6">
            <p className="font-semibold text-[#0A0A0A] mb-2">Video production (quarterly):</p>
            <p className="font-heading text-2xl font-bold text-[#0A0A0A]">
              £5,000<span className="text-base font-normal text-[#6B7280]"> per shoot (~€5,750–€5,790)</span>
            </p>
            <ul className="mt-4 space-y-1 text-sm text-[#6B7280]">
              <li>• 2 × video shoot days (we fly to Ireland)</li>
              <li>• 5–10 customer testimonials</li>
              <li>• 100+ stills</li>
              <li>• Team headshots</li>
              <li>• B-roll footage</li>
              <li>• 20+ short-form videos</li>
              <li>• 10+ educational ads ready to run</li>
            </ul>
          </div>
          
          {/* Consolidation frame */}
          <div className="bg-[#0A0A0A] p-6 -mx-8 md:-mx-10 -mb-8 md:-mb-10">
            <p className="text-[#9CA3AF] text-sm mb-3">
              You&apos;re currently spending ~€5,000/month across disconnected providers.
            </p>
            <p className="text-white text-lg font-semibold mb-3">
              Total monthly investment with ETOTO: <span className="text-[#E8192C]">~€4,800</span>
            </p>
            <p className="text-[#9CA3AF] text-sm">
              Less money. One provider. Everything integrated. Everything working.
            </p>
          </div>
        </div>
        
        {/* Terms */}
        <p className="text-center text-[#9CA3AF] text-sm mt-6 animate-on-scroll stagger-3">
          3-month minimum commitment. Cancel anytime after 90 days with 30 days notice.
        </p>
      </div>
    </section>
  )
}
