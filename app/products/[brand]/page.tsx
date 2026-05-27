import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
  Sun,
  XCircle,
  Zap,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import {
  brands,
  brandBySlug,
  panelsByBrand,
  batteriesByBrand,
  invertersByBrand,
} from '@/lib/solaflow-products'

export async function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params
  const b = brandBySlug(brand)
  if (!b) return { title: 'Brand — Not Found' }
  return {
    title: `${b.exactName} — When to install, USPs, full product range | ETOTO`,
    description: b.oneLineHook,
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params
  const b = brandBySlug(brand)
  if (!b) notFound()

  const panels = panelsByBrand(b.exactName)
  const batteries = batteriesByBrand(b.exactName)
  const inverters = invertersByBrand(b.exactName)
  const hasAnyProducts = panels.length + batteries.length + inverters.length > 0

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <article>
        {/* HERO */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              All brands
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full font-semibold capitalize">
                {b.tier}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">
                <MapPin className="inline w-3 h-3 mr-1" />
                {b.origin}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">
                {b.yearsInUk} in UK
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
              {b.exactName}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              {b.oneLineHook}
            </p>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll variant="fade-up">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                The brand in 60 seconds
              </p>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed">
                {b.longDescription}
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* USPs */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll variant="fade-up">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                What sets them apart
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-7 text-balance">
                Unique selling points
              </h2>
            </AnimateOnScroll>

            <ul className="space-y-3">
              {b.usps.map((u, i) => (
                <AnimateOnScroll key={i} variant="fade-up" delay={i * 0.05}>
                  <li className="flex items-start gap-3 bg-white rounded-xl p-4 sm:p-5 ring-1 ring-slate-200">
                    <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-sm sm:text-base leading-relaxed">
                      {u}
                    </span>
                  </li>
                </AnimateOnScroll>
              ))}
            </ul>
          </div>
        </section>

        {/* USE THIS WHEN / DON'T USE THIS WHEN */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <AnimateOnScroll variant="slide-right">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-7 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Use this when
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {b.useThisWhen.map((u, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slide-left">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-7 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-700" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Don&apos;t use this when
                  </h2>
                </div>
                <ul className="space-y-2.5">
                  {b.dontUseThisWhen.map((u, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-1" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* PRODUCT LINEUP */}
        {hasAnyProducts && (
          <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-18 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <AnimateOnScroll variant="fade-up">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                  Available in SolaFlow
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-8 text-balance">
                  The {b.exactName} product range
                </h2>
              </AnimateOnScroll>

              {panels.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <h3 className="text-xl font-bold text-slate-900">Panels</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {panels.map((p) => (
                      <div
                        key={p.sku}
                        className="bg-white rounded-xl ring-1 ring-slate-200 hover:ring-[#E8192C]/30 transition-all overflow-hidden flex flex-col"
                      >
                        <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
                          <Image
                            src={p.imagePath}
                            alt={`${p.brand} ${p.name} solar panel`}
                            width={220}
                            height={165}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-xs font-semibold uppercase text-slate-500">
                                {p.brand}
                              </p>
                              <p className="font-bold text-slate-900 text-base">{p.name}</p>
                            </div>
                            {p.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-3xl font-black text-[#E8192C] mb-3">
                            {p.wattage}W
                          </div>
                          <dl className="space-y-1 text-xs text-slate-600 mb-4">
                            <div className="flex justify-between">
                              <dt>Efficiency</dt>
                              <dd className="font-semibold text-slate-900">{p.efficiency}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Warranty</dt>
                              <dd className="font-semibold text-slate-900">{p.warranty}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Weight</dt>
                              <dd className="font-semibold text-slate-900">{p.weightKg} kg</dd>
                            </div>
                          </dl>
                          {p.datasheetPath && (
                            <a
                              href={p.datasheetPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8192C] hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View datasheet (PDF)
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {batteries.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <Battery className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-xl font-bold text-slate-900">Batteries</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {batteries.map((bat) => (
                      <div
                        key={bat.sku}
                        className="bg-white rounded-xl ring-1 ring-slate-200 hover:ring-[#E8192C]/30 transition-all overflow-hidden flex flex-col"
                      >
                        <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
                          <Image
                            src={bat.imagePath}
                            alt={`${bat.brand} ${bat.name} battery`}
                            width={220}
                            height={165}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-xs font-semibold uppercase text-slate-500">
                                {bat.brand}
                              </p>
                              <p className="font-bold text-slate-900 text-base">{bat.name}</p>
                            </div>
                            {bat.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                {bat.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-3xl font-black text-[#E8192C] mb-3">
                            {bat.capacityKwh} <span className="text-base">kWh</span>
                          </div>
                          <dl className="space-y-1 text-xs text-slate-600 mb-4">
                            <div className="flex justify-between">
                              <dt>Cycles</dt>
                              <dd className="font-semibold text-slate-900">{bat.cycles}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Warranty</dt>
                              <dd className="font-semibold text-slate-900">{bat.warranty}</dd>
                            </div>
                            {bat.maxPerStack && (
                              <div className="flex justify-between">
                                <dt>Max per stack</dt>
                                <dd className="font-semibold text-slate-900">
                                  {bat.maxPerStack}{' '}
                                  {bat.maxStacks && `× ${bat.maxStacks} stacks`}
                                </dd>
                              </div>
                            )}
                            {bat.hybrid && (
                              <div className="text-emerald-700 font-semibold mt-1">
                                ✓ Integrated inverter (no separate hybrid needed)
                              </div>
                            )}
                          </dl>
                          {bat.datasheetPath && (
                            <a
                              href={bat.datasheetPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8192C] hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View datasheet (PDF)
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {inverters.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <Zap className="w-5 h-5 text-[#E8192C]" />
                    <h3 className="text-xl font-bold text-slate-900">Inverters</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {inverters.map((inv) => (
                      <div
                        key={inv.sku}
                        className="bg-white rounded-xl ring-1 ring-slate-200 hover:ring-[#E8192C]/30 transition-all overflow-hidden flex flex-col"
                      >
                        <div className="aspect-[4/3] bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
                          <Image
                            src={inv.imagePath}
                            alt={`${inv.brand} ${inv.name} inverter`}
                            width={220}
                            height={165}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-xs font-semibold uppercase text-slate-500">
                                {inv.brand}
                              </p>
                              <p className="font-bold text-slate-900 text-base">{inv.name}</p>
                            </div>
                            {inv.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8192C]/10 text-[#E8192C] px-2 py-0.5 rounded-full">
                                {inv.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-3xl font-black text-[#E8192C] mb-3">
                            {inv.ratingKw} <span className="text-base">kW</span>
                          </div>
                          <dl className="space-y-1 text-xs text-slate-600 mb-4">
                            <div className="flex justify-between">
                              <dt>Efficiency</dt>
                              <dd className="font-semibold text-slate-900">{inv.efficiency}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Phase</dt>
                              <dd className="font-semibold text-slate-900">{inv.phaseType}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Warranty</dt>
                              <dd className="font-semibold text-slate-900">{inv.warranty}</dd>
                            </div>
                          </dl>
                          {inv.datasheetPath && (
                            <a
                              href={inv.datasheetPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8192C] hover:underline"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View datasheet (PDF)
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
              Spec a {b.exactName} system live.
            </h2>
            <p className="text-slate-300 mb-7 max-w-xl mx-auto text-sm sm:text-base">
              Open the Instant Estimator and configure a {b.exactName} system end-to-end —
              energy audit, battery, panels, payback.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/tools/instant-estimator"
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                Open the Instant Estimator
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                Browse other brands
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
