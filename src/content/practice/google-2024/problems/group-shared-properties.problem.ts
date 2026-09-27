import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random inputs; expected outputs come from a pairwise BFS. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [[["a","b","c"]]], expected: [[0]] },
  { args: [[["a","b","c"],["a","x","y"]]], expected: [[0,1]] },
  { args: [[["a","b","c"],["d","e","c"]]], expected: [[0,1]] },
  { args: [[["q","w","e"],["r","t","y"],["u","i","o"]]], expected: [[0],[1],[2]] },
  { args: [[["1","1","1"],["1","1","1"],["1","1","1"]]], expected: [[0,1,2]] },
  { args: [[["a","b","c"],["c","a","b"],["b","c","a"]]], expected: [[0],[1],[2]] },
  { args: [[["k","x","m"],["z","y","m"],["k","y","n"],["o","p","q"],["o","r","s"]]], expected: [[0,1,2],[3,4]] },
  { args: [[["a1","b2","c0"],["a3","b3","c1"],["a0","b0","c0"],["a3","b2","c0"],["a1","b2","c2"],["a1","b0","c2"]]], expected: [[0,1,2,3,4,5]] },
  { args: [[["a1","b0","c5"],["a2","b2","c1"],["a1","b2","c2"],["a5","b5","c2"],["a0","b4","c2"],["a5","b3","c4"],["a1","b1","c1"],["a3","b2","c0"]]], expected: [[0,1,2,3,4,5,6,7]] },
  { args: [[["a4","b0","c4"],["a4","b3","c6"],["a6","b4","c6"],["a7","b2","c3"],["a4","b4","c0"],["a1","b0","c7"],["a4","b7","c5"],["a2","b3","c1"],["a6","b3","c7"],["a4","b2","c5"]]], expected: [[0,1,2,3,4,5,6,7,8,9]] },
  { args: [[["a6","b11","c9"],["a5","b10","c8"],["a3","b5","c1"],["a0","b11","c3"],["a4","b9","c9"],["a3","b1","c5"],["a2","b4","c7"],["a0","b0","c5"],["a11","b1","c4"],["a11","b10","c5"],["a0","b5","c4"],["a5","b2","c10"],["a6","b9","c10"],["a1","b4","c9"],["a3","b7","c4"]]], expected: [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]] },
  { args: [[["a4","b8","c12"],["a19","b5","c10"],["a18","b0","c11"],["a1","b14","c5"],["a11","b11","c9"],["a18","b3","c14"],["a6","b13","c6"],["a3","b1","c1"],["a1","b5","c19"],["a4","b19","c1"],["a17","b15","c18"],["a7","b10","c1"],["a3","b16","c9"],["a13","b6","c15"],["a6","b7","c14"],["a13","b15","c1"],["a7","b13","c14"],["a7","b13","c6"],["a15","b6","c1"],["a1","b8","c8"]]], expected: [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]] },
  { args: [[["a7","b16","c6"],["a24","b7","c13"],["a27","b8","c4"],["a10","b1","c28"],["a29","b10","c18"],["a3","b18","c12"],["a28","b20","c20"],["a27","b25","c22"],["a23","b1","c15"],["a12","b2","c13"],["a6","b29","c27"],["a18","b28","c29"],["a5","b10","c9"],["a21","b15","c25"],["a28","b20","c10"],["a26","b13","c16"],["a6","b20","c25"],["a21","b25","c8"],["a10","b29","c12"],["a15","b2","c27"],["a8","b20","c21"],["a6","b1","c12"],["a28","b19","c4"],["a24","b8","c21"],["a27","b1","c27"],["a5","b22","c20"],["a14","b18","c15"],["a23","b12","c29"],["a12","b6","c25"],["a0","b6","c29"]]], expected: [[0],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29],[15]] },
  { args: [[["a20","b1","c32"],["a14","b50","c48"],["a28","b6","c25"],["a20","b42","c60"],["a67","b56","c3"],["a10","b4","c14"],["a62","b32","c17"],["a5","b46","c10"],["a66","b1","c38"],["a44","b9","c10"],["a69","b58","c48"],["a26","b39","c49"],["a29","b62","c51"],["a12","b9","c14"],["a46","b65","c55"],["a53","b56","c8"],["a25","b38","c61"],["a54","b15","c21"],["a47","b20","c22"],["a19","b41","c63"],["a43","b33","c69"],["a0","b21","c0"],["a39","b15","c69"],["a14","b62","c61"],["a67","b9","c66"],["a31","b52","c37"],["a45","b29","c23"],["a0","b6","c40"],["a69","b59","c39"],["a64","b56","c56"],["a50","b18","c32"],["a46","b43","c17"],["a55","b10","c18"],["a22","b36","c47"],["a25","b44","c11"],["a9","b51","c22"],["a42","b47","c41"],["a22","b38","c2"],["a2","b67","c11"],["a45","b12","c20"],["a23","b63","c9"],["a14","b22","c61"],["a28","b38","c51"],["a30","b62","c28"],["a39","b47","c29"],["a41","b68","c67"],["a57","b51","c64"],["a51","b40","c36"],["a56","b52","c1"],["a32","b23","c69"],["a58","b46","c51"],["a49","b3","c19"],["a65","b8","c58"],["a44","b39","c11"],["a33","b61","c28"],["a61","b8","c19"],["a30","b8","c38"],["a16","b6","c20"],["a50","b68","c33"],["a2","b67","c31"]]], expected: [[0,1,2,3,4,5,7,8,9,10,11,12,13,15,16,21,23,24,26,27,28,29,30,33,34,37,38,39,41,42,43,45,50,51,52,53,54,55,56,57,58,59],[6,14,31],[17,20,22,36,44,49],[18,35,46],[19],[25,48],[32],[40],[47]] },
  { args: [[["a40","b24","c52"],["a8","b81","c20"],["a31","b69","c15"],["a73","b44","c38"],["a106","b33","c20"],["a143","b93","c0"],["a141","b39","c128"],["a105","b39","c55"],["a76","b123","c129"],["a17","b96","c43"],["a41","b65","c131"],["a100","b137","c77"],["a102","b84","c43"],["a99","b15","c108"],["a7","b71","c4"],["a77","b39","c21"],["a40","b29","c3"],["a59","b59","c141"],["a2","b122","c136"],["a47","b115","c97"],["a86","b44","c135"],["a48","b27","c121"],["a91","b78","c105"],["a9","b54","c65"],["a148","b78","c122"],["a86","b21","c60"],["a80","b26","c9"],["a82","b134","c121"],["a90","b20","c45"],["a11","b127","c132"],["a139","b63","c9"],["a51","b18","c86"],["a35","b78","c29"],["a129","b130","c0"],["a18","b57","c70"],["a4","b8","c2"],["a122","b37","c54"],["a92","b63","c88"],["a76","b99","c103"],["a8","b44","c105"],["a126","b16","c130"],["a130","b76","c143"],["a72","b53","c111"],["a82","b44","c54"],["a4","b122","c111"],["a70","b84","c104"],["a104","b82","c53"],["a65","b71","c130"],["a22","b7","c103"],["a67","b73","c33"],["a80","b22","c42"],["a23","b54","c64"],["a55","b127","c29"],["a87","b2","c116"],["a145","b52","c42"],["a23","b62","c132"],["a24","b29","c80"],["a75","b145","c148"],["a38","b19","c45"],["a6","b46","c52"],["a67","b8","c83"],["a84","b93","c41"],["a43","b55","c12"],["a13","b41","c14"],["a67","b126","c26"],["a51","b35","c100"],["a122","b139","c126"],["a138","b82","c92"],["a110","b103","c9"],["a9","b46","c39"],["a91","b56","c75"],["a60","b93","c146"],["a49","b88","c98"],["a93","b137","c28"],["a57","b48","c89"],["a47","b136","c54"],["a5","b6","c30"],["a48","b75","c82"],["a138","b127","c10"],["a78","b100","c41"],["a35","b96","c118"],["a89","b91","c1"],["a114","b34","c114"],["a7","b107","c54"],["a29","b84","c75"],["a142","b13","c20"],["a123","b41","c134"],["a15","b46","c61"],["a85","b5","c5"],["a97","b111","c59"],["a149","b35","c10"],["a34","b46","c73"],["a59","b111","c80"],["a138","b95","c43"],["a88","b139","c146"],["a88","b66","c85"],["a137","b8","c139"],["a38","b93","c146"],["a50","b126","c120"],["a30","b18","c50"],["a40","b36","c141"],["a35","b13","c137"],["a88","b20","c12"],["a38","b139","c45"],["a67","b14","c75"],["a121","b71","c53"],["a120","b72","c135"],["a15","b35","c73"],["a106","b11","c0"],["a88","b135","c92"],["a18","b51","c110"],["a20","b108","c8"],["a72","b50","c50"],["a44","b51","c20"],["a23","b2","c0"],["a74","b133","c132"],["a134","b108","c16"],["a23","b133","c86"],["a43","b51","c130"],["a140","b15","c15"]]], expected: [[0,1,3,4,5,9,12,14,16,17,18,19,20,21,22,23,24,25,27,28,29,31,32,33,34,35,36,39,40,42,43,44,45,46,47,49,51,52,53,55,56,58,59,60,61,62,64,65,66,67,69,70,71,75,77,78,79,80,83,84,85,87,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,112,113,114,115,117,118],[2,13,119],[6,7,15],[8,38,48],[10],[11,73],[26,30,37,50,54,68],[41],[57],[63,86],[72],[74],[76],[81],[82],[88],[111,116]] },
]

