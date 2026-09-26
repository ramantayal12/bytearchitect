import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'How is a thundering herd of reconnects avoided when a gateway fails?',
    options: [
      {
        text: 'Clients reconnect with randomized exponential backoff, and deployments drain gateways gradually',
        correct: true,
      },
      { text: 'All clients reconnect at exactly the same moment' },
      { text: 'Clients stop using the app for an hour' },
    ],
    explanation: 'Spreading reconnects prevents overload of the remaining gateways.',
  },
  {
    prompt:
      'The session directory points to a gateway that no longer holds the device’s connection. What happens?',
    options: [
      {
        text: 'The push fails, the message stays in the inbox and a push notification is sent',
        correct: true,
      },
      { text: 'The message is lost' },
      { text: 'The sender is told the recipient does not exist' },
    ],
    explanation: 'The inbox is the source of truth, so stale routing only delays delivery.',
  },
  {
    prompt: 'What is the trade-off of not storing message history on the server?',
    options: [
      {
        text: 'Better privacy and less storage, but new devices must get history from existing devices or start empty',
        correct: true,
      },
      { text: 'Messages can no longer be delivered to offline users' },
      { text: 'Encryption becomes impossible' },
    ],
    explanation: 'Offline delivery uses inboxes; history is a separate concern.',
  },
])
