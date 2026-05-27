import Link from 'next/link'
import { ArrowRight, BookOpen, Settings, Sparkles, Wrench } from 'lucide-react'
import Hero from '@/components/funnel/Hero'
import TheProblem from '@/components/funnel/TheProblem'
import TheMethod from '@/components/funnel/TheMethod'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import NavCards from '@/components/funnel/NavCards'
import { StatsBanner } from '@/components/shared/StatsBanner'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { GoogleReviewsCarousel } from '@/components/shared/GoogleReviewsCarousel'
import { stats, getVideoTestimonialById, clientLogos } from '@/lib/social-proof-data'
import { ClientLogos } from '@/components/shared/ClientLogos'
import RecognitionSection from '@/components/shared/RecognitionSection'
import AcademyLadder from '@/components/shared/AcademyLadder'
import CaseStudyCard from '@/components/case-studies/CaseStudyCard'
import { featuredCaseStudies } from '@/lib/case-studies'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'

export default function SalesMasterclass() {
  const evlmTestimonial = getVideoTestimonialById('evlm')
  const jemTestimonial = getVideoTestimonialById('jem-energy')
  const topCaseStudies = featuredCaseStudies().slice(0, 3)
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* PART 1: THE HOOK */}
      <Hero />
      
      {/* PART 2: NAVIGATION CARDS - Moved up for immediate engagement */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
              Explore the Masterclass
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Choose where to start
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Everything you need to sell solar professionally — from scripts to live demonstrations to hands-on tools.
            </p>
          </div>
          
          <NavCards />
        </div>
      </section>
      
      <TheProblem />
      <StatsBanner stats={stats} />

      {/* NEW: Knowledge + Systems intro */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
              More than a script
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 text-balance">
              The complete solar sales operating system.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Sales scripts are the surface. Underneath: a technical knowledge library,
              interactive sizing tools, and operator manuals for the systems your
              business actually runs on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <Link
              href="/knowledge"
              className="group bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-300 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Knowledge Library</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                7 deep technical topics. Inverter sizing, MPPT design, optimisers, single
                vs three-phase. Free.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700">
                Open library
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/systems"
              className="group bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 hover:border-emerald-300 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Systems Playbooks</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Operator manuals for SolaFlow, HighLevel CRM, OpenSolar, Customer
                Discovery. The systems your business runs on.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                Open playbooks
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              href="/tools/inverter-sizing"
              className="group bg-gradient-to-br from-amber-50 to-white border border-amber-200 hover:border-amber-300 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Interactive Tools</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Inverter Sizing Tool + Optimiser ROI Calculator. Real maths, real UK
                inverter database, real DNO checks.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
                Try the tools
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <TheMethod />
      
      {/* PART 2: EVLM VIDEO TESTIMONIAL */}
      {evlmTestimonial && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
                Client Success Story
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;{evlmTestimonial.stat}&rdquo;
              </h2>
            </div>
            <VideoTestimonial testimonial={evlmTestimonial} />
          </div>
        </section>
      )}
      
      {/* CLIENT LOGOS */}
      <ClientLogos logos={clientLogos} />
      
      {/* SOLAFLOW TEASER */}
      <SolaFlowDemo variant="teaser" />
      
      {/* GOOGLE REVIEWS CAROUSEL */}
      <GoogleReviewsCarousel />

      {/* RECOGNITION — awards lifted from pitch deck */}
      <RecognitionSection variant="compact" />

      {/* FEATURED CASE STUDIES */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
                  Real client stories
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-balance">
                  Same playbook. Different outcomes.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
              >
                See all case studies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topCaseStudies.map((c, i) => (
              <AnimateOnScroll key={c.slug} variant="fade-up" delay={i * 0.05}>
                <CaseStudyCard study={c} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* THE ACADEMY LADDER — the funnel master narrative */}
      <AcademyLadder />

      {/* JEM ENERGY TESTIMONIAL - Moved lower (first solar client, multi-7 fig) */}
      {jemTestimonial && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-xs sm:text-sm font-medium rounded-full mb-3">
                ETOTO&apos;s First Solar Client
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;{jemTestimonial.stat}&rdquo;
              </h2>
            </div>
            <VideoTestimonial testimonial={jemTestimonial} />
          </div>
        </section>
      )}
      
      <Footer />
    </main>
  )
}
