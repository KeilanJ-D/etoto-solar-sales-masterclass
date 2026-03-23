import { PageHeader, PageFooter } from './PageShared'

const auditCards = [
  {
    title: 'Lead Capture',
    badge: 'PARTIAL',
    badgeColor: '#F5921E',
    body: 'Three calculators exist. Contact form exists. But calculators have no email gate — a homeowner gets a number and leaves without entering their details. The contact form has no urgency, no pre-qualification, and no confirmation of next steps.',
    insight: 'Tools that generate interest but don\'t capture identity are awareness assets, not lead gen assets.',
  },
  {
    title: 'Lead Response',
    badge: 'UNKNOWN',
    badgeColor: '#E8192C',
    body: 'No live chat. No WhatsApp. No automated acknowledgement. A lead arriving at 9pm Tuesday gets a response Wednesday morning — by which point two competitors have already called. Speed to lead is the single biggest driver of close rate in solar.',
    insight: 'Sub-60 minute response increases conversion by up to 391% vs same-day response.',
  },
  {
    title: 'Lead Retention',
    badge: 'NOT IN PLACE',
    badgeColor: '#E8192C',
    body: 'No Meta retargeting pixel. No email nurture for unconverted leads. No exit-intent capture. Every visitor who doesn\'t convert today is permanently gone — there\'s no system to bring them back during the 3–6 week solar decision window.',
    insight: 'The avg solar buyer takes 3–6 weeks from first research to booking. You\'re invisible for all of that window.',
  },
]

export default function Page5CRO() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>04</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            You Have the Tools. You're Not Using Them to Close.
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "Most solar websites don't have calculators, dedicated location pages, and an embedded reviews section. Solar Path does — and that's genuinely ahead of the curve. The problem isn't what exists. It's what happens after someone engages with any of it."
        </p>

        {/* Leaky funnel callout */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2 bg-[#F8F8F8]">
          <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#E8192C] mb-1">The Leaky Funnel Problem</p>
          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>
            "A homeowner visits solarpath.ie. They use the battery payback calculator. They get a number. They close the tab. You never knew they were there. Every tool on the site generates interest — none of them are engineered to convert that interest into a conversation."
          </p>
        </div>

        {/* 3 audit cards */}
        <div className="grid grid-cols-3 gap-4">
          {auditCards.map((card) => (
            <div key={card.title} className="border border-[#E2E5EA] flex flex-col" style={{ borderTop: '4px solid #E8192C' }}>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#0A0A0A]">{card.title}</p>
                  <span
                    className="px-2 py-0.5 text-white font-bold rounded-full"
                    style={{ fontSize: '7px', background: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                </div>
                <p className="text-[#374151] leading-relaxed" style={{ fontSize: '9.5px' }}>{card.body}</p>
              </div>
              <div className="border-t border-[#E2E5EA] p-3 bg-[#F8F8F8]">
                <p className="text-[#6B7280] italic leading-relaxed" style={{ fontSize: '9px' }}>"{card.insight}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Funnel visualisation */}
        <div className="flex flex-col gap-3">
          {/* Current funnel */}
          <div>
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#6B7280] mb-2">Current Funnel</p>
            <div className="flex items-center gap-1 flex-wrap">
              {['Visitor Lands', 'Uses Calculator', '❌ Dead End — No Capture', 'Leaves Forever'].map((step, i) => {
                const isBad = step.includes('❌') || step.includes('Leaves')
                return (
                  <div key={step} className="flex items-center gap-1">
                    <div
                      className={`px-2.5 py-1.5 border text-[8px] font-bold uppercase`}
                      style={{
                        background: isBad ? '#FEF2F2' : '#F8F8F8',
                        borderColor: isBad ? '#E8192C' : '#E2E5EA',
                        color: isBad ? '#E8192C' : '#374151',
                      }}
                    >
                      {step}
                    </div>
                    {i < 3 && <span className="text-[#9CA3AF] text-xs">→</span>}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ETOTO funnel */}
          <div>
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#F5921E] mb-2">With ETOTO Infrastructure</p>
            <div className="flex items-center gap-1 flex-wrap">
              {['Lands', 'Funnel Qualifies', 'Email + SMS Captured', 'Auto-Response <5 Mins', 'Retargeted', 'Booked Survey'].map((step, i) => (
                <div key={step} className="flex items-center gap-1">
                  <div
                    className="px-2.5 py-1.5 border text-[8px] font-bold uppercase"
                    style={{ background: '#F0FDF4', borderColor: '#16A34A', color: '#15803D' }}
                  >
                    {step}
                  </div>
                  {i < 5 && <span className="text-[#9CA3AF] text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '10px' }}>
            "Your website is doing more work than most of your competitors'. The gap isn't the top of the funnel — it's the middle. Plug it, and the traffic you're already attracting starts converting into signed contracts."
          </p>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
