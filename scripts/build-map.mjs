/**
 * Genera src/data/zonas-mapa.ts (geometría SVG real de la ZMCM) a partir de
 * los GeoJSON oficiales de INEGI/CONABIO 2022 que viven en scripts/geo/.
 *
 *  - scripts/geo/cdmx-alcaldias.json  (16 alcaldías)
 *  - scripts/geo/edomex-municipios.json (125 municipios)
 *
 * Salida: paths ya proyectados al viewBox del mapa (0 0 920 660), con
 * simplificación de Douglas-Peucker para mantener el bundle pequeño.
 *
 * Uso: node scripts/build-map.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'

// ── Fuentes de geometría ────────────────────────────────────────────────
const CDMX = JSON.parse(readFileSync('scripts/geo/cdmx-alcaldias.json', 'utf8'))
const EDOMEX = JSON.parse(readFileSync('scripts/geo/edomex-municipios.json', 'utf8'))

// Claves oficiales (INEGI, Marco Geoestadístico) de las zonas cubiertas.
const CDMX_CVE = {
  azcapotzalco: '002',
  coyoacan: '003',
  cuajimalpa: '004',
  'gustavo-a-madero': '005',
  iztacalco: '006',
  iztapalapa: '007',
  'magdalena-contreras': '008',
  'milpa-alta': '009',
  'alvaro-obregon': '010',
  tlahuac: '011',
  tlalpan: '012',
  xochimilco: '013',
  'benito-juarez': '014',
  cuauhtemoc: '015',
  'miguel-hidalgo': '016',
  'venustiano-carranza': '017',
}
const EDOMEX_CVE = {
  'cuautitlan-izcalli': '121',
  'valle-de-chalco': '122',
  'los-reyes-la-paz': '070',
  cuautitlan: '024',
  tecamac: '081',
  tlalnepantla: '104',
  tultitlan: '109',
  atizapan: '013',
  naucalpan: '057',
  nezahualcoyotl: '058',
  huixquilucan: '037',
  ixtapaluca: '039',
  ecatepec: '033',
  coacalco: '020',
  'melchor-ocampo': '053',
  chalco: '025',
}

// ── Constantes del lienzo ───────────────────────────────────────────────
const W = 920
const H = 660
const PAD = 34

// ── Utilidades ──────────────────────────────────────────────────────────
const feats = (fc) => fc.features

function anillos(geom) {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
  return polys
}

function bboxFeature(feat) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const pol of anillos(feat.geometry)) {
    for (const ring of pol) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  return { minX, minY, maxX, maxY }
}

function centroide(feat) {
  const b = bboxFeature(feat)
  return { lon: (b.minX + b.maxX) / 2, lat: (b.minY + b.maxY) / 2 }
}

function distToSegment(p, a, b) {
  const abx = b.x - a.x, aby = b.y - a.y
  const len2 = abx * abx + aby * aby
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2))
  const dx = p.x - (a.x + abx * t), dy = p.y - (a.y + aby * t)
  return Math.hypot(dx, dy)
}

function simplificar(ring, eps) {
  if (ring.length < 3) return ring
  const first = ring[0]
  const last = ring[ring.length - 1]
  let maxD = 0, idx = 0
  for (let i = 1; i < ring.length - 1; i++) {
    const d = distToSegment(ring[i], first, last)
    if (d > maxD) { maxD = d; idx = i }
  }
  if (maxD > eps) {
    const izq = simplificar(ring.slice(0, idx + 1), eps)
    const der = simplificar(ring.slice(idx), eps)
    return izq.slice(0, -1).concat(der)
  }
  return [first, last]
}

function pathDeRings(rings) {
  return rings
    .map((ring) => {
      const d = ring.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
      return d
    })
    .join(' ')
}

// ── Proyección (equirectangular centrada en la ZMCM) ───────────────────
function buildProyeccion(featsIncluidas) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const f of featsIncluidas) {
    const b = bboxFeature(f)
    minX = Math.min(minX, b.minX)
    minY = Math.min(minY, b.minY)
    maxX = Math.max(maxX, b.maxX)
    maxY = Math.max(maxY, b.maxY)
  }
  const lat0 = (minY + maxY) / 2
  const cosFactor = Math.cos((lat0 * Math.PI) / 180)
  const rawW = (maxX - minX) * cosFactor
  const rawH = maxY - minY
  const scale = Math.min((W - 2 * PAD) / rawW, (H - 2 * PAD) / rawH)
  const contW = rawW * scale
  const contH = rawH * scale
  const offX = PAD + (W - 2 * PAD - contW) / 2
  const offY = PAD + (H - 2 * PAD - contH) / 2
  const proy = (lon, lat) => ({
    x: offX + (lon - minX) * cosFactor * scale,
    y: offY + (maxY - lat) * scale,
  })
  return { proy, scale, minX, maxX, minY, maxY, lat0 }
}

// ── Generación de una zona ──────────────────────────────────────────────
function zonaDesde(feat, id, nombre, estado, proy, eps) {
  const rings = []
  for (const pol of anillos(feat.geometry)) {
    for (const ringRaw of pol) {
      const pts = []
      for (const [lon, lat] of ringRaw) {
        const p = proy(lon, lat)
        pts.push({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 })
      }
      const sinColas = pts.filter((p, i) => i === 0 || p.x !== pts[i - 1].x || p.y !== pts[i - 1].y)
      if (sinColas.length > 0 && sinColas[0] === sinColas[sinColas.length - 1]) sinColas.pop()
      if (sinColas.length < 3) continue
      rings.push(simplificar(sinColas, eps))
    }
  }
  const b = bboxFeature(feat)
  const sw = proy(b.minX, b.minY)
  const ne = proy(b.maxX, b.maxY)
  const anch = Math.abs(ne.x - sw.x)
  const alt = Math.abs(ne.y - sw.y)
  const bboxCentro = proy((b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2)

  let labelSize = 1
  if (anch < 34 || alt < 21 || anch * alt < 1500) labelSize = 0
  else if (anch * alt >= 5200) labelSize = 2

  return {
    id,
    nombre,
    estado,
    path: pathDeRings(rings),
    ...(labelSize > 0 ? { label: { x: Math.round(bboxCentro.x * 10) / 10, y: Math.round(bboxCentro.y * 10) / 10 }, labelSize } : { labelSize }),
  }
}

// ── Selección de municipios de contexto del EDOMEX ──────────────────────
function contextoEdomex() {
  const cubiertos = new Set(Object.values(EDOMEX_CVE))
  const cdB = bboxFeature(CDMX.features[0])
  for (const f of CDMX.features) {
    const b = bboxFeature(f)
    cdB.minX = Math.min(cdB.minX, b.minX)
    cdB.minY = Math.min(cdB.minY, b.minY)
    cdB.maxX = Math.max(cdB.maxX, b.maxX)
    cdB.maxY = Math.max(cdB.maxY, b.maxY)
  }
  const centCubiertos = []
  for (const f of EDOMEX.features) {
    if (cubiertos.has(f.properties.CVE_MUN)) centCubiertos.push(centroide(f))
  }
  const dentroCaja = (c) =>
    c.lon >= cdB.minX - 0.7 && c.lon <= cdB.maxX + 0.7 &&
    c.lat >= cdB.minY - 0.6 && c.lat <= cdB.maxY + 0.6
  return EDOMEX.features.filter((f) => {
    if (cubiertos.has(f.properties.CVE_MUN)) return false
    const c = centroide(f)
    if (!dentroCaja(c)) return false
    // Vecino del cinturón: cerca del centroide de algún municipio cubierto.
    return centCubiertos.some((cc) => Math.abs(cc.lon - c.lon) < 0.18 && Math.abs(cc.lat - c.lat) < 0.16)
  })
}

// ── Ejecución ───────────────────────────────────────────────────────────
const cdmxFeatures = feats(CDMX)
const edomexCubiertos = EDOMEX.features.filter((f) => Object.values(EDOMEX_CVE).includes(f.properties.CVE_MUN))
const edomexContexto = contextoEdomex()

const incluidas = [...cdmxFeatures, ...edomexCubiertos, ...edomexContexto]
const { proy } = buildProyeccion(incluidas)

const EPS = 0.6 // px de tolerancia de simplificación

const cdmxMapa = cdmxFeatures.map((f) => {
  const id = Object.keys(CDMX_CVE).find((k) => CDMX_CVE[k] === f.properties.CVE_MUN)
  return zonaDesde(f, id, f.properties.NOMGEO, 'CDMX', proy, EPS)
})

const edomexMapa = edomexCubiertos.map((f) => {
  const id = Object.keys(EDOMEX_CVE).find((k) => EDOMEX_CVE[k] === f.properties.CVE_MUN)
  return zonaDesde(f, id, f.properties.NOMGEO, 'EDOMEX', proy, EPS)
})

const edomexContextoMapa = edomexContexto.map((f) =>
  zonaDesde(f, f.properties.CVE_MUN, f.properties.NOMGEO, 'EDOMEX', proy, EPS),
)

const centro = proy(-99.1332, 19.4326)

// ── Etiquetas sin colisión (greedy, de mayor a menor área) ──────────────
const FONT_FACTOR = 0.62 // ancho aprox. del texto ≈ nº chars × tamaño × factor
function cajaAprox(z) {
  if (!z.label) return null
  const size = z.labelSize === 2 ? 12 : 9
  const w = Math.max(z.nombre.length * size * FONT_FACTOR, size)
  const h = size * 1.3
  return { x: z.label.x - w / 2, y: z.label.y - h / 2, w, h }
}
function chocan(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}
function recortarEtiquetas(...grupos) {
  const orden = grupos.flat().sort((a, b) => {
    const aa = zonaDesdeArea(a)
    const bb = zonaDesdeArea(b)
    return bb - aa
  })
  const tomados = []
  for (const z of orden) {
    const box = cajaAprox(z)
    if (!box) continue
    if (tomados.some((b) => chocan(box, b))) {
      z.labelSize = 0
      z.label = undefined
      continue
    }
    tomados.push(box)
  }
}
function zonaDesdeArea(z) {
  const n = z.nombre.length
  const size = z.labelSize === 2 ? 12 : 9
  return n * size
}
recortarEtiquetas(cdmxMapa, edomexMapa)

const info = {
  zonsCdmx: cdmxMapa.length,
  edomexCubiertos: edomexMapa.length,
  edomexContexto: edomexContextoMapa.length,
}
console.log('Zonas CDMX:', info.zonsCdmx)
console.log('EDOMEX cubiertos:', info.edomexCubiertos)
console.log('EDOMEX contexto:', info.edomexContexto)
console.log('Cerrar mapa:', JSON.stringify(centro))

const emit = `// @ts-nocheck
/* AUTO-GENERADO por scripts/build-map.mjs — no editar a mano.
 * Fuente: GeoJSON oficiales de INEGI/CONABIO (scripts/geo/). */
