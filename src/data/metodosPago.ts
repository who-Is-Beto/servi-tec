/**
 * Métodos de pago aceptados.
 *
 * Confirmado con el cliente: el ícono circular con "$" corresponde a
 * "Transferencia bancaria". El copy es editable aquí sin tocar el
 * componente (MetodosPagoSection).
 *
 * Los logos de tarjeta viven aquí como fuente de verdad: cada logo tiene
 * `src` (WebP optimizado) con `fallback` PNG para navegadores antiguos.
 * Alt text descriptivo por requisito de accesibilidad.
 */
import visaWebp from '@/media/visa.webp'
import visaPng from '@/media/visa.png'
import mastercardWebp from '@/media/mastercard.webp'
import mastercardPng from '@/media/mastercard.png'
import amexWebp from '@/media/amex.webp'
import amexPng from '@/media/amex.png'

export interface MetodoPagoLogo {
  /** Imagen principal (WebP optimizada). */
  src: string
  /** Fallback para navegadores sin WebP (PNG). */
  fallback: string
  /** Alt descriptivo, p. ej. "Pago con tarjeta Visa". */
  alt: string
}

export interface MetodoPago {
  id: string
  label: string
  detalle: string
  /** Ícono de @tabler/icons-vue asociado a este método. */
  icono: 'cash' | 'transfer' | 'card'
  /** Logos de marca del método (solo tarjeta). */
  logos?: MetodoPagoLogo[]
}

export const METODOS_PAGO: MetodoPago[] = [
  {
    id: 'efectivo',
    label: 'Efectivo',
    detalle: 'Al terminar la reparación, en tu domicilio.',
    icono: 'cash',
  },
  {
    id: 'transferencia',
    label: 'Transferencia bancaria',
    detalle: 'Te enviamos los datos para pagar por SPEI al confirmar.',
    icono: 'transfer',
  },
  {
    id: 'tarjeta',
    label: 'Tarjeta de crédito / débito',
    detalle: 'Visa, Mastercard o American Express al momento de la visita.',
    icono: 'card',
    logos: [
      { src: visaWebp, fallback: visaPng, alt: 'Pago con tarjeta Visa' },
      { src: mastercardWebp, fallback: mastercardPng, alt: 'Pago con tarjeta Mastercard' },
      { src: amexWebp, fallback: amexPng, alt: 'Pago con tarjeta American Express' },
    ],
  },
] as const