'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Trophy, Target, AlertCircle, RefreshCw, Share2, Copy, Linkedin } from 'lucide-react'

type QuestionType = 'multiple' | 'multiselect' | 'shortanswer'

interface Question {
  id: number
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple',
    question: 'What does Solar PV do?',
    options: ['Stores electricity', 'Converts sunlight into electricity', 'Heats water directly', 'Connects the home to the grid'],
    correctAnswer: 'Converts sunlight into electricity',
  },
  {
    id: 2,
    type: 'multiple',
    question: 'What is the role of the inverter?',
    options: ['Stores power', 'Measures export payments', 'Converts DC electricity into usable AC electricity', 'Connects the battery to WiFi'],
    correctAnswer: 'Converts DC electricity into usable AC electricity',
  },
  {
    id: 3,
    type: 'multiple',
    question: 'What does a battery primarily allow a homeowner to do?',
    options: ['Generate more electricity', 'Use stored solar power at night', 'Increase panel lifespan', 'Avoid DNO approval'],
    correctAnswer: 'Use stored solar power at night',
  },
  {
    id: 4,
    type: 'multiple',
    question: 'Without a battery, what % of solar energy is typically self-consumed?',
    options: ['10–20%', '30–40%', '70–90%', '100%'],
    correctAnswer: '30–40%',
  },
  {
    id: 5,
    type: 'shortanswer',
    question: 'Does solar still work on cloudy days in the UK?',
    correctAnswer: 'Yes — panels generate from daylight, not direct sunshine.',
  },
  {
    id: 6,
    type: 'multiple',
    question: 'Current VAT rate on domestic solar + battery installs?',
    options: ['20%', '5%', '0%', '10%'],
    correctAnswer: '0%',
  },
  {
    id: 7,
    type: 'shortanswer',
    question: 'What is the Smart Export Guarantee (SEG)?',
    correctAnswer: 'A scheme where homeowners get paid for surplus electricity exported to the grid.',
  },
  {
    id: 8,
    type: 'multiselect',
    question: 'Common reasons homeowners install solar? (Select all that apply)',
    options: ['Energy bill control', 'Environmental reasons only', 'Protection against rising prices', 'Property value increase', 'Government requirement'],
    correctAnswer: ['Energy bill control', 'Protection against rising prices', 'Property value increase'],
  },
  {
    id: 9,
    type: 'multiple',
    question: 'Typical UK solar + battery system cost?',
    options: ['£2,000–£4,000', '£5,000–£7,000', '£9,000–£18,000', '£25,000+'],
    correctAnswer: '£9,000–£18,000',
  },
  {
    id: 10,
    type: 'multiple',
    question: 'Which is NOT a strong qualifier?',
    options: ['Homeowner', '£150/month electricity bill', 'Renting the property', 'Planning to stay long-term'],
    correctAnswer: 'Renting the property',
  },
  {
    id: 11,
    type: 'shortanswer',
    question: "Why is a homeowner's monthly electricity bill important?",
    correctAnswer: "It determines the potential saving from battery storage and the ROI of the whole system. Higher bills = better payback.",
  },
  {
    id: 12,
    type: 'multiple',
    question: 'Customer is moving in 6 months. What do you do?',
    options: ['Book immediately', 'Ignore it', 'Flag to sales / disqualify appropriately', 'Increase urgency'],
    correctAnswer: 'Flag to sales / disqualify appropriately',
  },
  {
    id: 13,
    type: 'multiple',
    question: 'Best way to position the appointment?',
    options: ['"We\'re coming to sell you solar."', '"We\'ll review whether solar and battery makes financial sense for your home."', '"We guarantee savings."', '"It\'s free so you may as well."'],
    correctAnswer: '"We\'ll review whether solar and battery makes financial sense for your home."',
  },
  {
    id: 14,
    type: 'multiple',
    question: 'Customer says "Does it even work in winter?"',
    options: ['No, not really', 'Only in summer', 'Yes, generation reduces but systems are designed for UK climate', "I'm not sure"],
    correctAnswer: 'Yes, generation reduces but systems are designed for UK climate',
  },
  {
    id: 15,
    type: 'multiple',
    question: 'Customer says "I\'ve heard solar doesn\'t work when it\'s cloudy."',
    options: ["That's true", 'Panels generate from daylight, not just direct sunshine', 'It depends on the brand', 'Only in Spain'],
    correctAnswer: 'Panels generate from daylight, not just direct sunshine',
  },
  {
    id: 16,
    type: 'shortanswer',
    question: 'What is your role as an appointment setter?',
    correctAnswer: "Qualify the lead, understand if they're suitable, build excitement, and book the appointment for the sales consultant.",
  },
  {
    id: 17,
    type: 'multiple',
    question: 'Solar is primarily sold in the UK today as:',
    options: ['A luxury product', 'An environmental product only', 'A financial & energy-control decision', 'A government requirement'],
    correctAnswer: 'A financial & energy-control decision',
  },
  {
    id: 18,
    type: 'shortanswer',
    question: 'Why does adding a battery increase savings?',
    correctAnswer: "A battery lets you store cheap off-peak electricity (e.g. 7p/kWh) to use during the day instead of expensive peak rates (e.g. 24p/kWh). It also stores excess solar for evening use rather than exporting it at a lower rate.",
  },
]

