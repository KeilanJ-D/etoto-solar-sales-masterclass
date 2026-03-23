'use client'

import Hero from '@/components/funnel/Hero'
import Problems from '@/components/funnel/Problems'
import Pipeline from '@/components/funnel/Pipeline'
import SEOProblems from '@/components/funnel/SEOProblems'
import LeakyFunnel from '@/components/funnel/LeakyFunnel'
import Competitors from '@/components/funnel/Competitors'
import Services from '@/components/funnel/Services'
import Proof from '@/components/funnel/Proof'
import CTA from '@/components/funnel/CTA'

export default function FunnelPage() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Hero />
      <Problems />
      <Pipeline />
      <SEOProblems />
      <LeakyFunnel />
      <Competitors />
      <Services />
      <Proof />
      <CTA />
    </main>
  )
}
