import type { GlossaryTerm } from './types'

export const glossary: GlossaryTerm[] = [
  {
    term: 'kWp (Kilowatt-peak)',
    shortForm: 'kWp',
    category: 'sizing',
    oneLineDefinition:
      'The peak power output of a PV system under standard test conditions — the nameplate size.',
    detail:
      'A "6 kWp system" means the panels can produce up to 6 kW of power when the sun is directly overhead, the panels are 25°C and irradiance is 1,000 W/m². Real UK output is lower — annual yield is typically 850 – 1,000 kWh per kWp.',
    relatedTopics: ['inverter-sizing'],
  },
  {
    term: 'kWh (Kilowatt-hour)',
    shortForm: 'kWh',
    category: 'sizing',
    oneLineDefinition:
      'A unit of energy — 1 kW of power used for 1 hour.',
    detail:
      'kWh is what you actually pay for on your bill. A 5 kWh battery stores 5 kW of power for 1 hour, OR 1 kW for 5 hours. UK average home uses ~10 – 18 kWh/day.',
  },
  {
    term: 'MPPT (Maximum Power Point Tracker)',
    shortForm: 'MPPT',
    category: 'design',
    oneLineDefinition:
      'A circuit inside the inverter that continuously adjusts voltage to extract maximum power from a string of panels.',
    detail:
      'Each MPPT runs ONE string independently. If you have panels on two orientations, you need 2 MPPTs so each face runs at its own optimal voltage. Most hybrid inverters have 2 MPPTs; some 3-phase units have 3 or more.',
    relatedTopics: ['strings-and-mppt'],
  },
  {
    term: 'String',
    category: 'design',
    oneLineDefinition:
      'A series-wired chain of solar panels feeding a single MPPT input on the inverter.',
    detail:
      'Panels in a string are wired in series — current flows at the rate of the slowest panel. If one panel in a string is shaded or undersized, the whole string is throttled. Hence why orientation grouping and optimisers matter.',
    relatedTopics: ['strings-and-mppt', 'optimisers'],
  },
  {
    term: 'Optimiser',
    category: 'product',
    oneLineDefinition:
      'A small device installed behind individual panels to break them out of the series string so each panel runs independently.',
    detail:
      'Tigo TS4-A-O is the dominant inverter-agnostic optimiser (~£40 trade). SolarEdge locks you into their proprietary inverter (~£55 trade). Use surgically on problem panels; don\'t blanket every panel.',
    relatedTopics: ['optimisers'],
  },
  {
    term: 'Hybrid inverter',
    category: 'product',
    oneLineDefinition:
      'An inverter that handles both PV → AC conversion AND battery charge/discharge in one box.',
    detail:
      'Hybrid inverters DC-couple the battery (95%+ efficiency) vs AC-coupled systems where battery sits behind its own inverter (84% efficiency). Hybrid = the modern default. Examples: GivEnergy Gen3, Solis S6, Sigenergy SigenStor, Fox H1.',
    relatedTopics: ['battery-and-inverter'],
  },
  {
    term: 'DC:AC ratio',
    category: 'sizing',
    oneLineDefinition:
      'The ratio of PV nameplate (DC) to inverter capacity (AC). 1.0 = perfectly matched.',
    detail:
      'Ratios above 1.0 mean the PV can theoretically out-generate the inverter at peak sun — the excess is "clipped". 1.1 – 1.25 is acceptable for most UK installs (clipping only happens on the sunniest hours). Above 1.3 you\'re losing meaningful energy.',
    relatedTopics: ['inverter-sizing'],
  },
  {
    term: 'DoD (Depth of Discharge)',
    shortForm: 'DoD',
    category: 'product',
    oneLineDefinition:
      'How much of a battery\'s nominal capacity is usable, expressed as a percentage.',
    detail:
      'A 10 kWh battery at 90% DoD has 9 kWh usable. The other 10% is reserved to protect cell life. Modern LFP batteries (Sigenergy, GivEnergy) typically allow 90 – 100% DoD; older NMC chemistries cap at 80%.',
  },
  {
    term: 'C-rate',
    category: 'product',
    oneLineDefinition:
      'How fast a battery can charge or discharge relative to its capacity.',
    detail:
      'A 10 kWh battery at 0.5C can charge/discharge at 5 kW (10 × 0.5). At 1C it would do 10 kW. Higher C-rate batteries fill faster from off-peak grid and deliver more power during EV/peak load.',
  },
  {
    term: 'G98 / G99',
    category: 'electrical',
    oneLineDefinition:
      'UK Distribution Network Operator (DNO) regulations for connecting generation to the grid.',
    detail:
      'G98 = automatic approval up to 16A per phase (3.68 kW single, 11.04 kW three-phase). Notify within 28 days of install. G99 = application required BEFORE install for anything above. 4 – 6 week typical lead time.',
    relatedTopics: ['single-vs-three-phase'],
  },
  {
    term: 'SEG (Smart Export Guarantee)',
    shortForm: 'SEG',
    category: 'electrical',
    oneLineDefinition:
      'UK scheme that pays homeowners for surplus electricity exported to the grid.',
    detail:
      'Replaced the Feed-in Tariff in 2020. Rates vary widely (3p – 15p/kWh). Octopus Outgoing Fixed pays 15p, Octopus Outgoing Lite pays 8p, others are lower. Customer signs up after MCS certification.',
  },
  {
    term: 'MCS (Microgeneration Certification Scheme)',
    shortForm: 'MCS',
    category: 'reference',
    oneLineDefinition:
      'UK certification required to install solar PV under most consumer protection schemes and to qualify for SEG.',
    detail:
      'Installer must be MCS-accredited. Each install gets an MCS certificate which the customer needs to apply for SEG. Without MCS, the customer cannot sell electricity back.',
  },
  {
    term: 'DNO (Distribution Network Operator)',
    shortForm: 'DNO',
    category: 'electrical',
    oneLineDefinition:
      'The company that owns and operates the local electricity grid in your area.',
    detail:
      'UK is split between several DNOs (UK Power Networks, Northern Powergrid, Scottish Power, etc). They approve grid connections via G98/G99 and respond to faults. They are NOT your electricity supplier.',
  },
  {
    term: 'Single-phase',
    category: 'electrical',
    oneLineDefinition:
      'Standard UK domestic supply — one live, one neutral, 230V.',
    detail:
      'Most UK homes built before 2015. Hard ceiling at 3.68 kW PV without G99 paperwork.',
    relatedTopics: ['single-vs-three-phase'],
  },
  {
    term: 'Three-phase',
    category: 'electrical',
    oneLineDefinition:
      'Larger supply — three live conductors, 400V phase-to-phase.',
    detail:
      'Common in larger homes, rural properties with workshops, anything post-2015 sized for EV/heat pump future. Allows much larger inverters before G99 paperwork bites.',
    relatedTopics: ['single-vs-three-phase'],
  },
  {
    term: 'Clipping',
    category: 'sizing',
    oneLineDefinition:
      'When PV generation exceeds inverter capacity, the excess is "clipped" and lost as heat.',
    detail:
      'Acceptable in small amounts (a few hours per year on the sunniest days). Becomes a problem above ~1.3 DC:AC ratio. The trade-off: oversizing PV vs inverter is cheap (panels are cheaper than inverter capacity).',
  },
  {
    term: 'Tier-1 panel',
    category: 'product',
    oneLineDefinition:
      'A panel manufacturer with strong financial credit rating and high production volume.',
    detail:
      'Bloomberg NEF publishes the tier-1 list quarterly. Tier-1 = financially likely to still exist in 25 years to honour warranty. Includes Longi, JA Solar, Trina, Aiko, REC, Jinko. NOT a quality rating — just a credit rating.',
    relatedTopics: ['panel-selection'],
  },
  {
    term: 'Self-consumption',
    category: 'sizing',
    oneLineDefinition:
      'The percentage of generated solar electricity used directly by the home, vs exported to grid.',
    detail:
      'PV-only systems average 30 – 40% self-consumption (most generation happens when people aren\'t home). Adding battery storage pushes self-consumption to 70 – 90%. Self-consumed kWh is worth ~3× more than exported kWh.',
  },
  {
    term: 'TOU tariff (Time-of-Use)',
    shortForm: 'TOU',
    category: 'electrical',
    oneLineDefinition:
      'An electricity tariff with different prices at different times of day.',
    detail:
      'Octopus Go, Cosy, Intelligent and Flux are the main UK TOU tariffs. They have cheap off-peak rates (often 5 – 8p/kWh) for 4 – 6 hours per day. Solar + battery + TOU is the holy trinity for ROI.',
  },
  {
    term: 'Diversion (PV diverter)',
    category: 'product',
    oneLineDefinition:
      'A device that routes surplus PV generation to an immersion heater for hot water.',
    detail:
      'Examples: Eddi, Solar iBoost. Adds £350 – £600 to install. Worth it for homes with electric hot water and no battery — diverts ~£100 – £200/year of would-be-exported energy into free hot water.',
  },
]

export const glossaryByCategory = () => {
  const grouped: Record<string, GlossaryTerm[]> = {}
  for (const term of glossary) {
    if (!grouped[term.category]) grouped[term.category] = []
    grouped[term.category].push(term)
  }
  return grouped
}
