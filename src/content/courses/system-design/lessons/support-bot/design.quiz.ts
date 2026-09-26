import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why combine vector search with keyword search?',
    options: [
      {
        text: 'Vectors catch paraphrases, while keywords catch exact terms such as error codes',
        correct: true,
      },
      { text: 'Keyword search is needed to generate embeddings' },
      { text: 'Vector search cannot return more than one result' },
    ],
    explanation: 'Hybrid search improves recall across question types.',
  },
  {
    prompt: 'How should account tools be executed to prevent cross-customer data access?',
    options: [
      {
        text: 'With the authenticated customer’s own identity and narrowly scoped APIs',
        correct: true,
      },
      { text: 'With an administrator credential that can read all accounts' },
      { text: 'By letting the model write raw SQL queries' },
    ],
    explanation: 'Even a manipulated model cannot exceed the customer’s permissions.',
  },
  {
    prompt: 'Where should the tenant filter be applied during retrieval?',
    options: [
      {
        text: 'Inside the retrieval query, so other tenants’ chunks are never returned',
        correct: true,
      },
      { text: 'After generation, by scanning the answer' },
      { text: 'Nowhere, embeddings are anonymous' },
    ],
    explanation: 'Filtering after retrieval risks leaking data into the prompt.',
  },
])
