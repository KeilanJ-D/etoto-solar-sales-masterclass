import type { KnowledgeTopic } from '../types'

export const panelSelection: KnowledgeTopic = {
  slug: 'panel-selection',
  category: 'product',
  title: 'Panel Selection — The Six Brands in the SolaFlow Catalogue',
  oneLineRule:
    'Pick the panel for the roof, not the brochure. Clean south-facing roof → DMEGC or Jinko wins on £/kWh. Shade, premium aesthetic, or warranty-sensitive customer → Aiko or Bexie earn their premium.',
  intent:
    'For reps spec\'ing panels live with customers and back-office ordering teams. Knowing which panel goes where saves real money and unlocks confident upselling — all panels referenced here are in the SolaFlow catalogue and ready to quote.',
  estReadMinutes: 7,
  lastUpdated: '2026-05-27',
  longRule:
    'All Tier-1 panels in the SolaFlow catalogue (Aiko, Bexie, DMEGC, Eurener, Exiom, Jinko) are within 2 – 3% efficiency of each other (19.9 – 23.3%). The differences that actually matter are: (1) **shade tolerance** — Aiko 510W All-Black has ABC cell-level bypass built in; everyone else relies on the inverter or optimisers; (2) **warranty** — Eurener leads with 30-year performance, Bexie with 25-year product / 30-year performance; (3) **aesthetics** — Aiko 510W is all-black; (4) **origin** — Bexie, Exiom, Eurener are European-made; (5) **£/W** — DMEGC is cheapest, Aiko mid, Bexie/Eurener premium.',

  decisionFlow: {
    intro: 'Three questions, then you have your panel.',
    steps: [
      {
        question: '1. Does the roof have any shading or complex orientations?',
        options: [
          {
            label: 'Clean roof, no shade, one orientation',
            outcome:
              'DMEGC 450W or Jinko 460W. Tier-1, 25 – 30-year warranty, lowest £/kWp. ~£90 trade per panel.',
            accent: 'emerald',
          },
          {
            label: 'Some shade or complex orientations',
            outcome:
              'Aiko 510W All-Black. ABC cell-level shade tolerance handles partial shade without optimisers. ~£105 trade per panel.',
            accent: 'blue',
          },
          {
            label: 'Premium customer, design-led aesthetic priority',
            outcome:
              'Bexie 520W or Aiko 510W All-Black. Premium spec, premium price, premium look. Bexie also brings European-made + 30-year performance.',
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
              'Aiko, DMEGC, Jinko all offer 25-year performance warranty. Adequate for 95% of installs.',
            accent: 'emerald',
          },
          {
            label: 'High — customer asked about long-term warranty explicitly',
            outcome:
              'Eurener Nexa 500W: 30-year performance warranty (industry-leading). Bexie 520W: 25-year product + 30-year performance. Jinko 460W: 12-year product + 30-year performance. All three frame as "we backed it with the longest warranty in the industry".',
            accent: 'blue',
          },
        ],
      },
      {
        question: '3. Does the customer prioritise European-made?',
        options: [
          {
            label: 'Not a priority',
            outcome:
              'Aiko (China, ABC cells) is your default. Jinko or DMEGC for budget. Tesla\'s solar ecosystem if going premium.',
            accent: 'emerald',
          },
          {
            label: 'Strong preference for European-made',
            outcome:
              'Bexie 520W (flagship), Exiom 510W (mid), or Eurener Nexa 500W (warranty-led). All three give you the European story without dropping below Tier-1 spec.',
            accent: 'blue',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Quoting Aiko 510W on every job because "they\'re the best".',
      whyItHappens:
        'Rep got excited about ABC cell tech at a CPD event. Or supplier pushed them.',
      costOfMistake:
        '£15 – 20 per panel premium on installs that don\'t need shade tolerance. Loses competitive bids to DMEGC/Jinko at lower price.',
      fix:
        'Default to DMEGC or Jinko for clean roofs. Upgrade to Aiko 510W when shade, design, or warranty drives the decision. Bexie or Eurener for European-made requests.',
    },
    {
      mistake:
        'Mixing panel brands or wattages across the same array.',
      whyItHappens:
        'Stock ran out mid-job. Or installer thought "they\'re both 470W, same thing".',
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
        'Always tie the upgrade to a specific reason: "Aiko 510W for your shaded chimney face" or "Jinko 460W because your roof is clean and we\'re saving you £350 across 14 panels".',
    },
  ],

  maths: [
    {
      scenario:
        'Quote choice on a 6 kWp clean south-facing roof, no shade.',
      inputs: [
        { label: 'Roof', value: 'Single orientation, no shade, 14 panels' },
        { label: 'Customer', value: 'Cost-conscious, standard install' },
      ],
      steps: [
        {
          formula: 'DMEGC 450W: £90 trade × 14 = £1,260 panels',
          result: '6.3 kWp at £200/kWp panel cost',
        },
        {
          formula: 'Aiko Neostar 470W: £105 trade × 14 = £1,470 panels',
          result: '6.58 kWp at £223/kWp panel cost',
        },
        {
          formula: 'Difference: £210 + slightly higher kWp on Aiko (better £/kWp)',
          result: 'Net difference: £210 more for Aiko, 0.28 kWp extra',
        },
        {
          formula:
            'Energy yield difference on clean roof: <1% (within margin of error)',
          result: 'No performance reason to choose either',
        },
      ],
      outcome:
        'Both are valid. DMEGC wins on raw £. Aiko 470W wins on aesthetic + warranty + slightly higher output. For a cost-conscious customer on a clean roof, quote DMEGC and pocket the margin — or pass the saving on as a closing lever.',
    },
    {
      scenario:
        'Same 6 kWp roof, but 4 panels catch chimney shadow 13:00 – 16:00.',
      inputs: [
        { label: 'Roof', value: '14 panels, 4 shaded' },
        { label: 'Comparison', value: 'DMEGC + optimisers vs Aiko 510W All-Black' },
      ],
      steps: [
        {
          formula: 'DMEGC + 4 optimisers (£45 each): £1,260 panels + £180 optimisers = £1,440',
          result: '~£20/year shade loss remaining',
        },
        {
          formula: 'Aiko 510W All-Black all 14 panels: £15 premium × 14 = £210 vs Aiko Neostar baseline',
          result: '~£25/year shade loss remaining (ABC bypass is good but not optimiser-perfect)',
        },
        {
          formula: 'Aiko 510W total: £1,680 vs DMEGC+optimisers £1,440',
          result: 'DMEGC+optimisers is £240 cheaper — but Aiko gives the all-black look + simpler install',
        },
      ],
      outcome:
        'Both work. DMEGC + optimisers wins on raw £. Aiko 510W wins when the customer cares about aesthetic or wants the simpler spec. This is the textbook case where the optimiser-vs-Aiko decision is a customer-preference call, not a technical one.',
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
          text: 'For your roof specifically, I\'m recommending [DMEGC 450W for budget / Aiko Neostar 470W for the standard / Aiko 510W All-Black for aesthetic / Bexie 520W for European-made] because [reason tied to roof/shade/customer priority].',
        },
        {
          speaker: 'you',
          text: 'All the panels we install are Tier-1, meaning the manufacturer has a financial credit rating that says they\'ll still be around in 25 years to honour the warranty. That part is non-negotiable. The brand within Tier-1 is a fit-to-your-house decision.',
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
          text: 'Aiko is a genuinely clever panel. The 510W All-Black uses ABC — All Back Contact — cell technology, which means individual cells in shadow don\'t drag the whole panel down like they would on a traditional panel. That\'s real innovation, not marketing.',
        },
        {
          speaker: 'you',
          text: 'On your roof, is that worth the ~£15-per-panel premium? Let\'s look together. You\'ve got [X panels in shade / no shade]. If you\'ve got shade, the 510W All-Black earns its money — no question. If you don\'t, you\'re paying for tech you don\'t use, and Aiko 470W or DMEGC at the same efficiency saves you £200 across the array.',
        },
        {
          speaker: 'you',
          text: 'The other reason people pick the 510W is the look — all-black, sleek. If the aesthetic matters to you, that\'s a fair reason on its own.',
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
