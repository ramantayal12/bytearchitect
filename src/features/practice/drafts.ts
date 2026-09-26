import type { Language } from './practice.types'

/**
 * Editor drafts and the preferred language are per-browser conveniences kept in
 * localStorage; storage can be unavailable (private mode), so every access is guarded.
 */
const LANGUAGE_KEY = 'ba-code-language'
const draftKey = (problemKey: string, language: Language) => `ba-code:${problemKey}:${language}`
const isLanguage = (value: unknown): value is Language =>
  value === 'javascript' || value === 'typescript' || value === 'python'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    // storage unavailable
  }
}

export const loadDraft = (problemKey: string, language: Language) =>
  read(draftKey(problemKey, language)) ?? undefined

export const saveDraft = (problemKey: string, language: Language, code: string | null) =>
  write(draftKey(problemKey, language), code)

export function loadLanguage(): Language {
  const value = read(LANGUAGE_KEY)
  return isLanguage(value) ? value : 'javascript'
}

export const saveLanguage = (language: Language) => write(LANGUAGE_KEY, language)
