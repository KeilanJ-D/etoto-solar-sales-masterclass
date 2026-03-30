// lib/social-proof-data.ts
// ============================================
// Social proof data for the masterclass site.
// All data is real. All numbers are verified.
// Keilan updates this file when new testimonials arrive.
// ============================================


// ============================================
// HEADLINE STATS (StatsBanner component)
// ============================================

export const stats = [
  { value: "200+", label: "UK Solar Installers" },
  { value: "£175M+", label: "Attributed Sales" },
  { value: "67", label: "Sales in One Month (Halo)" },
  { value: "£450", label: "CPA (vs £1,200 Previous Agency)" },
]


// ============================================
// VIDEO TESTIMONIALS (VideoTestimonial component)
// ============================================
// These are the heavy hitters. Each one has a real client
// on camera with verifiable results.

export const videoTestimonials = [
  {
    id: 'halo',
    name: 'Matt',
    company: 'Halo Renewables',
    quote: "We did 67 sales in one month. ETOTO transformed our entire operation.",
    stat: '67 sales in 1 month',
    videoUrl: 'https://www.youtube.com/embed/cIuNH45hxVg?si=3WR_UO-mo06R2zgM',
    featured: true, // Use as the hero video testimonial
  },
  {
    id: 'evlm',
    name: 'Lloyd',
    company: 'EVLM Renewables',
    quote: "We went from 4 installs a month to 4-5 a week. ETOTO didn't just bring leads — they changed how we sell.",
    stat: '4/month → 4-5/week',
    videoUrl: 'https://www.youtube.com/embed/ZcsAfN_A8Mo',
    isVertical: true, // Portrait video — needs different aspect ratio
  },
  {
    id: 'ab-renewables',
    name: 'AB Renewables',
    company: 'AB Renewables',
    quote: "£4 million in revenue working with ETOTO. The leads and the system together just work.",
    stat: '£4M in revenue',
    videoUrl: 'https://www.youtube.com/embed/ipBXG6yk5KA?si=TUEczok451_krB_T',
  },
  {
    id: 'jem-energy',
    name: 'JEM Energy',
    company: 'JEM Energy',
    quote: "ETOTO's first ever solar client. Grew with ETOTO and was acquired by 21° Energy for multi-seven figures.",
    stat: 'Acquired for multi-7 figures',
    videoUrl: 'https://www.youtube.com/embed/TmYby-YVlOA?si=KwEdredOSiWvWX_x',
  },
  {
    id: 'genbatt',
    name: 'Genbatt',
    company: 'Genbatt',
    quote: "Built a 20MW commercial solar pipeline with ETOTO's lead generation and business development.",
    stat: '20MW commercial pipeline',
    videoUrl: 'https://www.youtube.com/embed/PnPr8OfpfFA?si=kuxgAALUpU9Hr1kC',
  },
  {
    id: 'carter-electrical',
    name: 'Carter Electrical',
    company: 'Carter Electrical',
    quote: "ETOTO helped us build the business development side from scratch. The leads keep coming.",
    stat: 'Business development transformation',
    videoUrl: 'https://www.youtube.com/embed/hOU1w05aoKk?si=4J-OVvNWWpq0dfRx',
  },
  {
    id: 'uk-renewables',
    name: 'UK Renewables',
    company: 'UK Renewables',
    quote: "Went from a one-man band to a proper SME. Averaging 8 heat pumps a month, 2 teams running, taking on a 3rd.",
    stat: '1-man band → 3 teams',
    videoUrl: 'https://www.youtube.com/embed/8AoOTz4S4O8',
    isVertical: true, // Portrait video
  },
]


// ============================================
// TEXT TESTIMONIALS (TestimonialCard component)
// ============================================
// For clients without video, or as quick-hit proof strips.

export const testimonials = [
  {
    quote: "We did 67 sales in one month. ETOTO transformed our entire operation.",
    name: "Matt",
    company: "Halo Renewables",
    stat: "67 sales in 1 month",
  },
  {
    quote: "We went from 4 installs a month to 4-5 a week. ETOTO didn't just bring leads — they changed how we sell.",
    name: "Lloyd",
    company: "EVLM Renewables",
    stat: "4/month → 4-5/week",
  },
  {
    quote: "Closed 2 deals worth £25,000 in the first week of using ETOTO's sales training. The formula just works.",
    name: "Tom",
    company: "YEERS — Yorkshire Energy",
    stat: "£25K in week one",
  },
  {
    quote: "Phil's now booking 5 weeks out. We can't install fast enough — that's the kind of problem you want to have.",
    name: "Phil",
    company: "MCJ Solar",
    stat: "Booked 5 weeks ahead",
  },
  {
    quote: "7 appointments booked per week on average, closing 50% into sales. ETOTO's appointment setting has completely changed our pipeline.",
    name: "Alltech Solar",
    company: "Alltech, Scotland",
    stat: "7 appts/week, 50% close rate",
  },
  {
    quote: "£4 million in revenue working with ETOTO. The leads and the system together just work.",
    name: "AB Renewables",
    company: "AB Renewables",
    stat: "£4M in revenue",
  },
  {
    quote: "Grew from a one-man band to a proper SME — 2 teams running, taking on a 3rd. Averaging 8 heat pumps a month now.",
    name: "UK Renewables",
    company: "UK Renewables",
    stat: "1-man band → 3 teams",
  },
  {
    quote: "Built a 20MW commercial pipeline. ETOTO opened doors we didn't know existed.",
    name: "Genbatt",
    company: "Genbatt",
    stat: "20MW pipeline",
  },
  {
    quote: "First ever solar client with ETOTO. Grew so fast we were acquired by 21° Energy for multi-seven figures.",
    name: "JEM Energy",
    company: "JEM Energy",
    stat: "Acquired for multi-7 figures",
  },
]


