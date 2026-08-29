import type { Servicio } from '@/types'

/**
 * Electrodomésticos que se reparan. `icono` se resuelve en
 * /src/components/sections/ServicesSection.vue contra las tablas de
 * @tabler/icons-vue. Para añadir uno, agrega la fila y el mapeo del ícono.
 */
export const SERVICIOS: Servicio[] = [
  {
    id: 'lavadora',
    nombre: 'Lavadoras',
    descripcion: 'De carga frontal y superior, con fallas de arranque, ruido, fugas o no centrífuga.',
    icono: 'lavadora',
  },
  {
    id: 'secadora',
    nombre: 'Secadoras',
    descripcion: 'No calienta, tambor detenido o no elimina humedad. Eléctricas y a gas.',
    icono: 'secadora',
  },
  {
    id: 'refrigerador',
    nombre: 'Refrigeradores',
    descripcion: 'No enfría, congela de más, hace ruido, no descongela o pierde gas.',
    icono: 'refrigerador',
  },
  {
    id: 'estufa',
    nombre: 'Estufas y hornos',
    descripcion: 'Encendido, horno sin temperatura, fugas en quemadores y controles.',
    icono: 'estufa',
  },
  {
    id: 'lavavajillas',
    nombre: 'Lavavajillas',
    descripcion: 'No llena, no drena, no seca o deja residuos en la loza.',
    icono: 'lavavajillas',
  },
  {
    id: 'microondas',
    nombre: 'Microondas',
    descripcion: 'No calienta, chispas, tarda de más o falla el plato giratorio.',
    icono: 'microondas',
  },
] as const

export function servicioPorId(id: string): Servicio | undefined {
  return SERVICIOS.find((s) => s.id === id)
}