export default function InteractiveQuiz() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [selfAssessCorrect, setSelfAssessCorrect] = useState<boolean | null>(null)
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([])
  const [isRetryMode, setIsRetryMode] = useState(false)
  const [activeQuestionIds, setActiveQuestionIds] = useState<number[]>(questions.map(q => q.id))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const currentQuestionId = activeQuestionIds[currentQuestionIndex]
  const question = questions.find(q => q.id === currentQuestionId)!
  const totalQuestions = activeQuestionIds.length

  const handleSelectOption = (option: string) => {
    if (showResult) return
    
    if (question.type === 'multiselect') {
      const current = (selectedAnswer as string[]) || []
      if (current.includes(option)) {
        setSelectedAnswer(current.filter(o => o !== option))
      } else {
        setSelectedAnswer([...current, option])
      }
    } else {
      setSelectedAnswer(option)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) return
    setShowResult(true)
    
    let isCorrect = false
    
    if (question.type === 'multiselect') {
      const correct = question.correctAnswer as string[]
      const selected = selectedAnswer as string[]
      isCorrect = correct.length === selected.length && correct.every(a => selected.includes(a))
    } else if (question.type === 'multiple') {
      isCorrect = selectedAnswer === question.correctAnswer
    }
    // For short answer, we wait for self-assessment
    
    if (question.type !== 'shortanswer') {
      if (isCorrect) {
        setScore(s => s + 1)
      } else {
        setWrongAnswers(prev => [...prev, question.id])
      }
    }
  }

  const handleSelfAssess = (correct: boolean) => {
    setSelfAssessCorrect(correct)
    if (correct) {
      setScore(s => s + 1)
    } else {
      setWrongAnswers(prev => [...prev, question.id])
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(c => c + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setSelfAssessCorrect(null)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
    setSelfAssessCorrect(null)
    setWrongAnswers([])
    setIsRetryMode(false)
    setActiveQuestionIds(questions.map(q => q.id))
  }

  const handleRetryWrong = () => {
    if (wrongAnswers.length === 0) return
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
    setSelfAssessCorrect(null)
    setIsRetryMode(true)
    setActiveQuestionIds(wrongAnswers)
    setWrongAnswers([])
  }

  const isAnswerCorrect = (option: string) => {
    if (question.type === 'multiselect') {
      return (question.correctAnswer as string[]).includes(option)
    }
    return option === question.correctAnswer
  }

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-[#F5921E]'
    return 'text-[#E8192C]'
  }

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100
    if (isRetryMode) {
      if (percentage >= 80) return "Great improvement! You've mastered the gaps."
      if (percentage >= 60) return "Getting better — keep drilling those weak spots."
      return "Review the masterclass sections for these topics."
    }
    if (percentage >= 80) return "You're ready to get on the phones."
    if (percentage >= 60) return "Close — review the formula sections above."
    return "Start from the top. The masterclass is here for a reason."
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#E8192C] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#F5921E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-4 h-4 text-[#E8192C]" />
            <span className="text-sm font-medium text-slate-400 tracking-wide uppercase">
              {isRetryMode ? 'Retry Mode — Wrong Answers Only' : 'Test Yourself'}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-4">Solar PV + Battery Quiz</h2>
          <p className="text-slate-400">
            {isRetryMode 
              ? `Drilling ${totalQuestions} questions you got wrong. Master these to fill the gaps.`
              : "Every appointment setter and sales rep should be able to answer these. 80% pass mark. If you can't hit it, study the masterclass again."
            }
          </p>
        </div>

        {/* Quiz Content */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {!quizComplete ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-400">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="text-sm font-bold text-[#E8192C]">Score: {score}/{currentQuestionIndex}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mb-8">
                <div 
                  className="h-full bg-[#E8192C] rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-lg md:text-xl font-bold mb-6">{question.question}</h3>

              {/* Options */}
              {question.type !== 'shortanswer' ? (
                <div className="space-y-3 sm:space-y-4 mb-6">
                  {question.options?.map((option, index) => {
                    const isSelected = question.type === 'multiselect' 
                      ? (selectedAnswer as string[] || []).includes(option)
                      : selectedAnswer === option
                    const isCorrect = isAnswerCorrect(option)
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectOption(option)}
                        disabled={showResult}
                        className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all touch-action-manipulation min-h-[52px] ${
                          showResult
                            ? isCorrect
                              ? 'bg-green-500/20 border-green-500 text-green-100'
                              : isSelected
                                ? 'bg-red-500/20 border-red-500 text-red-100'
                                : 'bg-white/5 border-white/10 text-slate-400'
                            : isSelected
                              ? 'bg-[#E8192C]/20 border-[#E8192C] text-white'
                              : 'bg-white/5 border-white/10 hover:border-white/30 active:bg-white/10 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showResult
                              ? isCorrect
                                ? 'border-green-500 bg-green-500'
                                : isSelected
                                  ? 'border-red-500 bg-red-500'
                                  : 'border-white/30'
                              : isSelected
                                ? 'border-[#E8192C] bg-[#E8192C]'
                                : 'border-white/30'
                          }`}>
                            {showResult && isCorrect && <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                            {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span className="text-sm sm:text-base">{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                /* Short answer */
                <div className="mb-6">
                  <textarea
                    value={(selectedAnswer as string) || ''}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={showResult}
                    placeholder="Type your answer..."
                    className="w-full p-3 sm:p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-[#E8192C] text-base min-h-[100px]"
                    rows={3}
                  />
                  
                  {showResult && (
                    <div className="mt-4 p-4 bg-white/10 rounded-lg">
                      <p className="text-xs font-semibold text-[#F5921E] uppercase tracking-wide mb-2">Model Answer</p>
                      <p className="text-slate-300 text-sm">{question.correctAnswer as string}</p>
                      
                      {selfAssessCorrect === null && (
                        <div className="mt-4">
                          <p className="text-sm text-slate-400 mb-2">Did you get the key points?</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleSelfAssess(true)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg text-green-100 text-sm hover:bg-green-500/30 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              I got it
                            </button>
                            <button
                              onClick={() => handleSelfAssess(false)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg text-red-100 text-sm hover:bg-red-500/30 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              I missed it
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                {!showResult ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)}
                    className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors min-h-[48px] touch-action-manipulation w-full sm:w-auto"
                  >
                    Submit Answer
                  </button>
                ) : (
                  (question.type !== 'shortanswer' || selfAssessCorrect !== null) && (
                    <button
                      onClick={handleNextQuestion}
                      className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-[#E8192C] hover:bg-[#D01622] active:bg-[#B01220] text-white font-semibold rounded-lg transition-colors min-h-[48px] touch-action-manipulation w-full sm:w-auto"
                    >
                      {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            /* Results Screen - Shareable Card */
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 border border-white/10">
              {/* Shareable Result Card */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 sm:p-8 mb-8 border border-white/10 text-center max-w-md mx-auto">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    (score / totalQuestions) >= 0.8 
                      ? 'bg-green-500/20 text-green-400' 
                      : (score / totalQuestions) >= 0.6 
                        ? 'bg-[#F5921E]/20 text-[#F5921E]' 
                        : 'bg-[#E8192C]/20 text-[#E8192C]'
                  }`}>
                    {(score / totalQuestions) >= 0.8 
                      ? 'Solar Sales Ready' 
                      : (score / totalQuestions) >= 0.6 
                        ? 'Getting There' 
                        : 'Keep Studying'}
                  </span>
                </div>
                
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  (score / totalQuestions) >= 0.8 ? 'bg-green-500/20' : (score / totalQuestions) >= 0.6 ? 'bg-[#F5921E]/20' : 'bg-[#E8192C]/20'
                }`}>
                  {(score / totalQuestions) >= 0.8 ? (
                    <Trophy className="w-8 h-8 text-green-500" />
                  ) : (score / totalQuestions) >= 0.6 ? (
                    <Target className="w-8 h-8 text-[#F5921E]" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-[#E8192C]" />
                  )}
                </div>
                
                <p className={`text-5xl sm:text-6xl font-black mb-2 ${getScoreColor()}`}>
                  {score}/{totalQuestions}
                </p>
                <p className="text-lg text-white mb-1">
                  {Math.round((score / totalQuestions) * 100)}%
                </p>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-slate-400 text-xs mb-1">Certified by</p>
                  <p className="text-white font-bold">ETOTO Media</p>
                  <p className="text-slate-500 text-xs">Solar Sales Masterclass 2026</p>
                </div>
              </div>
              
              {/* Share Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://solar-sales-masterclass.vercel.app/quiz')}&title=${encodeURIComponent(`Just scored ${Math.round((score / totalQuestions) * 100)}% on the ETOTO Solar Sales Quiz`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-medium rounded-lg transition-colors min-h-[44px] touch-action-manipulation"
                >
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://solar-sales-masterclass.vercel.app/quiz')
                    alert('Link copied!')
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors min-h-[44px] touch-action-manipulation"
                >
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors min-h-[48px] touch-action-manipulation"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </button>
                
                {wrongAnswers.length > 0 && (
                  <button
                    onClick={handleRetryWrong}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8192C] hover:bg-[#D01622] text-white font-semibold rounded-lg transition-colors min-h-[48px] touch-action-manipulation"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Wrong Answers ({wrongAnswers.length})
                  </button>
                )}
                
                {(score / totalQuestions) < 0.6 && (
                  <a
                    href="/steps"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors min-h-[48px] touch-action-manipulation"
                  >
                    Review the 9 Steps
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
