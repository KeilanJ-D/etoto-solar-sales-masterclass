import Hero from '@/components/funnel/Hero'
import TheProblem from '@/components/funnel/TheProblem'
import TheMethod from '@/components/funnel/TheMethod'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ListOrdered, Video, Phone, HelpCircle, Calculator, Package, ArrowRight, Zap } from 'lucide-react'
import { StatsBanner } from '@/components/shared/StatsBanner'
import { VideoTestimonial } from '@/components/shared/VideoTestimonial'
import { GoogleReviewsCarousel } from '@/components/shared/GoogleReviewsCarousel'
import { stats, getVideoTestimonialById, clientLogos } from '@/lib/social-proof-data'
import { ClientLogos } from '@/components/shared/ClientLogos'

const ctaCards = [
  {
    icon: ListOrdered,
    title: 'The 9 Steps',
    description: 'The complete formula',
    href: '/steps',
    cta: 'Start Learning',
    accent: '#E8192C',
  },
  {
    icon: Video,
    title: 'Live Sales Call',
    description: 'Watch it happen',
    href: '/live-call',
    cta: 'Watch Now',
    accent: '#3B82F6',
  },
  {
    icon: Phone,
    title: 'Appointment Setting',
    description: 'The setter playbook',
    href: '/appointment-setting',
    cta: 'Read the Playbook',
    accent: '#8B5CF6',
  },
  {
    icon: HelpCircle,
    title: 'Knowledge Quiz',
    description: '18 questions, 80% to pass',
    href: '/quiz',
    cta: 'Test Yourself',
    accent: '#F59E0B',
  },
  {
    icon: Calculator,
    title: 'Calculator',
    description: 'Build a system live',
    href: '/steps#formula-calculator',
    cta: 'Try It',
    accent: '#10B981',
    featured: true,
  },
  {
    icon: Package,
    title: 'Resources & Toolkit',
    description: 'Scripts, frameworks, and more',
    href: '/resources',
    cta: 'Browse',
    accent: '#6366F1',
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
      
      {/* Featured Result - YEERS Proof */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/solaflow#proof"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 rounded-xl p-5 sm:p-6 hover:bg-slate-800 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">Ad → SolaFlow → CRM → Close. 3 days. £13,100.</p>
                <p className="text-slate-400 text-sm">YEERS closed £24.4K in their first 2 weeks.</p>
              </div>
            </div>
            <span className="text-[#E8192C] font-medium flex items-center gap-1 group-hover:gap-2 transition-all text-sm whitespace-nowrap">
              See the full story
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
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
                  className={`group relative bg-white border rounded-lg sm:rounded-xl p-4 sm:p-6 transition-all duration-300 touch-action-manipulation hover:-translate-y-1 hover:shadow-xl ${
                    card.featured 
                      ? 'border-emerald-200 ring-2 ring-emerald-100' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Featured badge */}
                  {card.featured && (
                    <span className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${card.accent}15`,
                      }}
                    >
                      <Icon 
                        className="w-5 h-5 sm:w-6 sm:h-6 transition-colors" 
                        style={{ color: card.accent }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 sm:mb-1">{card.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">{card.description}</p>
                      <span 
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all"
                        style={{ color: card.accent }}
                      >
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
