<script setup lang="ts">
import { computed } from 'vue'
import {
  IconPhone,
  IconCalendarEvent,
  IconMapPin,
  IconWashMachine,
  IconArrowRight,
  IconShieldCheck,
  IconBolt,
  IconClock,
  IconCalculator,
} from '@tabler/icons-vue'
import { SITE, CLAIMS } from '@/data/config'
import { ZONAS_CDMX, ZONAS_EDOMEX } from '@/data/zonas'
import { useUtm } from '@/composables/useUtm'
import { useConversion } from '@/composables/useConversion'
import AppButton from '@/components/ui/AppButton.vue'
import StatNumber from '@/components/ui/StatNumber.vue'

const { utmHeadline } = useUtm()

// UTM de campañas (Google Ads / Meta Ads). El layout no depende de la foto:
// si la imagen falla, el bloque derecho queda compensado con el panel real.
const headline = computed(() => utmHeadline ?? CLAIMS.hero.titulo)

// Palabra clave con gradiente animado. Se aplica solo si la UTM no
// sustituyó el titular, y preserva el texto plano.
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

// Datos reales (no inventados) para la franja de confianza.
const stats = [
  { texto: 'Alcaldías de la CDMX', valor: ZONAS_CDMX.length, prefijo: '', sufijo: '' },
  { texto: 'Municipios de EDOMEX', valor: ZONAS_EDOMEX.length, prefijo: '', sufijo: '' },
  { texto: 'Revisión acreditable', valor: CLAIMS.costoRevision.pesos, prefijo: '$', sufijo: '' },
  { texto: 'Años de experiencia', valor: CLAIMS.experienciaAnios, prefijo: '+', sufijo: '' },
]

