import { defineProblem, type TestCase } from '@/features/practice'

/** Random call sequences; expected outputs come from a set of every covered integer. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["CountIntervals","count"],[[],[]]], expected: [null,0] },
  { args: [["CountIntervals","add","count"],[[],[1,1],[]]], expected: [null,null,1] },
  { args: [["CountIntervals","add","add","count"],[[],[1,3],[4,6],[]]], expected: [null,null,null,6] },
  { args: [["CountIntervals","add","add","count"],[[],[1,5],[2,3],[]]], expected: [null,null,null,5] },
  { args: [["CountIntervals","add","add","add","count"],[[],[10,20],[1,5],[5,10],[]]], expected: [null,null,null,null,20] },
  { args: [["CountIntervals","add","add","add","add","count"],[[],[1,2],[5,6],[9,10],[2,9],[]]], expected: [null,null,null,null,null,10] },
  { args: [["CountIntervals","add","count","add","count"],[[],[7,7],[],[7,7],[]]], expected: [null,null,1,null,1] },
  { args: [["CountIntervals","add","add","add","add","add","add","add","add","add","add"],[[],[17,17],[13,15],[10,11],[4,6],[9,9],[10,10],[7,7],[4,7],[3,3],[4,7]]], expected: [null,null,null,null,null,null,null,null,null,null,null] },
  { args: [["CountIntervals","add","add","add","add","add","count","count","count","count","add","add","add","add","add","add"],[[],[13,16],[10,14],[27,28],[14,15],[19,24],[],[],[],[],[18,23],[15,18],[17,20],[16,18],[18,19],[8,8]]], expected: [null,null,null,null,null,null,15,15,15,15,null,null,null,null,null,null] },
  { args: [["CountIntervals","count","add","add","add","count","count","add","add","add","count","count","add","count","add","count","add","count","add","count","add","count","add","add","add","count"],[[],[],[8,13],[17,18],[29,32],[],[],[20,25],[5,6],[49,52],[],[],[43,43],[],[5,5],[],[30,36],[],[44,50],[],[41,42],[],[42,44],[3,7],[23,25],[]]], expected: [null,0,null,null,null,12,12,null,null,null,24,24,null,25,null,25,null,29,null,34,null,36,null,null,null,39] },
  { args: [["CountIntervals","add","add","count","count","add","add","add","add","count","add","add","count","add","add","add","add","count","add","add","add","add","add","add","count","count","count","count","count","add","count","add","add","count","add","add","count","count","add","count","add"],[[],[8,8],[84,87],[],[],[65,67],[66,70],[92,96],[88,96],[],[55,62],[29,31],[],[15,23],[13,17],[90,96],[43,48],[],[43,44],[85,93],[80,80],[12,17],[59,68],[6,10],[],[],[],[],[],[92,100],[],[12,12],[6,16],[],[70,78],[36,39],[],[],[57,59],[],[71,77]]], expected: [null,null,null,5,5,null,null,null,null,20,null,null,31,null,null,null,null,48,null,null,null,null,null,null,56,56,56,56,56,null,60,null,null,61,null,null,73,73,null,73,null] },
  { args: [["CountIntervals","add","add","count","add","add","add","add","add","count","add","add","count","add","add","count","add","count","add","add","count","add","count","add","count","count","add","add","count","add","add","add","add","add","count","count","add","add","add","add","add","add","add","add","add","add","add","count","add","count","add","add","add","count","add","count","add","count","add","count","count"],[[],[91,114],[174,181],[],[144,151],[78,79],[113,116],[158,160],[99,115],[],[116,117],[7,25],[],[63,66],[107,127],[],[40,54],[],[23,31],[113,131],[],[1,24],[],[22,30],[],[],[68,98],[6,10],[],[5,13],[126,155],[86,93],[199,201],[78,78],[],[],[23,40],[10,12],[177,192],[87,95],[31,61],[12,23],[30,50],[91,99],[120,123],[164,189],[9,28],[],[99,109],[],[19,19],[125,132],[46,51],[],[184,201],[],[65,68],[],[130,143],[],[]]], expected: [null,null,null,32,null,null,null,null,null,47,null,null,67,null,null,81,null,96,null,null,106,null,112,null,112,112,null,null,133,null,null,null,null,null,152,152,null,null,null,null,null,null,null,null,null,null,null,188,null,188,null,null,null,188,null,194,null,195,null,195,195] },
  { args: [["CountIntervals","add","add","count","add","add","add","add","count","add","count","add","add","add","add","add","add","add","add","add","count","add","count","add","count","add","add","add","count","add","add","add","count","count","add","add","count","add","add","add","count","count","add","count","count","count","add","add","add","add","add","add","count","add","add","count","add","count","add","add","count","add","count","count","add","count","add","add","add","add","count","add","count","add","add","add","add","add","add","count","add","count","add","add","add","add","add","add","add","count","add","add","add","add","add","add","add","add","add","count","count"],[[],[448,470],[326,359],[],[973,985],[851,853],[866,885],[436,465],[],[918,952],[],[513,514],[635,676],[595,611],[916,958],[927,976],[835,859],[323,329],[865,899],[954,979],[],[402,440],[],[98,145],[],[150,180],[647,653],[944,974],[],[878,879],[495,505],[907,935],[],[],[851,872],[500,524],[],[411,435],[815,829],[207,230],[],[],[686,725],[],[],[],[350,380],[545,570],[494,544],[69,117],[362,412],[201,219],[],[990,1007],[506,527],[],[594,626],[],[284,324],[801,842],[],[330,361],[],[],[218,241],[],[415,443],[270,313],[181,216],[715,749],[],[680,681],[],[809,838],[979,999],[778,826],[7,30],[325,358],[140,183],[],[453,500],[],[597,616],[281,297],[568,572],[518,541],[809,852],[813,831],[485,514],[],[59,92],[379,386],[877,881],[466,495],[612,621],[270,320],[441,466],[737,764],[775,782],[],[]]], expected: [null,null,null,57,null,null,null,null,105,null,140,null,null,null,null,null,null,null,null,null,263,null,297,null,345,null,null,null,376,null,null,null,396,396,null,null,418,null,null,null,457,457,null,497,497,497,null,null,null,null,null,null,621,null,null,639,null,655,null,null,713,null,713,713,null,724,null,null,null,null,782,null,784,null,null,null,null,null,null,839,null,862,null,null,null,null,null,null,null,864,null,null,null,null,null,null,null,null,null,892,892] },
]

// 10,000 disjoint intervals of 5 integers, added in scrambled order, counting after each one.
// Re-merging every interval on each count is O(n log n) per call and times out.
const K = 10_000
const order = Array.from({ length: K }, (_, i) => (i * 7919) % K)
const scattered: TestCase = {
  args: [
    ['CountIntervals', ...order.flatMap(() => ['add', 'count'])],
    [[], ...order.flatMap((j) => [[10 * j + 1, 10 * j + 5], []])],
  ],
  expected: [null, ...order.flatMap((_, k) => [null, 5 * (k + 1)])],
}
// 10,000 single points, then one interval that swallows them all.
const swallowed: TestCase = {
  args: [
    ['CountIntervals', ...order.map(() => 'add'), 'count', 'add', 'count'],
    [[], ...order.map((j) => [2 * j + 1, 2 * j + 1]), [], [1, 20_000], []],
  ],
  expected: [null, ...order.map(() => null), K, null, 20_000],
}

export default defineProblem({
  signature: {
    kind: 'class',
    className: 'CountIntervals',
    constructorParams: [],
    methods: [
      {
        name: 'add',
        params: [
          { name: 'left', type: 'int' },
          { name: 'right', type: 'int' },
        ],
        returns: 'void',
      },
      { name: 'count', params: [], returns: 'int' },
    ],
  },
  examples: [
    {
      args: [
        ['CountIntervals', 'add', 'add', 'count', 'add', 'count'],
        [[], [2, 3], [7, 10], [], [5, 8], []],
      ],
      expected: [null, null, null, 6, null, 8],
      explanation:
        '[2,3] covers 2 integers and [7,10] covers 4: 6. Adding [5,8] merges with [7,10] into [5,10], covering 6: 2 + 6 = 8.',
    },
    {
      args: [
        ['CountIntervals', 'count', 'add', 'add', 'count'],
        [[], [], [1, 1000000000], [5, 10], []],
      ],
      expected: [null, 0, null, null, 1000000000],
      explanation: 'Integers covered by more than one interval are counted once.',
    },
  ],
  tests: [
    ...hiddenTests,
    scattered,
    swallowed,
    {
      args: [
        ['CountIntervals', 'add', 'count', 'add', 'count', 'add', 'count'],
        [[], [1, 1000000000], [], [999999999, 1000000000], [], [1, 1], []],
      ],
      expected: [null, null, 1000000000, null, 1000000000, null, 1000000000],
    },
  ],
  solution: {
    javascript: `class CountIntervals {
  constructor() {
    // Disjoint intervals sorted by start, as two parallel arrays.
    this.starts = []
    this.ends = []
    this.total = 0
  }

  add(left, right) {
    // First interval that ends at or after left - 1 (touching intervals merge too).
    let lo = 0
    let hi = this.ends.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.ends[mid] < left - 1) lo = mid + 1
      else hi = mid
    }
    // Absorb every interval that starts at or before right + 1.
    let j = lo
    while (j < this.starts.length && this.starts[j] <= right + 1) {
      left = Math.min(left, this.starts[j])
      right = Math.max(right, this.ends[j])
      this.total -= this.ends[j] - this.starts[j] + 1
      j++
    }
    this.starts.splice(lo, j - lo, left)
    this.ends.splice(lo, j - lo, right)
    this.total += right - left + 1
  }

  count() {
    return this.total
  }
}`,
    python: `class CountIntervals:
    def __init__(self):
        # Disjoint intervals sorted by start, as two parallel lists.
        self.starts = []
        self.ends = []
        self.total = 0

    def add(self, left: int, right: int) -> None:
        # First interval that ends at or after left - 1 (touching intervals merge too).
        lo = bisect_left(self.ends, left - 1)
        # Absorb every interval that starts at or before right + 1.
        hi = bisect_right(self.starts, right + 1)
        if lo < hi:
            left = min(left, self.starts[lo])
            right = max(right, self.ends[hi - 1])
            for s, e in zip(self.starts[lo:hi], self.ends[lo:hi]):
                self.total -= e - s + 1
        self.starts[lo:hi] = [left]
        self.ends[lo:hi] = [right]
        self.total += right - left + 1

    def count(self) -> int:
        return self.total`,
  },
})
