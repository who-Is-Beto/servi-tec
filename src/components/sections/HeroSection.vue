<script setup lang="ts">
import { computed } from 'vue'
import { IconPhone, IconCalendarEvent, IconMapPin, IconWashMachine, IconArrowRight } from '@tabler/icons-vue'
import { SITE, CLAIMS } from '@/data/config'
import { useUtm } from '@/composables/useUtm'
import { useConversion } from '@/composables/useConversion'
import AppButton from '@/components/ui/AppButton.vue'

const { utmHeadline } = useUtm()

// UTM de campañas (Google Ads / Meta Ads). El layout no depende de la foto:
// si la imagen falla, el bloque derecho queda compensado con el panel real.
const headline = computed(() => utmHeadline ?? CLAIMS.hero.titulo)

// Palabra clave con gradiente (único gradiente de texto de la página).
// Se aplica solo si la UTM no sustituyó el titular, y preserva el texto plano.
const PALABRA = 'Línea blanca'
const headlineParts = computed(() => {
  const idx = headline.value.toLowerCase().indexOf(PALABRA.toLowerCase())
  if (idx === -1) return [{ text: headline.value, accent: false }]
  return [
    { text: headline.value.slice(0, idx), accent: false },
    { text: headline.value.slice(idx, idx + PALABRA.length), accent: true },
    { text: headline.value.slice(idx + PALABRA.length), accent: false },
  ]
})

const { trackCall } = useConversion()
</script>

<template>
  <section id="inicio" class="relative overflow-hidden">
    <!-- Profundidad: dos halos de la misma familia de acento, con deriva lenta -->
    <div
      aria-hidden="true"
      class="halo-uno pointer-events-none absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full bg-brand-200/70 blur-3xl dark:bg-brand-950/90"
    />
    <div
      aria-hidden="true"
      class="halo-dos pointer-events-none absolute -bottom-56 -left-44 -z-10 size-[30rem] rounded-full bg-brand-100/80 blur-3xl dark:bg-brand-950/60"
    />

    <div class="page-container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <!-- Copia de venta (máx. 4 grupos de contenido) -->
      <div class="max-w-xl">
        <p
          class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-800 shadow-card ring-1 ring-inset ring-brand-200/70 backdrop-blur-sm dark:bg-ink-900/80 dark:text-brand-300 dark:ring-brand-950"
        >
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-brand-500 opacity-60" />
            <span class="relative inline-flex size-2 rounded-full bg-brand-600" />
          </span>
          <IconWashMachine aria-hidden="true" class="size-3.5" />
          Línea blanca · CDMX y zona metropolitana
        </p>

        <h1
          class="mt-5 text-4xl font-bold leading-[1.05] tracking-tighter text-ink-950 text-balance sm:text-5xl lg:text-6xl dark:text-white"
        >
          <template v-for="(part, idx) in headlineParts" :key="idx">
            <span
              v-if="part.accent"
              class="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-transparent dark:from-brand-300 dark:via-brand-400 dark:to-brand-200"
            >{{ part.text }}</span>
            <template v-else>{{ part.text }}</template>
          </template>
        </h1>

        <p class="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-600 dark:text-ink-300">
          {{ CLAIMS.hero.subtitulo }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <AppButton :href="`tel:${SITE.telefono}`" variant="primary" size="lg" data-testid="hero-phone" @click="trackCall()">
            <IconPhone aria-hidden="true" class="size-5" />
            <span class="tnum">{{ SITE.telefonoDisplay }}</span>
          </AppButton>
          <AppButton href="#agendar" variant="secondary" size="lg">
            <IconCalendarEvent aria-hidden="true" class="size-5" />
            Agendar visita
          </AppButton>
        </div>
      </div>

      <!-- Visual profesional (foto real en AVIF/WebP, sin ilustración plana) -->
      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <figure class="group relative overflow-hidden rounded-3xl ring-1 ring-ink-200/60 shadow-panel dark:ring-ink-800">
          <picture>
            <source srcset="/img/hero-reparacion.avif" type="image/avif" />
            <source srcset="/img/hero-reparacion.webp" type="image/webp" />
            <img
              src="/img/hero-reparacion.jpg"
              alt="Técnico reparando una lavadora a domicilio en la Zona Metropolitana del Valle de México"
              width="1200"
              height="900"
              loading="eager"
              fetchpriority="high"
              class="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </picture>
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-ink-950/5 to-transparent" />
          <div
            aria-hidden="true"
            class="absolute inset-0 ring-1 ring-inset ring-white/10 ring-offset-0"
          />
        </figure>

        <!-- Panel glass de cobertura sobre la foto -->
        <div
          class="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl bg-white/85 p-4 shadow-panel ring-1 ring-inset ring-white/50 backdrop-blur-xl dark:bg-ink-900/85 dark:ring-ink-800/60"
        >
          <div>
            <p class="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              <IconMapPin aria-hidden="true" class="size-3.5 text-brand-600" />
              Cobertura
            </p>
            <p class="mt-1 text-sm font-bold text-ink-950 dark:text-white">
              {{ CLAIMS.hero.cobertura }}
            </p>
          </div>
          <a
            href="#cobertura"
            class="group shrink-0 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-cta transition-all hover:bg-brand-700 active:scale-[0.98]"
          >
            Ver mapa
            <IconArrowRight aria-hidden="true" class="-mr-0.5 ml-1 inline size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>