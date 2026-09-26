import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why do seat holds expire after a few minutes?',
    options: [
      { text: 'So abandoned selections return seats to inventory', correct: true },
      { text: 'To force users to pay faster than the bank allows' },
      { text: 'Because databases cannot store holds for longer' },
    ],
    explanation: 'Expiring holds balance a fair checkout window with inventory availability.',
  },
  {
    prompt: 'How does a conditional update prevent double booking?',
    options: [
      {
        text: 'It changes seats only if they are still available; fewer updated rows means someone else got them first',
        correct: true,
      },
      { text: 'It locks the entire database for each purchase' },
      { text: 'It lets both users buy and refunds one later' },
    ],
    explanation: 'Atomic check-and-set ensures one winner per seat.',
  },
  {
    prompt: 'What does a virtual waiting room achieve during an on-sale?',
    options: [
      {
        text: 'It admits users at a rate the booking system can handle, turning a spike into a steady flow',
        correct: true,
      },
      { text: 'It sells tickets faster than the database can record them' },
      { text: 'It removes the need for seat holds' },
    ],
    explanation: 'Admission control protects the inventory system and gives users fair positions.',
  },
])
