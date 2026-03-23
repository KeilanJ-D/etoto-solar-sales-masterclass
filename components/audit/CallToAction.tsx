import { PageLayout } from './PageLayout'

const steps = [
  { num: '1', title: '1pm Call Today', desc: 'We walk through this audit together, answer everything, and show you the system live' },
  { num: '2', title: 'Commercial Proposal', desc: 'Tailored plan, pricing, and projected outcomes sent within 24 hours of the call' },
  { num: '3', title: 'Onboarding', desc: "If it's a fit, we move fast. Week one infrastructure live within 7 days of signing" },
]

export default function CallToAction() {
  return (
    <PageLayout sectionNumber="09" sectionTitle="One Conversation Changes Everything">
      <div className="flex flex-col items-center justify-center flex-1 gap-8 py-8">
        {/* Hero text */}
        <div className="text-center max-w-xl">
          <p className="text-[#0A0A0A] font-semibold leading-relaxed" style={{ fontSize: '14px' }}>
            This audit is a fraction of what we see. On your call today at <span className="text-[#E8192C] font-bold">1pm</span>, we'll walk through the full ETOTO system live — including exactly how each of these gaps gets closed, the timeline, and what Solar Path looks like{' '}
            <span className="text-[#E8192C] font-bold">six months from now</span> with the right infrastructure behind it.
          </p>
        </div>

        {/* Three steps */}
        <div className="flex gap-6 w-full max-w-2xl">
          {steps.map((step) => (
            <div key={step.num} className="flex-1 text-center">
              <div className="w-12 h-12 bg-[#E8192C] text-white font-black text-xl flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <p className="text-[#0A0A0A] font-bold text-[11px] uppercase tracking-wider mb-2">{step.title}</p>
              <p className="text-[#6B7280] text-[10px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div className="text-center mt-4">
          <p className="text-[#0A0A0A] font-bold text-[13px] mb-1">Keilan James-Devereux</p>
          <p className="text-[#6B7280] text-[11px] mb-3">Co-Founder & CRO · ETOTO Media</p>
          <p className="text-[#E8192C] text-[11px] font-medium">etotomedia.com</p>
        </div>

        {/* Tagline */}
        <p className="text-[#E8192C] italic text-[11px] text-center">
          "The UK & Ireland's most data-driven growth agency for solar & renewables installers."
        </p>

        {/* Colour strip */}
        <div className="flex w-full h-2 mt-auto">
          <div className="flex-[5] bg-[#E8192C]" />
          <div className="flex-[2] bg-[#F5921E]" />
          <div className="flex-1 bg-[#1B6FE8]" />
        </div>

        {/* Confidential footer */}
        <p className="text-[#9CA3AF] text-[8px] uppercase tracking-widest text-center">
          Confidential — Prepared Exclusively for Solar Path — March 2026
        </p>
      </div>
    </PageLayout>
  )
}
