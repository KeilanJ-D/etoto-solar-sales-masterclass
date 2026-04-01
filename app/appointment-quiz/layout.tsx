import type { Metadata } from 'next'

const isInternal = process.env.NEXT_PUBLIC_UNLOCK_ALL === 'true'

export const metadata: Metadata = {
  title: isInternal 
    ? 'Solar Appointment Setter Quiz — ETOTO Media' 
    : 'Solar Appointment Setter Quiz (£3.99) — ETOTO Media',
  description: isInternal
    ? '18 interactive questions every appointment setter should answer before making a call. 80% pass mark.'
    : '18 interactive questions every appointment setter should answer before making a call. 80% pass mark. £3.99.',
  openGraph: {
    title: 'Are Your Setters Ready for the Phones?',
    description: isInternal
      ? '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones.'
      : '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones. £3.99.',
    type: 'website',
    images: [{ url: '/og/appointment-quiz.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are Your Setters Ready for the Phones?',
    description: isInternal
      ? '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones.'
      : '18 questions. 80% pass mark. The quiz that separates ready setters from unprepared ones. £3.99.',
    images: ['/og/appointment-quiz.jpg'],
  },
}

export default function AppointmentQuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