// ============================================
// WHATSAPP SCREENSHOT PROOF (ScreenshotProof component)
// ============================================
// Real WhatsApp conversations showing results.
// These are images stored in /public/proof/
//
// Dev: display these as styled cards with the screenshot
// image, a headline stat, and a one-liner caption.

export const screenshotProof = [
  {
    id: 'south-coast-solar',
    image: '/proof/south-coast-solar-60k-week.png',
    headline: '£60K in new business in one week',
    caption: 'South Coast Solar — on track for their first ever £100K week',
    source: 'WhatsApp group screenshot',
    // Direct quote from Dean: "60k in new business since monday
    // and there is a very good chance of our first ever 100k week"
  },
  {
    id: 'ups-solar',
    image: '/proof/ups-solar-450-cpa.png',
    headline: '£450 CPA (down from £1,200)',
    caption: 'UPS Solar — previous agency was charging £1,200 per acquisition. ETOTO got it to £450.',
    source: 'WhatsApp screenshot',
    // Direct quote: "Weve spent 20k for 40 installs and got at
    // least another 10 sat in DNO thats £450 a job! Im delighted with that!"
  },
]


// ============================================
// GOOGLE REVIEWS LINK
// ============================================

export const googleReviewsUrl = 'https://share.google/6XzoycwagpqI9rmmA'

// Embed this as a "See our Google reviews" link with a star
// rating visual (e.g. ★★★★★ 5.0 on Google) that opens the
// reviews page in a new tab.


// ============================================
// CLIENT LOGOS (ClientLogos component)
// ============================================
// Export from Figma:
// https://www.figma.com/design/Gfs9rqeMWE0Yo8BpQaSDks/Proposals-Board?node-id=630-28&m=dev
//
// Export each logo as PNG/SVG with transparent background.
// Save to /public/logos/

export const clientLogos = [
  { name: 'Halo Renewables', logoUrl: '/logos/halo.png' },
  { name: 'EVLM Renewables', logoUrl: '/logos/evlm.png' },
  { name: 'AB Renewables', logoUrl: '/logos/ab-renewables.png' },
  { name: 'JEM Energy', logoUrl: '/logos/jem-energy.png' },
  { name: 'South Coast Solar', logoUrl: '/logos/south-coast-solar.png' },
  { name: 'Carter Electrical', logoUrl: '/logos/carter-electrical.png' },
  { name: 'Genbatt', logoUrl: '/logos/genbatt.png' },
  { name: 'UK Renewables', logoUrl: '/logos/uk-renewables.png' },
  { name: 'YEERS', logoUrl: '/logos/yeers.png' },
  { name: 'MCJ Solar', logoUrl: '/logos/mcj.png' },
  { name: 'Alltech Solar', logoUrl: '/logos/alltech.png' },
  { name: 'UPS Solar', logoUrl: '/logos/ups-solar.png' },
  { name: 'Energy Concerns', logoUrl: '/logos/energy-concerns.png' },
]


// ============================================
// WHERE EVERYTHING GOES (reference for dev)
// ============================================
//
// HOME PAGE (/):
//   → StatsBanner: below TheProblem, above TheMethod
//   → VideoTestimonial (Halo, featured): between TheMethod and CTA cards
//   → ClientLogos: below hero headline
//   → Google Reviews link: near footer
//
// /steps:
//   → TestimonialRow (3 cards): after Step 9, before footer
//
// /live-call:
//   → TestimonialRow: after the video section
//
// /resources:
//   → TestimonialRow: between formula section and paid products
//   → ScreenshotProof (both): alongside testimonial cards
//
// /solaflow:
//   → VideoTestimonial (Halo): above pricing card
//   → StatsBanner: in hero section
//   → ScreenshotProof: above pricing as extra proof
//   → Google Reviews link: near CTA
//
// /complete-toolkit:
//   → StatsBanner: above buy button
//   → TestimonialRow: in the buy section
//
// EVERY PRODUCT MICROSITE buy section:
//   → TestimonialRow (2 cards): above the buy button
//
// SUCCESS PAGES:
//   → "Join 200+ installers" one-liner (no full testimonials)
