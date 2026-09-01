import type { Marca } from '@/types'
import samsungLogo from '@/media/samsung.png'
import lgLogo from '@/media/LG.png'
import mabeLogo from '@/media/mabe.png'
import whirlpoolLogo from '@/media/Whirlpool.png'

/**
 * Marcas atendidas.
 *
 * RESTRICCIÓN LEGAL (ver /src/data/config.ts): este negocio da servicio
 * ESPECIALIZADO en estas marcas pero NO está autorizado/avalado por ellas.
 * El copy usa siempre "servicio especializado en [marca]" y nunca
 * "autorizado", "avalado" u "oficial".
 *
 * `logo` apunta a la imagen provista por el cliente en /src/media. Los PNG
 * tienen fondo blanco, así que se muestran sobre un recuadro claro neutro.
 * `color` sigue siendo el acento tipográfico en las tarjetas que no tienen
 * logo propio (p. ej. "Línea general").
 */
export const MARCAS: Marca[] = [
  {
    id: 'samsung',
    nombre: 'Samsung',
    color: '#1428a0',
    logo: samsungLogo,
    descripcion: 'Lavadoras, secadoras y refrigeradores con partes activas en el mercado.',
  },
  {
    id: 'lg',
    nombre: 'LG',
    color: '#a50034',
    logo: lgLogo,
    descripcion: 'Gama completa de línea blanca, incluida tecnología inverter.',
  },
  {
    id: 'mabe',
    nombre: 'Mabe',
    color: '#007a45',
    logo: mabeLogo,
    descripcion: 'Equipos populares en hogares mexicanos, refaccionamiento amplio.',
  },
  {
    id: 'linea-general',
    nombre: 'Línea general',
    color: '#262a33',
    logo: whirlpoolLogo,
    descripcion: 'Otras marcas: Whirlpool, Bosch, Electrolux, Oster y similares.',
  },
] as const

export function marcaPorId(id: string): Marca | undefined {
  return MARCAS.find((m) => m.id === id)
}