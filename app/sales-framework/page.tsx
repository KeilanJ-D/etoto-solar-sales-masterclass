'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronDown, ChevronUp, Printer, Lightbulb, Target, Users, Briefcase, ArrowRight } from 'lucide-react'
import ProductHero from '@/components/products/ProductHero'
import PasswordGate from '@/components/products/PasswordGate'
import BuySection from '@/components/products/BuySection'
import SolaFlowUpsell from '@/components/products/SolaFlowUpsell'
import ETOTOServices from '@/components/products/ETOTOServices'
import ProductFooter from '@/components/products/ProductFooter'
import FormulaCalculator from '@/components/funnel/FormulaCalculator'
import Link from 'next/link'
import MasterclassNav from '@/components/funnel/MasterclassNav'

// Framework data with Adapt It suggestions
const FRAMEWORK_STEPS = [
  {
    step: 1,
    title: 'Introduction & Rapport',
    goal: 'Build trust. Set the tone. Position yourself as a consultant.',
    checklist: [
      'Greet warmly, introduce yourself',
      'Reference how they found you (ad, referral, etc.)',
      'Confirm they initiated the enquiry',
      'Briefly explain what you do',
    ],
    keyPrinciple: 'People buy from people they trust. Rapport isn\'t optional — it\'s the foundation.',
    adaptIt: [
      'Some reps drop the Facebook ad reference and just say "I understand you\'ve been looking into solar." Works if the lead came from Google, a referral, or a trade show.',
      'In person, skip the phone opener entirely. Introduce yourself at the door, compliment the house or garden, ask about their day. Rapport is easier face to face.',
    ],
  },
  {
    step: 2,
    title: 'Discovery Questions',
    goal: 'Understand their situation. Gather the numbers for your calculations.',
    checklist: [
      'Ask their motivation ("What made you look into solar?")',
      'Get annual/monthly electricity spend',
      'Get unit rate (or help them find it)',
      'Confirm homeowner status',
      'Check timeline (any plans to move?)',
    ],
    keyPrinciple: 'Discovery serves two purposes: qualifying the lead AND gathering the numbers you need.',
    adaptIt: [
      'If the customer doesn\'t know their annual spend, ask for their monthly bill instead. £150/month is easier to recall than £1,800/year. Multiply on the call.',
      'Some reps add "How long have you lived here?" and "Any plans to move?" as early disqualifiers. Saves time if they\'re renting or moving in 6 months.',
      'For EV owners, ask what tariff they\'re on. If they\'re already on Octopus Go (7p overnight), the battery pitch writes itself.',
    ],
  },
  {
    step: 3,
    title: 'Energy Audit',
    goal: 'Calculate their usage. Establish the "daily cost to run the house."',
    checklist: [
      'Convert annual spend to kWh (spend ÷ unit rate)',
      'Calculate daily usage (annual ÷ 365)',
      'Calculate daily cost (daily kWh × unit rate)',
      'State the anchor: "Your house costs £X.XX a day to run"',
    ],
    keyPrinciple: 'The daily cost is your anchor statement. Everything else builds from here.',
    adaptIt: [
      'If you\'re in person, do the maths on a piece of paper in front of them — not on your phone. Watching someone write numbers on paper feels more transparent than tapping a calculator.',
      'Some reps use the SolaFlow calculator on screen while talking the customer through it. The visual reinforces the maths.',
    ],
  },
  {
    step: 4,
    title: 'Battery Value',
    goal: 'Introduce the battery first. Explain off-peak charging savings.',
    checklist: [
      'Explain time-of-use tariffs (7p vs 28p)',
      'Calculate overnight charging cost',
      'Calculate daily saving (peak rate - off-peak rate)',
      'Show the before/after transformation',
    ],
    keyPrinciple: 'Battery-first because it works every day, rain or shine. Off-peak arbitrage is the core saving.',
    adaptIt: [
      'In person, the before/after daily cost is more powerful on a whiteboard or notepad. Write £3.28 → cross it out → write £1.12. The physical act of crossing out the old number is theatrical and memorable.',
      'For customers already on a time-of-use tariff, adjust the off-peak rate accordingly. Don\'t use 7p if they\'re paying 10p on Economy 7.',
    ],
  },
  {
    step: 5,
    title: 'Solar Value',
    goal: 'Add solar on top of battery. Explain export income.',
    checklist: [
      'Size the system (panels × wattage = kWp)',
      'Calculate daily generation (kWp × peak sun hours)',
      'Calculate export income (kWh × SEG rate × 365)',
      'Stack solar income on top of battery savings',
    ],
    keyPrinciple: 'Solar income feels like free money because it\'s money coming IN, not just saved.',
    adaptIt: [
      'If the customer has a south-facing roof, bump the peak sun hours from 4.5 to 5. East-west, use 3.8-4.0. This shows you\'re designing for THEIR home, not reading a generic number.',
      'Some customers don\'t want to export — they want self-sufficiency. For these buyers, flip the pitch: "With solar + battery, you\'ll use 80% of your own energy instead of 30%." Different angle, same products.',
    ],
  },
  {
    step: 6,
    title: 'Financials & Payback',
    goal: 'Present the investment and ROI. Make the payback crystal clear.',
    checklist: [
      'State total system cost',
      'State total annual benefit (battery + solar)',
      'Calculate payback (cost ÷ annual benefit)',
      'Compare to warranty period (25 years panels, 10 years battery)',
      'Mention 0% VAT (expires March 2027)',
    ],
    keyPrinciple: 'The payback period is the moment of decision. Make it concrete.',
    adaptIt: [
      'If payback comes out over 6 years, consider adjusting the system size down. A tighter system with a 4.5-year payback is an easier close than an oversized system at 7 years.',
      'Some reps show the 10-year or 15-year total return instead of just the payback. "£2,500/year × 15 years = £37,500 from a £12,500 system" hits differently.',
    ],
  },
  {
    step: 7,
    title: 'Handling Objections',
    goal: 'Address concerns with confidence. Every objection has a response.',
    checklist: [
      '"Too expensive" → compare product quality, installer credibility',
      '"Need to think about it" → ask what specifically',
      '"Waiting for prices to drop" → VAT ending, opportunity cost',
      '"Partner needs to agree" → offer written proposal or joint call',
      '"Bad things about solar companies" → MCS, RECC, Section 75, payment structure',
    ],
    keyPrinciple: 'Objections are buying signals in disguise. Don\'t avoid them — welcome them.',
    adaptIt: [
      'If a customer says "I need to check with my wife/husband," some reps offer to call back in 30 minutes after dinner so both are present. Don\'t let it become "I\'ll think about it" — give it structure.',
      'For "too expensive" objections in person, pull up the competitor\'s product specs vs yours side by side. Show the differences, don\'t just claim them.',
    ],
  },
  {
    step: 8,
    title: 'The Close',
    goal: 'Transition to paperwork. Make the next step feel natural.',
    checklist: [
      'Send everything in writing immediately',
      'Explain 25/50/25 payment structure',
      'Mention Section 75 credit card protection',
      'Explain DNO timeline (4-8 weeks)',
      'Confirm email receipt while on the call',
    ],
    keyPrinciple: 'Confirming email arrival creates micro-commitment and keeps momentum.',
    adaptIt: [
      'In person, hand them your phone with the proposal email open. "Can you see it\'s arrived?" is even more powerful face to face because you can literally watch them read it.',
      'Some reps take the deposit right there — phone out, payment link sent, card tapped. If you\'re in person and the customer is ready, don\'t leave without the deposit.',
    ],
  },
  {
    step: 9,
    title: 'Follow-Up',
    goal: 'Stay in touch without being pushy. Add value at each touchpoint.',
    checklist: [
      'Day 1: Confirm proposal received',
      'Day 2: Check for questions',
      'Day 3-5: Flag VAT deadline or timeline',
      'Day 7+: Circle back, offer another call',
      'Always: Mention referral incentive',
    ],
    keyPrinciple: 'Follow-up keeps you top of mind. The referral mention plants a seed for future business.',
    adaptIt: [
      'Voice notes on WhatsApp outperform text messages for follow-ups. A 30-second personal voice note feels human. A text feels automated.',
      'If you know the customer\'s install timeline preference, use it in follow-ups: "You mentioned wanting to be up and running before winter — if we submit the DNO app this week, that\'s doable."',
    ],
  },
]

