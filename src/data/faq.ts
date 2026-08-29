import type { FaqItem } from '@/types'

/**
 * Preguntas frecuentes. Edita libremente; mantén el tono claro y sin
 * promesas exageradas. Las respuestas de garantía/cotización deben
 * coincidir con /src/views/TermsView.vue.
 */
export const FAQ: FaqItem[] = [
  {
    pregunta: '¿Cuánto cuesta la visita y la cotización?',
    respuesta:
      'La revisión tiene un costo de $200 MXN. Si aceptas la cotización, ese monto se acredita y solo pagas lo presupuestado; si no se acepta, solo se cubre el costo de la revisión.',
  },
  {
    pregunta: '¿Reparan mi marca o tengo que ser cliente de Samsung, LG o Mabe?',
    respuesta:
      'Atendemos Samsung, LG, Mabe y línea general (Whirlpool, Bosch, Electrolux y otras), sin necesidad de contrato ni membresía. Somos un servicio técnico independiente.',
  },
  {
    pregunta: '¿Qué zonas cubren?',
    respuesta:
      'Trabajamos en la mayor parte de la Zona Metropolitana del Valle de México: 16 alcaldías de la CDMX y más de 15 municipios conurbados del Estado de México. Revisa el mapa de cobertura o llámanos para confirmar tu dirección.',
  },
  {
    pregunta: '¿Las refacciones tienen garantía?',
    respuesta:
      'Sí. La refacción instalada y la mano de obra de la reparación tienen garantía por escrito. La cobertura exacta se detalla en la orden de servicio y en nuestros términos.',
  },
  {
    pregunta: '¿Cuánto tarda la reparación?',
    respuesta:
      'La mayoría de las reparaciones se completan en la misma visita. Cuando se requiere refacción, suele llegar en 24 a 48 horas y agendamos una segunda visita sin costo.',
  },
  {
    pregunta: '¿Ofrecen servicio urgente el mismo día?',
    respuesta:
      'Sí. Coordinamos servicio urgente a domicilio para el mismo día: llámanos y agendamos la visita lo antes posible, dando prioridad a equipos críticos como refrigeradores.',
  },
  {
    pregunta: '¿Atienden fines de semana o de emergencia?',
    respuesta:
      'Sí. Trabajamos de lunes a sábado en horarios de 9:00 a 13:00, 13:00 a 16:00 y 16:00 a 19:00. Al registrar tu horario preferido te confirmamos la franja exacta.',
  },
] as const