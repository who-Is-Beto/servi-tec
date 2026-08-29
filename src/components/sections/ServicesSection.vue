<script setup lang="ts">
import { markRaw, type Component } from 'vue'
import { IconWashMachine, IconWashTumbleDry, IconFridge, IconCooker, IconGlassFull, IconMicrowave } from '@tabler/icons-vue'
import type { ServicioIcono } from '@/types'
import { SERVICIOS } from '@/data/servicios'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const iconos: Record<ServicioIcono, Component> = {
  lavadora: markRaw(IconWashMachine),
  secadora: markRaw(IconWashTumbleDry),
  refrigerador: markRaw(IconFridge),
  estufa: markRaw(IconCooker),
  lavavajillas: markRaw(IconGlassFull),
  microondas: markRaw(IconMicrowave),
}

/**
 * Bento asimétrico: fila 1 con dos celdas destacadas (2+2) y fila 2 con
 * cuatro celdas (1+1+1+1). Variación real por celda (panel oscuro, halo,
 * gradiente) para evitar la rejilla de 3 tarjetas idénticas.
 */
const gridCols = (i: number): string => {
  if (i <= 1) return 'lg:col-span-2'
  return 'lg:col-span-1'
}
</script>

<template>
  <UiSection id="servicios" class="bg-paper-mute dark:bg-ink-950">
    <SectionHeading
      title="Reparación de línea blanca de todos los equipos"
      intro="Revisión en sitio de $200 acreditable a tu cotización y garantía de 90 días en el trabajo realizado. Atendemos las fallas más comunes de cada equipo."
    />

    <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(servicio, i) in SERVICIOS"
        :key="servicio.id"
        v-reveal="{ delay: (i % 4) * 80 }"
        :class="[
          'group relative overflow-hidden rounded-2xl p-6 ring-1 transition-all duration-200 hover:-translate-y-1 dark:ring-ink-800',
          gridCols(i),
          i === 0
            ? 'bg-white shadow-card ring-ink-200/60 hover:shadow-card-hover dark:bg-ink-900'
            : i === 1
              ? 'bg-ink-950 text-white shadow-panel ring-ink-800 hover:shadow-card-hover'
              : 'bg-white/70 ring-ink-200/50 hover:bg-white hover:shadow-card dark:bg-ink-900/70 dark:hover:bg-ink-900',
        ]"
      >
        <span
          v-if="i <= 1"
          aria-hidden="true"
          class="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-2xl transition-opacity duration-300"
          :class="i === 1 ? 'bg-brand-600/20 dark:bg-brand-500/20' : 'bg-brand-100/80 dark:bg-brand-950/40'"
        />

        <span
          v-if="i <= 1"
          aria-hidden="true"
          class="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/80 to-transparent transition-opacity duration-300 group-hover:via-brand-400"
        />

        <span
          class="relative grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-[0_8px_20px_-8px_rgba(28,54,161,0.55)] transition-transform duration-200 group-hover:scale-105"
          :class="i === 1 ? 'from-brand-400 to-brand-600' : 'from-brand-600 to-brand-800'"
          aria-hidden="true"
        >
          <component :is="iconos[servicio.icono]" class="size-6" />
        </span>

        <div class="relative mt-5">
          <h3
            class="text-lg font-bold tracking-tight"
            :class="i === 1 ? 'text-white' : 'text-ink-950 dark:text-white'"
          >
            {{ servicio.nombre }}
          </h3>
          <p
            class="mt-1.5 text-sm leading-relaxed"
            :class="i === 1 ? 'text-ink-300' : 'text-ink-600 dark:text-ink-300'"
          >
            {{ servicio.descripcion }}
          </p>
        </div>
      </li>
    </ul>
  </UiSection>
</template>