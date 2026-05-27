import type { SystemsPlaybook } from '../types'

export const customerDiscoveryMastery: SystemsPlaybook = {
  slug: 'customer-discovery-mastery',
  title: 'Customer Discovery Mastery — Extracting Every Useful Piece of Intel',
  subtitle:
    'The full question library, organised by what intel each question extracts. Annotated with why we ask, what bad answers look like, and what to do with the answer.',
  forWhom:
    'Every rep, every appointment setter, every salesperson on a discovery call. The single highest-leverage 30 pages on this site.',
  estReadMinutes: 24,
  lastUpdated: '2026-05-27',
  introNarrative:
    'A weak rep asks 5 generic questions and quotes from a template. An elite rep asks 25 surgical questions and quotes a system the customer didn\'t know they needed. The difference is not charisma — it\'s the question library. This is ours. Every question here is annotated with what intel it extracts, why that intel matters, and how to use the answer.',

  sections: [
    {
      id: 'energy-profile',
      title: 'Energy Profile — How They Use Electricity',
      intro:
        'You\'re sizing a system. You need real numbers, not estimates. These questions get them.',
      steps: [
        {
          number: 1,
          title:
            '"Do you have your last electricity bill handy? Even a photo of the front page works."',
          goal: 'Get actual annual kWh + unit rate + standing charge.',
          instructions: [
            'WHY: The bill is the only source of truth. Self-reported numbers are wrong 60% of the time.',
            'GOOD ANSWER: They send a photo within 2 minutes.',
            'BAD ANSWER: "I think it\'s about £150 a month." → push: "If you can grab the actual bill we can size this exactly right — saves us guessing".',
            'WHAT YOU LEARN: Annual kWh, peak/off-peak split if on a TOU tariff, supplier name, MPAN.',
          ],
        },
        {
          number: 2,
          title: '"Roughly what time of day are most people home using power?"',
          goal: 'Self-consumption pattern — drives battery size.',
          instructions: [
            'WHY: A house empty 9 – 5 self-consumes 25% of generation. A house with someone home all day self-consumes 50%+. Different battery sizing.',
            'GOOD ANSWER: Specific — "wife works from home, kids back at 4, big draw 5 – 8 PM".',
            'BAD ANSWER: "Just normal" → probe with: "So when\'s the kettle on most often?"',
            'WHAT YOU LEARN: Daytime load profile, peak hours, battery duty cycle.',
          ],
        },
        {
          number: 3,
          title:
            '"What tariff are you currently on? Octopus, EDF, British Gas, something else?"',
          goal: 'Existing tariff + opportunity to switch.',
          instructions: [
            'WHY: If they\'re on flat rate, you have a tariff-switch upsell. If on Octopus Go/Cosy/Intelligent, you already have battery opportunity baked in.',
            'GOOD ANSWER: They name the tariff.',
            'BAD ANSWER: "Just whoever\'s cheapest" → flag for tariff conversation as part of the install.',
            'WHAT YOU LEARN: Off-peak window if any, export rate baseline, switch potential.',
          ],
        },
        {
          number: 4,
          title:
            '"Any electric heating? Heat pump, electric showers, immersion?"',
          goal: 'Hidden electrical loads that change sizing.',
          instructions: [
            'WHY: A house with electric heating uses 2 – 3× the average. Battery sizing changes dramatically.',
            'GOOD ANSWER: They list every electrical appliance.',
            'BAD ANSWER: "Gas central heating, that\'s it" → still probe: "What about hot water — gas combi, immersion, both?"',
            'WHAT YOU LEARN: True electrical load, hot water cycling pattern, opportunity for PV diverter.',
          ],
        },
        {
          number: 5,
          title:
            '"Got an EV or thinking about one in the next 2 years?"',
          goal: 'Future-load planning + EV-coupling battery upsell.',
          instructions: [
            'WHY: An EV adds 3,000 – 5,000 kWh/year. Battery sizing should account for it.',
            'GOOD ANSWER: "Got a Tesla, charging on Octopus Intelligent" → spec for full EV cover from battery on peak.',
            'BAD ANSWER: "Not for me, never" → still ask about resale, next owner might.',
            'WHAT YOU LEARN: Whether to upsize battery + inverter, whether to add EV charger as part of install.',
          ],
        },
      ],
      keyTakeaway:
        'These 5 questions take 4 minutes and give you 90% of the data needed to size correctly. Skip any one and you\'re guessing.',
    },
    {
      id: 'property',
      title: 'Property Profile — What the Install Actually Looks Like',
      intro:
        'The roof, the supply, the access. Install team needs these answers before site visit.',
      steps: [
        {
          number: 1,
          title:
            '"Roughly what year was the house built / when was the consumer unit last upgraded?"',
          goal: 'Electrical compliance + main fuse rating likelihood.',
          instructions: [
            'WHY: Pre-2000 houses often have 60A fuses + old consumer units that need upgrading before install. £200 – £800 add-on.',
            'GOOD ANSWER: Specific year + "had a rewire 5 years ago".',
            'BAD ANSWER: "No idea, ages ago" → ask for a photo of the consumer unit.',
            'WHAT YOU LEARN: Whether the install needs supplementary electrical work.',
          ],
        },
        {
          number: 2,
          title: '"Is the property single-phase or three-phase supply?"',
          goal: 'Driver of which inverter family you can use.',
          instructions: [
            'WHY: Three-phase changes everything (see Single vs Three-phase knowledge page).',
            'GOOD ANSWER: They know — usually because they\'ve had an EV installed.',
            'BAD ANSWER: "I don\'t know" → ask for a meter photo. Three live indicators visible = 3-phase.',
            'WHAT YOU LEARN: Inverter family + DNO paperwork burden.',
          ],
        },
        {
          number: 3,
          title:
            '"Roof access — is there a gap down the side for scaffolding, or is it on a tight terrace?"',
          goal: 'Scaffolding cost prediction.',
          instructions: [
            'WHY: A terrace house with shared scaffolding access can DOUBLE the scaffolding cost.',
            'GOOD ANSWER: "Detached, plenty of room either side".',
            'BAD ANSWER: "Mid-terrace, no side access" → flag scaffolding for £600 – £1,200 add.',
            'WHAT YOU LEARN: Install logistics, likely add-on costs.',
          ],
        },
        {
          number: 4,
          title:
            '"Any conservation area, listed building, or recent planning issues?"',
          goal: 'Planning permission risk.',
          instructions: [
            'WHY: PV in conservation areas needs planning permission. Adds 8+ weeks.',
            'GOOD ANSWER: Specific.',
            'BAD ANSWER: "I think we might be in one?" → check the council planning portal during the call.',
            'WHAT YOU LEARN: Whether to factor planning permission into timeline.',
          ],
        },
        {
          number: 5,
          title:
            '"Roof condition — any tiles needing replacing, any leaks?"',
          goal: 'Avoid installing on a roof that\'s about to be re-tiled.',
          instructions: [
            'WHY: PV install on roof that needs work = remove panels for repair. £1,200 unnecessary cost.',
            'GOOD ANSWER: "Re-roofed 5 years ago, all sound".',
            'BAD ANSWER: "Been meaning to look at it" → push for survey-first or roof-first.',
            'WHAT YOU LEARN: Whether to install now or wait.',
          ],
        },
      ],
    },
    {
      id: 'decision-dynamics',
      title: 'Decision Dynamics — Who Decides + How',
      intro:
        'Selling to the wrong person is the most expensive mistake reps make. Find the actual decision-maker fast.',
      steps: [
        {
          number: 1,
          title: '"Is there anyone else who\'d be part of this decision?"',
          goal: 'Confirm sole decision-maker or identify the missing party.',
          instructions: [
            'WHY: 70% of solar decisions are joint. If you spec without the partner, you re-pitch.',
            'GOOD ANSWER: "It\'s just me" OR "my husband — he\'s home Saturday morning".',
            'BAD ANSWER: "I\'ll discuss with my wife later" — guarantee of "let me think" outcome.',
            'WHAT TO DO: Reschedule for when both can be present, or invite partner to the call now.',
          ],
        },
        {
          number: 2,
          title:
            '"What got you looking at solar this year specifically — what\'s changed?"',
          goal: 'Trigger event = urgency lever.',
          instructions: [
            'WHY: Triggers (energy bill shock, new EV, kids back from uni, retirement, sale of business) tell you what to anchor on.',
            'GOOD ANSWER: Specific event — "last winter\'s bill was £600 for one month".',
            'BAD ANSWER: "Just thinking about it" → probe deeper: "what changed in the last 6 months?"',
            'WHAT YOU LEARN: Emotional driver + urgency.',
          ],
        },
        {
          number: 3,
          title:
            '"Where are you in your research — first quote, comparing, or pretty close to a decision?"',
          goal: 'Pipeline stage qualification.',
          instructions: [
            'WHY: First-quote customers need education. Comparing customers need differentiation. Close-to-decision customers need urgency.',
            'GOOD ANSWER: Honest stage.',
            'BAD ANSWER: "Just gathering info" → could mean anything. Probe: "any other quotes so far?"',
            'WHAT YOU LEARN: How aggressive to be with the close.',
          ],
        },
        {
          number: 4,
          title:
            '"If everything stacks up — savings, install timeline, our team — what would stop you from moving forward this week?"',
          goal: 'Surface the real objection before it comes out at close.',
          instructions: [
            'WHY: Best question in the toolkit. Customer tells you their objection before you have to handle it.',
            'GOOD ANSWER: "Nothing, sounds good" → close.',
            'GOOD ANSWER: "Need finance approved" → handle finance now.',
            'GOOD ANSWER: "Want to wait until spring" → handle timing now.',
            'BAD ANSWER: Silence → wait. The longer they think, the more honest the answer.',
          ],
        },
      ],
    },
    {
      id: 'financial',
      title: 'Financial Readiness — How They\'ll Actually Pay',
      intro:
        'Pricing without payment context is wasted spec time.',
      steps: [
        {
          number: 1,
          title:
            '"Have you thought about how you\'d fund this — savings, finance, or a mix?"',
          goal: 'Payment route + finance application timing.',
          instructions: [
            'WHY: Finance changes the conversation from "is it worth £15K" to "is it worth £190 a month".',
            'GOOD ANSWER: "Cash" or "finance, already had a quote from X".',
            'BAD ANSWER: "Hadn\'t got that far" → frame both options: "we have a lender doing 0% over 24 months — let me show you the monthly".',
            'WHAT YOU LEARN: Finance vs cash decision + which lender if finance.',
          ],
        },
        {
          number: 2,
          title:
            '"Have you set a rough budget, or are you more focused on the right system regardless of price?"',
          goal: 'Price-sensitive vs value-sensitive segmentation.',
          instructions: [
            'WHY: Price-led customers want the smallest viable system. Value-led want the best system.',
            'GOOD ANSWER: Honest signal either way.',
            'BAD ANSWER: "Whatever it costs to do the job" → probe: "if it\'s £12K vs £18K with bigger battery, which sounds more like you?"',
            'WHAT YOU LEARN: Which spec to lead with.',
          ],
        },
      ],
    },
    {
      id: 'install-constraints',
      title: 'Install Constraints — What Could Block This',
      intro:
        'Things that don\'t show up on satellite imagery but kill installs.',
      steps: [
        {
          number: 1,
          title:
            '"Anyone in the house with shift work, infants, or anything that means certain hours are off-limits for installer noise?"',
          goal: 'Scheduling around the customer\'s life.',
          instructions: [
            'WHY: Install runs 8 – 5 typically. Newborn sleeping = constrained.',
            'WHAT YOU LEARN: Date flexibility + customer-care points.',
          ],
        },
        {
          number: 2,
          title:
            '"How\'s the loft access — boarded, ladder, anything in the way of where the inverter would go?"',
          goal: 'Inverter siting + access for cable runs.',
          instructions: [
            'WHY: Inverter mounted in a stuffed loft = extra labour. Customer needs to clear it.',
            'WHAT YOU LEARN: Pre-install prep ask.',
          ],
        },
        {
          number: 3,
          title:
            '"Pets — anything we need to be aware of? Dog particularly nervous of strangers?"',
          goal: 'Install team prep.',
          instructions: [
            'WHY: Avoidable issues — dog escapes, customer complains. Easy to flag upfront.',
            'WHAT YOU LEARN: Install day prep.',
          ],
        },
      ],
    },
    {
      id: 'sales-leverage',
      title: 'Questions That Build Sales Leverage',
      intro:
        'Questions that don\'t directly inform spec but make the customer more likely to buy from YOU.',
      steps: [
        {
          number: 1,
          title:
            '"What would a system need to do for you to feel this was a great investment in 5 years?"',
          goal: 'Get them to articulate their own success criteria.',
          instructions: [
            'WHY: When they describe success in their own words, they own it. You then map your spec to their criteria.',
            'GOOD ANSWER: "Bills under £40 a month, paid for in 7 years".',
            'USE: "So the system I\'m proposing pays back in 6 years and would cut your bill to around £30 — that meets your bar".',
          ],
        },
        {
          number: 2,
          title:
            '"What\'s the most important thing for you in choosing who to install — price, brand, install timeline, ongoing support?"',
          goal: 'Identify decision driver.',
          instructions: [
            'WHY: Lets you tailor your closing to what they care about.',
            'GOOD ANSWER: One of the four.',
            'USE: Build the rest of the call around their answer. Price-led → finance/savings emphasis. Brand-led → tier-1 panel rationale. Timeline-led → install date guarantee. Support-led → 10-year warranty + monitoring app demo.',
          ],
        },
        {
          number: 3,
          title:
            '"Anyone you know who\'s had solar installed — what did they tell you?"',
          goal: 'Surface social proof gaps or biases.',
          instructions: [
            'WHY: Their existing knowledge frames everything. If their neighbour had a bad install, you need to address that ghost.',
            'GOOD ANSWER: Specific story.',
            'USE: If positive → reinforce. If negative → ask what went wrong + show how your process avoids it.',
          ],
        },
      ],
    },
  ],

  troubleshooting: [
    {
      problem: 'Customer is short-answer / monosyllabic',
      cause:
        'Trust not established yet, or they didn\'t expect this many questions.',
      fix:
        'Pause. Acknowledge: "I know that\'s a lot of questions — I ask them because every house is different and the worst thing I can do is design a system that doesn\'t fit you". Most open up.',
    },
    {
      problem:
        'Customer giving short answers to expand the call duration (wants out)',
      cause:
        'They\'ve mentally decided no, or they\'re shopping for a competitor.',
      fix:
        'Direct check: "Just sense-checking — is this a good time, or would later in the week be better?" Forces them to either commit or release you. Saves you 20 minutes.',
    },
    {
      problem: 'Decision-maker partner not on the call',
      cause:
        'Booked the appointment with only one half.',
      fix:
        'Don\'t quote. Instead: "I can spec this in 20 minutes but you\'d want your husband/wife on board first. Let me send you a rough range now and we\'ll book a 30-min joint call to finalise". Saves the re-pitch.',
    },
  ],

  relatedSystems: ['solaflow-mastery', 'highlevel-playbook'],
}
