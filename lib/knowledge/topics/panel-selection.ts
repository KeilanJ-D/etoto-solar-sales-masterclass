import type { KnowledgeTopic } from '../types'

export const panelSelection: KnowledgeTopic = {
  slug: 'panel-selection',
  category: 'product',
  title: 'Panel Selection — Aiko vs Longi vs JA Solar vs Trina',
  oneLineRule:
    'Pick the panel for the roof, not the brochure. For a clean south-facing roof, the cheapest tier-1 panel wins on £/kWh. For shaded or premium installs, Aiko\'s cell-level bypass earns its price premium.',
  intent:
    'For reps spec\'ing panels live with customers and back-office ordering teams. Knowing which panel goes where saves real money and unlocks confident upselling.',
  estReadMinutes: 7,
  lastUpdated: '2026-05-27',
  longRule:
    'All major tier-1 panels in 2026 are within 2 – 3% efficiency of each other (21 – 23%). The differences that actually matter are: (1) shade tolerance — Aiko has cell-level bypass built in; everyone else relies on the inverter or optimisers; (2) warranty — Aiko gives 15-year product / 30-year performance; most others give 12/25; (3) aesthetics — Aiko Neostar 2P is all-black, premium-look; (4) availability — JA Solar and Longi are the most reliably stocked in UK trade; (5) £/W — Trina and Longi are cheapest, Aiko is ~10 – 15% more.',

  decisionFlow: {
    intro: 'Three questions, then you have your panel.',
    steps: [
      {
        question: '1. Does the roof have any shading or complex orientations?',
        options: [
          {
            label: 'Clean roof, no shade, one orientation',
            outcome:
              'Longi Hi-MO 6 or JA Solar Deep Blue. Best £/W, tier-1, easy install. ~£90 trade per 415W panel.',
            accent: 'emerald',
          },
          {
            label: 'Some shade or complex orientations',
            outcome:
              'Aiko Neostar 2P. Cell-level shade tolerance avoids optimiser cost. ~£105 trade per 440W panel.',
            accent: 'blue',
          },
          {
            label: 'Premium customer, design-led aesthetic priority',
            outcome:
              'Aiko Comet (all-black, frameless look) or Solar Edge Sunpower-equivalent. Premium spec, premium price.',
            accent: 'red',
          },
        ],
      },
      {
        question: '2. What\'s the customer\'s warranty sensitivity?',
        options: [
          {
            label: 'Standard (most customers)',
            outcome:
              'Tier-1 standard panels offer 12-year product, 25-year performance warranty. Adequate.',
            accent: 'emerald',
          },
          {
            label: 'High — customer asked about long-term warranty explicitly',
            outcome:
              'Aiko: 15-year product, 30-year performance. Trina Vertex S+: 25-year product, 30-year performance. Both upsell into a "we backed it with the longest warranty in the industry" frame.',
            accent: 'blue',
          },
        ],
      },
      {
        question: '3. Margin/turnover priority for this install?',
        options: [
          {
            label: 'Volume install, tight margin',
            outcome:
              'Longi or JA Solar. Available, predictable, reliable.',
            accent: 'emerald',
          },
          {
            label: 'Premium install, customer pays for quality',
            outcome:
              'Aiko + 3-phase inverter + Sigenergy battery. Highest-spec stack you can sell. Margin per panel is bigger AND customer feels they bought the best.',
            accent: 'red',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Quoting Aiko on every job because "they\'re the best".',
      whyItHappens:
        'Rep got excited about Aiko at a CPD event. Or supplier pushed them.',
      costOfMistake:
        '£15 – 20 per panel premium on installs that don\'t need shade tolerance. Loses competitive bids to Longi/JA Solar at lower price.',
      fix:
        'Default to Longi/JA Solar. Upgrade to Aiko when shade, design, or warranty drives the decision.',
    },
    {
      mistake:
        'Mixing panel brands or wattages across the same array.',
      whyItHappens:
        'Stock ran out mid-job. Or installer thought "they\'re both 415W, same thing".',
      costOfMistake:
        'Voids most manufacturer warranties. Different wattage on same string = whole string throttled. Different brands = different electrical characteristics = MPPT confusion.',
      fix:
        'Same panel, same batch, same string. If stock fails, delay the install or swap the whole roof to alternative product — never mix.',
    },
    {
      mistake:
        'Selling "premium panels" without naming why they\'re premium for THIS customer.',
      whyItHappens:
        'Vague upselling.',
      costOfMistake:
        'Customer pays £200 more, doesn\'t see a benefit, leaves Trustpilot review saying "felt upsold".',
      fix:
        'Always tie the upgrade to a specific reason: "Aiko for your shaded chimney face" or "Longi because your roof is clean and we\'re saving you £350 across 14 panels".',
    },
  ],

  maths: [
    {
      scenario:
        'Quote choice on a 6 kWp clean south-facing roof, no shade.',
      inputs: [
        { label: 'Roof', value: 'Single orientation, no shade, 15 panels' },
        { label: 'Customer', value: 'Cost-conscious, standard install' },
      ],
      steps: [
        {
          formula: 'Longi Hi-MO 6 415W: £90 trade × 15 = £1,350 panels',
          result: '6.225 kWp at £216/kWp panel cost',
        },
        {
          formula: 'Aiko Neostar 2P 440W: £105 trade × 14 = £1,470 panels',
          result: '6.16 kWp at £239/kWp panel cost',
        },
        {
          formula: 'Difference: £120 + 1 fewer panel install (£35 labour saved on Aiko)',
          result: 'Net difference: £85 in favour of Aiko',
        },
        {
          formula:
            'Energy yield difference on clean roof: <1% (within margin of error)',
          result: 'No performance reason to choose either',
        },
      ],
      outcome:
        'Both are valid. Longi wins on raw £. Aiko wins on aesthetic + warranty. For a cost-conscious customer on a clean roof, quote Longi and pocket the margin — or pass the saving on as a closing lever.',
    },
    {
      scenario:
        'Same 6 kWp roof, but 4 panels catch chimney shadow 13:00 – 16:00.',
      inputs: [
        { label: 'Roof', value: '15 panels, 4 shaded' },
        { label: 'Comparison', value: 'Longi + optimisers vs Aiko' },
      ],
      steps: [
        {
          formula: 'Longi + 4 Tigo optimisers: £1,350 panels + £160 optimisers = £1,510',
          result: '~£20/year shade loss remaining',
        },
        {
          formula: 'Aiko Neostar 2P all 14 panels: £1,470',
          result: '~£25/year shade loss remaining (cell-level bypass is good but not optimiser-perfect)',
        },
        {
          formula: 'Difference: £40 in favour of Aiko',
          result: 'Aiko wins on cost AND simplicity',
        },
      ],
      outcome:
        'Aiko is the right call here. Cheaper than Longi+optimisers, simpler install, longer warranty. This is the textbook scenario where Aiko earns its premium.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer asks "what panels do you use, why?"',
      lines: [
        {
          speaker: 'you',
          text: 'It depends on your roof — that\'s the honest answer. I don\'t have a single brand I push on every job, because the right panel for your house might be the wrong panel for the next.',
        },
        {
          speaker: 'you',
          text: 'For your roof specifically, I\'m recommending [Longi Hi-MO 6 / Aiko Neostar / etc] because [reason tied to roof/shade/customer priority].',
        },
        {
          speaker: 'you',
          text: 'All the panels I quote are tier-1, meaning the manufacturer has a financial credit rating that says they\'ll still be around in 25 years to honour the warranty. That part is non-negotiable. The brand within tier-1 is a fit-to-your-house decision.',
        },
      ],
      whyItWorks: [
        'Doesn\'t lock you to one brand — flexibility = pricing power.',
        'Tier-1 framing positions any panel you quote as safe.',
        'Forces you to actually justify the spec, which forces you to know the spec.',
      ],
    },
    {
      context: 'Customer asks specifically about Aiko (they read about it online).',
      lines: [
        {
          speaker: 'you',
          text: 'Aiko is a good panel. It\'s the only mainstream panel right now with cell-level shade tolerance built in — which means individual cells in shadow don\'t drag the whole panel down. That\'s genuinely clever.',
        },
        {
          speaker: 'you',
          text: 'On your roof, is that worth the ~£15-per-panel premium? Let\'s look together. You\'ve got [X panels in shade / no shade]. If you\'ve got shade, Aiko earns its money — no question. If you don\'t, you\'re paying for tech you don\'t use, and Longi at the same efficiency saves you £200 across the array.',
        },
        {
          speaker: 'you',
          text: 'The other reason people pick Aiko is the look — all-black, sleek. If the aesthetic matters to you, that\'s a fair reason on its own.',
        },
      ],
      whyItWorks: [
        'Validates the customer\'s research (don\'t dismiss what they read).',
        'Reframes "best panel" as "right panel for this roof".',
        'Hands the price-vs-aesthetic call to them, which builds ownership.',
      ],
    },
  ],

  relatedTopics: ['optimisers', 'strings-and-mppt'],
}
