# TecServi Landing

Landing de una sola página (Vue 3 + Vite + TypeScript + Tailwind v3) para TecServi.
Sitio en `https://tecservi.mx`.

## ⚙️ Tracking de Ads (Google Ads + Meta Pixel) — DÓNDE PEGAR TUS IDs

El sitio ya trae la infraestructura para Google Ads y Meta Ads, pero **ninguna
etiqueta se carga** hasta que llenes los IDs reales en un archivo `.env` local
(a partir de `.env.example`). Los IDs van en variables de entorno, así no tocas
código de página cuando cambien.

Pasos:

1. Copia `.env.example` → `.env`.
2. Pega tus IDs reales (deja vacío lo que no uses; eso desactiva ese tracker):

   | Variable | Qué es | Ejemplo |
   |---|---|---|
   | `VITE_GOOGLE_TAG_MANAGER_ID` | Tag Manager (opcional; si lo pones, gtag se precarga vía GTM) | `GTM-XXXXXXX` |
   | `VITE_GA4_MEASUREMENT_ID` | GA4 | `G-XXXXXXXXXX` |
   | `VITE_GOOGLE_ADS_CONVERSION_ID` | Google Ads conversion (formato `AW-`) | `AW-123456789` |
   | `VITE_META_PIXEL_ID` | Meta Pixel (solo el número, sin `Px`) | `123456789012345` |
   | `VITE_SITE_URL` | URL base (canonical, JSON-LD, sitemap) | `https://tecservi.mx` |

3. Si tu acción de conversión de Google Ads usa una *conversion label*, añádela
   a `send_to` en `src/composables/useConversion.ts` (p. ej. `['AW-xxxx/abc']`).

Los scripts se inyectan con `async`/`defer` desde `src/config/tracking.ts`
(`loadTracking()` se llama en `src/main.ts`). No bloquean LCP ni INP.

### Eventos de conversión ya cableados (listos para hookear)

`src/composables/useConversion.ts` expone `useConversion()`:
- `trackCall()` → click en "Llámanos y agenda" (called-to-call).
- `trackWhatsApp(source)` → click en cualquier CTA de WhatsApp (fab / hero / header / footer / section / form).
- `trackSchedule(source)` → envío exitoso del formulario "Agendar visita".

Cada uno dispara a GA4 (`generate_lead`), Google Ads (`conversion`) y Meta
(`Contact`/`Lead`) **solo si** el ID correspondiente está configurado. Sin IDs
son no-op.

### CSP / script-loading

El proyecto **no impone CSP restrictivo**, así que cargar etiquetas de terceros
(Google Tag Manager, Meta Pixel) no estará bloqueado una vez llenes los IDs. Si
en el futuro añades un CSP con `script-src`, deberás permitir
`https://www.googletagmanager.com` y `https://connect.facebook.net`, y usar
`nonce` para los inline de inicialización (`src/config/tracking.ts`).

## 🚀 Build y deploy

```bash
npm ci            # instalar dependencias
npm run typecheck # validación de tipos (vue-tsc)
npm run build     # build de producción (vue-tsc + vite build)
npm run preview   # servir dist/ localmente
npm run test:e2e  # pruebas Playwright (18 casos móvil/tablet/desktop)
```

`vite build` genera `robots.txt` y `sitemap.xml` automáticamente (ver
`vite.config.ts` / `staticSiteFiles`).

### Notas de rendimiento

- **Iconos**: se importan por ruta directa (`@tabler/icons-vue/dist/esm/icons/*`)
  para que Vite solo transforme los ~21 usados (no las 12 000+ del paquete).
  Esto además arregla un cuelgue de `vite build` en "transforming...".
- **Fuentes**: solo subconjunto `latin` (Manrope Variable + IBM Plex Mono),
  `font-display: swap` y pre-cargadas. Sin subconjuntos cyrillic/greek/vietnamese.
- **Hero/LCP**: imagen AVIF/WebP/JPG pre-cargada con `fetchpriority=high`,
  `width`/`height` fijos para evitar CLS.
- `VITE_INLINE_CSS=1` (opcional): inlinea el CSS en `<head>` para quitar el
  último request render-blocking. Por defecto **OFF** (deploy a prueba de
  fallos); actívalo en el entorno de build/CI.
