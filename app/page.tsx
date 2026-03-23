'use client'

import Hero from '@/components/funnel/Hero'
import Problems from '@/components/funnel/Problems'
import Pipeline from '@/components/funnel/Pipeline'
import SEOProblems from '@/components/funnel/SEOProblems'
import LeakyFunnel from '@/components/funnel/LeakyFunnel'
import BlogProblem from '@/components/funnel/BlogProblem'
import Competitors from '@/components/funnel/Competitors'
import CaseStudy from '@/components/funnel/CaseStudy'
import AdStrategy from '@/components/funnel/AdStrategy'
import Services from '@/components/funnel/Services'
import Proof from '@/components/funnel/Proof'
import Reviews from '@/components/funnel/Reviews'
import AISpeed from '@/components/funnel/AISpeed'
import CTA from '@/components/funnel/CTA'
import Footer from '@/components/funnel/Footer'

export default function AuditFunnel() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <Hero />
      <Problems />
      <Pipeline />
      <SEOProblems />
      <LeakyFunnel />
      <BlogProblem />
      <Competitors />
      <CaseStudy />
      <AdStrategy />
      <Services />
      <Proof />
      <Reviews />
      <AISpeed />
      <CTA />
      <Footer />
    </main>
  )
}
