import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  CheckCircle2,
  Headphones,
  ListOrdered,
  MessageSquare,
  Settings,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

export const metadata: Metadata = {
  title: 'For Sales Reps — ETOTO Solar Sales Masterclass',
  description:
    'The closer\'s playbook. Framework, scripts, technical knowledge, sizing tools, objection handling. Everything a solar sales rep needs in one place.',
}

export default function SalesRepsPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Briefcase className="w-4 h-4" />
            For Sales Reps
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            Close like you built it.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Your job: design the right system, explain it so the customer understands,
            and close. Done well, you&apos;re the customer&apos;s technical advisor — not their
            salesperson.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            Your three competencies
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-8 text-balance">
            The framework, the technicals, the systems.
          </h3>

          <div className="space-y-5">
            {[
              {
                icon: ListOrdered,
                title: 'The 9-Step Framework',
                body: 'Rapport, discovery, energy audit, battery value, solar value, financials, objections, close, follow-up. Every call follows this skeleton. Customers feel a consistent experience; you free up cognitive load to focus on the customer in front of you.',
                primaryLink: '/steps',
                primaryLabel: 'The 9 Steps',
                secondaryLink: '/sales-script',
                secondaryLabel: 'Word-for-word script',
              },
              {
                icon: Wrench,
                title: 'Technical Mastery',
                body: 'Inverter sizing, battery pairing, string design, optimisers, phase logic, panel selection. The customer asks a technical question — you answer with confidence and tie it back to their setup. This is the differentiator competitors can\'t fake.',
                primaryLink: '/knowledge',
                primaryLabel: 'Knowledge library',
                secondaryLink: '/tools/inverter-sizing',
                secondaryLabel: 'Inverter Sizing Tool',
              },
              {
                icon: Settings,
                title: 'The Operating Systems',
                body: 'SolaFlow runs your quotes. HighLevel runs your pipeline. OpenSolar runs your designs. Master all three and you spend 60% less admin time, with cleaner data and tighter follow-up.',
                primaryLink: '/systems',
                primaryLabel: 'Systems playbooks',
                secondaryLink: '/systems/solaflow-mastery',
                secondaryLabel: 'SolaFlow manual',
              },
            ].map((c) => {
              const Icon = c.icon
              return (
                <div
                  key={c.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-[#E8192C]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#E8192C]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg sm:text-xl mb-2">
                        {c.title}
                      </h4>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                        {c.body}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={c.primaryLink}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
                        >
                          {c.primaryLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-slate-300">·</span>
                        <Link
                          href={c.secondaryLink}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#E8192C] transition-colors"
                        >
                          {c.secondaryLabel}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            Pre-call workflow
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-balance">
            What separates the £100K rep from the £40K rep.
          </h3>

          <div className="space-y-3">
            {[
              {
                step: '90 seconds before the call',
                action: 'Open the SolaFlow lead. Cross-check customer data vs auto-pull. Note any inconsistencies.',
              },
              {
                step: '60 seconds',
                action: 'Adjust the SolaFlow spec — override defaults based on what discovery captured. Sharpen the system before the customer sees it.',
              },
              {
                step: '30 seconds',
                action: 'Pre-stage the high anchor in SolaFlow. Headline number is 10 – 15% above your target close price.',
              },
              {
                step: 'Call starts',
                action: 'Share screen / send SolaFlow customer URL. Walk them through the live design. Adjust spec visibly as they answer questions.',
              },
              {
                step: 'Close',
                action: 'Deliver the actual price as a reveal below the anchor. Pause. Let them feel the gap.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#E8192C] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                    {s.step}
                  </p>
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                    {s.action}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-slate-900 text-white rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-1">
                  The hidden lever
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  Reps who do the 90-second prep close 22% higher than reps who open the
                  lead live on the call. Make this non-negotiable. Full workflow:{' '}
                  <Link
                    href="/systems/solaflow-mastery#pre-call"
                    className="text-[#E8192C] hover:underline font-semibold"
                  >
                    SolaFlow pre-call workflow
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            Your toolkit
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-balance">
            Everything you need, one click away.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { href: '/steps', label: 'The 9 Steps (framework)', icon: ListOrdered },
              { href: '/sales-script', label: 'Word-for-word script (gated)', icon: MessageSquare },
              { href: '/sales-framework', label: 'Sales Framework (flexible skeleton)', icon: MessageSquare },
              { href: '/live-call', label: 'Real call recording (45 min)', icon: Headphones },
              { href: '/knowledge', label: 'Knowledge Library (7 topics)', icon: BookOpen },
              { href: '/knowledge/glossary', label: 'Glossary', icon: BookOpen },
              { href: '/tools/inverter-sizing', label: 'Inverter Sizing Tool', icon: Calculator },
              { href: '/tools/optimiser-roi', label: 'Optimiser ROI Calculator', icon: Calculator },
              { href: '/formula-cheat-sheet', label: 'Formula Cheat Sheet', icon: Calculator },
              { href: '/systems/customer-discovery-mastery', label: 'Discovery Question Library', icon: MessageSquare },
              { href: '/systems/solaflow-mastery', label: 'SolaFlow Operator\'s Manual', icon: Settings },
              { href: '/systems/highlevel-playbook', label: 'HighLevel CRM Playbook', icon: Settings },
              { href: '/systems/opensolar-workflow', label: 'OpenSolar Workflow', icon: Wrench },
              { href: '/appointment-quiz', label: 'Appointment-setter quiz', icon: CheckCircle2 },
            ].map((q) => {
              const Icon = q.icon
              return (
                <Link
                  key={q.href}
                  href={q.href}
                  className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-xl p-4 transition-all hover:shadow-md flex items-center gap-3"
                >
                  <Icon className="w-5 h-5 text-[#E8192C] flex-shrink-0" />
                  <span className="font-semibold text-slate-900 text-sm flex-1 group-hover:text-[#E8192C] transition-colors">
                    {q.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#E8192C] transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Zap className="w-12 h-12 text-[#E8192C] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black mb-4 text-balance">
            One read of every page on this site.
          </h2>
          <p className="text-slate-300 mb-6 text-sm sm:text-base">
            That&apos;s the bar. Top reps know the framework, the technicals, and the
            systems cold. Customers feel it. So do your numbers.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
          >
            Back to the Masterclass
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
