import Link from 'next/link'
import { ArrowRight, ListOrdered, Video, HelpCircle, Package, Zap } from 'lucide-react'

type FunnelStep = 'learn' | 'watch' | 'test' | 'buy' | 'upgrade'

interface NextStepCTAProps {
  currentStep: FunnelStep
}

const funnelSteps = {
  learn: {
    description: 'See the live call',
    href: '/live-call',
    next: 'watch' as FunnelStep,
  },
  watch: {
    description: 'Take the quiz',
    href: '/quiz',
    next: 'test' as FunnelStep,
  },
  test: {
    description: 'Get the toolkit',
    href: '/resources',
    next: 'buy' as FunnelStep,
  },
  buy: {
    description: 'Explore SolaFlow',
    href: '/solaflow',
    next: 'upgrade' as FunnelStep,
  },
  upgrade: {
    description: null,
    href: null,
    next: null,
  },
}

export function NextStepCTA({ currentStep }: NextStepCTAProps) {
  const nextStepKey = funnelSteps[currentStep].next
  if (!nextStepKey) return null

  const nextStep = funnelSteps[nextStepKey]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      <p className="text-slate-500 text-sm mb-2">Ready for the next step?</p>
      <Link 
        href={nextStep.href!} 
        className="inline-flex items-center gap-2 text-[#E8192C] font-semibold hover:gap-3 transition-all"
      >
        {nextStep.description}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
