import { defineProblem, type TestCase } from '@/features/practice'

/** Edge cases and random formulas; expected outputs come from a recursive-descent parser. */
// prettier-ignore
const hiddenTests: TestCase[] = [
  { args: ["a"], expected: "a" },
  { args: ["-a"], expected: "-a" },
  { args: ["+a"], expected: "a" },
  { args: ["(a)"], expected: "a" },
  { args: ["((a))"], expected: "a" },
  { args: ["-(a)"], expected: "-a" },
  { args: ["-(-a)"], expected: "a" },
  { args: ["+(-a)"], expected: "-a" },
  { args: ["a+b"], expected: "a+b" },
  { args: ["a-b"], expected: "a-b" },
  { args: ["a-(-b)"], expected: "a+b" },
  { args: ["-(-(-a))"], expected: "-a" },
  { args: ["(a+b)-(c-d)"], expected: "a+b-c+d" },
  { args: ["x-(y)-(z)"], expected: "x-y-z" },
  { args: ["a+(b-(c+(d-e)))"], expected: "a+b-c-d+e" },
  { args: ["-(a+(b-(c+d)))-e"], expected: "-a-b+c+d-e" },
  { args: ["a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(a-(b))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))"], expected: "a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+a-a+b" },
  { args: ["z+y+f"], expected: "z+y+f" },
  { args: ["-m+a+f"], expected: "-m+a+f" },
  { args: ["f+((+f)+(v)+(-j+l-f))+(a-(p-f))-f"], expected: "f+f+v-j+l-f+a-p+f-f" },
  { args: ["+l-(a-(d))+o"], expected: "l-a+d+o" },
  { args: ["(-((+g-q)-k-r)+(u+j)-(-(i-u-e)))+u+k+((-(j)+t)+o-k)-((f-f)+q)"], expected: "-g+q+k+r+u+j+i-u-e+u+k-j+t+o-k-f+f-q" },
  { args: ["l+y-v+l"], expected: "l+y-v+l" },
  { args: ["p-w-k"], expected: "p-w-k" },
  { args: ["a-i-o-u"], expected: "a-i-o-u" },
  { args: ["(n-f)-k+f+p-x-(j-a+((+h+(+p)+n)-(h-(n+w)-r)))-(j-n-u)-f-g+l+(e-s)-h"], expected: "n-f-k+f+p-x-j+a-h-p-n+h-n-w-r-j+n+u-f-g+l+e-s-h" },
  { args: ["w-((k-j))+d-(a)-i+z"], expected: "w-k+j+d-a-i+z" },
]

export default defineProblem({
  signature: {
    kind: 'function',
    name: 'removeParentheses',
    params: [{ name: 'formula', type: 'string' }],
    returns: 'string',
  },
  examples: [
    {
      args: ['a-(b+c)'],
      expected: 'a-b-c',
      explanation: 'The minus in front of the parentheses flips the signs of b and c.',
    },
    { args: ['-(a-b)+c'], expected: '-a+b+c' },
    {
      args: ['a-(b-(c-d))'],
      expected: 'a-b+c-d',
      explanation: 'c is negated twice, so it ends up positive; d is negated three times.',
    },
  ],
  tests: [
    ...hiddenTests,
    // Rebuilding strings at every level is quadratic; this formula has 140,001 characters.
    { args: ['a-(b+c)+'.repeat(17_500) + 'z'], expected: 'a-b-c+'.repeat(17_500) + 'z' },
  ],
  solution: {
    javascript: `function removeParentheses(formula) {
  // signs[i] is the sign that the i-th enclosing parenthesis applies to its contents.
  const signs = [1]
  // Sign of the next variable.
  let sign = 1
  const out = []
  for (const ch of formula) {
    if (ch === '+' || ch === '-') {
      sign = signs[signs.length - 1] * (ch === '-' ? -1 : 1)
    } else if (ch === '(') {
      signs.push(sign)
    } else if (ch === ')') {
      signs.pop()
    } else {
      out.push((sign < 0 ? '-' : out.length > 0 ? '+' : '') + ch)
    }
  }
  return out.join('')
}`,
    python: `class Solution:
    def removeParentheses(self, formula: str) -> str:
        # signs[i] is the sign that the i-th enclosing parenthesis applies to its contents.
        signs = [1]
        # Sign of the next variable.
        sign = 1
        out = []
        for ch in formula:
            if ch in "+-":
                sign = signs[-1] * (-1 if ch == "-" else 1)
            elif ch == "(":
                signs.append(sign)
            elif ch == ")":
                signs.pop()
            else:
                out.append(("-" if sign < 0 else "+" if out else "") + ch)
        return "".join(out)`,
  },
})
