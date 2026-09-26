import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'During a network partition, a CP system will:',
    options: [
      { text: 'Reject some requests to avoid returning inconsistent data', correct: true },
      { text: 'Serve all requests and reconcile later' },
      { text: 'Automatically eliminate the partition' },
    ],
    explanation: 'CP systems prioritize consistency over availability during partitions.',
  },
  {
    prompt: 'What does PACELC add to the CAP theorem?',
    options: [
      {
        text: 'Even without partitions, there is a trade-off between latency and consistency',
        correct: true,
      },
      { text: 'Partitions never happen in practice' },
      { text: 'Availability and consistency can always be achieved together' },
    ],
    explanation: 'Coordinating replicas for consistency costs latency during normal operation too.',
  },
  {
    prompt: 'What is a consequence of adding many indexes to a table?',
    options: [
      { text: 'Faster reads on indexed columns but slower writes', correct: true },
      { text: 'Faster writes and slower reads' },
      { text: 'No effect on performance' },
    ],
    explanation: 'Every write must update each index.',
  },
])
