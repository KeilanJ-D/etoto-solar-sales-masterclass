import { PageHeader, PageFooter } from './PageShared'

const brandCards = [
  {
    title: 'The Invisible Founder',
    body: "Ken's expertise, reputation, and story are nowhere on the site. In a high-trust, high-ticket purchase like solar — where homeowners invite a team onto their roof and spend €10,000+ — the founder IS the brand. A name in a review is not the same as a face with a story. This is the highest-leverage untapped asset on the site.",
  },
  {
    title: 'The Video Void',
    body: 'Solar Path has strong photography throughout the site — but not a single piece of video content. No installation walkthrough, no customer on camera, no founder explaining what makes Solar Path different. Customers who watch a video are 85% more likely to contact the business. The raw material — happy customers, visible installs, a quality team — already exists. It\'s just not captured.',
  },
  {
    title: 'The Premium Product Story — Half Told',
    body: "Sigenergy and Aiko both appear in the partner logo strip — genuinely impressive. But they're buried as small logos in a row of eleven at the bottom of the homepage. Neither brand has a dedicated page, a case study, or a performance comparison. You're stocking Ferrari and selling it from a forecourt. These brands command premium prices and deserve their own story.",
  },
  {
    title: 'Social Proof — Present but Passive',
    body: "Google reviews are displayed on-site — ahead of most competitors. But with 30+ reviews and no velocity strategy, the count is modest. Reviews are static text with no star ratings in Google search results (no schema markup), no video testimonials, and Trustpilot reviews exist but aren't prominently featured. Trust signals are there but they're not doing enough work.",
  },
]

export default function Page6Brand() {
  return (
    <div className="w-full bg-white flex flex-col" style={{ minHeight: '297mm' }}>
      <PageHeader />
      <div className="flex-1 px-10 py-8 flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <span className="font-black text-[#E8192C] leading-none" style={{ fontSize: '44px' }}>05</span>
          <h2 className="font-black uppercase tracking-widest text-[#0A0A0A]" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
            You Look the Part. Now Start Acting It.
          </h2>
        </div>

        <p className="text-[#374151] leading-relaxed" style={{ fontSize: '11px' }}>
          "Solar Path has a stronger visual identity than most Cork competitors. That's not the problem. The problem is that no one who lands on the site knows who Ken is, why Solar Path exists, or why they should trust you over the 20+ other installers competing for the same homeowner."
        </p>

        <div className="flex flex-col gap-4 flex-1">
          {brandCards.map((card) => (
            <div key={card.title} className="border-l-4 border-[#E8192C] pl-4 py-3 bg-[#F8F8F8]">
              <p className="font-extrabold uppercase text-[9px] tracking-widest text-[#0A0A0A] mb-2">{card.title}</p>
              <p className="text-[#374151] leading-relaxed" style={{ fontSize: '10px' }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="border-l-4 border-[#E8192C] pl-4 py-2">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "Brand isn't about looking good — it's about giving someone a reason to choose you specifically. The raw material is all there. It just needs to be told."
          </p>
        </div>
      </div>
      <PageFooter />
    </div>
  )
}
