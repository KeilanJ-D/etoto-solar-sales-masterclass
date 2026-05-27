import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  Trophy,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import {
  caseStudies,
  caseStudyBySlug,
  type CaseStudy,
} from '@/lib/case-studies'
import CaseStudyEmbed from '@/components/case-studies/CaseStudyEmbed'
import CaseStudyCard from '@/components/case-studies/CaseStudyCard'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

const PROGRAMME_INFO = {
  scaler: {
    label: '90-Day Growth Scaler',
    accent: 'amber',
    href: '/agency#scaler',
  },
  core: {
    label: '6-Month Growth Programme',
    accent: 'emerald',
    href: '/agency#core',
  },
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) return { title: 'Case Study — Not Found' }
  return {
    title: `${study.client} — ${study.headline} | ETOTO Case Study`,
    description: study.oneLineSummary,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = caseStudyBySlug(slug)
  if (!study) notFound()

  const programme = PROGRAMME_INFO[study.programme]
  const related: CaseStudy[] = caseStudies
    .filter((c) => c.slug !== study.slug && c.programme === study.programme)
    .slice(0, 3)

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <article>
        {/* HERO */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full font-medium">
                {study.client}
              </span>
              <span className="text-slate-500">·</span>
              <Link
                href={programme.href}
                className={`px-2.5 py-1 rounded-full font-semibold transition-colors ${
                  programme.accent === 'amber'
                    ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                }`}
              >
                {programme.label}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-balance leading-tight">
              {study.headline}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
              {study.oneLineSummary}
            </p>
            <p className="text-sm text-slate-500">
              {study.contactName} · {study.contactRole}
            </p>
          </div>
        </section>

        {/* EMBED + METRICS */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
            <AnimateOnScroll variant="fade-up" className="lg:col-span-3">
              <CaseStudyEmbed study={study} />
            </AnimateOnScroll>

            <AnimateOnScroll
              variant="fade-up"
              delay={0.15}
              className="lg:col-span-2 flex flex-col gap-4 sm:gap-5"
            >
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className={`rounded-2xl p-5 sm:p-6 ${
                    m.highlight
                      ? 'bg-gradient-to-br from-[#E8192C] to-[#D01622] text-white shadow-lg shadow-[#E8192C]/20'
                      : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                      m.highlight ? 'text-white/80' : 'text-slate-500'
                    }`}
                  >
                    {m.label}
                  </p>
                  <p
                    className={`text-3xl sm:text-4xl font-black leading-tight ${
                      m.highlight ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>

        {/* TRANSCRIPT */}
        <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll variant="fade-up">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                In their own words
              </p>
              <blockquote className="text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-medium italic relative pl-6 border-l-4 border-[#E8192C]">
                &ldquo;{study.transcript}&rdquo;
              </blockquote>
              <p className="text-sm text-slate-500 mt-5">
                — {study.contactName}, {study.contactRole} at {study.client}
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* WHAT WE DID + LESSONS */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <AnimateOnScroll variant="slide-right">
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#E8192C]/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#E8192C]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    What we did
                  </h2>
                </div>
                <ul className="space-y-3">
                  {study.whatWeDid.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#E8192C] flex-shrink-0 mt-1" />
                      <span className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slide-left">
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-amber-400/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    What you can take from this
                  </h2>
                </div>
                <ul className="space-y-3">
                  {study.lessons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                      <span className="text-sm sm:text-base text-slate-200 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* RELATED MASTERCLASS LINKS */}
        {study.relatedTopics && study.relatedTopics.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50 border-t border-slate-200">
            <div className="max-w-4xl mx-auto">
              <AnimateOnScroll variant="fade-up">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                  Apply the methodology yourself
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  This is in the Masterclass.
                </h2>
                <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-2xl">
                  Want to apply what we did for {study.client}? These Masterclass
                  sections cover exactly this.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {study.relatedTopics.map((slug) => (
                    <Link
                      key={slug}
                      href={`/systems/${slug}`}
                      className="group bg-white rounded-xl ring-1 ring-slate-200 hover:ring-[#E8192C]/40 p-4 transition-all hover:shadow-md flex items-center justify-between gap-3"
                    >
                      <span className="font-semibold text-slate-900 group-hover:text-[#E8192C] transition-colors text-sm capitalize">
                        {slug.replace(/-/g, ' ')}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E8192C] transition-colors" />
                    </Link>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-balance">
              Want a story like {study.client}&apos;s?
            </h2>
            <p className="text-slate-300 mb-7 max-w-xl mx-auto text-sm sm:text-base">
              {study.programme === 'scaler'
                ? `${study.client} ran the 90-Day Growth Scaler. Same playbook is available to you.`
                : `${study.client} runs on the 6-Month Growth Programme. Same systems are available to you.`}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={programme.href}
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                Explore the {programme.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/complete-toolkit"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                Or buy the Masterclass
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* RELATED CASE STUDIES */}
        {related.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-18 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
                More {programme.label} stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((c) => (
                  <CaseStudyCard key={c.slug} study={c} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  )
}
