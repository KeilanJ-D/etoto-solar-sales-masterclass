import MasterclassNav from '@/components/funnel/MasterclassNav'
import AppointmentSetting from '@/components/funnel/AppointmentSetting'
import Footer from '@/components/funnel/Footer'

export const metadata = {
  title: 'Solar Appointment Setter Playbook — ETOTO Media',
  description: 'How to qualify leads, build excitement, and book appointments that close. The complete setter\'s guide.',
  openGraph: {
    title: 'Solar Appointment Setter Playbook — ETOTO Media',
    description: 'How to qualify leads, build excitement, and book appointments that close. The complete setter\'s guide.',
  },
}

export default function AppointmentSettingPage() {
  return (
    <main className="bg-[#FAFBFC] min-h-screen overflow-x-hidden">
      <MasterclassNav />
      
      {/* Header */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4">
            For Appointment Setters
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The Setter Playbook
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Your job isn&apos;t to sell solar. It&apos;s to book appointments that close. 
            Here&apos;s how to qualify, position, and hand off like a pro.
          </p>
        </div>
      </section>
      
      <AppointmentSetting />
      
      <Footer />
    </main>
  )
}
