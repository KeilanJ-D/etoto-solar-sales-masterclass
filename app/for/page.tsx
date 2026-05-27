import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Briefcase, Handshake, Phone } from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

export const metadata: Metadata = {
  title: 'Choose Your Role — ETOTO Solar Sales Masterclass',
  description:
    'Different content for different jobs. Appointment setters, sales reps, partner agencies — curated entry points to the masterclass.',
}

const portals = [
  {
    href: '/for/appointment-setters',
    icon: Phone,
    title: 'Appointment Setters',
    body: 'Qualify, book, prep. The discovery question library, response-time discipline, the 30-second technical primer.',
    accent: 'bg-blue-500',
  },
  {
    href: '/for/sales-reps',
    icon: Briefcase,
    title: 'Sales Reps',
    body: 'Close like you built it. The 9-step framework, full technical mastery, the systems that handle the admin so you focus on closing.',
    accent: 'bg-[#E8192C]',
  },
  {
    href: '/for/partner-agencies',
    icon: Handshake,
    title: 'Partner Agencies',
    body: 'The source of truth for remote sales teams. Standards, escalation paths, onboarding playbook. Indistinguishable from in-house.',
    accent: 'bg-emerald-500',
  },
]

export default function ForRolesIndexPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto relative text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            Different content<br />
            <span className="text-slate-400">for different jobs.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Pick your role. We curate the framework, knowledge, scripts and systems
            differently for setters, reps, and partner agencies.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {portals.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.href}
                href={p.href}
                className="group bg-white border border-slate-200 hover:border-[#E8192C]/40 rounded-2xl p-6 sm:p-7 transition-all hover:shadow-xl hover:-translate-y-0.5 flex flex-col"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${p.accent} flex items-center justify-center mb-5`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 group-hover:text-[#E8192C] transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1 mb-5">
                  {p.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C]">
                  Open portal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
