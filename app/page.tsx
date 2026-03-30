import Hero from '@/components/funnel/Hero'
import TheProblem from '@/components/funnel/TheProblem'
import TheMethod from '@/components/funnel/TheMethod'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ListOrdered, Video, Phone, HelpCircle, Calculator, Package, ArrowRight } from 'lucide-react'
import { StatsBanner } from '@/components/shared/StatsBanner'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { GoogleReviewsCarousel } from '@/components/shared/GoogleReviewsCarousel'
import { stats, getVideoTestimonialById } from '@/lib/social-proof-data'

const ctaCards = [
  {
    icon: ListOrdered,
    title: 'The 9 Steps',
    description: 'The complete formula',
    href: '/steps',
    cta: 'Start Learning',
  },
  {
    icon: Video,
    title: 'Live Sales Call',
    description: 'Watch it happen',
    href: '/live-call',
    cta: 'Watch Now',
  },
  {
    icon: Phone,
    title: 'Appointment Setting',
    description: 'The setter playbook',
    href: '/appointment-setting',
    cta: 'Read the Playbook',
  },
  {
    icon: HelpCircle,
    title: 'Knowledge Quiz',
    description: '18 questions, 80% to pass',
    href: '/quiz',
    cta: 'Test Yourself',
  },
  {
    icon: Calculator,
    title: 'Calculator',
    description: 'Build a system live',
    href: '/steps#formula-calculator',
    cta: 'Try It',
  },
  {
    icon: Package,
    title: 'Resources & Toolkit',
    description: 'Scripts, frameworks, and more',
    href: '/resources',
    cta: 'Browse',
  },
]

export default function SalesMasterclass() {
  const evlmTestimonial = getVideoTestimonialById('evlm')
  const jemTestimonial = getVideoTestimonialById('jem-energy')
  
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* PART 1: THE HOOK */}
      <Hero />
      <TheProblem />
      <StatsBanner stats={stats} />
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
      
      {/* PART 3: CTA CARDS */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          {/* Quick Start CTA */}
          <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-10 sm:mb-12 text-center">
            <p className="text-slate-400 text-sm mb-2">New here?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/steps"
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-semibold px-6 py-3 rounded-full transition-colors min-h-[48px] touch-action-manipulation"
              >
                Start with the 9 Steps
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-slate-500 text-sm">or</span>
              <Link
                href="/steps#formula-calculator"
                className="text-white hover:text-[#E8192C] font-medium transition-colors"
              >
                Jump to the Calculator
              </Link>
            </div>
          </div>

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {ctaCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200 rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all hover:shadow-lg hover:border-slate-300 touch-action-manipulation"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8192C]/20 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8192C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 sm:mb-1">{card.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">{card.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#E8192C] group-hover:gap-2 transition-all">
                        {card.cta}
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* PART 4: JEM ENERGY VIDEO TESTIMONIAL */}
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
      
      {/* PART 5: SOLAFLOW TEASER */}
      <SolaFlowDemo />
      
      {/* PART 6: GOOGLE REVIEWS CAROUSEL */}
      <GoogleReviewsCarousel />
      
      <Footer />
    </main>
  )
}
