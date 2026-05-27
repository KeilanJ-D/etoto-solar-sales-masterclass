import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Film,
  Globe,
  Handshake,
  LineChart,
  Mail,
  Megaphone,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import RecognitionSection from '@/components/shared/RecognitionSection'
import AnimateOnScroll from '@/components/shared/AnimateOnScroll'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import ParallaxBlobs from '@/components/shared/ParallaxBlobs'
import { featuredCaseStudies } from '@/lib/case-studies'
import CaseStudyCard from '@/components/case-studies/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Work with ETOTO — Solar Sales Agency & Growth Programmes',
  description:
    'The agency behind the Masterclass. 90-Day Growth Scaler (£3,000/month) and 6-Month Growth Programme (£6,000/month). Driving £200M+ in client sales for UK solar installers.',
}

const HERO_STATS = [
  { value: 200, prefix: '£', suffix: 'M+', label: 'In client sales' },
  { value: 200, suffix: '+', label: 'UK installers' },
  { value: 5, prefix: '£', suffix: 'M/m', label: 'Avg client sales/month' },
  { value: 12, suffix: '', label: 'Full-time UK team' },
]

const CAPABILITIES = [
  {
    icon: Megaphone,
    title: 'Daily-built ads',
    body: 'Meta + Google ads designed, launched and iterated every working day in your service area.',
  },
  {
    icon: Target,
    title: 'Pre-qualified leads',
    body: 'No autofill, no flat-rate "100 leads a month" rubbish. Every lead has answered qualifying questions before they hit your inbox.',
  },
  {
    icon: Database,
    title: 'HighLevel CRM',
    body: 'Pipeline, automations, smart lists, SMS + email sequences. Everything in the Systems Playbook, built and wired for you.',
  },
  {
    icon: Sparkles,
    title: 'SolaFlow on your site',
    body: 'Branded proposal tool that quotes customers in real time. Anchors price, captures intel, hands warm leads to your reps.',
  },
  {
    icon: Phone,
    title: 'Partner sales reps',
    body: 'Need a setter or a closer? We have trained reps ready to plug into your team within days.',
  },
  {
    icon: Handshake,
    title: 'Wholesale partners',
    body: 'Direct relationships with Sigenergy, EcoFlow, Anker Solix, Hinen and more. Margin you can\'t access alone.',
  },
  {
    icon: ClipboardCheck,
    title: 'Sales framework + training',
    body: 'Bi-weekly training on the 9-step framework. Reps trained on the same playbook that drives £200M+ in client sales.',
  },
  {
    icon: Globe,
    title: 'Website + landing pages',
    body: 'Your website rebuilt for conversion. Plus dedicated landing pages per service for max paid-traffic efficiency.',
  },
  {
    icon: Film,
    title: 'Video content',
    body: 'Brand films, testimonial edits, social cuts. The face-to-trust content that compresses the sale.',
  },
  {
    icon: LineChart,
    title: 'Weekly reporting',
    body: 'Unit economics, not vanity metrics. CPL, CPA, close rate, AOV, pipeline value — reviewed weekly with your account manager.',
  },
]

const PROCESS_STEPS = [
  {
    n: 1,
    title: 'Intro call',
    body: 'A 20-minute call. We learn your business, your install capacity, your existing pipeline. You decide if we\'re the right fit.',
    duration: '20 mins',
  },
  {
    n: 2,
    title: 'Proposal',
    body: 'Custom proposal showing which programme fits, expected outcomes, and what month one looks like. No pressure to sign.',
    duration: 'Same week',
  },
  {
    n: 3,
    title: 'Onboarding',
    body: 'CRM set up, ads built, SolaFlow embedded, team trained on the framework. Live in 7-10 days.',
    duration: '7-10 days',
  },
  {
    n: 4,
    title: 'Launch + iterate',
    body: 'Ads go live. Leads start flowing. Weekly review with your account manager to tune what\'s working.',
    duration: 'Ongoing',
  },
  {
    n: 5,
    title: 'Scale',
    body: 'Once the lead engine is proven, we expand budget, add technologies, layer on sales coaching and partner unlocks.',
    duration: 'Months 2+',
  },
]

const SCALER_INCLUDES = [
  'Ads built and run daily',
  'Pre-qualified leads (no autofill)',
  'HighLevel CRM + lead tracking',
  'SolaFlow on your site',
  'Weekly reporting',
  '+2 sales/week target',
]

