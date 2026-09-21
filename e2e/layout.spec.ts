import { test, expect } from '@playwright/test'

/**
 * Ajustes de layout del cliente (iteración "fix/client-comments"):
 * 1) Padding unificado por token en todas las secciones.
 * 2) Orden de secciones: CTA de agendado ANTES del mapa de cobertura, y el
 *    selector de zona sigue escroleando hasta el mapa.
 * 3) Logos Visa/Mastercard/American Express en métodos de pago.
 * 4) Marcas atendidas: Daewoo y Winnia presentes; Mabe y Whirlpool ausentes.
 *
 * Los tres proyectos (mobile/tablet/desktop) corren el mismo conjunto, así
 * que la consistencia de padding se verifica en los tres breakpoints.
 */

const SECCIONES = [
  'marcas',
  'beneficios',
  'servicios',
  'cobertura',
  'agendar',
  'pagos',
  'testimonios',
  'faq',
]

async function sinAnimaciones(page: import('@playwright/test').Page) {
  await page.addStyleTag({
    content:
      '* { animation: none !important; transition: none !important; } ' +
      'html { scroll-behavior: auto !important; } ' +
      'div.z-callbar { display: none !important; }',
  })
}

test.describe('Layout: padding unificado', () => {
  test('todas las secciones comparten el mismo padding por breakpoint', async ({ page }) => {
    await page.goto('/')
    await sinAnimaciones(page)

    // El padding NO depende del scroll, así que se lee del estilo calculado.
    const paddings = await page.evaluate((ids) => {
      const out: Record<string, { pt: number; pr: number; pb: number; pl: number }> = {}
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const s = getComputedStyle(el)
        out[id] = {
          pt: parseFloat(s.paddingTop),
          pr: parseFloat(s.paddingRight),
          pb: parseFloat(s.paddingBottom),
          pl: parseFloat(s.paddingLeft),
        }
      }
      return out
    }, SECCIONES)

    const valores = Object.values(paddings)
    expect(valores.length).toBe(SECCIONES.length)
    const tol = 1

    for (const v of valores) expect(v.pt).toBeGreaterThan(0)
    for (const v of valores) expect(v.pb).toBeGreaterThan(0)

    const ref = valores[0]
    for (const v of valores.slice(1)) {
      expect(Math.abs(v.pt - ref.pt)).toBeLessThanOrEqual(tol)
      expect(Math.abs(v.pb - ref.pb)).toBeLessThanOrEqual(tol)
      expect(Math.abs(v.pr - ref.pr)).toBeLessThanOrEqual(tol)
      expect(Math.abs(v.pl - ref.pl)).toBeLessThanOrEqual(tol)
    }
  })
})

test.describe('Layout: orden de secciones', () => {
  test('CTA de agendado aparece antes que el mapa de cobertura', async ({ page }) => {
    await page.goto('/')
    await sinAnimaciones(page)

    const idx = await page.evaluate(() => {
      const secciones = [...document.querySelectorAll('section[id]')]
      const buscar = (id: string) => secciones.findIndex((s) => s.id === id)
      return { agendar: buscar('agendar'), cobertura: buscar('cobertura') }
    })

    expect(idx.agendar).toBeGreaterThanOrEqual(0)
    expect(idx.cobertura).toBeGreaterThanOrEqual(0)
    expect(idx.agendar).toBeLessThan(idx.cobertura)
  })

  test('el selector de zona sigue haciendo scroll hasta el mapa con el nuevo orden', async ({ page }) => {
    await page.goto('/')
    await sinAnimaciones(page)

    await page.selectOption('[data-testid="zona-select"]', 'benito-juarez')
    await expect(page.getByTestId('zona-confirm')).toContainText('Benito Juárez')
    await expect(page.getByTestId('map-panel')).toContainText('Benito Juárez')

    // El scroll del selector apunta al MAPA dentro de #cobertura y este entra al
    // viewport. Regresión que se protege aquí: el reorden no debe romper el
    // target, y el router no debe resquiciar el scroll cuando ?zona= cambia.
    const vh = page.viewportSize()!.height
    await expect
      .poll(async () => page.getByTestId('mapa-zonas').evaluate((el) => el.getBoundingClientRect().y), {
        timeout: 10_000,
      })
      .toBeLessThan(vh)
  })
})

test.describe('Layout: métodos de pago', () => {
  test('Visa, Mastercard y American Express se renderizan con alt descriptivo', async ({ page }) => {
    await page.goto('/')
    await page.locator('#pagos').scrollIntoViewIfNeeded()

    await expect(page.getByAltText('Pago con tarjeta Visa')).toBeVisible()
    await expect(page.getByAltText('Pago con tarjeta Mastercard')).toBeVisible()
    await expect(page.getByAltText('Pago con tarjeta American Express')).toBeVisible()

    // Los tres logos viven dentro de la tarjeta de "Tarjeta de crédito / débito".
    const tarjeta = page.locator('#pagos [data-testid="metodo-pago"]', {
      hasText: 'Tarjeta de crédito / débito',
    })
    await expect(tarjeta.locator('img')).toHaveCount(3)
  })
})

test.describe('Layout: marcas atendidas', () => {
  test('Daewoo y Winnia aparecen; Mabe y Whirlpool ya no', async ({ page }) => {
    await page.goto('/')
    const marcas = page.locator('#marcas')

    // Nombres expuestos a lectores de pantalla (la cinta es decorativa).
    const nombres = marcas.locator('ul.sr-only')
    await expect(nombres).toContainText('Daewoo')
    await expect(nombres).toContainText('Winnia')
    await expect(nombres).not.toContainText('Mabe')
    await expect(nombres).not.toContainText('Whirlpool')

    // Los logos reales de Daewoo (SVG) y Winnia (PNG/WebP) se renderizan.
    const srcs = await marcas.locator('img').evaluateAll((els) =>
      els.map((e) => e.getAttribute('src') ?? ''),
    )
    const todas = srcs.join(' ')
    expect(todas).toContain('daewoo-logo')
    expect(todas).toContain('winnia')
  })
})