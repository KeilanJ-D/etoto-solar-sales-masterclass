import Hero from '@/components/funnel/Hero'
import TheProblem from '@/components/funnel/TheProblem'
import TheMethod from '@/components/funnel/TheMethod'

import Step1Rapport from '@/components/funnel/Step1Rapport'
import Step2Discovery from '@/components/funnel/Step2Discovery'
import Step3EnergyAudit from '@/components/funnel/Step3EnergyAudit'
import Step4BatteryValue from '@/components/funnel/Step4BatteryValue'
import Step5SolarValue from '@/components/funnel/Step5SolarValue'
import Step6Financials from '@/components/funnel/Step6Financials'
import Step7Objections from '@/components/funnel/Step7Objections'
import Step8Close from '@/components/funnel/Step8Close'
import Step9FollowUp from '@/components/funnel/Step9FollowUp'

import LiveCallRecording from '@/components/funnel/LiveCallRecording'
import SolaFlowDemo from '@/components/funnel/SolaFlowDemo'

import AppointmentSetting from '@/components/funnel/AppointmentSetting'

import InteractiveQuiz from '@/components/funnel/InteractiveQuiz'
import SummaryDownloads from '@/components/funnel/SummaryDownloads'
import Footer from '@/components/funnel/Footer'
import JumpToCalcButton from '@/components/funnel/JumpToCalcButton'

export default function SalesMasterclass() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <JumpToCalcButton />
      {/* ================================
          PART 1: CONTEXT
          ================================ */}
      <Hero />
      <TheProblem />
      <TheMethod />
      
      {/* ================================
          PART 2: THE 9 SALES STEPS
          ================================ */}
      <Step1Rapport />
      <Step2Discovery />
      <Step3EnergyAudit />
      <Step4BatteryValue />
      <Step5SolarValue />
      <Step6Financials />
      <Step7Objections />
      <Step8Close />
      <Step9FollowUp />
      
      {/* ================================
          PART 3: LIVE DEMONSTRATION
          ================================ */}
      <LiveCallRecording />
      <SolaFlowDemo />
      
      {/* ================================
          PART 4: APPOINTMENT SETTING
          ================================ */}
      <AppointmentSetting />
      
      {/* ================================
          PART 5: TEST & RESOURCES
          ================================ */}
      <InteractiveQuiz />
      <SummaryDownloads />
      
      <Footer />
    </main>
  )
}
