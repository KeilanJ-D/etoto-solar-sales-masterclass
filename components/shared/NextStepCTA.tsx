import Link from 'next/link'
import { ArrowRight, ListOrdered, Video, HelpCircle, Package, Zap } from 'lucide-react'

type FunnelStep = 'learn' | 'watch' | 'test' | 'buy' | 'upgrade'

interface NextStepCTAProps {
  currentStep: FunnelStep
}

const funnelSteps = {
  learn: {
    label: 'Step 1: Learn',
    description: 'Master the 9-step formula',
    href: '/steps',
    icon: ListOrdered,
    next: 'watch' as FunnelStep,
  },
  watch: {
    label: 'Step 2: Watch',
    description: 'See it in action',
    href: '/live-call',
    icon: Video,
    next: 'test' as FunnelStep,
  },
  test: {
    label: 'Step 3: Test',
    description: 'Quiz yourself',
    href: '/quiz',
    icon: HelpCircle,
    next: 'buy' as FunnelStep,
  },
  buy: {
    label: 'Step 4: Buy',
    description: 'Get the toolkit',
    href: '/resources',
    icon: Package,
    next: 'upgrade' as FunnelStep,
  },
  upgrade: {
    label: 'Step 5: Upgrade',
    description: 'Scale with SolaFlow',
    href: '/solaflow',
    icon: Zap,
    next: null,
  },
}

export function NextStepCTA({ currentStep }: NextStepCTAProps) {
  const nextStepKey = funnelSteps[currentStep].next
  if (!nextStepKey) return null

  const nextStep = funnelSteps[nextStepKey]
  const Icon = nextStep.icon

  return (
    <section className="py-8 px-4 sm:px-6 bg-slate-900">
      <div className="max-w-2xl mx-auto">
        <Link
          href={nextStep.href}
          className="flex items-center justify-between gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E8192C] flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Next up</p>
              <p className="text-white font-bold text-lg">{nextStep.label}</p>
              <p className="text-slate-400 text-sm">{nextStep.description}</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-[#E8192C] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
