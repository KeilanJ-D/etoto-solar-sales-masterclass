import { PageLayout } from './PageLayout'

const pipelineCards = [
  {
    title: 'Lead Capture',
    badge: 'PARTIAL',
    badgeColor: '#F5921E',
    desc: 'Three calculators exist. Contact form exists. But calculators have no email gate — a homeowner gets a number and leaves without entering their details. The contact form has no urgency, no pre-qualification, and no confirmation of next steps.',
    insight: 'Tools that generate interest but don't capture identity are awareness assets, not lead gen assets.',
  },
  {
    title: 'Lead Response',
    badge: 'UNKNOWN',
    badgeColor: '#E8192C',
    desc: 'No live chat. No WhatsApp. No automated acknowledgement. A lead arriving at 9pm Tuesday gets a response Wednesday morning — by which point two competitors have already called.',
    insight: 'Sub-60 minute response increases conversion by up to 391% vs same-day response.',
  },
  {
    title: 'Lead Retention',
    badge: 'NOT IN PLACE',
    badgeColor: '#E8192C',
    desc: 'No Meta retargeting pixel. No email nurture for unconverted leads. No exit-intent capture. Every visitor who doesn't convert today is permanently gone.',
    insight: 'The avg solar buyer takes 3–6 weeks from first research to booking. You're invisible for all of that window.',
  },
]

export default function CROFunnel() {
  return (
    <PageLayout sectionNumber="04" sectionTitle="You Have the Tools. You're Not Using Them to Close.">
      <div className="flex flex-col gap-6">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          Most solar websites don't have calculators, dedicated location pages, and an embedded reviews section. Solar Path does — and that's genuinely ahead of the curve. The problem isn't what exists. It's what happens after someone engages with any of it.
        </p>

        {/* Leaky funnel callout */}
        <div className="bg-[#FEF2F2] border-l-4 border-[#E8192C] p-5">
          <p className="text-[#E8192C] font-bold uppercase text-[9px] tracking-widest mb-2">The Leaky Funnel Problem</p>
          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
            A homeowner visits solarpath.ie. They use the battery payback calculator. They get a number. They close the tab. You never knew they were there. Every tool on the site generates interest — none of them are engineered to convert that interest into a conversation.
          </p>
        </div>

        {/* Pipeline cards */}
        <div className="grid grid-cols-3 gap-4">
          {pipelineCards.map((card) => (
            <div key={card.title} className="bg-white border border-[#E5E7EB] flex flex-col" style={{ borderTop: '4px solid #E8192C' }}>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[#0A0A0A] font-bold uppercase text-[9px] tracking-wider">{card.title}</p>
                  <span 
                    className="text-white px-2 py-0.5 text-[7px] font-bold uppercase"
                    style={{ background: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                </div>
                <p className="text-[#4B5563] text-[9px] leading-relaxed mb-3">{card.desc}</p>
                <p className="text-[#6B7280] text-[8px] italic border-t border-[#E5E7EB] pt-2">"{card.insight}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Funnel visualisation */}
        <div className="space-y-3">
          {/* Current funnel */}
          <div className="bg-[#FAFAFA] p-4">
            <p className="text-[#6B7280] text-[8px] uppercase tracking-widest font-bold mb-3">Current Funnel</p>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="bg-white border border-[#E5E7EB] px-3 py-2 font-medium">Visitor Lands</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-white border border-[#E5E7EB] px-3 py-2 font-medium">Uses Calculator</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-[#FEE2E2] border border-[#E8192C] px-3 py-2 font-medium text-[#E8192C]">Dead End — No Capture ✗</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-[#FEE2E2] border border-[#E8192C] px-3 py-2 font-medium text-[#E8192C]">Leaves Forever</span>
            </div>
          </div>

          {/* ETOTO funnel */}
          <div className="bg-[#F0FDF4] p-4">
            <p className="text-[#F5921E] text-[8px] uppercase tracking-widest font-bold mb-3">With ETOTO Infrastructure</p>
            <div className="flex items-center gap-2 text-[8px]">
              <span className="bg-white border border-[#16A34A] px-2.5 py-1.5 font-medium text-[#16A34A]">Lands</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-white border border-[#16A34A] px-2.5 py-1.5 font-medium text-[#16A34A]">Funnel Qualifies</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-white border border-[#16A34A] px-2.5 py-1.5 font-medium text-[#16A34A]">Email + SMS Captured</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-white border border-[#16A34A] px-2.5 py-1.5 font-medium text-[#16A34A]">Auto-Response {'<'}5 Min</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-white border border-[#16A34A] px-2.5 py-1.5 font-medium text-[#16A34A]">Retargeted</span>
              <span className="text-[#9CA3AF]">→</span>
              <span className="bg-[#16A34A] text-white px-2.5 py-1.5 font-bold">Booked Survey ✓</span>
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="border-l-4 border-[#E8192C] pl-5 py-2">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "Your website is doing more work than most of your competitors'. The gap isn't the top of the funnel — it's the middle. Plug it, and the traffic you're already attracting starts converting into signed contracts."
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
