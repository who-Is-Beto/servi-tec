<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconMapPin from '@tabler/icons-vue/dist/esm/icons/IconMapPin.mjs'
import IconClock from '@tabler/icons-vue/dist/esm/icons/IconClock.mjs'
import IconCalendarEvent from '@tabler/icons-vue/dist/esm/icons/IconCalendarEvent.mjs'
import IconInfoCircle from '@tabler/icons-vue/dist/esm/icons/IconInfoCircle.mjs'
import IconPhone from '@tabler/icons-vue/dist/esm/icons/IconPhone.mjs'
import { SITE } from '@/data/config'
import { ZONAS_CDMX, ZONAS_EDOMEX, zonaPorId } from '@/data/zonas'
import { CDMX_MAPA, EDOMEX_MAPA, EDOMEX_CONTEXTO, MAPA_META } from '@/data/zonas-mapa'
import { useSchedulingStore } from '@/stores/scheduling'
import { useConversion } from '@/composables/useConversion'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

/**
 * Mapa real de la ZMCM (geometría oficial INEGI/CONABIO 2022, simplificada;
 * ver scripts/build-map.mjs). CDMX y el cinturón EDOMEX cubierto son piezas
 * clicables: click/tap selecciona la zona (store + ?zona=id en la URL).
 * Los municipios de contexto del EDOMEX se pintan inertes.
 */

const route = useRoute()
const router = useRouter()
const store = useSchedulingStore()
const { trackCall } = useConversion()

const zonasCdmx = ZONAS_CDMX
const zonasEdomex = ZONAS_EDOMEX

const zonaSeleccionada = computed(() => {
  const id = store.form.zonaId || (Array.isArray(route.query.zona) ? route.query.zona[0] : route.query.zona)
  const zona = typeof id === 'string' ? zonaPorId(id) : undefined
  return zona
})

/** Selector "Elige tu zona" (arriba del mapa). */
const SIN_ZONA = '__no_encuentro__'
const zonaSeleccion = ref('')
const noEncontro = ref(false)
const mapaRef = ref<HTMLElement | null>(null)

