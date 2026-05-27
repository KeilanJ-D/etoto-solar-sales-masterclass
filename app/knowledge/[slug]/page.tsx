import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import KnowledgePage from '@/components/knowledge/KnowledgePage'
import { knowledgeBySlug, knowledgeTopics } from '@/lib/knowledge/registry'

export async function generateStaticParams() {
  return knowledgeTopics.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = knowledgeBySlug(slug)
  if (!topic) return { title: 'Knowledge — Not Found' }
  return {
    title: `${topic.title} — ETOTO Solar Knowledge`,
    description: topic.oneLineRule,
  }
}

export default async function KnowledgeTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = knowledgeBySlug(slug)
  if (!topic) notFound()

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      <MasterclassNav />
      <KnowledgePage topic={topic} />
      <Footer />
    </main>
  )
}
