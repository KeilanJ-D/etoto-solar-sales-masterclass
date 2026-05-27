// lib/systems/types.ts
// ============================================
// Typed shape for Systems Playbooks — the operational
// manuals for SolaFlow, HighLevel, OpenSolar, etc.
// These are the "turnkey" content — paid-tier value.
// ============================================

export interface PlaybookStep {
  number: number
  title: string
  goal: string
  instructions: string[]
  proTip?: string
  commonMistake?: string
  timeEstimate?: string
}

export interface PlaybookScenario {
  title: string
  trigger: string
  actions: string[]
  outcome: string
}

export interface PlaybookSection {
  id: string
  title: string
  intro: string
  steps?: PlaybookStep[]
  scenarios?: PlaybookScenario[]
  keyTakeaway?: string
}

export interface SystemsPlaybook {
  slug: string
  title: string
  subtitle: string
  forWhom: string
  estReadMinutes: number
  lastUpdated: string
  introNarrative: string
  sections: PlaybookSection[]
  troubleshooting?: Array<{
    problem: string
    cause: string
    fix: string
  }>
  relatedSystems?: string[]
}