const { trackCall } = useConversion()
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-ink-950 text-white">
    <!-- Aurora ambiental: tres manchas de la familia cobalt, en deriva lenta -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="animate-drift absolute -top-44 left-[6%] size-[42rem] rounded-full bg-brand-600/25 blur-[110px] [animation-duration:22s]"
      />
      <div
        class="animate-drift absolute -bottom-56 right-[2%] size-[38rem] rounded-full bg-brand-400/15 blur-[120px] [animation-duration:28s] [animation-direction:reverse]"
      />
      <div
        class="animate-pulse-soft absolute left-[42%] top-[28%] size-[24rem] rounded-full bg-brand-500/20 blur-[90px] [animation-duration:8s]"
      />
    </div>
    <div aria-hidden="true" class="bg-grid-faint absolute inset-0 -z-10 opacity-70" />

    <div
      class="page-container relative grid items-center gap-14 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20 lg:pt-44"
    >
      <!-- Copia de venta -->
      <div class="max-w-xl">
        <p
          class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-200 backdrop-blur-sm"
        >
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-70" />
            <span class="relative inline-flex size-2 rounded-full bg-brand-300" />
          </span>
          <IconWashMachine aria-hidden="true" class="size-3.5" />
          Especialistas en línea blanca · CDMX y zona metropolitana
        </p>

        <h1
          class="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tighter text-balance sm:text-6xl lg:text-[4.25rem]"
        >
          <template v-for="(part, idx) in headlineParts" :key="idx">
            <span
              v-if="part.accent"
              class="text-shimmer inline-block bg-gradient-to-r from-brand-300 via-white to-brand-300 bg-clip-text text-transparent"
              >{{ part.text }}</span
            >
            <template v-else>{{ part.text }}</template>
          </template>
        </h1>

        <p class="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-300">
          {{ CLAIMS.hero.subtitulo }}
        </p>

        <div class="mt-8 flex flex-wrap gap-2.5">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-ink-100 backdrop-blur-sm"
          >
            <IconShieldCheck aria-hidden="true" class="size-4 text-brand-300" />
            Garantía por escrito
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-ink-100 backdrop-blur-sm"
          >
            <IconBolt aria-hidden="true" class="size-4 text-brand-300" />
            Urgencias el mismo día
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-ink-100 backdrop-blur-sm"
          >
            <IconClock aria-hidden="true" class="size-4 text-brand-300" />
            Lun–Sáb · 9:00 a 19:00
          </span>
        </div>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div class="relative">
            <span
              aria-hidden="true"
              class="animate-pulse-soft absolute -inset-2 -z-10 rounded-[1.75rem] bg-brand-500/30 blur-xl [animation-duration:4s]"
            />
            <AppButton :href="`tel:${SITE.telefono}`" variant="primary" size="lg" data-testid="hero-phone" @click="trackCall()">
              <IconPhone aria-hidden="true" class="size-5" />
              <span class="tnum">{{ SITE.telefonoDisplay }}</span>
            </AppButton>
          </div>
          <a
            href="#agendar"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:border-white/25 hover:bg-white/10 active:translate-y-px"
          >
            <IconCalendarEvent aria-hidden="true" class="size-5" />
            Agendar visita
          </a>
        </div>
      </div>

      <!-- Colaje visual: foto principal + chips flotantes + instantánea -->
      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <span
          aria-hidden="true"
          class="animate-pulse-soft pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand-500/25 via-transparent to-brand-300/15 blur-2xl [animation-duration:7s]"
        />

        <figure
          class="group relative overflow-hidden rounded-[2rem] shadow-panel ring-1 ring-white/10"
        >
          <!--
            Hero responsivo: en mobile/tablet se sirve la lavadora individual
            (washer_machine, formato más vertical); en desktop la lavadora +
            secadora (washer_machine_dryer, formato más horizontal).
            Fuente: /src/assets/hero/*.png → optimizados (PNG/WebP/AVIF) en
            /public/img/washer-machine* (mismas rutas de abajo, generados con
            sharp). El <img> de abajo solo actúa como fallback para navegadores
            sin soporte <picture>.
          -->
          <picture>
            <source media="(min-width: 1024px)" srcset="/img/washer-machine-dryer.avif" type="image/avif" />
            <source media="(min-width: 1024px)" srcset="/img/washer-machine-dryer.webp" type="image/webp" />
            <source media="(min-width: 1024px)" srcset="/img/washer-machine-dryer.png" />
            <source srcset="/img/washer-machine.avif" type="image/avif" />
            <source srcset="/img/washer-machine.webp" type="image/webp" />
            <source srcset="/img/washer-machine.png" />
            <img
              src="/img/washer-machine.png"
              alt="Lavadora Samsung reparada por técnico especializado en CDMX"
              width="1200"
              height="900"
              loading="eager"
              fetchpriority="high"
              class="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] sm:aspect-[4/3] lg:aspect-[4/3]"
            />
          </picture>
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-bl from-brand-500/15 via-transparent to-transparent" />
          <figcaption
            class="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink-950/60 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur-md"
          >
            <IconMapPin aria-hidden="true" class="size-3.5 text-brand-300" />
            Reparación a domicilio, sin llevarte el equipo
          </figcaption>
        </figure>

        <!-- Chip flotante: revisión acreditable -->
        <div
          class="animate-floaty absolute -left-3 top-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/80 p-3.5 shadow-panel backdrop-blur-xl sm:flex [animation-delay:0.6s]"
          aria-hidden="true"
        >
          <span class="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <IconCalculator class="size-5" />
          </span>
          <span>
            <span class="block text-sm font-bold">${{ CLAIMS.costoRevision.pesos }} acreditable</span>
            <span class="block text-xs text-ink-400">si aceptas el presupuesto</span>
          </span>
        </div>

        <!-- Chip flotante: experiencia -->
        <div
          class="animate-floaty absolute -right-3 bottom-28 hidden items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/80 p-3.5 shadow-panel backdrop-blur-xl sm:flex [animation-delay:1.4s]"
          aria-hidden="true"
        >
          <span class="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white">
            <IconShieldCheck class="size-5" />
          </span>
          <span>
            <span class="block text-sm font-bold">+{{ CLAIMS.experienciaAnios }} años</span>
            <span class="block text-xs text-ink-400">técnicos especializados</span>
          </span>
        </div>

        <!-- Instantánea en diagonal (recorte de la misma foto) -->
        <div
          class="animate-floaty absolute -right-5 -top-12 hidden w-40 rotate-3 rounded-2xl border border-white/10 bg-ink-900/80 p-2 shadow-panel backdrop-blur-xl md:block [animation-delay:2s]"
          aria-hidden="true"
        >
          <img
            src="/img/washer-machine.png"
            alt=""
            width="480"
            height="360"
            loading="lazy"
            class="aspect-[4/3] w-full rounded-xl object-cover object-top"
          />
          <p class="px-1 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-ink-400">
            En tu hogar · equipo listo
          </p>
        </div>
      </div>
    </div>

    <!-- Franja de confianza con datos reales -->
    <div class="page-container relative pb-12">
      <dl class="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-9 sm:grid-cols-4">
        <div v-for="(st, i) in stats" :key="st.texto" v-reveal="{ delay: i * 90 }">
          <dd class="text-3xl font-extrabold tracking-tight text-brand-300 sm:text-4xl">
            <StatNumber :value="st.valor" :prefix="st.prefijo" :suffix="st.sufijo" />
          </dd>
          <dt class="mt-1.5 text-sm font-medium text-ink-400">{{ st.texto }}</dt>
        </div>
      </dl>
      <a
        href="#marcas"
        class="mt-9 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
      >
        Marcas que atendemos
        <IconArrowRight aria-hidden="true" class="size-4" />
      </a>
    </div>
  </section>
</template>