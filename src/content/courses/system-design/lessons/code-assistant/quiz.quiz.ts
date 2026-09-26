import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Which techniques reduce inline-completion latency?',
    multi: true,
    options: [
      { text: 'Debouncing and a local suggestion cache', correct: true },
      { text: 'Persistent connections to the nearest region', correct: true },
      { text: 'Small models on latency-optimized GPU pools', correct: true },
      { text: 'Sending the entire repository with every keystroke' },
    ],
    explanation: 'Huge prompts would make completions far too slow.',
  },
  {
    prompt: 'How does the plugin choose extra context for a completion?',
    options: [
      {
        text: 'It ranks snippets from open and recently edited files by similarity to the code near the cursor, within a token budget',
        correct: true,
      },
      { text: 'It picks random files from the repository' },
      { text: 'It always sends the three largest files' },
    ],
    explanation: 'Relevant, budgeted context improves quality without hurting latency.',
  },
  {
    prompt: 'Why is the repository index chunked by functions and classes?',
    options: [
      {
        text: 'Structural chunks are meaningful units that retrieve and embed well',
        correct: true,
      },
      { text: 'Code cannot be split any other way' },
      { text: 'It reduces the number of repositories' },
    ],
    explanation: 'Language-aware chunking keeps related code together.',
  },
  {
    prompt: 'What should happen in the editor when the completion service is down?',
    options: [
      { text: 'No suggestions appear, and editing continues normally', correct: true },
      { text: 'The editor freezes until the service recovers' },
      { text: 'The editor deletes unsaved work' },
    ],
    explanation: 'The assistant must fail silently and never block the developer.',
  },
  {
    prompt: 'Which metric best indicates that completions are useful?',
    options: [
      { text: 'Acceptance rate, and how much accepted code survives later edits', correct: true },
      { text: 'Number of GPUs deployed' },
      { text: 'Length of the plugin’s changelog' },
    ],
    explanation: 'Usefulness is measured by what developers keep.',
  },
  {
    prompt: 'How are proposed multi-file edits applied?',
    options: [
      { text: 'Shown as a diff for the developer to review before applying', correct: true },
      { text: 'Committed and pushed automatically' },
      { text: 'Applied silently in the background' },
    ],
    explanation: 'Developers remain accountable for changes to their code.',
  },
])
