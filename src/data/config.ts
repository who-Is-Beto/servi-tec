/**
 * Configuración central del negocio.
 * TODO: Reemplazar los valores placeholder cuando el cliente confirme
 * marca definitiva, teléfono real y URL del sitio.
 */
export const SITE = {
  /** Nombre comercial. TODO: confirmar con el cliente. */
  nombre: 'TecServi',
  /** Nombre usado en schema.org y términos legales. */
  nombreLegal: 'TecServi Reparaciones de Línea Blanca',
  eslogan: 'Reparación de línea blanca a domicilio',
  /** Teléfono en formato tel: (solo dígitos, con lada 55). Producción. */
  telefono: '+52556908945',
  /** Teléfono como se muestra en pantalla. */
  telefonoDisplay: '55 6908 945',
  /** Correo público. TODO: reemplazar. */
  email: 'hola@tecservi.mx',
  /** URL base. En producción debería ir en VITE_SITE_URL. */
  url: 'https://tecservi.mx',
  region: 'Zona Metropolitana del Valle de México',
  direccionCorta: 'Ciudad de México y Estado de México',
  horario: 'Lunes a sábado, 9:00 a 19:00',
  /**
   * WhatsApp: número en formato internacional (solo dígitos) y mensaje
   * predefinido. Se sobreescribe con VITE_WHATSAPP_NUMBER si existe.
   * Producción: 52556908945.
   */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? '52556908945',
  whatsappMensaje:
    'Hola, me gustaría agendar una revisión de mi equipo de línea blanca.',
  /** Promesa de cobertura visible en la sección de beneficios. */
  coberturaBadge: 'Cobertura en: CDMX y Área Metropolitana',
} as const

/** La URL se resuelve primero desde el entorno; si no, del placeholder. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? SITE.url).replace(/\/$/, '')

/**
 * Promesas comerciales visibles en la página. Todas son EDITABLES y deben
 * confirmarse con el cliente antes de campañas. No inventar garantías.
 */
export const CLAIMS = {
  /** "Revisión de $200 MXN; si se acepta la cotización, solo se paga lo presupuestado". */
  costoRevision: {
    pesos: 200,
    /** Si se acepta la cotización, el costo de la revisión se acredita. */
    acreditable: true,
    copia: 'Revisión de $200 MXN: si aceptas la cotización, solo pagas lo presupuestado.',
  },
  /** "Reparación el mismo día o en 24-48 h". */
  reparacionRapida: true,
  /** "Técnicos especializados con más de 10 años de experiencia". */
  experienciaAnios: 10,
  /** Copy del hero (editable; el headline puede venir vía ?utm_headline). */
  hero: {
    titulo: 'Reparación de línea blanca a domicilio',
    subtitulo:
      'Revisión de $200 MXN acreditable al total de tu reparación. Especialistas en lavadoras, refrigeradores, estufas y secadoras.',
    cobertura: 'Cobertura en 16 alcaldías y +16 municipios de la ZMCM',
  },
} as const

/**
 * RESTRICCIÓN LEGAL DE MARCA (importante):
 * Este negocio presta "servicio especializado" en Samsung, LG y Mabe.
 * NO está autorizado, avalado ni es distribuidor oficial de esas marcas a
 * menos que el cliente lo confirme por escrito. Por eso el copy usa siempre
 * "servicio especializado en [marca]" y NUNCA "autorizado", "avalado" u
 * "oficial". No usar los logos de las marcas (implica afiliación).
 */
export const LEGAL = {
  independiente: true,
  declaracionIndependencia:
    'TecServi es un servicio técnico independiente. No es fabricante, distribuidor ni centro de servicio autorizado de Samsung, LG, Mabe, Whirlpool ni de cualquier otra marca.',
  /** Copy "¿Quiénes somos?" (sección de marcas). Énfasis en centro especializado. */
  quienesSomos:
    'Somos un centro de servicio especializado en la reparación de línea blanca, comprometido en ofrecer un servicio de calidad y confianza a cada cliente. Contamos con más de 20 años de experiencia en el mercado y un equipo de técnicos altamente capacitados, listos para diagnosticar y resolver cualquier falla con rapidez. Trabajamos con refacciones originales para garantizar resultados duraderos y evitar visitas repetidas. Ofrecemos asistencia técnica personalizada para las siguientes marcas:',
} as const