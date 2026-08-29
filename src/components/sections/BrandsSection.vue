<script setup lang="ts">
import { IconTool } from '@tabler/icons-vue'
import { MARCAS } from '@/data/marcas'
import { LEGAL } from '@/data/config'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const marcaPrincipal = MARCAS[0]?.nombre ?? 'las principales marcas'
</script>

<template>
  <UiSection id="marcas" class="bg-ink-50/50 dark:bg-ink-900/40">
    <SectionHeading
      :title="`Servicio especializado en ${marcaPrincipal} y más`"
      intro="No somos centro de servicio oficial de ninguna marca: ofrecemos reparación especializada con refacciones originales o equivalentes compatibles, lo que permite costos más accesibles."
    />

    <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(marca, i) in MARCAS"
        :key="marca.id"
        v-reveal="{ delay: (i % 4) * 90 }"
        class="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-ink-200/60 transition-all hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-200 dark:bg-ink-900 dark:ring-ink-800"
      >
        <div
          class="grid h-20 shrink-0 place-items-center rounded-xl bg-white ring-1 ring-inset ring-ink-100 transition-all duration-200 group-hover:ring-brand-300 dark:ring-ink-800"
          aria-hidden="true"
        >
          <img
            v-if="marca.logo"
            :src="marca.logo"
            alt=""
            class="h-14 w-auto max-w-[10rem] object-contain grayscale transition-all duration-200 group-hover:grayscale-0"
            loading="lazy"
          />
          <BrandLogo v-else :marca="marca" class="h-11 w-auto max-w-[11rem]" />
        </div>
        <h3 class="mt-5 text-lg font-bold tracking-tight text-ink-950 dark:text-white">
          {{ marca.nombre }}
        </h3>
        <p class="mt-1.5 flex items-start gap-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          <IconTool aria-hidden="true" class="mt-0.5 size-4 shrink-0" :style="{ color: marca.color }" />
          {{ marca.descripcion }}
        </p>
      </li>
    </ul>

    <p class="mt-10 max-w-3xl text-xs leading-relaxed text-ink-600 dark:text-ink-400">
      {{ LEGAL.declaracionIndependencia }}
    </p>
  </UiSection>
</template>