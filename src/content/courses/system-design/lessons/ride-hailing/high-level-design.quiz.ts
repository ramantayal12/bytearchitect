import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the purpose of a quote ID returned by the estimate endpoint?',
    options: [
      {
        text: 'It locks in the displayed price for a short time so the rider pays what they agreed to',
        correct: true,
      },
      { text: 'It identifies the driver assigned to the trip' },
      { text: 'It encrypts the rider’s payment details' },
    ],
    explanation: 'Surge pricing may change, but the quoted price is honored for a few minutes.',
  },
  {
    prompt: 'What happens when a driver declines an offer or it expires?',
    options: [
      {
        text: 'Matching releases the reservation and offers the trip to the next candidate',
        correct: true,
      },
      { text: 'The trip is immediately cancelled' },
      { text: 'The driver is forced to accept' },
    ],
    explanation:
      'Matching iterates over ranked candidates until one accepts or a time limit passes.',
  },
  {
    prompt: 'How do riders and drivers receive offers and live location updates?',
    options: [
      { text: 'Through persistent connections held by connection gateways', correct: true },
      { text: 'By polling the trip database every minute' },
      { text: 'By email' },
    ],
    explanation: 'Push over long-lived connections gives low latency.',
  },
])
