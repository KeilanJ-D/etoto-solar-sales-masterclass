// lib/discovery-questions.ts
// ============================================
// Structured discovery question library.
// Powers the interactive DiscoveryQuestionBank widget.
// Source of truth — also re-rendered as static prose in the
// /systems/customer-discovery-mastery playbook.
// ============================================

export type DiscoveryCategory =
  | 'energy'
  | 'property'
  | 'decision'
  | 'financial'
  | 'install'
  | 'leverage'

export interface DiscoveryQuestion {
  id: string
  question: string
  intent: string
  category: DiscoveryCategory
  whyAsk: string
  goodAnswer: string
  badAnswer: string
  whatYouLearn: string
  /** Foundational questions every new rep should master first. */
  foundational?: boolean
}

export const DISCOVERY_CATEGORIES: Record<
  DiscoveryCategory,
  { label: string; color: string; iconHex: string; description: string }
> = {
  energy: {
    label: 'Energy profile',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    iconHex: '#F5921E',
    description: 'How they use electricity. Drives system + battery sizing.',
  },
  property: {
    label: 'Property profile',
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    iconHex: '#3b82f6',
    description: 'The roof, the supply, the access. What install looks like.',
  },
  decision: {
    label: 'Decision dynamics',
    color: 'bg-purple-100 text-purple-900 border-purple-300',
    iconHex: '#8b5cf6',
    description: 'Who decides + how. Finds the actual decision-maker fast.',
  },
  financial: {
    label: 'Financial readiness',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    iconHex: '#10b981',
    description: 'How they\'ll actually pay. Pricing context.',
  },
  install: {
    label: 'Install constraints',
    color: 'bg-slate-100 text-slate-900 border-slate-300',
    iconHex: '#475569',
    description: 'Things that don\'t show on satellite but kill installs.',
  },
  leverage: {
    label: 'Sales leverage',
    color: 'bg-[#E8192C]/10 text-[#E8192C] border-[#E8192C]/30',
    iconHex: '#E8192C',
    description: 'Questions that make them more likely to buy from YOU.',
  },
}

