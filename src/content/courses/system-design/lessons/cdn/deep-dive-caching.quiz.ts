import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'A game publisher will release a 50 GB update to millions of players at a fixed time. Which approach is most suitable?',
    options: [
      { text: 'Push the update to edge servers ahead of the release', correct: true },
      { text: 'Pull on demand only when the first player requests it' },
      { text: 'Serve it only from the origin' },
    ],
    explanation: 'Pushing predictable, large content avoids a massive burst of origin fetches.',
  },
  {
    prompt: 'What does request coalescing prevent?',
    options: [
      {
        text: 'Many simultaneous misses for the same object each triggering an origin fetch',
        correct: true,
      },
      { text: 'Users requesting different objects' },
      { text: 'Content from expiring' },
    ],
    explanation: 'Only one upstream fetch is made while other requests wait for it.',
  },
  {
    prompt: 'Why hash URLs across servers within a PoP?',
    options: [
      {
        text: 'So each object is stored on few servers, multiplying the PoP’s effective cache capacity',
        correct: true,
      },
      { text: 'To encrypt URLs' },
      { text: 'To make every server store every object' },
    ],
    explanation: 'Without sharding, each server would duplicate the same popular content.',
  },
])
