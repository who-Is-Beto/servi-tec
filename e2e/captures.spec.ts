import { test, expect } from '@playwright/test'

/**
 * Capturas comparativas por sección en el breakpoint del proyecto activo.
 *
 * Uso (permite capturar "antes" y "después"):
 *   RUN_CAPTURES=1 CAPTURE_DIR=test-results/captures/after npx playwright test e2e/captures.spec.ts
 * El directorio se elige con CAPTURE_DIR; por defecto test-results/captures.
 * Sale en `test.skip` si no se activa con RUN_CAPTURES=1 para no ralentizar la suite.
 */
const SECTIONS = [
  'marcas',
  'beneficios',
  'servicios',
  'cobertura',
  'agendar',
  'pagos',
  'testimonios',
  'faq',
]

const OUT = process.env.CAPTURE_DIR ?? 'test-results/captures'

test.describe('capturas comparativas', () => {
  test.skip(process.env.RUN_CAPTURES !== '1', 'usa RUN_CAPTURES=1 para generar capturas')

  test('secciones alineadas arriba en el breakpoint actual', async ({ page }, testInfo) => {
    await page.goto('/')
    await page.addStyleTag({
      content:
        '* { animation: none !important; transition: none !important; } ' +
        'html { scroll-behavior: auto !important; } ' +
        'div.z-callbar { display: none !important; }',
    })

    for (const id of SECTIONS) {
      const el = page.locator(`#${id}`)
      await expect(el).toBeAttached()
      await el.scrollIntoViewIfNeeded()
      await el.screenshot({ path: `${OUT}/${testInfo.project.name}/${id}.png` })
    }
  })
})