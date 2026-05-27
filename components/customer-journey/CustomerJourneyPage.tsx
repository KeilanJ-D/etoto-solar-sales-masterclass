'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, ChevronRight, Clock, FileText, Mail, MessageSquare,
  Phone, Play, Sparkles, Target, TrendingUp, Users, Zap,
} from 'lucide-react'
import { journeySteps } from '@/lib/customer-journey/questions'
import MockLeadForm from './MockLeadForm'

export default function CustomerJourneyPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] rounded-full text-xs sm:text-sm font-semibold mb-5 border border-[#E8192C]/30">
            <Users className="w-3.5 h-3.5" />
            The 8-step customer funnel
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 leading-tight text-balance">
            Before they ever speak to you.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            Every customer answers 8 questions after clicking your installer&apos;s ad.
            By the time you pick up the phone, you know what they want, what they spend,
            where they live, and what stage they&apos;re at. <strong className="text-white">
            That&apos;s why this funnel works — your call is verification, not sales.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold rounded-xl shadow-lg transition-all min-h-[52px]"
            >
              <Play className="w-4 h-4" />
              Experience it as your customer would
            </button>
            <a
              href="#read-view"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-semibold border border-white/20 rounded-xl transition-all min-h-[52px]"
            >
              Read the 8 questions first
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* READ VIEW — the 8 questions as vertical timeline */}
      <section id="read-view" className="bg-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-[#E8192C] mb-2">
              The funnel, step by step
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3">
              What your customer sees
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Each question is on screen for ~10 seconds. The whole funnel takes them
              60–90 seconds to complete. The rep insight under each card is for you only —
              the customer never sees it.
            </p>
          </div>

          <div className="space-y-4">
            {journeySteps.map((step, idx) => (
              <div key={step.id} className="flex gap-3 sm:gap-5">
                {/* Step number + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E8192C] text-white font-black flex items-center justify-center text-sm shadow-md">
                    {step.id}
                  </div>
                  {idx < journeySteps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 my-1.5 min-h-[40px]" />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-6">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">
                    {step.title}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {step.question}
                  </h3>
                  {step.helper && (
                    <p className="text-xs text-slate-500 mb-3 italic">{step.helper}</p>
                  )}

                  {/* Render representative content per step type */}
                  {step.type === 'multi-select' && step.options && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {step.options.map((opt) => (
                        <span
                          key={opt.value}
                          className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                        >
                          ☐ {opt.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.type === 'single-select' && step.options && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {step.options.map((opt) => (
                        <span
                          key={opt.value}
                          className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                        >
                          ○ {opt.label}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.type === 'number' && (
                    <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-500">
                      {step.inputPrefix && <span>{step.inputPrefix}</span>}
                      <span>___</span>
                      {step.inputSuffix && <span>{step.inputSuffix}</span>}
                    </div>
                  )}
                  {step.type === 'text' && (
                    <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 text-xs text-slate-500">
                      <span>_________</span>
                    </div>
                  )}
                  {step.type === 'fieldset' && step.fields && (
                    <div className="grid grid-cols-2 gap-1.5 mb-3">
                      {step.fields.map((field) => (
                        <span
                          key={field.name}
                          className="text-xs px-2.5 py-1 bg-slate-100 text-slate-500 rounded border border-slate-200"
                        >
                          {field.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Why we ask this — rep-only insight */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-amber-800 mb-0.5">
                        Why we ask (rep insight)
                      </p>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        {step.whyAsked}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Try it yourself CTA inline */}
          <div className="mt-10 bg-gradient-to-br from-[#E8192C]/10 to-amber-50 border-2 border-[#E8192C]/20 rounded-2xl p-6 sm:p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8192C] text-white mb-3">
              <Play className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Now experience it yourself.
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto mb-5">
              Reading the questions tells you what. Filling it in like your customer tells you{' '}
              <em>why it feels easy to complete</em>. That feeling is why 100% more leads come
              through this funnel vs a plain contact form.
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold rounded-xl shadow-lg transition-all min-h-[48px]"
            >
              Open the mock form
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-500 mt-3 italic">
              No answers saved. No emails fire. Just for feel.
            </p>
          </div>
        </div>
      </section>

      {/* POST-FORM PIPELINE */}
      <section className="bg-slate-50 px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-emerald-700 mb-2">
              The moment they hit submit
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3">
              What happens in the next 24 hours
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              The customer is gone — but four automations have already fired and your CRM is doing
              work for you. This is what good lead-management looks like.
            </p>
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            <PipelineEvent
              when="Instantly"
              icon={Mail}
              color="bg-blue-100 text-blue-700"
              title="Welcome email fires"
              body="Customer gets a branded email confirming their quote request, with a CTA to complete the SolaFlow estimator while they wait. Sets the bar — they expect a professional company now."
            />
            <PipelineEvent
              when="< 5 mins"
              icon={Phone}
              color="bg-emerald-100 text-emerald-700"
              title="Your call window opens"
              body="Lead lands in GoHighLevel CRM with all 8 funnel answers populated + the SolaFlow estimate (if completed). Your job: call within 5 minutes while they're still warm."
            />
            <PipelineEvent
              when="If no answer"
              icon={MessageSquare}
              color="bg-amber-100 text-amber-700"
              title="Auto SMS at 5 / 15 / 60 min marks"
              body={`"Hi {firstName}, we tried calling but no answer — when's the best time to catch you?" Drives a 30%+ callback rate from no-answers.`}
            />
            <PipelineEvent
              when="1 day later"
              icon={Clock}
              color="bg-purple-100 text-purple-700"
              title="Active-quote follow-up SMS"
              body={`If they've moved to "Active Quote" stage but haven't booked, the system pings them once: "Any questions about your quote?". Re-opens 1 in 5 stalled deals.`}
            />
          </div>
        </div>
      </section>

      {/* GHL CONTACT CARD MOCKUP */}
      <section className="bg-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-widest font-bold text-[#E8192C] mb-2">
              What you see in your CRM
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3">
              The rep&apos;s view
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              You open the contact card in GoHighLevel and this is what&apos;s waiting for you —
              before you say hello.
            </p>
          </div>

          <GHLContactCardMockup />
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-slate-900 text-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
              Why we built it this way
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto">
              The funnel exists because every question removes friction from the sales call.
              Less guessing, faster close, better conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              value="100%"
              label="More qualified leads"
              detail="vs a plain contact form"
              icon={Target}
            />
            <StatCard
              value="3 min"
              label="Average estimate time"
              detail="from ad click to lead-in-CRM"
              icon={Zap}
            />
            <StatCard
              value="1+ hr"
              label="Saved per rep per week"
              detail="vs manual qualification calls"
              icon={TrendingUp}
            />
          </div>
        </div>
      </section>

      {/* NEXT STEP */}
      <section className="bg-white px-4 sm:px-6 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest font-bold text-[#E8192C] mb-3">
            Now you know what happened before you called.
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Time to learn what to say.
          </h2>
          <p className="text-base text-slate-600 mb-6">
            The 9 Steps walks you through the actual call — rapport, discovery, audit, formula, the
            close — with example scripts, real-call audio clips and objection handling.
          </p>
          <Link
            href="/steps"
            className="inline-flex items-center gap-2 px-7 py-4 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold rounded-xl shadow-lg transition-all min-h-[52px]"
          >
            Open the 9 Steps
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* MOCK FORM MODAL */}
      {showForm && <MockLeadForm onClose={() => setShowForm(false)} />}
    </div>
  )
}

// ============================================
// HELPERS
// ============================================

function PipelineEvent({
  when, icon: Icon, color, title, body,
}: {
  when: string
  icon: typeof Mail
  color: string
  title: string
  body: string
}) {
  return (
    <div className="flex gap-4 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{when}</p>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

function StatCard({
  value, label, detail, icon: Icon,
}: {
  value: string
  label: string
  detail: string
  icon: typeof Target
}) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#E8192C]/20 text-[#E8192C] mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-3xl sm:text-4xl font-black text-[#E8192C] mb-1">{value}</p>
      <p className="text-sm font-bold mb-1">{label}</p>
      <p className="text-xs text-slate-400">{detail}</p>
    </div>
  )
}

function GHLContactCardMockup() {
  return (
    <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      {/* GHL-style top bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 font-mono">app.gohighlevel.com / Contacts</span>
        </div>
        <span className="font-mono text-emerald-400">● Live</span>
      </div>

      <div className="p-4 sm:p-6 bg-white">
        {/* Contact header */}
        <div className="flex items-start justify-between mb-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-lg">
              SJ
            </div>
            <div>
              <p className="text-base font-bold text-slate-900">Sarah Jones</p>
              <p className="text-xs text-slate-500">DN4 0SJ · sarah.j@email.com · 07700 900123</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            New lead
          </span>
        </div>

        {/* Lead source */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 mb-5">
          <p className="text-[10px] uppercase tracking-widest font-bold text-amber-800 mb-0.5">
            Lead source
          </p>
          <p className="text-sm font-bold text-amber-900">
            Sigenergy ad → MCJ Energy funnel · Est. value £10,500
          </p>
        </div>

        {/* Custom fields from funnel */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <CustomField label="Products of interest" value="Solar PV, Battery Storage" />
          <CustomField label="Decision stage" value="Comparing quotes" />
          <CustomField label="Info needed" value="More info on savings/payback" />
          <CustomField label="Monthly bill" value="£180/month" highlight />
          <CustomField label="Annual usage (calc.)" value="~6,353 kWh" />
          <CustomField label="SolaFlow estimate" value="Completed — 6.6 kWp / 9 kWh" />
        </div>

        {/* Activity feed */}
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">
            Activity
          </p>
          <div className="space-y-2 text-xs">
            <ActivityLine icon={Mail} color="text-blue-600" text="Welcome email delivered" time="2 mins ago" />
            <ActivityLine icon={Sparkles} color="text-amber-600" text="SolaFlow estimate completed" time="3 mins ago" />
            <ActivityLine icon={FileText} color="text-purple-600" text="Lead form submitted" time="4 mins ago" />
            <ActivityLine icon={Target} color="text-emerald-600" text="First touch — Sigenergy ad click" time="6 mins ago" />
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            All 8 funnel answers + SolaFlow output are available <strong className="text-slate-700">before you dial</strong>.
            Your call window opens now.
          </span>
        </div>
      </div>
    </div>
  )
}

function CustomField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-2.5 border ${highlight ? 'bg-[#E8192C]/5 border-[#E8192C]/20' : 'bg-slate-50 border-slate-200'}`}>
      <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-0.5 truncate">
        {label}
      </p>
      <p className={`text-xs font-bold truncate ${highlight ? 'text-[#E8192C]' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  )
}

function ActivityLine({
  icon: Icon, color, text, time,
}: {
  icon: typeof Mail
  color: string
  text: string
  time: string
}) {
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <Icon className={`w-3.5 h-3.5 ${color} flex-shrink-0`} />
      <span className="flex-1">{text}</span>
      <span className="text-slate-400 text-[10px]">{time}</span>
    </div>
  )
}
