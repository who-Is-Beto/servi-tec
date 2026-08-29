import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { loadTracking } from './config/tracking'
import { vReveal } from './directives/reveal'

// Fuentes self-hosted (font-display: swap, sin llamadas a Google Fonts).
import '@fontsource-variable/manrope'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'

import './style.css'

// Solo inyecta scripts de terceros si hay IDs en .env (ver .env.example).
loadTracking()

createApp(App)
  .use(createPinia())
  .use(router)
  .use(createHead())
  .directive('reveal', vReveal)
  .mount('#app')