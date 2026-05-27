import type { SystemsPlaybook } from './types'
import { solaflowMastery } from './playbooks/solaflow-mastery'
import { highlevelPlaybook } from './playbooks/highlevel-playbook'
import { opensolarWorkflow } from './playbooks/opensolar-workflow'
import { customerDiscoveryMastery } from './playbooks/customer-discovery-mastery'

export const systemsPlaybooks: SystemsPlaybook[] = [
  customerDiscoveryMastery,
  solaflowMastery,
  highlevelPlaybook,
  opensolarWorkflow,
]

export const playbookBySlug = (slug: string): SystemsPlaybook | undefined =>
  systemsPlaybooks.find((p) => p.slug === slug)
