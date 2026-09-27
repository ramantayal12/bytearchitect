import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are redirects more availability-critical than link creation?',
    options: [
      {
        text: 'If redirects fail, every link ever shared breaks; failed creations can simply be retried',
        correct: true,
      },
      { text: 'Redirects are more expensive to compute than creations' },
      { text: 'Creation does not need a database' },
    ],
    explanation: 'The asymmetry justifies investing far more in the redirect path.',
  },
  {
    prompt: 'What is the main reason many shorteners return 302 rather than 301 redirects?',
    options: [
      {
        text: 'Every click reaches the service, enabling analytics, expiry and takedowns',
        correct: true,
      },
      { text: '302 responses are smaller' },
      { text: 'Browsers cannot follow 301 redirects' },
    ],
    explanation:
      'A 301 can be cached by browsers, hiding repeat clicks and preventing later disabling.',
  },
  {
    prompt: 'Which building blocks does a URL shortener typically reuse?',
    options: [
      { text: 'A sequencer or key generation service', correct: true },
      { text: 'A key-value store partitioned by key', correct: true },
      { text: 'A distributed cache for popular links', correct: true },
      { text: 'A graph database for the social network' },
    ],
    explanation: 'The shortener has no social graph; the other three are central to it.',
  },
])
