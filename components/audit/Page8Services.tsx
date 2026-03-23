import { PageHeader, PageFooter } from './PageShared'

const services = [
  {
    num: '01',
    title: 'Interactive Lead Funnel',
    tag: 'SolaFlow Technology',
    body: 'Replace your static contact form with a personalised, multi-step qualification funnel that pre-screens homeowners by property type, energy usage, and budget — delivering a tailored estimate with email capture built in.',
    result: 'Expected outcome: 3–5× current lead volume. Same traffic. No extra ad spend.',
  },
  {
    num: '02',
    title: 'CRM & Pipeline Infrastructure',
    tag: 'Sub-5 Min Response',
    body: 'Every lead captured, scored, and followed up automatically within minutes — not hours. SMS workflows, email sequences, lead routing, and stage management. Every enquiry gets a response in under 5 minutes, 24 hours a day.',
    result: 'Target: sub-5-minute automated first response, around the clock.',
  },
  {
    num: '03',
    title: 'Meta Ad Campaigns',
    tag: 'Paid Social',
    body: 'Targeted, conversion-optimised campaigns across Cork, Dublin, and key Irish counties — with dedicated landing pages, full retargeting audiences, and creative built specifically for the Irish solar buyer. Not boosted posts.',
    result: 'We manage paid campaigns for 200+ solar installers. We know the creative that converts.',
  },
  {
    num: '04',
    title: 'Video Content Production',
    tag: 'April Ireland Visit',
    body: "We're planning an Ireland visit in April. For the clients we're working with, we'll be on the ground — shooting customer testimonials, installation walkthroughs, and founder-led content for Ken. Video is the highest-converting trust asset in home improvement.",
    result: 'April Ireland trip already planned. Shooting for onboarded clients.',
  },
  {
    num: '05',
    title: 'SEO Content & Technical Authority',
    tag: 'Organic Growth',
    body: 'Replace thin, AI-generated content with authoritative, Ireland-specific articles built to rank and built to convert. Location pages for every major county. Schema markup across the site. A content calendar targeting keywords your competitors haven\'t claimed.',
    result: 'Target: page 1 ownership across 10+ Irish county terms within 6 months.',
  },
  {
    num: '06',
    title: 'Conversion Rate Optimisation',
    tag: 'CRO Infrastructure',
    body: 'Exit-intent capture on every page. Sticky CTA bars. WhatsApp chat widget. Google Reviews integration with schema markup. Video testimonials embedded site-wide. Social proof at every scroll depth. No dead ends.',
    result: 'Target: 2.5%+ site-wide CR, up from estimated 0.8% today.',
  },
]

export default function Page8Services() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>07</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            What Changes When You Work With Us
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "We don't run ads and send you a Friday report. We build commercial growth engines — the full stack, from first click to signed contract — for solar and renewables installers across the UK &amp; Ireland. Here's exactly what that means for Solar Path."
        </p>

        <div className="grid grid-cols-2 gap-4 flex-1">
          {services.map((s) => (
            <div key={s.num} className="border border-[#E2E5EA] flex flex-col">
              <div className="p-4 flex gap-3 flex-1">
                <span className="font-black text-[#E8192C] leading-none shrink-0" style={{ fontSize: '22px' }}>{s.num}</span>
                <div className="flex flex-col gap-1.5">
                  <p className="font-extrabold uppercase text-[9.5px] tracking-wide text-[#0A0A0A]">{s.title}</p>
                  <p className="text-[#374151] leading-relaxed" style={{ fontSize: '9.5px' }}>{s.body}</p>
                  <p className="text-[#6B7280] italic" style={{ fontSize: '9px' }}>{s.result}</p>
                </div>
              </div>
              <div className="px-4 pb-3">
                <span className="bg-[#E8192C] text-white font-bold rounded-full px-2.5 py-1" style={{ fontSize: '7.5px' }}>{s.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="bg-[#0A0A0A] p-5 flex items-center justify-between gap-6">
          <p className="text-white leading-relaxed flex-1" style={{ fontSize: '10px' }}>
            "This isn't six separate services. It's one interconnected system — and every part compounds the others. The funnel feeds the CRM. The CRM feeds the ads. The content feeds the SEO. The video feeds everything."
          </p>
          <div className="border-l-4 border-[#E8192C] pl-4 shrink-0">
            <p className="text-[#E8192C] font-black uppercase text-[9px] tracking-widest">The Full ETOTO System</p>
          </div>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
