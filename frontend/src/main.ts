import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import '@/assets/styles/index.scss'
import en from './language/en'
import zh from './language/zh'

let messages = {
  zh,
  en,
}

const i18n = createI18n({
  legacy: false,
  messages,
  locale: 'en',
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
