import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }
    // Cambios SOLO de query (p. ej. ?zona= al elegir zona en el mapa) NO deben
    // resetear el scroll: el código hace su propio scrollIntoView al mapa.
    if (to.path !== from.path) return { top: 0 }
    return false
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Reparación de Línea Blanca a Domicilio en CDMX',
        description:
          'Reparación de lavadoras, refrigeradores, estufas y secadoras a domicilio en CDMX y zona metropolitana. Servicio especializado en Samsung, LG, Daewoo y Winnia.',
      },
    },
    {
      path: '/terminos-y-condiciones',
      name: 'terminos',
      component: () => import('@/views/TermsView.vue'),
      meta: {
        title: 'Términos y Condiciones',
        description:
          'Términos y condiciones del servicio técnico de reparación de línea blanca a domicilio. Garantía, cotización previa y política de refacciones.',
      },
    },
    {
      path: '/aviso-de-privacidad',
      name: 'privacidad',
      component: () => import('@/views/PrivacyView.vue'),
      meta: {
        title: 'Aviso de Privacidad',
        description:
          'Aviso de privacidad de Servicio Lavadoras: qué datos capturamos en el formulario de agendado y cómo los usamos, conforme a la legislación mexicana.',
      },
    },
    /**
     * Crecimiento futuro sin romper la arquitectura:
     * - /reparacion/:marca  → subpáginas por marca (usar /src/data/marcas.ts)
     * - /zonas/:zona        → subpáginas por zona (usar /src/data/zonas.ts)
     * Se habilitan creando las vistas y descomentando estas rutas.
     */
    // {
    //   path: '/reparacion/:marca',
    //   name: 'marca',
    //   component: () => import('@/views/MarcaView.vue'),
    // },
    // {
    //   path: '/zonas/:zona',
    //   name: 'zona',
    //   component: () => import('@/views/ZonaView.vue'),
    // },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router