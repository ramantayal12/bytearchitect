import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What sustained the congestion between the internal and main networks?',
    options: [
      {
        text: 'Clients retrying without adequate backoff, adding more connection attempts',
        correct: true,
      },
      { text: 'A fiber cut between data centers' },
      { text: 'Customers deleting their instances' },
    ],
    explanation: 'Retries created a feedback loop of load.',
  },
  {
    prompt: 'Which mechanisms prevent retries from turning a brief overload into a sustained one?',
    multi: true,
    options: [
      { text: 'Exponential backoff with jitter', correct: true },
      { text: 'Retry budgets', correct: true },
      { text: 'Circuit breakers', correct: true },
      { text: 'Immediate retries in a tight loop' },
    ],
    explanation: 'Tight retry loops are exactly what amplifies overload.',
  },
  {
    prompt: 'What does static stability mean?',
    options: [
      {
        text: 'Data planes keep working without constant contact with the control plane',
        correct: true,
      },
      { text: 'Servers never restart' },
      { text: 'Configuration never changes' },
    ],
    explanation: 'Running instances largely continued to work during the event.',
  },
])
