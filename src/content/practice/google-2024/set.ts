import { problem, type ProblemSetMeta } from '@/features/practice'

export const meta: ProblemSetMeta = {
  id: 'google-2024',
  title: 'Google Interview Questions (2024)',
  subtitle: 'Coding questions candidates reported from Google phone screens and onsites in 2024.',
  description:
    'Coding questions from Google software engineering interviews (mostly L3 and L4) in 2024, as candidates reported them on LeetCode Discuss. Reports are often brief, so each problem here has a precise statement, examples, hidden tests and reference solutions in JavaScript and Python, and links back to the original report.',
  source: {
    title: '“[2024] Google Interview Questions Compilation” on LeetCode Discuss',
    url: 'https://leetcode.com/discuss/post/6185127/2024-google-interview-questions-compilat-mjrf/',
  },
}

const discuss = (path: string) => `https://leetcode.com/discuss/${path}`

/** Outline: one entry per problem, in display order. Files live in `problems/<slug>.*`. */
export const problems = [
  problem('remove-ab-and-cd', 'Remove AB and CD Pairs', 'Easy', ['String', 'Stack'], {
    round: 'Phone screen (L4)',
    date: 'Oct 2024',
    url: discuss('post/5958167/'),
  }),
  problem(
    'threshold-split',
    'Split Into Parts That Reach a Threshold',
    'Easy',
    ['Array', 'Greedy'],
    {
      round: 'Phone screen (L4)',
      date: '2024',
      url: discuss('post/5955653/'),
    },
  ),
  problem(
    'water-tower',
    'Water Tower for Two Cities',
    'Medium',
    ['Graph', 'Breadth-First Search', 'Matrix'],
    { round: 'Phone screen', date: 'Mar 2024', url: discuss('interview-question/4817033/') },
  ),
  problem(
    'group-shared-properties',
    'Group Records That Share a Property',
    'Medium',
    ['Union Find', 'Hash Table'],
    { round: 'Phone screen', date: 'Jul 2024', url: discuss('post/5500213/') },
  ),
  problem(
    'remove-parentheses',
    'Remove Parentheses From a Formula',
    'Medium',
    ['String', 'Stack'],
    {
      round: 'Phone screen (L4)',
      date: 'Oct 2024',
      url: discuss('interview-experience/6010462/'),
    },
  ),
  problem('meeting-rooms', 'Minimum Meeting Rooms', 'Medium', ['Intervals', 'Heap', 'Sorting'], {
    round: 'Onsite (L4)',
    date: 'Oct 2024',
    url: discuss('interview-experience/6010462/'),
  }),
  problem(
    'queue-reconstruction',
    'Reconstruct the Queue by Height',
    'Medium',
    ['Array', 'Greedy', 'Sorting'],
    { round: 'Phone screen', date: 'Feb 2024', url: discuss('interview-question/4882958/') },
  ),
  problem(
    'recover-password',
    'Recover the Password From Fragments',
    'Medium',
    ['Graph', 'Topological Sort'],
    { round: 'Phone screen (L4)', date: '2024', url: discuss('interview-question/5826383/') },
  ),
  problem('cake-cut', 'Cut the Cake Between the Toppings', 'Medium', ['Intervals', 'Sorting'], {
    round: 'Phone screen (L4)',
    date: 'Aug 2024',
    url: discuss('interview-question/5676823/'),
  }),
  problem(
    'interval-groups',
    'Connected Groups of Overlapping Intervals',
    'Medium',
    ['Intervals', 'Sorting', 'Graph'],
    { round: 'Onsite (L4)', date: 'Oct 2024', url: discuss('post/5958167/') },
  ),
  problem(
    'package-delivery',
    'Deliver the Packages to the Warehouse',
    'Medium',
    ['Breadth-First Search', 'Matrix'],
    { round: 'Phone screen (L4)', date: '2024', url: discuss('interview-question/6132085/') },
  ),
  problem(
    'longest-increasing-subsequence',
    'Longest Increasing Subsequence',
    'Medium',
    ['Dynamic Programming', 'Binary Search'],
    { round: 'Onsite', date: '2024', url: discuss('interview-question/5989463/') },
  ),
  problem(
    'document-word-count',
    'Word Count of the First N Documents',
    'Medium',
    ['Design', 'Binary Indexed Tree', 'Prefix Sum'],
    { round: 'Phone screen (L4)', date: 'Sep 2024', url: discuss('post/6104391/') },
  ),
  problem(
    'detect-squares',
    'Detect Squares in a Point Stream',
    'Medium',
    ['Design', 'Hash Table'],
    {
      round: 'Onsite (L3)',
      date: 'May 2024',
      url: discuss('post/5278922/'),
    },
  ),
  problem('recent-searches', 'Recent Searches', 'Medium', ['Design', 'Hash Table'], {
    round: 'Interview',
    date: '2024',
    url: discuss('interview-question/4831503/'),
  }),
  problem(
    'tower-message',
    'Earliest Day a Message Crosses the Grid',
    'Hard',
    ['Binary Search', 'Union Find', 'Matrix'],
    { round: 'Phone screen (L4)', date: '2024', url: discuss('interview-question/6132085/') },
  ),
  problem('maximal-rectangle', 'Maximal Rectangle', 'Hard', ['Monotonic Stack', 'Matrix'], {
    round: 'Phone screen (L4)',
    date: 'Apr 2024',
    url: discuss('interview-experience/5117851/'),
  }),
  problem(
    'count-intervals',
    'Count Integers Covered by Intervals',
    'Hard',
    ['Design', 'Intervals', 'Ordered Set'],
    { round: 'Phone screen (L4)', date: '2024', url: discuss('interview-experience/4930232/') },
  ),
  problem(
    'trimmed-stream-average',
    'Trimmed Average of the Latest K Values',
    'Hard',
    ['Design', 'Ordered Set', 'Queue'],
    { round: 'Onsite (L4)', date: 'Apr 2024', url: discuss('interview-experience/5117851/') },
  ),
]
