import MasterclassNav from '@/components/funnel/MasterclassNav'
import InteractiveQuiz from '@/components/funnel/InteractiveQuiz'
import Footer from '@/components/funnel/Footer'
import { StatsBanner } from '@/components/shared/StatsBanner'

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
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            Test Your Knowledge
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Solar Sales Quiz
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            18 questions covering the entire 9-step formula. 
            Score 80% or higher to pass. Miss a question? We&apos;ll tell you which step to review.
          </p>
        </div>
      </section>
      
      {/* Compact StatsBanner */}
      <StatsBanner 
        stats={[
          { value: "200+", label: "UK Installers" },
          { value: "£175M+", label: "Attributed Sales" },
        ]} 
      />
      
      <InteractiveQuiz />
      
      <Footer />
    </main>
  )
}
