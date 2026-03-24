'use client'

import Hero from '@/components/funnel/Hero'
import Problems from '@/components/funnel/Problems'
import Pipeline from '@/components/funnel/Pipeline'
import SEOProblems from '@/components/funnel/SEOProblems'
import LeakyFunnel from '@/components/funnel/LeakyFunnel'
import BlogProblem from '@/components/funnel/BlogProblem'
import Competitors from '@/components/funnel/Competitors'
import CompetitorContentGap from '@/components/funnel/CompetitorContentGap'
import BlogShowcase from '@/components/funnel/BlogShowcase'
import PremierEnergyCaseStudy from '@/components/funnel/PremierEnergyCaseStudy'
import NinetyDayRoadmap from '@/components/funnel/NinetyDayRoadmap'
import Services from '@/components/funnel/Services'
import Investment from '@/components/funnel/Investment'
import NextSteps from '@/components/funnel/NextSteps'
import Reviews from '@/components/funnel/Reviews'
import AISpeed from '@/components/funnel/AISpeed'
import CTA from '@/components/funnel/CTA'
import Footer from '@/components/funnel/Footer'

export default function AuditFunnel() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      {/* Part 1: The Audit - What's Broken */}
      <Hero />
      <Problems />
      <Pipeline />
      <SEOProblems />
      <LeakyFunnel />
      <BlogProblem />
      
      {/* Part 2: The Competition - Why You're Losing */}
      <Competitors />
      <CompetitorContentGap />
      
      {/* Part 3: The Proof - We Already Do This */}
      <PremierEnergyCaseStudy />
      
      {/* Part 4: The Solution - Here's What We Built */}
      <BlogShowcase />
      
      {/* Part 5: The Plan - How We'll Do It */}
      <NinetyDayRoadmap />
      <Services />
      
      {/* Part 6: The Investment */}
      <Investment />
      <NextSteps />
      
      {/* Part 7: Social Proof & Close */}
      <Reviews />
      <AISpeed />
      <CTA />
      <Footer />
    </main>
  )
}
