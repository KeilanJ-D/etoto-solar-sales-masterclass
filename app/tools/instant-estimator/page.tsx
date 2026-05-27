import type { Metadata } from 'next'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import InstantEstimatorWizard from '@/components/instant-estimator/InstantEstimatorWizard'

export const metadata: Metadata = {
  title: 'Instant Estimator · ETOTO Solar Sales Masterclass',
  description:
    'Practise the SolaFlow 4-stage flow: Energy audit → Battery → Panels → Payback. Indicative numbers for training — verify against your company SolaFlow pricing before quoting customers.',
}

export default function InstantEstimatorPage() {
  return (
    <>
      <MasterclassNav />
      <InstantEstimatorWizard />
      <Footer />
    </>
  )
}
