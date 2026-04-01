'use client'

import { Check, Gift, ArrowRight } from 'lucide-react'

interface BuySectionProps {
  productName: string
  price: string
  bundlePrice: string
  buyLink: string
  bundleLink: string
  features?: string[]
}

export default function BuySection({
  productName,
  price,
  bundlePrice,
  buyLink,
  bundleLink,
  features = [],
}: BuySectionProps) {
  // Hide buy section on internal/client deployments
  if (process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true') {
    return null
  }

  const defaultFeatures = [
    'Instant access after purchase',
    'Lifetime access — no subscription',
    'All future updates included',
    'Works on desktop, tablet, and mobile',
  ]

  const allFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Master the {productName}?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            One purchase. Lifetime access. All future updates included.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Individual product */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="mb-6">
              <p className="text-sm text-slate-400 uppercase tracking-wide mb-2">Individual</p>
              <h3 className="text-xl font-bold text-white mb-1">{productName}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-white">{price}</span>
                <span className="text-slate-400">one-time</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {allFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {buyLink === '#' ? (
              <a
                href="mailto:keilan.jd@etotomedia.com?subject=Early%20Access%20Request"
                className="flex items-center justify-center gap-2 w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <span>Early Access - Coming Soon</span>
              </a>
            ) : (
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#E8192C] hover:bg-[#D01622] text-white font-semibold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <span>Buy for {price}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* Bundle */}
          <div className="relative bg-gradient-to-br from-[#E8192C] to-[#c01424] rounded-2xl p-6 md:p-8 border border-[#E8192C]">
            {/* Best value badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 bg-[#F5921E] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                <Gift className="w-4 h-4" />
                SAVE £5.97
              </span>
            </div>

            <div className="mb-6 pt-2">
              <p className="text-sm text-white/70 uppercase tracking-wide mb-2">Complete Toolkit</p>
              <h3 className="text-xl font-bold text-white mb-1">All 4 Products</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-white">{bundlePrice}</span>
                <span className="text-white/70 line-through">£15.96</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>Full Sales Script (£3.99)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>Sales Framework (£3.99)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>Appointment Setter Quiz (£3.99)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>Formula Cheat Sheet + Calculator (£3.99)</span>
              </li>
            </ul>

            {bundleLink === '#' ? (
              <a
                href="mailto:keilan.jd@etotomedia.com?subject=Complete%20Toolkit%20Early%20Access"
                className="flex items-center justify-center gap-2 w-full bg-white/80 hover:bg-white text-slate-700 font-bold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <span>Get All 4 - Coming Soon</span>
              </a>
            ) : (
              <a
                href={bundleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-100 text-[#E8192C] font-bold py-4 px-6 rounded-xl transition-all min-h-[56px]"
              >
                <span>Get All 4 for {bundlePrice}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Secure payment via Stripe
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Instant access after purchase
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            14-day money-back guarantee
          </span>
        </div>
      </div>
    </section>
  )
}
