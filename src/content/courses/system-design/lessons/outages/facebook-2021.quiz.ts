import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why did the DNS servers withdraw their BGP routes?',
    options: [
      {
        text: 'They could not reach the data centers and treated themselves as unhealthy',
        correct: true,
      },
      { text: 'An attacker hijacked them' },
      { text: 'Their certificates expired' },
    ],
    explanation: 'A local health rule triggered at every location at once.',
  },
  {
    prompt: 'What made recovery slow?',
    multi: true,
    options: [
      { text: 'Remote tools depended on the failed network and DNS', correct: true },
      { text: 'Physical access to data centers was deliberately hard', correct: true },
      { text: 'Services had to be restored gradually to avoid surges', correct: true },
      { text: 'All data had been deleted' },
    ],
    explanation: 'No data was lost; access and safe reactivation took time.',
  },
  {
    prompt: 'Which lesson addresses "recovery tools share fate with production"?',
    options: [
      {
        text: 'Maintain out-of-band access and tools that do not depend on the production network',
        correct: true,
      },
      { text: 'Use more DNS servers in the same network' },
      { text: 'Disable health checks entirely' },
    ],
    explanation: 'Independent recovery paths work when production does not.',
  },
])
