import Hero from '@/components/funnel/Hero'
import TheProblem from '@/components/funnel/TheProblem'
import TheMethod from '@/components/funnel/TheMethod'
import MasterclassNav from '@/components/funnel/MasterclassNav'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'
import Footer from '@/components/funnel/Footer'
import Link from 'next/link'
import { ListOrdered, Video, Phone, HelpCircle, Calculator, Package, ArrowRight } from 'lucide-react'

const ctaCards = [
  {
    icon: ListOrdered,
    title: 'The 9 Steps',
    description: 'The complete formula',
    href: '/steps',
    cta: 'Start Learning',
  },
  {
    icon: Video,
    title: 'Live Sales Call',
    description: 'Watch it happen',
    href: '/live-call',
    cta: 'Watch Now',
  },
  {
    icon: Phone,
    title: 'Appointment Setting',
    description: 'The setter playbook',
    href: '/appointment-setting',
    cta: 'Read the Playbook',
  },
  {
    icon: HelpCircle,
    title: 'Knowledge Quiz',
    description: '18 questions, 80% to pass',
    href: '/quiz',
    cta: 'Test Yourself',
  },
  {
    icon: Calculator,
    title: 'Calculator',
    description: 'Build a system live',
    href: '/steps#formula-calculator',
    cta: 'Try It',
  },
  {
    icon: Package,
    title: 'Resources & Toolkit',
    description: 'Scripts, frameworks, and more',
    href: '/resources',
    cta: 'Browse',
  },
]

export default function SalesMasterclass() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* PART 1: THE HOOK */}
      <Hero />
      <TheProblem />
      <TheMethod />
      
      {/* PART 2: CTA CARDS */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#E8192C]/10 text-[#E8192C] text-sm font-medium rounded-full mb-4">
              Explore the Masterclass
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose where to start
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to sell solar professionally — from scripts to live demonstrations to hands-on tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {ctaCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-6 transition-all hover:shadow-lg hover:border-slate-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E8192C]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8192C]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#E8192C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-1">{card.title}</h3>
                      <p className="text-sm text-slate-500 mb-3">{card.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[#E8192C] group-hover:gap-2 transition-all">
                        {card.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* PART 3: SOLAFLOW TEASER */}
      <SolaFlowDemo />
      
      <Footer />
    </main>
  )
}
