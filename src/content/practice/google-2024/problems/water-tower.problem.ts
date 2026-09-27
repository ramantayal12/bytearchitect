import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random grids; expected outputs come from a flood fill from every cell. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [[[7]],[0,0],[0,0]], expected: [0,0] },
  { args: [[[1,2,3]],[0,0],[0,2]], expected: [0,2] },
  { args: [[[3,2,1]],[0,0],[0,2]], expected: [0,0] },
  { args: [[[5,5],[5,5]],[0,0],[1,1]], expected: [0,0] },
  { args: [[[1],[9],[1]],[0,0],[2,0]], expected: [1,0] },
  { args: [[[2,1,2],[1,0,1],[2,1,2]],[0,0],[2,2]], expected: [-1,-1] },
  { args: [[[9,1,9]],[0,0],[0,2]], expected: [-1,-1] },
  { args: [[[3,3,3],[3,1,3],[3,3,3]],[1,1],[0,0]], expected: [0,0] },
  { args: [[[1,4,4],[1,2,4],[3,5,4]],[0,2],[0,1]], expected: [2,1] },
  { args: [[[4,8,3,3],[7,8,8,7],[6,2,3,2],[8,6,0,1]],[1,0],[2,0]], expected: [0,1] },
  { args: [[[2,3,3,3,3,3],[1,2,0,0,1,3],[1,2,3,2,3,3],[2,3,1,2,0,2]],[1,5],[2,4]], expected: [0,1] },
  { args: [[[18,18,3,20,6],[20,18,8,9,3],[2,15,20,15,2],[11,2,13,4,0],[9,13,13,3,1]],[4,4],[0,3]], expected: [-1,-1] },
  { args: [[[4,2,4],[2,4,1],[0,2,0],[0,0,4],[4,0,1],[3,2,4]],[2,0],[5,0]], expected: [4,0] },
  { args: [[[5,5,5,2,6,6,7],[8,6,10,9,10,8,1],[9,8,4,6,10,3,4],[6,4,8,4,8,5,0],[6,9,5,0,6,9,9],[10,2,0,10,10,5,7]],[2,5],[2,4]], expected: [1,4] },
  { args: [[[5,2,5,3,0,4,0,5],[0,2,2,5,3,2,4,4],[2,1,2,1,2,6,2,6],[4,2,2,6,3,0,6,6],[0,4,5,5,1,2,4,1],[5,6,2,1,2,1,5,3],[5,5,0,0,4,2,2,5],[6,1,3,6,6,1,0,2]],[3,7],[4,3]], expected: [-1,-1] },
  { args: [[[25,3,1,16,30,6,10,25,26,26],[18,5,27,8,10,25,26,20,2,25],[19,11,18,4,13,9,16,25,27,8],[14,11,20,13,9,13,18,13,1,29],[13,4,6,0,15,30,26,28,19,16],[13,17,30,29,22,7,1,23,14,26],[24,21,23,16,30,9,17,10,28,7],[27,2,27,18,9,3,25,7,1,1],[28,25,22,16,29,6,28,28,28,13],[18,1,0,15,23,3,5,16,9,7]],[0,8],[8,6]], expected: [-1,-1] },
  { args: [[[0,4,0,2,1,2,4,3,0],[2,1,1,0,4,0,1,1,2],[1,0,3,5,4,3,0,2,1],[2,4,4,4,3,0,3,2,0],[0,1,0,0,0,0,3,0,5],[0,4,4,3,2,1,2,0,2],[3,5,3,4,2,2,2,1,2],[3,0,1,4,0,5,5,3,0],[4,1,0,2,3,4,5,4,3],[5,0,4,3,0,2,5,3,5],[2,3,5,3,3,0,1,1,4],[2,5,4,0,3,1,3,1,0]],[5,5],[8,4]], expected: [7,5] },
  { args: [[[15,59,88,15,93,84,67,48,85,13,93,40,72,68,13],[75,91,0,60,18,30,99,49,5,67,11,72,12,84,48],[22,3,43,15,3,14,86,61,89,36,74,38,11,4,98],[72,65,67,91,30,13,70,95,12,70,7,70,41,72,23],[9,30,23,82,31,58,78,89,96,50,32,47,76,50,44],[71,53,10,48,64,30,52,95,20,53,88,72,96,74,86],[66,87,61,19,82,51,19,20,12,63,95,61,89,66,56],[75,92,23,17,34,96,25,18,74,65,40,29,88,68,99],[37,85,90,52,76,74,74,34,27,39,2,34,61,48,25],[22,72,46,30,41,61,99,18,53,89,61,89,76,26,59],[74,83,71,3,61,92,9,51,100,93,5,59,29,30,82],[91,99,86,8,27,32,30,24,99,33,17,23,79,90,86],[4,32,21,5,40,23,54,11,93,10,15,11,33,37,4],[45,57,74,93,86,43,0,3,42,42,55,48,62,9,26],[82,74,95,62,50,16,69,40,15,35,9,85,55,14,56]],[14,8],[14,4]], expected: [-1,-1] },
  { args: [[[1,8,11,5,10,12,5,12,7,4,10,10,10,10,12,4,1,12,5,10],[9,8,8,1,10,7,8,5,0,11,4,10,11,9,11,2,10,10,11,10],[2,2,5,10,7,1,1,8,2,5,10,11,10,9,6,8,4,10,2,7],[7,4,12,2,11,1,1,11,2,12,8,8,9,11,6,5,1,4,4,6],[0,2,0,7,8,4,3,11,12,8,5,5,6,7,8,12,12,1,5,7],[1,2,4,9,1,10,1,9,12,11,1,2,11,3,9,6,10,11,6,11],[2,9,9,2,6,12,3,8,8,2,9,2,3,4,5,12,4,0,12,7],[6,6,5,8,9,4,10,7,8,10,11,4,10,7,0,9,3,11,10,0],[1,12,12,10,3,7,2,8,10,7,3,3,12,8,3,0,8,10,7,1],[9,4,10,2,2,7,12,1,9,0,0,5,9,3,8,1,7,8,0,5],[5,5,5,11,11,2,1,9,12,0,11,1,11,5,12,3,1,3,6,11],[12,3,7,5,1,12,0,6,1,3,11,2,6,7,7,11,1,8,6,3],[10,7,4,0,7,7,12,11,6,7,2,7,0,11,4,5,5,7,8,5],[9,6,3,0,12,3,4,12,5,2,7,8,3,2,3,0,2,9,6,8],[2,10,0,2,1,9,2,7,7,2,0,0,6,7,5,6,0,11,11,0],[3,6,0,6,7,0,3,3,1,6,7,3,2,5,9,1,5,1,9,0],[12,11,4,4,12,7,12,4,7,3,8,4,0,5,10,5,5,1,0,10],[6,1,9,9,0,1,0,10,1,0,2,8,0,7,0,3,10,8,5,3],[12,7,5,12,7,5,10,0,6,4,12,9,10,6,1,4,2,6,1,8],[6,8,5,8,10,12,6,2,11,11,6,8,5,2,5,12,6,7,3,7]],[15,11],[8,5]], expected: [-1,-1] },
]

