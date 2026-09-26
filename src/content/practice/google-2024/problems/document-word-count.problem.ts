import { defineProblem, type TestCase } from '@/features/practice'

/** Random call sequences; expected outputs come from a class that sums a plain array per query. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["WordCounter","getTotalCount"],[[],[1]]], expected: [null,0] },
  { args: [["WordCounter","addDocument","getTotalCount","getTotalCount"],[[],[0,3],[1],[100000]]], expected: [null,null,3,3] },
  { args: [["WordCounter","addDocument","addDocument","getTotalCount"],[[],[5,4],[5,0],[6]]], expected: [null,null,null,0] },
  { args: [["WordCounter","addDocument","getTotalCount","getTotalCount"],[[],[99999,10000],[99999],[100000]]], expected: [null,null,0,10000] },
  { args: [["WordCounter","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount"],[[],[2,1],[1,2],[0,4],[1],[2],[3]]], expected: [null,null,null,null,4,6,7] },
  { args: [["WordCounter","getTotalCount","addDocument","getTotalCount","addDocument","addDocument","addDocument"],[[],[5],[2,4190],[1],[2,7645],[3,6452],[0,4317]]], expected: [null,0,null,0,null,null,null] },
  { args: [["WordCounter","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument"],[[],[6],[5],[3],[5],[2],[6],[5],[7],[8],[1,1827]]], expected: [null,0,0,0,0,0,0,0,0,0,null] },
  { args: [["WordCounter","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument"],[[],[5,2968],[7,8417],[4,7415],[7,4609],[1,1985],[1,4565],[1],[7],[9],[6,7871],[2,8762],[4,7944],[6,9755],[4,7774],[7,8012]]], expected: [null,null,null,null,null,null,null,0,14948,19557,null,null,null,null,null,null] },
  { args: [["WordCounter","getTotalCount","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","getTotalCount","addDocument"],[[],[5],[9],[0,6646],[13,340],[19],[16],[10],[1,9173],[9],[4],[10],[1],[9,8545],[11,4121],[5],[0,3768],[17],[8],[11],[12],[20],[5,8325],[6,6004],[8],[17,9070]]], expected: [null,0,0,null,null,6986,6986,6646,null,15819,15819,15819,6646,null,null,15819,null,25947,12941,21486,25607,25947,null,null,27270,null] },
  { args: [["WordCounter","addDocument","addDocument","getTotalCount","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument"],[[],[20,7994],[39,516],[28],[21,1468],[7],[4],[9,3466],[29],[25],[7],[24],[26,2111],[5,2400],[11,2401],[15],[42,5791],[38,9130],[36,6660],[30,5287],[23,1014],[41,8887],[4,6985],[7,843],[10,1116],[44],[9],[37,2455],[29],[31,8653],[6],[15,4618],[41,8324],[16],[0,5870],[7,6516],[19],[22],[9],[37],[45,5093]]], expected: [null,null,null,7994,null,0,0,null,12928,12928,0,12928,null,null,null,8267,null,null,null,null,null,null,null,null,null,66069,10228,null,29798,null,9385,null,null,21829,null,null,33372,42834,21771,66559,null] },
  { args: [["WordCounter","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument"],[[],[68632,9571],[58047,418],[9129,7181],[50412],[55378,4097],[54898,3269],[49362,7799],[68115],[99640,3638],[25576,4179],[9827,4040],[59428,9146],[24864],[89946,9892],[55565,7529],[97553],[9751],[24071,6106],[26547],[78966],[28582],[45662,5471],[40714],[79920],[17448,4505],[39964],[20205,911],[89458,5025],[83250],[87925],[22865,2152],[3110,3430],[8714,2158],[29899,5067],[77459,7799],[45915,2907],[72828],[43950,8550],[56650,1808],[40018],[35696,2815],[26150],[96843],[50844],[57890],[14786],[79132],[10064,8934],[31684,970],[26938,8886],[98545,9633],[69859],[47664],[82101,7814],[10578,1481],[76259,3780],[13924],[72785],[50582],[84296,5914]]], expected: [null,null,null,null,7181,null,null,null,22764,null,null,null,null,11221,null,null,67121,7181,null,21506,63335,21506,null,21506,68806,null,26011,null,null,74222,74222,null,null,null,null,null,null,89936,null,null,39729,null,34662,125825,67271,83974,16809,110908,null,null,null,null,121899,78262,null,null,null,27224,123380,87542,null] },
  { args: [["WordCounter","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","getTotalCount","addDocument","addDocument","addDocument","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","addDocument","addDocument","getTotalCount","getTotalCount","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument","addDocument","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","getTotalCount","getTotalCount","getTotalCount","addDocument","getTotalCount","addDocument","addDocument","getTotalCount","addDocument","getTotalCount"],[[],[259],[140],[248],[50,5807],[232],[32],[103,3997],[180,8383],[84,4607],[92],[34,6935],[246,3102],[223,2509],[285,8873],[215,4930],[151,3547],[62],[263],[104,2350],[130],[118],[159],[142],[112,5462],[117,850],[92,47],[215,8228],[250],[124],[253,2474],[134],[102,8265],[156,2035],[208],[273],[218],[278],[276],[8],[32,4040],[97],[228],[199],[1,6541],[39,4700],[293],[267],[216],[232,5413],[291],[136],[188],[65],[148,1996],[250],[119,7716],[27,2266],[90],[90,6306],[152]]], expected: [null,0,0,0,null,5807,0,null,null,null,10414,null,null,null,null,null,null,12742,43817,null,23696,23696,27243,23696,null,null,null,null,55824,30055,null,30055,null,null,52285,68598,60513,68598,68598,0,null,21436,67062,56325,null,null,92752,83879,75794,null,98165,53601,67566,28023,null,88814,null,null,34896,null,75432] },
]

// Add N one-word documents, then alternately bump a document to two words and ask for the
// total over all documents. Summing an array per query is O(N) each and times out.
const N = 100_000
const bumps = Array.from({ length: 2 * N }, (_, i) => i)
const largeTest: TestCase = {
  args: [
    [
      'WordCounter',
      ...Array(N).fill('addDocument'),
      ...bumps.map((i) => (i % 2 ? 'getTotalCount' : 'addDocument')),
    ],
    [
      [],
      ...Array.from({ length: N }, (_, i) => [i, 1]),
      ...bumps.map((i) => (i % 2 ? [N] : [i / 2, 2])),
    ],
  ],
  expected: [null, ...Array(N).fill(null), ...bumps.map((i) => (i % 2 ? N + (i + 1) / 2 : null))],
}

export default defineProblem({
  signature: {
    kind: 'class',
    className: 'WordCounter',
    constructorParams: [],
    methods: [
      {
        name: 'addDocument',
        params: [
          { name: 'docId', type: 'int' },
          { name: 'wordCount', type: 'int' },
        ],
        returns: 'void',
      },
      { name: 'getTotalCount', params: [{ name: 'numDocs', type: 'int' }], returns: 'int' },
    ],
  },
  examples: [
    {
      args: [
        [
          'WordCounter',
          'addDocument',
          'addDocument',
          'getTotalCount',
          'getTotalCount',
          'addDocument',
          'getTotalCount',
        ],
        [[], [0, 5], [2, 7], [2], [3], [0, 1], [3]],
      ],
      expected: [null, null, null, 5, 12, null, 8],
      explanation:
        'getTotalCount(2) covers documents 0 and 1 (missing, so 0 words): 5. getTotalCount(3) adds document 2: 12. Replacing document 0 with a 1-word version makes it 8.',
    },
    {
      args: [
        ['WordCounter', 'getTotalCount', 'addDocument', 'getTotalCount', 'getTotalCount'],
        [[], [100000], [99999, 10], [99999], [100000]],
      ],
      expected: [null, 0, null, 0, 10],
      explanation: 'Document 99999 is only counted once numDocs is greater than 99999.',
    },
  ],
  tests: [...hiddenTests, largeTest],
  solution: {
    javascript: `class WordCounter {
  constructor() {
    this.size = 100000
    this.counts = new Array(this.size).fill(0)
    // Fenwick tree: tree[i] holds the sum of a power-of-two block of documents ending at i - 1.
    this.tree = new Array(this.size + 1).fill(0)
  }

  addDocument(docId, wordCount) {
    const delta = wordCount - this.counts[docId]
    this.counts[docId] = wordCount
    for (let i = docId + 1; i <= this.size; i += i & -i) this.tree[i] += delta
  }

  getTotalCount(numDocs) {
    let total = 0
    for (let i = Math.min(numDocs, this.size); i > 0; i -= i & -i) total += this.tree[i]
    return total
  }
}`,
    python: `class WordCounter:
    SIZE = 100000

    def __init__(self):
        self.counts = [0] * self.SIZE
        # Fenwick tree: tree[i] holds the sum of a power-of-two block of documents ending at i - 1.
        self.tree = [0] * (self.SIZE + 1)

    def addDocument(self, docId: int, wordCount: int) -> None:
        delta = wordCount - self.counts[docId]
        self.counts[docId] = wordCount
        i = docId + 1
        while i <= self.SIZE:
            self.tree[i] += delta
            i += i & -i

    def getTotalCount(self, numDocs: int) -> int:
        total = 0
        i = min(numDocs, self.SIZE)
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total`,
  },
})
