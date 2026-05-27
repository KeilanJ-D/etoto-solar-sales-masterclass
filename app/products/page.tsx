'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Filter,
  Layers,
  Sparkles,
  Sun,
  Zap,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import ParallaxBlobs from '@/components/shared/ParallaxBlobs'
import {
  brands,
  panels,
  batteries,
  inverters,
  type Brand,
  type IdealUseCase,
} from '@/lib/solaflow-products'

const TIER_BADGES: Record<string, { label: string; classes: string }> = {
  budget: { label: 'Budget', classes: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  value: { label: 'Value', classes: 'bg-blue-50 text-blue-700 ring-blue-200' },
  premium: { label: 'Premium', classes: 'bg-amber-50 text-amber-700 ring-amber-200' },
  specialty: {
    label: 'Specialty',
    classes: 'bg-purple-50 text-purple-700 ring-purple-200',
  },
}

const PRICE_BAND_LABELS: Record<string, string> = {
  low: '£',
  mid: '££',
  high: '£££',
  flagship: '££££',
}

const FILTERS: Array<{ id: IdealUseCase | 'all'; label: string }> = [
  { id: 'all', label: 'All brands' },
  { id: 'modular-stackable', label: 'Modular & stackable' },
  { id: 'ev-ready', label: 'EV-ready' },
  { id: 'heat-pump-household', label: 'Heat-pump household' },
  { id: 'budget-conscious', label: 'Budget' },
  { id: 'premium-aesthetic', label: 'Premium' },
  { id: 'european-made', label: 'European-made' },
  { id: 'all-in-one', label: 'All-in-one' },
  { id: 'three-phase', label: 'Three-phase' },
  { id: 'shaded-roof', label: 'Shaded roof' },
]

const CATEGORY_ICONS = {
  panels: Sun,
  batteries: Battery,
  inverters: Zap,
}

export default function ProductsShowcasePage() {
  const [activeFilter, setActiveFilter] = useState<IdealUseCase | 'all'>('all')

  const filteredBrands = useMemo(() => {
    if (activeFilter === 'all') return brands
    return brands.filter((b) => b.idealFor.includes(activeFilter))
  }, [activeFilter])

  const panelBrands = filteredBrands.filter((b) => b.productCategories.includes('panels'))
  const batteryBrands = filteredBrands.filter((b) =>
    b.productCategories.includes('batteries')
  )
  const inverterBrands = filteredBrands.filter((b) =>
    b.productCategories.includes('inverters')
  )

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">
        <ParallaxBlobs intensity="medium" colors={['#E8192C', '#10B981']} />
        <div className="max-w-5xl mx-auto relative">
          <AnimateOnScroll variant="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
              <Layers className="w-4 h-4" />
              Product Showcase
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
              Every brand we install.<br />
              <span className="text-slate-400">When, why, for who.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              13 brands across panels, batteries, and inverters — every one in the SolaFlow
              catalogue and ready to quote. Each brand page tells you the USPs, the install
              scenarios it wins, and the situations where it loses to something else.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sticky top-[60px] z-30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 flex-shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                  activeFilter === f.id
                    ? 'bg-[#E8192C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND GROUPS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14 sm:space-y-18">
        {/* PANELS */}
        {panelBrands.length > 0 && (
          <BrandGroup
            title="Panels"
            icon={Sun}
            iconColor="text-amber-500"
            brands={panelBrands}
          />
        )}
        {/* BATTERIES */}
        {batteryBrands.length > 0 && (
          <BrandGroup
            title="Batteries"
            icon={Battery}
            iconColor="text-emerald-600"
            brands={batteryBrands}
          />
        )}
        {/* INVERTERS */}
        {inverterBrands.length > 0 && (
          <BrandGroup
            title="Inverters"
            icon={Zap}
            iconColor="text-[#E8192C]"
            brands={inverterBrands}
          />
        )}
        {filteredBrands.length === 0 && (
          <div className="max-w-5xl mx-auto text-center py-16">
            <p className="text-slate-500">
              No brands match this filter. Clear the filter to see all 13 brands.
            </p>
          </div>
        )}
      </section>

      {/* CTA TO DEMO */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="w-12 h-12 text-[#E8192C] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
            Practise speccing systems with these products.
          </h2>
          <p className="text-slate-300 mb-7 max-w-xl mx-auto text-sm sm:text-base">
            Every brand on this page is in the SolaFlow product database. Open the Instant
            Estimator to spec a real system end-to-end — energy audit, battery selection,
            panels, payback.
          </p>
          <Link
            href="/formula-cheat-sheet"
            className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
          >
            Open the Formula Calculator
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function BrandGroup({
  title,
  icon: Icon,
  iconColor,
  brands,
}: {
  title: string
  icon: typeof Sun
  iconColor: string
  brands: Brand[]
}) {
  return (
    <div className="max-w-6xl mx-auto">
      <AnimateOnScroll variant="fade-up">
        <div className="flex items-center gap-3 mb-7">
          <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{title}</h2>
          <span className="text-sm text-slate-500">{brands.length} brand{brands.length === 1 ? '' : 's'}</span>
        </div>
      </AnimateOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {brands.map((b, i) => (
          <AnimateOnScroll key={b.slug} variant="fade-up" delay={i * 0.04}>
            <BrandCard brand={b} />
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  )
}

function BrandCard({ brand }: { brand: Brand }) {
  const tierBadge = TIER_BADGES[brand.tier]

  // Pull up to 3 representative product images for this brand (1 per category)
  const sampleImages: { src: string; alt: string }[] = []
  const firstPanel = panels.find((p) => p.brand === brand.exactName)
  if (firstPanel) sampleImages.push({ src: firstPanel.imagePath, alt: `${brand.exactName} panel` })
  const firstBattery = batteries.find((b) => b.brand === brand.exactName)
  if (firstBattery) sampleImages.push({ src: firstBattery.imagePath, alt: `${brand.exactName} battery` })
  const firstInverter = inverters.find((i) => i.brand === brand.exactName)
  if (firstInverter) sampleImages.push({ src: firstInverter.imagePath, alt: `${brand.exactName} inverter` })

  return (
    <Link
      href={`/products/${brand.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-[#E8192C]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Product thumbnail strip */}
      {sampleImages.length > 0 && (
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-5 flex items-center justify-center gap-3 min-h-[120px]">
          {sampleImages.map((img, idx) => (
            <div key={idx} className="h-20 w-20 flex items-center justify-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={80}
                height={80}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {brand.origin.split('(')[0].trim()}
            </p>
            <h3 className="font-black text-xl sm:text-2xl text-slate-900 group-hover:text-[#E8192C] transition-colors">
              {brand.exactName}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 ${tierBadge.classes}`}
            >
              {tierBadge.label}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {PRICE_BAND_LABELS[brand.priceBand]}
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-4">
          {brand.oneLineHook}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {brand.productCategories.map((c) => {
            const CIcon = CATEGORY_ICONS[c]
            return (
              <span
                key={c}
                className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full capitalize"
              >
                <CIcon className="w-3 h-3" />
                {c}
              </span>
            )
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            <CheckCircle2 className="inline w-3 h-3 text-emerald-500 mr-1" />
            {brand.usps.length} USPs · {brand.useThisWhen.length} use cases
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#E8192C]">
            View brand
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  )
}
