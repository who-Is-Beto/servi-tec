/**
 * Fallas comunes predefinidas para el formulario de agendado.
 *
 * El campo de falla es un select con estas opciones; la última ("otra")
 * despliega un campo de texto libre. `otraId` marca esa opción especial.
 */
export interface Falla {
  id: string
  label: string
}

export const FALLAS: Falla[] = [
  { id: 'no-enciende', label: 'No enciende' },
  { id: 'no-drena', label: 'No drena' },
  { id: 'hace-ruido', label: 'Hace ruido' },
  { id: 'no-enfria', label: 'No enfría' },
  { id: 'no-calienta', label: 'No calienta' },
  { id: 'fuga-agua', label: 'Fuga de agua' },
  { id: 'otra', label: 'Otra' },
] as const

/** ID de la opción "Otra", que activa el campo de texto libre. */
export const OTRA_FALLA_ID = 'otra'

export function fallaPorId(id: string): Falla | undefined {
  return FALLAS.find((f) => f.id === id)
}
