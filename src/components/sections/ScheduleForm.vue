<script setup lang="ts">
import { computed, ref } from 'vue'
import { IconCalendarEvent, IconCircleCheckFilled, IconLoader2 } from '@tabler/icons-vue'
import { useSchedulingStore } from '@/stores/scheduling'
import { useConversion } from '@/composables/useConversion'
import { MARCAS, marcaPorId } from '@/data/marcas'
import { SERVICIOS, servicioPorId } from '@/data/servicios'
import { ZONAS_FORMULARIO, zonaPorId } from '@/data/zonas'
import { HORARIOS } from '@/data/horarios'
import { SITE } from '@/data/config'
import AppButton from '@/components/ui/AppButton.vue'
import AppTextField from '@/components/ui/AppTextField.vue'
import AppSelectField from '@/components/ui/AppSelectField.vue'

/**
 * Punto de integración del formulario:
 * Aquí se envían los datos a tu proveedor de formularios. Opciones sin backend:
 *  1. Formspree:  https://formspree.io/f/GENERADO  → en POST https://formspree.io/f/xxx
 *  2. Web3Forms:  https://api.web3forms.com/submit (campo access_key).
 * Opciones con backend propio: un endpoint que haga POST a tu CRM/WhatsApp.
 * Cuando confirmes el proveedor, sustituye el `await fakeEnviar()` por el fetch real.
 */

const store = useSchedulingStore()
const { trackSchedule } = useConversion()

const errores = ref<Partial<Record<keyof typeof store.form, string>>>({})

const marcaLabel = (id: string) => marcaPorId(id)?.nombre ?? ''
const servicioLabel = (id: string) => servicioPorId(id)?.nombre ?? ''
const zonaLabel = (id: string) => zonaPorId(id)?.nombre ?? ''
const horarioLabel = (id: string) => HORARIOS.find((h) => h.id === id)

const marcaOptions = computed(() => MARCAS.map((m) => ({ value: m.id, label: m.nombre })))
const servicioOptions = computed(() => SERVICIOS.map((s) => ({ value: s.id, label: s.nombre })))
const zonaOptions = computed(() =>
  ZONAS_FORMULARIO.map((z) => ({
    value: z.id,
    label: `${z.nombre} (${z.tiempoEstimado})`,
  })),
)
const horarioOptions = computed(() =>
  HORARIOS.map((h) => ({ value: h.id, label: `${h.label} · ${h.detalle}` })),
)

const TEL_RE = /^(?:\+?52)?(55|56)\d{8}$/

function validar(): boolean {
  const e: Partial<Record<keyof typeof store.form, string>> = {}

  if (store.form.nombre.trim().length < 2) {
    e.nombre = 'Escribe tu nombre para poder identificarte.'
  }
  // Se normaliza (espacios, guiones y puntos) para aceptar 55 1234 5678 / 55-1234-5678.
  const tel = store.form.telefono.replace(/[\s.-]/g, '')
  if (!TEL_RE.test(tel) || tel.length > 12) {
    e.telefono = 'Ingresa un teléfono a 10 dígitos de CDMX (p. ej. 55 1234 5678).'
  }
  if (!store.form.marcaId) e.marcaId = 'Selecciona la marca de tu equipo.'
  if (!store.form.servicioId) e.servicioId = 'Selecciona el tipo de equipo.'
  if (!store.form.zonaId) e.zonaId = 'Selecciona tu zona (o elígela en el mapa).'
  if (!store.form.horarioId) e.horarioId = 'Selecciona la franja que te acomode.'

  errores.value = e
  return Object.keys(e).length === 0
}

// TODO(mcp): reemplazar por POST real a Formspree/Web3Forms/CRM.
async function fakeEnviar(): Promise<void> {
  await new Promise((r) => setTimeout(r, 700))
}

async function onSubmit(): Promise<void> {
  if (store.submitting || !validar()) return
  store.setSubmitting(true)
  try {
    await fakeEnviar()
    store.markSubmitted()
    trackSchedule('form_section')
  } catch {
    store.setSubmitError('No pudimos registrar tu cita. Intenta de nuevo o llámanos directo.')
  } finally {
    store.setSubmitting(false)
  }
}

