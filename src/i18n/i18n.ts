import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation from '@/i18n/en/translation.json'

i18next
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: { en: { translation } },
  })
  .catch(console.error)

export default i18next
