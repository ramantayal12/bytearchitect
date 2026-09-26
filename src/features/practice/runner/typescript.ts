/** Strips TypeScript types (no type-checking), like LeetCode's TypeScript runtime. */
export async function transpileTypeScript(code: string): Promise<string> {
  const { transform } = await import('sucrase')
  return transform(code, { transforms: ['typescript'], disableESTransforms: true }).code
}
