import { useSeoMeta, useHead } from '@unhead/vue'
import { SITE_URL, SITE } from '@/data/config'

export interface PageSeoOptions {
  title: string
  description: string
  /** Ruta desde la raíz, p. ej. "/terminos-y-condiciones". */
  path: string
  /** Imagen OG absoluta o relativa en /public. */
  image?: string
  type?: 'website' | 'article'
}

const defaultImage = `${SITE_URL}/og-default.svg`

/**
 * SEO por vista: title/description, canonical, Open Graph y Twitter Card.
 * El JSON-LD se agrega aparte con `useHead` cuando hace falta (ver HomeView).
 */
export function usePageSeo({ title, description, path, image, type = 'website' }: PageSeoOptions): void {
  const url = `${SITE_URL}${path}`
  const ogImage = image ? `${SITE_URL}${image}` : defaultImage
  const fullTitle = `${title} | ${SITE.nombre}`

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: type,
    ogUrl: url,
    ogImage,
    ogSiteName: SITE.nombre,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: SITE.nombre,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}

/** Script JSON-LD tipado como objeto. */
export function useJsonLd(data: Record<string, unknown>): void {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      },
    ],
  })
}