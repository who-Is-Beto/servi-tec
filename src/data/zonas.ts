import type { Estado, TipoZona, Zona } from '@/types'

/**
 * Cobertura de la Zona Metropolitana del Valle de México.
 *
 * IMPORTANTE: esta es una LISTA PROVISIONAL. El cliente debe confirmar la
 * lista definitiva de zonas que atiende. Cuando confirme, cambia cada
 * `confirmada` a `true` (o elimina este campo) y ajusta `tiempoEstimado`.
 *
 * El mapa es ESQUEMÁTICO (no a escala). Cada zona es una pieza dibujada con
 * una sola subruta SVG. Para afinar geometría, edita las coordenadas sin
 * tocar la estructura, y corre `npm run test:e2e` para verificar que siguen
 * respondiendo (test del mapa).
 */

/** Convierte un rectángulo en una subruta cerrada. */
function rect(x: number, y: number, w: number, h: number): string {
  return `M ${x} ${y} H ${x + w} V ${y + h} H ${x} Z`
}

/** Útil para los rótulos: centro de la pieza. */
function center(x: number, y: number, w: number, h: number) {
  return { x: x + w / 2, y: y + h / 2 }
}

type Spec = Pick<Zona, 'id' | 'nombre' | 'estado' | 'tipo' | 'tiempoEstimado'> & {
  x: number
  y: number
  w: number
  h: number
  labelSize?: 0 | 1 | 2
}

class ZonasBuilder {
  private zonas: Zona[] = []

  edomex(spec: Omit<Spec, 'estado' | 'tipo'>): this {
    this.push(spec, 'EDOMEX', 'municipio')
    return this
  }

  cdmx(spec: Omit<Spec, 'estado' | 'tipo'>): this {
    this.push(spec, 'CDMX', 'alcaldia')
    return this
  }

  private push(
    { labelSize = 1, ...spec }: Omit<Spec, 'estado' | 'tipo'>,
    estado: Estado,
    tipo: TipoZona,
  ): void {
    const { x, y, w, h } = spec
    this.zonas.push({
      id: spec.id,
      nombre: spec.nombre,
      estado,
      tipo,
      tiempoEstimado: spec.tiempoEstimado,
      confirmada: false,
      svg: {
        path: rect(x, y, w, h),
        ...(labelSize > 0 ? { label: center(x, y, w, h), labelSize } : {}),
      },
    })
  }

  build(): Zona[] {
    return this.zonas
  }
}

