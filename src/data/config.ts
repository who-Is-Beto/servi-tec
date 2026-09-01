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
  /** Teléfono en formato tel: (solo dígitos, con lada 55). Mismo número que WhatsApp. */
  telefono: '+525569089455',
  /** Texto que se muestra en el CTA de llamada (no se imprime el número). */
  telefonoDisplay: 'Llámanos y agenda',
  /** Correo público. TODO: reemplazar. */
  email: 'hola@tecservi.mx',
  /** URL base. En producción debería ir en VITE_SITE_URL. */
  url: 'https://tecservi.mx',
  region: 'Zona Metropolitana del Valle de México',
  direccionCorta: 'Ciudad de México y Estado de México',
  horario: 'Lunes a sábado, 9:00 a 19:00',
} as const

/** La URL se resuelve primero desde el entorno; si no, del placeholder. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? SITE.url).replace(/\/$/, '')

/**
 * WhatsApp: canal de contacto principal (CTA de baja fricción).
 * Se arma el enlace wa.me con el mensaje prellenado y codificado en URL.
 * TODO: confirmar el número definitivo con el cliente antes de campañas.
 */
export const WHATSAPP = {
  /** Número en formato internacional sin "+", espacios ni guiones (52 + 10 dígitos). */
  telefono: '525569089455',
  /** Mensaje corto que llega prellenado al abrir el chat. */
  saludo: 'Hola, vengo de la página de TecServi y quiero agendar una reparación.',
  /** Enlace listo para usar como href. */
  get enlace(): string {
    return `https://wa.me/${this.telefono}?text=${encodeURIComponent(this.saludo)}`
  },
} as const

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
    'TecServi es un servicio técnico independiente. No es fabricante, distribuidor ni centro de servicio autorizado de Samsung, LG, Mabe ni de cualquier otra marca.',
} as const