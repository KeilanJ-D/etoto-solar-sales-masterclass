import { redirect } from 'next/navigation'

/**
 * /quiz used to host a separate `InteractiveQuiz` component that duplicated
 * the richer 18-question knowledge quiz on `/appointment-quiz`. Two near-
 * identical quiz pages confused first-time readers (deck audit finding,
 * top-7 fix #4). Permanent redirect to consolidate.
 */
export default function QuizRedirectPage() {
  redirect('/appointment-quiz')
}
