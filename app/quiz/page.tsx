import dynamic from 'next/dynamic'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { NextStepCTA } from '@/components/shared/NextStepCTA'

const InteractiveQuiz = dynamic(() => import('@/components/funnel/InteractiveQuiz'), {
  loading: () => (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#E8192C]/30 border-t-[#E8192C] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading quiz...</p>
      </div>
    </div>
  ),
})

export const metadata = {
  title: 'Solar Sales Certification Quiz — ETOTO Media',
  description: '18 questions. 80% to pass. Most fail first time. Prove you can close solar deals.',
  openGraph: {
    title: 'Could You Close This Deal? — Solar Sales Quiz',
    description: '18 questions. 80% to pass. Most fail first time. Prove you can close solar deals.',
  },
}

export default function QuizPage() {
  return (
    <main className="bg-slate-900 min-h-screen overflow-x-hidden">
      <MasterclassNav />

      {/* Full-screen immersive quiz */}
      <InteractiveQuiz />

      {/* Next Step - only visible after completing */}
      <section className="py-12 px-4 sm:px-6 bg-slate-800 border-t border-white/5">
        <NextStepCTA currentStep="test" />
      </section>

      <Footer />
    </main>
  )
}
