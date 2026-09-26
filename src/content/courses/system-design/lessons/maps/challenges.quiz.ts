import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why is A* search alone not enough for continent-scale road routing?',
    options: [
      {
        text: 'Fastest routes often detour to highways, so the heuristic prunes little and the search still explores too much',
        correct: true,
      },
      { text: 'A* cannot find shortest paths' },
      { text: 'A* requires the graph to be stored on disk' },
    ],
    explanation: 'Real systems rely on preprocessing the graph to make queries fast.',
  },
  {
    prompt: 'What problem do live traffic updates create for graph preprocessing?',
    options: [
      {
        text: 'Precomputed data depends on edge weights, which change every few minutes',
        correct: true,
      },
      { text: 'Traffic updates add new intersections to the graph' },
      { text: 'Traffic data cannot be stored in memory' },
    ],
    explanation: 'Preprocessing must be designed so new weights can be applied quickly.',
  },
  {
    prompt: 'Which factors make ETAs more than a simple sum of edge travel times?',
    multi: true,
    options: [
      { text: 'Delays at intersections, lights and turns', correct: true },
      { text: 'Traffic changing while the trip is in progress', correct: true },
      { text: 'The zoom level of the map' },
    ],
    explanation: 'Map zoom has no effect on travel time.',
  },
])