export const discoveryQuestions: DiscoveryQuestion[] = [
  // ENERGY PROFILE
  {
    id: 'energy-bill-photo',
    category: 'energy',
    question: 'Do you have your last electricity bill handy? Even a photo of the front page works.',
    intent: 'Get actual annual kWh + unit rate + standing charge.',
    whyAsk: 'The bill is the only source of truth. Self-reported numbers are wrong 60% of the time.',
    goodAnswer: 'They send a photo within 2 minutes.',
    badAnswer: '"I think it\'s about £150 a month." → push: "If you can grab the actual bill we can size this exactly right — saves us guessing".',
    whatYouLearn: 'Annual kWh, peak/off-peak split if on a TOU tariff, supplier name, MPAN.',
    foundational: true,
  },
  {
    id: 'energy-time-of-use',
    category: 'energy',
    question: 'Roughly what time of day are most people home using power?',
    intent: 'Self-consumption pattern — drives battery size.',
    whyAsk: 'A house empty 9 – 5 self-consumes 25% of generation. A house with someone home all day self-consumes 50%+. Different battery sizing.',
    goodAnswer: 'Specific — "wife works from home, kids back at 4, big draw 5 – 8 PM".',
    badAnswer: '"Just normal" → probe with: "So when\'s the kettle on most often?"',
    whatYouLearn: 'Daytime load profile, peak hours, battery duty cycle.',
    foundational: true,
  },
  {
    id: 'energy-tariff',
    category: 'energy',
    question: 'What tariff are you currently on? Octopus, EDF, British Gas, something else?',
    intent: 'Existing tariff + opportunity to switch.',
    whyAsk: 'If they\'re on flat rate, you have a tariff-switch upsell. If on Octopus Go/Cosy/Intelligent, you already have battery opportunity baked in.',
    goodAnswer: 'They name the tariff.',
    badAnswer: '"Just whoever\'s cheapest" → flag for tariff conversation as part of the install.',
    whatYouLearn: 'Off-peak window if any, export rate baseline, switch potential.',
    foundational: true,
  },
  {
    id: 'energy-heating',
    category: 'energy',
    question: 'Any electric heating? Heat pump, electric showers, immersion?',
    intent: 'Hidden electrical loads that change sizing.',
    whyAsk: 'A house with electric heating uses 2 – 3× the average. Battery sizing changes dramatically.',
    goodAnswer: 'They list every electrical appliance.',
    badAnswer: '"Gas central heating, that\'s it" → still probe: "What about hot water — gas combi, immersion, both?"',
    whatYouLearn: 'True electrical load, hot water cycling pattern, opportunity for PV diverter.',
  },
  {
    id: 'energy-ev',
    category: 'energy',
    question: 'Got an EV or thinking about one in the next 2 years?',
    intent: 'Future-load planning + EV-coupling battery upsell.',
    whyAsk: 'An EV adds 3,000 – 5,000 kWh/year. Battery sizing should account for it.',
    goodAnswer: '"Got a Tesla, charging on Octopus Intelligent" → spec for full EV cover from battery on peak.',
    badAnswer: '"Not for me, never" → still ask about resale, next owner might.',
    whatYouLearn: 'Whether to upsize battery + inverter, whether to add EV charger as part of install.',
    foundational: true,
  },

  // PROPERTY PROFILE
  {
    id: 'property-age',
    category: 'property',
    question: 'Roughly what year was the house built / when was the consumer unit last upgraded?',
    intent: 'Electrical compliance + main fuse rating likelihood.',
    whyAsk: 'Pre-2000 houses often have 60A fuses + old consumer units that need upgrading before install. £200 – £800 add-on.',
    goodAnswer: 'Specific year + "had a rewire 5 years ago".',
    badAnswer: '"No idea, ages ago" → ask for a photo of the consumer unit.',
    whatYouLearn: 'Whether the install needs supplementary electrical work.',
  },
  {
    id: 'property-phase',
    category: 'property',
    question: 'Is the property single-phase or three-phase supply?',
    intent: 'Driver of which inverter family you can use.',
    whyAsk: 'Three-phase changes everything (see Single vs Three-phase knowledge page).',
    goodAnswer: 'They know — usually because they\'ve had an EV installed.',
    badAnswer: '"I don\'t know" → ask for a meter photo. Three live indicators visible = 3-phase.',
    whatYouLearn: 'Inverter family + DNO paperwork burden.',
    foundational: true,
  },
  {
    id: 'property-access',
    category: 'property',
    question: 'Roof access — is there a gap down the side for scaffolding, or is it on a tight terrace?',
    intent: 'Scaffolding cost prediction.',
    whyAsk: 'A terrace house with shared scaffolding access can DOUBLE the scaffolding cost.',
    goodAnswer: '"Detached, plenty of room either side".',
    badAnswer: '"Mid-terrace, no side access" → flag scaffolding for £600 – £1,200 add.',
    whatYouLearn: 'Install logistics, likely add-on costs.',
  },
  {
    id: 'property-conservation',
    category: 'property',
    question: 'Any conservation area, listed building, or recent planning issues?',
    intent: 'Planning permission risk.',
    whyAsk: 'PV in conservation areas needs planning permission. Adds 8+ weeks.',
    goodAnswer: 'Specific.',
    badAnswer: '"I think we might be in one?" → check the council planning portal during the call.',
    whatYouLearn: 'Whether to factor planning permission into timeline.',
  },
  {
    id: 'property-roof-condition',
    category: 'property',
    question: 'Roof condition — any tiles needing replacing, any leaks?',
    intent: 'Avoid installing on a roof that\'s about to be re-tiled.',
    whyAsk: 'PV install on roof that needs work = remove panels for repair. £1,200 unnecessary cost.',
    goodAnswer: '"Re-roofed 5 years ago, all sound".',
    badAnswer: '"Been meaning to look at it" → push for survey-first or roof-first.',
    whatYouLearn: 'Whether to install now or wait.',
  },

  // DECISION DYNAMICS
  {
    id: 'decision-other-party',
    category: 'decision',
    question: 'Is there anyone else who\'d be part of this decision?',
    intent: 'Confirm sole decision-maker or identify the missing party.',
    whyAsk: '70% of solar decisions are joint. If you spec without the partner, you re-pitch.',
    goodAnswer: '"It\'s just me" OR "my husband — he\'s home Saturday morning".',
    badAnswer: '"I\'ll discuss with my wife later" — guarantee of "let me think" outcome.',
    whatYouLearn: 'Reschedule for when both can be present, or invite partner to the call now.',
    foundational: true,
  },
  {
    id: 'decision-trigger',
    category: 'decision',
    question: 'What got you looking at solar this year specifically — what\'s changed?',
    intent: 'Trigger event = urgency lever.',
    whyAsk: 'Triggers (energy bill shock, new EV, kids back from uni, retirement, sale of business) tell you what to anchor on.',
    goodAnswer: 'Specific event — "last winter\'s bill was £600 for one month".',
    badAnswer: '"Just thinking about it" → probe deeper: "what changed in the last 6 months?"',
    whatYouLearn: 'Emotional driver + urgency.',
    foundational: true,
  },
  {
    id: 'decision-stage',
    category: 'decision',
    question: 'Where are you in your research — first quote, comparing, or pretty close to a decision?',
    intent: 'Pipeline stage qualification.',
    whyAsk: 'First-quote customers need education. Comparing customers need differentiation. Close-to-decision customers need urgency.',
    goodAnswer: 'Honest stage.',
    badAnswer: '"Just gathering info" → could mean anything. Probe: "any other quotes so far?"',
    whatYouLearn: 'How aggressive to be with the close.',
  },
  {
    id: 'decision-blocker',
    category: 'decision',
    question: 'If everything stacks up — savings, install timeline, our team — what would stop you from moving forward this week?',
    intent: 'Surface the real objection before it comes out at close.',
    whyAsk: 'Best question in the toolkit. Customer tells you their objection before you have to handle it.',
    goodAnswer: '"Nothing, sounds good" → close. Or "need finance approved" → handle finance now. Or "want to wait until spring" → handle timing now.',
    badAnswer: 'Silence → wait. The longer they think, the more honest the answer.',
    whatYouLearn: 'The exact objection you need to handle to close.',
    foundational: true,
  },

  // FINANCIAL
  {
    id: 'financial-funding',
    category: 'financial',
    question: 'Have you thought about how you\'d fund this — savings, finance, or a mix?',
    intent: 'Payment route + finance application timing.',
    whyAsk: 'Finance changes the conversation from "is it worth £15K" to "is it worth £190 a month".',
    goodAnswer: '"Cash" or "finance, already had a quote from X".',
    badAnswer: '"Hadn\'t got that far" → frame both options: "we have a lender doing 0% over 24 months — let me show you the monthly".',
    whatYouLearn: 'Finance vs cash decision + which lender if finance.',
    foundational: true,
  },
  {
    id: 'financial-budget',
    category: 'financial',
    question: 'Have you set a rough budget, or are you more focused on the right system regardless of price?',
    intent: 'Price-sensitive vs value-sensitive segmentation.',
    whyAsk: 'Price-led customers want the smallest viable system. Value-led want the best system.',
    goodAnswer: 'Honest signal either way.',
    badAnswer: '"Whatever it costs to do the job" → probe: "if it\'s £12K vs £18K with bigger battery, which sounds more like you?"',
    whatYouLearn: 'Which spec to lead with.',
  },

  // INSTALL CONSTRAINTS
  {
    id: 'install-noise',
    category: 'install',
    question: 'Anyone in the house with shift work, infants, or anything that means certain hours are off-limits for installer noise?',
    intent: 'Scheduling around the customer\'s life.',
    whyAsk: 'Install runs 8 – 5 typically. Newborn sleeping = constrained.',
    goodAnswer: 'Specific.',
    badAnswer: 'No detail given.',
    whatYouLearn: 'Date flexibility + customer-care points.',
  },
  {
    id: 'install-loft',
    category: 'install',
    question: 'How\'s the loft access — boarded, ladder, anything in the way of where the inverter would go?',
    intent: 'Inverter siting + access for cable runs.',
    whyAsk: 'Inverter mounted in a stuffed loft = extra labour. Customer needs to clear it.',
    goodAnswer: 'Clear access described.',
    badAnswer: 'Full of boxes / no ladder → pre-install prep ask.',
    whatYouLearn: 'Pre-install prep ask.',
  },
  {
    id: 'install-pets',
    category: 'install',
    question: 'Pets — anything we need to be aware of? Dog particularly nervous of strangers?',
    intent: 'Install team prep.',
    whyAsk: 'Avoidable issues — dog escapes, customer complains. Easy to flag upfront.',
    goodAnswer: '"Two dogs, both friendly" or "cat that hates everyone".',
    badAnswer: 'No info — ask for it directly.',
    whatYouLearn: 'Install day prep + customer-care points.',
  },

  // SALES LEVERAGE
  {
    id: 'leverage-success-criteria',
    category: 'leverage',
    question: 'What would a system need to do for you to feel this was a great investment in 5 years?',
    intent: 'Get them to articulate their own success criteria.',
    whyAsk: 'When they describe success in their own words, they own it. You then map your spec to their criteria.',
    goodAnswer: '"Bills under £40 a month, paid for in 7 years".',
    badAnswer: 'Vague — probe: "if I told you in 5 years, what number would make you call this a win?"',
    whatYouLearn: 'Their internal success benchmark. Map your spec to it: "So the system I\'m proposing pays back in 6 years and would cut your bill to £30 — that meets your bar".',
    foundational: true,
  },
  {
    id: 'leverage-decision-driver',
    category: 'leverage',
    question: 'What\'s the most important thing for you in choosing who to install — price, brand, install timeline, ongoing support?',
    intent: 'Identify decision driver.',
    whyAsk: 'Lets you tailor your closing to what they care about.',
    goodAnswer: 'One of the four.',
    badAnswer: '"All of them" → ask them to rank.',
    whatYouLearn: 'Build the rest of the call around their answer. Price-led → finance/savings emphasis. Brand-led → tier-1 panel rationale. Timeline-led → install date guarantee. Support-led → 10-year warranty + monitoring app demo.',
    foundational: true,
  },
  {
    id: 'leverage-social-proof',
    category: 'leverage',
    question: 'Anyone you know who\'s had solar installed — what did they tell you?',
    intent: 'Surface social proof gaps or biases.',
    whyAsk: 'Their existing knowledge frames everything. If their neighbour had a bad install, you need to address that ghost.',
    goodAnswer: 'Specific story.',
    badAnswer: '"No one I know" → opportunity to position your client wall + reviews.',
    whatYouLearn: 'If positive → reinforce. If negative → ask what went wrong + show how your process avoids it.',
  },
]

export const questionsByCategory = () => {
  const grouped: Record<DiscoveryCategory, DiscoveryQuestion[]> = {
    energy: [],
    property: [],
    decision: [],
    financial: [],
    install: [],
    leverage: [],
  }
  for (const q of discoveryQuestions) grouped[q.category].push(q)
  return grouped
}

export const foundationalQuestions = () =>
  discoveryQuestions.filter((q) => q.foundational)
