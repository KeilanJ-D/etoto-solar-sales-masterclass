import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type FunnelStep = 'learn' | 'watch' | 'test' | 'buy' | 'upgrade'

interface NextStepCTAProps {
  currentStep: FunnelStep
}

const funnelSteps: Record<FunnelStep, { description: string | null; href: string | null; next: FunnelStep | null }> = {
  learn: {
    description: 'See the live call',
    href: '/live-call',
    next: 'watch',
  },
  watch: {
    description: 'Take the quiz',
    href: '/quiz',
    next: 'test',
  },
  test: {
    description: 'Get the toolkit',
    href: '/resources',
    next: 'buy',
  },
  buy: {
    description: 'Explore SolaFlow',
    href: '/solaflow',
    next: null,
  },
  upgrade: {
    description: null,
    href: null,
    next: null,
  },
}

export function NextStepCTA({ currentStep }: NextStepCTAProps) {
  const current = funnelSteps[currentStep]
  if (!current.next) {
    // No next step — check if current step itself has a destination (for 'buy' → solaflow)
    const { href, description } = current
    if (!href || !description) return null
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <p className="text-slate-500 text-sm mb-2">Ready for the next step?</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-[#E8192C] font-semibold hover:gap-3 transition-all"
        >
          {description}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  const nextStep = funnelSteps[current.next]
  if (!nextStep.href || !nextStep.description) return null

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-center">
      <p className="text-slate-500 text-sm mb-2">Ready for the next step?</p>
      <Link
        href={nextStep.href}
        className="inline-flex items-center gap-2 text-[#E8192C] font-semibold hover:gap-3 transition-all"
      >
        {nextStep.description}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
