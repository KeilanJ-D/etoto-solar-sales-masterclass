import { PageLayout } from './PageLayout'

const working = [
  "Ranking page 1 for 'solar panel installers Cork Ireland' — strong local positioning",
  "Location pages for Dublin, Limerick, Wicklow & Cork — structural foundation in place",
  "Blog content targeting high-intent queries: costs, grants, panel numbers",
  "SEAI grant content attracting the right search intent at the right time",
  "Three dedicated calculators (residential, commercial, battery) — rare in this market",
]

const bleeding = [
  "Blog posts all dated Oct 2025 — Google's freshness signal degrading right now",
  "AI-generated content patterns visible — thin content penalty risk",
  "No schema markup (FAQPage, LocalBusiness, Review) — invisible to rich snippets",
  "Zero location pages for Galway, Waterford, Kilkenny, Clare, Tipperary — 5 counties uncontested",
  "Battery storage, EV, Sigenergy/Aiko product terms — uncontested traffic you're not capturing",
  "No internal linking strategy — blog readers hit dead ends, not quote pages",
  "Webflow JS rendering may suppress full Google indexation — requires technical audit",
]

const covered = ['Cork', 'Dublin', 'Limerick', 'Wicklow']
const uncontested = ['Galway', 'Waterford', 'Kilkenny', 'Clare', 'Tipperary', 'Wexford', 'Kerry', 'Louth', 'Meath', 'Kildare', 'Mayo', 'Roscommon', 'Donegal', 'Sligo', 'Carlow', 'Laois']

export default function SEOAudit() {
  return (
    <PageLayout sectionNumber="03" sectionTitle="What Google Thinks of You">
      <div className="flex flex-col gap-6">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          Your SEO foundations are stronger than most Cork competitors. You're ranking page 1 for competitive terms and your site architecture is solid. The problem is the territory you're not claiming and the signals you're actively degrading.
        </p>

        {/* Two columns */}
        <div className="grid grid-cols-2 gap-5">
          {/* Working */}
          <div className="bg-[#F0FDF4] p-5">
            <p className="text-[#16A34A] font-bold uppercase text-[9px] tracking-widest mb-4 flex items-center gap-2">
              <span className="text-sm">✓</span> What's Working
            </p>
            <ul className="space-y-2">
              {working.map((item, i) => (
                <li key={i} className="text-[#374151] text-[10px] leading-relaxed flex gap-2">
                  <span className="text-[#16A34A] font-bold shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bleeding */}
          <div className="bg-[#FEF2F2] p-5">
            <p className="text-[#DC2626] font-bold uppercase text-[9px] tracking-widest mb-4 flex items-center gap-2">
              <span className="text-sm">✗</span> Where You're Bleeding
            </p>
            <ul className="space-y-2">
              {bleeding.map((item, i) => (
                <li key={i} className="text-[#374151] text-[10px] leading-relaxed flex gap-2">
                  <span className="text-[#DC2626] font-bold shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* County coverage */}
        <div className="bg-[#FAFAFA] p-5">
          <p className="text-[#0A0A0A] font-bold uppercase text-[9px] tracking-widest mb-4">Ireland County Coverage — Claimed vs Uncontested Opportunity</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {covered.map((c) => (
              <span key={c} className="bg-[#F5921E] text-white px-2.5 py-1 text-[9px] font-semibold">{c} ✓</span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {uncontested.map((c) => (
              <span key={c} className="bg-[#E5E7EB] text-[#6B7280] px-2.5 py-1 text-[9px]">{c}</span>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-[8px] text-[#6B7280]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#F5921E]" /> Covered (4)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-[#E5E7EB]" /> Uncontested — available (16+)</span>
          </div>
        </div>

        {/* Callout */}
        <div className="border-l-4 border-[#E8192C] pl-5 py-2 bg-white">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "Your competitors aren't better than you. They've just claimed the territory you haven't arrived at yet. That changes quickly — but only if you move first."
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
