import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './resources'

const DEFAULT_LANGUAGE = 'en'

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:
      (typeof window !== 'undefined' && localStorage.getItem('pinnacle-language')) ||
      DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })

export default i18n
