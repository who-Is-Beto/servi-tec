<script setup lang="ts">
import { MARCAS } from '@/data/marcas'
import { LEGAL } from '@/data/config'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const marcaPrincipal = MARCAS[0]?.nombre ?? 'las principales marcas'
</script>

<template>
  <UiSection id="marcas" class="bg-paper-mute dark:bg-ink-950">
    <SectionHeading
      :title="`Servicio especializado en ${marcaPrincipal} y más`"
      intro="No somos centro de servicio oficial de ninguna marca: ofrecemos reparación especializada con refacciones originales o equivalentes compatibles, lo que permite costos más accesibles."
    />

    <!-- Cinta de marcas en movimiento perpetuo (se pausa al pasar el cursor) -->
    <div
      v-reveal
      class="relative mt-12 overflow-hidden"
      role="list"
      aria-label="Marcas que atendemos"
    >
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper-mute to-transparent sm:w-28 dark:from-ink-950"
      />
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper-mute to-transparent sm:w-28 dark:from-ink-950"
      />

      <ul
        class="animate-marquee group flex w-max items-center gap-4 hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        <li v-for="n in 2" :key="n" class="flex items-center gap-4">
          <template v-for="m in MARCAS" :key="`${n}-${m.id}`">
            <div
              class="flex h-20 items-center justify-center rounded-2xl border border-ink-200/60 bg-white px-7 shadow-sm transition-colors group-hover:border-brand-200 dark:border-ink-800 dark:bg-ink-900 dark:group-hover:border-brand-600/60"
            >
              <img
                v-if="m.logo"
                :src="m.logo"
                alt=""
                class="h-12 w-auto max-w-[8.5rem] object-contain opacity-80 grayscale transition-all duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
              <BrandLogo v-else :marca="m" class="h-10 w-auto max-w-[9rem]" />
            </div>
            <span aria-hidden="true" class="hidden text-xl font-bold text-ink-300 sm:block lg:text-2xl dark:text-ink-700">
              ·
            </span>
          </template>
        </li>
      </ul>
    </div>

    <!-- Nombres para lectores de pantalla (la cinta es decorativa) -->
    <ul class="sr-only">
      <li v-for="m in MARCAS" :key="m.id">{{ m.nombre }}</li>
    </ul>

    <p class="mt-10 max-w-3xl text-xs leading-relaxed text-ink-600 dark:text-ink-400">
      {{ LEGAL.declaracionIndependencia }}
    </p>
  </UiSection>
</template>