import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'What is the main purpose of defining features once in a feature registry?',
    options: [
      {
        text: 'Training and serving compute features from the same definition, preventing skew',
        correct: true,
      },
      { text: 'To reduce the number of models' },
      { text: 'To avoid storing features' },
    ],
    explanation: 'A single definition drives both offline and online materialization.',
  },
  {
    prompt: 'Which items should a dataset version record?',
    multi: true,
    options: [
      { text: 'Table snapshot IDs read from the lake', correct: true },
      { text: 'Feature definitions and code versions', correct: true },
      { text: 'Train, validation and test splits', correct: true },
      { text: 'The current weather' },
    ],
    explanation: 'These details allow an exact rebuild.',
  },
  {
    prompt: 'What happens when a data quality check fails in a pipeline?',
    options: [
      {
        text: 'Downstream steps halt so bad data does not propagate into features and models',
        correct: true,
      },
      { text: 'The check is ignored' },
      { text: 'All data is deleted' },
    ],
    explanation: 'Early detection prevents corrupted training data.',
  },
  {
    prompt: 'What does drift monitoring compare?',
    options: [
      {
        text: 'Live feature distributions against the distributions seen during training',
        correct: true,
      },
      { text: 'GPU temperatures across regions' },
      { text: 'Code style between teams' },
    ],
    explanation: 'Shifts in input data often precede drops in model accuracy.',
  },
  {
    prompt: 'How does the platform honor a user’s deletion request?',
    options: [
      {
        text: 'Remove their records from the lake and feature stores, exclude them from new datasets and retrain periodically',
        correct: true,
      },
      { text: 'Mark the request and keep all data' },
      { text: 'Delete the entire data lake' },
    ],
    explanation: 'Governance requires removal from storage and eventually from models.',
  },
  {
    prompt: 'Why are evaluation sets protected and deduplicated against training data?',
    options: [
      {
        text: 'If test examples leak into training, evaluation results become misleadingly optimistic',
        correct: true,
      },
      { text: 'Evaluation sets are too large to share' },
      { text: 'Training data cannot contain duplicates' },
    ],
    explanation: 'Contamination invalidates quality measurements.',
  },
])
