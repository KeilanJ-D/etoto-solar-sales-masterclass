import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { caseStudies } from '@/lib/case-studies'
import CaseStudyCard from '@/components/case-studies/CaseStudyCard'
import RecognitionSection from '@/components/shared/RecognitionSection'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import ParallaxBlobs from '@/components/shared/ParallaxBlobs'

export const metadata: Metadata = {
  title: 'Case Studies — ETOTO Solar Sales Masterclass',
  description:
    'Real ETOTO clients, real numbers. £1.1M pipeline in 7 weeks (MCJ Energy). £4M projected revenue (AB Renewables). 67 sales/month (Halo). Read what we did and what they took from it.',
}

const HERO_STATS = [
  { value: 200, prefix: '£', suffix: 'M+', label: 'Client sales' },
  { value: 200, suffix: '+', label: 'UK installers' },
  { value: 5, prefix: '£', suffix: 'M/m', label: 'Avg client sales' },
]

export default function CaseStudiesIndexPage() {
  const featured = caseStudies.filter((c) => c.featured)
  const rest = caseStudies.filter((c) => !c.featured)

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">
        <ParallaxBlobs intensity="medium" />
        <div className="max-w-5xl mx-auto relative">
          <AnimateOnScroll variant="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Client Stories
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
              Real ETOTO clients.<br />
              <span className="text-slate-400">Real numbers.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Each case study below is a real installer business that used the ETOTO
              framework — either via the Masterclass, the 90-Day Scaler, or the 6-Month
              Programme. Same playbook, different outcomes.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-2xl">
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#E8192C]">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix || ''}
                      suffix={s.suffix || ''}
                      duration={1.6}
                    />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FEATURED CASE STUDIES */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-px bg-slate-200 flex-1" />
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-600">
                Featured stories
              </h2>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((c, i) => (
              <AnimateOnScroll
                key={c.slug}
                variant="fade-up"
                delay={i * 0.05}
                className="h-full"
              >
                <CaseStudyCard study={c} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* MORE CASE STUDIES */}
      {rest.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-18 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll variant="fade-up">
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px bg-slate-200 flex-1" />
                <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-600">
                  More stories
                </h2>
                <div className="h-px bg-slate-200 flex-1" />
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {rest.map((c, i) => (
                <AnimateOnScroll
                  key={c.slug}
                  variant="fade-up"
                  delay={i * 0.05}
                  className="h-full"
                >
                  <CaseStudyCard study={c} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      <RecognitionSection variant="full" />

      {/* CTA */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <TrendingUp className="w-12 h-12 text-[#E8192C] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
            Want to know what we&apos;d do for you?
          </h2>
          <p className="text-slate-300 mb-7 max-w-xl mx-auto text-sm sm:text-base">
            Read the methodology in the Masterclass. Or have us run it for you via the
            90-Day Scaler or 6-Month Programme.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/complete-toolkit"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
            >
              Buy the Masterclass — £1,000 + VAT
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/agency"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
            >
              Explore the Agency
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
