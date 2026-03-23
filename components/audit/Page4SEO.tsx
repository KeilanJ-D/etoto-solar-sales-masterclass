import { PageHeader, PageFooter } from './PageShared'

const covered = ['Cork ✓', 'Dublin ✓', 'Limerick ✓', 'Wicklow ✓']
const uncovered = [
  'Galway', 'Waterford', 'Kilkenny', 'Clare', 'Tipperary',
  'Wexford', 'Kerry', 'Louth', 'Meath', 'Kildare',
  'Mayo', 'Roscommon', 'Donegal', 'Sligo', 'Carlow', 'Laois',
]

export default function Page4SEO() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>03</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            What Google Thinks of You
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "Your SEO foundations are stronger than most Cork competitors. You're ranking page 1 for competitive terms and your site architecture is solid. The problem is the territory you're not claiming and the signals you're actively degrading."
        </p>

        <div className="grid grid-cols-2 gap-5">
          {/* What's working */}
          <div className="flex flex-col gap-2">
            <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#F5921E] mb-1">✓ What's Working</p>
            {[
              "Ranking page 1 for 'solar panel installers Cork Ireland' — strong local positioning",
              "Location pages for Dublin, Limerick, Wicklow & Cork — structural foundation in place",
              "Blog content targeting high-intent queries: costs, grants, panel numbers",
              "SEAI grant content attracting the right search intent at the right time",
              "Three dedicated calculators (residential, commercial, battery) — rare in this market",
            ].map((item) => (
              <div key={item} className="flex gap-2 items-start">
                <span className="text-[#F5921E] font-bold mt-0.5 text-[10px]">✓</span>
                <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>{item}</p>
              </div>
            ))}
          </div>

          {/* Where bleeding */}
          <div className="flex flex-col gap-2">
            <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#E8192C] mb-1">✗ Where You're Bleeding</p>
            {[
              "Blog posts all dated Oct 2025 — Google's freshness signal degrading right now",
              "AI-generated content patterns visible — thin content penalty risk",
              "No schema markup (FAQPage, LocalBusiness, Review) — invisible to rich snippets",
              "Zero location pages for Galway, Waterford, Kilkenny, Clare, Tipperary — 5 counties uncontested",
              "Battery storage, EV, Sigenergy/Aiko product terms — uncontested traffic you're not capturing",
              "No internal linking strategy — blog readers hit dead ends, not quote pages",
              "Webflow JS rendering may suppress full Google indexation — requires technical audit",
            ].map((item) => (
              <div key={item} className="flex gap-2 items-start">
                <span className="text-[#E8192C] font-bold mt-0.5 text-[10px]">✗</span>
                <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* County coverage chips */}
        <div className="border border-[#E2E5EA] p-4 bg-[#F8F8F8]">
          <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#0A0A0A] mb-3">
            Ireland County Coverage — Claimed vs Uncontested Opportunity
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {covered.map((c) => (
              <span key={c} className="px-2 py-1 text-white font-bold rounded-full" style={{ fontSize: '8px', background: '#F5921E' }}>{c}</span>
            ))}
            {uncovered.map((c) => (
              <span key={c} className="px-2 py-1 text-[#374151] font-medium rounded-full bg-[#E2E5EA]" style={{ fontSize: '8px' }}>{c}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F5921E] inline-block" />
              <span className="text-[#6B7280] font-medium" style={{ fontSize: '8px' }}>Covered (4)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E2E5EA] inline-block" />
              <span className="text-[#6B7280] font-medium" style={{ fontSize: '8px' }}>Uncontested — available (16+)</span>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "Your competitors aren't better than you. They've just claimed the territory you haven't arrived at yet. That changes quickly — but only if you move first."
          </p>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
