import type { Metadata } from 'next'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import PackageOffersPage from '@/components/package-offers/PackageOffersPage'

export const metadata: Metadata = {
  title: 'Package Offers · ETOTO Solar Sales Masterclass',
  description:
    'Real package ad creatives from ETOTO-client installers, paired with the SolaFlow formula breakdown for each. Match customers to the nearest fit and walk them through the maths.',
}

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      <MasterclassNav />
      <PackageOffersPage />
      <Footer />
    </main>
  )
}
