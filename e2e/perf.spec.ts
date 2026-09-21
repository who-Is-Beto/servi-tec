import { test, expect } from '@playwright/test'
import { join } from 'node:path'
import { writeFileSync, mkdirSync } from 'node:fs'

/**
 * Métricas Core Web Vitals (LCP, CLS) y peso del hero para verificar que los
 * cambios de imagen/logos no degradan el rendimiento.
 *
 * Uso:
 *   RUN_PERF=1 PERF_OUT=test-results/perf/after.json npx playwright test e2e/perf.spec.ts
 * Sale en `test.skip` si no se activa con RUN_PERF=1.
 */

test.describe('performance', () => {
  test.skip(process.env.RUN_PERF !== '1', 'usa RUN_PERF=1 para medir')

  test('LCP, CLS y peso de imagen del hero', async ({ page }, testInfo) => {
    const heroBytes: { url: string; bytes: number }[] = []
    page.on('response', (res) => {
      const url = res.url()
      if (/\/img\/[^"']+\.(avif|webp|png|jpe?g)$/.test(url)) {
        res.body().then((b) => heroBytes.push({ url: new URL(url).pathname, bytes: b.byteLength })).catch(() => {})
      }
    })

    await page.goto('/', { waitUntil: 'networkidle' })

    const vitals = await page.evaluate(
      () =>
        new Promise<{ lcp: number | null; cls: number }>((resolve) => {
          const entries: PerformanceEntryList = performance.getEntriesByType('paint')
          let lcp: number | null = null
          let cls = 0

          const ro = new PerformanceObserver(() => {})
          ro.observe({ type: 'layout-shift', buffered: true })
          for (const e of ro.takeRecords() as Array<{ hadRecentInput: boolean; value: number }>) {
            if (!e.hadRecentInput) cls += e.value
          }

          const lo = new PerformanceObserver(() => {})
          lo.observe({ type: 'largest-contentful-paint', buffered: true })
          const lcpEntries = lo.takeRecords() as Array<{ startTime: number }>
          if (lcpEntries.length) lcp = lcpEntries[lcpEntries.length - 1].startTime
          if (lcp == null && entries.length) {
            // Sin LCP aún (SVG/texto): se aproxima con el primer paint de contenido.
            const fp = entries.find((e) => e.name === 'first-contentful-paint')
            lcp = fp ? fp.startTime : null
          }
          resolve({ lcp, cls })
        }),
    )

    // Comprobación firme: sin Layout Shift significativo y hero que carga.
    expect(vitals.cls).toBeLessThan(0.12)
    expect(heroBytes.length).toBeGreaterThan(0)

    // Un archivo por proyecto para comparar los tres breakpoints: <PERF_OUT>.<project>.json
    const target = join(process.cwd(), process.env.PERF_OUT ?? 'test-results/perf/result.json')
    const outFile = target.replace(/\.json$/, `.${testInfo.project.name}.json`)
    mkdirSync(new URL('.', new URL(`file://${outFile}`)).pathname, { recursive: true })
    writeFileSync(
      outFile,
      JSON.stringify(
        {
          project: testInfo.project.name,
          viewport: page.viewportSize(),
          lcpMs: Math.round((vitals.lcp ?? -1) * 100) / 100,
          cls: Math.round(vitals.cls * 1000) / 1000,
          heroImages: heroBytes,
          totalHeroBytes: heroBytes.reduce((a, b) => a + b.bytes, 0),
          at: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
  })
})