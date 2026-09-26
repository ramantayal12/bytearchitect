import { defineProblem, type TestCase } from '@/features/practice'

/**
 * Random passwords and fragments. Expected outputs come from trying every ordering (small
 * cases) and from a heap-based topological sort checked against the fragments (larger ones).
 */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: [["a"]], expected: "a" },
  { args: [["ba"]], expected: "ba" },
  { args: [["a","b"]], expected: "ab" },
  { args: [["Za"]], expected: "Za" },
  { args: [["z","A","0"]], expected: "0Az" },
  { args: [["cab","ab"]], expected: "cab" },
  { args: [["dc","ba"]], expected: "badc" },
  { args: [["1a","A1"]], expected: "A1a" },
  { args: [["abc","abc"]], expected: "abc" },
  { args: [["qwerty"]], expected: "qwerty" },
  { args: [["N","N","EzO"]], expected: "ENzO" },
  { args: [["O","T","Ta","Ta","aC","V"]], expected: "OTVaC" },
  { args: [["6","O","g","g","g3","g","dr"]], expected: "6Odg3r" },
  { args: [["uSZ","uIM","bu","kbIM"]], expected: "kbuIMSZ" },
  { args: [["M0","FL","I","w","F","Fw","w0","MF","M","E"]], expected: "EIMFLw0" },
  { args: [["b","5b4I6","b42z","56X","46zgm","462zX","5Ium","u","bjum","Iu"]], expected: "5b4I62juzXgm" },
  { args: [["qN3Cjy","01R","6Dk1","71R","k01R","TE3j","Df","3Ckj1R","T36y","E7jR","TvS1y","ND","TE1","S1","Tk","Skj","ECv6kd","TC71y","TCS6D","NTDky","f","qTv6kf","TEv7c","S60","CvSc1y","TE0R","6k","v6yR","NECvjf","vSkjyR"]], expected: "qNTE3Cv7S6Dck0dj1fyR" },
  { args: [["BruqR","HkD","lhz","lskPpG","lJIDRG","r","R","BUai9T","IdiT","lsBJH8kd","tNVaoiR9","XWa","od","i","JrVR","JU8Dopd","tl","tlD","8aR","8p","UkadR9T","snuP","JVDmd9","Vkom2i","UreWqT","d","seWYpiz9","tNXh8eI","DT","NlshrY7","J7qi","shUeaPp7","Boq","oizT","o","tBzG","tsHeIDm","nkd","nhP","nDPo2Rz","G","nIiT","JT","nBH8WdT","JmqiRG","Bei","lshaiT","NkDpG","tN8raT","Xau7","NhrWap","XUkaoz","JhUIuozT","sXHIuodR","rWmd","NBHrePd9","Poqi","hrYp","YIp2R","tVG"]], expected: "tNlsXnBJHhU8rVeWYIkDauPomp27dqiRz9GT" },
  { args: [["CJ8bDx","61oE3J8Zyx","z7sX8Sn","WhA","fu","zhYUq","fXgR","tUgBn","n","psELq","fv9sEXcP5","1sO","Tn","wujkl","7pcmiySVl","sXbZVaR","HeEjckiqal","WQXJcZBDSa","oG","1KuOxq","jX4P5V","M5","j","w7MOJGgR","wC7psJN5a","k","1TySq","Jm","KMR","6dYTgPLqRn","04B","zW8","R","6","tpKsOXYNV","fF61o4r","uj","tH1uEUZ","A8GPDVR","9A","vTq","ed0bV","t","EhX","pGI","Z","usEhXY","WouEdkVR","7hO0kb4ryI","6Q1hTrSR","tzwQOTiZBq","eQ308G2B","FEh82Dxn","9M","vOJ8GTZqaR","6","wHKsAk5q","K3kS","uE3GL","C794DSq","wvOd82","tCpKNT2I","H98Gig2yV","tf6u0UDIR","feuYZ","br","XYiLn","h0Nmgxq","o","KYG","sXn","fWHKdJ","i","F7ND","wC6OdiSxq","1j","7dJbZB","tWH6o9kgBD","NLn","H64ZPBl","Q","zHZPn","O0Niq","wgr","C61d0m4rSV","zosOXU","F6e1KdJbLV","v7B","ChO0c4xR","tfwE3Xc","tF6jdJZ2yx","twXAy","fC","H93cq","fs","ouJ0kUB","m","w73kTyxql","Yb","wC1vMJcNxn","CeEjOXYkLR","694PDq","Qjn","C7","WENT4SLqa","1EO8","jby","tfwF6o8mSq","Adb","F678Uqn","hY82I","w70Ub5","wFojOm4aR","oXkZ","teQpsMNUx5","69s3XAkI","e","QpjhZ","f63jMkDLn","v7kgySxql"]], expected: "tfzWwCFH6eQ1ov79pKusE3jMhOXAdJ0Y8GcNkTUbm4iZg2PBDryISLx5VqaRln" },
  { args: [["AWB","TXe","Lxv","j","tI9","EH6","K","rB","e","k","No","7","13","Vz0","Alh","n","ez","Z","6zh","Iav","H","OhM","xmV","tBC","3fv","PrY","7m","IC","zR","3y","8","2M","j","a","P","vow","t2U","5If","w","l","xmC","fM","D","bez","r","D","PvS","tk","4XO","q","s3X","7","K","q","K","6","qo","Ndw","4","Lxa","FHY","Vo","JS","3","DZo","l1w","dGo","S","u","Dsg","7","N","sxn","FEC","4","w","GC","7o","QJ","Vi","A5","Z","Nn","80R","N","1x3","g","8Z","F","2uf","5","q4","Vpr","A5e","9","OR","tJw","s","by","Ne","5H","jQJ","Y","E","bvk","R","cZX","aU","o","niU","n6w","cuU","8z","d","cX","NiY","42I","Nl","sP","8sx","fR","OU","4Er","x","Ns","8","E","G","Fd","ow","cP","yS","qOk","2n0","D3V","1Q6","7","W","w","dP3","z","Oe9","P0k","ch","1i","M","M","6","8","W"]], expected: "78A5DFKLNTWbcZdGjl1Qq4EHsPgt2IJux3XOae9fmVn6iUprBCYvowySz0RhMk" },
  { args: [["d","DUm08VbGKsYLupkC3ZQ1l7HFSN69qPoEzJiBrvj","t","e","n","R","x","y","c","W","U4spkQl7NPE2iA5gr","w","I","T","a","X","M","4LulHhfzgOr"]], expected: "DIMRTU4WXacdem08VbGKnsYLtupkC3ZQ1l7HFSN69hfqPoE2wxyzJiA5BgOrvj" },
]

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'recoverPassword',
    params: [{ name: 'fragments', type: 'string[]' }],
    returns: 'string',
  },
  examples: [
    {
      args: [['fig', 'lht', 'fli', 'ght']],
      expected: 'flight',
      explanation: 'The fragments force f < l < i < g < h < t, so only one password fits.',
    },
    {
      args: [['ac', 'bc']],
      expected: 'abc',
      explanation: 'Both "abc" and "bac" fit; "abc" is lexicographically smaller.',
    },
    { args: [['x9', '9y', 'xy']], expected: 'x9y' },
  ],
  tests: hiddenTests,
  solution: {
    javascript: `function recoverPassword(fragments) {
  const after = new Map() // char → chars that must come after it
  const indegree = new Map()
  for (const f of fragments) {
    for (const ch of f) {
      if (!after.has(ch)) {
        after.set(ch, new Set())
        indegree.set(ch, 0)
      }
    }
    // Consecutive characters of a fragment are enough: order is transitive.
    for (let i = 0; i + 1 < f.length; i++) {
      if (!after.get(f[i]).has(f[i + 1])) {
        after.get(f[i]).add(f[i + 1])
        indegree.set(f[i + 1], indegree.get(f[i + 1]) + 1)
      }
    }
  }
  // Kahn's algorithm, always taking the smallest available character.
  // With at most 62 characters, scanning for it is cheaper than a heap.
  let password = ''
  while (indegree.size > 0) {
    let next = null
    for (const [ch, d] of indegree) if (d === 0 && (next === null || ch < next)) next = ch
    password += next
    indegree.delete(next)
    for (const ch of after.get(next)) indegree.set(ch, indegree.get(ch) - 1)
  }
  return password
}`,
    python: `class Solution:
    def recoverPassword(self, fragments: List[str]) -> str:
        after = defaultdict(set)  # char → chars that must come after it
        indegree = {}
        for f in fragments:
            for ch in f:
                indegree.setdefault(ch, 0)
            # Consecutive characters of a fragment are enough: order is transitive.
            for a, b in zip(f, f[1:]):
                if b not in after[a]:
                    after[a].add(b)
                    indegree[b] += 1
        # Kahn's algorithm, always taking the smallest available character.
        ready = [ch for ch, d in indegree.items() if d == 0]
        heapify(ready)
        password = []
        while ready:
            ch = heappop(ready)
            password.append(ch)
            for nxt in after[ch]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    heappush(ready, nxt)
        return "".join(password)`,
  },
})
