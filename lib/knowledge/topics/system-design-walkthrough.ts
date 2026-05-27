import type { KnowledgeTopic } from '../types'

export const systemDesignWalkthrough: KnowledgeTopic = {
  slug: 'system-design-walkthrough',
  category: 'design',
  title: 'Full System Design Walkthrough — From Postcode to Spec Sheet',
  oneLineRule:
    'Design in this order: usage → battery → tariff fit → inverter → PV → stringing → DNO. Skip a step and you redesign the whole system.',
  intent:
    'For new reps and designers learning the order. Senior reps already do this in their head — this page makes it learnable.',
  estReadMinutes: 12,
  lastUpdated: '2026-05-27',
  longRule:
    'Most installers design from the roof inward — "how many panels fit, then what battery, then what inverter". That\'s backwards. The customer\'s usage pattern dictates the battery; the battery and tariff dictate the inverter; the inverter capacity and roof orientation dictate the PV; stringing and DNO compliance are the last checks. Designing in this order means you never have to start over because the inverter can\'t charge the battery fast enough or the DNO refuses your G99 application.',

  decisionFlow: {
    intro: 'Run through this every time. Every step has a default answer for an "average UK 4-bed".',
    steps: [
      {
        question: '1. What\'s the customer\'s annual electricity spend and usage pattern?',
        options: [
          {
            label: '£800 – £1,200/yr (~4,000 – 6,000 kWh)',
            outcome:
              'Standard UK 3 – 4 bed. Default starting point: 5 kWp PV + 10 kWh battery.',
            accent: 'emerald',
          },
          {
            label: '£1,200 – £2,500/yr (~6,000 – 12,000 kWh)',
            outcome:
              'Large 4-bed, heat pump household, or work-from-home + EV. Default: 6 – 8 kWp PV + 15 – 20 kWh battery.',
            accent: 'blue',
          },
          {
            label: '£2,500+/yr (12,000+ kWh)',
            outcome:
              'Heavy user. Heat pump + EV + pool/workshop. Default: 8 – 12 kWp PV + 20 – 30 kWh battery, 3-phase supply if available.',
            accent: 'red',
          },
        ],
      },
      {
        question: '2. Battery sizing — what fraction of daily use should it cover?',
        options: [
          {
            label: 'Customer wants to "just save money"',
            outcome:
              'Battery sized to cover ~70% of nightly use. Lets them avoid peak-rate evening pricing without overpaying for capacity they\'ll rarely cycle.',
            accent: 'emerald',
          },
          {
            label: 'Customer wants energy independence / minimal grid use',
            outcome:
              'Battery sized to cover 1.5 – 2× daily use. Catches surplus generation on sunny days, carries them through cloudy days.',
            accent: 'blue',
          },
          {
            label: 'Customer is on Octopus Go/Cosy/Intelligent and wants to game the tariff',
            outcome:
              'Battery sized to cover EVENING peak (16:00 – 19:00) + morning peak. ~60% of daily use is the sweet spot. Anything bigger doesn\'t pay back faster.',
            accent: 'red',
          },
        ],
      },
      {
        question: '3. Inverter — what dictates the size?',
        options: [
          {
            label: 'Battery off-peak charge speed (the usual answer)',
            outcome:
              'Inverter battery-side throughput = battery usable kWh ÷ off-peak hours × 1.1. See Battery + Inverter Pairing for the worked maths.',
            accent: 'amber',
          },
          {
            label: 'PV nameplate (for PV-only or small-battery systems)',
            outcome:
              'Inverter = PV kWp × 1.0 (or 0.85 – 1.0 for marginal cost saving).',
            accent: 'blue',
          },
          {
            label: 'Peak discharge for EV/heat-pump load',
            outcome:
              'Inverter discharge ≥ peak household draw. Usually 6 – 10 kW for EV+heat pump homes.',
            accent: 'red',
          },
        ],
      },
      {
        question: '4. PV size — driven by roof or by inverter?',
        options: [
          {
            label: 'Roof has space for more than the inverter can take',
            outcome:
              'Cap PV at 1.25× inverter AC capacity. Beyond that you\'re clipping too much to justify panel cost.',
            accent: 'blue',
          },
          {
            label: 'Roof is the limit, inverter has headroom',
            outcome:
              'Fill the roof. Inverter sized for battery throughput will easily absorb the PV.',
            accent: 'emerald',
          },
        ],
      },
      {
        question: '5. Stringing and MPPT plan',
        options: [
          {
            label: 'One orientation, no shade',
            outcome:
              'One string, one MPPT.',
            accent: 'emerald',
          },
          {
            label: 'Multiple orientations / partial shade',
            outcome:
              'Map panels to MPPTs FIRST. Then check if the inverter\'s MPPT count is enough. Upgrade inverter or add optimisers if not. See Strings + MPPT for the £ trade-offs.',
            accent: 'amber',
          },
        ],
      },
      {
        question: '6. DNO check — last but critical',
        options: [
          {
            label: 'Single-phase, inverter ≤ 3.68 kW',
            outcome:
              'G98 notification post-install. No delay.',
            accent: 'emerald',
          },
          {
            label: 'Single-phase, inverter > 3.68 kW',
            outcome:
              'G99 application submitted day of deposit. 4 – 6 week lead time. Communicate this to customer at quote stage.',
            accent: 'amber',
          },
          {
            label: '3-phase, inverter ≤ 11.04 kW total',
            outcome:
              'G98 — quick.',
            accent: 'emerald',
          },
          {
            label: '3-phase, inverter > 11.04 kW',
            outcome:
              'G99 — but usually quick approval on 3-phase. 2 – 4 weeks typical.',
            accent: 'blue',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Designing roof-first, then trying to retrofit a battery and inverter to whatever PV size fits.',
      whyItHappens:
        'Most design software defaults to roof-first. Habit.',
      costOfMistake:
        'PV is the easy part. Designing roof-first means inverter and battery get squeezed to fit budget after PV is fixed. Result: undersized inverter, smaller battery than the customer needed.',
      fix:
        'Quote process: usage → battery → tariff fit → inverter → PV. Use the OpenSolar tool to map panels at the END, not the start.',
    },
    {
      mistake:
        'Quoting before knowing the customer\'s tariff or willingness to switch.',
      whyItHappens:
        'Rep skipped the tariff question in discovery.',
      costOfMistake:
        'System is technically correct but financially suboptimal. Battery doesn\'t pay back as fast as quoted because customer is on a flat-rate tariff. ROI calc breaks.',
      fix:
        'Tariff is part of discovery. If they\'re on a flat tariff, sell the tariff change as part of the install — refer to Octopus partnership or similar.',
    },
    {
      mistake:
        'Forgetting to flag G99 at quote stage.',
      whyItHappens:
        'Rep doesn\'t know the limit. Or doesn\'t want to mention delays.',
      costOfMistake:
        'Customer signs expecting 4-week install. Reality: 8 – 10 weeks once G99 lands. Customer feels misled.',
      fix:
        'On every quote, name the install timeline including G99 wait if applicable. Honesty at quote stage = trust at install stage.',
    },
  ],

  maths: [
    {
      scenario:
        'Customer profile: £1,400/year spend, 4-bed, no EV yet (planning to get one), Octopus Cosy interested, single-phase, south + west roof with one chimney shadow.',
      inputs: [
        { label: 'Annual spend', value: '£1,400 at 21p/kWh = 6,667 kWh/year' },
        { label: 'Daily use', value: '~18 kWh/day average' },
        { label: 'Peak draw', value: '~4 kW evening (no EV yet)' },
        { label: 'Tariff', value: 'Will switch to Octopus Cosy (6h off-peak)' },
      ],
      steps: [
        {
          formula: 'Battery: 70% of daily use = 12.6 kWh',
          result: 'Spec 15 kWh battery (covers evening + small EV later)',
        },
        {
          formula: 'Inverter charge needed: 15 kWh ÷ 6h × 1.1 = 2.75 kW battery-side',
          result: 'Inverter ≥ 5 kW (covers charge + future EV discharge)',
        },
        {
          formula: 'PV: roof can fit 16 panels (south 10 + west 6). 16 × 415W = 6.64 kWp',
          result: 'Inverter check: PV 6.64 ÷ inverter 5 = DC:AC ratio 1.33 — slightly high',
        },
        {
          formula:
            'Adjust: 6 kW inverter (instead of 5 kW) to handle PV peak without excessive clipping',
          result: 'Spec: 6 kW hybrid inverter, 2 MPPTs (south + west)',
        },
        {
          formula:
            'Stringing: 10 south on MPPT 1, 6 west on MPPT 2. Chimney shadow on 2 of the south panels.',
          result: 'Add Tigo optimisers on the 2 shaded south panels (£80 trade)',
        },
        {
          formula: 'DNO: 6 kW single-phase > 3.68 kW → G99',
          result: '4-week lead time. Communicate to customer at quote.',
        },
      ],
      outcome:
        'Final spec: 6.64 kWp PV (16 × 415W Longi), 15 kWh battery (GivEnergy or equivalent), 6 kW hybrid inverter with 2 MPPTs, 2 Tigo optimisers on the chimney-shaded panels. G99 submitted day of deposit. Customer install timeline: 5 – 6 weeks from deposit. Estimated annual saving: £900 – £1,100.',
    },
  ],

  salesScripts: [
    {
      context: 'Customer asks "how do you design the system — what\'s your process?"',
      lines: [
        {
          speaker: 'you',
          text: 'Most installers start with your roof — they look at how many panels fit and reverse-engineer everything else to that. That\'s backwards, and it\'s how you end up with a great-looking system on paper that performs badly in real life.',
        },
        {
          speaker: 'you',
          text: 'I do it the other way. First, I look at how you actually use electricity — when you use the most, when you\'re out. That tells me how big the battery needs to be. Then I check your tariff or what tariff you\'re moving to — that tells me how fast the inverter needs to fill the battery overnight. Then I size the PV to match what the inverter can handle. Finally I check the roof to see if it all fits.',
        },
        {
          speaker: 'you',
          text: 'Doing it in that order means every part of the system is sized for how you actually live. No wasted capacity, no underperforming bits. That\'s what you\'re paying me for — that thinking, not just the panels.',
        },
      ],
      whyItWorks: [
        'Names the competitor\'s flaw (roof-first design) without naming the competitor.',
        'Positions you as the thinking partner, not the order-taker.',
        'Customer leaves understanding what they\'re actually paying for.',
      ],
    },
  ],

  relatedTopics: [
    'inverter-sizing',
    'battery-and-inverter',
    'strings-and-mppt',
    'single-vs-three-phase',
    'panel-selection',
    'optimisers',
  ],
  embedToolSlug: 'inverter-sizing',
}
