import dynamic from 'next/dynamic'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import Footer from '@/components/funnel/Footer'
import { NextStepCTA } from '@/components/shared/NextStepCTA'

// Dynamic import - InteractiveQuiz is a large client component
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
      
      {/* Full-width cinematic hero */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 noise-texture" />
        
        {/* Cinematic glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E8192C]/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#E8192C] text-white text-sm font-bold rounded-full mb-6 uppercase tracking-wide">
              Test Yourself
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Do You Actually Know<br />How to Sell Solar?
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed mb-2">
              18 questions. 5 minute average. 80% to pass.
            </p>
            <p className="text-slate-400 text-base">
              Most reps fail on their first attempt.
            </p>
          </div>

          {/* Quiz stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-center">
              <p className="text-3xl font-black text-white mb-1">18</p>
              <p className="text-sm text-slate-400">Questions</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-center">
              <p className="text-3xl font-black text-white mb-1">5 min</p>
              <p className="text-sm text-slate-400">Average</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 text-center">
              <p className="text-3xl font-black text-white mb-1">80%</p>
              <p className="text-sm text-slate-400">To Pass</p>
            </div>
          </div>

          {/* Topics covered */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto mb-8">
            <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold mb-4">Topics covered:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Energy Audit Maths',
                'Battery vs Solar',
                'Objection Handling',
                'Closing Techniques',
                'Appointment Setting',
                'Product Knowledge',
              ].map((topic, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                  <span className="text-sm text-slate-300">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start button */}
          <div className="text-center">
            <button 
              onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold px-8 py-4 rounded-full transition-all text-lg"
            >
              Start the Quiz
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Quiz component */}
      <div id="quiz-section" className="py-12 px-4 md:px-6 bg-[#FAFBFC]">
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
