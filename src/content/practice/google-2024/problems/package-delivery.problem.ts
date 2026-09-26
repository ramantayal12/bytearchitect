import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random grids; expected outputs come from a separate BFS per facility. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["WP"]], expected: 2 },
  { args: [["PW"]], expected: 2 },
  { args: [["W","P"]], expected: 2 },
  { args: [["P","#","W"]], expected: -1 },
  { args: [["PWP"]], expected: 4 },
  { args: [["P.W.P"]], expected: 8 },
  { args: [["WPPPP"]], expected: 20 },
  { args: [["W#",".P"]], expected: 4 },
  { args: [["#P#","PWP","#P#"]], expected: 8 },
  { args: [["P...","###.","W..."]], expected: 16 },
  { args: [["...P","#...","W.P."]], expected: 14 },
  { args: [["P.#.",".P#.","...W",".P.."]], expected: 22 },
  { args: [["P....",".W##P","...#.","..#P.",".#.P."]], expected: 48 },
  { args: [["P##.P##P","....#...",".#...#..","##.#.P..","###..#..","#W..P..."]], expected: 84 },
  { args: [["###.P...","#..#P###",".#P##.#P","..#...#.","..#..P..",".....#..","###.##.#",".W...P#."]], expected: -1 },
  { args: [[".P#.P#.P#.P.","..#..#....#.",".....P......","......#...#P",".####.......",".....#.#....","#..#...#W#P.","....#......P","...#.....#.#","..##.P##P#.."]], expected: 136 },
  { args: [[".......###.#.#.",".P...#.........","..##..#P.......",".P..#....##.##.",".....P.#....###","#............#.",".P#.#.....P.#..","..#.#..P#PW.##.","...#.P.#..P..#P","...P.#.##.P##.#","P#.#.P.P##...#.",".##....P.#.....","....#...P..#P##","........#.#....","P..#.....####.."]], expected: -1 },
  { args: [["#....##...##.#.###.....P.",".##....#...#.....#.....#.","......#.###......#..##.#.","..#..#....#....#..#......","#....#.#...........P..##.","..P..#.....#W..#.......#.","P.......#.#.#.P..........","..#...P.P.P..###.#P.#..#.","#..#.P.##..#.........###.","...PP.#.....#..#######.##",".P...#..P....#.....#....#","..P#.#..#.#P#......##.#.#","..#P.#P.#....#.........P.",".#...#.#..##.#.#..P.P....","P#..#..P......#.#..#...P.","#.#..#.....#..#...P.#.###","...##..#...#.........P.##",".#.#...#.#.##.#...P..#..#","##...#..##.#.....#..P##.#","..##.P#.#.P..#.....#.##.#"]], expected: 966 },
]

// A facility on every cell except the warehouse in the middle: one BFS per facility times out.
const crowded = Array.from({ length: 300 }, (_, r) =>
  r === 150 ? 'P'.repeat(150) + 'W' + 'P'.repeat(149) : 'P'.repeat(300),
)
// Walls force a winding path from the warehouse to the facilities on the last row.
const winding = Array.from({ length: 299 }, (_, r) => {
  if (r === 0) return 'W' + '.'.repeat(299)
  if (r === 298) return 'P'.repeat(300)
  if (r % 2 === 0) return '.'.repeat(300)
  return r % 4 === 1 ? '#'.repeat(299) + '.' : '.' + '#'.repeat(299)
})

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'minDeliveryDistance',
    params: [{ name: 'grid', type: 'string[]' }],
    returns: 'int',
  },
  examples: [
    {
      args: [['W.P', '.#.', 'P..']],
      expected: 8,
      explanation: 'Each facility is 2 steps away. Two round trips of 2 + 2 steps make 8.',
    },
    {
      args: [['..P..', '.###.', '..W..']],
      expected: 12,
      explanation: 'The wall forces a 6-step route around it, and the trip there and back is 12.',
    },
    {
      args: [['P#W']],
      expected: -1,
      explanation: 'The wall cuts the facility off from the warehouse.',
    },
  ],
  tests: [
    ...hiddenTests,
    { args: [crowded], expected: 27_000_000 },
    { args: [winding], expected: 26_999_100 },
  ],
  solution: {
    javascript: `function minDeliveryDistance(grid) {
  const m = grid.length
  const n = grid[0].length
  const dist = Array.from({ length: m }, () => new Array(n).fill(-1))
  const queue = []
  for (let r = 0; r < m; r++) {
    const c = grid[r].indexOf('W')
    if (c >= 0) {
      dist[r][c] = 0
      queue.push([r, c])
    }
  }
  // One BFS from the warehouse gives the distance to every facility.
  for (let i = 0; i < queue.length; i++) {
    const [r, c] = queue[i]
    for (const [nr, nc] of [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]) {
      if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue
      if (grid[nr][nc] === '#' || dist[nr][nc] >= 0) continue
      dist[nr][nc] = dist[r][c] + 1
      queue.push([nr, nc])
    }
  }
  let total = 0
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== 'P') continue
      if (dist[r][c] < 0) return -1
      total += 2 * dist[r][c] // one package per trip: there and back
    }
  }
  return total
}`,
    python: `class Solution:
    def minDeliveryDistance(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        dist = [[-1] * n for _ in range(m)]
        queue = deque()
        for r in range(m):
            c = grid[r].find("W")
            if c >= 0:
                dist[r][c] = 0
                queue.append((r, c))
        # One BFS from the warehouse gives the distance to every facility.
        while queue:
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != "#" and dist[nr][nc] < 0:
                    dist[nr][nc] = dist[r][c] + 1
                    queue.append((nr, nc))
        total = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == "P":
                    if dist[r][c] < 0:
                        return -1
                    total += 2 * dist[r][c]  # one package per trip: there and back
        return total`,
  },
})
