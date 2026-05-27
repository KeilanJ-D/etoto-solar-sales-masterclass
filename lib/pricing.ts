// lib/pricing.ts
// ============================================
// Single source of truth for pricing, links, and value framing.
// Update HERE and the whole site picks it up.
// ============================================

export const COMPLETE_MASTERCLASS = {
  // Stable identifiers — DO NOT change without migrating Firestore codes
  productId: 'complete-toolkit',
  localStorageKey: 'access_complete-toolkit',

  // User-facing naming
  name: 'The ETOTO Solar Sales Masterclass',
  shortName: 'Complete Masterclass',
  tagline: 'The complete solar sales operating system. Framework, knowledge, tools, systems.',

  // Pricing
  priceHeadline: '£1,000',
  priceVatNote: '+ VAT',
  priceIncVat: '£1,200 inc VAT',
  priceMonthly: '£250 deposit + £62.50/month × 12 (0% APR via iwocaPay)',
  priceMonthlyNote: 'Pay in full via Stripe, or apply for iwocaPay 0% finance',

  // Value anchoring
  comparableValueHeadline: '£35,000+',
  comparableValueMaximum: '£100,000',
  comparableBreakdown: [
    { label: '9-step sales training programme (3-day off-site equivalent)', value: '£6,000' },
    { label: 'Solar technical training course (1-week equivalent)', value: '£4,500' },
    { label: 'HighLevel CRM setup consultancy (40 hours)', value: '£6,000' },
    { label: 'SolaFlow operator training (private session)', value: '£3,500' },
    { label: 'Customer Discovery framework + question library', value: '£2,500' },
    { label: 'Inverter Sizing + Optimiser ROI software (build cost)', value: '£8,000' },
    { label: 'Partner agency portal + onboarding playbook', value: '£4,500' },
    { label: 'Lifetime updates (typical annual retainer)', value: '£5,000/yr' },
  ],

  // Commerce
  // IMPORTANT: Update this Stripe link once the new £1,000 product is created.
  stripeLink: 'https://buy.stripe.com/REPLACE_WITH_1000_GBP_LINK',

  // iwocaPay finance: 0% APR over 12 months. £250 deposit + £62.50/m × 12.
  // Uses ETOTO's hosted iwocaPay spending account — no API integration needed.
  iwocaPayLink: 'https://www.iwoca.co.uk/pay/spending-account/etoto-ltd',
  iwocaPayDeposit: '£250 deposit',
  iwocaPayMonthly: '£62.50/month × 12',
  iwocaPaySubtext: '0% APR · 12-month term',

  // Access promise
  accessNote: 'One purchase. Lifetime access. Free updates forever.',
  guaranteeNote: '14-day money-back guarantee.',
}

// Helper: human-readable price + VAT label for inline use
export const priceLabel = () =>
  `${COMPLETE_MASTERCLASS.priceHeadline} ${COMPLETE_MASTERCLASS.priceVatNote}`
