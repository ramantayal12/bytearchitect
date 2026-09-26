import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt:
      'When a database fails and 50 dependent services start alerting, what should the alert manager do?',
    options: [
      { text: 'Send 50 separate pages' },
      { text: 'Group related alerts and send one notification', correct: true },
      { text: 'Suppress all alerts' },
    ],
    explanation: 'Grouping reduces noise and focuses responders on the root cause.',
  },
  {
    prompt: 'Which statements about time-series storage are true?',
    options: [
      { text: 'Recent samples are kept in an in-memory head block backed by a WAL', correct: true },
      { text: 'Older blocks are compacted and can be downsampled', correct: true },
      { text: 'Every sample is stored uncompressed forever' },
    ],
    explanation: 'Compression and retention policies keep storage manageable.',
  },
  {
    prompt: 'How is the rules engine made highly available?',
    options: [
      {
        text: 'Run multiple replicas evaluating the same rules, with the alert manager deduplicating',
        correct: true,
      },
      { text: 'Run a single instance on the largest server' },
      { text: 'Evaluate rules only once a day' },
    ],
    explanation: 'Redundant evaluation plus deduplication avoids both missed and duplicate pages.',
  },
  {
    prompt: 'What happens when a scrape target stops responding?',
    options: [
      { text: 'Its up metric drops to 0, which can trigger an alert', correct: true },
      { text: 'The monitoring system crashes' },
      { text: 'Nothing is recorded' },
    ],
    explanation: 'Pull-based collection naturally detects unreachable targets.',
  },
  {
    prompt: 'What is the benefit of alerting on SLO burn rate?',
    options: [
      {
        text: 'It alerts on real user impact and distinguishes fast burns from slow burns',
        correct: true,
      },
      { text: 'It eliminates the need for metrics' },
      { text: 'It pages on every CPU spike' },
    ],
    explanation: 'Burn-rate alerts reduce noise while catching meaningful problems.',
  },
  {
    prompt: 'Which visualization best shows how request latency is distributed over time?',
    options: [{ text: 'Pie chart' }, { text: 'Heatmap', correct: true }, { text: 'Single stat' }],
    explanation: 'Heatmaps show the full distribution for each time bucket.',
  },
])