export default function SalesFrameworkPage() {
  const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'
  const [isUnlocked, setIsUnlocked] = useState(isInternal)

  useEffect(() => {
    if (isInternal) return // Skip token check on internal site
    const storedToken = localStorage.getItem('access_sales-framework')
    if (storedToken) {
      setIsUnlocked(true)
    }
  }, [isInternal])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />
      {/* Hero */}
      <ProductHero
        title="The 9-Step Skeleton. Flexible. Adaptable. Yours."
        subtitle="Not everyone wants word-for-word. Some reps want the structure without the script — the framework they can adapt to their own voice. Interactive cards, printable summaries, and the calculator built in."
        price={isInternal ? '' : '£3.99'}
        buyLink="https://buy.stripe.com/bJecN76bc0g54v8fOOfEk03"
        stats={[
          { value: '9', label: 'Steps' },
          { value: 'Flexible', label: 'Structure' },
          { value: 'Adapt It', label: 'Suggestions' },
          { value: '1-Page', label: 'Printable' },
        ]}
        isUnlocked={isUnlocked}
      />

      {/* What's Inside */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">The Structure Behind Every Closed Deal</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRAMEWORK_STEPS.map((step) => (
              <div key={step.step} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="w-8 h-8 rounded-full bg-[#E8192C] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.step}
                </span>
                <span className="font-medium text-slate-900">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview / Gated Content */}
      <PasswordGate
        productId="sales-framework"
        productName="Sales Framework"
        price={isInternal ? '' : '£3.99'}
        buyLink="https://buy.stripe.com/bJecN76bc0g54v8fOOfEk03"
        previewContent={
          <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-2 block">Preview</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Here&apos;s a Taste</h2>
                <p className="text-slate-600">Steps 1-3 fully visible. Steps 4-9 for paying customers.</p>
              </div>

              {/* Steps 1-3 */}
              {FRAMEWORK_STEPS.slice(0, 3).map((step) => (
                <FrameworkCard key={step.step} {...step} showAdaptIt={false} />
              ))}

              {/* Blurred step 4 */}
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <FrameworkCard {...FRAMEWORK_STEPS[3]} showAdaptIt={false} />
                </div>
                {!isInternal && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center">
                      <p className="font-bold text-slate-900 mb-2">Steps 4-9 are locked</p>
                      <p className="text-sm text-slate-600">Unlock the full framework + Adapt It suggestions for £3.99</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      >
        {/* Full Unlocked Content */}
        <FullFrameworkContent />
      </PasswordGate>

      {/* Script vs Framework Comparison */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Script vs Framework — Which One?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The Script</h3>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Word-for-word</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 9 complete sections</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Audio clips included</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Best for: new hires</li>
              </ul>
              <Link
                href="/sales-script"
                className="inline-flex items-center gap-2 text-[#E8192C] font-semibold hover:underline"
              >
                View Script <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">The Framework</h3>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Structure only</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 9 flexible cards</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Adapt It suggestions</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Best for: experienced reps</li>
              </ul>
              <span className="text-slate-400 text-sm">You&apos;re viewing this now</span>
            </div>
          </div>

          <p className="text-center text-slate-600">
            Most teams use both — the script for new hires, the framework for experienced reps.{' '}
            <Link href="/complete-toolkit" className="text-[#E8192C] hover:underline">Get both in the Complete Toolkit.</Link>
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Who This Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Experienced Reps', desc: 'You know how to sell. You just want the structure to make sure you\'re not missing any steps.' },
              { icon: Users, title: 'Team Leaders', desc: 'Give your team a consistent framework while letting them develop their own style.' },
              { icon: Briefcase, title: 'Solo Installers', desc: 'Selling your own installs? A flexible framework lets you adapt to each customer.' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#E8192C]" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buy Section */}
      {!isUnlocked && (
        <BuySection
          productName="Sales Framework"
          price="£3.99"
          bundlePrice="£9.99"
          buyLink="https://buy.stripe.com/bJecN76bc0g54v8fOOfEk03"
          bundleLink="https://buy.stripe.com/5kQaEZ7fg5Ap8Lo466fEk06"
          features={[
            'All 9 framework cards',
            'Bullet-point checklists per step',
            '"Adapt It" suggestions for each step',
            'Key principles highlighted',
            'Printable 1-page summary',
            'Links to full script for each step',
          ]}
        />
      )}

      {/* SolaFlow Upsell */}
      <SolaFlowUpsell />

      {/* ETOTO Services */}
      <ETOTOServices />

      {/* Footer */}
      <ProductFooter />
    </main>
  )
}

// Framework Card Component
function FrameworkCard({ 
  step, 
  title, 
  goal, 
  checklist, 
  keyPrinciple, 
  adaptIt,
  showAdaptIt = true 
}: typeof FRAMEWORK_STEPS[0] & { showAdaptIt?: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-slate-900 text-white p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-full bg-[#E8192C] flex items-center justify-center font-bold">
            {step}
          </span>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-slate-400 text-sm">{goal}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Checklist */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Checklist</h4>
          <ul className="space-y-2">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Principle */}
        <div className="bg-[#E8192C]/10 border-l-4 border-[#E8192C] rounded-r-xl p-4 mb-4">
          <p className="text-sm font-medium text-slate-900">
            <strong>Key Principle:</strong> {keyPrinciple}
          </p>
        </div>

        {/* Adapt It (only in full version) */}
        {showAdaptIt && adaptIt && adaptIt.length > 0 && (
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#F5921E]" />
                <span className="font-medium text-slate-900">Adapt It</span>
              </div>
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            {expanded && (
              <div className="px-4 pb-4 space-y-3">
                {adaptIt.map((suggestion, index) => (
                  <div key={index} className="bg-[#F5921E]/10 rounded-lg p-4">
                    <p className="text-sm text-slate-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Link to full script */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <Link
            href="/sales-script"
            className="flex items-center gap-2 text-sm text-[#E8192C] hover:underline"
          >
            See the full script for this step <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// Full Framework Content
function FullFrameworkContent() {
  return (
    <div className="bg-slate-50">
      {/* Success banner */}
      <div className="bg-emerald-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Full access unlocked! All 9 steps with Adapt It suggestions are now available.
        </p>
      </div>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* All steps */}
          {FRAMEWORK_STEPS.map((step) => (
            <FrameworkCard key={step.step} {...step} showAdaptIt={true} />
          ))}

          {/* Calculator embed at Step 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 p-5">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">3</span>
              Live Calculator — For Your Energy Audit
            </h4>
            <FormulaCalculator />
          </div>

          {/* Print Summary */}
          <div className="text-center mt-10">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Framework Summary</span>
            </button>
            <p className="text-sm text-slate-500 mt-2">A 1-page summary to pin to your wall</p>
          </div>
        </div>
      </section>
    </div>
  )
}
