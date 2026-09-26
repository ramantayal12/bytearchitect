import type { MDXProps } from 'mdx/types'
import type { ComponentType } from 'react'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type Language = 'javascript' | 'typescript' | 'python'

type Scalar = 'int' | 'double' | 'boolean' | 'string'
/** Parameter and return types; they drive the generated starter code in every language. */
export type ValueType = Scalar | `${Scalar}[]` | `${Scalar}[][]`
export type ReturnType = ValueType | 'void'

export interface Param {
  name: string
  type: ValueType
}

/** A plain function: `function name(...)` in JS/TS, `Solution.name(self, ...)` in Python. */
export interface FunctionSignature {
  kind: 'function'
  name: string
  params: Param[]
  returns: ReturnType
}

export interface MethodSignature {
  name: string
  params: Param[]
  returns: ReturnType
}

/** A design problem: the learner implements a class that is driven by a list of calls. */
export interface ClassSignature {
  kind: 'class'
  className: string
  constructorParams: Param[]
  methods: MethodSignature[]
}

export type Signature = FunctionSignature | ClassSignature

/**
 * One judged input. For function problems `args` are the call's arguments. For class
 * problems `args` is `[operations, arguments]`, as on LeetCode, and `expected` lists each
 * call's result (`null` for the constructor and for void methods).
 */
export interface TestCase {
  args: unknown[]
  expected: unknown
}

export interface Example extends TestCase {
  explanation?: string
}

/** How an output is compared with the expected one. */
export type Comparison =
  /** Deep equality. */
  | 'exact'
  /** The top-level array may be in any order. */
  | 'unordered'
  /** Numbers match within 1e-5 (absolute or relative). */
  | 'float'

/** Where the question was reported. */
export interface ProblemSource {
  /** Interview round, e.g. "Phone screen" or "Onsite". */
  round: string
  /** When it was reported, e.g. "Mar 2024". */
  date: string
  /** Link to the LeetCode Discuss post. */
  url: string
}

/** Outline entry as authored in a problem set's `set.ts`. */
export interface ProblemRef {
  slug: string
  title: string
  difficulty: Difficulty
  topics: string[]
  source: ProblemSource
}

/** The judged part of a problem, authored in `<slug>.problem.ts`. */
export interface ProblemDefinition {
  signature: Signature
  /** Shown in the statement and used as the default "Run" test cases. */
  examples: Example[]
  /** Hidden test cases, judged on "Submit" after the examples. */
  tests: TestCase[]
  compare?: Comparison
  /** Reference solutions. The JavaScript one also computes expected outputs for custom inputs. */
  solution: { javascript: string; python: string }
}

/** Flattened, fully-resolved problem used throughout the UI. */
export interface Problem extends ProblemRef {
  setId: string
  /** 1-based position in the set. */
  number: number
}

export interface MdxModule {
  default: ComponentType<MDXProps>
}

export interface LoadedProblem {
  definition: ProblemDefinition
  /** The statement: prose, constraints and follow-ups (examples are rendered from data). */
  Statement: ComponentType<MDXProps>
  /** The editorial explaining the reference solution. */
  Editorial?: ComponentType<MDXProps>
}

export interface ProblemSetMeta {
  id: string
  title: string
  subtitle: string
  description: string
  /** The compilation this set was built from. */
  source: { title: string; url: string }
}

export interface ProblemSet extends ProblemSetMeta {
  problems: Problem[]
  getProblem(slug: string): Problem | undefined
  /** Loads a problem's code-split definition, statement and editorial. */
  loadProblem(slug: string): Promise<LoadedProblem>
}

export type Verdict =
  'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Compile Error'

/** Why a submission failed, formatted for display: the failing test, or the compile error. */
export interface SubmissionFailure {
  input?: string
  output?: string
  expected?: string
  error?: string
  stdout?: string
}

export interface Submission {
  id: string
  language: Language
  code: string
  verdict: Verdict
  passed: number
  total: number
  runtimeMs: number
  /** Epoch millis. */
  createdAt: number
  failure?: SubmissionFailure
}

export type NewSubmission = Omit<Submission, 'id' | 'createdAt'>
