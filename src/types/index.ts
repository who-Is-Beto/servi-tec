export type Estado = 'CDMX' | 'EDOMEX'
export type TipoZona = 'alcaldia' | 'municipio'

/**
 * Zona de cobertura de la ZMCM.
 * `svg` describe la geometría del mapa esquemático (una sola pieza por zona).
 * `confirmada` queda en false hasta que el cliente confirme la lista definitiva.
 */
export interface Zona {
  id: string
  nombre: string
  estado: Estado
  tipo: TipoZona
  /** Tiempo estimado de respuesta para la zona. Editable en este archivo. */
  tiempoEstimado: string
  confirmada: boolean
  svg: {
    path: string
    /** Centro del rótulo opcional dentro de la pieza (solo si labelSize > 0). */
    label?: { x: number; y: number }
    /** 0 = sin rótulo, 1 = chico, 2 = mediano. */
    labelSize?: 0 | 1 | 2
  }
}

export interface Marca {
  id: string
  nombre: string
  /** Color de acento del wordmark. No es el logo oficial del fabricante. */
  color: string
  descripcion: string
  /** Ruta del logo provisto por el cliente (src/media/*.png). Opcional. */
  logo?: string
}

export type ServicioIcono =
  | 'lavadora'
  | 'secadora'
  | 'refrigerador'
  | 'estufa'
  | 'lavavajillas'
  | 'microondas'

export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  icono: ServicioIcono
}

export interface FaqItem {
  pregunta: string
  respuesta: string
}

export interface Testimonio {
  cita: string
  autor: string
  zona: string
}

export interface AgendaRequest {
  nombre: string
  telefono: string
  marcaId: string
  servicioId: string
  zonaId: string
  horarioId: string
  /** ID de la falla predefinida seleccionada (ver /src/data/fallas.ts). */
  falla: string
  /** Texto libre si se eligió "Otra" como falla (fallaDescripcion). */
  fallaDescripcion: string
}

export interface HorarioDisponible {
  id: string
  label: string
  detalle: string
}

export interface UtmParams {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  /** Headline opcional enviado desde la campaña para personalizar el hero. */
  utmHeadline: string | null
}

export type ConversionEvent = 'call_click' | 'schedule_submit'