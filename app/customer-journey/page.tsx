import type { Metadata } from 'next'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import CustomerJourneyPage from '@/components/customer-journey/CustomerJourneyPage'

export const metadata: Metadata = {
  title: 'The Customer Journey · ETOTO Solar Sales Masterclass',
  description:
    'The 8 questions your customer answers before they ever speak to you. Walk through the funnel as if you were the customer, see what lands in your CRM, learn why this is the foundation of every sales call.',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      <MasterclassNav />
      <CustomerJourneyPage />
      <Footer />
    </main>
  )
}
