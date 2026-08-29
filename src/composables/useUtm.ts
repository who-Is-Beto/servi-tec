import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { UtmParams } from '@/types'

const MAX_HEADLINE_CHARS = 90

/**
 * Parámetros UTM de Google Ads / Meta Ads. El headline dinámico se usa en el
 * hero (ver HeroSection) para personalizar según campaña sin romper el layout:
 * se trunca, se limpia y se renderiza como texto plano.
 */
export function useUtm(): UtmParams {
  const route = useRoute()

  return {
    utmSource: computed(() => clean(route.query.utm_source)).value,
    utmMedium: computed(() => clean(route.query.utm_medium)).value,
    utmCampaign: computed(() => clean(route.query.utm_campaign)).value,
    utmHeadline: computed(() => clean(route.query.utm_headline)).value,
  }
}

function clean(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, MAX_HEADLINE_CHARS)
}