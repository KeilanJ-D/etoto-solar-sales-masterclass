'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type FunnelStep = 'learn' | 'watch' | 'test' | 'buy' | 'upgrade'

interface NextStepCTAProps {
  currentStep: FunnelStep
}

interface StepConfig {
  label: string
  href: string
}

// Direct map: given currentStep, what is the next destination?
const nextStepMap: Partial<Record<FunnelStep, StepConfig>> = {
  learn: { label: 'See the live call', href: '/live-call' },
  watch: { label: 'Take the quiz', href: '/quiz' },
  test: { label: 'Get the toolkit', href: '/resources' },
  buy: { label: 'Explore SolaFlow', href: '/solaflow' },
  // 'upgrade' has no next step
}

export function NextStepCTA({ currentStep }: NextStepCTAProps) {
  const next = nextStepMap[currentStep]
  if (!next) return null

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      <p className="text-slate-500 text-sm mb-2">Ready for the next step?</p>
      <Link
        href={next.href}
        className="inline-flex items-center gap-2 text-[#E8192C] font-semibold hover:gap-3 transition-all"
      >
        {next.label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
