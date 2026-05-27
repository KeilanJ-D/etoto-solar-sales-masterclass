import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

const isInternalSite = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

interface ResourceCTAProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  ctaText: string
  price?: string
}

export function ResourceCTA({ icon: Icon, title, description, href, ctaText, price }: ResourceCTAProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#E8192C]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
          <p className="text-sm text-slate-600 mb-3">{description}</p>
          <Link
            href={href}
            className="w-full sm:w-auto flex items-center justify-center sm:inline-flex gap-2 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-medium text-sm py-3 px-4 rounded-lg transition-colors min-h-[48px] touch-action-manipulation"
          >
            {ctaText}
            {!isInternalSite && price && <span className="opacity-80">— {price}</span>}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// Pre-configured CTAs for common cross-links
export function SalesScriptCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').FileText}
      title={isInternalSite ? "The full sales script" : "Want the exact script from this call?"}
      description="Get the word-for-word sales script used in every ETOTO-trained installer."
      href={isInternalSite ? "/sales-script" : "/complete-toolkit"}
      ctaText={isInternalSite ? "View the Script" : "View the Masterclass"}
    />
  )
}

export function LiveCallCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').Video}
      title="See the method in action"
      description="Watch a real 45-minute sales call that closed a deal using these exact techniques."
      href="/live-call"
      ctaText="Watch the Live Call"
    />
  )
}

export function QuizCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').HelpCircle}
      title="Test your knowledge"
      description="Take the solar sales quiz to see how well you understand the 9-step method."
      href="/quiz"
      ctaText="Take the Quiz"
    />
  )
}

export function CompleteToolkitCTA() {
  if (isInternalSite) return null

  return (
    <ResourceCTA
      icon={require('lucide-react').Package}
      title="The Complete Masterclass"
      description="The full operating system — framework, knowledge, sizing tools, systems playbooks. Lifetime access."
      href="/complete-toolkit"
      ctaText="View the Masterclass"
      price="£1,000 + VAT"
    />
  )
}

export function SolaFlowCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').Calculator}
      title="Want this for your business?"
      description="SolaFlow gives your team a branded proposal tool that closes deals faster."
      href="/solaflow"
      ctaText="Learn about SolaFlow"
      price="£200/month"
    />
  )
}

export function AppointmentQuizCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').ClipboardList}
      title={isInternalSite ? "Test your knowledge" : "Train your setters"}
      description="The Appointment Setting Quiz tests your team's lead qualification skills."
      href={isInternalSite ? "/appointment-quiz" : "/complete-toolkit"}
      ctaText={isInternalSite ? "Take the Quiz" : "View the Masterclass"}
    />
  )
}

export function FormulaCheatSheetCTA() {
  return (
    <ResourceCTA
      icon={require('lucide-react').Calculator}
      title={isInternalSite ? "The formula cheat sheet" : "Try the calculator on your phone"}
      description="The Formula Cheat Sheet gives you the maths to show customers during calls."
      href={isInternalSite ? "/formula-cheat-sheet" : "/complete-toolkit"}
      ctaText={isInternalSite ? "View the Cheat Sheet" : "View the Masterclass"}
    />
  )
}
