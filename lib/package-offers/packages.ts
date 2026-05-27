// lib/package-offers/packages.ts
// ============================================
// Real package-offer ad creatives from ETOTO clients, paired with the
// SolaFlow formula so reps can match a customer's daily usage to the
// nearest fit and walk them through the maths.
//
// All financial figures are computed live from SOLAFLOW_CONSTANTS at
// render time — no stale numbers. Spec defaults (panel wattage, off-peak
// hours, export rate) match the values used everywhere else in the deck.
// ============================================

export interface PackageOffer {
  slug: string
  /** Path under /public — copied from the live ad creatives */
  imagePath: string
  title: string
  brand: string
  /** "all-in-one" or "modular" — drives the inverter discussion */
  shape: 'all-in-one' | 'modular'
  /** Number of panels in the package (null if ad doesn't specify) */
  panelCount: number | null
  /** Watt rating assumed for the formula (the most common UK install panel) */
  assumedPanelWattage: number
  /** Usable battery kWh (null if ad doesn't specify) */
  batteryKwhUsable: number | null
  /** Plain-English customer fit by monthly bill */
  fitsBillRange: string
  /** Plain-English customer fit by daily usage */
  fitsDailyKwhRange: string
  /** One-line angle the rep can lead with on the call */
  oneLineAngle: string
  /** Why this offer was probably built — what hook the marketing was after */
  marketingNote: string
  /** Optional: special finance flag */
  financeHook?: string
}

export const packageOffers: PackageOffer[] = [
  {
    slug: 'hinen-10-panel-10kwh',
    imagePath: '/ads/hinen-10-panel-10kwh.png',
    title: 'Hinen 10-panel + 10 kWh battery',
    brand: 'Hinen',
    shape: 'all-in-one',
    panelCount: 10,
    assumedPanelWattage: 470,
    batteryKwhUsable: 10,
    fitsBillRange: '£100–£140 / month',
    fitsDailyKwhRange: '10–15 kWh / day',
    oneLineAngle:
      'Compact all-in-one for terraced or semi homes. Lowest install complexity, lowest disruption, fastest commissioning.',
    marketingNote:
      'Entry-tier hook — gets enquiries from cost-conscious homeowners who think solar is more expensive than it is. Use to convert "I\'m comparing prices" leads.',
  },
  {
    slug: 'hinen-18-panel-40kwh',
    imagePath: '/ads/hinen-18-panel-40kwh.png',
    title: 'Hinen 18-panel + 40 kWh battery',
    brand: 'Hinen',
    shape: 'all-in-one',
    panelCount: 18,
    assumedPanelWattage: 470,
    batteryKwhUsable: 40,
    fitsBillRange: '£250–£450 / month',
    fitsDailyKwhRange: '25–45 kWh / day',
    oneLineAngle:
      'Detached, EV + heat pump territory. 40 kWh covers 2 nights without sun. Big enough to be near-grid-independent in summer.',
    marketingNote:
      'High-bill enquiry magnet. Filters out the small-bill tyre-kickers. When this ad lands a lead, expect a £15-25k system conversation.',
  },
  {
    slug: 'sigenergy-zero-finance',
    imagePath: '/ads/sigenergy-zero-finance.png',
    title: 'Sigenergy 0% finance package',
    brand: 'Sigenergy',
    shape: 'modular',
    panelCount: null,
    assumedPanelWattage: 470,
    batteryKwhUsable: null,
    fitsBillRange: 'Any',
    fitsDailyKwhRange: 'Any',
    oneLineAngle:
      'Finance-led pitch. Spec the system to the customer\'s usage; lead the conversation with the monthly payment, not the headline price.',
    marketingNote:
      'The single highest-converting ad shape — "0% finance" beats "save £X" 9 times out of 10 in cold traffic. Pair with a 5–10 year iwocaPay term.',
    financeHook: '0% APR finance',
  },
  {
    slug: 'sigenergy-battery-offer',
    imagePath: '/ads/sigenergy-battery-offer.png',
    title: 'Sigenergy battery-led offer',
    brand: 'Sigenergy',
    shape: 'modular',
    panelCount: null,
    assumedPanelWattage: 470,
    batteryKwhUsable: 12,
    fitsBillRange: '£150–£250 / month',
    fitsDailyKwhRange: '15–25 kWh / day',
    oneLineAngle:
      'Battery-first hook for homeowners who already have solar OR want savings without roof work. Lean into off-peak arbitrage on Octopus Go.',
    marketingNote:
      'Battery-only retrofit angle. Tighter sale (lower ticket) but high close rate — customer is already sold on solar, just wants the storage.',
  },
  {
    slug: 'solaflow-tesla',
    imagePath: '/ads/solaflow-tesla.png',
    title: 'Solar + Tesla Powerwall 3',
    brand: 'Tesla',
    shape: 'all-in-one',
    panelCount: 14,
    assumedPanelWattage: 470,
    batteryKwhUsable: 13.5,
    fitsBillRange: '£180–£280 / month',
    fitsDailyKwhRange: '18–28 kWh / day',
    oneLineAngle:
      'Premium aesthetic + brand-name pitch. Tesla PW3 is hybrid (no separate inverter). Sells itself to homeowners who would have asked for Tesla anyway.',
    marketingNote:
      'Aspirational pull. Higher margin per install, longer customer life, easiest referral generator. Use when customer name-drops Tesla or solar premium brands.',
  },
  {
    slug: 'ecoflow-powerocean',
    imagePath: '/ads/ecoflow-powerocean.png',
    title: 'EcoFlow PowerOcean modular',
    brand: 'EcoFlow',
    shape: 'modular',
    panelCount: 8,
    assumedPanelWattage: 470,
    batteryKwhUsable: 5,
    fitsBillRange: '£80–£120 / month',
    fitsDailyKwhRange: '8–12 kWh / day',
    oneLineAngle:
      'Lowest entry point — modular EcoFlow with one stack. Strong fit for flats with garden access, small terraces, or starter installs that customers want to grow later.',
    marketingNote:
      'Lead-magnet ad. Brings in price-sensitive enquiries. Many of these upsell during the call once you walk through bill protection over 15 years.',
  },
  {
    slug: 'solar-75-per-month',
    imagePath: '/ads/solar-75-per-month.png',
    title: '"Solar from £75 / month"',
    brand: 'Finance angle',
    shape: 'modular',
    panelCount: 10,
    assumedPanelWattage: 470,
    batteryKwhUsable: 10,
    fitsBillRange: '£100–£160 / month',
    fitsDailyKwhRange: '10–18 kWh / day',
    oneLineAngle:
      'Payment-led ad. £75/mo is roughly a £9.5k system over 12 years at 7% APR. Pitch: "we replace your £130 electricity bill with a £75 loan payment plus £40 of remaining cheap-rate import = you save £15/month AND own the system at the end."',
    marketingNote:
      'Beats raw price ads on conversion. Almost every enquiry is a "tell me about that finance" call. Have iwocaPay terms ready before you dial.',
    financeHook: '£75 / month',
  },
]
