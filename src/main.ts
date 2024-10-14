import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en_US from './locales/en_US.json'
import sw_TZ from './locales/sw_TZ.json'
import fr_FR from './locales/fr_FR.json'

const locale = localStorage.getItem('locale') || 'en_US'

export const i18n = createI18n({
  locale: locale,
  messages: { en_US, sw_TZ, fr_FR },
  legacy: false,
  fallbackWarn: false,
  missingWarn: false,
  globalInjection: true
})

export const changeLocale = (lang: any) => {
  i18n.global.locale.value = lang
  localStorage.setItem('locale', lang)
}

const app = createApp(App)

app.use(router)

app.use(i18n)

app.mount('#app')
