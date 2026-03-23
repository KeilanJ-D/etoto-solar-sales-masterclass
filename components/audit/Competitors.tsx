import { PageLayout } from './PageLayout'

const competitors = [
  {
    name: 'PV Generation',
    domain: 'pvgeneration.ie',
    threat: 'HIGH',
    color: '#E8192C',
    notes: 'Dominant organic presence across all Irish counties. 90+ staff. Instant quoting, professional CRO, and an aggressive review acquisition machine. The clear market benchmark.',
  },
  {
    name: 'Swyft Energy',
    domain: 'swyftenergy.ie',
    threat: 'HIGH',
    color: '#E8192C',
    notes: "Currently owns 'solar panels Cork' paid and organic traffic. Instant online quote tool, full retargeting infrastructure, integrated CRM. The most direct digital competitor.",
  },
  {
    name: 'Wizer Energy',
    domain: 'wizerenergy.ie',
    threat: 'MEDIUM',
    color: '#F5921E',
    notes: "Aggressive ad spend with live '50% Extra Free' promotional campaigns. Cork-focused with dedicated high-conversion landing pages built around urgency mechanics.",
  },
  {
    name: 'Clean Energy Solar',
    domain: 'cleanenergysolar.ie',
    threat: 'MEDIUM',
    color: '#F5921E',
    notes: 'Strong Google review count. Cork city and county focused. Basic site but very high community trust signals built on referral-heavy word of mouth. Growing fast.',
  },
  {
    name: 'North Cork Electrical',
    domain: 'northcorkelectrical.ie',
    threat: 'MEDIUM',
    color: '#F5921E',
    notes: 'Strong in North Cork. Excellent case studies and project photography. Personal brand-driven growth model — a blueprint for founder-led content strategy.',
  },
  {
    name: 'Solar Hill Energy',
    domain: 'solarhill.ie',
    threat: 'LOW',
    color: '#9CA3AF',
    notes: "Newer entrant. Lean online presence. Cork-based. Low current threat — but today's low-threat competitor becomes tomorrow's direct rival if left unaddressed.",
  },
]

export default function Competitors() {
  return (
    <PageLayout sectionNumber="06" sectionTitle="Know Exactly Who You're Fighting">
      <div className="flex flex-col gap-6">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          The competitive landscape assessed across organic presence, conversion infrastructure, and paid media. The consistent pattern: the biggest threats aren't more talented — they've invested in the infrastructure Solar Path hasn't built yet.
        </p>

        {/* Competitor grid */}
        <div className="grid grid-cols-2 gap-4">
          {competitors.map((comp) => (
            <div key={comp.name} className="bg-white border border-[#E5E7EB] p-4" style={{ borderTop: `4px solid ${comp.color}` }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[#0A0A0A] font-bold text-[11px]">{comp.name}</p>
                  <p className="text-[#6B7280] text-[9px]">{comp.domain}</p>
                </div>
                <span 
                  className="text-white px-2 py-0.5 text-[7px] font-bold uppercase"
                  style={{ background: comp.color }}
                >
                  {comp.threat}
                </span>
              </div>
              <p className="text-[#4B5563] text-[9px] leading-relaxed">{comp.notes}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="border-l-4 border-[#E8192C] pl-5 py-3 bg-white">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "PV Generation and Swyft Energy are ahead on infrastructure — not talent. The gap is closeable in 90 days with the right partner. The question is who moves first."
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
