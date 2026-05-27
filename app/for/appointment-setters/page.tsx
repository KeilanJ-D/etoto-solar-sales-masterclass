import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Phone,
  Settings,
  Target,
  Wrench,
  Zap,
} from 'lucide-react'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'

export const metadata: Metadata = {
  title: 'For Appointment Setters — ETOTO Solar Sales Masterclass',
  description:
    'Everything an appointment setter needs to qualify, book, and prep solar leads at high volume. Curated from the masterclass + knowledge library.',
}

export default function AppointmentSettersPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5">
            <Phone className="w-4 h-4" />
            For Appointment Setters
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance leading-tight">
            Your job: qualify, book, prep.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            You&apos;re the front line. You decide which leads make it to a sales call and
            with what context. Done well, you make the closer&apos;s job 50% easier and the
            customer feel cared for from message one.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            Your daily rhythm
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-balance">
            Three things, every day, in this order.
          </h3>

          <div className="space-y-4">
            {[
              {
                icon: Zap,
                title: '1. Hit response time on new leads',
                body: 'Every new lead under 5 minutes old gets an SMS first, call within the hour. This is the single highest-leverage action you take all day. Check the "Reply needed — under 1 hour old" smart list in HighLevel constantly.',
                link: '/systems/highlevel-playbook#smart-lists',
                linkLabel: 'Smart list setup',
              },
              {
                icon: MessageSquare,
                title: '2. Run discovery on the call',
                body: 'Five questions, four minutes — annual bill, daytime use pattern, tariff, electric heating/EV, decision-maker presence. Capture answers in the SolaFlow lead. This is what makes the closer\'s call shorter and the customer feel known.',
                link: '/systems/customer-discovery-mastery',
                linkLabel: 'Discovery question library',
              },
              {
                icon: Calendar,
                title: '3. Book the appointment with prep done',
                body: 'Calendar link sent during the call. Closer notified. SolaFlow lead has full property + energy + customer notes by the time the closer opens it. Customer gets confirmation, 24h reminder, 1h reminder — automated.',
                link: '/systems/solaflow-mastery#pre-call',
                linkLabel: 'Pre-call prep workflow',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-[#E8192C]/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#E8192C]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
                        {item.body}
                      </p>
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8192C] hover:underline"
                      >
                        {item.linkLabel}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
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
            The 30-second technical primer
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 text-balance">
            What you need to know — and what you don&apos;t.
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl">
            You&apos;re not selling the system. You&apos;re booking a slot. But sounding stupid
            on technical questions costs the booking. Memorise these five answers — and
            kick anything harder to the closer.
          </p>

          <div className="space-y-3">
            {[
              {
                q: '"How much will I save?"',
                a: '"Honestly depends on your usage and tariff — that\'s exactly what the rep will work out on the call. Most homes save £800 – £1,500 a year, but it\'s wildly different per house."',
              },
              {
                q: '"What\'s the difference between a hybrid and a normal inverter?"',
                a: '"Hybrid handles solar AND battery in one box. Most modern installs are hybrid. The rep will explain which one fits your setup."',
              },
              {
                q: '"Do I need a battery?"',
                a: '"Solar alone covers about 30 – 40% of your home use. With battery it jumps to 70 – 90% because you store daytime solar for evening use. The rep will run the numbers for your tariff."',
              },
              {
                q: '"How long does install take?"',
                a: '"Usually 1 – 2 days on the roof. Total timeline from sign-off is 4 – 6 weeks, longer if we need DNO approval for bigger systems."',
              },
              {
                q: '"How long do panels last?"',
                a: '"Panels are warranted 25 – 30 years for performance. Real-world they\'ll keep generating for 35+ years. The inverter is the part that might need replacing around year 12."',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-5"
              >
                <p className="font-semibold text-slate-900 text-sm sm:text-base mb-2">
                  {item.q}
                </p>
                <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
            <p className="font-semibold text-slate-900 mb-2 text-sm">
              When in doubt, the magic phrase:
            </p>
            <p className="text-slate-700 text-sm sm:text-base italic">
              &ldquo;Great question — I want to make sure you get the right answer, so let me
              book you in with the technical rep. They&rsquo;ll walk you through exactly that
              when you talk on [time].&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E8192C] mb-3">
            What success looks like
          </h2>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 text-balance">
            The numbers we measure.
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { stat: '5 min', label: 'Response time on new leads' },
              { stat: '70%', label: 'Calls answered → booked' },
              { stat: '5+', label: 'Bookings/day, full pipeline' },
              { stat: '<5%', label: 'No-show rate' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-slate-900 text-white rounded-xl p-5 text-center"
              >
                <p className="text-2xl sm:text-3xl font-black text-[#E8192C] mb-1">
                  {s.stat}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            Your essential toolkit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/systems/customer-discovery-mastery', label: 'Discovery question library', icon: MessageSquare },
              { href: '/systems/solaflow-mastery', label: 'SolaFlow Operator\'s Manual', icon: Settings },
              { href: '/systems/highlevel-playbook', label: 'HighLevel CRM Playbook', icon: Settings },
              { href: '/appointment-setting', label: 'Appointment-setting playbook', icon: Phone },
              { href: '/quiz', label: 'Appointment-setter quiz', icon: Target },
              { href: '/knowledge/glossary', label: 'Glossary (for fast lookups)', icon: BookOpen },
              { href: '/knowledge', label: 'Knowledge Library (background)', icon: Wrench },
              { href: '/live-call', label: 'Live call recording', icon: CheckCircle2 },
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
