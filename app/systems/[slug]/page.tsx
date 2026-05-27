import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import PlaybookPage from '@/components/systems/PlaybookPage'
import { playbookBySlug, systemsPlaybooks } from '@/lib/systems/registry'

export async function generateStaticParams() {
  return systemsPlaybooks.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const playbook = playbookBySlug(slug)
  if (!playbook) return { title: 'Playbook — Not Found' }
  return {
    title: `${playbook.title} — ETOTO Systems`,
    description: playbook.subtitle,
  }
}

export default async function SystemsPlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const playbook = playbookBySlug(slug)
  if (!playbook) notFound()

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />
      <PlaybookPage playbook={playbook} />
      <Footer />
    </main>
  )
}
