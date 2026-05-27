import {
  ArrowRight, BadgeCheck, Briefcase, Calculator, Check, ChevronRight, FileText,
  Lock, MessageSquare, Phone, Quote, Sparkles, Target, UserCheck, Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { CustomerJourneyTimeline, yeersCustomerA, yeersCustomerB } from '@/components/shared/CustomerJourneyTimeline'
import { ClientLogos } from '@/components/shared/ClientLogos'
import { clientLogos } from '@/lib/social-proof-data'

// ============================================
// CRM DATA PREVIEW (inline helper)
// ============================================

function CRMDataPreview() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h4 className="font-bold text-lg">This is what lands in your CRM</h4>
          <p className="text-sm text-slate-400">Before you even pick up the phone</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Property details</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Type:</span><span className="font-medium">Detached</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Roof:</span><span className="font-medium">Pitched tile</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Location:</span><span className="font-medium">Doncaster DN4</span></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Energy usage</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Annual:</span><span className="font-medium">3,824 kWh</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Bill:</span><span className="font-medium">£1,300/year</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Rate:</span><span className="font-medium">28.0p/kWh</span></div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System configuration</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Panels:</span><span className="font-medium">18× 510W</span></div>
            <div className="flex justify-between"><span className="text-slate-400">System:</span><span className="font-medium">9.18 kWp</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Battery:</span><span className="font-medium">11.68 kWh</span></div>
          </div>
        </div>

        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3">Cost estimate</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Total:</span><span className="font-bold text-green-400 text-lg">£15,062</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Savings:</span><span className="font-medium text-green-400">£2,303/year</span></div>
            <div className="flex justify-between"><span className="text-slate-400">CO₂:</span><span className="font-medium">2.73 tonnes/year</span></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-sm text-slate-400">
          Compare this to a standard contact form: <span className="line-through">name, email, phone, &quot;interested in solar&quot;</span>.
          <strong className="text-white"> Night and day.</strong>
        </p>
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function SolaFlowPage() {
  return (
    <main className="min-h-screen bg-white">
      <MasterclassNav />

      {/* HERO */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E8192C]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] text-sm font-semibold rounded-full border border-[#E8192C]/30">
              The tool 200+ UK installers run on
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Instant solar estimates.<br />
            <span className="text-[#E8192C]">Better leads. Faster sales.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            SolaFlow is the guided estimator your customers fill in before they ever speak to you —
            so by the time you call, they&apos;re already pre-qualified, pre-educated and pre-priced.
            Reps close faster. Owner-operators get warmer leads. Same pipeline, both ends.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-md sm:max-w-none mx-auto">
            <Link
              href="/tools/instant-estimator"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-bold rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all min-h-[56px]"
            >
              Try the Instant Estimator
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl sm:rounded-full hover:bg-white/20 transition-all border border-white/10 min-h-[56px]"
            >
              See how it works
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-[#E8192C]">3 min</p>
              <p className="text-sm text-slate-400">Avg estimate time</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">24/7</p>
              <p className="text-sm text-slate-400">Lead capture</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">10×</p>
              <p className="text-sm text-slate-400">Faster than manual</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-2xl sm:text-3xl font-black text-white">2×</p>
              <p className="text-sm text-slate-400">More qualified leads</p>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos logos={clientLogos} title="Trusted by 200+ UK solar installers" />

      {/* PIPELINE VISUAL */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              The full pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              From ad click to deposit paid
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Two tools. One pipeline. Every step covered.
            </p>
          </div>

          <div className="grid md:grid-cols-6 gap-4 items-center">
            {[
              { step: 1, icon: Target, title: 'Ad click', desc: 'Customer sees your ad' },
              { step: 2, icon: MessageSquare, title: 'Quiz funnel', desc: 'Designs their system', highlight: true },
              { step: 3, icon: FileText, title: 'CRM lead', desc: 'Full data lands' },
              { step: 4, icon: Phone, title: 'Call back', desc: 'Within 5 minutes' },
              { step: 5, icon: Calculator, title: 'Estimator', desc: 'Verify the maths', highlight: true },
              { step: 6, icon: BadgeCheck, title: 'Close', desc: 'Deposit paid' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                    item.highlight ? 'bg-[#E8192C] text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TOOL 1: QUIZ FUNNEL */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                Tool 1
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Quiz funnel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-slate-900">Customer-facing lead magnet.</strong> They see an ad, land on
              the quiz, design their own system, and get an instant indicative quote — all before you say a word.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Instant indicative pricing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Lead capture before results</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-full border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-slate-700">Pre-qualified prospects</span>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-2 shadow-2xl border border-white/10 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-slate-800 rounded-full px-4 py-1.5 text-slate-400 text-xs flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  your-company.solaflow.app
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white h-[400px] sm:h-[500px] md:h-[600px]">
              <iframe
                src="https://vercel-solar-estimator.vercel.app"
                className="w-full h-full"
                title="SolaFlow Quiz Funnel"
                allow="clipboard-write"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-2">
                <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Live demo. The version your company runs is white-labelled with your logo, colours and product mix.
            </p>
          </div>
        </div>
      </section>

      {/* QUIZ OUTPUT SHOWCASE */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-sm font-semibold rounded-full mb-4">
              What customers see
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              They design their own system
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Panel selection, battery choice, inverter matching — all guided by intelligent recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Choose solar panels',
                desc: 'Aiko, DMEG, Exiom — with specs and features',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fFP0ifJ7liQNT41pxXOkBJSo3LcaBn.png'
              },
              {
                title: 'Add a battery',
                desc: 'Tesla, Sigenergy, Fox — capacity matched',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XnLhCoT1oxhhNkwTAYZ5pi93YSrP4h.png'
              },
              {
                title: 'Select inverter',
                desc: 'EcoFlow, Sigen — compatible options only',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LtE3sJgmni0reYChk0RppuzLO7FNAb.png'
              },
              {
                title: 'Instant estimate',
                desc: 'Savings, payback, CO₂ — all calculated',
                image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hubY9mhSf5N2aLxawVyPe4dNk76yP5.png'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRM DATA */}
      <section className="py-16 sm:py-24 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full mb-4">
              What lands in your CRM
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Pre-qualified intelligence
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The moment the customer completes the quiz, this lands in HighLevel (or whatever CRM your company runs).
            </p>
          </div>

          <CRMDataPreview />
        </div>
      </section>

      {/* YEERS CASE STUDY */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-semibold rounded-full mb-4">
              Real results
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              From ad to deposit in 3 days
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              YEERS closed £24,400 in their first 2 weeks. Here&apos;s the exact journey.
            </p>
          </div>

          <div className="mb-16">
            <CustomerJourneyTimeline
              steps={yeersCustomerA}
              title="Customer A — £13,100"
              subtitle="Came in via Facebook ad for battery. Left with full solar + battery system."
              customer="YEERS Case Study"
              totalValue="£13,100"
            />
          </div>

          <div className="bg-gradient-to-r from-[#E8192C]/10 to-transparent rounded-2xl p-6 sm:p-8 border-l-4 border-[#E8192C] mb-16">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-[#E8192C] flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg sm:text-xl text-slate-800 font-medium leading-relaxed mb-4">
                  &ldquo;I&apos;ve had another quote come back cheaper, but using Fox equipment and I&apos;ve looked online
                  and have seen that the Sigenergy stuff is loads better like you said.&rdquo;
                </p>
                <p className="text-slate-600">
                  <strong>The customer overcame their own objection</strong> because SolaFlow pre-educated them on product quality.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <CustomerJourneyTimeline
              steps={yeersCustomerB}
              title="Customer B — £11,300"
              subtitle="Came in looking for battery only. SolaFlow configured a better system. Closed against competitor."
              customer="YEERS Case Study"
              totalValue="£11,300"
            />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-slate-400 mb-2">Combined results from first 2 weeks</p>
            <p className="text-4xl sm:text-5xl font-black text-white mb-4">£24,400</p>
            <p className="text-slate-400">
              Both customers came in comparing quotes. Both chose YEERS because SolaFlow pre-qualified them with quality products.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL 2: ESTIMATOR */}
      <section className="py-16 sm:py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                Tool 2
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Instant Estimator
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              <strong className="text-slate-900">Rep-facing sales tool.</strong> Use it live with customers —
              in person, on the phone, or via screen share. Verify the formulas, explain the maths,
              close the deal.
            </p>
          </div>

          <div className="grid sm:grid-cols-4 gap-3 mb-10">
            {[
              { title: 'Energy audit', desc: 'Bill, property, daily kWh' },
              { title: 'Battery sizing', desc: 'Coverage %, off-peak saving' },
              { title: 'Solar panels', desc: 'kWp, generation, export income' },
              { title: 'Payback', desc: 'Total cost, ROI, 25-year projection' },
            ].map((step, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                <div className="w-7 h-7 mx-auto mb-2 rounded-full bg-[#E8192C] text-white text-xs font-black flex items-center justify-center">
                  {i + 1}
                </div>
                <p className="font-bold text-slate-900 text-sm mb-1">{step.title}</p>
                <p className="text-xs text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA to our training estimator */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-xl p-6 sm:p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E8192C]/10 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-[#E8192C]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Want to practise the 4-stage flow?
            </h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              We&apos;ve built a training version of the estimator inside the Masterclass — same flow,
              same maths, same product database. Run through it as many times as you need to get fluent.
            </p>
            <Link
              href="/tools/instant-estimator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all min-h-[52px]"
            >
              Open the Instant Estimator
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-slate-500 mt-4">
              Free to use · No login · Numbers are indicative for training
            </p>
          </div>
        </div>
      </section>

      {/* DESIGN VS SALES */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-sm font-semibold rounded-full mb-4">
              The difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Design software vs sales software
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-700 mb-6">Design software</h3>
              <ul className="space-y-3 text-slate-600">
                <li>OpenSolar, PV Sol, Easy PV</li>
                <li>Focuses on technical system design</li>
                <li>Rep uses it to create proposals</li>
                <li>Customer sees output after the call</li>
                <li>No lead generation capability</li>
              </ul>
            </div>

            <div className="bg-[#E8192C]/5 rounded-2xl p-6 sm:p-8 border border-[#E8192C]/20">
              <h3 className="text-xl font-bold text-slate-900 mb-6">SolaFlow</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Quiz funnel generates qualified leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Focuses on consumer psychology</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Customer pre-builds their system</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Rep verifies maths live on call</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#E8192C] mt-1 flex-shrink-0" />
                  <span>Full pipeline: ad → deposit</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-lg text-slate-600">
              Design software helps you <em>create proposals</em>. SolaFlow helps you{' '}
              <strong className="text-slate-900">close deals</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* TWO PATHWAY CTA: reps + owners */}
      <section className="py-16 sm:py-24 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#E8192C]" />
              <span className="text-white text-sm font-medium">Get set up on SolaFlow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Two paths in
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Depending on whether you&apos;re a rep or you own the business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* FOR REPS */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs uppercase tracking-widest text-blue-700 font-bold">
                  For sales reps
                </p>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Speak to your manager
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                If your company works with ETOTO, chances are SolaFlow is either already set up or
                they&apos;ve been looking at it. Ask your manager or owner-operator about getting you
                an account — branded with your company colours, your products, your pricing.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  'Your company logo on every estimate',
                  'Login at dashboard.solaflow.co.uk',
                  'Lead pipeline straight into HighLevel',
                  'Live quote builder for customer calls',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{line}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/tools/instant-estimator"
                className="block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all min-h-[48px]"
              >
                In the meantime, practise on the Estimator →
              </Link>
            </div>

            {/* FOR OWNERS */}
            <div className="bg-gradient-to-br from-[#E8192C] to-[#B01220] rounded-2xl p-6 sm:p-8 shadow-2xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs uppercase tracking-widest text-white/80 font-bold">
                  For owner-operators
                </p>
              </div>
              <h3 className="text-2xl font-black mb-3">
                Run SolaFlow at your agency
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Get the Quiz Funnel + Estimator + CRM webhook running on your domain inside 48 hours.
                White-labelled, your products, your margins, your team trained on it.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  'Fully white-label',
                  '£200/month flat — no per-lead fees',
                  'CRM webhooks (HighLevel, Hubspot, Pipedrive)',
                  'Onboarding + team training included',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-sm text-white/95">{line}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/agency"
                className="block w-full text-center px-6 py-3 bg-white hover:bg-slate-100 text-[#E8192C] font-bold rounded-xl transition-all min-h-[48px]"
              >
                Get SolaFlow at your business →
              </Link>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-slate-400">
              Want to talk it through?{' '}
              <a href="https://solaflow.co.uk/contact" target="_blank" rel="noopener noreferrer" className="text-white underline hover:no-underline">
                Book a 15-minute call with the SolaFlow team
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
