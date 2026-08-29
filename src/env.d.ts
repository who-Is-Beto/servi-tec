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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}