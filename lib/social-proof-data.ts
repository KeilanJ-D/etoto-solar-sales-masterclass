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
  { value: "£200M+", label: "Sales for Clients" },
  { value: "£5M/m", label: "Avg Client Sales/Month" },
  { value: "£12,500+", label: "Average Client AOV" },
  // "Under £500" reads cleanly; "<£500" at hero font sizes can look like a
  // tag or be misread on quick scan. The label already says "Average".
  { value: "Under £500", label: "Average Client CPA" },
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
    logoUrl: null,
    featured: true,
  },
  {
    id: 'evlm',
    name: 'Lloyd',
    company: 'EVLM Renewables',
    quote: "We went from 4 installs a month to 4-5 a week. ETOTO didn't just bring leads — they changed how we sell.",
    stat: '4/month → 4-5/week',
    videoUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7442510522643705856?collapsed=1',
    logoUrl: null,
    embedType: 'linkedin' as const,
  },
  {
    id: 'ab-renewables',
    name: 'AB Renewables',
    company: 'AB Renewables',
    quote: "£4 million in revenue working with ETOTO. The leads and the system together just work.",
    stat: '£4M in revenue',
    videoUrl: 'https://www.youtube.com/embed/ipBXG6yk5KA?si=TUEczok451_krB_T',
    logoUrl: null,
  },
  {
    id: 'jem-energy',
    name: 'JEM Energy',
    company: 'JEM Energy',
    quote: "ETOTO's first ever solar client. Grew with ETOTO and was acquired by 21° Energy for multi-seven figures.",
    stat: 'Acquired for multi-7 figures',
    videoUrl: 'https://www.youtube.com/embed/TmYby-YVlOA?si=KwEdredOSiWvWX_x',
    logoUrl: null,
  },
  {
    id: 'genbatt',
    name: 'Genbatt',
    company: 'Genbatt',
    quote: "Built a 20MW commercial solar pipeline with ETOTO's lead generation and business development.",
    stat: '20MW commercial pipeline',
    videoUrl: 'https://www.youtube.com/embed/PnPr8OfpfFA?si=kuxgAALUpU9Hr1kC',
    logoUrl: null,
  },
  {
    id: 'carter-electrical',
    name: 'Carter Electrical',
    company: 'Carter Renewables',
    quote: "ETOTO helped us build the business development side from scratch. The leads keep coming.",
    stat: 'Business development transformation',
    videoUrl: 'https://www.youtube.com/embed/hOU1w05aoKk?si=4J-OVvNWWpq0dfRx',
    logoUrl: null,
  },
  {
    id: 'uk-renewables',
    name: 'UK Renewables',
    company: 'UK Renewables',
    quote: "Went from a one-man band to a proper SME. Averaging 8 heat pumps a month, 2 teams running, taking on a 3rd.",
    stat: '1-man band → 3 teams',
    videoUrl: 'https://www.youtube.com/embed/8AoOTz4S4O8',
    logoUrl: null,
    isVertical: true,
  },
]


// ============================================
// TEXT TESTIMONIALS (TestimonialCard component)
// ============================================
// For clients without video, or as quick-hit proof strips.

export const testimonials = [
  {
    id: 'halo',
    quote: "We did 67 sales in one month. ETOTO transformed our entire operation.",
    name: "Matt",
    company: "Halo Renewables",
    stat: "67 sales in 1 month",
  },
  {
    id: 'evlm',
    quote: "We went from 4 installs a month to 4-5 a week. ETOTO didn't just bring leads — they changed how we sell.",
    name: "Lloyd",
    company: "EVLM Renewables",
    stat: "4/month → 4-5/week",
  },
  {
    id: 'yeers',
    quote: "Closed 2 deals worth £25,000 in the first week of using ETOTO's sales training. The formula just works.",
    name: "Tom",
    company: "YEERS — Yorkshire Energy",
    stat: "£25K in week one",
  },
  {
    id: 'mcj',
    quote: "Phil's now booking 5 weeks out. We can't install fast enough — that's the kind of problem you want to have.",
    name: "Phil",
    company: "MCJ Solar",
    stat: "Booked 5 weeks ahead",
  },
  {
    id: 'alltech',
    quote: "7 appointments booked per week on average, closing 50% into sales. ETOTO's appointment setting has completely changed our pipeline.",
    name: "Alltech Solar",
    company: "Alltech, Scotland",
    stat: "7 appts/week, 50% close rate",
  },
  {
    id: 'ab-renewables',
    quote: "£4 million in revenue working with ETOTO. The leads and the system together just work.",
    name: "AB Renewables",
    company: "AB Renewables",
    stat: "£4M in revenue",
  },
  {
    id: 'uk-renewables',
    quote: "Grew from a one-man band to a proper SME — 2 teams running, taking on a 3rd. Averaging 8 heat pumps a month now.",
    name: "UK Renewables",
    company: "UK Renewables",
    stat: "1-man band → 3 teams",
  },
  {
    id: 'genbatt',
    quote: "Built a 20MW commercial pipeline. ETOTO opened doors we didn't know existed.",
    name: "Genbatt",
    company: "Genbatt",
    stat: "20MW pipeline",
  },
  {
    id: 'jem-energy',
    quote: "First ever solar client with ETOTO. Grew so fast we were acquired by 21° Energy for multi-seven figures.",
    name: "JEM Energy",
    company: "JEM Energy",
    stat: "Acquired for multi-7 figures",
  },
]

// Helper to get testimonials by IDs
export function getTestimonialsByIds(ids: string[]) {
  return testimonials.filter(t => ids.includes(t.id))
}

// Helper to get video testimonial by ID
export function getVideoTestimonialById(id: string) {
  return videoTestimonials.find(v => v.id === id)
}


