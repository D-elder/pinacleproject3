import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useLanguageStore } from '@/store/languageStore'

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation()
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language).catch((error) => {
        console.error('Failed to change language', error)
      })
    }
  }, [language, i18n])

  return <>{children}</>
}
