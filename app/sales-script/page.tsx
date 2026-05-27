'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Copy, Check, Play, ChevronDown, ChevronUp, MessageSquare, Target, Users, Briefcase, AlertTriangle } from 'lucide-react'
import ProductHero from '@/components/products/ProductHero'
import PasswordGate from '@/components/products/PasswordGate'
import BuySection from '@/components/products/BuySection'
import SolaFlowUpsell from '@/components/products/SolaFlowUpsell'
import ETOTOServices from '@/components/products/ETOTOServices'
import ProductFooter from '@/components/products/ProductFooter'
import FormulaCalculator from '@/components/funnel/FormulaCalculator'
import MasterclassNav from '@/components/funnel/MasterclassNav'

// Audio clip timestamps from the real call
const AUDIO_CLIPS = {
  step1: { start: 6, end: 28, label: 'Introduction' },
  step2: { start: 108, end: 135, label: 'Discovery' },
  step3: { start: 223, end: 285, label: 'Energy Audit' },
  step4: { start: 288, end: 357, label: 'Battery Value' },
  step5: { start: 482, end: 550, label: 'Solar Value' },
  step6: { start: 578, end: 610, label: 'Financials' },
  step7: { start: 833, end: 866, label: 'Objections' },
  step8: { start: 1251, end: 1277, label: 'Close' },
  step9: { start: 1372, end: 1399, label: 'Follow-Up' },
}

