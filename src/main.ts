import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import { loadTracking } from './config/tracking'
import { vReveal } from './directives/reveal'

// Fuentes self-hosted, SOLO subconjunto latin (el contenido es es-MX):
// font-display: swap, sin llamadas a Google Fonts y sin subconjuntos
// (cyrillic/greek/vietnamese) que nunca se usan. Se pre-cargan en index.html.
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-600.css'

import './style.css'

// Solo inyecta scripts de terceros si hay IDs en .env (ver .env.example).
loadTracking()

createApp(App)
  .use(createPinia())
  .use(router)
  .use(createHead())
  .directive('reveal', vReveal)
  .mount('#app')