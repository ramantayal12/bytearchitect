import type { Language, MethodSignature, Param, ReturnType, Signature } from './practice.types'

export const languages: { id: Language; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'python', label: 'Python 3' },
]

const scalarTypes = {
  int: { ts: 'number', py: 'int' },
  double: { ts: 'number', py: 'float' },
  boolean: { ts: 'boolean', py: 'bool' },
  string: { ts: 'string', py: 'str' },
} as const

/** `int[][]` → `number[][]` */
export function tsType(type: ReturnType): string {
  if (type === 'void') return 'void'
  const [scalar, ...dims] = type.split('[]') as [keyof typeof scalarTypes, ...string[]]
  return scalarTypes[scalar].ts + '[]'.repeat(dims.length)
}

/** `int[][]` → `List[List[int]]` */
export function pyType(type: ReturnType): string {
  if (type === 'void') return 'None'
  const [scalar, ...dims] = type.split('[]') as [keyof typeof scalarTypes, ...string[]]
  return dims.reduce<string>((inner) => `List[${inner}]`, scalarTypes[scalar].py)
}

const jsDoc = (params: Param[], returns: ReturnType | undefined, indent: string) =>
  [
    `${indent}/**`,
    ...params.map((p) => `${indent} * @param {${tsType(p.type)}} ${p.name}`),
    ...(returns ? [`${indent} * @return {${tsType(returns)}}`] : []),
    `${indent} */`,
  ].join('\n')

const tsParams = (params: Param[]) => params.map((p) => `${p.name}: ${tsType(p.type)}`).join(', ')
const jsParams = (params: Param[]) => params.map((p) => p.name).join(', ')
const pyParams = (params: Param[]) =>
  ['self', ...params.map((p) => `${p.name}: ${pyType(p.type)}`)].join(', ')

function javascriptStarter(signature: Signature): string {
  if (signature.kind === 'function') {
    const { name, params, returns } = signature
    return `${jsDoc(params, returns, '')}\nfunction ${name}(${jsParams(params)}) {\n  \n}\n`
  }
  const ctor = signature.constructorParams
  const ctorDoc = ctor.length ? `${jsDoc(ctor, undefined, '  ')}\n` : ''
  const methods = signature.methods.map(
    (m) => `${jsDoc(m.params, m.returns, '  ')}\n  ${m.name}(${jsParams(m.params)}) {\n    \n  }`,
  )
  return [
    `class ${signature.className} {`,
    `${ctorDoc}  constructor(${jsParams(ctor)}) {\n    \n  }`,
    ...methods.map((m) => `\n${m}`),
    '}\n',
  ].join('\n')
}

function typescriptStarter(signature: Signature): string {
  if (signature.kind === 'function') {
    const { name, params, returns } = signature
    return `function ${name}(${tsParams(params)}): ${tsType(returns)} {\n  \n}\n`
  }
  const method = (m: MethodSignature) =>
    `  ${m.name}(${tsParams(m.params)}): ${tsType(m.returns)} {\n    \n  }`
  return [
    `class ${signature.className} {`,
    `  constructor(${tsParams(signature.constructorParams)}) {\n    \n  }`,
    ...signature.methods.map((m) => `\n${method(m)}`),
    '}\n',
  ].join('\n')
}

function pythonStarter(signature: Signature): string {
  if (signature.kind === 'function') {
    const { name, params, returns } = signature
    return `class Solution:\n    def ${name}(${pyParams(params)}) -> ${pyType(returns)}:\n        pass\n`
  }
  const method = (m: MethodSignature) =>
    `    def ${m.name}(${pyParams(m.params)}) -> ${pyType(m.returns)}:\n        pass`
  return [
    `class ${signature.className}:`,
    `    def __init__(${pyParams(signature.constructorParams)}):\n        pass`,
    ...signature.methods.map((m) => `\n${method(m)}`),
    '',
  ].join('\n')
}

/** The code a learner starts from, generated from the problem's signature. */
export function starterCode(signature: Signature, language: Language): string {
  switch (language) {
    case 'javascript':
      return javascriptStarter(signature)
    case 'typescript':
      return typescriptStarter(signature)
    case 'python':
      return pythonStarter(signature)
  }
}
