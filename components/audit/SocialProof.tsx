import { PageLayout } from './PageLayout'

const stats = [
  { value: '£175M+', label: 'In attributed sales generated for solar & renewables installers across the UK & Ireland' },
  { value: '200+', label: 'Active installer clients currently under management across Meta and Google campaigns' },
  { value: '#1', label: 'The most data-driven, most networked growth agency operating in UK & Ireland solar' },
]

const tableData = [
  { metric: 'Campaign Name', etoto: 'Domestic Lead Generation', comp: 'JMM Solar & Battery Lead Gen' },
  { metric: 'Leads Generated', etoto: '1,315', comp: '734', highlight: true },
  { metric: 'Cost Per Lead', etoto: '£16.53', comp: '£29.64', highlight: true },
  { metric: 'Reach', etoto: '145,674', comp: '199,941' },
  { metric: 'Impressions', etoto: '877,205', comp: '840,821' },
  { metric: 'Total Spend', etoto: '£21,730', comp: '£21,753' },
  { metric: 'Status', etoto: 'Active ✅', comp: 'Active ✅' },
]

export default function SocialProof() {
  return (
    <PageLayout sectionNumber="08" sectionTitle="We've Done This Before. At Scale.">
      <div className="flex flex-col gap-5">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed" style={{ fontSize: '11px' }}>
          Numbers don't lie. Here's what obsessively optimising the commercial engine for 200+ solar installers across the UK & Ireland looks like in practice.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.value} className="bg-white border border-[#E5E7EB] p-4" style={{ borderTop: '4px solid #E8192C' }}>
              <p className="text-[#0A0A0A] font-black text-3xl leading-none mb-2">{s.value}</p>
              <p className="text-[#6B7280] text-[9px] leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Us vs Them dark panel */}
        <div className="bg-[#0A0A0A] p-5" style={{ borderTop: '4px solid #E8192C' }}>
          <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-2">Real Numbers. Real Campaigns. Real Results.</p>
          <p className="text-[#9CA3AF] text-[9px] mb-4">
            Live data pulled directly from Meta Ads Manager. Two solar campaigns. Same platform. Same period. The difference is who's running them.
          </p>

          {/* Table */}
          <table className="w-full text-[9px] mb-4">
            <thead>
              <tr className="border-b border-[#374151]">
                <th className="text-left text-[#6B7280] font-bold uppercase text-[8px] tracking-wider pb-2 pr-4">Metric</th>
                <th className="text-left text-[#E8192C] font-bold uppercase text-[8px] tracking-wider pb-2 pr-4 border-b-2 border-[#E8192C]">ETOTO-Managed</th>
                <th className="text-left text-[#6B7280] font-bold uppercase text-[8px] tracking-wider pb-2">Competitor</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.metric} className="border-b border-[#1F2937]">
                  <td className="py-2 text-[#9CA3AF] pr-4">{row.metric}</td>
                  <td className={`py-2 font-bold pr-4 ${row.highlight ? 'text-white' : 'text-[#D1D5DB]'}`}>{row.etoto}</td>
                  <td className="py-2 text-[#6B7280]">{row.comp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-[#E8192C] font-black text-center text-[12px] mb-2">
            Same budget. Same platform. ETOTO delivered 79% more leads at 44% lower cost per lead.
          </p>
          <p className="text-[#4B5563] text-center text-[7px] italic">
            Source: Meta Ads Manager. Live campaign data. Competitor name redacted.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              text: "ETOTO talk a big game on the sales call — but you'll find out why. Before they took over my campaign I was getting Facebook leads for £21.75. After 7 days working with them, my cost per lead was down to £3.85. I generated 431 leads in under 30 days.",
              name: '[Reviewer Name]',
              attr: 'Google Review · Solar & Renewables Installer, UK',
            },
            {
              text: "They have delivered more leads than I can currently deal with, which is a nice problem to have. We've realistically increased our weekly quotes to at least one or two a day and we now book much further out.",
              name: 'Aid',
              attr: 'Google Review · Solar Installer, UK',
            },
          ].map((q) => (
            <div key={q.name} className="bg-white border border-[#E5E7EB] p-4 relative overflow-hidden">
              <span className="absolute top-1 left-2 text-[#E8192C] font-black opacity-10" style={{ fontSize: '56px' }}>"</span>
              <div className="relative z-10">
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xs">★</span>)}
                </div>
                <p className="text-[#374151] italic text-[9px] leading-relaxed mb-3">"{q.text}"</p>
                <p className="text-[#0A0A0A] font-bold text-[9px]">{q.name}</p>
                <p className="text-[#9CA3AF] text-[8px]">{q.attr}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Third testimonial */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <div className="flex gap-0.5 mb-1">
            {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xs">★</span>)}
          </div>
          <p className="text-[#374151] italic text-[9px] leading-relaxed mb-1">
            "Over 120 high quality leads since May. The customer care is 5 star with the team on hand at a moment's notice. I would not hesitate to recommend ETOTO to any company who is ready for serious growth."
          </p>
          <p className="text-[#0A0A0A] font-bold text-[8px]">[Reviewer Name] · Google Review · Solar & Renewables Installer, UK</p>
        </div>

        {/* Who we work with */}
        <div className="bg-[#FAFAFA] border-l-4 border-[#F5921E] pl-4 py-3">
          <p className="text-[#F5921E] font-bold uppercase text-[8px] tracking-widest mb-1">Who We Work With</p>
          <p className="text-[#374151] text-[10px] leading-relaxed">
            We don't work with everyone. We work with the solar installers who understand that growth is a system, not a campaign — and who want to build something that runs without them having to chase every lead manually. We think Solar Path might be one of those businesses.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