function onZonaSelect(): void {
  if (zonaSeleccion.value === SIN_ZONA) {
    noEncontro.value = true
    return
  }
  const id = zonaSeleccion.value
  if (!id) return
  noEncontro.value = false
  seleccionarZona(id)
  // Scroll suave hasta el mapa para mostrar la zona resaltada.
  mapaRef.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Sincroniza el select si la zona se eligió en el mapa (o vía URL).
watch(
  zonaSeleccionada,
  (z) => {
    if (z && zonaSeleccion.value !== z.id) {
      zonaSeleccion.value = z.id
      noEncontro.value = false
    }
  },
  { immediate: true },
)

const infoDe = (geo: (typeof CDMX_MAPA)[number]) => {
  const z = zonaPorId(geo.id)
  return {
    id: geo.id,
    nombre: z?.nombre ?? geo.nombre,
    tiempo: z?.tiempoEstimado,
    estado: geo.estado,
    geo,
  }
}

const cdmxZonas = CDMX_MAPA.map(infoDe)
const edomexZonas = EDOMEX_MAPA.map(infoDe)

function seleccionarZona(id: string): void {
  store.selectZona(id)
  router.replace({ query: { ...route.query, zona: id } })
}

function fontSize(z: (typeof CDMX_MAPA)[number]): string {
  return z.labelSize === 2 ? '12px' : '9px'
}
</script>

<template>
  <UiSection id="cobertura" class="bg-ink-50/50 dark:bg-ink-900/40">
    <SectionHeading
      title="Cobertura en la Zona Metropolitana del Valle de México"
      intro="Atendemos a domicilio en las 16 alcaldías de la CDMX y en los principales municipios del Estado de México. Toca o da clic a tu zona para ver el tiempo estimado de llegada."
    />

    <!-- Selector de zona por lista -->
    <div
      v-reveal
      class="mt-12 overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-200/60 sm:p-8 dark:bg-ink-900 dark:ring-ink-800"
    >
      <div class="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div class="flex items-center gap-3">
          <span
            class="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-cta"
            aria-hidden="true"
          >
            <IconMapPin class="size-5" />
          </span>
          <div>
            <label for="zona-selector" class="block text-base font-bold text-ink-950 dark:text-white">
              Elige tu zona
            </label>
            <p class="mt-0.5 text-sm text-ink-600 dark:text-ink-300">
              Selecciona tu alcaldía o municipio y lo resaltamos en el mapa. Si no aparece, llámanos y confirmamos tu cobertura.
            </p>
          </div>
        </div>
        <select
          id="zona-selector"
          v-model="zonaSeleccion"
          aria-label="Elige tu zona"
          class="w-full appearance-none rounded-full border-0 bg-white px-5 py-3.5 pr-11 text-ink-900 shadow-sm ring-1 ring-inset ring-ink-200 transition-shadow hover:ring-ink-300 focus:ring-2 focus:ring-brand-500 lg:w-80 dark:bg-ink-950 dark:text-ink-50 dark:ring-ink-700 dark:hover:ring-ink-600"
          data-testid="zona-select"
          @change="onZonaSelect"
        >
          <option value="" disabled>Elige tu alcaldía o municipio…</option>
          <optgroup label="Ciudad de México">
            <option v-for="z in zonasCdmx" :key="z.id" :value="z.id">{{ z.nombre }}</option>
          </optgroup>
          <optgroup label="Estado de México">
            <option v-for="z in zonasEdomex" :key="z.id" :value="z.id">{{ z.nombre }}</option>
          </optgroup>
          <option :value="SIN_ZONA">No encuentro mi zona</option>
        </select>
      </div>

      <p
        v-if="zonaSeleccionada && !noEncontro"
        class="mt-5 text-sm text-ink-600 dark:text-ink-300"
        aria-live="polite"
        data-testid="zona-confirm"
      >
        <span class="font-semibold text-brand-700 dark:text-brand-300">
          ¡Sí cubrimos {{ zonaSeleccionada.nombre }}!
        </span>
        Ya lo resaltamos en el mapa y de ahí puedes agendar tu cita.
      </p>

      <div
        v-if="noEncontro"
        class="mt-5 rounded-2xl bg-brand-50 p-5 ring-1 ring-inset ring-brand-200 dark:bg-ink-950 dark:ring-brand-800"
        role="status"
        aria-live="polite"
        data-testid="zona-no-encuentro"
      >
        <p class="text-sm font-semibold text-ink-900 dark:text-white">¿No encuentras tu zona?</p>
        <p class="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Llámanos directo y confirmamos tu cobertura al momento.
        </p>
        <a
          :href="`tel:${SITE.telefono}`"
          class="tnum mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-cta ring-1 ring-inset ring-white/10 transition-all duration-150 hover:from-brand-400 hover:to-brand-600 active:translate-y-px"
          data-testid="llama-directo"
          @click="trackCall()"
        >
          <IconPhone class="size-4" />
          {{ SITE.telefonoDisplay }}
        </a>
      </div>
    </div>

    <div class="mt-12 grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
      <!-- Mapa real -->
      <div
        ref="mapaRef"
        v-reveal="{ from: 'left' }"
        class="relative overflow-hidden rounded-3xl bg-white p-4 shadow-card ring-1 ring-ink-200/60 sm:p-6 dark:bg-ink-900 dark:ring-ink-800"
        data-testid="mapa-zonas"
      >
        <svg
          :viewBox="MAPA_META.viewBox.join(' ')"
          class="h-auto w-full select-none"
          role="application"
          aria-label="Mapa de cobertura de la Zona Metropolitana del Valle de México: alcaldías de CDMX y municipios del Estado de México"
        >
          <!-- Contexto EDOMEX (municipios vecinos no cubiertos, inertes) -->
          <g
            v-for="ctx in EDOMEX_CONTEXTO"
            :key="ctx.id"
            aria-hidden="true"
            class="pointer-events-none"
          >
            <path
              :d="ctx.path"
              class="fill-ink-100/80 stroke-white/60 stroke-[0.8] dark:fill-ink-800/50 dark:stroke-ink-950/60"
            />
          </g>

          <!-- Piezas cubiertas del Estado de México -->
          <g
            v-for="z in edomexZonas"
            :key="z.id"
            role="button"
            tabindex="0"
            :aria-label="`${z.nombre}, Estado de México. Tiempo estimado: ${z.tiempo}`"
            class="cursor-pointer focus:outline-none"
            @click="seleccionarZona(z.id)"
            @keydown.enter="seleccionarZona(z.id)"
            @keydown.space.prevent="seleccionarZona(z.id)"
          >
            <path
              :d="z.geo.path"
              class="zone-shape transition-[fill] duration-150"
              :class="zonaSeleccionada?.id === z.id ? 'fill-ink-600' : 'fill-ink-200 hover:fill-ink-300 dark:fill-ink-600/40 dark:hover:fill-ink-600/60'"
            />
            <text
              v-if="z.geo.label"
              :x="z.geo.label.x"
              :y="z.geo.label.y"
              text-anchor="middle"
              :font-size="fontSize(z.geo)"
              font-weight="600"
              fill="currentColor"
              class="pointer-events-none text-ink-700 dark:text-ink-100"
            >
              {{ z.nombre }}
            </text>
          </g>

          <!-- Piezas cubiertas de la CDMX -->
          <g
            v-for="z in cdmxZonas"
            :key="z.id"
            role="button"
            tabindex="0"
            :aria-label="`${z.nombre}, Ciudad de México. Tiempo estimado: ${z.tiempo}`"
            class="cursor-pointer focus:outline-none"
            @click="seleccionarZona(z.id)"
            @keydown.enter="seleccionarZona(z.id)"
            @keydown.space.prevent="seleccionarZona(z.id)"
          >
            <path
              :d="z.geo.path"
              class="zone-shape transition-[fill] duration-150"
              :class="zonaSeleccionada?.id === z.id ? 'fill-brand-600' : 'fill-brand-100 hover:fill-brand-200 dark:fill-brand-500/40 dark:hover:fill-brand-500/60'"
            />
            <text
              v-if="z.geo.label"
              :x="z.geo.label.x"
              :y="z.geo.label.y"
              text-anchor="middle"
              :font-size="fontSize(z.geo)"
              font-weight="600"
              fill="currentColor"
              class="pointer-events-none text-brand-900 dark:text-brand-100"
            >
              {{ z.nombre }}
            </text>
          </g>

          <!-- Marcador céntrico (Zócalo) -->
          <g class="pointer-events-none" aria-hidden="true">
            <circle :cx="MAPA_META.centro.x" :cy="MAPA_META.centro.y" r="24" class="fill-brand-600/10" />
            <circle :cx="MAPA_META.centro.x" :cy="MAPA_META.centro.y" r="6" class="fill-brand-600" stroke="white" stroke-width="2" />
            <text
              :x="MAPA_META.centro.x"
              :y="MAPA_META.centro.y - 12"
              text-anchor="middle"
              font-size="11"
              font-weight="700"
              fill="currentColor"
              class="text-ink-700 dark:text-ink-100"
            >
              Centro
            </text>
          </g>
        </svg>

        <!-- Leyenda -->
        <div class="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-600 dark:text-ink-300">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-inset ring-ink-200/70 dark:bg-ink-950/40 dark:ring-ink-700">
            <span class="size-2.5 rounded-full bg-brand-500" aria-hidden="true" />
            CDMX
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-inset ring-ink-200/70 dark:bg-ink-950/40 dark:ring-ink-700">
            <span class="size-2.5 rounded-full bg-ink-400" aria-hidden="true" />
            Estado de México
          </span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-inset ring-ink-200/70 dark:bg-ink-950/40 dark:ring-ink-700">
            <IconInfoCircle aria-hidden="true" class="size-3.5 text-brand-600" />
            Límites oficiales (INEGI/CONABIO) simplificados.
          </span>
        </div>
      </div>

      <!-- Panel de zona seleccionada -->
      <section
        v-reveal="{ from: 'right' }"
        class="relative overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-200/60 dark:bg-ink-900 dark:ring-ink-800"
        aria-live="polite"
        data-testid="map-panel"
      >
        <div v-if="zonaSeleccionada">
          <p class="text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">
            Zona seleccionada
          </p>
          <h3 class="mt-1 flex items-center gap-2.5 text-2xl font-bold tracking-tight text-ink-950 dark:text-white">
            <span class="relative flex size-2" aria-hidden="true">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-70" />
              <span class="relative inline-flex size-2 rounded-full bg-brand-600" />
            </span>
            {{ zonaSeleccionada.nombre }}
          </h3>
          <dl class="mt-4 space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <dt class="mt-0.5"><IconMapPin aria-hidden="true" class="size-5 text-brand-600" /></dt>
              <dd class="text-ink-600 dark:text-ink-300">
                {{ zonaSeleccionada.estado === 'CDMX' ? 'Alcaldía de la Ciudad de México' : 'Municipio del Estado de México' }}
              </dd>
            </div>
            <div class="flex items-start gap-3">
              <dt class="mt-0.5"><IconClock aria-hidden="true" class="size-5 text-brand-600" /></dt>
              <dd class="text-ink-600 dark:text-ink-300">
                Tiempo estimado de llegada: <strong class="text-ink-900 dark:text-white">{{ zonaSeleccionada.tiempoEstimado }}</strong>
              </dd>
            </div>
          </dl>
          <a
            href="#agendar"
            class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-5 py-3 font-semibold text-white shadow-cta ring-1 ring-inset ring-white/10 transition-all duration-150 hover:from-brand-400 hover:to-brand-600 hover:shadow-panel active:translate-y-px"
            data-testid="map-schedule-cta"
          >
            <IconCalendarEvent aria-hidden="true" class="size-5" />
            Agendar visita en {{ zonaSeleccionada.nombre }}
          </a>
        </div>

        <div v-else>
          <h3 class="text-lg font-bold text-ink-950 dark:text-white">Elige tu zona</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Selecciona tu alcaldía o municipio en el mapa, o búscalo en la lista de abajo.
            Prellenamos tu cita con la zona para ahorrarte tiempo.
          </p>
        </div>
      </section>
    </div>

    <!-- Lista rápida de zonas -->
    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">
          Ciudad de México · {{ zonasCdmx.length }} alcaldías
        </h3>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li v-for="z in zonasCdmx" :key="z.id">
            <button
              type="button"
              :data-testid="`chip-${z.id}`"
              class="rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset ring-ink-200 transition-colors hover:ring-brand-400 dark:ring-ink-700"
              :class="zonaSeleccionada?.id === z.id ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-700 hover:text-brand-700 dark:bg-ink-900 dark:text-ink-200'"
              @click="seleccionarZona(z.id)"
            >
              {{ z.nombre }}
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">
          Estado de México · {{ zonasEdomex.length }} municipios
        </h3>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li v-for="z in zonasEdomex" :key="z.id">
            <button
              type="button"
              :data-testid="`chip-${z.id}`"
              class="rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset ring-ink-200 transition-colors hover:ring-brand-400 dark:ring-ink-700"
              :class="zonaSeleccionada?.id === z.id ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-700 hover:text-brand-700 dark:bg-ink-900 dark:text-ink-200'"
              @click="seleccionarZona(z.id)"
            >
              {{ z.nombre }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </UiSection>
</template>