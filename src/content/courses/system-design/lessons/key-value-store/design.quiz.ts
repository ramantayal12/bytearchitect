import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why can get(key) return multiple values in this design?',
    options: [
      {
        text: 'Concurrent writes may have created conflicting versions that the store cannot order',
        correct: true,
      },
      { text: 'Each key stores a list by design' },
      { text: 'Replicas always store different data' },
    ],
    explanation: 'When versions are concurrent, the store returns all of them for reconciliation.',
  },
  {
    prompt: 'What is the benefit of making all nodes peers rather than having a central master?',
    options: [
      { text: 'No single point of failure or central bottleneck', correct: true },
      { text: 'Strong consistency is guaranteed automatically' },
      { text: 'Fewer network messages are needed' },
    ],
    explanation: 'Decentralization improves availability and scalability.',
  },
  {
    prompt: 'What is the purpose of the context passed to put?',
    options: [
      {
        text: 'It carries version information so the store can tell whether the write supersedes or conflicts',
        correct: true,
      },
      { text: 'It encrypts the value' },
      { text: 'It selects the storage engine' },
    ],
    explanation: 'The context holds the vector clock of the version the client read.',
  },
])
