import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is training-serving skew?',
    options: [
      {
        text: 'Differences between how features are computed for training and for serving, degrading production performance',
        correct: true,
      },
      { text: 'Training on more GPUs than serving' },
      { text: 'Serving a model in a different region' },
    ],
    explanation: 'Identical feature logic in both paths prevents skew.',
  },
  {
    prompt:
      'A fraud model is trained using each account’s current total chargebacks, including chargebacks that happened after each transaction. What is wrong?',
    options: [
      {
        text: 'Label leakage: the features use information not available at prediction time',
        correct: true,
      },
      { text: 'Nothing, more data is always better' },
      { text: 'The model will be too small' },
    ],
    explanation: 'Point-in-time correctness requires values as of each event.',
  },
  {
    prompt: 'Why must training datasets be versioned?',
    options: [
      {
        text: 'To reproduce exactly the data a model was trained on for debugging and audits',
        correct: true,
      },
      { text: 'To make training faster' },
      { text: 'Because data lakes cannot store unversioned files' },
    ],
    explanation: 'Reproducibility requires knowing exactly which data was used.',
  },
])