export interface ZonaMapa {
  id: string
  nombre: string
  estado: 'CDMX' | 'EDOMEX'
  path: string
  label?: { x: number; y: number }
  labelSize: 0 | 1 | 2
}
export interface MapaMeta {
  viewBox: [number, number, number, number]
  centro: { x: number; y: number }
}
export const CDMX_MAPA: ZonaMapa[] = ${JSON.stringify(cdmxMapa)}
export const EDOMEX_MAPA: ZonaMapa[] = ${JSON.stringify(edomexMapa)}
export const EDOMEX_CONTEXTO: ZonaMapa[] = ${JSON.stringify(edomexContextoMapa)}
export const MAPA_META: MapaMeta = { viewBox: [0, 0, ${W}, ${H}], centro: ${JSON.stringify(centro)} }
`

writeFileSync('src/data/zonas-mapa.ts', emit)
console.log('~ src/data/zonas-mapa.ts generado')

// Preview SVG para inspección visual rápida.
const zonas = (fs, fill, stroke, showLabel) =>
  fs
    .map(
      (z) =>
        `<path d="${z.path}" fill="${fill}" stroke="${stroke}" stroke-width="0.8"/>` +
        (z.label && showLabel ? `<text x="${z.label.x}" y="${z.label.y + 3}" font-size="${z.labelSize === 2 ? 12 : 9}" text-anchor="middle" font-family="system-ui" fill="#1e293b">${z.nombre}</text>` : ''),
    )
    .join('')

const preview = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="#f1f5f9"/>
${zonas(edomexContextoMapa, '#e2e8f0', '#cbd5e1', false)}
${zonas(edomexMapa, '#99f6e4', '#0d9488', true)}
${zonas(cdmxMapa, '#bfdbfe', '#2563eb', true)}
<circle cx="${centro.x}" cy="${centro.y}" r="6" fill="#e11d48" stroke="#fff" stroke-width="2"/>
<text x="${centro.x}" y="${centro.y - 10}" font-size="11" text-anchor="middle" font-family="system-ui" font-weight="700" fill="#be123c">Centro</text>
</svg>`
writeFileSync('scripts/geo/preview.svg', preview)
console.log('~ scripts/geo/preview.svg (inspéctalo)')