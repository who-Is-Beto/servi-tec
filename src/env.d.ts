/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Identificador del contenedor de Google Tag Manager (GTM-XXXXXX). Vacío = No se carga. */
  readonly VITE_GOOGLE_TAG_MANAGER_ID?: string
  /** Measurement ID de GA4 (G-XXXXXXX). Vacío = No se carga. */
  readonly VITE_GA4_MEASUREMENT_ID?: string
  /** Conversion ID de Google Ads para el evento de llamada/lead (AW-XXXXXXX). */
  readonly VITE_GOOGLE_ADS_CONVERSION_ID?: string
  /** ID del Meta Pixel (XXXXXXX). Vacío = No se carga. */
  readonly VITE_META_PIXEL_ID?: string
  /** URL base del sitio. Se usa para canonical, schema.org y el sitemap. */
  readonly VITE_SITE_URL?: string
  /** Número de WhatsApp en formato internacional (solo dígitos, ej. 52556908945). */
  readonly VITE_WHATSAPP_NUMBER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * Tipos para los iconos de @tabler/icons-vue importados por subruta directa
 * (dist/esm/icons/*.mjs). El paquete solo declara tipos para el barrel
 * `@tabler/icons-vue`; estas subrutas .mjs no traen .d.ts y provocan TS7016
 * (implicit any) en `vue-tsc --noEmit`. Cada módulo exporta por defecto un
 * componente Vue.
 */
declare module '@tabler/icons-vue/dist/esm/icons/*.mjs' {
  import type { DefineComponent } from 'vue'
  const icon: DefineComponent<Record<string, unknown>>
  export default icon
}