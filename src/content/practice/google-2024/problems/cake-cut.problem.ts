import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random toppings; expected outputs come from trying every candidate cut. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [[[0,1,0,1],[1,2,0,1]]], expected: true },
  { args: [[[0,2,0,1],[1,3,2,3]]], expected: false },
  { args: [[[5,9,0,1],[0,4,0,1]]], expected: true },
  { args: [[[0,10,0,1],[2,3,5,6]]], expected: false },
  { args: [[[0,10,0,1],[10,20,0,1],[20,30,0,1]]], expected: true },
  { args: [[[0,3,0,1],[1,4,2,3],[2,5,4,5],[3,6,6,7]]], expected: false },
  { args: [[[0,1000000000,0,1],[0,1,5,6]]], expected: false },
  { args: [[[7,8,7,8],[7,8,0,1]]], expected: false },
  { args: [[[1,2,0,1],[1,2,2,3],[3,4,0,1]]], expected: true },
  { args: [[[7,10,4,6],[2,3,5,9],[6,8,7,11]]], expected: true },
  { args: [[[2,4,3,4],[1,3,8,13],[3,5,6,7],[5,6,3,4]]], expected: true },
  { args: [[[13,14,12,16],[4,5,7,11],[3,8,0,1],[18,20,6,9],[0,1,4,9]]], expected: true },
  { args: [[[14,15,8,10],[6,8,6,10],[10,12,11,14],[2,3,0,5],[11,12,1,8],[14,18,2,3]]], expected: true },
  { args: [[[23,29,27,36],[18,28,24,26],[27,33,3,13],[11,19,6,13],[6,16,23,24],[25,26,0,7],[18,20,13,17],[3,10,16,22]]], expected: false },
  { args: [[[35,41,8,19],[18,21,16,17],[3,6,16,19],[7,17,9,10],[3,4,28,32],[24,29,39,40],[22,27,9,17],[35,42,37,40],[22,24,3,8],[5,8,14,15]]], expected: true },
  { args: [[[12,18,30,45],[37,55,34,47],[5,11,35,51],[56,70,34,44],[29,31,31,33],[43,63,1,13],[15,30,14,26],[4,7,12,14],[35,53,30,31],[45,48,21,24],[30,35,6,18],[12,20,6,10],[3,7,4,7],[23,27,47,48],[55,58,15,16]]], expected: true },
  { args: [[[32,57,66,88],[25,26,56,65],[78,79,13,30],[53,55,32,48],[7,29,35,40],[38,40,23,35],[38,66,12,13],[77,88,62,81],[44,73,51,65],[59,74,78,108],[23,34,51,53],[41,44,21,32],[69,70,24,31],[91,103,84,113],[17,38,10,21],[85,109,49,56],[9,10,85,103],[68,75,9,17],[1,31,40,42],[11,16,42,48],[22,41,21,22],[39,61,2,11],[3,5,91,119],[43,53,90,95],[74,87,96,122]]], expected: false },
  { args: [[[906,1035,155,253],[33,135,143,217],[426,550,766,813],[856,1027,651,809],[96,228,987,1115],[532,599,259,355],[627,825,972,1061],[60,226,541,660],[318,345,211,215],[202,321,737,769],[260,340,302,360],[11,57,684,847],[424,494,378,542],[356,439,572,614],[566,741,29,64],[759,813,91,104],[215,220,264,446],[791,972,928,948],[436,482,60,123],[586,626,520,667],[866,974,372,552],[915,1020,34,76],[997,1137,320,391],[520,707,187,204],[659,742,433,560],[19,99,445,466],[399,466,967,1017],[996,1146,979,1100],[172,328,30,92],[539,674,678,757],[697,827,791,910],[83,188,772,972],[290,315,983,1128],[261,338,813,829],[462,538,834,931],[587,605,81,105],[796,810,457,645],[381,448,228,280],[511,543,614,642],[344,405,366,506]]], expected: false },
]

const N = 100_000
// Two rows of toppings; consecutive ones overlap in x, so there's no gap anywhere.
const row = (i: number) => [10 * i, 10 * i + 15, (i % 2) * 10, (i % 2) * 10 + 5]

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'canCut',
    params: [{ name: 'toppings', type: 'int[][]' }],
    returns: 'boolean',
  },
  examples: [
    {
      args: [
        [
          [1, 3, 1, 2],
          [4, 6, 1, 3],
          [2, 5, 4, 6],
        ],
      ],
      expected: false,
      explanation:
        'The topping spanning x = 2..5 bridges the gap between the other two, so every cut between x = 1 and x = 6 goes through a topping.',
    },
    {
      args: [
        [
          [0, 2, 0, 1],
          [2, 3, 0, 1],
        ],
      ],
      expected: true,
      explanation: 'A cut along x = 2 runs along both toppings’ edges without cutting either.',
    },
    {
      args: [[[0, 5, 0, 5]]],
      expected: false,
      explanation: 'With a single topping, one of the two pieces would be bare.',
    },
  ],
  tests: [
    ...hiddenTests,
    // Checking every candidate cut against every topping is O(n²) and times out on these.
    { args: [Array.from({ length: N }, (_, i) => row(i))], expected: false },
    {
      args: [
        Array.from({ length: N }, (_, i) =>
          i === N - 1 ? [10 * N + 100, 10 * N + 101, 0, 1] : row(i),
        ),
      ],
      expected: true,
    },
  ],
  solution: {
    javascript: `function canCut(toppings) {
  // Only x-extents matter: [x1, x2] for each topping, sorted by left edge.
  const spans = toppings.map(([x1, x2]) => [x1, x2]).sort((a, b) => a[0] - b[0])
  let reach = spans[0][1] // rightmost edge among the toppings left of the candidate cut
  for (let i = 1; i < spans.length; i++) {
    // A cut at x = reach clears every topping so far and every topping from i on.
    if (reach <= spans[i][0]) return true
    reach = Math.max(reach, spans[i][1])
  }
  return false
}`,
    python: `class Solution:
    def canCut(self, toppings: List[List[int]]) -> bool:
        # Only x-extents matter: (x1, x2) for each topping, sorted by left edge.
        spans = sorted((x1, x2) for x1, x2, _, _ in toppings)
        reach = spans[0][1]  # rightmost edge among the toppings left of the candidate cut
        for x1, x2 in spans[1:]:
            # A cut at x = reach clears every topping so far and every topping from here on.
            if reach <= x1:
                return True
            reach = max(reach, x2)
        return False`,
  },
})
