import type { Marca } from '@/types'
import samsungLogo from '@/media/samsung.png'
import lgLogo from '@/media/LG.png'
import daewooLogo from '@/media/daewoo-logo.svg'
import winniaLogo from '@/media/winnia-logo.png'

/**
 * Marcas atendidas.
 *
 * Confirmado por el cliente: Mabe y Whirlpool fueron reemplazadas por Daewoo
 * y Winnia en el listado de "marcas atendidas" (servicio de reparación), en
 * vez de mantenerlas SOLO como marcas de refacciones compatibles.
 *
 * RESTRICCIÓN LEGAL (ver /src/data/config.ts): este negocio da servicio
 * ESPECIALIZADO en estas marcas pero NO está autorizado/avalado por ellas.
 * El copy usa siempre "servicio especializado en [marca]" y nunca
 * "autorizado", "avalado" u "oficial".
 *
 * `logo` apunta a la imagen provista por el cliente en /src/media. Los PNG
 * tienen fondo blanco, así que se muestran sobre un recuadro claro neutro.
 * `color` es el acento tipográfico en las tarjetas que no tienen logo propio.
 */
export const MARCAS: Marca[] = [
  {
    id: 'lg',
    nombre: 'LG',
    color: '#a50034',
    logo: lgLogo,
    descripcion: 'Gama completa de línea blanca, incluida tecnología inverter.',
  },
  {
    id: 'samsung',
    nombre: 'Samsung',
    color: '#1428a0',
    logo: samsungLogo,
    descripcion: 'Lavadoras, secadoras y refrigeradores con partes activas en el mercado.',
  },
  {
    id: 'daewoo',
    nombre: 'Daewoo',
    color: '#c8102e',
    logo: daewooLogo,
    descripcion: 'Lavadoras y secadoras coreanas con amplia disponibilidad de refacciones.',
  },
  {
    id: 'winnia',
    nombre: 'Winnia',
    color: '#00519e',
    logo: winniaLogo,
    descripcion: 'Equipos de línea blanca con amplia presencia en el mercado mexicano.',
  },
] as const

export function marcaPorId(id: string): Marca | undefined {
  return MARCAS.find((m) => m.id === id)
}