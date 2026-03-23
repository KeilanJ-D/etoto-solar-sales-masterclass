import { PageHeader, PageFooter } from './PageShared'

export default function Page9Proof() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>08</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            We've Done This Before. At Scale.
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "Numbers don't lie. Here's what obsessively optimising the commercial engine for 200+ solar installers across the UK &amp; Ireland looks like in practice."
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { stat: '£175M+', desc: 'In attributed sales generated for solar & renewables installers across the UK & Ireland' },
            { stat: '200+', desc: 'Active installer clients currently under management across Meta and Google campaigns' },
            { stat: '#1', desc: 'The most data-driven, most networked growth agency operating in UK & Ireland solar' },
          ].map((s) => (
            <div key={s.stat} className="border border-[#E2E5EA] p-4" style={{ borderTop: '4px solid #E8192C' }}>
              <p className="font-black text-[#0A0A0A] leading-none mb-2" style={{ fontSize: '32px' }}>{s.stat}</p>
              <p className="text-[#6B7280] leading-relaxed" style={{ fontSize: '10px' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Us vs Them dark panel */}
        <div className="bg-[#0A0A0A] p-5 flex flex-col gap-4" style={{ borderTop: '4px solid #E8192C' }}>
          <p className="text-white font-extrabold uppercase tracking-widest" style={{ fontSize: '11px' }}>
            Real Numbers. Real Campaigns. Real Results.
          </p>
          <p className="text-[#9CA3AF] leading-relaxed" style={{ fontSize: '9px' }}>
            Live data pulled directly from Meta Ads Manager. Two solar campaigns. Same platform. Same period. The difference is who's running them.
          </p>

          {/* Comparison table */}
          <table className="w-full border-collapse" style={{ fontSize: '9.5px' }}>
            <thead>
              <tr>
                <th className="text-left text-[#6B7280] font-extrabold uppercase text-[8px] tracking-widest pb-2 border-b border-[#374151] pr-4">Metric</th>
                <th className="text-left pb-2 border-b border-[#E8192C] pr-4" style={{ color: '#E8192C' }}>
                  <span className="font-extrabold uppercase text-[8px] tracking-widest">ETOTO-Managed</span>
                </th>
                <th className="text-left text-[#6B7280] font-extrabold uppercase text-[8px] tracking-widest pb-2 border-b border-[#374151]">Competitor Campaign</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Campaign Name', etoto: 'Domestic Lead Generation', comp: 'JMM Solar & Battery Lead Gen' },
                { metric: 'Leads Generated', etoto: '1,315', comp: '734', highlight: true },
                { metric: 'Cost Per Lead', etoto: '£16.53', comp: '£29.64', highlight: true },
                { metric: 'Reach', etoto: '145,674', comp: '199,941' },
                { metric: 'Impressions', etoto: '877,205', comp: '840,821' },
                { metric: 'Total Spend', etoto: '£21,730', comp: '£21,753' },
                { metric: 'Status', etoto: 'Active ✅', comp: 'Active ✅' },
              ].map((row) => (
                <tr key={row.metric} className="border-b border-[#1F2937]">
                  <td className="py-1.5 text-[#9CA3AF] pr-4">{row.metric}</td>
                  <td className={`py-1.5 font-bold pr-4 ${row.highlight ? 'text-white' : 'text-[#D1D5DB]'}`}>{row.etoto}</td>
                  <td className="py-1.5 text-[#6B7280]">{row.comp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-[#E8192C] font-black text-center leading-tight" style={{ fontSize: '12px' }}>
            Same budget. Same platform. ETOTO delivered 79% more leads at 44% lower cost per lead.
          </p>
          <p className="text-[#4B5563] text-center italic" style={{ fontSize: '7.5px' }}>
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
              text: "They have delivered more leads than I can currently deal with, which is a nice problem to have. We've realistically increased our weekly quotes to at least one or two a day and we now book much further out. Genuinely a great team.",
              name: 'Aid',
              attr: 'Google Review · Solar Installer, UK',
            },
          ].map((q) => (
            <div key={q.name} className="border border-[#E2E5EA] p-4 bg-white relative overflow-hidden">
              <span className="absolute top-2 left-3 text-[#E8192C] font-black leading-none" style={{ fontSize: '48px', opacity: 0.12 }}>"</span>
              <div className="flex gap-0.5 mb-2 relative z-10">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
              </div>
              <p className="text-[#374151] italic leading-relaxed mb-3 relative z-10" style={{ fontSize: '9.5px' }}>"{q.text}"</p>
              <p className="font-bold text-[#0A0A0A] relative z-10" style={{ fontSize: '9px' }}>{q.name}</p>
              <p className="text-[#9CA3AF]" style={{ fontSize: '8px' }}>{q.attr}</p>
            </div>
          ))}
        </div>

        {/* Third testimonial inline */}
        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <div className="flex gap-0.5 mb-1">
            {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
          </div>
          <p className="text-[#374151] italic leading-relaxed mb-1" style={{ fontSize: '9.5px' }}>
            "Over 120 high quality leads since May. The customer care is 5 star with the team on hand at a moment's notice. I would not hesitate to recommend ETOTO to any company who is ready for serious growth."
          </p>
          <p className="font-bold text-[#0A0A0A]" style={{ fontSize: '9px' }}>[Reviewer Name] · Google Review · Solar & Renewables Installer, UK</p>
        </div>

        {/* Who we work with */}
        <div className="border-l-4 border-[#F5921E] pl-4 py-2 bg-[#F8F8F8]">
          <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#F5921E] mb-1">Who We Work With</p>
          <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>
            "We don't work with everyone. We work with the solar installers who understand that growth is a system, not a campaign — and who want to build something that runs without them having to chase every lead manually. We think Solar Path might be one of those businesses."
          </p>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