export default function SalesScriptPage() {
  const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'
  const [isUnlocked, setIsUnlocked] = useState(isInternal)

  useEffect(() => {
    if (isInternal) return // Skip token check on internal site
    const storedToken = localStorage.getItem('access_sales-script')
    if (storedToken) {
      setIsUnlocked(true)
    }
  }, [isInternal])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />

      {/* Live-call CTA banner — surfaces the 45-min recorded close so reps
          know there's audio of the whole script before they scroll. Also
          links to the live package offers reps reference on calls. */}
      <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs sm:text-sm">
          <Link
            href="/live-call"
            className="inline-flex items-center gap-2 font-semibold hover:text-[#E8192C] transition-colors"
          >
            <span>🎧</span>
            <span>Hear all 9 of these scripts in one 45-min recorded call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/package-offers"
            className="inline-flex items-center gap-2 font-semibold text-slate-300 hover:text-[#E8192C] transition-colors"
          >
            <span>📦</span>
            <span>Package offers on the market</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <ProductHero
        title="The Word-for-Word Script That Closes Solar Deals."
        subtitle="Every sentence. Every pause. Every question. The exact script used across 200+ UK solar installers — from 'Hi, how are you doing?' to '25% deposit by credit card.' Interactive, with copy buttons and audio from a real sales call."
        price=""
        buyLink="/complete-toolkit"
        stats={[
          { value: '9', label: 'Steps' },
          { value: '45min', label: 'Audio' },
          { value: '200+', label: 'Installers' },
          { value: '1-Click', label: 'Copy' },
        ]}
        isUnlocked={isUnlocked}
      />

      {/* What's Inside */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Everything You Need to Say. Nothing Left to Guess.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Introduction & Rapport',
              'Discovery Questions',
              'Energy Audit Script',
              'Battery Pitch',
              'Solar Pitch',
              'Financials & Payback',
              'Objection Responses',
              'Close Script',
              'Follow-Up Templates',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="w-8 h-8 rounded-full bg-[#E8192C] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </span>
                <span className="font-medium text-slate-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview / Gated Content */}
      <PasswordGate
        productId="sales-script"
        productName="Sales Script"
        previewContent={
          <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-2 block">Preview</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Here&apos;s a Taste</h2>
                <p className="text-slate-600">Steps 1 and 2 are fully visible. Step 3 onwards is for paying customers.</p>
              </div>

              {/* Step 1 - Full */}
              <ScriptStep
                step={1}
                title="Introduction & Rapport"
                goal="Build trust. Set the tone. Position yourself as a consultant, not a salesman."
                script={`"Hi, is that [name]? Hey, how are you doing?

My name's [your name], I'm calling from [company]. You clicked on one of our ads on Facebook, or someone might have clicked it for you, about getting solar panels on the property... is that something you were looking into?"

[Wait for response]

"Brilliant. Well, let me tell you a bit about what we do..."`}
                keyLine="Position yourself as a consultant, not a salesman."
                whyItWorks="Opening with 'how are you doing?' creates conversational rapport. Mentioning the Facebook ad reminds them they initiated contact. Asking 'is that something you were looking into?' gets them to verbally commit interest."
                audioClip={AUDIO_CLIPS.step1}
              />

              {/* Step 2 - Full */}
              <ScriptStep
                step={2}
                title="Discovery Questions"
                goal="Understand their situation. Gather the numbers you need for the calculations."
                script={`"Can I just ask — what made you start looking into solar? What's the main reason?"

[Listen. Common answers: bills, future-proofing, environment, EV]

"And roughly how much are you spending on electricity at the moment? Monthly or annually, whichever you know?"

[If they don't know, ask for monthly and multiply by 12]

"Do you happen to know your unit rate? It should be on your bill — around 24-28p at the moment for most people."

"And are you the homeowner? Just checking because obviously we'd need to install on the property."`}
                keyLine="'What made you start looking into solar?' — let them tell you their motivation."
                whyItWorks="Discovery questions serve two purposes: qualifying the lead and gathering the numbers for your calculations. The order matters — ask about motivation first (emotional), then bills (practical), then ownership (qualifying)."
                audioClip={AUDIO_CLIPS.step2}
              />

              {/* Step 3 - Blurred preview */}
              <div className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <ScriptStep
                    step={3}
                    title="Energy Audit"
                    goal="Calculate their current usage. Establish the 'daily cost to run the house.'"
                    script="So if you're spending £1,200 a year on electricity, at 28p per unit (the current Ofgem cap), that's about 4,285 kilowatt hours per year..."
                    keyLine="Your home costs £X.XX a day to run."
                    whyItWorks="This is the anchor for everything that follows."
                    audioClip={AUDIO_CLIPS.step3}
                  />
                </div>
                {!isInternal && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl text-center">
                      <AlertTriangle className="w-8 h-8 text-[#E8192C] mx-auto mb-3" />
                      <p className="font-bold text-slate-900 mb-2">Steps 3-9 are locked</p>
                      <p className="text-sm text-slate-600">Part of the Complete Masterclass — see below to unlock.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
      >
        {/* Full Unlocked Content */}
        <FullScriptContent />
      </PasswordGate>

      {/* "Who This Is For" trio removed — same pattern appears on
          /formula-cheat-sheet + /complete-toolkit. By the time a visitor
          is on the sales script page they've self-selected; the trio was
          padding, not signal. */}

      {/* Buy Section */}
      {!isUnlocked && <BuySection />}

      {/* SolaFlow Upsell */}
      <SolaFlowUpsell />

      {/* ETOTO Services */}
      <ETOTOServices />

      {/* Footer */}
      <ProductFooter />
    </main>
  )
}

// Script Step Component
function ScriptStep({ 
  step, 
  title, 
  goal, 
  script, 
  keyLine, 
  whyItWorks, 
  audioClip,
  showAudio = true
}: {
  step: number
  title: string
  goal: string
  script: string
  keyLine: string
  whyItWorks: string
  audioClip?: { start: number; end: number; label: string }
  showAudio?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

      {/* Script box */}
      <div className="p-5">
        <div className="relative bg-slate-900 rounded-xl p-5 mb-4 group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">What to Say</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3 py-2 rounded-lg transition-all min-h-[36px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden font-sans">
            {script}
          </pre>
        </div>

        {/* Key line */}
        <div className="bg-[#E8192C]/10 border-l-4 border-[#E8192C] rounded-r-xl p-4 mb-4">
          <p className="text-sm font-medium text-slate-900">{keyLine}</p>
        </div>

        {/* Why it works */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <h4 className="text-sm font-bold text-slate-900 mb-2">Why This Works</h4>
          <p className="text-sm text-slate-600">{whyItWorks}</p>
        </div>

        {/* Audio clip */}
        {audioClip && showAudio && (
          <div className="bg-slate-100 rounded-xl p-4">
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-[#E8192C] transition-colors w-full"
            >
              <Play className="w-4 h-4" />
              <span>Hear this on the real call</span>
              {showVideo ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
            {showVideo && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/Hm7LvAOx3Ro?start=${audioClip.start}&end=${audioClip.end}`}
                  title={`${audioClip.label} audio clip`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Full Script Content (unlocked)
function FullScriptContent() {
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null)

  return (
    <div className="bg-slate-50">
      {/* Success banner */}
      <div className="bg-emerald-600 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          Full access unlocked! All 9 steps and objection scripts are now available.
        </p>
      </div>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Step 1 */}
          <ScriptStep
            step={1}
            title="Introduction & Rapport"
            goal="Build trust. Set the tone. Position yourself as a consultant, not a salesman."
            script={`"Hi, is that [name]? Hey, how are you doing?

My name's [your name], I'm calling from [company]. You clicked on one of our ads on Facebook, or someone might have clicked it for you, about getting solar panels on the property... is that something you were looking into?"

[Wait for response]

"Brilliant. Well, let me tell you a bit about what we do..."`}
            keyLine="Position yourself as a consultant, not a salesman."
            whyItWorks="Opening with 'how are you doing?' creates conversational rapport. Mentioning the Facebook ad reminds them they initiated contact."
            audioClip={AUDIO_CLIPS.step1}
          />

          {/* Step 2 */}
          <ScriptStep
            step={2}
            title="Discovery Questions"
            goal="Understand their situation. Gather the numbers you need for the calculations."
            script={`"Can I just ask — what made you start looking into solar? What's the main reason?"

[Listen. Common answers: bills, future-proofing, environment, EV]

"And roughly how much are you spending on electricity at the moment? Monthly or annually, whichever you know?"

[If they don't know, ask for monthly and multiply by 12]

"Do you happen to know your unit rate? It should be on your bill — around 24-28p at the moment for most people."

"And are you the homeowner? Just checking because obviously we'd need to install on the property."`}
            keyLine="'What made you start looking into solar?' — let them tell you their motivation."
            whyItWorks="Discovery questions serve two purposes: qualifying the lead and gathering the numbers for your calculations."
            audioClip={AUDIO_CLIPS.step2}
          />

          {/* Step 3 */}
          <ScriptStep
            step={3}
            title="Energy Audit"
            goal="Calculate their current usage. Establish the 'daily cost to run the house.'"
            script={`"So if you're spending £1,200 a year on electricity, at 28p per unit (the current Ofgem cap), that's about 4,285 kilowatt hours per year.

Divide that by 365 and that's about 11.74 kilowatt hours per day.

Times that by your unit rate of 28p... your house is costing you about £3.29 a day to run.

So your house costs £3.29 a day to run. Let's see what we can do about that."`}
            keyLine="'Your house costs £X.XX a day to run' — this is your anchor statement."
            whyItWorks="Translating annual spend into a daily cost makes it tangible. People understand daily costs better than annual figures."
            audioClip={AUDIO_CLIPS.step3}
          />

          {/* Calculator embed */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6 p-5">
            <h4 className="font-bold text-slate-900 mb-4">Live Calculator — Do the Maths in Real Time</h4>
            <FormulaCalculator />
          </div>

          {/* Step 4 */}
          <ScriptStep
            step={4}
            title="Battery Value"
            goal="Introduce the battery first. Explain how off-peak charging saves money."
            script={`"What I'd do here is install 12 kilowatt hours of battery storage — sized to cover your daily 11.74 kWh usage with a bit of headroom.

The way it works: you move onto a tariff like Octopus Cosy or Intelligent Go where you buy electricity overnight at 7p instead of the daytime 28p.

You charge the battery at 7p, then use that cheap electricity during the day instead of buying at 28p.

At your 11.74 kWh per day, the gap between 28p and 7p is 21p per kilowatt hour. Times 365 days... that's £900 a year you're not paying.

Your daily electricity cost drops from £3.29 to about £0.82."`}
            keyLine="'Your daily cost goes from £3.29 to £0.82' — the before/after transformation."
            whyItWorks="Battery-first because it doesn't depend on sunshine. The off-peak arbitrage works every single day, rain or shine."
            audioClip={AUDIO_CLIPS.step4}
          />

          {/* Step 5 */}
          <ScriptStep
            step={5}
            title="Solar Value"
            goal="Now add solar. Explain how export income stacks on top of battery savings."
            script={`"On top of the battery, we'd fit 14 AIKO 470 watt panels. That's a 6.58 kilowatt peak system on your roof.

In the UK we use 3.5 peak sun hours per day as our conservative average — even with our weather, that's what your panels deliver across the year. So that system generates about 23 kWh per day.

Your battery is already covering daytime usage, so all of that solar gets exported to the grid at the Smart Export Guarantee rate. We use 12p as a UK average.

23 kWh × 12p × 365 = £1,008 per year in solar income.

Add that to your battery saving of £900... you're now £1,908 better off per year. And your daily electricity cost is basically zero."`}
            keyLine="'Your battery saving plus your solar income = total annual benefit.'"
            whyItWorks="Solar income feels like free money because it's money coming IN, not just money saved."
            audioClip={AUDIO_CLIPS.step5}
          />

          {/* Step 6 */}
          <ScriptStep
            step={6}
            title="Financials & Payback"
            goal="Present the investment and the payback period. Make the ROI crystal clear."
            script={`"So the total investment for the battery and solar system is £12,500.

Your total annual benefit is £2,181. So £12,500 divided by £2,181... that's a payback period of 5.7 years.

After 5.7 years, everything from there forward is pure profit. The panels are warrantied for 25 years, the batteries for 10.

Over 25 years, that's £54,525 in savings and income from a £12,500 investment.

And unlike most investments, this one isn't taxed. It's not subject to capital gains. You're just not paying electricity bills you would have paid anyway."`}
            keyLine="'Payback of X years. Everything after that is pure profit.'"
            whyItWorks="The payback period is the moment of decision. Make it concrete and compare it to the warranty length."
            audioClip={AUDIO_CLIPS.step6}
          />

          {/* Step 7 - Objections */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="bg-slate-900 text-white p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-full bg-[#E8192C] flex items-center justify-center font-bold">
                  7
                </span>
                <h3 className="text-xl font-bold">Handling Objections</h3>
              </div>
              <p className="text-slate-400 text-sm">Address concerns with confidence. Every objection has a response.</p>
            </div>
            
            <div className="p-5 space-y-3">
              {[
                { 
                  title: "That's more expensive than another quote", 
                  response: `"That's completely fair, and it's actually very common to see big price differences in solar. The reason is there's a huge range in product quality — and the gap between a cheap system and a good one only shows up over time.

Here's what I'd look at if I were comparing:

First, the battery. Is it stackable? Ours is — if your energy needs change in 3 years, we clip another battery on top. A non-stackable battery means you rip it out and start again. That's a £3,000-5,000 mistake.

Second, the panels. We use AIKO 470W panels — 23.8% efficiency with a 30-year warranty. A lot of cheaper quotes use 400W panels at 20% efficiency. That's 15% less generation every single day for the life of the system.

Third, and this is the one most people miss — the installer. We install 100+ systems per month. We have direct account management with Sigenergy. If something goes wrong, we get it fixed same week. A one-man-band installer fitting 3 systems a month doesn't have that support network.

The cheapest quote usually isn't the cheapest system over 25 years. It's the most expensive."`
                },
                {
                  title: "I need to think about it",
                  response: `"Absolutely, and you should — it's a big decision. Can I ask what specifically you'd like to think over? Is it the numbers, the product choice, or the timing?

[Listen to their answer]

If numbers: "Happy to walk through any part of the calculation again. The maths is transparent — I want you to be 100% confident in the return before you commit."

If product: "I can send you the spec sheets for the Sigenergy batteries and the AIKO panels so you can compare them side by side with whatever else you've been quoted."

If timing: "Totally understand. The one thing I'd flag is the DNO application — that takes 4-8 weeks. So if you want to be up and running by [season/date they mentioned], we'd need to submit fairly soon. But there's zero pressure — when you're ready, we're ready."

If genuinely unsure: "Tell you what — I'll send everything in writing right now so you and [partner/whoever] can look at it together. I'll give you a call in a couple of days to see if any questions have come up. Sound good?""`
                },
                {
                  title: "I'm waiting for prices to drop",
                  response: `"Interesting — and you're right that panel prices have come down over the last few years. But here's the thing: the installation cost (labour, scaffold, electrician, DNO) hasn't dropped at all. That's actually gone up. So the total system price has plateaued.

More importantly: 0% VAT on solar ends in March 2027. After that, you're paying 20% VAT on the full system — that's £2,000-£3,000 extra on a typical install.

And every month you wait, you're paying full price for electricity that a battery would halve. At your usage, that's roughly £65-£110 per month you're spending that you don't need to. Over 6 months of waiting, that's £400-£660 gone.

So the real question is: does the system cost less in 6 months than it does today plus the £600 you'll spend on electricity you didn't need to buy? Usually the answer is no."`
                },
                {
                  title: "My partner needs to agree",
                  response: `"Of course — it's a household decision. Would it help if I sent everything we've discussed in writing so they can see the numbers? I can include the full breakdown of savings, income, and payback so they can follow exactly what we talked about.

Or if it would be easier, I'm happy to jump on a quick call with both of you — sometimes it helps to have someone who can answer questions directly rather than playing telephone.

Either way, no rush. I'll send the proposal now so you've got it, and we can pick this back up whenever suits you both."`
                },
                {
                  title: "I've heard bad things about solar companies",
                  response: `"You're absolutely right to be cautious, and honestly, there are some cowboys in this industry. That's exactly why we operate the way we do.

Here's how we protect you:

MCS certified — that's the government-backed standard. Without MCS, you can't claim the SEG export payments.

RECC member — that's the consumer protection body for renewable energy. If anything goes wrong, you have an independent complaints route.

Section 75 — you pay your deposit by credit card, you're protected by law. If we disappeared tomorrow (we won't, we install 100+ systems a month), your bank refunds you.

25/50/25 payment structure — you only pay the final 25% AFTER the system is installed and commissioned. We don't get fully paid until you're happy.

And honestly? Google us. 30+ five-star reviews. We're not hard to find and we're not going anywhere."`
                },
              ].map((obj, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedObjection(expandedObjection === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="font-medium text-slate-900">&quot;{obj.title}&quot;</span>
                    {expandedObjection === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  {expandedObjection === index && (
                    <div className="px-4 pb-4">
                      <ObjectionResponse response={obj.response} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 8 */}
          <ScriptStep
            step={8}
            title="The Close"
            goal="Transition to paperwork. Make the next step feel natural and easy."
            script={`"So here's what happens next. I'm going to send you everything we've discussed in writing — the system spec, the pricing, the savings breakdown, all of it.

You'll get an email in the next few minutes. Have a read through, make sure everything matches what we discussed.

If you're happy to proceed, the payment structure is:
- 25% deposit on acceptance — that's by credit card, so you're protected under Section 75
- 50% when we confirm your install date
- Final 25% on completion

The deposit secures your slot and kicks off the DNO application. That takes 4-8 weeks, so the sooner we submit, the sooner you're generating.

Any questions before I send that over?"

[After they confirm]

"Perfect. Check your inbox — should be there now. Can you see it's arrived?"`}
            keyLine="'Check your inbox — should be there now. Can you see it's arrived?'"
            whyItWorks="Confirming email arrival creates micro-commitment and keeps the conversation going while they have the proposal in front of them."
            audioClip={AUDIO_CLIPS.step8}
          />

          {/* Step 9 */}
          <ScriptStep
            step={9}
            title="Follow-Up"
            goal="Stay in touch without being pushy. Add value at each touchpoint."
            script={`DAY 1 (WhatsApp, after call):
"Hi [name], it's [your name] from [company]. Just sent over the proposal we discussed — let me know if you have any questions! I've also attached the product spec sheets for the panels and batteries."

DAY 2 (WhatsApp):
"Hey [name], just checking you received everything okay? Happy to jump on a quick call if any questions came up overnight."

DAY 3-5 (WhatsApp):
"Hi [name], noticed the 0% VAT window is getting tighter — just wanted to flag that if you want to lock in before March 2027, we'd need to get the DNO app in fairly soon. No pressure, just keeping you informed."

DAY 7+ (WhatsApp or call):
"Hey [name], just circling back. Any thoughts on the proposal? I'm around this week if it helps to have another chat."

REFERRAL MENTION:
"By the way, we do have a referral incentive — £250 cash for any friend or family who goes ahead. If you know anyone else looking into solar, happy to have a chat with them too."`}
            keyLine="'£250 cash for any referral that goes ahead.'"
            whyItWorks="Follow-up keeps you top of mind without being aggressive. The referral mention plants a seed for future business."
            audioClip={AUDIO_CLIPS.step9}
          />
        </div>
      </section>
    </div>
  )
}

// Objection Response with Copy
function ObjectionResponse({ response }: { response: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-slate-900 rounded-xl p-5">
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Full Response</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3 py-2 rounded-lg transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-white text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden font-sans">
        {response}
      </pre>
    </div>
  )
}
