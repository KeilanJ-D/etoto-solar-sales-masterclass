'use client'

import { useState, useEffect } from 'react'
import { Check, X, RotateCcw, Award, ChevronRight, BookOpen, Users, Target, Briefcase } from 'lucide-react'
import ProductHero from '@/components/products/ProductHero'
import PasswordGate from '@/components/products/PasswordGate'
import BuySection from '@/components/products/BuySection'
import SolaFlowUpsell from '@/components/products/SolaFlowUpsell'
import ETOTOServices from '@/components/products/ETOTOServices'
import ProductFooter from '@/components/products/ProductFooter'
import Link from 'next/link'

// Full quiz data with explanations
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does Solar PV do?",
    options: ["Stores energy for later use", "Converts sunlight into electricity", "Heats water using the sun", "Reduces the home's carbon footprint directly"],
    correct: 1,
    explanation: "Solar PV (photovoltaic) panels convert daylight into DC electricity using semiconductor cells. The inverter then converts this to AC for household use. They don't store energy (that's the battery) or heat water (that's solar thermal).",
    studyStep: 3
  },
  {
    id: 2,
    question: "What is the role of the inverter?",
    options: ["Stores excess electricity", "Measures how much electricity is used", "Converts DC electricity into usable AC electricity", "Increases the wattage of the panels"],
    correct: 2,
    explanation: "Solar panels produce DC (direct current). Your home runs on AC (alternating current). The inverter bridges the gap. Hybrid inverters also manage battery charging and grid export. Without an inverter, the panels are useless to your home.",
    studyStep: 3
  },
  {
    id: 3,
    question: "What does a battery primarily allow a homeowner to do?",
    options: ["Generate more electricity", "Use stored solar power at night", "Sell electricity back to the grid", "Increase panel efficiency"],
    correct: 1,
    explanation: "Batteries store excess solar generation during the day for use at night or during peak rate periods. More importantly for the sales pitch: they let homeowners charge overnight at 7p and avoid paying 28p during the day — that's the arbitrage saving that drives ROI.",
    studyStep: 4
  },
  {
    id: 4,
    question: "Without a battery, what percentage of solar energy is typically self-consumed?",
    options: ["10-20%", "30-40%", "60-70%", "80-90%"],
    correct: 1,
    explanation: "Most solar generation happens during the day when many homeowners are at work. Without a battery, 60-70% of generated energy gets exported at low SEG rates (12-16p) instead of offsetting peak usage (28p). A battery flips this — self-consumption jumps to 70-90%.",
    studyStep: 4
  },
  {
    id: 5,
    question: "Does solar still work on cloudy days in the UK?",
    options: ["Yes", "No"],
    correct: 0,
    explanation: "Panels generate from daylight, not direct sunshine. A cloudy day in the UK still produces 10-25% of peak output. Over a full year, the UK averages 4.5 peak sun hours per day — that's the figure we use in ROI calculations. If a customer asks this, never dismiss it. Acknowledge it and explain the annual average.",
    studyStep: 5
  },
  {
    id: 6,
    question: "Current VAT rate on domestic solar + battery installs?",
    options: ["5%", "10%", "0%", "20%"],
    correct: 2,
    explanation: "0% VAT on residential solar and battery installations has been in effect since April 2022 and runs through March 2027. This saves the customer £1,800-£3,000 on a typical install. Use this in the pitch — 'right now there's zero VAT, but that expires March 2027.'",
    studyStep: 6
  },
  {
    id: 7,
    question: "What is the Smart Export Guarantee (SEG)?",
    options: ["A government rebate for solar installation", "A scheme where homeowners get paid for surplus electricity exported to the grid", "A warranty program for solar panels", "An insurance scheme for solar equipment"],
    correct: 1,
    explanation: "SEG replaced the old Feed-in Tariff in 2020. Suppliers with 150,000+ customers must offer an export rate, but rates vary enormously — from 3p (British Gas) to 16p (Ecotricity) to 29-32p peak (Octopus Flux). Always check which tariff the customer is on or could switch to.",
    studyStep: 5
  },
  {
    id: 8,
    question: "Common reasons homeowners install solar? (Select all that apply)",
    options: ["Bill control", "Government requirement", "Price protection for the future", "Property value increase"],
    correct: [0, 2, 3],
    multiSelect: true,
    explanation: "Environmental reasons matter to some customers, but they're rarely the PRIMARY driver. Bill control and protection against rising prices are the top motivators. Property value increase is real — studies show £5,000-£10,000 uplift on a solar-equipped home. It's NOT a government requirement anywhere in the UK (yet).",
    studyStep: 2
  },
  {
    id: 9,
    question: "Typical UK solar + battery system cost?",
    options: ["£3,000-£6,000", "£6,000-£9,000", "£9,000-£18,000", "£20,000+"],
    correct: 2,
    explanation: "A typical 4-6 kWp solar array with 8-16 kWh battery storage falls in the £9,000-£18,000 range depending on products, installer margin, and system size. Anything under £7,000 for solar + battery should raise questions about product quality. Anything over £20,000 is either a very large system or an overcharge.",
    studyStep: 6
  },
  {
    id: 10,
    question: "Which is NOT a strong qualifier for a solar lead?",
    options: ["Homeowner", "High electricity bill", "Renting the property", "Planning to stay 5+ years"],
    correct: 2,
    explanation: "Renters can't install solar — they don't own the roof. This is the #1 disqualifier. Always confirm homeowner status early. Don't waste 15 minutes on a call before discovering they rent. The other three (homeowner, high bill, long-term stay) are all strong positive signals.",
    studyStep: 2
  },
  {
    id: 11,
    question: "Why is a homeowner's monthly electricity bill important?",
    options: ["It shows their credit score", "It determines the potential saving from battery storage and the ROI", "It's required by law", "It shows their environmental commitment"],
    correct: 1,
    explanation: "The monthly bill is the starting point for every calculation in the 9-step formula. £150/month = £1,800/year ÷ 28p = 6,429 kWh. That number drives battery sizing, daily cost, annual saving, and payback period. Higher bill = better ROI = easier close. Below £80/month, the payback stretches past 7 years.",
    studyStep: 3
  },
  {
    id: 12,
    question: "Customer is moving in 6 months. What do you do?",
    options: ["Push for a quick sale", "Book the appointment anyway", "Flag to sales / disqualify appropriately", "Offer a discount"],
    correct: 2,
    explanation: "Solar is a 5-year payback investment. Someone moving in 6 months won't see the return. Don't book the appointment — flag it to the sales team for a judgement call. Exception: if they're moving to a property they own and want solar on THAT house, re-qualify for the new address.",
    studyStep: 2
  },
  {
    id: 13,
    question: "Best way to position the appointment?",
    options: ["'We'll give you a great deal on solar'", "'We'll review whether solar and battery makes financial sense for your home'", "'We guarantee you'll save money'", "'We'll sell you the best panels on the market'"],
    correct: 1,
    explanation: "'Financial sense for your home' does three things: (1) it's consultative not salesy, (2) it implies there might be a scenario where it DOESN'T make sense (which builds trust), (3) it frames the visit as a review, not a pitch. Never say 'sell you solar' or 'guarantee savings'.",
    studyStep: 1
  },
  {
    id: 14,
    question: "Customer says 'Does it even work in winter?'",
    options: ["Avoid the question", "Say no, but summer makes up for it", "Yes, generation reduces but systems are designed for UK climate", "Promise them winter won't affect output"],
    correct: 2,
    explanation: "Winter output is roughly 20-30% of summer peak. But the battery saving (off-peak charging) works identically in winter — it doesn't depend on sunshine at all. This is exactly why we lead with battery savings in the pitch. Say: 'Great question — generation does drop in winter, but your battery savings are the same year-round.'",
    studyStep: 4
  },
  {
    id: 15,
    question: "Customer says 'I've heard solar doesn't work when it's cloudy.'",
    options: ["Agree and move on", "Panels generate from daylight, not just direct sunshine", "Offer a discount to compensate", "Say it's a common myth without explaining"],
    correct: 1,
    explanation: "This is the most common misconception. Panels generate from photons in daylight, not heat or direct sun. Germany has worse weather than the UK and is one of the world's largest solar markets. The key stat: UK averages 4.5 peak sun hours per day across the year, including cloudy days.",
    studyStep: 5
  },
  {
    id: 16,
    question: "What is your role as an appointment setter?",
    options: ["Close the sale on the phone", "Qualify the lead, build excitement, book the appointment", "Give detailed technical specifications", "Negotiate the price"],
    correct: 1,
    explanation: "You are NOT selling solar. You are booking an appointment with a qualified, warm, excited prospect. If you try to sell on the phone, you'll either close badly or scare them off. Your job: confirm they're a homeowner, confirm budget potential (bill size), confirm timeline, build excitement using SolaFlow, and book the visit.",
    studyStep: 1
  },
  {
    id: 17,
    question: "Solar is primarily sold in the UK today as:",
    options: ["An environmental product", "A luxury home improvement", "A financial & energy-control decision", "A government-mandated requirement"],
    correct: 2,
    explanation: "Solar used to be sold as an environmental product. It's now sold as a financial one — and that's exactly how the 9-step formula works. 'Your house costs £4.93 a day to run. We can get that to £1.23.' That's a financial pitch, not a green one. The environmental benefit is real but it's the bonus, not the lead.",
    studyStep: 1
  },
  {
    id: 18,
    question: "Why does adding a battery increase savings?",
    options: ["Batteries generate electricity", "Stores cheap off-peak electricity for daytime use instead of buying at peak rates", "Batteries get government subsidies", "Batteries improve panel efficiency"],
    correct: 1,
    explanation: "This is the core of the battery-first pitch. Without a battery: you buy electricity at 28p all day. With a battery: you buy at 7p overnight, store it, use it during the day. The saving is the gap between those two rates multiplied by your daily usage. The off-peak arbitrage is the bigger number and the one that sells.",
    studyStep: 4
  },
]