// ============================================
// GOOGLE REVIEWS
// ============================================

export const googleReviewsUrl = 'https://share.google/6XzoycwagpqI9rmmA'

export const googleReviews = [
  {
    name: "Finn J.W.",
    rating: 5,
    text: "ETOTO talk a BIG game on the sales call but you'll find out why. I have just finished my first month with ETOTO.",
    timeAgo: "1 year ago",
  },
  {
    name: "Callum Conroy",
    rating: 5,
    text: "We've been working with ETOTO Media for 4 months now and they are doing a great job. We've seen our leads triple since the team came on board.",
    timeAgo: "1 year ago",
  },
  {
    name: "John Bloomfield",
    rating: 5,
    text: "Great team especially Keilan. They have exceeded our expectations and we are very happy with the service so far. The increase in enquiries is very noticeable.",
    timeAgo: "1 month ago",
  },
  {
    name: "Richard Murray",
    rating: 5,
    text: "A breath of fresh air; creative ideas, excellent communication and top-class marketing. After multiple failed trails with other companies, it seems we've now found the one.",
    timeAgo: "2 years ago",
  },
  {
    name: "David Ewen",
    rating: 5,
    text: "The amount of high quality leads we have received since has been amazing — over 120. We had many chats and zoom calls with the team before getting started.",
    timeAgo: "1 year ago",
  },
  {
    name: "Daniel Millar",
    rating: 5,
    text: "After working with a few agencies Etoto are who we have stuck with. The quality of leads and supporting software they provide is unmatched.",
    timeAgo: "1 year ago",
  },
  {
    name: "James Burrell",
    rating: 5,
    text: "We've only been working with ETOTO for a few weeks, but we're already seeing great results and good quality leads. The team has been proactive, responsive, and clearly know their stuff.",
    timeAgo: "11 months ago",
  },
  {
    name: "Lead Pro Solutions",
    rating: 5,
    text: "Started our business at the start of July, needed someone to help us improve our lead quality. Halfway through the month and we've hit 100k in sales.",
    timeAgo: "1 year ago",
  },
  {
    name: "Robert Atkinson",
    rating: 5,
    text: "These guys are hard working and ambitious. We get a sense they really want the best for our company and not just want our cash like many marketing companies.",
    timeAgo: "1 year ago",
  },
  {
    name: "Karim Shabankareh",
    rating: 5,
    text: "ETOTO media are a young, expert and enthusiastic team. Jordan, Keilan and Joel have absolutely nailed their processes and have helped me scale my business.",
    timeAgo: "1 year ago",
  },
  {
    name: "Sarah Haysmore",
    rating: 5,
    text: "The guys at Etoto are like an extension of your work force. Always on hand if you need them, especially Keilan who was working on a project with me until 9pm one evening.",
    timeAgo: "1 year ago",
  },
  {
    name: "Georgia Memon",
    rating: 5,
    text: "The most fantastic, ambitious, committed team. I have had the pleasure of working with Keilan and Alex over the 5 months.",
    timeAgo: "1 year ago",
  },
  {
    name: "CHRIS CHARLTON",
    rating: 5,
    text: "We have been working with Jordan and the team for a year now and would highly recommend them. Since working with ETOTO we have had an increase in traffic to our website.",
    timeAgo: "2 years ago",
  },
  {
    name: "Aid",
    rating: 5,
    text: "Known the guys for a few years now. Onboarding was easy and I feel like I have 24 hour access to the team when needed.",
    timeAgo: "1 week ago",
  },
  {
    name: "Simon Jakins",
    rating: 5,
    text: "Had a call with Alex today, great guy no pushy sales just great honest advice, really like the service they provide and very knowledgeable!",
    timeAgo: "1 week ago",
  },
  {
    name: "Donovan Fawcett",
    rating: 5,
    text: "An incredible company to work with. A great group of very intelligent hard working and capable individuals. Very driven and a pleasure to work alongside.",
    timeAgo: "4 weeks ago",
  },
  {
    name: "Holly Deacon",
    rating: 5,
    text: "They're a fantastic team. Very communicative and positive in what they do. And crucially produce results!",
    timeAgo: "2 years ago",
  },
  {
    name: "Nick Turner",
    rating: 5,
    text: "ETOTO were recommended to us by a company we work closely with, and could personally see the increase in sales they were making.",
    timeAgo: "1 year ago",
  },
]


// ============================================
// CLIENT LOGOS (ClientLogos component)
// ============================================

export const clientLogos = [
  { name: 'Halo Renewables', logoUrl: '/logos/halo-renewables.png' },
  { name: 'EVLM Renewables', logoUrl: '/logos/evlm-renewables.png' },
  { name: 'AB Renewables', logoUrl: '/logos/ab-renewables.png' },
  { name: 'JEM Energy', logoUrl: '/logos/jem-energy.png' },
  { name: 'South Coast Solar', logoUrl: '/logos/south-coast-solar.png' },
  { name: 'Carter Renewables', logoUrl: '/logos/carter-renewables.png' },
  { name: 'Genbatt', logoUrl: '/logos/genbatt.png' },
  { name: 'UK Renewables', logoUrl: '/logos/uk-renewables.png' },
  { name: 'MCJ Energy Solutions', logoUrl: '/logos/mcj-energy.png' },
  { name: 'UPS Solar', logoUrl: '/logos/ups-solar.png' },
  { name: 'YEERS', logoUrl: '/logos/yeers.png' },
  { name: 'Alltech', logoUrl: '/logos/alltech.png' },
  { name: 'Energy Concerns', logoUrl: '/logos/energy-concerns.png' },
]
