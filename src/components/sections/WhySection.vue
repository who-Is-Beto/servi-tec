<script setup lang="ts">
import { IconCircleCheckFilled, IconHome, IconArrowRight } from '@tabler/icons-vue'
import { SITE } from '@/data/config'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const beneficios = [
  {
    titulo: 'Refacciones originales',
    texto: 'Trabajamos con partes originales para resultados duraderos y evitar visitas repetidas.',
  },
  {
    titulo: 'Servicio urgente el mismo día',
    texto: 'Coordinamos una urgencia a domicilio el mismo día que nos contactas.',
  },
  {
    titulo: 'Atención los 365 días las 24 hrs',
    texto: 'Soporte y agendado disponible todos los días del año.',
  },
  {
    titulo: 'Garantía por escrito hasta por un año',
    texto: 'Respaldamos el trabajo realizado y las refacciones que instalamos.',
  },
]
</script>

<template>
  <UiSection id="beneficios" class="bg-paper dark:bg-ink-950">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- Checklist -->
      <div>
        <SectionHeading
          title="Beneficios y características"
          intro="Un centro de servicio especializado que cuida tu equipo y tu bolsillo."
        />

        <ul class="mt-8 space-y-4">
          <li
            v-for="(b, i) in beneficios"
            :key="b.titulo"
            v-reveal="{ delay: i * 70 }"
            class="flex items-start gap-4"
          >
            <IconCircleCheckFilled
              aria-hidden="true"
              class="mt-0.5 size-6 shrink-0 text-brand-600 dark:text-brand-400"
            />
            <div>
              <h3 class="text-base font-bold text-ink-950 dark:text-white">{{ b.titulo }}</h3>
              <p class="mt-0.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ b.texto }}</p>
            </div>
          </li>
        </ul>

        <!-- Badge de cobertura (enlaza con el mapa de zonas) -->
        <a
          href="#cobertura"
          class="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-800 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-200 dark:ring-brand-800 dark:hover:bg-brand-900"
          data-testid="cobertura-badge"
        >
          <IconHome aria-hidden="true" class="size-5 text-brand-600 dark:text-brand-400" />
          {{ SITE.coberturaBadge }}
          <IconArrowRight aria-hidden="true" class="size-4" />
        </a>
      </div>

      <!-- Imagen de técnico reparando una lavadora -->
      <div v-reveal="{ from: 'right' }" class="relative">
        <span
          aria-hidden="true"
          class="animate-pulse-soft pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-brand-500/15 via-transparent to-brand-300/10 blur-2xl [animation-duration:7s]"
        />
        <figure class="overflow-hidden rounded-[2rem] shadow-panel ring-1 ring-ink-200/60 dark:ring-ink-800">
          <!--
            Imagen adaptativa: en mobile/tablet la lavadora individual
            (washer-machine, cuadrada y limpia); en desktop la lavadora +
            secadora (washer-machine-dryer), que transmite mayor amplitud de
            servicio. Fuente /public/img (optimizados PNG/WebP/AVIF).
          -->
          <picture>
            <source media="(min-width: 1024px)" srcset="/img/washer-machine-dryer.png" />
            <img
              src="/img/washer-machine.png"
              alt="Lavadora y secadora de línea blanca reparadas a domicilio por TecServi"
              width="1200"
              height="900"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover"
            />
          </picture>
        </figure>
      </div>
    </div>
  </UiSection>
</template>
