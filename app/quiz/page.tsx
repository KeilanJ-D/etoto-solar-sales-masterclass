import dynamic from 'next/dynamic'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { NextStepCTA } from '@/components/shared/NextStepCTA'

const InteractiveQuiz = dynamic(() => import('@/components/funnel/InteractiveQuiz'), {
  loading: () => (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-24 mx-auto mb-4" />
        <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto mb-8" />
        <div className="space-y-3">
          {[1,2,3,4].map(i => <div key={i} className="h-14 bg-slate-100 rounded-xl" />)}
        </div>
      </div>
    </div>
  ),
})

export const metadata = {
  title: 'Solar Sales Knowledge Quiz — ETOTO Media',
  description: '18 questions every solar rep and appointment setter should answer. 80% pass mark. Test yourself.',
  openGraph: {
    title: 'Solar Sales Knowledge Quiz — ETOTO Media',
    description: '18 questions every solar rep and appointment setter should answer. 80% pass mark. Test yourself.',
  },
}

export default function QuizPage() {
  return (
    <main className="bg-slate-900 min-h-screen overflow-x-hidden">
      <MasterclassNav />

      {/* Full page quiz experience */}
      <InteractiveQuiz />

      {/* Next Step in funnel */}
      <section className="py-8 px-4 sm:px-6 bg-white">
        <NextStepCTA currentStep="test" />
      </section>

      <Footer />
    </main>
  )
}