const grid = (f: (r: number, c: number) => number, size = 200) =>
  Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => f(r, c)))

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'waterTower',
    params: [
      { name: 'heights', type: 'int[][]' },
      { name: 'city1', type: 'int[]' },
      { name: 'city2', type: 'int[]' },
    ],
    returns: 'int[]',
  },
  examples: [
    {
      args: [
        [
          [6, 8, 4, 7, 3],
          [4, 3, 4, 5, 8],
          [8, 4, 6, 3, 4],
          [5, 9, 5, 1, 3],
        ],
        [2, 1],
        [0, 2],
      ],
      expected: [2, 2],
      explanation:
        'The 9 and the three 8s can each supply only one city. The 6 at [2,2] reaches [2,1] directly (6 → 4) and [0,2] through [1,2] (6 → 4 → 4).',
    },
    {
      args: [
        [
          [1, 2],
          [3, 4],
        ],
        [0, 0],
        [1, 1],
      ],
      expected: [1, 1],
      explanation: 'The tower may stand on a city. From [1,1], water flows 4 → 3 → 1 to [0,0].',
    },
    {
      args: [[[5, 1, 5]], [0, 0], [0, 2]],
      expected: [-1, -1],
      explanation: 'Water can’t flow up out of the middle cell, so no cell reaches both cities.',
    },
  ],
  tests: [
    ...hiddenTests,
    // Flood-filling from every cell is O((mn)²) and times out on these.
    {
      args: [grid((r, c) => (r - 100) ** 2 + (c - 100) ** 2), [100, 100], [150, 60]],
      expected: [199, 0],
    },
    {
      args: [grid((r, c) => ((r * 37 + c * 91) % 1000) + r + c), [0, 0], [199, 199]],
      expected: [-1, -1],
    },
    {
      args: [grid((r, c) => 1_000_000 - Math.abs(c - 100) * 1000 - r), [199, 0], [199, 199]],
      expected: [0, 100],
    },
  ],
  solution: {
    javascript: `function waterTower(heights, city1, city2) {
  const m = heights.length
  const n = heights[0].length
  // Cells whose water can reach the city: walk uphill (to equal or higher cells) from it.
  const reachers = ([r0, c0]) => {
    const seen = Array.from({ length: m }, () => new Array(n).fill(false))
    seen[r0][c0] = true
    const queue = [[r0, c0]]
    for (let i = 0; i < queue.length; i++) {
      const [r, c] = queue[i]
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr
        const nc = c + dc
        if (nr < 0 || nr >= m || nc < 0 || nc >= n || seen[nr][nc]) continue
        if (heights[nr][nc] < heights[r][c]) continue
        seen[nr][nc] = true
        queue.push([nr, nc])
      }
    }
    return seen
  }
  const a = reachers(city1)
  const b = reachers(city2)
  let best = [-1, -1]
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      // Scanning in row-major order keeps the first of equally high cells.
      if (a[r][c] && b[r][c] && (best[0] < 0 || heights[r][c] > heights[best[0]][best[1]])) {
        best = [r, c]
      }
    }
  }
  return best
}`,
    python: `class Solution:
    def waterTower(self, heights: List[List[int]], city1: List[int], city2: List[int]) -> List[int]:
        m, n = len(heights), len(heights[0])

        # Cells whose water can reach the city: walk uphill (to equal or higher cells) from it.
        def reachers(city):
            seen = [[False] * n for _ in range(m)]
            seen[city[0]][city[1]] = True
            queue = deque([tuple(city)])
            while queue:
                r, c = queue.popleft()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if 0 <= nr < m and 0 <= nc < n and not seen[nr][nc] and heights[nr][nc] >= heights[r][c]:
                        seen[nr][nc] = True
                        queue.append((nr, nc))
            return seen

        a, b = reachers(city1), reachers(city2)
        best = [-1, -1]
        for r in range(m):
            for c in range(n):
                # Scanning in row-major order keeps the first of equally high cells.
                if a[r][c] and b[r][c] and (best[0] < 0 or heights[r][c] > heights[best[0]][best[1]]):
                    best = [r, c]
        return best`,
  },
})
