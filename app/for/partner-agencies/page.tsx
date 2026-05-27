import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Handshake,
  ListChecks,
  MessageSquare,
  Settings,
  Shield,
  Target,
  Users,
  Wrench,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

export const metadata: Metadata = {
  title: 'Partner Agency Portal — ETOTO Solar Sales Masterclass',
  description:
    'The source of truth for partner agencies and remote sales businesses delivering against the ETOTO solar framework. Standards, systems, escalation paths.',
}

const pillars = [
  {
    icon: Target,
    title: 'Sales framework alignment',
    body: 'Every conversation runs on the 9-step framework. Same opener, same audit, same close. Customers should feel one brand, regardless of which agency rep they speak to.',
    link: '/steps',
    linkLabel: 'See the 9 steps',
  },
  {
    icon: Wrench,
    title: 'Technical depth',
    body: 'Reps speak the same technical language: inverter sizing, MPPT design, optimiser logic, DNO compliance. Customers can\'t tell the difference between an in-house ETOTO rep and a partner-agency rep.',
    link: '/knowledge',
    linkLabel: 'Knowledge library',
  },
  {
    icon: Settings,
    title: 'Operating systems',
    body: 'SolaFlow for quotes, HighLevel for pipeline, OpenSolar for design. Same tools, same playbooks. New hires onboarded in 2 days, not 2 months.',
    link: '/systems',
    linkLabel: 'Systems playbooks',
  },
  {
    icon: MessageSquare,
    title: 'Discovery and qualification',
    body: 'The customer discovery question library is the floor — every rep covers every question. Lead quality is measured by intel extracted, not just by close rate.',
    link: '/systems/customer-discovery-mastery',
    linkLabel: 'Discovery mastery',
  },
]

const standards = [
  {
    icon: ListChecks,
    title: 'Response time',
    rule: 'New leads contacted within 5 minutes of form fill — auto-SMS first, human follow-up within 1 hour.',
    cost: 'Response time over 30 minutes drops conversion by 3 – 5×. Non-negotiable standard.',
  },
  {
    icon: ListChecks,
    title: 'Discovery floor',
    rule: 'Every appointment captures: actual bill (photo), tariff, supply type, peak loads (EV, heat pump), decision-maker presence.',
    cost: 'Missing any one of these means we re-pitch, lose time, or quote wrong.',
  },
  {
    icon: ListChecks,
    title: 'Quote standard',
    rule: 'Every quote spec must include: inverter model + MPPT count, battery usable kWh, DNO classification (G98/G99), expected install timeline.',
    cost: 'Vague quotes destroy trust on follow-up. Customer can\'t compare us properly to competitors.',
  },
  {
    icon: ListChecks,
    title: 'Follow-up cadence',
    rule: '24h post-quote: rep follow-up. 72h: auto-nurture if no reply. 7 days: manual rep check-in. 14 days: final automation.',
    cost: 'No-follow-up loses 40% of would-have-closed leads.',
  },
  {
    icon: ListChecks,
    title: 'CRM hygiene',
    rule: 'Every lead status updated within 24h of an interaction. Every lost lead tagged with reason. Every closed lead has spec locked.',
    cost: 'Dirty CRM = bad automations fire on wrong leads + manager can\'t see real pipeline.',
  },
  {
    icon: ListChecks,
    title: 'G99 timing',
    rule: 'G99 application submitted day of deposit on any system >3.68 kW single-phase or >11.04 kW three-phase. No exceptions.',
    cost: 'Late G99 = install delay = customer fury = refund risk.',
  },
]

const escalations = [
  {
    trigger: 'Customer asks technical question rep can\'t answer',
    path: 'Pause the call. "Great question — I want to give you the right answer, not a guess. Let me get our technical team on this and come back to you within 2 hours." → ping #tech-questions Slack channel → ETOTO tech responds within 1 hour with the answer + sales script.',
  },
  {
    trigger: 'Customer threatens to cancel post-deposit',
    path: 'Same-day escalation to ETOTO partner manager. Manager joins follow-up call. Most cancellations are misunderstanding, not actual cancellation — joint conversation usually resolves.',
  },
  {
    trigger: 'Complaint about installer behaviour during install',
    path: 'Immediate escalation to installer\'s ops manager + ETOTO partner manager. Resolution promised within 24h. Document in CRM with timestamps.',
  },
  {
    trigger: 'Customer asks for a brand or product not in the standard stock',
    path: 'Rep checks the Knowledge Library Product Selection page first. If the request is reasonable (e.g. specific panel brand for aesthetic), source via ETOTO procurement. If unreasonable (off-tier panel), explain the tier-1 rule and offer the equivalent.',
  },
  {
    trigger: 'Lead exceeds £30K system value',
    path: 'Auto-flagged in HighLevel + Slack to manager + ETOTO partner. VIP handling: ETOTO technical lead joins the quoting call. Higher conversion rate, bigger systems, longer relationship.',
  },
]

