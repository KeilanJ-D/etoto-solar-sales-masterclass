'use client'

import SalesStep, { FromTheCall, KeyLine } from './SalesStep'
import { Send, MessageCircle, Phone, Clock, Users } from 'lucide-react'

const followUpSequence = [
  {
    icon: Send,
    timing: 'On the call',
    action: 'Proposal sent and confirmed received.',
    highlight: true,
  },
  {
    icon: MessageCircle,
    timing: 'Same day (if not closed)',
    action: 'WhatsApp: "Just sent everything over — any questions at all, just shout. Have a read through when you get a sec."',
  },
  {
    icon: Phone,
    timing: 'Day 2',
    action: '"Hi [Name], just checking you\'ve had a chance to look through the proposal. Any questions I can help with?"',
  },
  {
    icon: Clock,
    timing: 'Day 3-5 (if no response)',
    action: '"Just wanted to flag — DNO applications are currently taking 4-8 weeks in your area. The sooner we submit, the sooner you\'re up and running."',
    note: 'Create urgency with a real fact, not fake scarcity.',
  },
  {
    icon: MessageCircle,
    timing: 'Day 7+ (going cold)',
    action: '"Hi [Name], I know life gets busy. The quote\'s valid for 30 days — just wanted to make sure it doesn\'t expire on you. Happy to answer anything that\'s holding things up."',
  },
]

export default function Step9FollowUp() {
  return (
    <SalesStep
      id="step9"
      stepNumber={9}
      title="Stay in Control of the Timeline"
      goal="The deal isn't done until the deposit lands."
    >
      <h3 className="text-lg font-bold text-slate-900 mb-6">Follow-Up Sequence</h3>
      
      {/* Timeline */}
      <div className="relative mb-10">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />
        
        <div className="space-y-6">
          {followUpSequence.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="relative flex gap-4">
                {/* Timeline dot */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                  item.highlight ? 'bg-[#E8192C] text-white' : 'bg-white border-2 border-slate-200'
                }`}>
                  <Icon className={`w-5 h-5 ${item.highlight ? 'text-white' : 'text-slate-400'}`} />
                </div>
                
                {/* Content */}
                <div className={`flex-1 pb-6 ${index === followUpSequence.length - 1 ? 'pb-0' : ''}`}>
                  <div className={`rounded-xl p-4 ${
                    item.highlight 
                      ? 'bg-[#E8192C] text-white' 
                      : 'bg-slate-50 border border-slate-100'
                  }`}>
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                      item.highlight ? 'text-white/80' : 'text-[#E8192C]'
                    }`}>
                      {item.timing}
                    </p>
                    <p className={`text-sm ${item.highlight ? 'text-white' : 'text-slate-700'}`}>
                      {item.action}
                    </p>
                    {item.note && (
                      <p className="text-[#F5921E] text-xs font-semibold mt-2">{item.note}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Referral Play */}
      <div className="bg-slate-900 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#F5921E]/20 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-[#F5921E]" />
          </div>
          <div>
            <h4 className="font-bold text-white mb-2">The Referral Play</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              &ldquo;If you like what we&apos;ve done, we have a referral incentive — <span className="text-[#F5921E] font-bold">£250 cash</span> for every neighbour or friend you send our way.&rdquo;
            </p>
            <p className="text-slate-400 text-xs">
              Plant the seed on the FIRST call, not after install. The customer is most excited immediately after seeing the numbers.
            </p>
          </div>
        </div>
      </div>

      <FromTheCall>
        Mark mentioned &ldquo;there&apos;s about 800 houses here&rdquo; when Keilan raised the referral scheme. The referral conversation happened before the deposit was even taken. Strike while the iron is hot.
      </FromTheCall>

      <KeyLine>
        The deal isn&apos;t closed when they say yes. It&apos;s closed when the deposit lands. Stay in control of the timeline until that happens.
      </KeyLine>
    </SalesStep>
  )
}
