import { PageLayout } from './PageLayout'

const brandCards = [
  {
    title: 'The Invisible Founder',
    content: "Ken's expertise, reputation, and story are nowhere on the site. In a high-trust, high-ticket purchase like solar — where homeowners invite a team onto their roof and spend €10,000+ — the founder IS the brand. A name in a review is not the same as a face with a story. This is the highest-leverage untapped asset on the site.",
  },
  {
    title: 'The Video Void',
    content: "Solar Path has strong photography throughout the site — but not a single piece of video content. No installation walkthrough, no customer on camera, no founder explaining what makes Solar Path different. Customers who watch a video are 85% more likely to contact the business. The raw material — happy customers, visible installs, a quality team — already exists. It's just not captured.",
  },
  {
    title: 'The Premium Product Story — Half Told',
    content: "Sigenergy and Aiko both appear in the partner logo strip — genuinely impressive. But they're buried as small logos in a row of eleven at the bottom of the homepage. Neither brand has a dedicated page, a case study, or a performance comparison. You're stocking Ferrari and selling it from a forecourt. These brands command premium prices and deserve their own story.",
  },
  {
    title: 'Social Proof — Present But Passive',
    content: "Google reviews are displayed on-site — ahead of most competitors. But with 30+ reviews and no velocity strategy, the count is modest. Reviews are static text with no star ratings in Google search results (no schema markup), no video testimonials, and Trustpilot reviews exist but aren't prominently featured. Trust signals are there but they're not doing enough work.",
  },
]

export default function BrandAudit() {
  return (
    <PageLayout sectionNumber="05" sectionTitle="You Look the Part. Now Start Acting It.">
      <div className="flex flex-col gap-6">
        {/* Lead copy */}
        <p className="text-[#4B5563] leading-relaxed max-w-2xl" style={{ fontSize: '11px' }}>
          Solar Path has a stronger visual identity than most Cork competitors. That's not the problem. The problem is that no one who lands on the site knows who Ken is, why Solar Path exists, or why they should trust you over the 20+ other installers competing for the same homeowner.
        </p>

        {/* Brand cards */}
        <div className="space-y-4">
          {brandCards.map((card) => (
            <div key={card.title} className="border-l-4 border-[#E8192C] bg-white pl-5 pr-6 py-4">
              <p className="text-[#0A0A0A] font-bold uppercase text-[10px] tracking-wider mb-2">{card.title}</p>
              <p className="text-[#4B5563] leading-relaxed" style={{ fontSize: '10px' }}>{card.content}</p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="bg-[#FAFAFA] p-5 border-l-4 border-[#F5921E]">
          <p className="text-[#374151] italic leading-relaxed" style={{ fontSize: '11px' }}>
            "Brand isn't about looking good — it's about giving someone a reason to choose you specifically. The raw material is all there. It just needs to be told."
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
