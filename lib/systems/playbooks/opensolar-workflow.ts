import type { SystemsPlaybook } from '../types'

export const opensolarWorkflow: SystemsPlaybook = {
  slug: 'opensolar-workflow',
  title: 'OpenSolar — End-to-End Design Workflow',
  subtitle:
    'From a customer\'s postcode to a fully spec\'d, customer-ready proposal in under 12 minutes. The exact OpenSolar workflow ETOTO partner installers use.',
  forWhom:
    'Designers, surveyors, and reps who build proposals in OpenSolar. Anyone whose proposals take 30+ minutes today.',
  estReadMinutes: 16,
  lastUpdated: '2026-05-27',
  introNarrative:
    'OpenSolar is the design tool. Used well, it produces a proposal customers can read on their phone in 60 seconds and immediately understand. Used badly, it produces a 14-page PDF with shadow analysis nobody asked for. This workflow strips OpenSolar to the operations that actually drive sales — and tells you what to skip.',

  sections: [
    {
      id: 'setup',
      title: 'Project Setup — The First 90 Seconds',
      intro:
        'Get the address loaded and the roof identified.',
      steps: [
        {
          number: 1,
          title: 'Create the project from address',
          goal: 'OpenSolar pulls satellite imagery, weather data, irradiance.',
          instructions: [
            'New Project → enter postcode → OpenSolar auto-locates and pulls Bing/Google satellite.',
            'If the satellite image is old (look for car/garden differences), use Street View as a sanity check for roof condition.',
            'Set project name = customer surname + postcode (e.g. "Smith — RG2 9XX") for fast searching later.',
          ],
          timeEstimate: '30 seconds',
        },
        {
          number: 2,
          title: 'Configure system defaults',
          goal: 'Skip the panel-by-panel selection on every project.',
          instructions: [
            'Settings → System Defaults — pre-select your panel brand (Longi or Aiko), your default battery, default inverter.',
            'Set your default electricity tariff (Octopus Flexible or whatever your customer base is on).',
            'Set your default SEG rate (Octopus Outgoing Fixed 15p is the standard reference).',
          ],
          timeEstimate: 'One-time setup, then 0',
          proTip:
            'Set up TWO default templates: "Standard install" and "Premium install" (Aiko + Sigenergy). One-click switches the whole spec.',
        },
      ],
    },
    {
      id: 'roof-design',
      title: 'Roof Design — Drawing Panels in 3 Minutes',
      intro:
        'This is where designers waste time. Strip it back.',
      steps: [
        {
          number: 1,
          title: 'Trace the roof faces',
          goal:
            'Define each roof face with correct orientation, pitch and azimuth.',
          instructions: [
            'Click the roof face on satellite → trace the corners.',
            'OpenSolar auto-detects pitch from shadow length. Verify it looks right (UK average 30 – 45°).',
            'If unsure, use Street View to confirm pitch — guess too steep and OpenSolar under-estimates yield.',
          ],
          timeEstimate: '90 seconds per face',
        },
        {
          number: 2,
          title: 'Auto-populate panels',
          goal: 'Let OpenSolar fill the roof.',
          instructions: [
            'Click "Auto Place" → OpenSolar fills the traced roof with the default panel size.',
            'Set min spacing (300mm from edge typical for MCS).',
            'Remove panels that hit chimneys, vents, dormers manually.',
          ],
          timeEstimate: '60 seconds',
          commonMistake:
            'Leaving panels too close to roof edge. MCS requires 300mm minimum from edge — installers reject the design at install if you forgot. Always check the edge clearance preview before saving.',
        },
        {
          number: 3,
          title: 'Run shadow analysis (selectively)',
          goal: 'Spot the panels that will be shaded — without burning 10 minutes.',
          instructions: [
            'Click "Shadow Study" → OpenSolar runs a year-long sun path.',
            'Look at the SHADED PANEL HEATMAP only — don\'t dive into the hourly viz.',
            'Mark any panel that shows >15% annual shade as a candidate for optimiser or stringing fix.',
          ],
          timeEstimate: '90 seconds',
          proTip:
            'You don\'t need the full shadow analysis for every project. For a clearly clean roof, skip it entirely and save 90 seconds × every project. Use it on roofs with chimneys, dormers, neighbouring trees, or tall buildings within 30m.',
        },
      ],
    },
    {
      id: 'inverter-battery',
      title: 'Inverter + Battery Selection — Driven by Use Case',
      intro:
        'Don\'t accept OpenSolar\'s default 1:1 inverter sizing. Use the proper logic.',
      steps: [
        {
          number: 1,
          title: 'Confirm the customer\'s use case',
          goal: 'Match spec to actual life, not template defaults.',
          instructions: [
            'EV? Heat pump? Tariff? These dictate the spec, not the roof.',
            'For battery sizing, use the rule: usable_kWh ≈ 70% of daily kWh use for "save money" customers, 1.5× for "independence" customers.',
            'For inverter sizing, use the bigger of: PV nameplate × 0.9, battery_kWh ÷ off-peak hours × 1.1, or peak discharge load.',
          ],
        },
        {
          number: 2,
          title: 'Override the OpenSolar default inverter',
          goal:
            'OpenSolar matches inverter to PV at 1:1. Override based on battery/tariff.',
          instructions: [
            'Components tab → Inverter → swap to the one your sizing logic indicates.',
            'If the customer has battery + Octopus Go (4h off-peak), the inverter is usually one size BIGGER than PV-only sizing.',
            'For a 6kWp PV + 15kWh battery on Go, override to a 6 kW or 8 kW hybrid — not the default 5 kW.',
          ],
          commonMistake:
            'Trusting the auto-recommendation. OpenSolar defaults are PV-led; battery-led design needs manual override every single time.',
        },
        {
          number: 3,
          title: 'Lock the battery spec',
          goal: 'Get the right product + the right quantity.',
          instructions: [
            'Use OpenSolar\'s battery picker but verify the SPEC: usable kWh (not just nominal), max charge/discharge kW, warranty.',
            'For 15 kWh+ banks, use stacked Sigenergy (highest C-rate) over single-unit GivEnergy.',
            'Note the battery\'s max charge rate — feeds into the inverter sizing check.',
          ],
        },
      ],
    },
    {
      id: 'proposal',
      title: 'Proposal Generation — What Customers Actually Read',
      intro:
        'The default OpenSolar proposal is 14 pages. Customers read 2. Strip it.',
      steps: [
        {
          number: 1,
          title: 'Use the customer-facing proposal template',
          goal: 'Generate the 2-page summary, not the full design doc.',
          instructions: [
            'Proposal → Template → use ETOTO\'s 2-page customer template (Page 1: the system + price. Page 2: the savings).',
            'Hide: shadow analysis, panel-by-panel layout, tilt-and-azimuth tables. These belong in the install doc, not the sales doc.',
          ],
        },
        {
          number: 2,
          title: 'Edit the price block manually',
          goal: 'Apply your margin and present the price the way you want.',
          instructions: [
            'OpenSolar calculates from material costs + your labour rate. Verify the total.',
            'Format: headline price big, finance option subtext, monthly cost in bold.',
            'Add the "what\'s NOT included" line (scaffolding, planning if needed) — transparency converts.',
          ],
        },
        {
          number: 3,
          title: 'Generate + send via SolaFlow / HighLevel',
          goal: 'Don\'t use OpenSolar to send. Use your CRM.',
          instructions: [
            'Download the PDF.',
            'Attach to the SolaFlow lead OR upload as the quote PDF in HighLevel.',
            'Send via the CRM\'s tracked email so you see opens/clicks.',
          ],
          proTip:
            'OpenSolar\'s direct send is fine but it bypasses your CRM tracking. Always route through HighLevel so you know when the customer opens the quote.',
        },
      ],
    },
    {
      id: 'scenarios',
      title: 'Specific Scenarios',
      intro:
        'Designs that come up over and over — solved.',
      scenarios: [
        {
          title: 'Hipped roof with awkward dormer cutting into prime panel space',
          trigger:
            '4-bed UK semi with a back dormer eating into the south face.',
          actions: [
            'Trace dormer face separately — it may take 2 – 3 panels at a different orientation.',
            'Put main roof on String 1 / MPPT 1, dormer on String 2 / MPPT 2.',
            'Don\'t bother trying to squeeze panels behind the dormer — gain is <2% and install cost is high.',
          ],
          outcome:
            'Cleaner spec, no shade fights, full performance on both roof sections.',
        },
        {
          title:
            'Customer has trees on south boundary casting afternoon shade',
          trigger:
            'Survey shows trees casting shade 13:00 – 17:00 on the south face in summer.',
          actions: [
            'Run OpenSolar shadow study — confirms which panels affected (usually bottom row).',
            'Option A: put those panels on their own MPPT.',
            'Option B: switch panel selection to Aiko on shaded face only — wait, no, mixing brands voids warranty. So either swap the whole array to Aiko OR optimise the shaded panels.',
            'Most cost-effective: 3 – 4 Tigo optimisers on the shaded panels (£135 – £180).',
          ],
          outcome:
            'Avoid 6 – 10% annual yield loss for less than £200 added to job.',
        },
        {
          title:
            'Two-roof split (south main + west extension) but customer wants single inverter',
          trigger:
            'Cost-conscious customer, but the two roofs need separate MPPTs.',
          actions: [
            'Spec a 2-MPPT inverter (GivEnergy Gen3 5kW or Solis S6).',
            'String 1: south roof (main array).',
            'String 2: west extension panels.',
            'Single inverter, two independent strings — no compromise.',
          ],
          outcome:
            'One inverter, full performance on both roofs. Saves the cost of a second inverter (~£800) without losing yield.',
        },
      ],
    },
  ],

  troubleshooting: [
    {
      problem:
        'OpenSolar irradiance/yield numbers don\'t match what the customer experiences',
      cause:
        'Satellite tilt/pitch estimate was wrong, or local shading not modelled accurately.',
      fix:
        'Always cross-check pitch via Street View on first design. If post-install yield is consistently below estimate, revisit the project and correct pitch — protects future quotes.',
    },
    {
      problem: 'PDF proposal renders panels off-roof',
      cause:
        'Trace points drifted when you adjusted panel layout.',
      fix:
        'Re-trace the affected face. If recurring, lock the trace points before placing panels.',
    },
    {
      problem: 'Battery doesn\'t appear in customer-facing proposal',
      cause:
        'Battery added but not enabled in the proposal template.',
      fix:
        'Proposal Editor → Components → ensure "Battery System" block is enabled. If using a custom template, check the conditional logic.',
    },
    {
      problem: 'OpenSolar doesn\'t include a specific inverter you want',
      cause:
        'Product not in the default UK database.',
      fix:
        'Settings → Products → Add custom inverter with manual spec (AC out, battery rate, MPPTs, price). Lives in your account forever.',
    },
  ],

  relatedSystems: ['solaflow-mastery'],
}
