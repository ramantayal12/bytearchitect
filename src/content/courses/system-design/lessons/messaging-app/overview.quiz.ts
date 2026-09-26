import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Why does a messaging app keep persistent connections from active devices to its servers?',
    options: [
      { text: 'So messages can be pushed to recipients in real time', correct: true },
      { text: 'To download the entire message history constantly' },
      { text: 'Because HTTP cannot carry text' },
    ],
    explanation: 'Push over an open connection avoids polling delays.',
  },
  {
    prompt: 'What does a "delivered" receipt indicate?',
    options: [
      { text: 'The recipient’s device received the message', correct: true },
      { text: 'The recipient read the message' },
      { text: 'The sender’s device encrypted the message' },
    ],
    explanation: 'Sent, delivered and read are separate stages.',
  },
  {
    prompt: 'Which features make messaging harder than simple request-response services?',
    multi: true,
    options: [
      { text: 'Delivering to users who are offline', correct: true },
      { text: 'Preserving order without duplicates over unreliable networks', correct: true },
      { text: 'Supporting several devices per user', correct: true },
      { text: 'Serving static images of the app’s logo' },
    ],
    explanation: 'Static assets are trivial compared with delivery guarantees.',
  },
])
