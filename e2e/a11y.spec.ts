import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accesibilidad básica con axe-core + comportamiento de <details> (FAQ) y
 * capturas de pantalla por viewport.
 */
test.describe('Accesibilidad y responsive', () => {
  test('sin violaciones serias/críticas de axe en el home', async ({ page }) => {
    await page.goto('/')

    // Sin transiciones: las animaciones de reveal pasan al instante al estado
    // final (opacity 1), sin estados intermedios que axe pudiera medir.
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; } html { scroll-behavior: auto !important; }' })

    // Recorre la página para disparar los reveals y analizar todo el contenido.
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight)
      await new Promise((r) => setTimeout(r, 100))
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 100))
    })

    const results = await new AxeBuilder({ page }).analyze()
    const graves = results.violations.filter((v) =>
      (v.impact === 'critical' || v.impact === 'serious'),
    )
    // Las instancias "serious" de color-contrast sobre el fondo brand-500 pueden
    // fallar si el cliente cambia tokens; se audita pero se reporta en consola.
    expect(graves, JSON.stringify(results.violations, null, 2)).toEqual([])
  })

  test('FAQ usa <details> nativo y abre el primer panel', async ({ page }) => {
    await page.goto('/')
    const primer = page.locator('#faq details').first()
    await primer.locator('summary').click()
    await expect(primer).toHaveAttribute('open', '')
  })

  test('capturas por viewport para revisión visual', async ({ page }) => {
    await page.goto('/#cobertura', { waitUntil: 'networkidle' })

    // Dispara los reveals en estado final (sin transiciones a medio capturar).
    await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; } html { scroll-behavior: auto !important; }' })
    await page.evaluate(async () => {
      const altura = document.body.scrollHeight
      window.scrollTo(0, altura)
      await new Promise((r) => setTimeout(r, 100))
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 100))
    })

    const width = page.viewportSize()!.width
    await page.screenshot({
      path: `test-results/screenshots/${width}-home.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width, height: Math.min(page.viewportSize()!.height, 1000) },
    })
  })
})