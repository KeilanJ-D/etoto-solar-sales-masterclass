'use client'

import Hero from '@/components/funnel/Hero'
import Problems from '@/components/funnel/Problems'
import Pipeline from '@/components/funnel/Pipeline'
import SEOProblems from '@/components/funnel/SEOProblems'
import LeakyFunnel from '@/components/funnel/LeakyFunnel'
import BlogProblem from '@/components/funnel/BlogProblem'

import Transition from '@/components/funnel/Transition'

import CompetitorContentGap from '@/components/funnel/CompetitorContentGap'
import BlogShowcase from '@/components/funnel/BlogShowcase'

import PremierEnergyCaseStudy from '@/components/funnel/PremierEnergyCaseStudy'

import NinetyDayRoadmap from '@/components/funnel/NinetyDayRoadmap'

import Investment from '@/components/funnel/Investment'
import AddOns from '@/components/funnel/AddOns'
import FAQ from '@/components/funnel/FAQ'
import NextSteps from '@/components/funnel/NextSteps'

import Reviews from '@/components/funnel/Reviews'
import CTA from '@/components/funnel/CTA'
import Footer from '@/components/funnel/Footer'

export default function AuditFunnel() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      {/* ================================
          PART 1: THE AUDIT (pre-meeting)
          ================================ */}
      <Hero />
      <Problems />
      <Pipeline />
      <SEOProblems />
      <LeakyFunnel />
      <BlogProblem />
      
      {/* ================================
          TRANSITION
          ================================ */}
      <Transition />
      
      {/* ================================
          PART 2: THE EVIDENCE (post-meeting)
          ================================ */}
      <CompetitorContentGap />
      <BlogShowcase />
      <PremierEnergyCaseStudy />
      
      {/* ================================
          PART 3: THE PLAN
          ================================ */}
      <NinetyDayRoadmap />
      
      {/* ================================
          PART 4: THE OFFER
          ================================ */}
      <Investment />
      <AddOns />
      <FAQ />
      <NextSteps />
      
      {/* ================================
          PART 5: TRUST & CLOSE
          ================================ */}
      <Reviews />
      <CTA />
      <Footer />
    </main>
  )
}
