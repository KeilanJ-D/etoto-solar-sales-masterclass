import { PageHeader, PageFooter } from './PageShared'

export default function Page3Pipeline() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-6">
        {/* Section header */}
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>02</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            The Money Leaving Your Pipeline Every Single Month
          </h2>
        </div>

        {/* Lead copy */}
        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "Every month, qualified homeowners visit solarpath.ie, consider going solar, and leave without ever contacting you. Here's a conservative model of what that's worth — and what changes with the right infrastructure."
        </p>

        {/* Three metric cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Estimated Monthly Visitors', value: '~2,400', source: 'SEMrush / Ahrefs organic estimate' },
            { label: 'Current Est. Conversion Rate', value: '~0.8%', source: 'Industry avg — sites without CRO infrastructure' },
            { label: 'Estimated Monthly Leads', value: '~19', source: 'Avg €8,500 job · 30% close = ~€48,450/mo' },
          ].map((card) => (
            <div key={card.label} className="border-l-4 border-[#E8192C] pl-4 py-3 bg-[#F8F8F8] border border-[#E2E5EA]" style={{ borderLeft: '4px solid #E8192C' }}>
              <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#6B7280] mb-1">{card.label}</p>
              <p className="font-black text-[#0A0A0A] leading-none mb-1" style={{ fontSize: '28px' }}>{card.value}</p>
              <p className="text-[#6B7280] font-medium" style={{ fontSize: '8px' }}>{card.source}</p>
            </div>
          ))}
        </div>

        {/* Comparison block */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E2E5EA] p-4">
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#6B7280] mb-3">Today (0.8% CR)</p>
            <p className="font-black text-[#0A0A0A] mb-1" style={{ fontSize: '20px' }}>~19 leads/mo</p>
            <p className="font-bold text-[#6B7280]" style={{ fontSize: '13px' }}>~€48k pipeline/month</p>
          </div>
          <div className="border border-[#F5921E] p-4 bg-[#FFFBF5]">
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#F5921E] mb-3">With ETOTO Infrastructure (2.5% CR)</p>
            <p className="font-black text-[#0A0A0A] mb-1" style={{ fontSize: '20px' }}>~60 leads/mo</p>
            <p className="font-bold text-[#F5921E]" style={{ fontSize: '13px' }}>~€153k pipeline/month</p>
          </div>
        </div>

        {/* Gap callout */}
        <div className="bg-[#E8192C] p-5 text-white">
          <p className="font-black leading-none mb-2" style={{ fontSize: '26px' }}>+€104,550 / month left on the table.</p>
          <p className="font-normal leading-relaxed opacity-90" style={{ fontSize: '11px' }}>
            This is the gap between your current funnel and an optimised one — from the same traffic, not a single extra penny in ad spend.
          </p>
        </div>

        {/* Calculation boxes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E2E5EA] p-4 bg-[#F8F8F8]">
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#0A0A0A] mb-3">The Calculation</p>
            <div className="flex flex-col gap-1 text-[#374151]" style={{ fontSize: '10px' }}>
              <p>2,400 visitors × 2.5% CR = 60 leads</p>
              <p>60 leads × 30% close = 18 jobs/month</p>
              <p>18 jobs × avg €8,500 = €153,000 pipeline</p>
              <p className="mt-2 font-bold text-[#0A0A0A]">Current = ~€48,450 · Delta = <span className="text-[#E8192C]">+€104,550</span></p>
            </div>
          </div>
          <div className="border border-[#E2E5EA] p-4 bg-[#F8F8F8]">
            <p className="font-extrabold uppercase text-[8px] tracking-widest text-[#0A0A0A] mb-3">The Annual Picture</p>
            <div className="flex flex-col gap-1 text-[#374151]" style={{ fontSize: '10px' }}>
              <p>Monthly gap = €104,550</p>
              <p className="font-black text-[#0A0A0A] mt-2" style={{ fontSize: '18px' }}>Annual = €1,254,600</p>
              <p className="mt-2 italic text-[#6B7280]">That's the value of a properly built commercial engine vs a brochure website.</p>
            </div>
          </div>
        </div>

        <p className="text-center text-[#9CA3AF] italic" style={{ fontSize: '8px' }}>
          Conservative estimates based on publicly available data. Actual figures vary. The point stands.
        </p>
      </div>
      <PageFooter />
    </div>
  )
}
