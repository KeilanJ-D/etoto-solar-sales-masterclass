import type { KnowledgeTopic } from './types'
import { inverterSizing } from './topics/inverter-sizing'
import { batteryAndInverter } from './topics/battery-and-inverter'
import { stringsAndMppt } from './topics/strings-and-mppt'
import { optimisers } from './topics/optimisers'
import { singleVsThreePhase } from './topics/single-vs-three-phase'
import { panelSelection } from './topics/panel-selection'
import { systemDesignWalkthrough } from './topics/system-design-walkthrough'

export const knowledgeTopics: KnowledgeTopic[] = [
  systemDesignWalkthrough,
  inverterSizing,
  batteryAndInverter,
  stringsAndMppt,
  optimisers,
  singleVsThreePhase,
  panelSelection,
]

export const knowledgeBySlug = (slug: string): KnowledgeTopic | undefined =>
  knowledgeTopics.find((t) => t.slug === slug)

export const knowledgeByCategory = (): Record<string, KnowledgeTopic[]> => {
  const grouped: Record<string, KnowledgeTopic[]> = {}
  for (const t of knowledgeTopics) {
    if (!grouped[t.category]) grouped[t.category] = []
    grouped[t.category].push(t)
  }
  return grouped
}

export const knowledgeCategoryLabels: Record<string, string> = {
  sizing: 'System Sizing',
  topology: 'Topology',
  electrical: 'Electrical & Compliance',
  product: 'Product Selection',
  design: 'Design & Layout',
  reference: 'Reference',
}
