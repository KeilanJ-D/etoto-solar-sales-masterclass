'use client'

import SalesStep, { WhyCard, KeyLine, FromTheCall } from './SalesStep'
import { CheckCircle, Send, Mail, CreditCard, Shield } from 'lucide-react'

const closeSequence = [
  {
    icon: CheckCircle,
    step: 'A',
    title: 'Confirm the spec',
    script: '"Based on everything we\'ve discussed, does the system spec sound right for you?"',
  },
  {
    icon: Send,
    step: 'B',
    title: 'Send the proposal LIVE',
    script: '"I\'m going to send you the formal proposal right now — can you check your email and confirm you\'ve received it?"',
    note: 'ALWAYS send the proposal while on the phone. No exceptions.',
  },
  {
    icon: Mail,
    step: 'C',
    title: 'Explain the next step',
    script: '"If you\'re happy with everything, the next step is simply accepting the quotation, which authorises us to apply to the grid on your behalf."',
  },
  {
    icon: CreditCard,
    step: 'D',
    title: 'Explain payment structure',
    items: [
      '25% deposit on quote acceptance',
      '50% when install date is confirmed',
      'Final 25% once installed and commissioned',
    ],
  },
  {
    icon: Shield,
    step: 'E',
    title: 'Remove risk',
    script: '"If you pay the deposit by credit card, you\'re protected under Section 75 — full consumer protection."',
  },
]

export default function Step8Close() {
  return (
    <SalesStep
      id="step8"
      stepNumber={8}
      title="Close on the Call. Not After."
      goal="The proposal goes out while you're still talking. Not tomorrow. Not 'when I'm back at the office.' Now."
      dark
    >
      <h3 className="text-lg font-bold text-white mb-6">The Close Sequence</h3>
      <div className="space-y-4 mb-8">
        {closeSequence.map((item, index) => {
          const Icon = item.icon
          return (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#E8192C]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8192C] flex items-center justify-center font-bold text-white text-sm">
                    {item.step}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#E8192C]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm mb-2">{item.title}</h4>
                  {item.script && (
                    <p className="text-slate-300 text-sm italic mb-2">{item.script}</p>
                  )}
                  {item.items && (
                    <ul className="space-y-1">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.note && (
                    <p className="text-[#F5921E] text-xs font-semibold mt-2">{item.note}</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <h3 className="text-lg font-bold text-white mb-4">Why This Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <h4 className="font-bold text-white text-sm mb-2">Emotional engagement</h4>
          <p className="text-slate-400 text-sm">The proposal arrives while the customer is still engaged. Not 24 hours later when they&apos;ve cooled off.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <h4 className="font-bold text-white text-sm mb-2">Micro-commitment</h4>
          <p className="text-slate-400 text-sm">&ldquo;Check your email&rdquo; is a small action. They&apos;re already taking steps toward the purchase.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <h4 className="font-bold text-white text-sm mb-2">Feels safe</h4>
          <p className="text-slate-400 text-sm">25/50/25 payment structure means they&apos;re not handing over £12K upfront. Risk is spread.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
          <h4 className="font-bold text-white text-sm mb-2">Section 75 removes fear</h4>
          <p className="text-slate-400 text-sm">Credit card protection = peace of mind. &ldquo;What if something goes wrong?&rdquo; is answered before it&apos;s asked.</p>
        </div>
      </div>

      <div className="bg-slate-800 border-l-4 border-[#F5921E] rounded-r-xl p-5 mb-6">
        <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">From the Real Call</p>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          Mark asked &ldquo;How do I protect myself?&rdquo; and Keilan immediately answered &ldquo;Section 75&rdquo; without hesitation. The objection was handled before it became a blocker. Mark was satisfied in 5 seconds.
        </p>
      </div>

      <div className="bg-[#E8192C] text-white rounded-xl p-5 md:p-6">
        <p className="text-sm md:text-base font-medium leading-relaxed text-center">
          Send the proposal on the call. Not after. The customer who&apos;s engaged right now is not the same customer you&apos;ll speak to tomorrow.
        </p>
      </div>
    </SalesStep>
  )
}
