import type { KnowledgeTopic } from '../types'

export const inverterSizing: KnowledgeTopic = {
  slug: 'inverter-sizing',
  category: 'sizing',
  title: 'How to Size an Inverter for a PV System',
  oneLineRule:
    'Match PV nameplate to inverter at a 1.0 – 1.25 DC:AC ratio. Go bigger only if you have batteries to fill or shading that limits peak output.',
  intent:
    'For designers using OpenSolar, Easy-PV or similar — and reps quoting on the doorstep. Get this wrong and you either waste the customer\'s money or strangle the system they paid for.',
  estReadMinutes: 7,
  lastUpdated: '2026-05-27',
  longRule:
    'In the UK, peak irradiance only hits PV panels for a handful of hours a year. Sizing the inverter at exactly the PV nameplate (1.0:1) means you almost never clip. Sizing the inverter slightly smaller than the PV (1.1 – 1.25 DC:AC) clips a few sunny midday hours but harvests more energy in shoulder conditions. Going bigger than the PV makes sense when you have battery storage to fill, future expansion planned, or a hybrid inverter you\'re using to charge the battery from grid at off-peak rates.',

  decisionFlow: {
    intro: 'Three questions to land the inverter size in under a minute.',
    steps: [
      {
        question: '1. Is the property single-phase or three-phase?',
        options: [
          {
            label: 'Single-phase',
            outcome:
              'Hard ceiling at 3.68 kW (16A) inverter without DNO permission (G98). Above that you need a G99 application — most DNOs approve up to ~11 kW single-phase but can throttle you. Plan for the application timeline.',
            accent: 'amber',
          },
          {
            label: 'Three-phase',
            outcome:
              'You can comfortably specify up to ~17 kW per phase. Always use a 3-phase inverter on a 3-phase supply — it balances loads, avoids voltage rise on one leg, and unlocks bigger systems without G99 headaches at lower sizes.',
            accent: 'emerald',
          },
        ],
      },
      {
        question: '2. Are you fitting a battery?',
        options: [
          {
            label: 'No battery (PV-only)',
            outcome:
              'Size inverter at 0.85 – 1.0 of PV nameplate. A 5 kWp PV with a 5 kW or 4.6 kW inverter is the sweet spot. Clipping in midday peaks is fine — you harvest more energy across the whole year.',
            accent: 'blue',
          },
          {
            label: 'Battery, customer prioritises self-use',
            outcome:
              'Match inverter to PV (1:1). The hybrid inverter funnels excess generation into the battery DC-coupled at 95%+ efficiency. No need to oversize.',
            accent: 'emerald',
          },
          {
            label: 'Battery, big bank (15 kWh+) or future expansion',
            outcome:
              'Oversize the inverter relative to PV. Example: 4 kWp PV + 20 kWh battery → 8 kW or 10 kW hybrid inverter so you can charge the battery hard from cheap off-peak grid (Octopus Go/Cosy/Intelligent) and discharge fast at peak.',
            accent: 'red',
          },
        ],
      },
      {
        question: '3. Any shading or mixed orientations?',
        options: [
          {
            label: 'Single clean roof, no shading',
            outcome:
              'One inverter, one MPPT, one string is all you need. Cheapest, cleanest install.',
            accent: 'emerald',
          },
          {
            label: 'Two roofs (E/W or split arrays)',
            outcome:
              'Need an inverter with at least 2 MPPTs so each string can run at its own peak voltage. Almost every hybrid inverter has 2 MPPTs. Confirm before quoting.',
            accent: 'blue',
          },
          {
            label: 'Three+ orientations or any panel-level shading',
            outcome:
              'Either step up to a 3-MPPT inverter, OR add panel-level optimisers, OR specify Aiko panels (cell-level shade tolerance built in). See the Optimisers page for the £ decision.',
            accent: 'amber',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Spec\'ing an 8 kW inverter on a 4 kWp PV system "to leave room for expansion" — with no battery.',
      whyItHappens:
        'Reps confuse PV-only design with hybrid/battery design. They want to look future-proof.',
      costOfMistake:
        'Customer pays for inverter capacity they will never use. Inverter runs in low-efficiency band most of the day. You look like you\'re overselling.',
      fix:
        'PV-only: match inverter to PV. If they want future-proofing, sell them the bigger PV instead (panels are cheap, inverters aren\'t).',
    },
    {
      mistake:
        'Putting a 5 kW single-phase inverter on a property without checking the DNO has been notified.',
      whyItHappens:
        'Installer assumes G98 (3.68 kW limit) is "fine to ignore" because they\'ve never been caught.',
      costOfMistake:
        'DNO can disconnect the install retroactively. Insurance void. Customer sees commission flagged. You lose MCS certification.',
      fix:
        'Anything above 3.68 kW single-phase → submit G99 before the install. 4 – 6 weeks lead time. Build it into your quote timeline.',
    },
    {
      mistake:
        'Using a 3.6 kW inverter on a 6 kWp PV system to "stay under DNO limit" — without telling the customer they\'re losing 40% of their generation.',
      whyItHappens:
        'Trying to avoid G99 paperwork.',
      costOfMistake:
        'Customer realises in summer they\'re generating half what they expected. Refund, install rework, Trustpilot review.',
      fix:
        'Either submit G99 (and explain the timeline at quote stage), or right-size the PV to match the inverter limit honestly.',
    },
    {
      mistake:
        'Quoting a 5 kW hybrid inverter for a 15 kWh battery without checking the inverter\'s battery charge rate.',
      whyItHappens:
        'Spec sheet skimming. Many 5 kW inverters cap battery charge at 3 kW or less.',
      costOfMistake:
        'Battery takes 5+ hours to fill from cheap overnight tariff window. Customer can\'t finish charge before the cheap rate ends.',
      fix:
        'For overnight charging, the inverter\'s battery-side power rating needs to be at least kWh ÷ off-peak hours. 15 kWh in a 4-hour Octopus Go window = 3.75 kW minimum on the battery side. Many cases need a 6 – 8 kW inverter just for charge speed.',
    },
  ],

  maths: [
    {
      scenario: '5 kWp PV-only system, single-phase, no battery, south-facing clean roof.',
      inputs: [
        { label: 'PV nameplate', value: '5 kWp (12 × 415W panels)' },
        { label: 'Phase', value: 'Single-phase' },
        { label: 'Battery', value: 'None' },
        { label: 'Shading', value: 'None' },
      ],
      steps: [
        {
          formula: 'DC:AC ratio target = 1.0 – 1.15',
          result: 'Inverter size = 4.6 kW or 5 kW',
          explanation:
            'A 4.6 kW inverter clips midday peaks for ~30 hours a year — total annual loss <1%. Saves £150 vs the 5 kW model.',
        },
        {
          formula: 'DNO check: 4.6 kW > 3.68 kW limit',
          result: 'G99 application required',
          explanation: 'Build 4 weeks into your install timeline.',
        },
      ],
      outcome:
        'Spec: Solis S6-GR1P5K or Solax X1-Mini-G4 5kW. Both single-phase, single MPPT, ~£800 trade. G99 submitted day of deposit.',
    },
    {
      scenario:
        '8 kWp PV + 20 kWh Sigenergy battery, three-phase, customer on Octopus Cosy.',
      inputs: [
        { label: 'PV nameplate', value: '8 kWp (20 × 415W)' },
        { label: 'Phase', value: 'Three-phase' },
        { label: 'Battery', value: '20 kWh, max 12 kW charge rate' },
        { label: 'Tariff', value: 'Octopus Cosy — 6h off-peak' },
      ],
      steps: [
        {
          formula:
            'Charge rate needed = 20 kWh ÷ 6 h off-peak = 3.33 kW MINIMUM. But customer also discharges at peak (4 – 7 PM): need 4 – 5 kW discharge.',
          result: 'Battery-side power ≥ 5 kW',
          explanation: 'Drives the inverter spec, not the PV.',
        },
        {
          formula: 'Inverter size = max(PV nameplate × 0.9, battery power × 1.2)',
          result: 'Inverter size = max(7.2 kW, 6 kW) = 8 kW',
          explanation: 'PV-driven, but battery rate ratifies it.',
        },
        {
          formula: '3-phase, 8 kW per phase = 2.67 kW. Well within G98.',
          result: 'No G99 needed on most DNOs.',
        },
      ],
      outcome:
        'Spec: Sigenergy Sigen Energy Controller 8.0 (3-phase, 12 kW battery rate, 2 MPPT). Full PV harvest + fast battery cycling on cheap grid. Customer can run heat pump on peak from battery alone.',
    },
    {
      scenario:
        '4 kWp PV + 10 kWh battery on Octopus Go, single-phase, customer wants overnight EV charging from battery.',
      inputs: [
        { label: 'PV nameplate', value: '4 kWp' },
        { label: 'Battery', value: '10 kWh' },
        { label: 'Tariff', value: 'Octopus Go — 4h off-peak (00:30 – 04:30)' },
        { label: 'Use case', value: 'Fill battery overnight, run EV charge in morning peak' },
      ],
      steps: [
        {
          formula: 'Battery charge: 10 kWh ÷ 4 h = 2.5 kW minimum',
          result: 'Battery-side power ≥ 2.5 kW',
        },
        {
          formula:
            'EV pull during 04:30 – 07:30 peak: 7.4 kW EV charger needs 7.4 kW from battery OR battery + grid.',
          result: 'Inverter discharge ≥ 5 kW (battery does what it can, grid tops up)',
        },
        {
          formula: 'Inverter sizing: PV (4 kW) is the floor; battery use case sets the ceiling.',
          result: 'Spec a 6 kW hybrid inverter',
          explanation:
            'PV harvest is fine, battery charge fills in 4 h, peak discharge supports EV. DC:AC ratio = 0.67 (inverter bigger than PV) — that\'s correct here because battery is doing the work.',
        },
      ],
      outcome:
        'Spec: GivEnergy Gen3 6kW hybrid OR Solis S6-EH1P-6K. Battery fills overnight, EV pulls from battery in AM. PV adds 3,500 kWh/year on top.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer asks "why have you spec\'d a 5 kW inverter on a 5 kW system, why not bigger?"',
      lines: [
        {
          speaker: 'you',
          text: 'Great question — the inverter is the gearbox of your solar system. If we put in a bigger gearbox than the engine can drive, you\'re paying for capacity you\'ll never use.',
        },
        {
          speaker: 'you',
          text: 'Your panels will peak at 5 kW on the sunniest day of the year — maybe 30 hours a year total. The rest of the time they\'re generating 2 – 3 kW. So a 5 kW inverter handles it perfectly, and you don\'t spend an extra £400 on inverter capacity that sits idle.',
        },
        {
          speaker: 'you',
          text: 'Now — if you\'re thinking of adding a battery later, that\'s a different conversation. With a battery, we sometimes spec a bigger inverter on purpose, because it fills the battery faster from cheap night-time electricity. Is a battery something you want me to factor in now or later?',
        },
      ],
      whyItWorks: [
        'Reframes "bigger = better" as "right-sized = smarter".',
        'Shows technical understanding without jargon (gearbox analogy).',
        'Opens the door to battery upsell organically.',
      ],
    },
    {
      context:
        'Customer asks "the other quote was for a 6 kW inverter on a 5 kW system — why is theirs bigger?"',
      lines: [
        {
          speaker: 'you',
          text: 'Honest answer? They\'re probably either future-proofing for a battery — which is reasonable — or they\'re trying to make their spec look more impressive on paper.',
        },
        {
          speaker: 'you',
          text: 'Here\'s the test: ask them what your battery charge rate is. If they don\'t mention it, the bigger inverter is mostly marketing. If they\'ve sized it for a 15 kWh battery you\'re adding next year, they\'ve done the maths properly.',
        },
        {
          speaker: 'you',
          text: 'I\'ve quoted you the inverter that matches what you\'re buying today. If you tell me you want a battery, I\'ll re-spec — but I won\'t make you pay for something you don\'t need.',
        },
      ],
      whyItWorks: [
        'Doesn\'t trash the competitor — gives the customer a test they can run.',
        'Positions you as honest by default, technical by choice.',
        'Re-opens the battery conversation as their idea, not your push.',
      ],
    },
  ],

  relatedTopics: ['battery-and-inverter', 'strings-and-mppt', 'single-vs-three-phase'],
  embedToolSlug: 'inverter-sizing',
}
