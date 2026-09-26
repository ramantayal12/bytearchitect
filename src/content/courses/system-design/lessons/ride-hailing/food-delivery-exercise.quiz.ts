import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why should a food delivery platform not always dispatch a courier the moment an order is placed?',
    options: [
      {
        text: 'The courier would wait at the restaurant while the food is prepared',
        correct: true,
      },
      { text: 'Couriers are only available at night' },
      { text: 'Orders must be paid before dispatch' },
    ],
    explanation:
      'Timing dispatch with predicted preparation time avoids idle couriers and cold food.',
  },
  {
    prompt: 'How does restaurant discovery relate to earlier chapters?',
    options: [
      {
        text: 'It reuses the proximity service, using delivery zones to decide which restaurants are eligible',
        correct: true,
      },
      { text: 'It reuses the video encoding pipeline' },
      { text: 'It requires a completely new kind of database' },
    ],
    explanation: 'Nearby search with delivery zones is a proximity problem.',
  },
  {
    prompt: 'What makes courier assignment harder than ride-hailing matching?',
    multi: true,
    options: [
      {
        text: 'Couriers can carry several orders at once, turning assignment into routing optimization',
        correct: true,
      },
      { text: 'Pickup time depends on kitchen preparation', correct: true },
      { text: 'Couriers never move' },
    ],
    explanation: 'Batching and preparation time add constraints that ride-hailing lacks.',
  },
])
