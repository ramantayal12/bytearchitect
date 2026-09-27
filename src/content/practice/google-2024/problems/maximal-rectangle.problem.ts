import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random grids; expected outputs come from checking every rectangle. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["1"]], expected: 1 },
  { args: [["0","0"]], expected: 0 },
  { args: [["01","10"]], expected: 1 },
  { args: [["111"]], expected: 3 },
  { args: [["1","1","1"]], expected: 3 },
  { args: [["1011","1111"]], expected: 4 },
  { args: [["000","010","000"]], expected: 1 },
  { args: [["1111","1001","1111"]], expected: 4 },
  { args: [["10101","11111","01110"]], expected: 6 },
  { args: [["101","111","111"]], expected: 6 },
  { args: [["11110","00110","11100","11101"]], expected: 6 },
  { args: [["11110","11110","11111","11111","11110"]], expected: 20 },
  { args: [["011111","111010","011011","010111","111101","101111"]], expected: 6 },
  { args: [["111111111","111111001","110111101","101011111","111111011","111010111","111111111"]], expected: 12 },
  { args: [["1011110001","0111110101","1110101111","1111111111","1011111111","1111010110","1110011001","1111111111","1010110111","1001101010"]], expected: 16 },
  { args: [["111110111111111","101111111111101","111111111111111","010111101101111","111111110011101","111111111111111","111111111011111","101111111111110","110111111110111","011111111111111","111101111101111","111110111110111"]], expected: 36 },
  { args: [["111111111111111111","101111111111111111","111101010111111111","011101101111110011","111111111111111111","111010111110111111","101110011111101111","101011100111111111","111111011111111101","011111111111111111","111111110111111011","111111101111111101","101111111111111111","111100110000100111","011111111111111111","101110111110001111","111011111111101101","011111111001110011","111101101111111111","110111111111111111"]], expected: 36 },
]

const grid = (f: (r: number, c: number) => boolean, size = 200) =>
  Array.from({ length: size }, (_, r) =>
    Array.from({ length: size }, (_, c) => (f(r, c) ? '1' : '0')).join(''),
  )

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'maximalRectangle',
    params: [{ name: 'matrix', type: 'string[]' }],
    returns: 'int',
  },
  examples: [
    {
      args: [['0110', '1111', '1110']],
      expected: 6,
      explanation:
        'Rows 1–2 × columns 0–2 form a 2 × 3 rectangle of 1s. (Rows 0–2 × columns 1–2 is another 6.)',
    },
    { args: [['0']], expected: 0 },
    { args: [['11', '11']], expected: 4 },
  ],
  tests: [
    ...hiddenTests,
    // Checking every rectangle is O(m²n²) and times out on these.
    { args: [grid(() => true)], expected: 40_000 },
    { args: [grid((r, c) => (r * 7 + c * 13) % 17 !== 0)], expected: 30 },
    { args: [grid((r, c) => r !== c && r + c !== 199)], expected: 5000 },
  ],
  solution: {
    javascript: `function maximalRectangle(matrix) {
  const n = matrix[0].length
  // heights[c] = run of consecutive 1s ending at the current row in column c.
  const heights = new Array(n).fill(0)
  let best = 0
  for (const row of matrix) {
    for (let c = 0; c < n; c++) heights[c] = row[c] === '1' ? heights[c] + 1 : 0
    // Largest rectangle in the histogram, with a stack of increasing heights.
    const stack = []
    for (let c = 0; c <= n; c++) {
      const h = c === n ? 0 : heights[c]
      while (stack.length > 0 && heights[stack[stack.length - 1]] >= h) {
        const height = heights[stack.pop()]
        const left = stack.length > 0 ? stack[stack.length - 1] + 1 : 0
        best = Math.max(best, height * (c - left))
      }
      stack.push(c)
    }
  }
  return best
}`,
    python: `class Solution:
    def maximalRectangle(self, matrix: List[str]) -> int:
        n = len(matrix[0])
        # heights[c] = run of consecutive 1s ending at the current row in column c.
        heights = [0] * (n + 1)  # the extra 0 flushes the stack at the end of each row
        best = 0
        for row in matrix:
            for c in range(n):
                heights[c] = heights[c] + 1 if row[c] == "1" else 0
            # Largest rectangle in the histogram, with a stack of increasing heights.
            stack = []
            for c in range(n + 1):
                while stack and heights[stack[-1]] >= heights[c]:
                    height = heights[stack.pop()]
                    left = stack[-1] + 1 if stack else 0
                    best = max(best, height * (c - left))
                stack.append(c)
        return best`,
  },
})
