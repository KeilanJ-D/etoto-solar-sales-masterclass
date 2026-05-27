// lib/knowledge/types.ts
// ============================================
// Typed content shape for the Knowledge Library.
// Each topic is a typed object so the same source
// renders gated or ungated based on env / token state.
// ============================================

export type KnowledgeCategory =
  | 'sizing'
  | 'topology'
  | 'electrical'
  | 'product'
  | 'design'
  | 'reference'

export interface DecisionStep {
  question: string
  options: Array<{
    label: string
    outcome: string
    leadsTo?: string // optional pointer to another step id
    accent?: 'red' | 'amber' | 'emerald' | 'blue'
  }>
}

export interface DecisionFlow {
  intro?: string
  steps: DecisionStep[]
}

export interface MathsExample {
  scenario: string
  inputs: Array<{ label: string; value: string }>
  steps: Array<{ formula: string; result: string; explanation?: string }>
  outcome: string
}

export interface SalesScript {
  context: string
  lines: Array<{
    speaker: 'you' | 'customer'
    text: string
  }>
  whyItWorks: string[]
}

export interface MistakePattern {
  mistake: string
  whyItHappens: string
  costOfMistake: string
  fix: string
}

export interface KnowledgeTopic {
  slug: string
  category: KnowledgeCategory
  title: string
  oneLineRule: string // the single sentence that captures it
  intent: string // who needs this and why
  estReadMinutes: number
  lastUpdated: string // ISO date string
  // Free sections
  longRule: string // 2-4 sentence expansion of the rule
  decisionFlow: DecisionFlow
  mistakes: MistakePattern[]
  // Gated sections
  maths: MathsExample[]
  salesScripts: SalesScript[]
  // Optional
  relatedTopics?: string[] // slugs
  embedToolSlug?: 'inverter-sizing' | 'optimiser-roi' // pulls in a tool
}

export interface GlossaryTerm {
  term: string
  shortForm?: string
  category: KnowledgeCategory
  oneLineDefinition: string
  detail: string
  relatedTopics?: string[]
}