export default function AppointmentQuizPage() {
  const [isUnlocked, setIsUnlocked] = useState(process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true')

  useEffect(() => {
    const storedToken = localStorage.getItem('access_appointment-quiz')
    if (storedToken) {
      setIsUnlocked(true)
    }
  }, [])

  return (
    <main className="bg-[#FAFBFC] min-h-screen">
      {/* Hero */}
      <ProductHero
        title="Are Your Setters Ready for the Phones?"
        subtitle="18 interactive questions. Solar basics, qualification, objection handling, appointment positioning. 80% pass mark. Track scores, retry wrong answers, drill the gaps."
        price="£3.99"
        buyLink="https://buy.stripe.com/5kQ9AV0QS7Ix0eScCCfEk04"
        stats={[
          { value: '18', label: 'Questions' },
          { value: '80%', label: 'Pass Mark' },
          { value: 'Retry', label: 'Wrong Answers' },
          { value: 'Track', label: 'Best Score' },
        ]}
        isUnlocked={isUnlocked}
      />

      {/* Preview Quiz (5 free questions) / Full Quiz */}
      <PasswordGate
        productId="appointment-quiz"
        productName="Appointment Setter Quiz"
        price="£3.99"
        buyLink="https://buy.stripe.com/5kQ9AV0QS7Ix0eScCCfEk04"
        previewContent={
          <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-medium text-[#E8192C] tracking-wide uppercase mb-2 block">Preview</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Try 5 Questions Free</h2>
                <p className="text-slate-600">Answer these 5 preview questions, then unlock the full 18-question quiz.</p>
              </div>
              
              <PreviewQuiz />
            </div>
          </section>
        }
      >
        {/* Full Quiz */}
        <FullQuiz />
      </PasswordGate>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Who This Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Appointment Setting Teams', desc: 'Test your team before they hit the phones. Anyone under 80% goes back to the masterclass.' },
              { icon: Target, title: 'Solo Installers', desc: 'Setting your own appointments? Make sure you know the fundamentals before every call.' },
              { icon: Briefcase, title: 'Business Owners', desc: 'Audit your team\'s knowledge. Screenshot scores and track improvement over time.' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#E8192C]" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buy Section */}
      {!isUnlocked && (
        <BuySection
          productName="Appointment Setter Quiz"
          price="£3.99"
          bundlePrice="£9.99"
          buyLink="https://buy.stripe.com/5kQ9AV0QS7Ix0eScCCfEk04"
          bundleLink="https://buy.stripe.com/5kQaEZ7fg5Ap8Lo466fEk06"
          features={[
            'Full 18-question interactive quiz',
            'Detailed explanations for every answer',
            'Retry wrong answers mode',
            'Score history tracking',
            'Links to relevant masterclass sections',
            'Printable certificate for 80%+ scores',
          ]}
        />
      )}

      {/* SolaFlow Upsell */}
      <SolaFlowUpsell />

      {/* ETOTO Services */}
      <ETOTOServices />

      {/* Footer */}
      <ProductFooter />
    </main>
  )
}

// Preview Quiz (5 questions, no explanations)
function PreviewQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | number[] | null)[]>(Array(5).fill(null))
  const [showResults, setShowResults] = useState(false)

  const previewQuestions = QUIZ_QUESTIONS.slice(0, 5)

  const handleAnswer = (optionIndex: number) => {
    const q = previewQuestions[currentQuestion]
    if (q.multiSelect) {
      const current = (answers[currentQuestion] as number[]) || []
      if (current.includes(optionIndex)) {
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[currentQuestion] = current.filter(i => i !== optionIndex)
          return newAnswers
        })
      } else {
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[currentQuestion] = [...current, optionIndex]
          return newAnswers
        })
      }
    } else {
      setAnswers(prev => {
        const newAnswers = [...prev]
        newAnswers[currentQuestion] = optionIndex
        return newAnswers
      })
    }
  }

  const handleNext = () => {
    if (currentQuestion < previewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const getScore = () => {
    return previewQuestions.reduce((score, q, index) => {
      const answer = answers[index]
      if (q.multiSelect) {
        const correct = q.correct as number[]
        const userAnswer = (answer as number[]) || []
        if (correct.length === userAnswer.length && correct.every(c => userAnswer.includes(c))) {
          return score + 1
        }
      } else {
        if (answer === q.correct) {
          return score + 1
        }
      }
      return score
    }, 0)
  }

  if (showResults) {
    const score = getScore()
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#E8192C]/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-black text-[#E8192C]">{score}/5</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Preview Complete!</h3>
        <p className="text-slate-600 mb-6">
          You scored {score} out of 5 on the preview. 13 more questions to go.
        </p>
        <div className="bg-slate-900 text-white rounded-xl p-6">
          <p className="text-lg font-semibold mb-2">Unlock the Full Quiz</p>
          <p className="text-slate-400 text-sm mb-4">Get detailed explanations, retry wrong answers, and track your best score.</p>
          <p className="text-2xl font-black text-[#E8192C]">£3.99</p>
        </div>
      </div>
    )
  }

  const q = previewQuestions[currentQuestion]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Progress */}
      <div className="bg-slate-100 px-5 py-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">Question {currentQuestion + 1} of 5</span>
        <div className="flex gap-1">
          {previewQuestions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === currentQuestion ? 'bg-[#E8192C]' : i < currentQuestion ? 'bg-emerald-500' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">{q.question}</h3>

        <div className="space-y-3 mb-6">
          {q.options.map((option, index) => {
            const isSelected = q.multiSelect 
              ? ((answers[currentQuestion] as number[]) || []).includes(index)
              : answers[currentQuestion] === index
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected 
                    ? 'border-[#E8192C] bg-[#E8192C]/5' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="font-medium text-slate-900">{option}</span>
              </button>
            )
          })}
        </div>

        {q.multiSelect && (
          <p className="text-sm text-slate-500 mb-4">Select all that apply</p>
        )}

        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === null || (q.multiSelect && (answers[currentQuestion] as number[])?.length === 0)}
          className="w-full bg-[#E8192C] hover:bg-[#D01622] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all"
        >
          {currentQuestion < previewQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  )
}