const CORE_EXTRAS = [
  { icon: Phone, label: 'Dedicated appointment setter' },
  { icon: Users, label: 'Bi-weekly sales training for your team' },
  { icon: UserCheck, label: 'Dedicated Founder + Installer Growth Manager' },
  { icon: ClipboardCheck, label: 'ETOTO sales framework training' },
  { icon: Trophy, label: 'Finance partner intro (FinMatch)' },
  { icon: Handshake, label: 'Wholesale partner intros (Sigenergy, EcoFlow, etc.)' },
  { icon: Sparkles, label: 'Incentive programme' },
  { icon: UserPlus, label: 'Commission-only rep unlock' },
  { icon: ShieldCheck, label: '30-day rep guarantee' },
  { icon: Film, label: 'Video content discount + 3 landing pages free' },
]

const FAQ = [
  {
    q: 'How is this different from the Masterclass?',
    a: 'The Masterclass IS the methodology — you read it, your team applies it. The agency programmes are us running the lead engine for you, with our team, our partners, and our daily ad management. You can self-serve the methodology or have us do it. Most installers start with the Masterclass and graduate to the 90-Day Scaler.',
  },
  {
    q: 'Can I cancel after the commitment?',
    a: 'Yes. The 90-Day Scaler is a 3-month commitment. The 6-Month Programme is 6 months. After that, you continue month-to-month or stop. No long-term contracts.',
  },
  {
    q: 'What happens if I don\'t hit the lead targets?',
    a: 'On the 90-Day Scaler we target +2 sales/week. If we miss the target inside the 90 days, we keep working at no extra cost until you do. On the 6-Month Programme the guarantees are stronger and include the 30-day rep guarantee.',
  },
  {
    q: 'Do you take a cut of sales?',
    a: 'No. Flat retainer + ad budget. The ad budget goes directly to Meta/Google — we never mark it up. No commission, no percentage of revenue, no hidden fees.',
  },
  {
    q: 'What technologies do you cover?',
    a: 'Solar PV, battery storage, air-source heat pumps and air conditioning. Each tech has a minimum monthly ad budget. Multi-tech installers get bundled pricing.',
  },
  {
    q: 'Is finance available for the programme fees?',
    a: 'Yes, iwocaPay 0% over 12 months on the retainer portion. Ad budget is paid monthly direct to Meta/Google and isn\'t financed. We\'ll walk you through the maths on the intro call.',
  },
  {
    q: 'How quickly can we start?',
    a: 'Onboarding takes 7-10 days from signed proposal to ads live. CRM setup, SolaFlow embed, ad creative, team training — all happens in parallel.',
  },
  {
    q: 'What if I\'m already running my own ads?',
    a: 'Great — we audit what\'s working, kill what isn\'t, and take over. UPS Solar came to us at £1,300 CPA from another agency. We brought it to £300 in one quarter.',
  },
]

