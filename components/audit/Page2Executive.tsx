import { PageHeader, PageFooter } from './PageShared'

const scoreCards = [
  { category: 'SEO', score: '6.0', label: 'Organic Visibility' },
  { category: 'CRO', score: '5.0', label: 'Conversion Rate' },
  { category: 'Brand', score: '7.0', label: 'Identity & Trust' },
  { category: 'Lead Gen', score: '4.0', label: 'Pipeline Infra' },
  { category: 'OVERALL', score: '5.5', label: 'Out of 10', dark: true },
]

const coverageItems = [
  { icon: '🔍', label: 'SEO & Rankings' },
  { icon: '⚡', label: 'Lead Conversion' },
  { icon: '🎯', label: 'Brand & Trust' },
  { icon: '⚔️', label: 'Competitor Intel' },
]

export default function Page2Executive() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />

      <div className="flex-1 px-10 py-8 flex flex-col gap-6">
        {/* Section number + title */}
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>01</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '16px', letterSpacing: '0.12em' }}>
            Executive Snapshot
          </h2>
        </div>

        {/* Lead copy */}
        <div className="flex flex-col gap-3">
          <p className="text-[#0A0A0A] font-bold leading-relaxed" style={{ fontSize: '13px' }}>
            "Solar Path has the look. The market has the demand. What's missing is the infrastructure to turn interest into revenue — at scale, at speed, and without letting a single qualified lead fall through the floor."
          </p>
          <p className="text-[#374151] font-normal leading-relaxed" style={{ fontSize: '11px' }}>
            "This audit was produced before we've even had a conversation. It's based entirely on what's publicly visible — what Google sees, what a homeowner sees when they land on your site, and what your competitors are doing while you're not. What happens when we go deeper is a different conversation entirely."
          </p>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-5 gap-3">
          {scoreCards.map((c) => (
            <div
              key={c.category}
              className={`flex flex-col p-4 border ${c.dark ? 'bg-[#0A0A0A] border-[#0A0A0A]' : 'bg-white border-[#E2E5EA]'}`}
              style={{ borderTop: c.dark ? '4px solid #E8192C' : '4px solid #E8192C' }}
            >
              <span className={`font-black leading-none mb-1 ${c.dark ? 'text-white' : 'text-[#E8192C]'}`} style={{ fontSize: '32px' }}>{c.score}</span>
              <span className={`font-extrabold uppercase text-[9px] tracking-wider mb-0.5 ${c.dark ? 'text-white' : 'text-[#0A0A0A]'}`}>{c.category}</span>
              <span className={`font-medium text-[8px] ${c.dark ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Why this matters callout */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2 bg-[#F8F8F8]">
          <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#E8192C] mb-2">Why This Matters</p>
          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
            "ETOTO Media has generated <strong>£175M+</strong> in attributed sales for solar &amp; renewables installers across the UK &amp; Ireland. We know exactly what separates a solar business generating 20 leads a month from one generating 80. The gap between those two numbers is this audit."
          </p>
        </div>

        {/* Coverage panel */}
        <div className="border-l-4 border-[#F5921E] pl-4 py-3 bg-[#F8F8F8]">
          <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#0A0A0A] mb-3">What This Audit Covers</p>
          <div className="grid grid-cols-4 gap-3">
            {coverageItems.map((item) => (
              <div key={item.label} className="bg-white border border-[#E2E5EA] p-3">
                <span className="text-lg mb-1 block">{item.icon}</span>
                <span className="font-bold text-[#0A0A0A] text-[10px] uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  )
}


