<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IconMapPin, IconClock, IconCalendarEvent, IconInfoCircle } from '@tabler/icons-vue'
import { ZONAS_CDMX, ZONAS_EDOMEX, zonaPorId } from '@/data/zonas'
import { CDMX_MAPA, EDOMEX_MAPA, EDOMEX_CONTEXTO, MAPA_META } from '@/data/zonas-mapa'
import { useSchedulingStore } from '@/stores/scheduling'

/**
 * Mapa real de la ZMCM (geometría oficial INEGI/CONABIO 2022, simplificada;
 * ver scripts/build-map.mjs). CDMX y el cinturón EDOMEX cubierto son piezas
 * clicables: click/tap selecciona la zona (store + ?zona=id en la URL).
 * Los municipios de contexto del EDOMEX se pintan inertes.
 */

const route = useRoute()
const router = useRouter()
const store = useSchedulingStore()

const zonasCdmx = ZONAS_CDMX
const zonasEdomex = ZONAS_EDOMEX

const zonaSeleccionada = computed(() => {
  const id = store.form.zonaId || (Array.isArray(route.query.zona) ? route.query.zona[0] : route.query.zona)
  const zona = typeof id === 'string' ? zonaPorId(id) : undefined
  return zona
})

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

    <div class="mt-12 grid items-start gap-8 lg:grid-cols-[1.7fr_1fr]">
      <!-- Mapa real -->
      <div
        v-reveal="{ from: 'left' }"
        class="rounded-3xl bg-white p-4 shadow-card ring-1 ring-ink-200/60 sm:p-6 dark:bg-ink-900 dark:ring-ink-800"
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
        <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-600 dark:text-ink-300">
          <span class="inline-flex items-center gap-1.5">
            <span class="size-3 rounded-sm bg-brand-500" aria-hidden="true" />
            CDMX
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span class="size-3 rounded-sm bg-ink-400" aria-hidden="true" />
            Estado de México
          </span>
          <span class="inline-flex items-center gap-1.5">
            <IconInfoCircle aria-hidden="true" class="size-3.5" />
            Límites oficiales (INEGI/CONABIO) simplificados.
          </span>
        </div>
      </div>

      <!-- Panel de zona seleccionada -->
      <section
        v-reveal="{ from: 'right' }"
        class="rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-200/60 dark:bg-ink-900 dark:ring-ink-800"
        aria-live="polite"
        data-testid="map-panel"
      >
        <div v-if="zonaSeleccionada">
          <p class="text-xs font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">
            Zona seleccionada
          </p>
          <h3 class="mt-1 text-2xl font-bold tracking-tight text-ink-950 dark:text-white">
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