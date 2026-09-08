import { defineStore } from 'pinia'
import type { AgendaRequest } from '@/types'
import { OTRA_FALLA_ID } from '@/data/fallas'

const INITIAL: AgendaRequest = {
  nombre: '',
  telefono: '',
  marcaId: '',
  servicioId: '',
  zonaId: '',
  horarioId: '',
  falla: '',
  fallaDescripcion: '',
}

/**
 * Estado global del formulario de agendado.
 * Facilita que el mapa de cobertura y el formulario compartan la zona
 * seleccionada (ambos escriben en `selectZona`) y mantiene los datos si el
 * usuario navega entre vistas antes de enviar.
 */
export const useSchedulingStore = defineStore('scheduling', {
  state: () => ({
    form: { ...INITIAL },
    submitting: false,
    submitted: false,
    submitError: '',
  }),
  getters: {
    isComplete: (state) =>
      Boolean(
        state.form.nombre.trim() &&
          state.form.telefono.trim() &&
          state.form.marcaId &&
          state.form.servicioId &&
          state.form.zonaId &&
          state.form.horarioId &&
          state.form.falla &&
          // Si elige "Otra", exige la descripción de texto libre.
          (state.form.falla !== OTRA_FALLA_ID || Boolean(state.form.fallaDescripcion.trim())),
      ),
  },
  actions: {
    setField<K extends keyof AgendaRequest>(key: K, value: AgendaRequest[K]): void {
      this.form[key] = value
      this.submitError = ''
    },
    /** Selecciona una zona desde el mapa o el formulario. */
    selectZona(zonaId: string): void {
      this.form.zonaId = zonaId
      this.submitError = ''
    },
    markSubmitted(): void {
      this.submitted = true
    },
    setSubmitting(value: boolean): void {
      this.submitting = value
    },
    setSubmitError(message: string): void {
      this.submitError = message
    },
    reset(): void {
      this.form = { ...INITIAL }
      this.submitted = false
      this.submitting = false
      this.submitError = ''
    },
  },
})