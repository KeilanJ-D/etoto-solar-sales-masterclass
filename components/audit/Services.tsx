import { PageLayout } from './PageLayout'

const services = [
  {
    num: '01',
    title: 'Interactive Lead Funnel',
    tag: 'SolaFlow Technology',
    desc: 'Replace your static contact form with a personalised, multi-step qualification funnel that pre-screens homeowners by property type, energy usage, and budget — delivering a tailored estimate with email capture built in.',
    result: 'Expected outcome: 3–5× current lead volume. Same traffic. No extra ad spend.',
  },
  {
    num: '02',
    title: 'CRM & Pipeline Infrastructure',
    tag: 'Sub-5 Min Response',
    desc: 'Every lead captured, scored, and followed up automatically within minutes — not hours. SMS workflows, email sequences, lead routing, and stage management.',
    result: 'Target: sub-5-minute automated first response, around the clock.',
  },
  {
    num: '03',
    title: 'Meta Ad Campaigns',
    tag: 'Paid Social',
    desc: 'Targeted, conversion-optimised campaigns across Cork, Dublin, and key Irish counties — with dedicated landing pages, full retargeting audiences, and creative built specifically for the Irish solar buyer.',
    result: 'We manage paid campaigns for 200+ solar installers. We know the creative that converts.',
  },
  {
    num: '04',
    title: 'Video Content Production',
    tag: 'April Ireland Visit',
    desc: "We're planning an Ireland visit in April. For the clients we're working with, we'll be on the ground — shooting customer testimonials, installation walkthroughs, and founder-led content for Ken.",
    result: 'April Ireland trip already planned. Shooting for onboarded clients.',
  },
  {
    num: '05',
    title: 'SEO Content & Technical Authority',
    tag: 'Organic Growth',
    desc: 'Replace thin, AI-generated content with authoritative, Ireland-specific articles built to rank and built to convert. Location pages for every major county. Schema markup across the site.',
    result: 'Target: page 1 ownership across 10+ Irish county terms within 6 months.',
  },
  {
    num: '06',
    title: 'Conversion Rate Optimisation',
    tag: 'CRO Infrastructure',
    desc: 'Exit-intent capture on every page. Sticky CTA bars. WhatsApp chat widget. Google Reviews integration with schema markup. Video testimonials embedded site-wide.',
    result: 'Target: 2.5%+ site-wide CR, up from estimated 0.8% today.',
  },
]

export default function Services() {
  return (
    <PageLayout sectionNumber="07" sectionTitle="What Changes When You Work With Us">
      <div className="flex flex-col gap-5">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          We don't run ads and send you a Friday report. We build commercial growth engines — the full stack, from first click to signed contract — for solar and renewables installers across the UK & Ireland.
        </p>

        {/* Service cards grid */}
        <div className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.num} className="bg-white border border-[#E5E7EB] p-4 flex gap-4">
              <span className="text-[#E8192C] font-black text-2xl leading-none shrink-0">{s.num}</span>
              <div className="flex-1">
                <p className="text-[#0A0A0A] font-bold text-[10px] uppercase tracking-wider mb-1">{s.title}</p>
                <p className="text-[#4B5563] text-[9px] leading-relaxed mb-2">{s.desc}</p>
                <p className="text-[#6B7280] text-[8px] italic mb-2">{s.result}</p>
                <span className="bg-[#E8192C] text-white px-2 py-0.5 text-[7px] font-semibold uppercase">{s.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="bg-[#0A0A0A] p-5 flex items-center justify-between">
          <p className="text-white text-[10px] leading-relaxed max-w-lg">
            This isn't six separate services. It's one interconnected system — and every part compounds the others. The funnel feeds the CRM. The CRM feeds the ads. The content feeds the SEO. The video feeds everything.
          </p>
          <div className="border-l-4 border-[#E8192C] pl-4">
            <p className="text-[#E8192C] font-bold uppercase text-[9px] tracking-widest">The Full ETOTO System</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
