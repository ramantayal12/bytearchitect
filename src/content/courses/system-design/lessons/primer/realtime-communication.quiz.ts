import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Which technique best fits a multiplayer game where both client and server send frequent messages?',
    options: [
      { text: 'WebSockets', correct: true },
      { text: 'Short polling' },
      { text: 'Server-sent events' },
    ],
    explanation: 'Bidirectional, low-overhead messaging is what WebSockets provide.',
  },
  {
    prompt: 'Why are server-sent events a good fit for streaming LLM responses?',
    options: [
      {
        text: 'The stream flows one way from server to client over plain HTTP with built-in reconnection',
        correct: true,
      },
      { text: 'They are the only protocol that supports text' },
      { text: 'They require no server at all' },
    ],
    explanation: 'Token streaming is one-directional.',
  },
  {
    prompt: 'What does long polling do differently from short polling?',
    options: [
      {
        text: 'The server holds each request open until data is available or a timeout expires',
        correct: true,
      },
      { text: 'The client polls more frequently' },
      { text: 'It upgrades the connection to a binary protocol' },
    ],
    explanation: 'Holding requests avoids empty responses and delays.',
  },
])
