import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Appointment Setter Quiz — ETOTO Media',
  description: '18 interactive questions every appointment setter should answer before making a call. 80% pass mark. £3.99.',
  openGraph: {
    title: 'Are Your Setters Ready for the Phones?',
    description: '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones. £3.99.',
    type: 'website',
    images: [{ url: '/og/appointment-quiz.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Your Setters Ready for the Phones?',
    description: '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones. £3.99.',
    images: ['/og/appointment-quiz.png'],
  },
}

export default function AppointmentQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
