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
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />

      {/* Slim header bar */}
      <div className="bg-slate-900 border-b border-white/10 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Solar Sales Quiz</h1>
            <p className="text-slate-400 text-sm">18 questions &middot; 80% to pass</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/10 text-slate-300 rounded-full">5 min avg</span>
            <span className="px-3 py-1 bg-[#E8192C]/20 text-[#E8192C] font-semibold rounded-full">80% to pass</span>
          </div>
        </div>
      </div>

      {/* Quiz — immediately visible */}
      <div className="py-8 px-4 md:px-6">
        <InteractiveQuiz />
      </div>

      {/* Next Step in funnel */}
      <section className="py-8 px-4 sm:px-6 bg-white">
        <NextStepCTA currentStep="test" />
      </section>

      <Footer />
    </main>
  )
}