export const ZONAS: Zona[] = new ZonasBuilder()
  // ── Estado de México · Noreste ───────────────────────────────────────
  .edomex({ id: 'cuautitlan', nombre: 'Cuautitlán', x: 180, y: 50, w: 110, h: 70, tiempoEstimado: '35-55 min', labelSize: 2 })
  .edomex({ id: 'tecamac', nombre: 'Tecámac', x: 450, y: 50, w: 180, h: 70, tiempoEstimado: '50-90 min', labelSize: 2 })
  .edomex({ id: 'cuautitlan-izcalli', nombre: 'Cuautitlán Izcalli', x: 180, y: 120, w: 110, h: 70, tiempoEstimado: '35-55 min', labelSize: 2 })
  .edomex({ id: 'tultitlan', nombre: 'Tultitlán', x: 290, y: 120, w: 70, h: 70, tiempoEstimado: '35-55 min', labelSize: 1 })
  .edomex({ id: 'coacalco', nombre: 'Coacalco', x: 360, y: 120, w: 90, h: 70, tiempoEstimado: '35-55 min', labelSize: 1 })
  .edomex({ id: 'melchor-ocampo', nombre: 'Melchor Ocampo', x: 450, y: 120, w: 90, h: 70, tiempoEstimado: '50-90 min', labelSize: 1 })
  .edomex({ id: 'atizapan', nombre: 'Atizapán de Zaragoza', x: 180, y: 190, w: 90, h: 70, tiempoEstimado: '35-55 min', labelSize: 1 })
  .edomex({ id: 'ecatepec', nombre: 'Ecatepec de Morelos', x: 360, y: 190, w: 270, h: 70, tiempoEstimado: '45-90 min', labelSize: 2 })
  .edomex({ id: 'tlalnepantla', nombre: 'Tlalnepantla de Baz', x: 180, y: 260, w: 90, h: 70, tiempoEstimado: '30-50 min', labelSize: 2 })
  .edomex({ id: 'naucalpan', nombre: 'Naucalpan de Juárez', x: 180, y: 330, w: 90, h: 70, tiempoEstimado: '30-50 min', labelSize: 1 })
  .edomex({ id: 'huixquilucan', nombre: 'Huixquilucan', x: 180, y: 470, w: 90, h: 70, tiempoEstimado: '30-50 min', labelSize: 1 })

  // ── Estado de México · Oriente ───────────────────────────────────────
  .edomex({ id: 'nezahualcoyotl', nombre: 'Nezahualcóyotl', x: 540, y: 330, w: 90, h: 140, tiempoEstimado: '35-55 min', labelSize: 2 })
  .edomex({ id: 'los-reyes-la-paz', nombre: 'Los Reyes La Paz', x: 630, y: 380, w: 90, h: 70, tiempoEstimado: '45-70 min', labelSize: 1 })
  .edomex({ id: 'ixtapaluca', nombre: 'Ixtapaluca', x: 630, y: 260, w: 90, h: 70, tiempoEstimado: '50-90 min', labelSize: 1 })
  .edomex({ id: 'valle-de-chalco', nombre: 'Valle de Chalco', x: 630, y: 470, w: 90, h: 70, tiempoEstimado: '50-90 min', labelSize: 1 })
  .edomex({ id: 'chalco', nombre: 'Chalco', x: 630, y: 540, w: 90, h: 70, tiempoEstimado: '50-90 min', labelSize: 1 })

  // ── CDMX · Centro-Norte ──────────────────────────────────────────────
  .cdmx({ id: 'miguel-hidalgo', nombre: 'Miguel Hidalgo', x: 270, y: 260, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 1 })
  .cdmx({ id: 'azcapotzalco', nombre: 'Azcapotzalco', x: 360, y: 260, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 2 })
  .cdmx({ id: 'gustavo-a-madero', nombre: 'Gustavo A. Madero', x: 450, y: 260, w: 180, h: 70, tiempoEstimado: '30-60 min', labelSize: 2 })
  .cdmx({ id: 'cuauhtemoc', nombre: 'Cuauhtémoc', x: 360, y: 330, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 1 })
  .cdmx({ id: 'venustiano-carranza', nombre: 'Venustiano Carranza', x: 450, y: 330, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 1 })
  .cdmx({ id: 'benito-juarez', nombre: 'Benito Juárez', x: 360, y: 400, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 2 })
  .cdmx({ id: 'iztacalco', nombre: 'Iztacalco', x: 450, y: 400, w: 90, h: 70, tiempoEstimado: '20-40 min', labelSize: 1 })

  // ── CDMX · Occidente ─────────────────────────────────────────────────
  .cdmx({ id: 'alvaro-obregon', nombre: 'Álvaro Obregón', x: 270, y: 330, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 1 })
  .cdmx({ id: 'magdalena-contreras', nombre: 'La Magdalena Contreras', x: 270, y: 400, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 0 })
  .cdmx({ id: 'cuajimalpa', nombre: 'Cuajimalpa de Morelos', x: 180, y: 400, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 1 })

  // ── CDMX · Sur y Oriente ─────────────────────────────────────────────
  .cdmx({ id: 'coyoacan', nombre: 'Coyoacán', x: 360, y: 470, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 1 })
  .cdmx({ id: 'tlalpan', nombre: 'Tlalpan', x: 270, y: 470, w: 90, h: 140, tiempoEstimado: '30-60 min', labelSize: 2 })
  .cdmx({ id: 'xochimilco', nombre: 'Xochimilco', x: 360, y: 540, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 1 })
  .cdmx({ id: 'iztapalapa', nombre: 'Iztapalapa', x: 450, y: 470, w: 90, h: 70, tiempoEstimado: '30-60 min', labelSize: 2 })
  .cdmx({ id: 'tlahuac', nombre: 'Tláhuac', x: 540, y: 470, w: 90, h: 70, tiempoEstimado: '40-70 min', labelSize: 1 })
  .cdmx({ id: 'milpa-alta', nombre: 'Milpa Alta', x: 450, y: 540, w: 180, h: 70, tiempoEstimado: '45-90 min', labelSize: 1 })
  .build()

/** Zonas que salen en el select del formulario. A la larga dependen de confirmadas. */
export const ZONAS_FORMULARIO = ZONAS

/** Agrupa por estado para secciones (mapa, footer, schema.org). */
export const ZONAS_CDMX = ZONAS.filter((z) => z.estado === 'CDMX')
export const ZONAS_EDOMEX = ZONAS.filter((z) => z.estado === 'EDOMEX')

export function zonaPorId(id: string): Zona | undefined {
  return ZONAS.find((z) => z.id === id)
}

export function dameZonaActiva(id: string | null | undefined): Zona | undefined {
  return id ? zonaPorId(id) : undefined
}

/** Áreas atendidas para schema.org: una entrada por zona. */
export function areaServed(): Zona[] {
  return ZONAS
}