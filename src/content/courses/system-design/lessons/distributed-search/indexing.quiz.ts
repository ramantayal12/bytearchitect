import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'Postings: wireless → {D1, D3}, headphones → {D1, D2}. Which documents match “wireless AND headphones”?',
    options: [{ text: 'D1', correct: true }, { text: 'D1, D2, D3' }, { text: 'D2, D3' }],
    explanation: 'The intersection of the two lists is {D1}.',
  },
  {
    prompt: 'Why must the same text analysis be applied to queries as to documents?',
    options: [
      {
        text: 'So query terms match indexed terms despite differences in case, punctuation or word form',
        correct: true,
      },
      { text: 'To make queries shorter' },
      { text: 'Because indexes cannot store uppercase letters' },
    ],
    explanation: 'Mismatched analysis leads to missed matches.',
  },
  {
    prompt: 'What is inverse document frequency used for?',
    options: [
      { text: 'Giving rarer terms more weight than common terms', correct: true },
      { text: 'Counting how many times a term appears in one document' },
      { text: 'Compressing postings lists' },
    ],
    explanation: 'Rare terms carry more information about relevance.',
  },
  {
    prompt: 'Which information in postings enables phrase queries such as “noise cancelling”?',
    options: [
      { text: 'Term positions', correct: true },
      { text: 'Document size' },
      { text: 'Upload date' },
    ],
    explanation: 'Positions let the engine check that terms appear adjacently.',
  },
])