// Full Quiz with explanations and retry
function FullQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | number[] | null)[]>(Array(18).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [retryMode, setRetryMode] = useState(false)
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([])
  const [bestScore, setBestScore] = useState<number | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('quiz_best_score')
    if (stored) {
      setBestScore(parseInt(stored))
    }
  }, [])

  const questions = retryMode 
    ? wrongQuestions.map(i => QUIZ_QUESTIONS[i])
    : QUIZ_QUESTIONS

  const handleAnswer = (optionIndex: number) => {
    const qIndex = retryMode ? wrongQuestions[currentQuestion] : currentQuestion
    const q = QUIZ_QUESTIONS[qIndex]
    
    if (q.multiSelect) {
      const current = (answers[qIndex] as number[]) || []
      if (current.includes(optionIndex)) {
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[qIndex] = current.filter(i => i !== optionIndex)
          return newAnswers
        })
      } else {
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[qIndex] = [...current, optionIndex]
          return newAnswers
        })
      }
    } else {
      setAnswers(prev => {
        const newAnswers = [...prev]
        newAnswers[qIndex] = optionIndex
        return newAnswers
      })
      setShowExplanation(true)
    }
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    const wrong: number[] = []
    let score = 0
    
    QUIZ_QUESTIONS.forEach((q, index) => {
      const answer = answers[index]
      let isCorrect = false
      
      if (q.multiSelect) {
        const correct = q.correct as number[]
        const userAnswer = (answer as number[]) || []
        isCorrect = correct.length === userAnswer.length && correct.every(c => userAnswer.includes(c))
      } else {
        isCorrect = answer === q.correct
      }
      
      if (isCorrect) {
        score++
      } else {
        wrong.push(index)
      }
    })

    setWrongQuestions(wrong)
    setShowResults(true)

    // Update best score
    if (bestScore === null || score > bestScore) {
      setBestScore(score)
      localStorage.setItem('quiz_best_score', score.toString())
    }
  }

  const startRetry = () => {
    setRetryMode(true)
    setCurrentQuestion(0)
    setShowResults(false)
    setShowExplanation(false)
  }

  const restart = () => {
    setAnswers(Array(18).fill(null))
    setCurrentQuestion(0)
    setShowResults(false)
    setShowExplanation(false)
    setRetryMode(false)
    setWrongQuestions([])
  }

  const getScore = () => {
    return QUIZ_QUESTIONS.reduce((score, q, index) => {
      const answer = answers[index]
      if (q.multiSelect) {
        const correct = q.correct as number[]
        const userAnswer = (answer as number[]) || []
        if (correct.length === userAnswer.length && correct.every(c => userAnswer.includes(c))) {
          return score + 1
        }
      } else {
        if (answer === q.correct) {
          return score + 1
        }
      }
      return score
    }, 0)
  }

  if (showResults) {
    const score = retryMode ? QUIZ_QUESTIONS.length - wrongQuestions.filter(i => {
      const q = QUIZ_QUESTIONS[i]
      const answer = answers[i]
      if (q.multiSelect) {
        const correct = q.correct as number[]
        const userAnswer = (answer as number[]) || []
        return !(correct.length === userAnswer.length && correct.every(c => userAnswer.includes(c)))
      }
      return answer !== q.correct
    }).length : getScore()
    
    const passed = score >= 14.4 // 80% of 18

    return (
      <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            {/* Score */}
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-emerald-100' : 'bg-amber-100'}`}>
              <span className={`text-3xl font-black ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {score}/18
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h3>
            <p className="text-slate-600 mb-4">
              {passed 
                ? `You scored ${Math.round(score / 18 * 100)}% — you're ready for the phones!`
                : `You scored ${Math.round(score / 18 * 100)}% — 80% is the pass mark. Review the masterclass and try again.`
              }
            </p>

            {bestScore !== null && (
              <p className="text-sm text-slate-500 mb-6">
                Your best score: {bestScore}/18 ({Math.round(bestScore / 18 * 100)}%)
              </p>
            )}

            {/* Certificate (if passed) */}
            {passed && (
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-6 mb-6">
                <Award className="w-12 h-12 mx-auto mb-3" />
                <p className="text-lg font-bold">Certified — ETOTO Solar Sales Ready</p>
                <p className="text-emerald-100 text-sm">Screenshot this to share with your team!</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              {wrongQuestions.length > 0 && !retryMode && (
                <button
                  onClick={startRetry}
                  className="w-full flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#D01622] text-white font-semibold py-4 rounded-xl transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry Wrong Answers ({wrongQuestions.length})</span>
                </button>
              )}
              
              <button
                onClick={restart}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all"
              >
                <span>Take Quiz Again</span>
              </button>

              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold py-4 rounded-xl hover:bg-slate-50 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Back to Masterclass</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const qIndex = retryMode ? wrongQuestions[currentQuestion] : currentQuestion
  const q = QUIZ_QUESTIONS[qIndex]
  const userAnswer = answers[qIndex]
  
  const isCorrect = q.multiSelect
    ? ((q.correct as number[]).length === ((userAnswer as number[]) || []).length && 
       (q.correct as number[]).every(c => ((userAnswer as number[]) || []).includes(c)))
    : userAnswer === q.correct

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        {/* Success banner */}
        <div className="bg-emerald-600 text-white py-3 px-4 text-center rounded-t-xl">
          <p className="text-sm font-medium flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Full quiz unlocked! {retryMode ? `Retrying ${wrongQuestions.length} wrong answers` : 'All 18 questions with explanations.'}
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-sm border border-slate-200 border-t-0 overflow-hidden">
          {/* Progress */}
          <div className="bg-slate-100 px-5 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            {bestScore !== null && (
              <span className="text-sm text-slate-500">Best: {bestScore}/18</span>
            )}
          </div>

          {/* Question */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6">{q.question}</h3>

            <div className="space-y-3 mb-6">
              {q.options.map((option, index) => {
                const isSelected = q.multiSelect 
                  ? ((userAnswer as number[]) || []).includes(index)
                  : userAnswer === index
                
                const correctAnswer = q.multiSelect ? (q.correct as number[]).includes(index) : index === q.correct
                
                let bgClass = 'border-slate-200 hover:border-slate-300'
                if (showExplanation) {
                  if (correctAnswer) {
                    bgClass = 'border-emerald-500 bg-emerald-50'
                  } else if (isSelected && !correctAnswer) {
                    bgClass = 'border-red-500 bg-red-50'
                  }
                } else if (isSelected) {
                  bgClass = 'border-[#E8192C] bg-[#E8192C]/5'
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation && !q.multiSelect}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${bgClass}`}
                  >
                    {showExplanation && (
                      correctAnswer ? (
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : isSelected ? (
                        <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                      ) : null
                    )}
                    <span className="font-medium text-slate-900">{option}</span>
                  </button>
                )
              })}
            </div>

            {q.multiSelect && !showExplanation && (
              <p className="text-sm text-slate-500 mb-4">Select all that apply</p>
            )}

            {/* Show explanation */}
            {showExplanation && (
              <div className={`rounded-xl p-5 mb-6 ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
                <p className={`font-semibold mb-2 ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-sm text-slate-700">{q.explanation}</p>
                {q.studyStep && (
                  <Link
                    href={`/#step-${q.studyStep}`}
                    className="inline-flex items-center gap-1 text-sm text-[#E8192C] hover:underline mt-3"
                  >
                    Study Step {q.studyStep} <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}

            {/* Multi-select submit or next */}
            {q.multiSelect && !showExplanation ? (
              <button
                onClick={() => setShowExplanation(true)}
                disabled={!userAnswer || (userAnswer as number[]).length === 0}
                className="w-full bg-[#E8192C] hover:bg-[#D01622] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all"
              >
                Submit Answer
              </button>
            ) : showExplanation ? (
              <button
                onClick={handleNext}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