export default function AgencyPage() {
  const featured = featuredCaseStudies().slice(0, 6)

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 overflow-hidden">
        <ParallaxBlobs intensity="medium" colors={['#E8192C', '#10B981']} />
        <div className="max-w-5xl mx-auto relative">
          <AnimateOnScroll variant="fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
              <Briefcase className="w-4 h-4" />
              The Agency
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
              The agency behind the Masterclass.<br />
              <span className="text-slate-400">£200M+ in client sales delivered.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
              ETOTO Media is a 12-person, full-stack renewables growth partner. We run
              the lead engine, CRM, sales coaching and partner network for 200+ UK
              installers. Two programmes: 90-Day Scaler to prove it, 6-Month Programme to
              scale it.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#programmes"
                className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                <Rocket className="w-5 h-5" />
                See the programmes
              </Link>
              <Link
                href="#intro-call"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-7 rounded-full transition-all min-h-[52px]"
              >
                <CalendarCheck className="w-5 h-5" />
                Book intro call
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.2}>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-5"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#E8192C]">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix || ''}
                      suffix={s.suffix || ''}
                      duration={1.6}
                    />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* PROGRAMMES — detailed (replaces Academy Ladder; the Ladder lives on /
      and /complete-toolkit instead — keeping /agency tight) */}
      <section id="programmes" className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                Two ways to work with us
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 text-balance">
                Read it · Done with you · Done for you.
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base mb-8">
                You&apos;ve already read the Masterclass — the methodology. Below are
                the two ways to have our team run that methodology in your business.
                Same lead engine, different commitment, different unlocks.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* SCALER */}
            <AnimateOnScroll variant="fade-up" id="scaler" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-3xl p-7 sm:p-8 h-full flex flex-col hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold bg-amber-500 text-white uppercase tracking-wide px-3 py-1.5 rounded-full">
                    Prove-it tier
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  90-Day Growth Scaler
                </h3>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Focused 3-month sprint. £1,500 retainer + £1,500 ad budget = £3,000/m
                  all-in. Lower commitment, leaner ops, full ETOTO playbook running
                  underneath.
                </p>

                <div className="bg-white rounded-2xl p-5 mb-5 border border-amber-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      £3,000
                    </span>
                    <span className="text-slate-500">/month all-in</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    £1,500 retainer + £1,500 minimum ad budget · 3-month commitment
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                    Outcome promise
                  </p>
                  <p className="text-slate-900 font-semibold leading-relaxed">
                    +2 sales/week within 90 days — or we keep working at no extra cost.
                  </p>
                </div>

                <div className="mb-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2 text-sm">
                    {SCALER_INCLUDES.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5 p-4 bg-amber-100/50 rounded-xl border border-amber-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
                    Best for
                  </p>
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Installers doing 1-2 jobs/week, founders new to paid acquisition,
                    teams who want to prove the model before a longer commit.
                  </p>
                </div>

                <Link
                  href="#intro-call"
                  className="mt-auto flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all min-h-[52px] shadow-lg shadow-amber-500/25"
                >
                  Book a 90-Day Scaler intro
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </AnimateOnScroll>

            {/* CORE */}
            <AnimateOnScroll variant="fade-up" delay={0.1} id="core" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-300 rounded-3xl p-7 sm:p-8 h-full flex flex-col hover:shadow-xl transition-all relative">
                <div className="absolute -top-3 right-7 inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                  <Zap className="w-3 h-3" />
                  Most chosen
                </div>

                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold bg-emerald-600 text-white uppercase tracking-wide px-3 py-1.5 rounded-full">
                    Full-stack
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                  6-Month Growth Programme
                </h3>
                <p className="text-slate-600 mb-6 text-sm sm:text-base">
                  Our flagship. £3,000 retainer + £3,000 ad budget = £6,000/m all-in.
                  Full ad management across all your technologies, dedicated setter,
                  sales training, account manager, partner unlocks.
                </p>

                <div className="bg-white rounded-2xl p-5 mb-5 border border-emerald-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      £6,000
                    </span>
                    <span className="text-slate-500">/month all-in</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    £3,000 retainer + £3,000 minimum ad budget · 6-month commitment
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                    Outcome promise
                  </p>
                  <p className="text-slate-900 font-semibold leading-relaxed">
                    Steps you off the tools. Sales team trained, setter installed,
                    partner network unlocked.
                  </p>
                </div>

                <div className="mb-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                    Everything in the Scaler, plus:
                  </p>
                  <ul className="space-y-2 text-sm">
                    {CORE_EXTRAS.map((item) => {
                      const Icon = item.icon
                      return (
                        <li
                          key={item.label}
                          className="flex items-start gap-2 text-slate-700"
                        >
                          <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mb-5 p-4 bg-emerald-100/50 rounded-xl border border-emerald-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">
                    Best for
                  </p>
                  <p className="text-sm text-emerald-900 leading-relaxed">
                    Established installers doing 3+ jobs/week consistently. Founders
                    ready to delegate sales + delivery. Teams chasing 8+ jobs/month per
                    crew.
                  </p>
                </div>

                <Link
                  href="#intro-call"
                  className="mt-auto flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all min-h-[52px] shadow-lg shadow-emerald-500/25"
                >
                  Book a 6-Month Programme intro
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll variant="fade-up" delay={0.2}>
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Both programmes include iwocaPay 0% finance on the retainer over 12
                months. Ad budget is paid monthly direct to Meta/Google — never
                financed, never marked up.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                What&apos;s actually under the hood
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 text-balance">
                Not just an ad agency. A full-stack growth partner.
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon
              return (
                <AnimateOnScroll key={c.title} variant="fade-up" delay={i * 0.03}>
                  <div className="bg-white rounded-2xl p-5 ring-1 ring-slate-200 hover:ring-[#E8192C]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all h-full">
                    <div className="w-10 h-10 rounded-lg bg-[#E8192C]/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#E8192C]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{c.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.body}</p>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                  What this looks like in practice
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 text-balance">
                  Same playbook. Different outcomes.
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
              >
                See all case studies
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((c, i) => (
              <AnimateOnScroll key={c.slug} variant="fade-up" delay={i * 0.05}>
                <CaseStudyCard study={c} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <RecognitionSection variant="full" />

      {/* PROCESS */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-12">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
                What happens after you say yes
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-3 text-balance">
                Intro call to ads live in 7-10 days.
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="relative">
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8192C]/30 via-slate-200 to-emerald-500/30"
            />
            <div className="space-y-5 sm:space-y-7">
              {PROCESS_STEPS.map((step, i) => (
                <AnimateOnScroll key={step.n} variant="fade-up" delay={i * 0.05}>
                  <div
                    className={`grid md:grid-cols-2 gap-5 items-center ${
                      i % 2 === 0 ? '' : 'md:[direction:rtl] md:text-right'
                    }`}
                  >
                    <div className={`relative ${i % 2 === 0 ? '' : 'md:[direction:ltr]'}`}>
                      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7 hover:shadow-xl transition-all relative">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-9 h-9 rounded-full bg-[#E8192C] flex items-center justify-center font-black text-sm">
                            {step.n}
                          </span>
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                            {step.duration}
                          </span>
                        </div>
                        <h3 className="text-xl font-black mb-2">{step.title}</h3>
                        <p className="text-sm text-slate-300 leading-relaxed">{step.body}</p>
                      </div>
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-px bg-slate-200 right-full" />
                    </div>
                    <div />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll variant="fade-up">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3 text-center">
              Common questions, honest answers
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 text-center text-balance">
              The things people ask before booking.
            </h2>
            <p className="text-slate-600 text-center mb-10 text-sm sm:text-base">
              Or just ask us live on the intro call.
            </p>
          </AnimateOnScroll>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <AnimateOnScroll key={item.q} variant="fade-up" delay={i * 0.03}>
                <details className="group bg-white rounded-xl ring-1 ring-slate-200 hover:ring-slate-300 transition-all">
                  <summary className="px-5 py-4 sm:px-6 sm:py-5 cursor-pointer flex items-start gap-3 list-none">
                    <span className="font-semibold text-slate-900 text-sm sm:text-base flex-1 pr-4">
                      {item.q}
                    </span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 text-xs">
                      ▼
                    </span>
                  </summary>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-slate-700 text-sm sm:text-base leading-relaxed">
                    {item.a}
                  </div>
                </details>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO CALL CTA */}
      <section
        id="intro-call"
        className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden scroll-mt-24"
      >
        <ParallaxBlobs intensity="subtle" colors={['#E8192C', '#F5921E']} />
        <div className="max-w-3xl mx-auto text-center relative">
          <AnimateOnScroll variant="fade-up">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#E8192C]/20 mb-5">
              <CalendarCheck className="w-7 h-7 text-[#E8192C]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 text-balance">
              Book a 20-minute intro call.
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto text-sm sm:text-base">
              No pitch. We learn your business, your install capacity, your pipeline.
              You decide if either programme is the right fit.
            </p>
            <a
              href="mailto:keilan.jd@etotomedia.com?subject=Solar%20Sales%20Masterclass%20%E2%80%94%20Agency%20Intro%20Call&body=Hi%20Keilan%2C%0A%0AI%27d%20like%20to%20book%20a%2020-minute%20intro%20call%20to%20learn%20about%20the%2090-Day%20Scaler%20%2F%206-Month%20Programme.%0A%0AA%20few%20things%20about%20us%3A%0A-%20%5BCompany%20name%5D%0A-%20%5BTechnologies%20we%20install%5D%0A-%20%5BJobs%20per%20month%20currently%5D%0A-%20%5BBest%20time%20to%20call%5D"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold py-5 px-10 rounded-full transition-all min-h-[64px] text-base sm:text-lg shadow-xl shadow-[#E8192C]/30"
            >
              <Mail className="w-5 h-5" />
              Book your 20-minute call
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-xs text-slate-500 mt-4">
              Goes straight to Keilan · response within one working day
            </p>
            <p className="text-sm text-slate-400 mt-6">
              Not ready yet?{' '}
              <Link
                href="/complete-toolkit"
                className="text-white hover:text-[#E8192C] transition-colors underline underline-offset-4"
              >
                Read the £1,000 Masterclass first →
              </Link>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <Footer />
    </main>
  )
}
