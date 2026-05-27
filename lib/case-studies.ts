// lib/case-studies.ts
// ============================================
// Case studies, adapted from the pitch deck.
// Each case study is a real ETOTO client.
// Used on /case-studies index, individual /case-studies/[slug] pages,
// and inline references inside knowledge pages.
// ============================================

export type Programme = 'scaler' | 'core'
export type EmbedType = 'youtube' | 'linkedin' | 'screenshot'

export interface CaseStudyMetric {
  label: string
  value: string
  highlight?: boolean
}

export interface CaseStudy {
  slug: string
  client: string
  contactName: string
  contactRole: string
  headline: string
  oneLineSummary: string
  thumbnail?: string
  thumbnailMode?: 'cover' | 'contain'
  embedType?: EmbedType
  youtubeId?: string
  linkedinPostId?: string
  programme: Programme
  technologies: Array<'solar' | 'air-source' | 'air-con'>
  metrics: CaseStudyMetric[]
  // The transcript / their own words
  transcript: string
  // What we did, broken into bullets — masterclass-style takeaways
  whatWeDid: string[]
  // What the masterclass reader can learn / apply themselves
  lessons: string[]
  // Which knowledge or systems pages this case study relates to.
  // Used for inline references like "Halo Renewables had this exact problem".
  relatedTopics?: string[]
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'mcj-energy',
    client: 'MCJ Energy Solutions',
    contactName: 'Phil Sign',
    contactRole: 'Managing Director',
    headline: '£1.1M pipeline in 7 weeks',
    oneLineSummary:
      '£140k closed and £1.1M pipeline in under two months on the 90-Day Scaler.',
    embedType: 'linkedin',
    linkedinPostId: '7464608281542643712',
    programme: 'scaler',
    technologies: ['solar'],
    metrics: [
      { label: 'Pipeline', value: '£1.1M', highlight: true },
      { label: 'Closed', value: '£140k' },
      { label: 'Timeframe', value: '7 weeks' },
    ],
    transcript:
      "Hi, I'm Phil, the owner of MCJ Energy Solutions, and I've been a client of ETOTO Media for under two months. Within seven weeks I've got a pipeline of £1.1 million. We've closed just under £140,000 worth of sales. I said to Jordan in my weekly meeting, 'It's the best thing I've ever done, but also the worst thing I've ever done', because I thought my growth would be slower. With ETOTO's help it's jumped me six months ahead of where I expected to be. My pipeline is phenomenal. It's about my back-of-house and infrastructure now, I expected that conversation in six months, not seven weeks.",
    whatWeDid: [
      'Daily-built Meta ads targeting Phil\'s service area, with pre-qualifying questions baked into the lead form',
      'Wired HighLevel CRM to capture, score and route every enquiry within 5 minutes',
      'Installed SolaFlow on his website so quotes generated automatically from property data',
      'Weekly sales review to keep the close rate climbing as volume scaled',
    ],
    lessons: [
      'The infrastructure question (warehouse, install teams, ops capacity) becomes the bottleneck FAST when lead gen works — plan for it before you switch ads on',
      'A pre-qualified lead beats a high-volume lead. Phil\'s £1.1M pipeline came from a smaller list of better-fit prospects, not a flood',
      'Booking the first quote within 5 minutes of enquiry was worth more than every other tweak combined',
    ],
    relatedTopics: ['highlevel-playbook', 'solaflow-mastery'],
    featured: true,
  },
  {
    slug: 'evlm-renewables',
    client: 'EVLM Renewables',
    contactName: 'Lloyd',
    contactRole: 'Owner',
    headline: 'From 4-5 installs/month to 4-5 installs/week',
    oneLineSummary:
      '2.5-year partnership. Average system value £20k+. Most installs come direct from ETOTO ads.',
    embedType: 'linkedin',
    linkedinPostId: '7442510522643705856',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Install cadence', value: '4-5/m → 4-5/wk', highlight: true },
      { label: 'Partnership', value: '2.5 years' },
      { label: 'Avg system value', value: '£20k+' },
    ],
    transcript:
      "Before ETOTO we were doing four to five installs a month. Now we're doing that every single week. We'd spent £10,000 buying leads from a lead-gen company before, and that was money down the drain — those leads had been sold to ten other companies. The biggest unlock was their market knowledge: positioning us as experts and educators meant homeowners were happy to invest in £20,000+ systems. They introduced us to a sales rep who handled the lead overflow, and to Scott from FinMatch for FCA-approved 0% finance. Working with Keilan, Jordan, Joel and the team has been life-changing.",
    whatWeDid: [
      'Repositioned EVLM in their ads as "expert + educator" not "cheapest installer" — that\'s how the AOV climbed to £20k+',
      'Built daily Meta + Google campaigns in their service area only — no overlap with competing ETOTO clients',
      'Introduced a partner-trained appointment setter who covered EVLM\'s lead overflow during install weeks',
      'Set up FinMatch 0% finance so price was never the conversation ender',
    ],
    lessons: [
      'Selling on price will always lose to selling on expertise — the same lead at £8k could become £20k with the right positioning',
      'Buying leads from a lead-gen company is buying everyone else\'s rejects',
      'Adding a setter when your install team is at capacity is the difference between growth and burnout',
    ],
    relatedTopics: ['customer-discovery-mastery', 'highlevel-playbook'],
    featured: true,
  },
  {
    slug: 'halo-renewables',
    client: 'Halo Renewables',
    contactName: 'Matt',
    contactRole: 'Founder',
    headline: '67 sales/month from £4k ad spend',
    oneLineSummary:
      'Cut ad spend from £12k to £4k/month. 118 leads → 67 orders. Turned off every other lead provider.',
    thumbnail: '/case-studies/halo-renewables.png',
    embedType: 'youtube',
    youtubeId: 'cIuNH45hxVg',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Ad spend', value: '£12k → £4k/m', highlight: true },
      { label: 'Leads/m', value: '118' },
      { label: 'Orders/m', value: '67', highlight: true },
    ],
    transcript:
      "I was dubious at the beginning, I'm not going to lie. But once they said 'try it,' I tried it, then I saw the orders come and thought 'right, this does really work'. Several months ago we were spending £12,000 on marketing. Now I've got full confidence in ETOTO, I've turned off all other lead providers. We're spending £4,000 a month, which gave us 118 leads last month and we sold 67 orders. Better than a one-in-two close. The CRM is worth £20,000 on its own — like a missing member of staff.",
    whatWeDid: [
      'Audited every ad campaign and killed the bottom 60% by CPL',
      'Concentrated budget on the highest-ROI ad creative + audience combinations',
      'Built HighLevel automations so no lead ever sat untouched for >5 minutes',
      'Trained Matt\'s closers on the 9-step framework — close rate jumped to 1-in-2',
    ],
    lessons: [
      '67 sales/month from 118 leads = ~57% close rate. That\'s framework + training, not luck',
      'Spending less can earn more — the £8k he stopped spending wasn\'t buying leads, it was buying volume',
      'A CRM that catches every lead in 5 minutes is the single biggest conversion multiplier',
    ],
    relatedTopics: ['highlevel-playbook', 'customer-discovery-mastery'],
    featured: true,
  },
  {
    slug: 'ab-renewables',
    client: 'AB Renewables',
    contactName: 'AB Renewables',
    contactRole: 'Founder',
    headline: '£4M projected revenue · 80-90% from ETOTO',
    oneLineSummary:
      'Continued growth in a slowing market. 80-90% of new work comes direct from ETOTO ads.',
    thumbnail: '/case-studies/ab-renewables.png',
    embedType: 'youtube',
    youtubeId: 'ipBXG6yk5KA',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Projected revenue', value: '£4M/yr', highlight: true },
      { label: 'ETOTO share', value: '80-90%' },
    ],
    transcript:
      "They've helped us to continue to grow even in a market that has started to slow. This year 80-90% of the work that we get in will be directly off the back of the work ETOTO have done for us, which is going to equate to approximately £4 million pounds over the next 12 months.",
    whatWeDid: [
      'Held lead volume steady through a UK market downturn by adjusting creative angles weekly',
      'Built a content engine (website + landing pages) that converted higher than the industry average',
      'Refined targeting so AB Renewables outranked competitors in their service area',
    ],
    lessons: [
      'Market headwinds expose installers who rely on word-of-mouth or referrals — paid acquisition keeps the lights on through cycles',
      'A higher-converting website is worth more than a higher-volume ad budget',
    ],
    relatedTopics: ['solaflow-mastery'],
  },
  {
    slug: 'jem-energy',
    client: 'JEM Energy',
    contactName: 'James Rodwell',
    contactRole: 'Managing Director',
    headline: '+20% turnover · 500%+ ROI on ETOTO spend',
    oneLineSummary:
      'Our first solar client. Still partnered 2 years on. 7-figure revenue added.',
    thumbnail: '/case-studies/jem-energy.png',
    embedType: 'youtube',
    youtubeId: 'TmYby-YVlOA',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Turnover lift', value: '+20%', highlight: true },
      { label: 'ROI', value: '500%+' },
      { label: 'Revenue added', value: '7 figures' },
    ],
    transcript:
      "I'm James Rodwell, MD at JEM Energy. We've been working with ETOTO for two years, still going strong. JEM's been running for 10 years and the last two with ETOTO is when we started using social media for marketing. We've probably increased our sales and turnover by 20%, which is over seven figures since bringing the guys on board. ROI on ETOTO spend has been over 500%. ETOTO have been clear about not overlapping competitors in our territory, so it's pleasing to know no one's treading on our toes.",
    whatWeDid: [
      'Built JEM\'s first social-led acquisition engine from scratch — they had relied on referrals for 8 years',
      'Locked in territorial exclusivity so JEM didn\'t compete with other ETOTO clients for the same postcodes',
      'Steady scale across two years — no boom-bust, just consistent monthly growth',
    ],
    lessons: [
      'A 10-year-old business can still find 20% turnover growth from a single channel change',
      '500% ROI is what disciplined acquisition looks like when paired with a working sales process',
    ],
    relatedTopics: ['highlevel-playbook'],
  },
  {
    slug: 'genbatt',
    client: 'Genbatt',
    contactName: 'Katie',
    contactRole: 'Sales & Design',
    headline: '20+ MW pipeline · £10k ad spend',
    oneLineSummary:
      '20+ megawatts of opportunity in 4 months on under £10k ad spend. Commercial-scale renewables sales.',
    thumbnail: '/case-studies/genbatt.png',
    embedType: 'youtube',
    youtubeId: 'PnPr8OfpfFA',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Pipeline', value: '20+ MW', highlight: true },
      { label: 'Ad spend', value: '<£10k' },
    ],
    transcript:
      "My name is Katie. I work in the sales and design department for Genbatt. We've been working with ETOTO since September. We've spent under £10k and created over 20 megawatts of opportunity. We started without anything — running our own leads doesn't work. Leave it to the ones who know what they're doing.",
    whatWeDid: [
      'Adapted the consumer-solar playbook for commercial battery storage — different audience, different messaging',
      'Generated megawatt-scale enquiries by targeting commercial property decision-makers, not homeowners',
      'Set up CRM to handle longer commercial sales cycles (3-6 months vs domestic 4-6 weeks)',
    ],
    lessons: [
      'The same lead engine that works for homeowners works for commercial — with completely different copy and targeting',
      'Commercial sales cycles need patience; CRM nurture sequences are everything',
    ],
    relatedTopics: ['highlevel-playbook'],
  },
  {
    slug: 'uk-renewables',
    client: 'UK Renewables',
    contactName: 'Rob',
    contactRole: 'Director',
    headline: 'Solo operator to 2 (soon 3) install teams',
    oneLineSummary:
      '8+ heat pumps/month and climbing. 2 years partnered. Heat pump specialist.',
    embedType: 'linkedin',
    linkedinPostId: '7422939393361063936',
    programme: 'core',
    technologies: ['air-source'],
    metrics: [
      { label: 'Install teams', value: '1 → 2 (3 soon)', highlight: true },
      { label: 'Heat pumps/m', value: '8+' },
      { label: 'Partnership', value: '2 years' },
    ],
    transcript:
      "I'm Rob, one of the directors of UK Renewables. We've been a client of ETOTO's for about 2 years. The biggest change since we started was the quality of leads. We've now got two teams installing eight heat pumps a month, and those numbers are growing. They introduced us to Tommy, a remote sales rep who calls all our leads. Since Tommy came on board it's levelled up massively. They've scaled us from just me installing to two teams, soon to be a third. The work we get back outweighs what we pay them massively.",
    whatWeDid: [
      'Scaled Rob from solo installer to 2-team operator over 24 months',
      'Introduced Tommy as a partner-trained remote sales rep — quality conversations, not just dials',
      'Built video content that gave customers "a face to trust" before the install team arrived',
    ],
    lessons: [
      'A trained remote rep can outperform an in-house team if they know your product and follow the framework',
      'Video content reduces install-day friction — customer already knows you',
      'Heat pump installs work on the same playbook as solar — just slower sales cycles',
    ],
    relatedTopics: ['customer-discovery-mastery', 'highlevel-playbook'],
    featured: true,
  },
  {
    slug: 'ups-solar',
    client: 'UPS Solar',
    contactName: 'UPS Solar',
    contactRole: 'Founder',
    headline: 'CPA cut from £1,300 to £300',
    oneLineSummary:
      'Switched from another agency. Cost per appointment dropped 77% in one quarter.',
    thumbnail: '/case-studies/ups-solar-vs-competitor.png',
    thumbnailMode: 'contain',
    embedType: 'screenshot',
    programme: 'core',
    technologies: ['solar'],
    metrics: [
      { label: 'Before CPA', value: '£1,300' },
      { label: 'With ETOTO', value: '£300', highlight: true },
      { label: 'Reduction', value: '-77%', highlight: true },
    ],
    transcript:
      "UPS Solar came to us paying their previous agency over £1,300 to land each booked appointment. Inside the first quarter we'd brought that to £300. Same audience, same product, fundamentally different acquisition engine.",
    whatWeDid: [
      'Audited the previous agency\'s campaigns — found bloated targeting, poor creative, no qualification',
      'Built tightly-targeted Meta campaigns with pre-qualification questions baked in',
      'Wired the lead flow into a CRM that filtered and scored every contact before the rep called',
    ],
    lessons: [
      'Most installers paying for "leads" are actually paying for clicks. CPA-on-booked-appointment is the only honest metric',
      'A 77% CPA reduction comes from killing what doesn\'t work, not adding more',
    ],
    relatedTopics: ['highlevel-playbook'],
    featured: true,
  },
  {
    slug: 'tempest-aircon',
    client: 'Tempest Air Con',
    contactName: 'Hayden',
    contactRole: 'Founder',
    headline: '£30k in 30 days · £100k in 3 months',
    oneLineSummary:
      'From "mates ribbing him about the AC obsession" to a real business with an install schedule.',
    thumbnail: '/case-studies/tempest-aircon-results.png',
    thumbnailMode: 'contain',
    embedType: 'screenshot',
    programme: 'scaler',
    technologies: ['air-con'],
    metrics: [
      { label: 'Month 1 sales', value: '£30k', highlight: true },
      { label: 'First 3 months', value: '~£100k', highlight: true },
    ],
    transcript:
      "Hayden started Tempest after years of his mates ribbing him about the AC obsession. First 30 days of ads with us he closed £30,000. Three months in he was knocking on £100k, with a real install schedule, video content, and a brand he could be proud of.",
    whatWeDid: [
      'Built Hayden\'s brand from scratch — name, logo, website, social presence',
      'Launched Meta + Google ads for AC installs in his service area',
      'Created video content that positioned him as the local AC expert',
    ],
    lessons: [
      'A new business with no track record can still hit £100k in 90 days if the offer is right and the targeting is tight',
      'Personal brand + video content compresses the "do I trust this person" stage of the sale',
    ],
    relatedTopics: ['solaflow-mastery'],
    featured: true,
  },
]

export const caseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug)

export const featuredCaseStudies = (): CaseStudy[] =>
  caseStudies.filter((c) => c.featured)

export const caseStudiesByTopic = (topicSlug: string): CaseStudy[] =>
  caseStudies.filter((c) => c.relatedTopics?.includes(topicSlug))
