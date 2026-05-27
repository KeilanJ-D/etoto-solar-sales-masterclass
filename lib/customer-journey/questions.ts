// lib/customer-journey/questions.ts
// ============================================
// The 8-step customer-funnel data.
//
// Verbatim from the live ad-funnel form a typical ETOTO-client installer
// (e.g. MCJ Energy Solutions) runs after Facebook/Sigenergy ad clicks.
// Used by both the read-view timeline and the interactive Mock Lead Form
// on /customer-journey so reps can see + feel exactly what their customer
// fills in before the phone rings.
//
// Each step carries:
//   - the literal customer-facing copy (question, helper, options/fields)
//   - `whyAsked`: 1-2 sentences a rep can read to understand the *purpose*
//     of the question and what it tells them when they pick up the phone
// ============================================

export type StepType =
  | 'multi-select'
  | 'single-select'
  | 'number'
  | 'text'
  | 'fieldset'
  | 'review'
  | 'redirect'

export interface JourneyOption {
  value: string
  label: string
}

export interface JourneyField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel'
  placeholder?: string
  required?: boolean
}

export interface JourneyStep {
  id: number
  type: StepType
  /** Short label for stepper UI ("Products", "Decision stage", etc) */
  title: string
  /** The literal question text the customer reads */
  question: string
  /** Optional sub-label or instruction */
  helper?: string
  /** Options for select questions */
  options?: JourneyOption[]
  /** Fields for fieldset questions (contact details) */
  fields?: JourneyField[]
  /** Numeric input prefix, e.g. "£" */
  inputPrefix?: string
  /** Numeric input suffix, e.g. "/month" */
  inputSuffix?: string
  /** Educational note shown to the rep — why is this question in the funnel? */
  whyAsked: string
}

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    type: 'multi-select',
    title: 'Products',
    question: 'Which products are you interested in?',
    helper: 'Select all that apply',
    options: [
      { value: 'solar', label: 'Solar PV' },
      { value: 'battery', label: 'Battery Storage' },
      { value: 'ev', label: 'EV Charging' },
      { value: 'led', label: 'LED Lighting' },
      { value: 'electrical', label: 'General Electrical Work' },
    ],
    whyAsked:
      'Establishes baseline interest. A "battery only" prospect is a different conversation from a "solar + battery + EV" prospect — the latter is more committed and has higher lifetime value. You know what to lead with on the call before you even dial.',
  },
  {
    id: 2,
    type: 'single-select',
    title: 'Decision stage',
    question: 'How far through the decision making process are you?',
    options: [
      { value: 'ready', label: 'Ready to purchase' },
      { value: 'comparing', label: 'Comparing quotes' },
      { value: 'advice', label: 'Looking for more advice' },
    ],
    whyAsked:
      '"Ready to purchase" = close-now mindset, skip the soft-discovery, get to numbers. "Comparing quotes" = you\'re in a competition; ask what other quotes they\'ve seen and reframe against our formula. "Looking for advice" = education-first call, pitch is softer.',
  },
  {
    id: 3,
    type: 'single-select',
    title: 'Info needed',
    question: 'What information would help you make the final decision to invest in Solar PV for your home?',
    options: [
      { value: 'savings', label: 'More information on savings/payback' },
      { value: 'finance', label: 'I\'m looking for better financing options' },
      { value: 'compare', label: 'A clear comparison of products' },
      { value: 'ready', label: 'Nothing, I\'m ready to move forward' },
    ],
    whyAsked:
      'Tells you what to lead with. "Savings" → run the formula. "Finance" → lead with monthly payment vs current bill. "Compare" → bring the products page open, walk them through the brands. "Nothing" → close them — they\'re already sold.',
  },
  {
    id: 4,
    type: 'number',
    title: 'Bill',
    question: 'How much do you spend on your monthly energy bills?',
    helper: 'A rough average across the year is fine',
    inputPrefix: '£',
    inputSuffix: '/month',
    whyAsked:
      'The whole formula starts here. £180/month = ~6,400 kWh/year = a 6kWp + 10kWh system makes sense. £80/month is a different sale entirely. You can size the system in your head before the call.',
  },
  {
    id: 5,
    type: 'text',
    title: 'Postcode',
    question: 'What is your postcode?',
    helper: 'We need this to make sure we service your area.',
    whyAsked:
      'DNO area + roof orientation context. Some DNOs (e.g. UK Power Networks) approve 5kW exports easily; others throttle hard. Postcode also tells you property type from Rightmove in 10 seconds before the call. And confirms they\'re inside the install radius.',
  },
  {
    id: 6,
    type: 'fieldset',
    title: 'Contact',
    question: 'Contact information',
    helper: 'Please provide the best contact details for us to send your quote.',
    fields: [
      { name: 'firstName', label: 'First name', type: 'text', required: true },
      { name: 'lastName', label: 'Last name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone number', type: 'tel', required: true },
      { name: 'address', label: 'Street address', type: 'text', required: true },
    ],
    whyAsked:
      'Email + phone = welcome email fires instantly, SMS follow-up triggers automatically if no answer. Full address means you can pull the property on Rightmove before calling — square footage, roof shape, build year. Most reps skip this and lose 30 seconds of credibility on the call.',
  },
  {
    id: 7,
    type: 'review',
    title: 'Review',
    question: 'Review your information',
    helper: 'Change anything that looks wrong, then submit to get your quote.',
    whyAsked:
      'This step is psychological — the customer sees everything they\'ve told us and signs off mentally. It commits them to the call. By the time they hit submit they\'ve already invested 60 seconds; they expect a callback. No-shows drop because they remember filling this in.',
  },
  {
    id: 8,
    type: 'redirect',
    title: 'Submit',
    question: 'You\'ll be redirected to SolaFlow next →',
    helper: 'And the lead lands instantly in your installer\'s CRM (GoHighLevel).',
    whyAsked:
      'After submit: instant welcome email fires, lead lands in GHL with full context, and the customer is sent to SolaFlow to build their own estimate. By the time you call (target: under 5 mins), they\'ve already designed the system. The call is verification, not sales.',
  },
]
