import { useTranslation } from 'react-i18next'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { LANGUAGES, useLanguageStore, type SupportedLanguage } from '@/store/languageStore'

export const LanguageSelector = ({ alignEnd }: { alignEnd?: boolean }) => {
  const { t } = useTranslation()
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(value as SupportedLanguage)}
    >
      <SelectTrigger className="w-[200px] bg-white font-medium text-sm text-foreground">
        <div className="flex w-full items-center justify-between">
          <span>{t('languageLabel')}</span>
          <span className="font-semibold text-foreground">{LANGUAGES[language].label}</span>
        </div>
      </SelectTrigger>
      <SelectContent align={alignEnd ? 'end' : 'start'}>
        {Object.entries(LANGUAGES).map(([code, { label }]) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
