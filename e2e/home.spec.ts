import { test, expect } from '@playwright/test'

/**
 * Flujos principales de la landing:
 * - Navegación y secciones.
 * - Click-to-call (tel:) en header, hero y barra móvil.
 * - Mapa interactivo (click y teclado) → panel + query ?zona= + sync en form.
 * - Validación y envío del formulario (estado de éxito).
 * - Barra de llamada móvil y menú hamburguesa.
 *
 * Las animaciones de reveal se desactivan en los tests de mapa: evitan que el
 * contenedor se desplace (-32px) mientras Playwright calcula el punto de click.
 */

const NOMBRE_VALIDO = 'Mariana Rojas'

async function sinAnimaciones(page: import('@playwright/test').Page) {
  await page.addStyleTag({
    content:
      '* { animation: none !important; transition: none !important; } ' +
      'html { scroll-behavior: auto !important; } ' +
      'div.z-callbar { display: none !important; }',
  })
  await page.locator('#cobertura').scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
}

test.describe('Landing TecServi', () => {
  test('carga, muestra secciones y teléfono clickeable', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    for (const seccion of ['marcas', 'servicios', 'cobertura', 'agendar', 'testimonios', 'faq']) {
      await expect(page.locator(`#${seccion}`)).toBeVisible()
    }

    const tel = '+525500000000'
    await expect(page.getByTestId('hero-phone')).toHaveAttribute('href', `tel:${tel}`)
    if (page.viewportSize()!.width >= 768) {
      await expect(page.getByTestId('header-phone')).toHaveAttribute('href', `tel:${tel}`)
    }
  })

  test('mapa: seleccionar zona por click la muestra y sincroniza URL y form', async ({ page }) => {
    await page.goto('/')
    await sinAnimaciones(page)
    const zonaSVG = page.getByRole('button', { name: /^Benito Juárez, Ciudad de México/ })
    await zonaSVG.click()

    await expect(page.getByTestId('map-panel')).toContainText('Benito Juárez')
    await expect(page).toHaveURL(/[\?&]zona=benito-juarez(\&|$)/)
    await expect(page.getByTestId('chip-benito-juarez')).toHaveClass(/bg-brand-600/)

    await page.getByTestId('map-schedule-cta').click()
    await expect(page).toHaveURL(/#agendar/)
    await expect(page.locator('#ag-zona')).toHaveValue('benito-juarez')
  })

  test('mapa: las zonas responden con teclado (accesibilidad)', async ({ page }) => {
    await page.goto('/')
    await sinAnimaciones(page)
    const zonaSVG = page.getByRole('button', { name: /^Tlalpan, Ciudad de México/ })
    await zonaSVG.focus()
    await page.keyboard.press('Enter')
    await expect(page.getByTestId('map-panel')).toContainText('Tlalpan')
    await expect(page).toHaveURL(/[\?&]zona=tlalpan(\&|$)/)
  })

  test('form: valida campos vacíos y muestra errores', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('schedule-submit').click()

    // 6 campos obligatorios (nombre, teléfono, marca, equipo, zona, horario).
    await expect(page.getByTestId('field-error')).toHaveCount(6)
    await expect(page.locator('#ag-telefono')).toHaveAttribute('aria-invalid', 'true')
  })

  test('form: teléfono inválido se rechaza y válido completa la cita', async ({ page }) => {
    await page.goto('/')

    await page.locator('#ag-nombre').fill(NOMBRE_VALIDO)
    await page.locator('#ag-telefono').fill('55 1234 56') // corto
    await page.selectOption('#ag-marca', 'samsung')
    await page.selectOption('#ag-servicio', 'lavadora')
    await page.selectOption('#ag-zona', 'benito-juarez')
    await page.selectOption('#ag-horario', 'manana')
    await page.getByTestId('schedule-submit').click()

    await expect(page.locator('#ag-telefono-error')).toBeVisible()

    await page.locator('#ag-telefono').fill('55 1234 5678')
    await page.getByTestId('schedule-submit').click()

    await expect(page.getByRole('status')).toContainText('¡Listo, te esperamos!')
    await expect(page.getByRole('status')).toContainText(NOMBRE_VALIDO)
  })

  test('barra de llamada móvil y menú hamburguesa según breakpoints', async ({ page }) => {
    await page.goto('/')
    const ancho = page.viewportSize()!.width
    const barraVisible = ancho < 768
    const menuVisible = ancho < 1024

    if (barraVisible) {
      await expect(page.getByTestId('callbar-phone')).toBeVisible()
    } else {
      await expect(page.getByTestId('callbar-phone')).toBeHidden()
    }

    if (menuVisible) {
      await expect(page.getByTestId('menu-toggle')).toBeVisible()
      await page.getByTestId('menu-toggle').click()
      await expect(page.locator('#menu-movil')).toBeVisible()
      await expect(page.getByTestId('mobile-phone')).toBeVisible()
    } else {
      await expect(page.getByTestId('menu-toggle')).toBeHidden()
    }
  })
})