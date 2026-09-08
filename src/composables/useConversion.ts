import { analyticsIds } from '@/config/tracking'

/**
 * Eventos de conversión compatibles con Google Ads (gtag) y Meta Ads
 * (pixel). Todos son no-op si no hay IDs configurados.
 *
 * Al conectar tu cuenta de Google Ads, ajusta `VITE_GOOGLE_ADS_CONVERSION_ID`
 * (formato AW-000000000) y, si tu acción de conversión usa un label, pásalo
 * como segundo elemento del array `send_to`.
 */

function gtag(...args: unknown[]) {
  window.gtag?.(...args)
}

function fbq(...args: unknown[]) {
  window.fbq?.(...args)
}

export function useConversion() {
  /** Click en "Llamar ahora" (Click-to-Call). */
  function trackCall(): void {
    if (analyticsIds.ga4) {
      gtag('event', 'generate_lead', {
        currency: 'MXN',
        value: 1,
        event_category: 'click_to_call',
        event_label: 'hero_phone',
      })
    }
    if (analyticsIds.ads) {
      gtag('event', 'conversion', { send_to: analyticsIds.ads })
    }
    if (analyticsIds.meta) {
      fbq('track', 'Contact')
    }
  }

  /** Envío exitoso del formulario "Agendar visita". */
  function trackSchedule(
    source: 'form_section' | 'map_zone' = 'form_section',
    falla = '',
  ): void {
    if (analyticsIds.ga4) {
      gtag('event', 'generate_lead', {
        currency: 'MXN',
        value: 1,
        event_category: 'scheduling',
        event_label: source,
        // Param personalizado para segmentar campañas por tipo de falla.
        schedule_falla: falla,
      })
    }
    if (analyticsIds.ads) {
      gtag('event', 'conversion', { send_to: analyticsIds.ads })
    }
    if (analyticsIds.meta) {
      fbq('track', 'Lead', {
        event_source_url: window.location.href,
        schedule_falla: falla || undefined,
      })
    }
  }

  /** Click en el botón flotante de WhatsApp (Click-to-WhatsApp). */
  function trackWhatsApp(): void {
    if (analyticsIds.ga4) {
      gtag('event', 'generate_lead', {
        currency: 'MXN',
        value: 1,
        event_category: 'click_to_whatsapp',
        event_label: 'floating_whatsapp',
      })
    }
    if (analyticsIds.ads) {
      gtag('event', 'conversion', { send_to: analyticsIds.ads })
    }
    if (analyticsIds.meta) {
      fbq('track', 'Contact')
    }
  }

  return { trackCall, trackSchedule, trackWhatsApp }
}