import { PageLayout } from './PageLayout'

export default function PipelineMoney() {
  return (
    <PageLayout sectionNumber="02" sectionTitle="The Money Leaving Your Pipeline Every Single Month">
      <div className="flex flex-col gap-6">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          Every month, qualified homeowners visit solarpath.ie, consider going solar, and leave without ever contacting you. Here's a conservative model of what that's worth — and what changes with the right infrastructure.
        </p>

        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="border-l-4 border-[#E8192C] pl-4 py-2">
            <p className="text-[#9CA3AF] text-[8px] uppercase tracking-wider font-semibold mb-1">Est. Monthly Visitors</p>
            <p className="text-[#0A0A0A] font-black text-3xl leading-none mb-1">~2,400</p>
            <p className="text-[#6B7280] text-[9px]">SEMrush / Ahrefs organic estimate</p>
          </div>
          <div className="border-l-4 border-[#E8192C] pl-4 py-2">
            <p className="text-[#9CA3AF] text-[8px] uppercase tracking-wider font-semibold mb-1">Current Conversion Rate</p>
            <p className="text-[#0A0A0A] font-black text-3xl leading-none mb-1">~0.8%</p>
            <p className="text-[#6B7280] text-[9px]">Industry avg — sites without CRO</p>
          </div>
          <div className="border-l-4 border-[#E8192C] pl-4 py-2">
            <p className="text-[#9CA3AF] text-[8px] uppercase tracking-wider font-semibold mb-1">Est. Monthly Leads</p>
            <p className="text-[#0A0A0A] font-black text-3xl leading-none mb-1">~19</p>
            <p className="text-[#6B7280] text-[9px]">Avg €8,500 job · 30% close = ~€48k/mo</p>
          </div>
        </div>

        {/* Comparison blocks */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E5E7EB] p-5">
            <p className="text-[#6B7280] text-[9px] uppercase tracking-wider font-bold mb-3">Today (0.8% CR)</p>
            <p className="text-[#0A0A0A] font-black text-2xl leading-none mb-1">~19 leads</p>
            <p className="text-[#6B7280] text-[11px]">~€48k pipeline/month</p>
          </div>
          <div className="border-2 border-[#F5921E] p-5 bg-[#FFFBF5]">
            <p className="text-[#F5921E] text-[9px] uppercase tracking-wider font-bold mb-3">With ETOTO Infrastructure (2.5% CR)</p>
            <p className="text-[#0A0A0A] font-black text-2xl leading-none mb-1">~60 leads</p>
            <p className="text-[#374151] text-[11px] font-medium">~€153k pipeline/month</p>
          </div>
        </div>

        {/* Gap callout */}
        <div className="bg-[#E8192C] p-6">
          <p className="text-white font-black text-center leading-none mb-2" style={{ fontSize: '28px' }}>+€104,550 / month left on the table.</p>
          <p className="text-white/80 text-center text-[11px]">
            This is the gap between your current funnel and an optimised one — from the same traffic, not a single extra penny in ad spend.
          </p>
        </div>

        {/* Calculation boxes */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FAFAFA] p-5">
            <p className="text-[#0A0A0A] font-bold uppercase text-[9px] tracking-wider mb-3">The Calculation</p>
            <div className="space-y-1 text-[10px] text-[#374151]">
              <p>2,400 visitors × 2.5% CR = 60 leads</p>
              <p>60 leads × 30% close = 18 jobs/month</p>
              <p>18 jobs × avg €8,500 = €153,000 pipeline</p>
              <p className="font-bold text-[#0A0A0A] pt-1">Current = ~€48,450 · Delta = <span className="text-[#E8192C]">+€104,550</span></p>
            </div>
          </div>
          <div className="bg-[#FAFAFA] p-5">
            <p className="text-[#0A0A0A] font-bold uppercase text-[9px] tracking-wider mb-3">The Annual Picture</p>
            <p className="text-[#374151] text-[10px] mb-2">Monthly gap = €104,550</p>
            <p className="text-[#0A0A0A] font-black text-2xl leading-none mb-2">€1,254,600</p>
            <p className="text-[#6B7280] text-[9px] italic">That's the value of a properly built commercial engine vs a brochure website.</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[#9CA3AF] text-center italic text-[8px]">
          Conservative estimates based on publicly available data. Actual figures vary. The point stands.
        </p>
      </div>
    </PageLayout>
  )
}
