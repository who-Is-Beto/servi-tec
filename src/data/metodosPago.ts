/**
 * Métodos de pago aceptados.
 *
 * Confirmado con el cliente: el ícono circular con "$" corresponde a
 * "Transferencia bancaria". El copy es editable aquí sin tocar el
 * componente (MetodosPagoSection).
 */
export interface MetodoPago {
  id: string
  label: string
  detalle: string
  /** Ícono de @tabler/icons-vue asociado a este método. */
  icono: 'cash' | 'transfer' | 'card'
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
    detalle: 'Visa o Mastercard al momento de la visita.',
    icono: 'card',
  },
] as const
