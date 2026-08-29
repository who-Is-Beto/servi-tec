import { chromium } from '@playwright/test'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 920, height: 660 } })
await p.goto('file:///Users/robertocortesmonroy/Documents/tecservi/scripts/geo/preview.svg')
const diag = await p.evaluate(() => {
  const texts = [...document.querySelectorAll('text')].map((t) => {
    const b = t.getBBox()
    return { name: t.textContent?.trim(), x: b.x, y: b.y, w: b.width, h: b.height, cx: b.x + b.width / 2, cy: b.y + b.height / 2 }
  }).filter((t) => t.name)
  const paths = [...document.querySelectorAll('path')]
  const out = texts.filter((t) => t.x < 0 || t.y < 0 || t.x + t.w > 920 || t.y + t.h > 660)
  const over = []
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i], c = texts[j]
    if (Math.abs(a.cx - c.cx) * 2 < a.w + c.w && Math.abs(a.cy - c.cy) * 2 < a.h + c.h) over.push([a.name, c.name])
  }
  return { labels: texts.length, paths: paths.length, offCanvas: out, overlaps: over }
})
console.log(JSON.stringify(diag, null, 2))
await b.close()
