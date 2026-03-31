'use client'

export default function QuizStartButton() {
  return (
    <button
      onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-bold px-8 py-4 rounded-full transition-all text-lg"
    >
      Start the Quiz
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  )
}
