import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are server-sent events a good fit for streaming chat responses?',
    options: [
      {
        text: 'They stream server-to-client over plain HTTP and pass through proxies easily',
        correct: true,
      },
      { text: 'They require a custom binary protocol' },
      { text: 'They are the only way to send JSON' },
    ],
    explanation: 'Streaming is one-directional, which SSE handles simply.',
  },
  {
    prompt: 'What does the model gateway do?',
    multi: true,
    options: [
      { text: 'Routes requests to models based on plan and request', correct: true },
      { text: 'Enforces quotas', correct: true },
      { text: 'Falls back to other models or regions under overload', correct: true },
      { text: 'Stores conversation history' },
    ],
    explanation: 'Conversation history belongs in the conversation store.',
  },
  {
    prompt: 'How can long conversations stay within the context window?',
    options: [
      { text: 'Keep recent turns and replace older ones with a running summary', correct: true },
      { text: 'Drop the system prompt' },
      { text: 'Send only the first message of the conversation' },
    ],
    explanation: 'Summaries preserve important context in fewer tokens.',
  },
  {
    prompt: 'What limits how many requests a GPU can serve concurrently during decoding?',
    options: [
      { text: 'GPU memory consumed by model weights and KV caches', correct: true },
      { text: 'The number of HTTP headers' },
      { text: 'Disk space for conversations' },
    ],
    explanation: 'KV cache memory grows with context length and batch size.',
  },
  {
    prompt: 'Why partition the conversation store by user ID?',
    options: [
      { text: 'Listing and loading a user’s conversations stays on one shard', correct: true },
      { text: 'Users never have more than one conversation' },
      { text: 'It makes GPUs faster' },
    ],
    explanation: 'The dominant access pattern is per user.',
  },
  {
    prompt: 'How should a new model version be rolled out?',
    options: [
      {
        text: 'Canary it on a slice of traffic and compare evaluation results and user feedback before full rollout',
        correct: true,
      },
      { text: 'Switch all traffic at once if it starts without errors' },
      { text: 'Deploy only to free users permanently' },
    ],
    explanation: 'A model can be healthy yet worse; quality must be measured.',
  },
])
