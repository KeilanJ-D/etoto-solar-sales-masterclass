'use client'

import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, Mail, MessageSquare,
  RotateCcw, Sparkles, X, FileText, Lightbulb, Phone,
} from 'lucide-react'
import { journeySteps } from '@/lib/customer-journey/questions'

interface FormState {
  products: string[]
  decision: string
  infoNeeded: string
  monthlyBill: string
  postcode: string
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
  }
}

const INITIAL_FORM_STATE: FormState = {
  products: [],
  decision: '',
  infoNeeded: '',
  monthlyBill: '',
  postcode: '',
  contact: { firstName: '', lastName: '', email: '', phone: '', address: '' },
}

interface MockLeadFormProps {
  onClose: () => void
}

const PRODUCT_LABELS: Record<string, string> = {
  solar: 'Solar PV',
  battery: 'Battery Storage',
  ev: 'EV Charging',
  led: 'LED Lighting',
  electrical: 'General Electrical Work',
}

export default function MockLeadForm({ onClose }: MockLeadFormProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE)

  const step = journeySteps[stepIndex]
  const isLast = stepIndex === journeySteps.length - 1

  const reset = () => {
    setStepIndex(0)
    setForm(INITIAL_FORM_STATE)
  }

  // Step-level validity (can the user move to the next step?)
  const canAdvance = (() => {
    switch (step.id) {
      case 1:
        return form.products.length > 0
      case 2:
        return form.decision !== ''
      case 3:
        return form.infoNeeded !== ''
      case 4:
        return form.monthlyBill.trim() !== '' && Number(form.monthlyBill) > 0
      case 5:
        return form.postcode.trim() !== ''
      case 6:
        return (
          form.contact.firstName.trim() !== '' &&
          form.contact.lastName.trim() !== '' &&
          form.contact.email.includes('@') &&
          form.contact.phone.trim() !== ''
        )
      default:
        return true
    }
  })()

  const next = () => {
    if (stepIndex < journeySteps.length - 1) setStepIndex((s) => s + 1)
  }
  const back = () => {
    if (stepIndex > 0) setStepIndex((s) => s - 1)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header: simulating a generic installer-branded form */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8192C] flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-none">
                  MCJ Energy Solutions
                </p>
                <p className="text-[10px] text-slate-500">Get your custom quote</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-200"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-200"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress stepper */}
          <div className="px-4 sm:px-6 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                Step {stepIndex + 1} of {journeySteps.length} · {step.title}
              </p>
              <p className="text-[11px] text-slate-400">
                ~{Math.round(((stepIndex + 1) / journeySteps.length) * 60)} sec
              </p>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E8192C] transition-all duration-300"
                style={{ width: `${((stepIndex + 1) / journeySteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form body */}
          <div className="px-4 sm:px-6 py-6 sm:py-8 min-h-[280px]">
            {step.id === 1 && (
              <MultiSelectStep
                question={step.question}
                helper={step.helper}
                options={step.options ?? []}
                selected={form.products}
                onChange={(products) => setForm((f) => ({ ...f, products }))}
              />
            )}
            {step.id === 2 && (
              <SingleSelectStep
                question={step.question}
                options={step.options ?? []}
                selected={form.decision}
                onChange={(decision) => setForm((f) => ({ ...f, decision }))}
              />
            )}
            {step.id === 3 && (
              <SingleSelectStep
                question={step.question}
                options={step.options ?? []}
                selected={form.infoNeeded}
                onChange={(infoNeeded) => setForm((f) => ({ ...f, infoNeeded }))}
              />
            )}
            {step.id === 4 && (
              <NumberStep
                question={step.question}
                helper={step.helper}
                prefix={step.inputPrefix}
                suffix={step.inputSuffix}
                value={form.monthlyBill}
                onChange={(monthlyBill) => setForm((f) => ({ ...f, monthlyBill }))}
              />
            )}
            {step.id === 5 && (
              <TextStep
                question={step.question}
                helper={step.helper}
                value={form.postcode}
                onChange={(postcode) => setForm((f) => ({ ...f, postcode }))}
                placeholder="e.g. DN4 0SJ"
              />
            )}
            {step.id === 6 && (
              <FieldsetStep
                question={step.question}
                helper={step.helper}
                contact={form.contact}
                onChange={(contact) => setForm((f) => ({ ...f, contact }))}
              />
            )}
            {step.id === 7 && (
              <ReviewStep form={form} onJumpTo={(idx) => setStepIndex(idx)} />
            )}
            {step.id === 8 && (
              <RedirectStep form={form} />
            )}
          </div>

          {/* Why this question is in the funnel (rep-only insight) */}
          <div className="bg-amber-50 border-y border-amber-200 px-4 sm:px-6 py-3 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-bold text-amber-800 mb-0.5">
                Why we ask this (rep view — hidden from customer)
              </p>
              <p className="text-xs text-amber-900 leading-snug">{step.whyAsked}</p>
            </div>
          </div>

          {/* Nav */}
          <div className="px-4 sm:px-6 py-4 flex justify-between gap-3 bg-slate-50">
            <button
              type="button"
              onClick={back}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            {isLast ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 min-h-[44px]"
              >
                Close walkthrough
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                disabled={!canAdvance}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-[#E8192C] rounded-lg hover:bg-[#D01622] disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
              >
                {step.id === 7 ? 'Submit' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// PER-STEP COMPONENTS
// ============================================

function MultiSelectStep({
  question, helper, options, selected, onChange,
}: {
  question: string
  helper?: string
  options: { value: string; label: string }[]
  selected: string[]
  onChange: (s: string[]) => void
}) {
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val])
  }
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">{question}</h3>
      {helper && <p className="text-sm text-slate-500 mb-5">{helper}</p>}
      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left min-h-[52px] ${
                isSelected
                  ? 'border-[#E8192C] bg-[#E8192C]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-[#E8192C] bg-[#E8192C]' : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="font-medium text-slate-900">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SingleSelectStep({
  question, options, selected, onChange,
}: {
  question: string
  options: { value: string; label: string }[]
  selected: string
  onChange: (s: string) => void
}) {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-5">{question}</h3>
      <div className="space-y-2">
        {options.map((opt) => {
          const isSelected = selected === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left min-h-[52px] ${
                isSelected
                  ? 'border-[#E8192C] bg-[#E8192C]/5'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-[#E8192C]' : 'border-slate-300'
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#E8192C]" />}
              </div>
              <span className="font-medium text-slate-900">{opt.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NumberStep({
  question, helper, prefix, suffix, value, onChange,
}: {
  question: string
  helper?: string
  prefix?: string
  suffix?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">{question}</h3>
      {helper && <p className="text-sm text-slate-500 mb-5">{helper}</p>}
      <div className="flex items-center gap-2">
        {prefix && <span className="text-2xl font-bold text-slate-700">{prefix}</span>}
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="flex-1 text-2xl font-bold text-slate-900 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[56px]"
          placeholder="0"
        />
        {suffix && <span className="text-sm text-slate-500">{suffix}</span>}
      </div>
    </div>
  )
}

function TextStep({
  question, helper, value, onChange, placeholder,
}: {
  question: string
  helper?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">{question}</h3>
      {helper && <p className="text-sm text-slate-500 mb-5">{helper}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        autoFocus
        placeholder={placeholder}
        className="w-full text-xl font-semibold text-slate-900 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[56px]"
      />
    </div>
  )
}

function FieldsetStep({
  question, helper, contact, onChange,
}: {
  question: string
  helper?: string
  contact: FormState['contact']
  onChange: (c: FormState['contact']) => void
}) {
  const update = (key: keyof FormState['contact'], value: string) => {
    onChange({ ...contact, [key]: value })
  }
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">{question}</h3>
      {helper && <p className="text-sm text-slate-500 mb-5">{helper}</p>}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={contact.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            placeholder="First name"
            className="px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[44px]"
          />
          <input
            type="text"
            value={contact.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            placeholder="Last name"
            className="px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[44px]"
          />
        </div>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[44px]"
        />
        <input
          type="tel"
          value={contact.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="Phone number"
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[44px]"
        />
        <input
          type="text"
          value={contact.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="Street address"
          className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8192C]/30 focus:border-[#E8192C] focus:outline-none min-h-[44px]"
        />
      </div>
    </div>
  )
}

function ReviewStep({
  form, onJumpTo,
}: {
  form: FormState
  onJumpTo: (idx: number) => void
}) {
  const productLabels = form.products.map((p) => PRODUCT_LABELS[p]).filter(Boolean).join(', ')
  const decisionLabel = journeySteps[1].options?.find((o) => o.value === form.decision)?.label
  const infoLabel = journeySteps[2].options?.find((o) => o.value === form.infoNeeded)?.label

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">Review your information</h3>
      <p className="text-sm text-slate-500 mb-5">Change anything that looks wrong, then submit.</p>
      <div className="space-y-2 text-sm">
        <ReviewRow label="Products" value={productLabels || '—'} onEdit={() => onJumpTo(0)} />
        <ReviewRow label="Decision stage" value={decisionLabel || '—'} onEdit={() => onJumpTo(1)} />
        <ReviewRow label="Info needed" value={infoLabel || '—'} onEdit={() => onJumpTo(2)} />
        <ReviewRow label="Monthly bill" value={form.monthlyBill ? `£${form.monthlyBill}/month` : '—'} onEdit={() => onJumpTo(3)} />
        <ReviewRow label="Postcode" value={form.postcode || '—'} onEdit={() => onJumpTo(4)} />
        <ReviewRow
          label="Contact"
          value={
            form.contact.firstName
              ? `${form.contact.firstName} ${form.contact.lastName} · ${form.contact.email}`
              : '—'
          }
          onEdit={() => onJumpTo(5)}
        />
      </div>
    </div>
  )
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 px-3 bg-slate-50 rounded-lg">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{label}</p>
        <p className="text-sm text-slate-900 truncate">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs font-semibold text-[#E8192C] hover:underline flex-shrink-0"
      >
        Edit
      </button>
    </div>
  )
}

function RedirectStep({ form }: { form: FormState }) {
  const monthlyBillNum = Number(form.monthlyBill) || 0
  const estimatedAnnualKwh = Math.round((monthlyBillNum * 12) / 0.34) || 6000
  const estimatedSystemCost = Math.max(
    9000,
    Math.round((estimatedAnnualKwh / 1000) * 1900),
  )
  const firstName = form.contact.firstName || 'Customer'

  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 mb-3">
          <Check className="w-7 h-7 text-emerald-600" strokeWidth={3} />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          Thanks, {firstName} — your quote is on its way
        </h3>
        <p className="text-sm text-slate-500">
          We&apos;ll redirect you to SolaFlow now to fine-tune your system.
        </p>
      </div>

      {/* What just fired off — rep-side visibility */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-5 text-white space-y-3">
        <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 mb-1">
          What just happened (rep view)
        </p>
        <FiredEvent
          icon={Mail}
          color="text-blue-300"
          title="Welcome email sent instantly"
          detail={`To: ${form.contact.email || 'customer@example.com'}`}
        />
        <FiredEvent
          icon={Sparkles}
          color="text-amber-300"
          title="Lead landed in GoHighLevel CRM"
          detail={`Source: Sigenergy ad · Est. system value: £${estimatedSystemCost.toLocaleString()}`}
        />
        <FiredEvent
          icon={ChevronRight}
          color="text-purple-300"
          title="Customer redirected to SolaFlow"
          detail="They build their own estimate before you call"
        />
        <FiredEvent
          icon={Phone}
          color="text-emerald-300"
          title="Your call window opens in 5 mins"
          detail="If no answer at 5/15/60 min marks → auto SMS fires"
        />
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-900 leading-snug">
          <FileText className="inline w-3.5 h-3.5 mr-1" />
          <strong>The lesson:</strong> Your customer has done ~80% of the qualifying for you.
          By the time you say hello, you know what they want, what they spend, where they live,
          and what stage they&apos;re at. That&apos;s why this funnel works.
        </p>
      </div>
    </div>
  )
}

function FiredEvent({
  icon: Icon, color, title, detail,
}: {
  icon: typeof Mail
  color: string
  title: string
  detail: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold leading-tight">{title}</p>
        <p className="text-xs text-slate-400 leading-snug">{detail}</p>
      </div>
    </div>
  )
}
