import { defineProblem, type TestCase } from '@/features/practice'

/** Random call sequences; expected outputs come from sorting the window on every query. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["TrimmedAverage","getAverage"],[[3,1],[]]], expected: [null,-1] },
  { args: [["TrimmedAverage","add","add","add","getAverage"],[[3,1],[100000],[100000],[1],[]]], expected: [null,null,null,null,100000] },
  { args: [["TrimmedAverage","add","add","add","add","getAverage"],[[4,1],[1],[2],[3],[4],[]]], expected: [null,null,null,null,null,2] },
  { args: [["TrimmedAverage","add","add","add","add","add","add","getAverage"],[[5,2],[9],[9],[9],[1],[1],[5],[]]], expected: [null,null,null,null,null,null,null,5] },
  { args: [["TrimmedAverage","add","getAverage","add","add","add","add","getAverage","add","add","getAverage","add","add"],[[3,1],[3],[],[2],[10],[1],[2],[],[10],[4],[],[6],[2]]], expected: [null,null,-1,null,null,null,null,2,null,null,4,null,null] },
  { args: [["TrimmedAverage","add","add","add","getAverage","getAverage","getAverage","add","add","add","getAverage","getAverage","add","getAverage","getAverage","add","getAverage","add","add","add","add"],[[5,1],[16],[7],[2],[],[],[],[10],[6],[1],[],[],[19],[],[],[10],[],[11],[15],[9],[14]]], expected: [null,null,null,null,-1,-1,-1,null,null,null,5,5,null,6,6,null,8,null,null,null,null] },
  { args: [["TrimmedAverage","getAverage","add","add","getAverage","add","add","add","add","getAverage","getAverage","getAverage","add","getAverage","add","add","add","add","getAverage","add","add","add","add","getAverage","getAverage","getAverage"],[[5,2],[],[91],[89],[],[55],[15],[7],[56],[],[],[],[38],[],[41],[52],[68],[93],[],[16],[72],[10],[14],[],[],[]]], expected: [null,-1,null,null,-1,null,null,null,null,55,55,55,null,38,null,null,null,null,52,null,null,null,null,16,16,16] },
  { args: [["TrimmedAverage","add","add","getAverage","add","getAverage","add","add","add","getAverage","add","getAverage","add","add","add","add","add","getAverage","add","add","add","getAverage","add","add","getAverage","getAverage","add","add","add","add","add"],[[7,2],[3],[1],[],[1],[],[5],[3],[4],[],[2],[],[1],[5],[2],[4],[2],[],[4],[1],[3],[],[2],[1],[],[],[3],[4],[1],[2],[1]]], expected: [null,null,null,-1,null,-1,null,null,null,-1,null,2,null,null,null,null,null,2,null,null,null,3,null,null,2,2,null,null,null,null,null] },
  { args: [["TrimmedAverage","add","getAverage","add","add","getAverage","getAverage","add","getAverage","add","getAverage","getAverage","add","add","add","getAverage","getAverage","add","add","add","add","add","add","add","getAverage","getAverage","add","add","add","getAverage","getAverage","add","add","getAverage","getAverage","add","getAverage","add","getAverage","getAverage","add","add","add","add","add","add","add","getAverage","add","add","add"],[[10,3],[542],[],[638],[732],[],[],[990],[],[43],[],[],[706],[597],[809],[],[],[902],[921],[407],[4],[949],[596],[327],[],[],[909],[212],[357],[],[],[21],[489],[],[],[7],[],[544],[],[],[254],[398],[862],[298],[665],[304],[790],[],[361],[477],[873]]], expected: [null,null,-1,null,null,-1,-1,null,-1,null,-1,-1,null,null,null,-1,-1,null,null,null,null,null,null,null,677,677,null,null,null,565,565,null,null,395,395,null,346,null,429,429,null,null,null,null,null,null,null,433,null,null,null] },
  { args: [["TrimmedAverage","getAverage","getAverage","add","add","add","add","add","add","getAverage","add","add","add","add","add","getAverage","add","add","add","add","add","add","add","add","getAverage","add","getAverage","getAverage","add","add","add","add","add","add","add","add","add","getAverage","getAverage","getAverage","add","getAverage","add","add","add","add","add","add","add","add","add","add","add","getAverage","add","add","getAverage","getAverage","add","add","add","add","add","add","add","add","add","add","add","add","add","add","getAverage","add","add","add","add","add","getAverage","getAverage","getAverage"],[[20,5],[],[],[42953],[82384],[18533],[92160],[89986],[98608],[],[5112],[48558],[71633],[40246],[82606],[],[16887],[3307],[10067],[22392],[32163],[86709],[19137],[12571],[],[64918],[],[],[93425],[96954],[85705],[92391],[72077],[22422],[89848],[67957],[20091],[],[],[],[61315],[],[40184],[15016],[94499],[27058],[27139],[57111],[12431],[32088],[24088],[48772],[19771],[],[19279],[95818],[],[],[66086],[15256],[54743],[11750],[79031],[89778],[53402],[5693],[22989],[12529],[78435],[82342],[31860],[30547],[],[70234],[56584],[31155],[21938],[59156],[],[],[]]], expected: [null,-1,-1,null,null,null,null,null,null,-1,null,null,null,null,null,-1,null,null,null,null,null,null,null,null,-1,null,44291,44291,null,null,null,null,null,null,null,null,null,51057,51057,51057,null,53164,null,null,null,null,null,null,null,null,null,null,null,45778,null,null,40813,40813,null,null,null,null,null,null,null,null,null,null,null,null,null,null,38434,null,null,null,null,null,47675,47675,47675] },
  { args: [["TrimmedAverage","add","add","add","add","getAverage","add","getAverage","add","getAverage","add","add","getAverage","add","add","add","add","add","add","add","add","add","add","getAverage","getAverage","getAverage","getAverage","getAverage","getAverage","add","add","add","add","add","add","getAverage","getAverage","add","getAverage","getAverage","add","getAverage","add","add","getAverage","add","add","add","getAverage","add","add","add","add","add","add","add","add","add","getAverage","getAverage","getAverage","add","add","add","add","add","add","getAverage","add","add","add","add","add","add","getAverage","add","add","getAverage","getAverage","add","add","getAverage","getAverage","add","add","add","add","add","add","add","add","getAverage","getAverage","add","add","add","getAverage","add","add","add","add","add","add","add","getAverage","add","add","add","add","add","getAverage","add","add","getAverage","add","add","getAverage","add","add","add","add"],[[40,15],[23],[20],[26],[44],[],[1],[],[12],[],[47],[3],[],[25],[36],[6],[30],[43],[34],[7],[10],[8],[23],[],[],[],[],[],[],[33],[25],[40],[50],[9],[4],[],[],[31],[],[],[23],[],[49],[7],[],[20],[14],[8],[],[10],[23],[24],[2],[2],[21],[45],[30],[4],[],[],[],[27],[40],[6],[42],[28],[5],[],[2],[1],[44],[5],[1],[47],[],[22],[47],[],[],[43],[40],[],[],[5],[8],[16],[17],[30],[3],[49],[6],[],[],[14],[39],[16],[],[9],[38],[47],[30],[21],[1],[39],[],[19],[10],[46],[37],[34],[],[15],[34],[],[41],[13],[],[34],[4],[16],[50]]], expected: [null,null,null,null,null,-1,null,-1,null,-1,null,null,-1,null,null,null,null,null,null,null,null,null,null,-1,-1,-1,-1,-1,-1,null,null,null,null,null,null,-1,-1,null,-1,-1,null,-1,null,null,-1,null,null,null,-1,null,null,null,null,null,null,null,null,null,21,21,21,null,null,null,null,null,null,22,null,null,null,null,null,null,19,null,null,19,19,null,null,22,22,null,null,null,null,null,null,null,null,19,19,null,null,null,17,null,null,null,null,null,null,null,21,null,null,null,null,null,22,null,null,23,null,null,23,null,null,null,null] },
]

// The values cycle through 1..K, so once the window is full it always holds 1..K exactly once,
// and the trimmed average is (K + 1) / 2, rounded down. Sorting the window per query times out.
const K = 50_000
const TRIM = 5_000
const tail = Array.from({ length: K + 1 }, (_, i) => ((K - 1 + i) % K) + 1)
const cycling: TestCase = {
  args: [
    ['TrimmedAverage', ...Array(K - 1).fill('add'), ...tail.flatMap(() => ['add', 'getAverage'])],
    [
      [K, TRIM],
      ...Array.from({ length: K - 1 }, (_, i) => [i + 1]),
      ...tail.flatMap((v) => [[v], []]),
    ],
  ],
  expected: [
    null,
    ...Array(K - 1).fill(null),
    ...tail.flatMap(() => [null, Math.floor((K + 1) / 2)]),
  ],
}

export default defineProblem({
  signature: {
    kind: 'class',
    className: 'TrimmedAverage',
    constructorParams: [
      { name: 'k', type: 'int' },
      { name: 'trim', type: 'int' },
    ],
    methods: [
      { name: 'add', params: [{ name: 'value', type: 'int' }], returns: 'void' },
      { name: 'getAverage', params: [], returns: 'int' },
    ],
  },
  examples: [
    {
      args: [
        [
          'TrimmedAverage',
          'add',
          'add',
          'getAverage',
          'add',
          'getAverage',
          'add',
          'add',
          'add',
          'getAverage',
        ],
        [[3, 1], [3], [1], [], [10], [], [5], [5], [5], []],
      ],
      expected: [null, null, null, -1, null, 3, null, null, null, 5],
      explanation:
        'With 2 values there’s no full window: -1. The window [3,1,10] drops 1 and 10, leaving 3. Later the window is [5,5,5]: one 5 is dropped from each end, leaving 5.',
    },
    {
      args: [
        ['TrimmedAverage', 'add', 'add', 'add', 'add', 'add', 'getAverage', 'add', 'getAverage'],
        [[5, 1], [4], [9], [1], [7], [2], [], [8], []],
      ],
      expected: [null, null, null, null, null, null, 4, null, 5],
      explanation:
        'The window [4,9,1,7,2] drops 1 and 9: (4 + 7 + 2) / 3 = 4.33, rounded down to 4. After adding 8, the window is [9,1,7,2,8]: (7 + 2 + 8) / 3 = 5.67, so 5.',
    },
  ],
  tests: [...hiddenTests, cycling],
  solution: {
    javascript: `class TrimmedAverage {
  constructor(k, trim) {
    this.k = k
    this.trim = trim
    this.maxValue = 100000
    // Fenwick trees over values: how many window values are <= v, and their sum.
    this.count = new Array(this.maxValue + 1).fill(0)
    this.sum = new Array(this.maxValue + 1).fill(0)
    this.values = []
    this.oldest = 0 // index in values of the window's first element
    this.topBit = 1
    while (this.topBit * 2 <= this.maxValue) this.topBit *= 2
  }

  update(value, delta) {
    for (let i = value; i <= this.maxValue; i += i & -i) {
      this.count[i] += delta
      this.sum[i] += delta * value
    }
  }

  // Sum of the t smallest values in the window: descend the tree to the t-th smallest value.
  smallestSum(t) {
    let pos = 0
    let remaining = t
    let total = 0
    for (let step = this.topBit; step > 0; step >>= 1) {
      const next = pos + step
      if (next <= this.maxValue && this.count[next] < remaining) {
        pos = next
        remaining -= this.count[next]
        total += this.sum[next]
      }
    }
    return total + remaining * (pos + 1) // the rest are copies of value pos + 1
  }

  add(value) {
    this.values.push(value)
    this.update(value, 1)
    if (this.values.length - this.oldest > this.k) this.update(this.values[this.oldest++], -1)
  }

  getAverage() {
    if (this.values.length - this.oldest < this.k) return -1
    const middle = this.smallestSum(this.k - this.trim) - this.smallestSum(this.trim)
    return Math.floor(middle / (this.k - 2 * this.trim))
  }
}`,
    python: `class TrimmedAverage:
    MAX_VALUE = 100000

    def __init__(self, k: int, trim: int):
        self.k, self.trim = k, trim
        # Fenwick trees over values: how many window values are <= v, and their sum.
        self.count = [0] * (self.MAX_VALUE + 1)
        self.total = [0] * (self.MAX_VALUE + 1)
        self.window = deque()
        self.top_bit = 1 << (self.MAX_VALUE.bit_length() - 1)

    def _update(self, value, delta):
        i = value
        while i <= self.MAX_VALUE:
            self.count[i] += delta
            self.total[i] += delta * value
            i += i & -i

    def _smallest_sum(self, t):
        # Sum of the t smallest values in the window: descend the tree to the t-th smallest.
        pos, remaining, acc = 0, t, 0
        step = self.top_bit
        while step:
            nxt = pos + step
            if nxt <= self.MAX_VALUE and self.count[nxt] < remaining:
                pos = nxt
                remaining -= self.count[nxt]
                acc += self.total[nxt]
            step >>= 1
        return acc + remaining * (pos + 1)  # the rest are copies of value pos + 1

    def add(self, value: int) -> None:
        self.window.append(value)
        self._update(value, 1)
        if len(self.window) > self.k:
            self._update(self.window.popleft(), -1)

    def getAverage(self) -> int:
        if len(self.window) < self.k:
            return -1
        middle = self._smallest_sum(self.k - self.trim) - self._smallest_sum(self.trim)
        return middle // (self.k - 2 * self.trim)`,
  },
})
