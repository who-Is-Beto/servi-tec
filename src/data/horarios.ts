import type { HorarioDisponible } from '@/types'

/** Franjas del formulario de agendado. Editable. Horario unificado: 8 am a 8 pm. */
export const HORARIOS: HorarioDisponible[] = [
  { id: 'manana', label: 'Mañana', detalle: '8:00 a 12:00' },
  { id: 'tarde', label: 'Tarde', detalle: '12:00 a 16:00' },
  { id: 'noche', label: 'Vespertino', detalle: '16:00 a 20:00' },
  { id: 'urgencia', label: 'Urgencia', detalle: 'Mismo día (a domicilio)' },
  { id: 'sabado', label: 'Sábado', detalle: '8:00 a 20:00 (a domicilio)' },
] as const