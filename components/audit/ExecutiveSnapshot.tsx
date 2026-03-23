import { PageLayout } from './PageLayout'

const scores = [
  { label: 'SEO', sublabel: 'Organic Visibility', score: '6.0' },
  { label: 'CRO', sublabel: 'Conversion Rate', score: '5.0' },
  { label: 'Brand', sublabel: 'Identity & Trust', score: '7.0' },
  { label: 'Lead Gen', sublabel: 'Pipeline Infra', score: '4.0' },
]

const coverageItems = [
  { icon: '🔍', label: 'SEO & Rankings' },
  { icon: '⚡', label: 'Lead Conversion' },
  { icon: '🎯', label: 'Brand & Trust' },
  { icon: '⚔️', label: 'Competitor Intel' },
]

export default function ExecutiveSnapshot() {
  return (
    <PageLayout sectionNumber="01" sectionTitle="Executive Snapshot">
      <div className="flex flex-col gap-7">
        {/* Lead copy */}
        <div className="max-w-2xl">
          <p className="text-[#0A0A0A] font-semibold leading-relaxed mb-4" style={{ fontSize: '14px' }}>
            "Solar Path has the look. The market has the demand. What's missing is the infrastructure to turn interest into revenue — at scale, at speed, and without letting a single qualified lead fall through the floor."
          </p>
          <p className="text-[#4B5563] leading-relaxed" style={{ fontSize: '11px' }}>
            This audit was produced before we've even had a conversation. It's based entirely on what's publicly visible — what Google sees, what a homeowner sees when they land on your site, and what your competitors are doing while you're not.
          </p>
        </div>

        {/* Score cards */}
        <div className="flex gap-3">
          {scores.map((s) => (
            <div key={s.label} className="flex-1 bg-white border border-[#E5E7EB] p-4" style={{ borderTop: '4px solid #E8192C' }}>
              <p className="text-[#E8192C] font-black leading-none mb-2" style={{ fontSize: '36px' }}>{s.score}</p>
              <p className="text-[#0A0A0A] font-bold uppercase text-[9px] tracking-wider mb-0.5">{s.label}</p>
              <p className="text-[#9CA3AF] text-[8px]">{s.sublabel}</p>
            </div>
          ))}
          {/* Overall card - dark */}
          <div className="flex-1 bg-[#0A0A0A] p-4" style={{ borderTop: '4px solid #E8192C' }}>
            <p className="text-white font-black leading-none mb-2" style={{ fontSize: '36px' }}>5.5</p>
            <p className="text-white font-bold uppercase text-[9px] tracking-wider mb-0.5">Overall</p>
            <p className="text-[#6B7280] text-[8px]">Out of 10</p>
          </div>
        </div>

        {/* Why this matters callout */}
        <div className="bg-white border-l-4 border-[#E8192C] pl-5 pr-6 py-4">
          <p className="text-[#E8192C] font-bold uppercase text-[9px] tracking-widest mb-2">Why This Matters</p>
          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
            ETOTO Media has generated <span className="font-bold text-[#0A0A0A]">£175M+</span> in attributed sales for solar & renewables installers across the UK & Ireland. We know exactly what separates a solar business generating 20 leads a month from one generating 80. The gap between those two numbers is this audit.
          </p>
        </div>

        {/* Coverage overview */}
        <div className="bg-[#FAFAFA] border-l-4 border-[#F5921E] pl-5 pr-6 py-4">
          <p className="text-[#F5921E] font-bold uppercase text-[9px] tracking-widest mb-3">What This Audit Covers</p>
          <div className="grid grid-cols-4 gap-4">
            {coverageItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[#374151] font-medium text-[10px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
