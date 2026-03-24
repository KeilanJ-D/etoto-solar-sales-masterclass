'use client'

import { useEffect } from 'react'
import ProposalHero from '@/components/proposal/ProposalHero'
import WhereYouAre from '@/components/proposal/WhereYouAre'
import IrishMarketProof from '@/components/proposal/IrishMarketProof'
import NinetyDayScaler from '@/components/proposal/NinetyDayScaler'
import FullSystem from '@/components/proposal/FullSystem'
import Investment from '@/components/proposal/Investment'
import OptionalAddOns from '@/components/proposal/OptionalAddOns'
import NextSteps from '@/components/proposal/NextSteps'
import ProposalClosing from '@/components/proposal/ProposalClosing'
import ProposalFooter from '@/components/proposal/ProposalFooter'
import StickyNav from '@/components/proposal/StickyNav'

export default function ProposalPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-white min-h-screen overflow-x-hidden">
      <StickyNav />
      <ProposalHero />
      <WhereYouAre />
      <div className="gradient-strip" />
      <IrishMarketProof />
      <NinetyDayScaler />
      <div className="gradient-strip" />
      <FullSystem />
      <Investment />
      <OptionalAddOns />
      <NextSteps />
      <ProposalClosing />
      <ProposalFooter />
    </main>
  )
}
