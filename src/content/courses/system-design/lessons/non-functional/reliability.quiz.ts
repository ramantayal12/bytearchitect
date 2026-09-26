import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A service is up 99.99% of the time but occasionally returns incorrect account balances. How would you describe it?',
    options: [
      { text: 'Highly available but not reliable', correct: true },
      { text: 'Reliable but not available' },
      { text: 'Both highly available and reliable' },
    ],
    explanation:
      'Reliability includes correctness; responding with wrong data is a reliability failure.',
  },
  {
    prompt: 'Given availability = MTBF / (MTBF + MTTR), which actions improve availability?',
    options: [
      { text: 'Reducing the time to detect and repair failures', correct: true },
      { text: 'Making failures less frequent', correct: true },
      { text: 'Increasing MTTR' },
    ],
    explanation: 'Higher MTBF or lower MTTR both raise availability.',
  },
  {
    prompt: 'What is the purpose of chaos engineering?',
    options: [
      { text: 'To randomly delete production data' },
      {
        text: 'To deliberately inject failures and verify that recovery mechanisms work',
        correct: true,
      },
      { text: 'To increase load on a system for benchmarking' },
    ],
    explanation:
      'Failure paths are rarely exercised; chaos experiments test them before real incidents do.',
  },
])
