<script setup lang="ts">
import { computed } from 'vue'
import IconPhone from '@tabler/icons-vue/dist/esm/icons/IconPhone.mjs'
import IconCalendarEvent from '@tabler/icons-vue/dist/esm/icons/IconCalendarEvent.mjs'
import IconArrowRight from '@tabler/icons-vue/dist/esm/icons/IconArrowRight.mjs'
import IconMapPin from '@tabler/icons-vue/dist/esm/icons/IconMapPin.mjs'
import IconCheck from '@tabler/icons-vue/dist/esm/icons/IconCheck.mjs'
import { SITE, CLAIMS, WHATSAPP } from '@/data/config'
import { useUtm } from '@/composables/useUtm'
import { useConversion } from '@/composables/useConversion'
import AppButton from '@/components/ui/AppButton.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'

const { utmHeadline } = useUtm()
const headline = computed(() => utmHeadline ?? CLAIMS.hero.titulo)

const { trackCall, trackWhatsApp } = useConversion()

// Menú de confianza mínimo: tres garantías legibles, sin badges ni tablas.
const garantias = [
  'Revisión de $200 acreditable',
  'Garantía escrita de 90 días',
  'Urgencias el mismo día',
]
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-ink-950 text-white">
    <!-- Fondo ambiental contenido: una sola mancha de acento, sin ruido -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute -top-40 right-[-10%] size-[40rem] rounded-full bg-brand-600/20 blur-[120px]"
      />
      <div
        class="absolute bottom-[-20%] left-[-5%] size-[32rem] rounded-full bg-brand-500/10 blur-[110px]"
      />
    </div>
    <div aria-hidden="true" class="bg-grid-faint absolute inset-0 -z-10 opacity-50" />

    <div
      class="page-container grid items-center gap-14 pb-20 pt-28 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28 lg:pt-40"
    >
      <!-- Copia de venta -->
      <div class="max-w-2xl">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
          {{ SITE.region }}
        </p>

        <h1
          class="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tighter text-balance sm:text-5xl lg:text-6xl"
        >
          {{ headline }}
        </h1>

        <p class="mt-5 max-w-[58ch] text-lg leading-relaxed text-ink-300">
          {{ CLAIMS.hero.subtitulo }}
        </p>

        <!-- Una sola acción primaria: WhatsApp. El teléfono queda como respaldo. -->
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            :href="WHATSAPP.enlace"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-whatsapp"
            class="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#188038] px-7 py-4 text-base font-semibold text-white shadow-[0_12px_28px_-12px_rgba(31,189,90,0.7)] ring-1 ring-inset ring-white/20 transition-all duration-150 hover:bg-[#12602a] active:translate-y-px active:scale-[0.985]"
            @click="trackWhatsApp('hero')"
          >
            <WhatsAppIcon class="size-5" />
            Agendar por WhatsApp
          </a>
          <AppButton
            :href="`tel:${SITE.telefono}`"
            variant="secondary"
            size="lg"
            data-testid="hero-phone"
            @click="trackCall()"
          >
            <IconPhone aria-hidden="true" class="size-5" />
            <span class="tnum">{{ SITE.telefonoDisplay }}</span>
          </AppButton>
        </div>

        <!-- Confianza sin tablas: línea de garantías -->
        <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-300">
          <li v-for="g in garantias" :key="g" class="flex items-center gap-2">
            <IconCheck aria-hidden="true" class="size-4 text-brand-300" />
            {{ g }}
          </li>
        </ul>
      </div>

      <!-- Visual: foto limpia, una sola leyenda -->
      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <figure class="group relative overflow-hidden rounded-3xl shadow-panel ring-1 ring-white/10">
          <picture>
            <source srcset="/img/hero-reparacion.avif" type="image/avif" />
            <source srcset="/img/hero-reparacion.webp" type="image/webp" />
            <img
              src="/img/hero-reparacion.jpg"
              alt="Técnico de TecServi reparando una lavadora a domicilio en la Zona Metropolitana del Valle de México"
              width="1200"
              height="900"
              loading="eager"
              fetchpriority="high"
              class="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </picture>
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/5 to-transparent" />
          <figcaption
            class="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink-950/70 px-3.5 py-2 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-md"
          >
            <IconMapPin aria-hidden="true" class="size-4 text-brand-300" />
            Reparación a domicilio, sin llevar el equipo
          </figcaption>
        </figure>
      </div>
    </div>

    <!-- Camino secundario: el formulario, sin competir con WhatsApp -->
    <div class="page-container relative border-t border-white/10 py-6">
      <a
        href="#agendar"
        class="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-200 transition-colors hover:text-white"
      >
        <IconCalendarEvent aria-hidden="true" class="size-4 text-brand-300" />
        Prefieres un formulario completo
        <IconArrowRight aria-hidden="true" class="size-4 transition-transform duration-150 group-hover:translate-x-1" />
      </a>
    </div>
  </section>
</template>