const N = 50_000
const range = (start: number, step: number) =>
  Array.from({ length: Math.ceil((N - start) / step) }, (_, i) => start + i * step)

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'groupRecords',
    params: [{ name: 'records', type: 'string[][]' }],
    returns: 'int[][]',
  },
  examples: [
    {
      args: [
        [
          ['red', 'small', 'round'],
          ['blue', 'large', 'round'],
          ['green', 'small', 'square'],
          ['pink', 'tiny', 'star'],
        ],
      ],
      expected: [[0, 1, 2], [3]],
      explanation:
        'Records 0 and 1 share p3 = "round", and records 0 and 2 share p2 = "small", so 0, 1 and 2 form one group. Record 3 shares nothing.',
    },
    {
      args: [
        [
          ['a', 'b', 'c'],
          ['b', 'c', 'a'],
        ],
      ],
      expected: [[0], [1]],
      explanation: 'Values only match within the same property, so the records share nothing.',
    },
    {
      args: [
        [
          ['x', '1', 'p'],
          ['y', '1', 'q'],
          ['y', '2', 'r'],
          ['z', '3', 'r'],
        ],
      ],
      expected: [[0, 1, 2, 3]],
      explanation: '0–1 share p2, 1–2 share p1 and 2–3 share p3: a chain connects all four.',
    },
  ],
  tests: [
    ...hiddenTests,
    // Comparing every pair of records is O(n²) and times out on these.
    {
      args: [Array.from({ length: N }, (_, i) => [`x${i >> 1}`, `y${(i + 1) >> 1}`, `z${i}`])],
      expected: [range(0, 1)],
    },
    {
      args: [Array.from({ length: N }, (_, i) => [`g${i % 2}`, `a${i}`, `b${i}`])],
      expected: [range(0, 2), range(1, 2)],
    },
  ],
  solution: {
    javascript: `function groupRecords(records) {
  const parent = records.map((_, i) => i)
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]
      x = parent[x]
    }
    return x
  }
  // For each property, union every record with the first record that had the same value.
  for (let p = 0; p < 3; p++) {
    const firstWith = new Map()
    records.forEach((record, i) => {
      const value = record[p]
      if (firstWith.has(value)) parent[find(i)] = find(firstWith.get(value))
      else firstWith.set(value, i)
    })
  }
  // Scanning ids in order builds each group in increasing order, and orders the groups
  // by their smallest id.
  const groups = new Map()
  records.forEach((_, i) => {
    const root = find(i)
    if (!groups.has(root)) groups.set(root, [])
    groups.get(root).push(i)
  })
  return [...groups.values()]
}`,
    python: `class Solution:
    def groupRecords(self, records: List[List[str]]) -> List[List[int]]:
        parent = list(range(len(records)))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # For each property, union every record with the first record that had the same value.
        for p in range(3):
            first_with = {}
            for i, record in enumerate(records):
                value = record[p]
                if value in first_with:
                    parent[find(i)] = find(first_with[value])
                else:
                    first_with[value] = i

        # Scanning ids in order builds each group in increasing order, and orders the groups
        # by their smallest id (dicts keep insertion order).
        groups = {}
        for i in range(len(records)):
            groups.setdefault(find(i), []).append(i)
        return list(groups.values())`,
  },
})
