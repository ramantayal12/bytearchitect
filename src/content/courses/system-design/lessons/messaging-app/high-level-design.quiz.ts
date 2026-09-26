import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What does the session directory store?',
    options: [
      { text: 'Which gateway currently holds each device’s connection', correct: true },
      { text: 'The full message history of every user' },
      { text: 'Encryption keys for all conversations' },
    ],
    explanation: 'The message service uses it to route messages to the right gateway.',
  },
  {
    prompt: 'When should the server acknowledge a message to the sender?',
    options: [
      { text: 'After it is durably stored in the recipient’s inbox', correct: true },
      { text: 'As soon as the gateway receives it, before storing' },
      { text: 'Only after the recipient reads it' },
    ],
    explanation: 'Storing before acknowledging ensures no loss after the sender sees "sent".',
  },
  {
    prompt: 'How are photos and videos sent?',
    options: [
      {
        text: 'Encrypted and uploaded to a blob store; the chat message carries a reference and decryption key',
        correct: true,
      },
      { text: 'Inline through the chat connection as one large message' },
      { text: 'Unencrypted through the CDN' },
    ],
    explanation: 'Separating media keeps the chat path fast and small.',
  },
])
