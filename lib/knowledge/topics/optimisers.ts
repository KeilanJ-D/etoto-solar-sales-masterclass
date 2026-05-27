import type { KnowledgeTopic } from '../types'

export const optimisers: KnowledgeTopic = {
  slug: 'optimisers',
  category: 'product',
  title: 'Optimisers vs Bigger Inverter vs Aiko Panels — The £80 Decision',
  oneLineRule:
    'Optimisers are a surgical fix for specific panels in specific conditions. If you\'re adding them to every panel, you\'ve picked the wrong product. If you\'re adding none on a complex roof, you\'re leaving money on the table.',
  intent:
    'For the rep who needs to decide live on the doorstep: do I optimise, do I upgrade the inverter, or do I switch panel brand? Each has a £ answer.',
  estReadMinutes: 6,
  lastUpdated: '2026-05-27',
  longRule:
    'Optimisers sit behind individual panels and break each panel out of the series string. Each panel runs at its own optimal voltage so shaded or mismatched panels don\'t drag the rest. They cost £40 – 60 per panel trade. Three competing solutions: (1) a bigger inverter with more MPPTs (lets you split panels into more strings), (2) Aiko 510W All-Black panels which have ABC cell-level bypass built in (~£15 premium per panel vs DMEGC), or (3) clever stringing on a standard inverter to put problem panels on their own string. The right answer depends on how many panels have problems and how localised the shade is.',

  decisionFlow: {
    intro:
      'Count the panels with potential issues. Then read across.',
    steps: [
      {
        question: '1. How many panels have shading or mismatch issues?',
        options: [
          {
            label: '0 panels — clean roof',
            outcome:
              'No optimisers. No Aiko premium. Standard panels on standard inverter. Don\'t upsell what isn\'t needed.',
            accent: 'emerald',
          },
          {
            label: '1 – 3 panels',
            outcome:
              'Optimisers on JUST those panels (£45 trade each via SolaFlow Extras). Cheapest, most targeted fix.',
            accent: 'blue',
          },
          {
            label: '4 – 6 panels (one shaded face)',
            outcome:
              'Either: (a) optimisers on each (£200 – 280), OR (b) put them on their own MPPT/string if the inverter allows, OR (c) swap to Aiko on just that face. Run the £ for each.',
            accent: 'amber',
          },
          {
            label: '7+ panels OR rolling shade across the array',
            outcome:
              'Spec Aiko Neostar 510W All-Black on the full array. ABC cell-level shade tolerance built in. ~£15 premium per panel × 14 panels = £210 — cheaper than optimising 7+ panels and gives you the all-black aesthetic.',
            accent: 'red',
          },
        ],
      },
      {
        question: '2. Is the inverter you\'ve quoted 2-MPPT or 3-MPPT?',
        options: [
          {
            label: '2-MPPT (e.g. FOX ESS H1, Sigenergy 5-6kW, Anker SOLIX X1)',
            outcome:
              'You\'ve got 2 string circuits. If shade is localised to one face, dedicate one MPPT to the problem panels. Saves optimiser cost.',
            accent: 'emerald',
          },
          {
            label: '3-MPPT (e.g. Sigenergy 8-12kW, FOX ESS K-series 10kW three-phase)',
            outcome:
              'Maximum stringing flexibility. Usually avoids the need for optimisers entirely — even on complex roofs.',
            accent: 'emerald',
          },
        ],
      },
      {
        question: '3. What\'s the customer\'s priority — upfront cost or peak performance?',
        options: [
          {
            label: 'Upfront cost (entry installs)',
            outcome:
              'Smart stringing first, optimisers on problem panels only. Don\'t upsell Aiko unless shade is widespread.',
            accent: 'blue',
          },
          {
            label: 'Peak performance / minimal compromise (premium installs)',
            outcome:
              'Aiko panels across the board + 3-MPPT inverter. No optimisers needed. Highest yield, cleanest spec sheet, easy to justify the price.',
            accent: 'red',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Quoting SolarEdge optimisers on every panel by default.',
      whyItHappens:
        'Supplier kickback, or installer is risk-averse, or it\'s "what we\'ve always done".',
      costOfMistake:
        '14 panels × £55 trade = £770 added to a job that didn\'t need it. Plus SolarEdge locks you into their proprietary inverter ecosystem, which adds £400 vs an open-system hybrid.',
      fix:
        'Default to NO optimisers. Add them only on panels with documented shade. Use inverter-agnostic optimisers — they work with any system and cost less than proprietary ones.',
    },
    {
      mistake:
        'Selling Aiko panels because they\'re "the latest tech" without explaining when they actually help.',
      whyItHappens:
        'Sales rep heard "best panels" and ran with it.',
      costOfMistake:
        'Customer pays £15/panel premium for shade tolerance they don\'t need on a clean roof. Competitor with DMEGC or Jinko at lower price wins.',
      fix:
        'Aiko 510W All-Black is the right call when: (a) the roof has shade, (b) the customer is design-conscious (all-black look), or (c) you\'re bundling them to avoid optimiser cost on a complex roof. Otherwise DMEGC or Jinko are equal-or-better £/W for clean roofs.',
    },
    {
      mistake:
        'Forgetting to flag rapid shutdown / fire safety compliance when optimising.',
      whyItHappens:
        'UK doesn\'t mandate panel-level rapid shutdown like the US (NEC 690.12), so installers don\'t think about it.',
      costOfMistake:
        'Insurance and fire-brigade access conversations get awkward post-install. Customer feels mis-sold if it comes up at insurance renewal.',
      fix:
        'When optimising, mention rapid shutdown as a free safety benefit ("if there\'s ever a roof fire, the panels can be de-energised at the panel level"). Doesn\'t cost you anything to say — adds perceived value.',
    },
  ],

  maths: [
    {
      scenario: '14-panel roof, 3 panels shaded by chimney 13:00 – 16:00.',
      inputs: [
        { label: 'Panels', value: '14 × 470W = 6.58 kWp Aiko Neostar' },
        { label: 'Shaded panels', value: '3 (chimney shadow)' },
        { label: 'Inverter', value: 'FOX ESS H1 5kW, 2 MPPT' },
      ],
      steps: [
        {
          formula: 'Option A: Do nothing. All on one string.',
          result: 'Annual yield loss from shading: ~700 kWh = £140/year = £3,500 over 25 years.',
        },
        {
          formula: 'Option B: Optimisers on 3 shaded panels via SolaFlow Extras. £45 trade × 3 = £135 + 1h labour.',
          result:
            'Annual loss reduced to ~80 kWh = £16/year. Net saving: £124/year. Payback: <1 year.',
        },
        {
          formula:
            'Option C: Swap full array to Aiko 510W All-Black. £15 premium × 14 = £210.',
          result:
            'Annual loss reduced to ~100 kWh = £20/year. Net saving: £120/year. Payback: <6 months. BUT mixing panel brands voids most warranties — only viable on full-array swap.',
        },
        {
          formula: 'Option D: Put 3 shaded panels on String 2 (MPPT 2). £0 cost.',
          result:
            'String 1 (11 panels) untouched. String 2 (3 panels) runs at reduced output during shade only. Annual loss: ~150 kWh = £30/year. Net saving: £110/year forever, at zero cost.',
        },
      ],
      outcome:
        'Best answer: Option D (smart stringing). £0 spent, £110/year saved. If you can\'t string this way for some reason, Option B (£120 optimisers) is your fallback.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer asks "what are these optimiser things and why do I need them?"',
      lines: [
        {
          speaker: 'you',
          text: 'You probably don\'t — and that\'s the honest answer. Optimisers are small devices we put behind panels that have shading issues. They cost £40 a panel installed.',
        },
        {
          speaker: 'you',
          text: 'On your roof, I\'ve identified three panels that catch chimney shadow for about three hours a day. Without doing anything, those three panels would drag down your whole system during those hours. With optimisers, just those three become independent and the rest of the system carries on at full power.',
        },
        {
          speaker: 'you',
          text: 'So we\'re adding £120 to the job to save you about £140 a year, forever. It pays for itself in a year. The other 11 panels don\'t need them and I\'m not going to charge you for what you don\'t need.',
        },
      ],
      whyItWorks: [
        'Opens with "you probably don\'t need them" — disarms the upsell suspicion.',
        'Specific number (3 panels, £120, £140/year) builds credibility.',
        'Explicitly mentions NOT charging for what isn\'t needed — anchors trust.',
      ],
    },
    {
      context:
        'Customer compares your quote (DMEGC + optimisers) to competitor (Aiko 510W All-Black, no optimisers).',
      lines: [
        {
          speaker: 'you',
          text: 'Both are valid approaches — and the spec sheets land in the same place. Let me show you the difference.',
        },
        {
          speaker: 'you',
          text: 'Aiko panels have shade tolerance built into the cells themselves. They handle partial shade without external optimisers. So if your roof has shading, Aiko is genuinely a clean solution.',
        },
        {
          speaker: 'you',
          text: 'I\'ve quoted DMEGC panels with three optimisers on the chimney-shaded panels. The other 11 are clean — they don\'t need any help. So you\'re paying £135 for optimisers instead of £210 in Aiko premium across 14 panels. £75 saved, same end result.',
        },
        {
          speaker: 'you',
          text: 'If you prefer the look of Aiko\'s all-black design or the simpler spec, I can re-quote. The functional outcome is the same — it\'s a price-for-aesthetics question, not a performance one.',
        },
      ],
      whyItWorks: [
        'Acknowledges the competitor\'s spec is valid — never crap on the alternative.',
        'Shows the £ trade-off clearly (£120 vs £210).',
        'Hands the aesthetic decision back to the customer — they own the call.',
      ],
    },
  ],

  relatedTopics: ['strings-and-mppt', 'panel-selection', 'inverter-sizing'],
  embedToolSlug: 'optimiser-roi',
}
