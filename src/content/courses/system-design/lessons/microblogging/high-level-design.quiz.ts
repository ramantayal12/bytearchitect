import { defineQuiz } from '@/features/quiz'

export default defineQuiz([
  {
    prompt: 'Why are time-sortable post IDs useful?',
    options: [
      {
        text: 'Timelines can be sorted and paginated by ID without a separate timestamp index',
        correct: true,
      },
      { text: 'They make posts impossible to delete' },
      { text: 'They encrypt the post text' },
    ],
    explanation: 'Snowflake-style IDs embed creation time in their high bits.',
  },
  {
    prompt: 'Why does fan-out skip followers who have not been active recently?',
    options: [
      {
        text: 'Many accounts are dormant, so pushing to them wastes work; their timelines can be rebuilt on return',
        correct: true,
      },
      { text: 'Inactive users are not allowed to see posts' },
      { text: 'The graph service cannot list inactive users' },
    ],
    explanation: 'Skipping dormant users saves a large fraction of fan-out cost.',
  },
  {
    prompt: 'What does hydration mean in the timeline read path?',
    options: [
      { text: 'Fetching post contents, authors and counts for a list of post IDs', correct: true },
      { text: 'Adding new followers to a user' },
      { text: 'Compressing media files' },
    ],
    explanation: 'Timelines store IDs; hydration turns them into renderable posts.',
  },
])