const onboardingPath = [
  {
    day: 'Day 1',
    title: 'Framework + voice',
    items: [
      'Watch full 9-step masterclass on /steps',
      'Listen to the real call recording on /live-call',
      'Read the Customer Discovery Mastery playbook',
      'Shadow 2 calls (ETOTO senior rep or partner manager)',
    ],
  },
  {
    day: 'Day 2',
    title: 'Technical baseline',
    items: [
      'Read all 7 Knowledge Library topics (inverter sizing, battery+inverter, strings/MPPT, optimisers, phase, panel selection, full design walkthrough)',
      'Complete the appointment-setting quiz',
      'Use the Inverter Sizing Tool on 5 mock scenarios',
      'Walk through the Optimiser ROI Calculator with 3 mock roofs',
    ],
  },
  {
    day: 'Day 3',
    title: 'Systems training',
    items: [
      'Walk SolaFlow Operator\'s Manual end-to-end with partner manager',
      'Set up HighLevel access, configure personal dashboard + smart lists',
      'Generate 3 practice OpenSolar designs',
      'Run first supervised real call',
    ],
  },
  {
    day: 'Week 2',
    title: 'Live calls + iteration',
    items: [
      'First solo calls with partner-manager review of recordings',
      'Daily 15-min standup',
      'Weekly performance review against pipeline KPIs',
    ],
  },
]

export default function PartnerAgenciesPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Handshake className="w-4 h-4" />
            Partner Agency Portal
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            The source of truth<br />
            <span className="text-slate-400">for every partner-agency rep.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-7">
            Welcome. You&apos;re running the ETOTO sales framework on behalf of an installer
            client. This portal is your operating manual: the standards, the systems, the
            scripts, the escalation paths. Read it before your first call.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#onboarding"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-6 rounded-full transition-all min-h-[52px]"
            >
              <Briefcase className="w-5 h-5" />
              Onboarding path
            </Link>
            <Link
              href="/steps"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-full transition-all min-h-[52px]"
            >
              The 9 Steps
            </Link>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            The four pillars
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 text-balance">
            What makes a partner rep indistinguishable from an in-house rep.
          </h2>
          <p className="text-slate-600 mb-10 max-w-3xl">
            Customers shouldn&apos;t be able to tell. Master these four pillars and they
            won&apos;t.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#E8192C]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#E8192C]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{p.body}</p>
                  <Link
                    href={p.link}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
                  >
                    {p.linkLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Non-negotiable standards
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 text-balance">
            The floor. Everyone hits these or doesn&apos;t play.
          </h2>
          <p className="text-slate-600 mb-10 max-w-3xl">
            Six standards measured weekly. Falling below any of them triggers a partner
            manager check-in.
          </p>

          <div className="space-y-3">
            {standards.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6"
                >
                  <div className="flex items-start gap-3 md:w-1/3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Standard
                      </p>
                      <p className="font-bold text-slate-900">{s.title}</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-2">
                    <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
                      {s.rule}
                    </p>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-red-600">Why it matters: </span>
                      {s.cost}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ESCALATION PATHS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Escalation paths
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 text-balance">
            When to call for backup.
          </h2>
          <p className="text-slate-600 mb-10 max-w-3xl">
            You won&apos;t be left swinging. These are the scenarios that get instant
            partner-manager involvement.
          </p>

          <div className="space-y-4">
            {escalations.map((e, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-amber-400 rounded-r-xl shadow-sm p-5 sm:p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="font-bold text-slate-900 text-base sm:text-lg">
                    {e.trigger}
                  </p>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed ml-8">
                  {e.path}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING */}
      <section
        id="onboarding"
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-2">
            Onboarding path
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 text-balance">
            From zero to live calls in 3 days.
          </h2>
          <p className="text-slate-600 mb-10 max-w-3xl">
            New rep starts Monday. By Wednesday they&apos;re running supervised calls. Week 2
            they&apos;re solo. No exceptions to this timeline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {onboardingPath.map((d) => (
              <div
                key={d.day}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-[#E8192C]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E8192C] flex items-center justify-center text-white font-black flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-[#E8192C]">
                      {d.day}
                    </p>
                    <p className="font-bold text-slate-900 text-lg">{d.title}</p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {d.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-7 text-balance">
            Bookmark these.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { href: '/steps', label: 'The 9 Steps', icon: ListChecks },
              {
                href: '/systems/customer-discovery-mastery',
                label: 'Discovery Question Library',
                icon: MessageSquare,
              },
              { href: '/knowledge', label: 'Knowledge Library', icon: BookOpen },
              {
                href: '/tools/inverter-sizing',
                label: 'Inverter Sizing Tool',
                icon: Wrench,
              },
              {
                href: '/tools/optimiser-roi',
                label: 'Optimiser Calculator',
                icon: Wrench,
              },
              { href: '/systems', label: 'All Systems Playbooks', icon: Settings },
              { href: '/sales-script', label: 'Word-for-word Script', icon: MessageSquare },
              { href: '/live-call', label: 'Live Call Recording', icon: MessageSquare },
              { href: '/knowledge/glossary', label: 'Glossary', icon: BookOpen },
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

      <Footer />
    </main>
  )
}
