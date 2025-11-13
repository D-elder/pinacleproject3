import { create } from 'zustand'

export type SupportedLanguage = 'en' | 'ig' | 'yo' | 'ha'

interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }
  const stored = localStorage.getItem('pinnacle-language')
  if (stored && ['en', 'ig', 'yo', 'ha'].includes(stored)) {
    return stored as SupportedLanguage
  }
  return DEFAULT_LANGUAGE
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pinnacle-language', language)
    }
    set({ language })
  },
}))

export const LANGUAGES: Record<SupportedLanguage, { label: string }> = {
  en: { label: 'English' },
  ig: { label: 'Igbo' },
  yo: { label: 'Yorùbá' },
  ha: { label: 'Hausa' },
}
