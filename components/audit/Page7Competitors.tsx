import { PageHeader, PageFooter } from './PageShared'

const competitors = [
  {
    name: 'PV Generation',
    domain: 'pvgeneration.ie',
    threat: 'HIGH',
    threatColor: '#E8192C',
    notes: 'Dominant organic presence across all Irish counties. 90+ staff. Instant quoting, professional CRO, and an aggressive review acquisition machine. The clear market benchmark — and the clearest signal of what a fully-built growth engine looks like at scale.',
  },
  {
    name: 'Swyft Energy',
    domain: 'swyftenergy.ie',
    threat: 'HIGH',
    threatColor: '#E8192C',
    notes: "Currently owns 'solar panels Cork' paid and organic traffic. Instant online quote tool, full retargeting infrastructure, integrated CRM, and a heavily review-optimised profile. The most direct digital competitor and the most important to overtake.",
  },
  {
    name: 'Wizer Energy',
    domain: 'wizerenergy.ie',
    threat: 'MEDIUM',
    threatColor: '#F5921E',
    notes: "Aggressive ad spend with live '50% Extra Free' promotional campaigns. Cork-focused with dedicated high-conversion landing pages built around urgency mechanics and limited-time offer psychology.",
  },
  {
    name: 'Clean Energy Solar',
    domain: 'cleanenergysolar.ie',
    threat: 'MEDIUM',
    threatColor: '#F5921E',
    notes: 'Strong Google review count. Cork city and county focused. Basic site but very high community trust signals built on referral-heavy word of mouth. Growing fast.',
  },
  {
    name: 'North Cork Electrical',
    domain: 'northcorkelectrical.ie',
    threat: 'MEDIUM',
    threatColor: '#F5921E',
    notes: 'Strong in North Cork. Excellent case studies and project photography. Personal brand-driven growth model — a blueprint for exactly the kind of founder-led content strategy that Solar Path currently lacks.',
  },
  {
    name: 'Solar Hill Energy',
    domain: 'solarhill.ie',
    threat: 'LOW',
    threatColor: '#6B7280',
    notes: "Newer entrant. Lean online presence. Cork-based. Low current threat — but the Irish solar market is growing fast enough that today's low-threat competitor becomes tomorrow's direct rival if left unaddressed.",
  },
]

export default function Page7Competitors() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>06</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            Know Exactly Who You're Fighting
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "The competitive landscape assessed across organic presence, conversion infrastructure, and paid media. The consistent pattern: the biggest threats aren't more talented — they've invested in the infrastructure Solar Path hasn't built yet."
        </p>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {competitors.map((c) => (
            <div key={c.name} className="border border-[#E2E5EA] p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-extrabold uppercase text-[10px] tracking-wide text-[#0A0A0A]">{c.name}</p>
                  <p className="text-[#6B7280] font-medium" style={{ fontSize: '9px' }}>{c.domain}</p>
                </div>
                <span
                  className="px-2.5 py-1 text-white font-black rounded-full"
                  style={{ fontSize: '7.5px', background: c.threatColor }}
                >
                  {c.threat}
                </span>
              </div>
              <p className="text-[#374151] leading-relaxed" style={{ fontSize: '9.5px' }}>{c.notes}</p>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "PV Generation and Swyft Energy are ahead on infrastructure — not talent. The gap is closeable in 90 days with the right partner. The question is who moves first."
          </p>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
