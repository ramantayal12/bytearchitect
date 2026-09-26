import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'How does the service guarantee that an expired link stops redirecting, even before cleanup runs?',
    options: [
      {
        text: 'It checks the expiry time on every redirect and returns 410 Gone if expired',
        correct: true,
      },
      { text: 'It scans all records every second' },
      { text: 'Expired links are never removed' },
    ],
    explanation: 'Lazy checks guarantee correctness; background cleanup reclaims space.',
  },
  {
    prompt: 'Why are URLs rescanned periodically after creation?',
    options: [
      { text: 'A destination that was safe at creation can later become malicious', correct: true },
      { text: 'To update the key length' },
      { text: 'To reset click counts' },
    ],
    explanation: 'Attackers sometimes change content behind a link after it passes checks.',
  },
  {
    prompt: 'What happens to link creation if the key generation service is briefly unavailable?',
    options: [
      {
        text: 'Application servers continue using keys from their in-memory batches, and redirects are unaffected',
        correct: true,
      },
      { text: 'All redirects fail immediately' },
      { text: 'Existing links are deleted' },
    ],
    explanation:
      'Batches decouple creation from the key service, and redirects never depend on it.',
  },
])
