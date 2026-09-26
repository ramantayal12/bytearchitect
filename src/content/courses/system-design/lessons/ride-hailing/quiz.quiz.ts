import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which workload is the largest by request rate in a ride-hailing system?',
    options: [
      { text: 'Driver location updates and nearby-car views', correct: true },
      { text: 'Trip requests' },
      { text: 'Payment captures' },
    ],
    explanation:
      'Locations arrive hundreds of thousands of times per second; trips only thousands.',
  },
  {
    prompt: 'How is the live driver index organized?',
    options: [
      {
        text: 'A mutable in-memory map from spatial cell to available drivers, partitioned by city',
        correct: true,
      },
      { text: 'A read-only snapshot rebuilt every ten minutes' },
      { text: 'A relational table scanned for every request' },
    ],
    explanation: 'Frequent updates need constant-time, mutable structures.',
  },
  {
    prompt: 'Which techniques guarantee correct payments despite retries and crashes?',
    multi: true,
    options: [
      { text: 'Idempotency keys', correct: true },
      { text: 'A persisted payment state machine with recovery jobs', correct: true },
      { text: 'A double-entry ledger reconciled against processor reports', correct: true },
      { text: 'Retrying with a fresh request ID after every timeout' },
    ],
    explanation: 'A fresh ID on retry is exactly what causes double charges.',
  },
  {
    prompt: 'Why do reservations use a lease that expires?',
    options: [
      {
        text: 'So a driver becomes available again if the offer is never answered or the matcher crashes',
        correct: true,
      },
      { text: 'To charge the rider a reservation fee' },
      { text: 'Because compare-and-set operations cannot be undone' },
    ],
    explanation: 'Leases prevent drivers from being stuck in a reserved state forever.',
  },
  {
    prompt: 'A connection gateway fails during a trip. What should happen?',
    options: [
      { text: 'Apps reconnect to another gateway and fetch the current trip state', correct: true },
      { text: 'The trip is cancelled' },
      { text: 'The rider must request a new trip' },
    ],
    explanation: 'Trip state is persisted by the trip service, so reconnecting clients can resync.',
  },
  {
    prompt: 'Which data can be eventually consistent in ride-hailing?',
    multi: true,
    options: [
      { text: 'Nearby cars shown to an idle rider', correct: true },
      { text: 'Surge multipliers per cell', correct: true },
      { text: 'Whether a driver is already assigned to another trip' },
    ],
    explanation: 'Assignment requires strong consistency to prevent double booking.',
  },
  {
    prompt: 'What is the main new challenge in the food-delivery variant?',
    options: [
      {
        text: 'Timing courier dispatch with preparation time and batching several orders',
        correct: true,
      },
      { text: 'Finding nearby drivers' },
      { text: 'Encoding menu photos' },
    ],
    explanation: 'Kitchen timing and multi-order routing do not exist in ride-hailing.',
  },
])
