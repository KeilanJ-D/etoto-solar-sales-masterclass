import { PageHeader } from './PageShared'

export default function Page10CTA() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-12 flex flex-col items-center justify-center gap-8 text-center">
        {/* Section number + title */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>09</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '16px', letterSpacing: '0.12em' }}>
            One Conversation Changes Everything
          </h2>
        </div>

        {/* Hero text */}
        <p className="text-[#374151] leading-relaxed max-w-xl" style={{ fontSize: '13px' }}>
          "This audit is a fraction of what we see. On your call today at{' '}
          <span className="text-[#E8192C] font-bold">1pm</span>, we'll walk through the full ETOTO system live — including exactly how each of these gaps gets closed, the timeline, and what Solar Path looks like{' '}
          <span className="text-[#E8192C] font-bold">six months from now</span> with the right infrastructure behind it."
        </p>

        {/* 3-step process */}
        <div className="flex gap-6 justify-center">
          {[
            { n: '1', title: '1pm Call Today', desc: 'We walk through this audit together, answer everything, and show you the system live' },
            { n: '2', title: 'Commercial Proposal', desc: 'Tailored plan, pricing, and projected outcomes sent within 24 hours of the call' },
            { n: '3', title: 'Onboarding', desc: 'If it\'s a fit, we move fast. Week one infrastructure live within 7 days of signing' },
          ].map((step) => (
            <div key={step.n} className="flex flex-col items-center gap-3 max-w-[180px]">
              <div
                className="w-10 h-10 rounded-full bg-[#E8192C] flex items-center justify-center text-white font-black"
                style={{ fontSize: '16px' }}
              >
                {step.n}
              </div>
              <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#0A0A0A]">{step.title}</p>
              <p className="text-[#6B7280] leading-relaxed" style={{ fontSize: '9.5px' }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div className="flex flex-col items-center gap-1 mt-4">
          <p className="font-black text-[#0A0A0A] text-base">Keilan James-Devereux</p>
          <p className="text-[#6B7280] font-medium" style={{ fontSize: '11px' }}>Co-Founder &amp; CRO | ETOTO Media</p>
          <p className="text-[#E8192C] font-medium" style={{ fontSize: '11px' }}>etotomedia.com</p>
        </div>

        {/* Tagline */}
        <p className="text-[#E8192C] italic font-light" style={{ fontSize: '12px' }}>
          "The UK &amp; Ireland's most data-driven growth agency for solar &amp; renewables installers."
        </p>
      </div>

      {/* Colour strip */}
      <div className="flex" style={{ height: '6px' }}>
        <div className="flex-[5] bg-[#E8192C]" />
        <div className="flex-[2] bg-[#F5921E]" />
        <div className="flex-[1] bg-[#1B6FE8]" />
      </div>

      <div className="py-3 text-center">
        <p className="text-[#9CA3AF] uppercase tracking-widest font-medium" style={{ fontSize: '7.5px' }}>
          Confidential — Prepared Exclusively for Solar Path — March 2026
        </p>
      </div>
    </div>
  )
}
