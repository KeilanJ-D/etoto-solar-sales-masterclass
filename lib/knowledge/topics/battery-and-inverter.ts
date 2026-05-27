import type { KnowledgeTopic } from '../types'

export const batteryAndInverter: KnowledgeTopic = {
  slug: 'battery-and-inverter',
  category: 'sizing',
  title: 'Battery + Inverter Pairing — Filling Storage Fast Without Waste',
  oneLineRule:
    'Inverter size is set by the SLOWER of two questions: how fast can the battery accept charge, and how fast does the customer need to use it. PV nameplate is the floor, not the ceiling.',
  intent:
    'For reps designing battery-led systems. The single biggest installer error in 2026 is putting a tiny inverter on a big battery and watching customers complain the battery "never fills up overnight".',
  estReadMinutes: 8,
  lastUpdated: '2026-05-27',
  longRule:
    'When a system has battery storage, the inverter has three jobs: feed the house from PV in real time, route surplus PV into the battery, and pull from grid into the battery during off-peak hours. The third job is usually the bottleneck. If your inverter can\'t move energy fast enough during the 4 – 6 hour overnight cheap window, the customer pays peak rates the rest of the day. The PV nameplate barely matters — battery throughput dictates the spec.',

  decisionFlow: {
    intro: 'Walk through these in order. The answer to question 3 usually sets the inverter size.',
    steps: [
      {
        question: '1. What battery (kWh) is the customer getting?',
        options: [
          {
            label: '5 – 10 kWh (entry level)',
            outcome:
              'Standard hybrid inverter at PV size is fine. 5 kW inverter happily fills a 10 kWh battery in 3 – 5 hours overnight.',
            accent: 'emerald',
          },
          {
            label: '10 – 20 kWh (typical 2026 UK install)',
            outcome:
              'Inverter should be at least 5 kW, ideally 6 – 8 kW for fast off-peak charging.',
            accent: 'blue',
          },
          {
            label: '20 kWh+ (large home, EV-coupled, off-grid lean)',
            outcome:
              'Stack hybrid inverters OR use a single high-output unit (Sigenergy 10 – 25 kW, Fox H3-Pro, etc). Battery throughput drives the conversation entirely.',
            accent: 'red',
          },
        ],
      },
      {
        question: '2. What tariff is the customer on (or moving to)?',
        options: [
          {
            label: 'Octopus Go — 4h cheap rate (00:30 – 04:30)',
            outcome:
              'Minimum charge rate needed = battery kWh ÷ 4. For a 15 kWh battery you need 3.75 kW battery-side throughput. Spec accordingly.',
            accent: 'amber',
          },
          {
            label: 'Octopus Cosy — 6h cheap rate (split across day)',
            outcome:
              'More breathing room. 15 kWh battery needs 2.5 kW battery-side throughput minimum.',
            accent: 'emerald',
          },
          {
            label: 'Octopus Intelligent / Flux',
            outcome:
              'Variable — but battery cycles harder. Spec for worst case (6 kW+ battery throughput on larger banks).',
            accent: 'blue',
          },
          {
            label: 'Standard variable tariff',
            outcome:
              'Sell them the tariff change as part of the install. Without a cheap off-peak rate, the battery ROI halves. This is a sales win — they save more, you upsell a bigger system.',
            accent: 'amber',
          },
        ],
      },
      {
        question: '3. Is the home running heat pump, EV, or both during peak hours?',
        options: [
          {
            label: 'No — just normal household load',
            outcome:
              'Inverter discharge rate of 3 – 5 kW handles peak draw. Spec for charge speed, not discharge.',
            accent: 'emerald',
          },
          {
            label: 'EV charging during peak',
            outcome:
              'EV pulls 7.4 kW. Battery alone can\'t cover it on most inverters — spec a 6 – 8 kW inverter to maximise battery contribution, with grid topping up.',
            accent: 'amber',
          },
          {
            label: 'Heat pump + EV in peak window',
            outcome:
              'Need 8 – 10 kW continuous discharge. Single-phase: stack two inverters or go 3-phase install. Three-phase: 10 kW hybrid is your spec.',
            accent: 'red',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        '15 kWh battery + 3.6 kW single-phase inverter on Octopus Go.',
      whyItHappens:
        'Installer maximised PV-to-inverter ratio without thinking about charge throughput. Or chose the cheapest hybrid inverter on the shelf.',
      costOfMistake:
        'Battery takes 5+ hours to fill — overruns the 4-hour cheap window. Customer pays standard rate for ~25% of the daily charge cycle. ROI calculation breaks. Customer calls every month to complain.',
      fix:
        'Spec a 5 kW or 6 kW hybrid (even on a small PV). Cost difference: ~£300. Customer happiness: priceless.',
    },
    {
      mistake:
        'Spec\'ing battery throughput from PV nameplate alone.',
      whyItHappens:
        'OpenSolar auto-sizes inverter at 1:1 with PV by default.',
      costOfMistake:
        'Big batteries on small PVs end up undersized inverter-side. PV looks balanced on paper but battery performance is gutted.',
      fix:
        'Run the formula `MAX(PV_kWp × 1.0, BatteryKWh ÷ OffPeakHours × 1.1)` and pick the bigger number. Override OpenSolar\'s default if needed.',
    },
    {
      mistake:
        'AC-coupling a battery to an existing PV-only inverter to "add storage cheaply".',
      whyItHappens:
        'Customer already has solar, doesn\'t want to replace the inverter, retrofit installer pushes the easy option.',
      costOfMistake:
        'AC-coupled efficiency: ~84%. DC-coupled hybrid: 95%+. On a 10 kWh battery cycling daily, that\'s ~400 kWh/year wasted as heat — about £100/year forever.',
      fix:
        'For new installs, always DC-couple via hybrid. For retrofits, do the AC-coupled vs hybrid-replacement maths over 10 years — usually the hybrid replacement wins.',
    },
    {
      mistake:
        'Selling "10 kWh of battery" without specifying USABLE capacity.',
      whyItHappens:
        'Manufacturers quote nominal. EcoFlow 5 kWh = 4.8 kWh usable. Sigenergy 10 kWh = 8.76 kWh usable.',
      costOfMistake:
        'Customer expects 10 kWh, gets 8.76 kWh, accuses you of mis-selling.',
      fix:
        'Always say "8.76 kWh usable from a 10 kWh nominal battery" on the quote. Truth wins. Plus you look more technical than the competitor.',
    },
  ],

  maths: [
    {
      scenario: '11.52 kWh FOX ESS EP12 battery on Octopus Go (4h cheap window).',
      inputs: [
        { label: 'Battery nominal', value: '12 kWh' },
        { label: 'Battery usable', value: '11.2 kWh (DoD 93%)' },
        { label: 'Off-peak window', value: '00:30 – 04:30 (4 hours)' },
        { label: 'PV', value: '4 kWp' },
      ],
      steps: [
        {
          formula: 'Min charge rate = 11.2 kWh ÷ 4 h × 1.1 (safety) = 3.08 kW',
          result: 'Battery-side throughput ≥ 3.08 kW',
        },
        {
          formula: 'PV check: 4 kWp × 1.0 = 4 kW. Max(3.08, 4) = 4 kW.',
          result: 'Inverter minimum = 4 kW. Spec the 5 kW for headroom.',
        },
        {
          formula: 'DNO: 5 kW single-phase > 3.68 kW → G99 required.',
          result: 'Build into install timeline.',
        },
      ],
      outcome:
        'Spec: FOX ESS H1 5kW hybrid + 2 × FOX ESS EP6 (11.52 kWh). Charges 11.52 kWh in ~3 hours from grid. PV harvest matched 1:1. Customer never sees a peak-rate charge cycle. Alternative: Anker SOLIX X1 5kW + 2 × X1 5kWh battery.',
    },
    {
      scenario:
        '20 kWh Sigenergy stack + 6 kWp PV + EV charger, 3-phase house.',
      inputs: [
        { label: 'Battery nominal', value: '20 kWh' },
        { label: 'Battery usable', value: '17.5 kWh' },
        { label: 'Tariff', value: 'Octopus Cosy — 6h off-peak' },
        { label: 'EV', value: '7.4 kW charger, used 17:00 – 22:00' },
      ],
      steps: [
        {
          formula: 'Charge rate = 17.5 ÷ 6 × 1.1 = 3.21 kW',
          result: 'OK on a small inverter — but the EV is the bottleneck.',
        },
        {
          formula: 'Peak discharge needed = 7.4 kW EV + 1.5 kW house = 8.9 kW.',
          result: 'Inverter must discharge 8 – 9 kW.',
        },
        {
          formula:
            '3-phase: 8 kW per phase = 2.67 kW. Well within G98 limits.',
          result: 'No G99 paperwork on most DNOs.',
        },
      ],
      outcome:
        'Spec: Sigenergy SigenStor 8 kW hybrid (3-phase). Battery covers full EV charge for ~2 hours, grid finishes the last bit. Customer sees zero peak-rate EV charging. Annual saving: ~£800 vs grid-charged EV at peak.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer says "I just want a big battery, do I need a big inverter to match?"',
      lines: [
        {
          speaker: 'you',
          text: 'Yes — and this is where most installers get it wrong, so let me walk you through it. The battery itself doesn\'t move energy. The inverter does. So if you\'ve got a big battery and a small inverter, you\'ve bought a swimming pool with a garden hose to fill it.',
        },
        {
          speaker: 'you',
          text: 'Your tariff has a 4-hour cheap window overnight. For a 15 kWh battery to fully fill in that window, your inverter needs to move at least 4 kW from grid into battery. A standard 3.6 kW inverter can\'t do it — and that means every morning, the last bit of your battery charges at the expensive rate.',
        },
        {
          speaker: 'you',
          text: 'So in your case I\'d spec a 6 kW hybrid inverter. It costs £350 more upfront but it pays itself back in 18 months just on avoided peak charging. After that, it\'s pure saving for the next 10 years.',
        },
      ],
      whyItWorks: [
        'The swimming pool/garden hose analogy is sticky — they\'ll repeat it.',
        'Anchors the £350 upgrade to a specific payback window (18 months).',
        'Frames you as the person who sweats the maths, not just sells boxes.',
      ],
    },
    {
      context:
        'Customer pushes back: "the competitor said I only need a 3.6 kW inverter."',
      lines: [
        {
          speaker: 'you',
          text: 'They\'re not wrong technically — a 3.6 kW inverter will work. It just won\'t fill your battery in your off-peak window. Did they tell you what tariff they\'ve assumed in their quote?',
        },
        {
          speaker: 'customer',
          text: 'They didn\'t mention a tariff.',
        },
        {
          speaker: 'you',
          text: 'That\'s your answer. Without designing around your tariff, the inverter is just a number on a spec sheet. We design around how you actually want to use the system. Once you tell me what tariff you\'re on or moving to, I can show you exactly how long the battery takes to charge — and you can compare like-for-like with their quote.',
        },
      ],
      whyItWorks: [
        'Doesn\'t call the competitor wrong — calls them incomplete.',
        'Reframes the conversation from product spec to outcome.',
        'Forces a follow-up where you control the maths.',
      ],
    },
  ],

  relatedTopics: ['inverter-sizing', 'panel-selection', 'single-vs-three-phase'],
  embedToolSlug: 'inverter-sizing',
}
