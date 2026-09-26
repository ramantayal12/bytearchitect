import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which acks setting gives the strongest durability for published messages?',
    options: [{ text: 'acks=0' }, { text: 'acks=1' }, { text: 'acks=all', correct: true }],
    explanation: 'All in-sync replicas must have the message before acknowledgment.',
  },
  {
    prompt: 'Why is the new partition leader chosen from the in-sync replicas?',
    options: [
      { text: 'They have all committed messages, so none are lost', correct: true },
      { text: 'They are always the fastest servers' },
      { text: 'In-sync replicas store no data' },
    ],
    explanation: 'Electing an out-of-sync follower could lose committed messages.',
  },
  {
    prompt: 'Committing the offset after processing each batch gives which semantics?',
    options: [
      { text: 'At most once' },
      { text: 'At least once', correct: true },
      { text: 'No delivery guarantee' },
    ],
    explanation: 'After a crash, the batch since the last commit is reprocessed.',
  },
])
