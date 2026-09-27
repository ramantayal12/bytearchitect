import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random inputs; expected outputs come from union-find over every pair. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [[[0,0]]], expected: 1 },
  { args: [[[0,0],[0,0]]], expected: 1 },
  { args: [[[0,0],[1,1]]], expected: 2 },
  { args: [[[1,5],[5,9]]], expected: 1 },
  { args: [[[1,4],[6,9],[4,6]]], expected: 1 },
  { args: [[[0,1000000000],[5,5],[999999999,1000000000]]], expected: 1 },
  { args: [[[3,4],[1,2],[5,6],[2,3]]], expected: 2 },
  { args: [[[10,20],[0,5],[6,9],[21,30],[9,10]]], expected: 3 },
  { args: [[[18,18],[13,16],[18,18],[6,9],[15,17]]], expected: 3 },
  { args: [[[20,21],[1,5],[15,17],[2,3],[23,25],[1,4],[27,28],[19,21]]], expected: 5 },
  { args: [[[24,27],[18,23],[16,19],[11,16],[19,24],[23,24],[29,30],[28,32],[24,24],[37,37]]], expected: 3 },
  { args: [[[15,16],[12,14],[34,36],[49,50],[20,23],[27,30],[4,6],[54,55],[53,54],[26,27],[2,2],[31,33],[52,52],[34,34],[9,12]]], expected: 11 },
  { args: [[[72,74],[76,77],[14,20],[98,98],[56,57],[24,26],[55,58],[57,58],[87,89],[18,22],[66,67],[15,17],[58,60],[21,26],[83,89],[22,28],[22,25],[98,100],[41,44],[28,28],[69,74],[5,7],[40,41],[10,12],[57,60]]], expected: 10 },
  { args: [[[298,300],[199,206],[123,131],[139,147],[247,256],[255,256],[85,92],[236,242],[69,75],[277,286],[178,186],[198,205],[84,92],[225,226],[212,212],[1,8],[274,275],[25,30],[47,49],[55,64],[232,239],[71,78],[223,231],[228,233],[132,139],[216,221],[266,274],[78,81],[165,174],[16,26],[100,110],[294,304],[245,245],[59,63],[222,225],[148,149],[23,32],[281,282],[146,148],[244,246]]], expected: 20 },
  { args: [[[369,388],[410,416],[358,363],[81,99],[199,212],[212,215],[700,709],[908,922],[883,899],[739,752],[458,475],[213,221],[611,622],[118,138],[801,821],[7,13],[434,453],[418,430],[892,912],[204,206],[790,803],[816,818],[843,844],[356,364],[368,382],[434,440],[643,652],[477,486],[518,533],[519,527],[414,428],[654,664],[357,365],[494,508],[873,888],[601,616],[85,102],[737,748],[820,832],[932,937],[987,1006],[425,443],[67,86],[867,876],[16,34],[335,355],[329,331],[758,770],[624,635],[289,308],[190,197],[172,181],[97,114],[809,810],[225,243],[762,764],[973,986],[196,214],[585,599],[936,954],[16,28],[206,216],[868,886],[195,211],[955,973],[782,792],[891,892],[673,691],[51,52],[578,589]]], expected: 33 },
]

const N = 100_000

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'countGroups',
    params: [{ name: 'intervals', type: 'int[][]' }],
    returns: 'int',
  },
  examples: [
    {
      args: [
        [
          [1, 3],
          [2, 5],
          [7, 8],
          [8, 10],
          [12, 12],
        ],
      ],
      expected: 3,
      explanation:
        '[1,3] and [2,5] overlap. [7,8] and [8,10] share the point 8. [12,12] is alone. A spanning forest has one tree per group: 3.',
    },
    {
      args: [
        [
          [1, 2],
          [3, 4],
        ],
      ],
      expected: 2,
      explanation: 'The intervals don’t share a point, so there is no edge.',
    },
    {
      args: [
        [
          [5, 9],
          [1, 10],
          [2, 3],
        ],
      ],
      expected: 1,
      explanation:
        '[1,10] overlaps both others, even though [5,9] and [2,3] don’t overlap each other.',
    },
  ],
  tests: [
    ...hiddenTests,
    // Checking every pair of vertices is O(n²) and times out on these.
    { args: [Array.from({ length: N }, (_, i) => [2 * i, 2 * i + 1])], expected: N },
    { args: [Array.from({ length: N }, (_, i) => [N - i, N - i + 1])], expected: 1 },
    {
      args: [Array.from({ length: N }, (_, i) => [(i % 1000) * 10, (i % 1000) * 10 + 3 + (i % 7)])],
      expected: 1000,
    },
  ],
  solution: {
    javascript: `function countGroups(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0])
  let groups = 0
  let reach = -Infinity // right end of the current merged group
  for (const [l, r] of sorted) {
    // Closed intervals: sharing a single point is enough to connect.
    if (l > reach) groups++
    reach = Math.max(reach, r)
  }
  return groups
}`,
    python: `class Solution:
    def countGroups(self, intervals: List[List[int]]) -> int:
        groups = 0
        reach = -inf  # right end of the current merged group
        for l, r in sorted(intervals):
            # Closed intervals: sharing a single point is enough to connect.
            if l > reach:
                groups += 1
            reach = max(reach, r)
        return groups`,
  },
})
