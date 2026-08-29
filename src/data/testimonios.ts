import type { Testimonio } from '@/types'

/**
 * Testimonios EDITABLES de ejemplo. Reemplazar por reseñas reales de
 * clientes (Google, redes) cuando existan. Cita máxima 3 líneas en
 * pantalla; nombres y zonas verosímiles.
 */
export const TESTIMONIOS: Testimonio[] = [
  {
    cita:
      'Llamé un lunes por mi lavadora Samsung y al día siguiente ya estaba trabajando. El técnico llegó a tiempo y cobró exactamente lo cotizado.',
    autor: 'Mariana Rojas',
    zona: 'Benito Juárez, CDMX',
  },
  {
    cita:
      'Cambiaron el motor del refri en mi casa, sin llevárselo. Dejaron todo limpio y explicaron cómo evitar que se vuelva a dañar.',
    autor: 'Jorge Salinas',
    zona: 'Naucalpan, EDOMEX',
  },
  {
    cita:
      'La estufa no encendía y me la repararon el mismo día. Se agendó por la página y me confirmaron por teléfono en minutos.',
    autor: 'Patricia Mendoza',
    zona: 'Ecatepec, EDOMEX',
  },
] as const