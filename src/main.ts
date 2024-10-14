import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import sw from './locales/sw.json'
import fr from './locales/fr.json'

const app = createApp(App)
const locale = localStorage.getItem('locale') || 'en-US'

export const i18n = createI18n({
  locale: locale,
  messages: { 'en-US': en, 'sw-TZ': sw, 'fr-FR': fr },
  legacy: false,
  fallbackWarn: false,
  missingWarn: false,
  globalInjection: true
})

export const changeLocale = (lang: any) => {
  i18n.global.locale.value = lang
  localStorage.setItem('locale', lang)
}

app.use(router)

app.use(i18n)

app.mount('#app')
