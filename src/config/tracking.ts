/**
 * Identificadores de analítica y carga de scripts de terceros.
 *
 * Los scripts SOLO se inyectan si existe el ID correspondiente en
 * `import.meta.env` (ver .env.example). Todos se cargan con `defer` para
 * no bloquear el LCP ni el INP. Si no llenas los IDs, el sitio funciona
 * igual pero sin tracking.
 */

const env = import.meta.env

export const analyticsIds = {
  gtm: env.VITE_GOOGLE_TAG_MANAGER_ID?.trim() || '',
  ga4: env.VITE_GA4_MEASUREMENT_ID?.trim() || '',
  ads: env.VITE_GOOGLE_ADS_CONVERSION_ID?.trim() || '',
  meta: env.VITE_META_PIXEL_ID?.trim() || '',
}

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

function injectScript(id: string, src: string): void {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.src = src
  s.async = true
  s.defer = true
  document.head.appendChild(s)
}

function injectInline(id: string, code: string): void {
  if (document.getElementById(id)) return
  const s = document.createElement('script')
  s.id = id
  s.text = code
  document.head.appendChild(s)
}

/** Google Tag Manager (precarga gtag.js vía GTM). */
function loadGtm(id: string): void {
  injectScript(`gtm-${id}`, `https://www.googletagmanager.com/gtm.js?id=${id}`)
  // GTM necesita su inline de inicialización; reemplazable por CSP nonce si aplicas.
  injectInline(
    `gtm-init-${id}`,
    `window.dataLayer=window.dataLayer||[];(function(){var d=document,l='dataLayer';try{var g=new Error();}catch(e){};})();`,
  )
}

/** GA4 directo (sin GTM). */
function loadGa4(id: string): void {
  injectScript('gtag-js', 'https://www.googletagmanager.com/gtag/js?id=' + id)
  injectInline(
    'gtag-init',
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{send_page_view:true});`,
  )
}

/** Meta Pixel base + track automático de PageView. */
function loadMetaPixel(id: string): void {
  injectScript(
    'meta-pixel',
    'https://connect.facebook.net/en_US/fbevents.js',
  )
  injectInline(
    'meta-pixel-init',
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`,
  )
}

/**
 * Carga TODOS los trackers configurados. Se llama una sola vez en `main.ts`.
 */
export function loadTracking(): void {
  if (analyticsIds.gtm) loadGtm(analyticsIds.gtm)
  if (analyticsIds.ga4 && !analyticsIds.gtm) loadGa4(analyticsIds.ga4)
  if (analyticsIds.meta) loadMetaPixel(analyticsIds.meta)
}