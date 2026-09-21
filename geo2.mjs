import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto('http://127.0.0.1:4173/')
await p.addStyleTag({ content: '*{animation:none!important;transition:none!important}html{scroll-behavior:auto!important}' })
await p.locator('#cobertura').scrollIntoViewIfNeeded()
await p.waitForTimeout(200)
await p.selectOption('[data-testid="zona-select"]', 'benito-juarez')
await p.waitForTimeout(1200)
for (const id of ['mapa-zonas','map-panel','zona-select']) {
  const m = await p.getByTestId(id).evaluate((el) => {
    const r = el.getBoundingClientRect()
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), reveal: el.classList.contains('is-revealed') }
  })
  console.log(id, JSON.stringify(m))
}
await b.close()
