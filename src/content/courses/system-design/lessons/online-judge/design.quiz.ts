import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are time limits measured in CPU time rather than wall-clock time?',
    options: [
      {
        text: 'CPU time is not inflated by other load on the machine, making verdicts fairer',
        correct: true,
      },
      { text: 'Wall-clock time cannot be measured' },
      { text: 'CPU time is always shorter' },
    ],
    explanation: 'Fair measurement requires isolating the process’s own work.',
  },
  {
    prompt: 'Which sandbox restrictions help contain untrusted code?',
    multi: true,
    options: [
      { text: 'No network access', correct: true },
      { text: 'A syscall filter', correct: true },
      { text: 'Memory, process and file-size limits', correct: true },
      { text: 'Running as root to simplify permissions' },
    ],
    explanation: 'Running as root would weaken isolation.',
  },
  {
    prompt: 'Why do "run" requests have their own queue lane?',
    options: [
      {
        text: 'So debugging traffic cannot starve official submissions, especially during contests',
        correct: true,
      },
      { text: 'Because run requests do not execute code' },
      { text: 'To make run requests slower on purpose' },
    ],
    explanation: 'Priority lanes protect the most important work.',
  },
])
