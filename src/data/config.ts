/**
 * Configuración central del negocio.
 */
export const SITE = {
  /** Nombre comercial (confirmado por el cliente: "Servicio Lavadoras"). */
  nombre: 'Servicio Lavadoras',
  /** Nombre usado en schema.org y términos legales. */
  nombreLegal: 'Servicio Lavadoras Reparaciones de Línea Blanca',
  eslogan: 'Reparación de línea blanca a domicilio',
  /** Teléfono en formato tel: (solo dígitos, con lada 55). Producción. */
  telefono: '+52556908945',
  /** Teléfono como se muestra en pantalla. */
  telefonoDisplay: '55 6908 945',
  /** Correo público. TODO: confirmar dominio de correo definitivo con el cliente. */
  email: 'hola@tecservi.mx',
  /** URL base. TODO: confirmar dominio definitivo (aún apunta al de staging). */
  url: 'https://tecservi.mx',
  region: 'Zona Metropolitana del Valle de México',
  direccionCorta: 'Ciudad de México y Estado de México',
  horario: 'Lunes a sábado, 8:00 am a 8:00 pm',
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
  /** "Revisión y cotización a domicilio el mismo día". Sin precio fijo. */
  revisionCopia: 'Revisión y cotización a domicilio el mismo día',
  /** "Reparación el mismo día o en 24-48 h". */
  reparacionRapida: true,
  /** "+30 años de experiencia" (confirmado por el cliente). */
  experienciaAnios: 30,
  /** Copy del hero (editable; el headline puede venir vía ?utm_headline). */
  hero: {
    titulo: 'Reparación de línea blanca a domicilio',
    subtitulo:
      'Revisión y cotización a domicilio el mismo día. Servicio especializado en Samsung, LG, Daewoo y Winnia.',
    cobertura: 'Cobertura en 16 alcaldías y +16 municipios de la ZMCM',
  },
} as const

/**
 * COPY LEGAL Y DE MARCA:
 * - "declaracionIndependencia" vive SOLO en /terminos-y-condiciones (no en la
 *   landing, por decisión del cliente). No usarla en el cuerpo visible.
 * - Nunca usar "autorizado", "avalado" u "oficial" para las marcas salvo
 *   convenio formal por escrito.
 */
export const LEGAL = {
  /** Aclaración de independencia (solo en Términos y Condiciones). */
  declaracionIndependencia:
    'Servicio Lavadoras es un servicio técnico independiente. No es fabricante, distribuidor ni centro de servicio autorizado de Samsung, LG, Daewoo, Winnia ni de cualquier otra marca.',
  /** Copy "¿Quiénes somos?" (sección de marcas). Énfasis en centro especializado. */
  quienesSomos:
    'Somos un centro de servicio especializado en la reparación de línea blanca, comprometido en ofrecer un servicio de calidad y confianza a cada cliente. Contamos con más de 30 años de experiencia en el mercado y un equipo de técnicos altamente capacitados, listos para diagnosticar y resolver cualquier falla con rapidez. Trabajamos con refacciones originales para garantizar resultados duraderos y evitar visitas repetidas. Ofrecemos asistencia técnica personalizada para las siguientes marcas:',
  /**
   * Copy sobre REFACCIONES compatibles. Reemplaza al disclaimer que se
   * eliminó de la landing. Se escribió SIN enumerar marcas para no repetir
   * el listado de "marcas atendidas" (Samsung, LG, Daewoo, Winnia) y evitar
   * redundancia en la página.
   */
  refaccionesCompatibles:
    'Usamos refacciones originales y/o compatibles para entregar reparaciones duraderas, en las marcas que atendemos.',
} as const