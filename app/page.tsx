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

export default function SalesMasterclass() {
  const evlmTestimonial = getVideoTestimonialById('evlm')
  const jemTestimonial = getVideoTestimonialById('jem-energy')
  
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
