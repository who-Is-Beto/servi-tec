import { test, expect } from '@playwright/test'

/**
 * SEO: usa `<title>`, meta description, Open Graph, canonical y schema.org
 * JSON-LD desde @unhead/vue; robots.txt y sitemap.xml generados en el build.
 */
test.describe('SEO', () => {
  test('head: metadata principal y canonical', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Reparación de Línea Blanca a Domicilio en CDMX/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Reparación de lavadoras, refrigeradores/,
    )
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/tecservi\.mx/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Reparación de Línea Blanca/)
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    await expect(page.locator('html')).toHaveAttribute('lang', /^es/)
  })

  test('schema.org: JSON-LD de negocio local con área servida', async ({ page }) => {
    await page.goto('/')

    const ldc = await page.evaluate(() => {
      const scripts = [...document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')]
      return scripts.map((s) => JSON.parse(s.textContent ?? 'null'))
    })

    const negocio = ldc.find((entry) => entry?.['@type'] === 'HomeAndConstructionBusiness')
    expect(negocio).toBeDefined()
    expect(negocio.name).toContain('TecServi')
    expect(negocio.areaServed).toBeInstanceOf(Array)
    expect(negocio.areaServed.length).toBeGreaterThanOrEqual(33) // 1 región + 32 zonas
    expect(negocio.openingHoursSpecification.length).toBe(2)
  })

  test('robots.txt y sitemap.xml accesibles', async ({ request }) => {
    const robots = await request.get('/robots.txt')
    expect(robots.ok()).toBeTruthy()
    expect((await robots.text())).toContain('Sitemap:')

    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.ok()).toBeTruthy()
    const xml = await sitemap.text()
    expect(xml).toContain('https://tecservi.mx/terminos-y-condiciones')
    expect(xml).toContain('https://tecservi.mx/aviso-de-privacidad')
  })

  test('páginas legales existentes y con meta propia', async ({ page }) => {
    await page.goto('/terminos-y-condiciones')
    await expect(page.locator('h1')).toHaveText(/Términos y Condiciones/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/terminos-y-condiciones$/)

    await page.goto('/aviso-de-privacidad')
    await expect(page.locator('h1')).toHaveText(/Aviso de Privacidad/)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/aviso-de-privacidad$/)
  })
})