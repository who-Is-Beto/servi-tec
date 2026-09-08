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

    const tel = '+52556908945'
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

    // 7 campos obligatorios (nombre, teléfono, marca, equipo, zona, horario, falla).
    await expect(page.getByTestId('field-error')).toHaveCount(7)
    await expect(page.locator('#ag-telefono')).toHaveAttribute('aria-invalid', 'true')
  })

  test('form: campo de falla es obligatorio', async ({ page }) => {
    await page.goto('/')

    await page.locator('#ag-nombre').fill(NOMBRE_VALIDO)
    await page.locator('#ag-telefono').fill('55 1234 5678')
    await page.selectOption('#ag-marca', 'samsung')
    await page.selectOption('#ag-servicio', 'lavadora')
    await page.selectOption('#ag-zona', 'benito-juarez')
    await page.selectOption('#ag-horario', 'manana')
    await page.getByTestId('schedule-submit').click()

    // Sin falla, el envío se rechaza y muestra error específico.
    await expect(page.locator('#ag-falla-error')).toBeVisible()
    await expect(page.getByRole('status')).toBeHidden()
  })

  test('form: elegir "Otra" despliega el campo de descripción y lo valida', async ({ page }) => {
    await page.goto('/')

    await page.locator('#ag-nombre').fill(NOMBRE_VALIDO)
    await page.locator('#ag-telefono').fill('55 1234 5678')
    await page.selectOption('#ag-marca', 'samsung')
    await page.selectOption('#ag-servicio', 'lavadora')
    await page.selectOption('#ag-zona', 'benito-juarez')
    await page.selectOption('#ag-horario', 'manana')
    await page.selectOption('#ag-falla', 'otra')

    // Aparece el campo extra de texto.
    await expect(page.locator('#ag-falla-desc')).toBeVisible()

    // Sin descripción, se rechaza con error en ese campo.
    await page.getByTestId('schedule-submit').click()
    await expect(page.locator('#ag-falla-desc-error')).toBeVisible()
    await expect(page.getByRole('status')).toBeHidden()

    // Con descripción, se completa la cita.
    await page.locator('#ag-falla-desc').fill('Se apaga a mitad del ciclo')
    await page.getByTestId('schedule-submit').click()
    await expect(page.getByRole('status')).toContainText('¡Listo, te esperamos!')
  })

  test('form: teléfono inválido se rechaza y válido completa la cita', async ({ page }) => {
    await page.goto('/')

    await page.locator('#ag-nombre').fill(NOMBRE_VALIDO)
    await page.locator('#ag-telefono').fill('55 1234 56') // corto
    await page.selectOption('#ag-marca', 'samsung')
    await page.selectOption('#ag-servicio', 'lavadora')
    await page.selectOption('#ag-zona', 'benito-juarez')
    await page.selectOption('#ag-horario', 'manana')
    await page.selectOption('#ag-falla', 'no-enciende')
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

  test('WhatsApp: enlaza wa.me con número y mensaje, y no tapa la barra de llamada', async ({ page }) => {
    await page.goto('/')
    const wa = page.getByTestId('floating-whatsapp')
    await expect(wa).toBeVisible()

    const href = await wa.getAttribute('href')
    expect(href).toMatch(/^https:\/\/wa\.me\/52556908945\?text=/)
    expect(decodeURIComponent(href!)).toContain('Hola, me gustaría agendar una revisión')

    // En mobile debe quedar por encima (sin superponerse) de la barra de llamada.
    if (page.viewportSize()!.width < 768) {
      const waBox = await wa.boundingBox()
      const callbar = await page.getByTestId('callbar-phone').boundingBox()
      expect(waBox).not.toBeNull()
      expect(callbar).not.toBeNull()
      // El borde inferior del WhatsApp queda arriba del borde superior de la barra.
      expect(waBox!.y + waBox!.height).toBeLessThanOrEqual(callbar!.y + 1)
    }
  })

  test('hero: sirve la versión de imagen según breakpoint sin layout shift', async ({ page }) => {
    await page.goto('/')
    const picture = page.locator('figure picture')
    await expect(picture).toBeVisible()

    // El <img> del hero expone dimensions declaradas (width/height) → sin CLS.
    const dims = page.locator('figure picture img').first()
    await expect(dims).toHaveAttribute('width', '1200')
    await expect(dims).toHaveAttribute('height', '900')
    await expect(dims).toHaveAttribute('fetchpriority', 'high')
  })

  test('nuevas secciones: beneficios, marcas y métodos de pago se renderizan', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#beneficios')).toBeVisible()
    await expect(page.getByTestId('cobertura-badge')).toContainText('CDMX')
    await expect(page.locator('#pagos')).toBeVisible()
    await expect(page.getByTestId('metodo-pago')).toHaveCount(3)
    await expect(page.locator('#marcas')).toContainText('Whirlpool')

    // Copy "¿Quiénes somos?" visible, con énfasis en centro de servicio.
    await expect(page.getByTestId('quienes-somos')).toContainText('centro de servicio especializado')
  })
})