const horarioSeleccionado = computed(() => horarioLabel(store.form.horarioId))
</script>

<template>
  <form novalidate data-testid="schedule-form" @submit.prevent="onSubmit">
    <div v-if="store.submitted" role="status" aria-live="polite">
      <div class="rounded-2xl bg-brand-50 p-8 text-center dark:bg-ink-950">
        <IconCircleCheckFilled aria-hidden="true" class="mx-auto size-14 text-brand-600" />
        <h3 class="mt-4 text-xl font-bold text-ink-950 dark:text-white">¡Listo, te esperamos!</h3>
        <p class="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {{ store.form.nombre.trim() }}, tu solicitud quedó registrada para
          <strong>{{ servicioLabel(store.form.servicioId) }}</strong>
          de <strong>{{ marcaLabel(store.form.marcaId) }}</strong> en
          <strong>{{ zonaLabel(store.form.zonaId) }}</strong
          ><template v-if="horarioSeleccionado">
            , en el horario <strong>{{ horarioSeleccionado.label }}</strong>
          </template>. Te llamaremos para confirmar la visita.
        </p>
        <p class="mt-4 text-xs text-ink-600 dark:text-ink-400">
          ¿Urgencia? Llámanos directo: <a class="tnum font-semibold text-brand-700 underline dark:text-brand-300" :href="`tel:${SITE.telefono}`">{{ SITE.telefonoDisplay }}</a>
        </p>
      </div>
    </div>

    <div v-else class="space-y-4">
      <AppTextField
        id="ag-nombre"
        v-model="store.form.nombre"
        label="Nombre"
        required
        autocomplete="name"
        placeholder="Tu nombre…"
        :error="errores.nombre"
      />
      <AppTextField
        id="ag-telefono"
        v-model="store.form.telefono"
        label="Teléfono"
        required
        type="tel"
        inputmode="tel"
        autocomplete="tel-national"
        placeholder="55 1234 5678…"
        :error="errores.telefono"
        hint="Solo lo usamos para confirmar tu cita. Nunca compartimos tus datos."
      />
      <div class="grid gap-4 sm:grid-cols-2">
        <AppSelectField id="ag-marca" v-model="store.form.marcaId" label="Marca" required :options="marcaOptions" :error="errores.marcaId" />
        <AppSelectField id="ag-servicio" v-model="store.form.servicioId" label="Equipo" required :options="servicioOptions" placeholder-label="Elige el equipo…" :error="errores.servicioId" />
      </div>
      <AppSelectField id="ag-zona" v-model="store.form.zonaId" label="Tu zona" required :options="zonaOptions" placeholder-label="Elige tu alcaldía o municipio…" :error="errores.zonaId" hint="Si ya la elegiste en el mapa, aquí ya aparece prellenada." />
      <AppSelectField id="ag-horario" v-model="store.form.horarioId" label="Horario" required :options="horarioOptions" placeholder-label="Elige la franja…" :error="errores.horarioId" />

      <p v-if="store.submitError" role="alert" class="text-sm text-red-700 dark:text-red-400">
        {{ store.submitError }}
      </p>

      <AppButton type="submit" variant="primary" size="lg" class="w-full" :disabled="store.submitting" data-testid="schedule-submit">
        <IconLoader2 v-if="store.submitting" aria-hidden="true" class="size-5 animate-spin" />
        <IconCalendarEvent v-else aria-hidden="true" class="size-5" />
        {{ store.submitting ? 'Registrando…' : 'Agendar mi visita' }}
      </AppButton>

      <p class="text-center text-xs leading-relaxed text-ink-600 dark:text-ink-400">
        Al enviar aceptas nuestro
        <RouterLink to="/aviso-de-privacidad" class="underline transition-colors hover:text-brand-600">Aviso de Privacidad</RouterLink>.
      </p>
    </div>
  </form>
</template>