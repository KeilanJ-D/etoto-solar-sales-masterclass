import type { KnowledgeTopic } from '../types'

export const singleVsThreePhase: KnowledgeTopic = {
  slug: 'single-vs-three-phase',
  category: 'electrical',
  title: 'Single Phase vs Three Phase — Which Inverter Goes Where',
  oneLineRule:
    'If the property has a three-phase supply, use a three-phase inverter. Always. Without exception. On single-phase, you\'re capped by DNO limits and need G99 paperwork above 3.68 kW.',
  intent:
    'For surveying reps, designers, and the back-office team submitting G98/G99 forms. Misclassifying phase type at survey is the single most common reason an installed system gets pulled by the DNO.',
  estReadMinutes: 6,
  lastUpdated: '2026-05-27',
  longRule:
    'UK domestic properties are mostly single-phase 230V. Larger homes, rural properties with workshops, anything built post-2010 with EV future-proofing, and most properties >250m² are three-phase 400V. The Distribution Network Operator (DNO) controls what you can connect. G98 = automatic approval up to 16A per phase (3.68 kW single, 11.04 kW three-phase). G99 = application required, 4 – 6 week lead time, sometimes refused or throttled. Single-phase inverters on three-phase supplies create voltage imbalance and trip nearby neighbours\' protection — DNO will pull the install if reported.',

  decisionFlow: {
    intro:
      'These four checks take 5 minutes at survey and prevent 90% of compliance issues.',
    steps: [
      {
        question: '1. What phase is the property?',
        options: [
          {
            label: 'Single-phase (one live, one neutral, one earth)',
            outcome:
              'Standard UK domestic. Use single-phase inverter only. Hard ceiling 3.68 kW without G99. Most installs fall here.',
            accent: 'blue',
          },
          {
            label: 'Three-phase (three lives, one neutral, one earth)',
            outcome:
              'MUST use three-phase inverter. Single-phase on a 3-phase supply is unsafe and non-compliant. Unlocks larger system sizes.',
            accent: 'emerald',
          },
          {
            label: 'Don\'t know',
            outcome:
              'Check the meter (3-phase meters have 3 voltage indicators) AND the consumer unit (3-phase has 3 main switches or a 3-phase RCBO incomer). If still unclear, photograph and ask the DNO before quoting.',
            accent: 'amber',
          },
        ],
      },
      {
        question: '2. Is the proposed inverter above the G98 threshold?',
        options: [
          {
            label: 'Single-phase, ≤3.68 kW (16A)',
            outcome:
              'G98 — notify the DNO within 28 days of commissioning. No pre-approval needed.',
            accent: 'emerald',
          },
          {
            label: 'Single-phase, 3.68 – 11 kW',
            outcome:
              'G99 — application BEFORE install. 4 – 6 weeks. Most DNOs approve up to 11 kW on single-phase but some throttle to 5 – 7 kW depending on local cable.',
            accent: 'amber',
          },
          {
            label: 'Three-phase, ≤11.04 kW total (3.68 kW per phase)',
            outcome:
              'G98 — notify only.',
            accent: 'emerald',
          },
          {
            label: 'Three-phase, 11 – 50 kW',
            outcome:
              'G99 — application needed but usually quick approval. 3-phase supplies have more headroom.',
            accent: 'blue',
          },
        ],
      },
      {
        question: '3. Does the customer have a heat pump, EV charger, or both?',
        options: [
          {
            label: 'Neither',
            outcome:
              'Standard sizing.',
            accent: 'emerald',
          },
          {
            label: 'EV charger (7.4 kW)',
            outcome:
              'On single-phase, the EV charger eats 33A — close to the 60A main fuse limit. Solar + battery can offset some EV draw. Confirm main fuse rating at survey.',
            accent: 'amber',
          },
          {
            label: 'Heat pump (3 – 8 kW)',
            outcome:
              'Heat pumps love 3-phase supplies. If the customer is also moving to heat pump, factor in a supply upgrade conversation now — combined cost is less than two separate jobs.',
            accent: 'red',
          },
          {
            label: 'Both — and main fuse is 60A single-phase',
            outcome:
              'Strongly advise a 3-phase supply upgrade with the DNO. £800 – £2,500 typical (varies wildly). Without it the system is permanently compromised.',
            accent: 'red',
          },
        ],
      },
    ],
  },

  mistakes: [
    {
      mistake:
        'Quoting a 5 kW single-phase inverter on G98 paperwork.',
      whyItHappens:
        'Installer didn\'t check the G98 limit (3.68 kW). Or knew but assumed nobody would check.',
      costOfMistake:
        'DNO does spot audits. If pulled, the install is disconnected within 14 days, customer loses generation, you lose MCS standing.',
      fix:
        'Anything above 3.68 kW single-phase → G99 form, 4 – 6 weeks. Build it into your customer timeline at quote.',
    },
    {
      mistake:
        'Putting a 6 kW single-phase inverter on a property that turned out to be 3-phase.',
      whyItHappens:
        'Surveyor didn\'t check the meter or assumed because the consumer unit looked single-phase.',
      costOfMistake:
        'Voltage imbalance across phases. Neighbours\' protection trips. DNO mandates removal. Customer loses the install, you eat the cost.',
      fix:
        '5-minute survey check: photograph the meter, the consumer unit, the incoming supply head. If 3 lives visible at the meter → 3-phase. Specify accordingly.',
    },
    {
      mistake:
        'Submitting G99 the week of install.',
      whyItHappens:
        'Sales rep didn\'t flag it. Install team didn\'t check until they got on site.',
      costOfMistake:
        'Install delayed 4 – 6 weeks. Customer fury. Lost deposits if they cancel. Reputational damage.',
      fix:
        'G99 application submitted on day of deposit. Set it as a hard rule in the CRM workflow — no install date booked until G99 acceptance is back.',
    },
  ],

  maths: [
    {
      scenario:
        'Customer quoted for 8 kWp PV + 15 kWh battery. Property is single-phase, 60A main fuse, has 7.4 kW EV charger.',
      inputs: [
        { label: 'PV', value: '8 kWp' },
        { label: 'Battery', value: '15 kWh' },
        { label: 'Phase', value: 'Single-phase, 60A fuse' },
        { label: 'EV', value: '7.4 kW charger' },
      ],
      steps: [
        {
          formula: 'Inverter needed: ~7 kW for PV + battery throughput',
          result: 'G99 required (7 kW > 3.68 kW limit)',
        },
        {
          formula:
            'Total load on phase during peak: 7 kW inverter export + 7.4 kW EV draw = 14.4 kW = 62.6A',
          result: 'EXCEEDS 60A main fuse — fuse blows under combined load',
        },
        {
          formula:
            'Option A: Upgrade main fuse to 100A (DNO call-out ~£250). Stay single-phase.',
          result:
            'Permitted but stretches single-phase limits. G99 application may push back.',
        },
        {
          formula:
            'Option B: Upgrade to 3-phase supply (DNO + electrician ~£1,500 – £2,500).',
          result:
            'Future-proofs for heat pump, larger battery, 22 kW EV charger. G98-eligible at 11 kW total inverter.',
        },
      ],
      outcome:
        'For this customer (with EV already), 3-phase upgrade is the right call. Sell it as a one-time job that unlocks heat pump and faster EV charging later. ROI on the £1,500 upgrade: payback in 4 – 5 years from avoided peak EV charging alone.',
    },
  ],

  salesScripts: [
    {
      context:
        'Customer asks "why do I need to apply to the DNO if I\'m paying for it?"',
      lines: [
        {
          speaker: 'you',
          text: 'Good question. Your solar system exports excess electricity back to the grid. The grid in your street is sized for a certain amount of flow — both directions. The DNO\'s job is to make sure adding your system doesn\'t affect your neighbours.',
        },
        {
          speaker: 'you',
          text: 'For systems under 3.68 kW we just notify them after the install — quick form, no waiting. Above that, they need to confirm your local cable can handle it. That\'s the G99 process. Takes 4 to 6 weeks, and we submit it the day you sign — so by the time the install is ready, the paperwork is done.',
        },
        {
          speaker: 'you',
          text: 'Some installers skip this. They\'re gambling that nobody checks. We don\'t gamble — because if the DNO does check and disconnects, you lose your generation and we lose our certification. We\'d rather wait 4 weeks than fight that battle.',
        },
      ],
      whyItWorks: [
        'Frames G99 as protecting the customer, not a hurdle.',
        'Pre-empts "other installers don\'t bother" objection.',
        'Sets up your professionalism vs cowboy competitors.',
      ],
    },
    {
      context:
        'Customer with 3-phase supply asks why your quote is more expensive than a single-phase competitor.',
      lines: [
        {
          speaker: 'you',
          text: 'Did the other quote check your supply type? Because your property is on a three-phase supply. That changes the inverter we need — and which inverters are legal to install.',
        },
        {
          speaker: 'you',
          text: 'A single-phase inverter on a three-phase supply causes what\'s called voltage imbalance. It\'s not safe long-term, and the DNO can force it to be removed. So whoever quoted you single-phase either didn\'t check, or didn\'t mind selling you something that might get disconnected.',
        },
        {
          speaker: 'you',
          text: 'Three-phase inverters are about £300 – £500 more than single-phase equivalents. That\'s the price difference you\'re seeing. It\'s not me being more expensive — it\'s me being correct.',
        },
      ],
      whyItWorks: [
        'Turns the price gap into a competence gap.',
        'Doesn\'t insult the customer — they were misquoted by someone else.',
        'Specific £ range (£300 – £500) so they can do the maths themselves.',
      ],
    },
  ],

  relatedTopics: ['inverter-sizing', 'battery-and-inverter'],
}
