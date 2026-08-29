import type { HorarioDisponible } from '@/types'

/** Franjas del formulario de agendado. Editable. */
export const HORARIOS: HorarioDisponible[] = [
  { id: 'manana', label: 'Mañana', detalle: '9:00 a 13:00' },
  { id: 'tarde', label: 'Tarde', detalle: '13:00 a 16:00' },
  { id: 'noche', label: 'Vespertino', detalle: '16:00 a 19:00' },
  { id: 'urgencia', label: 'Urgencia', detalle: 'Mismo día (a domicilio)' },
  { id: 'sabado', label: 'Sábado', detalle: '9:00 a 19:00 (a domicilio)' },
] as const