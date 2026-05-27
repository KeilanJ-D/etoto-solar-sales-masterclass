import type { KnowledgeTopic } from '../types'

export const stringsAndMppt: KnowledgeTopic = {
  slug: 'strings-and-mppt',
  category: 'design',
  title: 'Strings, MPPTs and How to Stop a Single Panel Killing Your Yield',
  oneLineRule:
    'One MPPT runs one string at one operating voltage. If panels in the same string see different conditions — different orientations, partial shade, mixed wattages — the whole string is dragged down to the weakest panel.',
  intent:
    'For designers and surveying reps. The string layout is where 5 – 25% of a system\'s yearly yield is won or lost — and nobody on the doorstep ever talks about it.',
  estReadMinutes: 9,
  lastUpdated: '2026-05-27',
  longRule:
    'An MPPT (Maximum Power Point Tracker) is a circuit inside the inverter that continually adjusts the voltage at which it draws power from a string of panels, to hit the panels\' peak output for the conditions. Each MPPT runs ONE string independently. If two roof faces feed into one MPPT, the MPPT averages them and both lose efficiency. If a panel on a string is in shade, the whole string drops to that panel\'s output — because the panels are wired in series and current flows at the rate of the slowest panel. The fix is either: a separate MPPT per orientation, panel-level optimisers, or panels with built-in cell-level shade tolerance.',

  decisionFlow: {
    intro: 'Map every panel to a string. Then map every string to an MPPT. Then check for shade.',
    steps: [
      {
        question: '1. How many distinct roof orientations are you putting panels on?',
        options: [
          {
            label: '1 orientation (one clean face)',
            outcome:
              'One string, one MPPT. Any inverter works. Simplest, cheapest, highest yield per kW.',
            accent: 'emerald',
          },
          {
            label: '2 orientations (E/W split, or main roof + dormer)',
            outcome:
              'Need at least 2 MPPTs. Most hybrid inverters have 2 (FOX ESS H1, Sigenergy 5-6kW, Anker SOLIX X1, Bexie 1PH Hybrid). Each face gets its own string at its own operating voltage.',
            accent: 'blue',
          },
          {
            label: '3+ orientations',
            outcome:
              'Either a 3-MPPT inverter (Sigenergy 8-12kW, FOX ESS K-series 10kW three-phase), OR a 2-MPPT inverter with optimisers on the third orientation\'s panels, OR a 2-MPPT inverter with Aiko 510W All-Black panels on the awkward face.',
            accent: 'amber',
          },
        ],
      },
      {
        question: '2. Will any panel see shade at any time of day?',
        options: [
          {
            label: 'No shade anywhere',
            outcome:
              'Simple stringing. No optimisers needed.',
            accent: 'emerald',
          },
          {
            label: 'A few panels (1 – 3) shaded at certain hours',
            outcome:
              'Optimisers on just those panels (SolaFlow Extras, ~£45 trade each). Each shaded panel becomes independent so it doesn\'t drag the string.',
            accent: 'amber',
          },
          {
            label: 'Whole string sees rolling shade through the day',
            outcome:
              'Spec Aiko 510W All-Black panels — ABC cell-level bypass handles partial shade without external optimisers. ~£15/panel premium vs Aiko Neostar 470W, but saves £30 – 50 per panel on optimisers AND gives the all-black aesthetic.',
            accent: 'red',
          },
        ],
      },
      {
        question: '3. Are the panels you\'re mixing identical wattage?',
        options: [
          {
            label: 'Yes — single product, single batch',
            outcome:
              'Standard stringing. Match string lengths within MPPT voltage window.',
            accent: 'emerald',
          },
          {
            label: 'No — mixing two wattages (e.g. 415W roof, 440W roof)',
            outcome:
              'NEVER put mismatched panels on the same string. Even though they\'re close, the lower-wattage panel will throttle the higher one. Put each wattage on its own MPPT, or use optimisers.',
            accent: 'red',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Running East-facing and West-facing panels into one MPPT to "use the inverter\'s capacity".',
      whyItHappens:
        'Installer assumes the MPPT will "figure it out". It can\'t — physics, not software.',
      costOfMistake:
        'East string peaks in the morning at one voltage; West peaks in the afternoon at a different voltage. The MPPT compromises in the middle and both strings lose 15 – 25% yield.',
      fix:
        'Always one string per orientation. Use the second MPPT. If your inverter only has 1 MPPT, change the inverter — don\'t butcher the design.',
    },
    {
      mistake:
        'Putting a panel under a chimney shadow on the same string as 9 panels in full sun.',
      whyItHappens:
        'Surveyor didn\'t walk the loft, or installer didn\'t flag it in commissioning.',
      costOfMistake:
        'For the 2 – 3 hours/day that panel is shaded, the WHOLE 10-panel string drops to ~30% output. Cumulative annual loss: 8 – 12% of system yield.',
      fix:
        'Either move that panel onto a separate string/MPPT (if you have one spare), add an optimiser to JUST that panel (£40 trade + 30 min install), or swap that panel for an Aiko if the customer hasn\'t signed yet.',
    },
    {
      mistake:
        'Adding optimisers to every panel "for safety".',
      whyItHappens:
        'Risk-averse installer, or upsell pressure from supplier.',
      costOfMistake:
        '£40 – 60 per panel × 12 panels = £500 – 720 added to job cost. On an unshaded clean roof, this is pure waste — optimisers add their own ~1% efficiency drop.',
      fix:
        'Optimisers are SURGICAL. Use them on panels that NEED them. If 9 of 12 panels are clean, optimise just the 3 problem panels.',
    },
    {
      mistake:
        'Mixing 12 × 415W panels with 8 × 440W panels on the same string because the cable run was easier.',
      whyItHappens:
        'Installer ordered mixed batches to fill a job and routed by convenience.',
      costOfMistake:
        'The 440W panels are throttled to 415W output for the life of the system. ~£200/year of generation lost forever.',
      fix:
        'Separate strings or separate MPPTs. If the inverter doesn\'t support it, return the mixed batch and order matched panels. The reorder cost is less than the lifetime yield loss.',
    },
  ],

  maths: [
    {
      scenario: '12-panel E/W split system: 6 East, 6 West, single 2-MPPT inverter.',
      inputs: [
        { label: 'Panels', value: '12 × 415W (5 kWp total)' },
        { label: 'Inverter', value: '5 kW, 2 MPPTs' },
        { label: 'Roof split', value: 'East 6 / West 6' },
      ],
      steps: [
        {
          formula: 'String 1 → MPPT 1: 6 × 415W = 2.49 kWp East-facing',
          result: 'Operates at East peak voltage in AM, idles PM',
        },
        {
          formula: 'String 2 → MPPT 2: 6 × 415W = 2.49 kWp West-facing',
          result: 'Operates at West peak voltage in PM, idles AM',
        },
        {
          formula:
            'Inverter sees combined output: peaks ~4.2 kW (never both peak at once)',
          result: '5 kW inverter is correctly sized — never clipped',
        },
      ],
      outcome:
        'Yield: ~4,300 kWh/year (UK average for E/W 5 kWp). Same panels into one MPPT would yield ~3,400 kWh/year — a 21% difference from the stringing decision alone.',
    },
    {
      scenario:
        '14-panel single-orientation array with 2 panels shaded by neighbour\'s tree 14:00 – 17:00.',
      inputs: [
        { label: 'Panels', value: '14 × 415W = 5.81 kWp' },
        { label: 'Inverter', value: 'FOX ESS H1 5kW, 2 MPPTs' },
        { label: 'Shading', value: '2 panels, 3h/day, summer' },
      ],
      steps: [
        {
          formula: 'Option A: ALL 14 panels on one string, no optimisers',
          result:
            'For 3h/day, whole string runs at ~25% output. Daily loss: ~12 kWh on a summer day. Annual loss: ~1,000 kWh = £200/year.',
        },
        {
          formula: 'Option B: 12 clean panels on String 1; 2 shaded panels on String 2',
          result:
            'String 1 unaffected. String 2 runs at reduced output during shade only. Annual loss: ~150 kWh = £30/year.',
        },
        {
          formula:
            'Option C: All 14 on one string, optimisers on the 2 shaded panels (£80 added)',
          result:
            'Each shaded panel runs independently. Annual loss: ~100 kWh = £20/year.',
        },
      ],
      outcome:
        'Option B is FREE (just stringing logic). Option C costs £80 trade. Option A leaves £200/year on the table. The customer never sees this decision — but their 25-year yield does. £4,000 over the system lifetime.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer asks "what\'s an MPPT?" mid-quote.',
      lines: [
        {
          speaker: 'you',
          text: 'Good question — and most reps won\'t explain this properly. An MPPT is the brain inside your inverter that decides how to pull power out of your panels. Think of it like cruise control — it constantly adjusts so you\'re getting the maximum from the panels, second by second.',
        },
        {
          speaker: 'you',
          text: 'The reason it matters for your install specifically: your roof has the main south face and a smaller east face. Each one needs its own MPPT — its own cruise control — because they peak at different times of day. If we wired them together, they\'d fight each other and you\'d lose about 20% of your generation.',
        },
        {
          speaker: 'you',
          text: 'I\'ve spec\'d an inverter with two MPPTs so each face gets its own brain. That\'s why we\'re NOT just picking the cheapest inverter on the market.',
        },
      ],
      whyItWorks: [
        'Names a specific loss (20%) tied to a specific design decision.',
        'The cruise control analogy makes MPPTs intuitive.',
        'Pre-empts "why is your inverter more expensive than the other quote".',
      ],
    },
    {
      context: 'Customer has a chimney shadow on 2 panels and asks "what does that cost me?"',
      lines: [
        {
          speaker: 'you',
          text: 'Honest answer: if we ignore it, about £200 a year. If we fix it, about £80 one-time.',
        },
        {
          speaker: 'you',
          text: 'Here\'s the maths. Your panels are wired in a string — like Christmas lights. If one panel goes into shade, the whole string drops to that panel\'s output. So those two shaded panels would drag your other ten down for the 3 hours a day the chimney casts shadow.',
        },
        {
          speaker: 'you',
          text: 'We fix it one of two ways. Option one — and this costs nothing — we put those two panels on their own string. The other ten stay full power. Option two — we put a small device called an optimiser behind each shaded panel. £40 each. They become independent and the rest of the system never knows they\'re shaded. I\'d recommend option one because it\'s free, and we can spec the inverter to support it.',
        },
      ],
      whyItWorks: [
        'Quantifies the cost of the problem AND the fix.',
        'Offers a free solution first — builds trust.',
        'Names the technical mechanism (Christmas lights series) so they understand.',
      ],
    },
  ],

  relatedTopics: ['optimisers', 'panel-selection', 'inverter-sizing'],
}
