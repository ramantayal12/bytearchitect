import { defineProblem, type TestCase } from '@/features/practice'

/** Random call sequences; expected outputs come from a plain list that is searched and spliced. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["RecentSearches","getRecent"],[[5],[3]]], expected: [null,[]] },
  { args: [["RecentSearches","search","search","search","getRecent"],[[1],["a"],["b"],["c"],[100]]], expected: [null,null,null,null,["c"]] },
  { args: [["RecentSearches","search","search","search","getRecent"],[[5],["x"],["x"],["x"],[5]]], expected: [null,null,null,null,["x"]] },
  { args: [["RecentSearches","search","search","search","search","getRecent","getRecent"],[[2],["a"],["b"],["a"],["c"],[2],[1]]], expected: [null,null,null,null,null,["c","a"],["c"]] },
  { args: [["RecentSearches","search","search","search","search","getRecent"],[[3],["a1"],["b2"],["c3"],["b2"],[3]]], expected: [null,null,null,null,null,["b2","c3","a1"]] },
  { args: [["RecentSearches","getRecent","search","search","search","search","search","search","search","search","getRecent","getRecent","search"],[[3],[3],["hhe0"],["adj4"],["dda2"],["dda2"],["efc3"],["dda2"],["adj4"],["adj4"],[1],[2],["hhe0"]]], expected: [null,[],null,null,null,null,null,null,null,null,["adj4"],["adj4","dda2"],null] },
  { args: [["RecentSearches","search","search","search","search","search","search","getRecent","search","getRecent","search","search","search","search","getRecent","getRecent","getRecent","search","search","search","search"],[[4],["dhc0"],["dg5"],["jbha4"],["jbha4"],["dg5"],["dhc0"],[2],["jbha4"],[1],["dhc0"],["dhc0"],["dhc0"],["hahb3"],[5],[1],[4],["dhc0"],["bcha2"],["dhc0"],["dg5"]]], expected: [null,null,null,null,null,null,null,["dhc0","dg5"],null,["jbha4"],null,null,null,null,["hahb3","dhc0","jbha4","dg5"],["hahb3"],["hahb3","dhc0","jbha4","dg5"],null,null,null,null] },
  { args: [["RecentSearches","getRecent","search","search","search","search","search","search","getRecent","search","search","search","getRecent","search","search","getRecent","search","getRecent","search","search","search","search","search","search","getRecent","getRecent","search","search","search","search","getRecent"],[[5],[7],["gg7"],["e4"],["d1"],["e4"],["bg3"],["gg7"],[8],["gg7"],["d1"],["h5"],[2],["heaa0"],["gc8"],[6],["cgdc6"],[4],["heaa0"],["bg3"],["hcg9"],["heaa0"],["heaa0"],["heaa0"],[4],[5],["hcg9"],["gc8"],["gg7"],["h5"],[8]]], expected: [null,[],null,null,null,null,null,null,["gg7","bg3","e4","d1"],null,null,null,["h5","d1"],null,null,["gc8","heaa0","h5","d1","gg7"],null,["cgdc6","gc8","heaa0","h5"],null,null,null,null,null,null,["heaa0","hcg9","bg3","cgdc6"],["heaa0","hcg9","bg3","cgdc6","gc8"],null,null,null,null,["h5","gg7","gc8","hcg9","heaa0"]] },
  { args: [["RecentSearches","search","search","search","search","search","search","search","search","search","search","search","search","getRecent","search","search","getRecent","search","search","getRecent","getRecent","search","search","search","getRecent","search","search","search","search","search","search","search","search","search","search","search","search","getRecent","search","search","search"],[[8],["cc9"],["c3"],["h7"],["bd0"],["b1"],["c6"],["bd0"],["c6"],["ga10"],["bd0"],["c6"],["ga10"],[4],["ebc2"],["c6"],[7],["bgg11"],["bd0"],[1],[4],["d4"],["cc9"],["bd0"],[1],["djg5"],["b1"],["d4"],["cc9"],["d4"],["c6"],["bgg11"],["ebc2"],["d4"],["ga10"],["h7"],["djg5"],[5],["ga10"],["cc9"],["bd0"]]], expected: [null,null,null,null,null,null,null,null,null,null,null,null,null,["ga10","c6","bd0","b1"],null,null,["c6","ebc2","ga10","bd0","b1","h7","c3"],null,null,["bd0"],["bd0","bgg11","c6","ebc2"],null,null,null,["bd0"],null,null,null,null,null,null,null,null,null,null,null,null,["djg5","h7","ga10","d4","ebc2"],null,null,null] },
  { args: [["RecentSearches","search","getRecent","search","search","search","search","search","search","search","search","search","search","search","search","getRecent","getRecent","search","search","search","search","search","search","search","getRecent","getRecent","search","getRecent","search","search","search","search","search","getRecent","search","search","search","search","search","search","getRecent","search","search","getRecent","getRecent","search","search","search","search","search","getRecent","search","search","search","search","search","getRecent","getRecent","search","search","search"],[[10],["gjb5"],[5],["e15"],["e15"],["f26"],["e10"],["c20"],["e10"],["bb13"],["di29"],["b0"],["afc6"],["c20"],["jd4"],[3],[2],["afc6"],["di29"],["b0"],["di29"],["i9"],["e10"],["gje7"],[5],[5],["a11"],[2],["i9"],["gje7"],["e12"],["egf23"],["bfgj16"],[6],["afc6"],["d21"],["a11"],["i9"],["gf19"],["igjb28"],[2],["h27"],["gdjd17"],[3],[3],["gb22"],["gf19"],["gje7"],["bb13"],["geh1"],[6],["gdjd17"],["gje7"],["di29"],["geh1"],["b0"],[2],[3],["e12"],["i9"],["gjb5"]]], expected: [null,null,["gjb5"],null,null,null,null,null,null,null,null,null,null,null,null,["jd4","c20","afc6"],["jd4","c20"],null,null,null,null,null,null,null,["gje7","e10","i9","di29","b0"],["gje7","e10","i9","di29","b0"],null,["a11","gje7"],null,null,null,null,null,["bfgj16","egf23","e12","gje7","i9","a11"],null,null,null,null,null,null,["igjb28","gf19"],null,null,["gdjd17","h27","igjb28"],["gdjd17","h27","igjb28"],null,null,null,null,null,["geh1","bb13","gje7","gf19","gb22","gdjd17"],null,null,null,null,null,["b0","geh1"],["b0","geh1","di29"],null,null,null] },
  { args: [["RecentSearches","search","search","search","search","search","search","search","search","getRecent","search","search","search","search","getRecent","search","search","search","search","getRecent","search","search","getRecent","search","search","search","search","search","search","search","getRecent","getRecent","getRecent","getRecent","search","getRecent","getRecent","getRecent","search","search","getRecent","search","search","getRecent","search","search","search","search","getRecent","getRecent","search","getRecent","search","search","search","search","search","search","search","search","getRecent"],[[100],["j21"],["hfcg4"],["eifc22"],["jcdg6"],["ff0"],["fif18"],["ehf31"],["j12"],[7],["jhc24"],["gj5"],["j12"],["hae36"],[4],["g3"],["g3"],["eiff32"],["j12"],[8],["j7"],["ecg29"],[2],["eifc22"],["j7"],["gj5"],["eje27"],["hf9"],["gcf2"],["hae36"],[1],[2],[7],[2],["ahc33"],[1],[1],[7],["ff0"],["jbg23"],[4],["j7"],["fji13"],[7],["hfcg4"],["hae36"],["ff0"],["if17"],[6],[1],["ahc33"],[4],["igba8"],["hae36"],["ecg29"],["eiff32"],["fi28"],["fif18"],["eiff32"],["ff0"],[6]]], expected: [null,null,null,null,null,null,null,null,null,["j12","ehf31","fif18","ff0","jcdg6","eifc22","hfcg4"],null,null,null,null,["hae36","j12","gj5","jhc24"],null,null,null,null,["j12","eiff32","g3","hae36","gj5","jhc24","ehf31","fif18"],null,null,["ecg29","j7"],null,null,null,null,null,null,null,["hae36"],["hae36","gcf2"],["hae36","gcf2","hf9","eje27","gj5","j7","eifc22"],["hae36","gcf2"],null,["ahc33"],["ahc33"],["ahc33","hae36","gcf2","hf9","eje27","gj5","j7"],null,null,["jbg23","ff0","ahc33","hae36"],null,null,["fji13","j7","jbg23","ff0","ahc33","hae36","gcf2"],null,null,null,null,["if17","ff0","hae36","hfcg4","fji13","j7"],["if17"],null,["ahc33","if17","ff0","hae36"],null,null,null,null,null,null,null,null,["ff0","eiff32","fif18","fi28","ecg29","hae36"]] },
]

// 150,000 searches over 120,000 distinct queries with room for 100,000: moving or evicting
// entries in an array costs O(capacity) each and times out.
const searches = Array.from({ length: 150_000 }, (_, i) => `q${(i * 7919) % 120_000}`)
const largeTest: TestCase = {
  args: [
    ['RecentSearches', ...searches.map(() => 'search'), 'getRecent'],
    [[100_000], ...searches.map((q) => [q]), [10]],
  ],
  expected: [
    null,
    ...searches.map(() => null),
    [
      'q82081',
      'q74162',
      'q66243',
      'q58324',
      'q50405',
      'q42486',
      'q34567',
      'q26648',
      'q18729',
      'q10810',
    ],
  ],
}

export default defineProblem({
  signature: {
    kind: 'class',
    className: 'RecentSearches',
    constructorParams: [{ name: 'capacity', type: 'int' }],
    methods: [
      { name: 'search', params: [{ name: 'query', type: 'string' }], returns: 'void' },
      { name: 'getRecent', params: [{ name: 'k', type: 'int' }], returns: 'string[]' },
    ],
  },
  examples: [
    {
      args: [
        [
          'RecentSearches',
          'search',
          'search',
          'search',
          'getRecent',
          'search',
          'getRecent',
          'search',
          'getRecent',
        ],
        [[3], ['maps'], ['weather'], ['news'], [2], ['maps'], [5], ['flights'], [3]],
      ],
      expected: [
        null,
        null,
        null,
        null,
        ['news', 'weather'],
        null,
        ['maps', 'news', 'weather'],
        null,
        ['flights', 'maps', 'news'],
      ],
      explanation:
        'Searching "maps" again moves it to the front instead of duplicating it. With a capacity of 3, adding "flights" evicts the oldest entry, "weather".',
    },
    {
      args: [
        ['RecentSearches', 'getRecent', 'search', 'search', 'getRecent'],
        [[1], [1], ['a'], ['b'], [1]],
      ],
      expected: [null, [], null, null, ['b']],
    },
  ],
  tests: [...hiddenTests, largeTest],
  solution: {
    javascript: `class RecentSearches {
  constructor(capacity) {
    this.capacity = capacity
    this.nodes = new Map() // query → list node
    // Doubly linked list between two sentinels, most recent first.
    this.head = { next: null, prev: null }
    this.tail = { next: null, prev: this.head }
    this.head.next = this.tail
  }

  search(query) {
    let node = this.nodes.get(query)
    if (node) {
      node.prev.next = node.next
      node.next.prev = node.prev
    } else {
      node = { query, next: null, prev: null }
      this.nodes.set(query, node)
    }
    node.next = this.head.next
    node.prev = this.head
    this.head.next.prev = node
    this.head.next = node
    if (this.nodes.size > this.capacity) {
      const oldest = this.tail.prev
      oldest.prev.next = this.tail
      this.tail.prev = oldest.prev
      this.nodes.delete(oldest.query)
    }
  }

  getRecent(k) {
    const recent = []
    for (let node = this.head.next; node !== this.tail && recent.length < k; node = node.next) {
      recent.push(node.query)
    }
    return recent
  }
}`,
    python: `class RecentSearches:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # Insertion-ordered, oldest first; move_to_end and popitem are O(1).
        self.history = OrderedDict()

    def search(self, query: str) -> None:
        self.history[query] = True
        self.history.move_to_end(query)
        if len(self.history) > self.capacity:
            self.history.popitem(last=False)

    def getRecent(self, k: int) -> List[str]:
        # reversed() walks from the most recent entry without copying the history.
        return list(itertools.islice(reversed(self.history), k))`,
  },
})
