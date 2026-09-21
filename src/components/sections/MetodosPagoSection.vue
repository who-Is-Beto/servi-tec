<script setup lang="ts">
import { IconCash, IconArrowsExchange, IconCreditCard } from '@tabler/icons-vue'
import { METODOS_PAGO } from '@/data/metodosPago'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const ICONOS = {
  cash: IconCash,
  transfer: IconArrowsExchange,
  card: IconCreditCard,
} as const
</script>

<template>
  <UiSection id="pagos" class="bg-paper dark:bg-ink-950">
    <SectionHeading
      title="Métodos de pago"
      intro="Paga como prefieras, de forma segura y abierta. Sin cargos ocultos."
    />

    <div class="mt-12 grid gap-4 sm:grid-cols-3">
      <div
        v-for="(m, i) in METODOS_PAGO"
        :key="m.id"
        v-reveal="{ delay: i * 90 }"
        class="flex flex-col items-center rounded-3xl bg-white p-7 text-center ring-1 ring-ink-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card dark:bg-ink-900 dark:ring-ink-800"
        data-testid="metodo-pago"
      >
        <span
          class="grid size-14 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-cta"
          aria-hidden="true"
        >
          <component :is="ICONOS[m.icono]" class="size-7" />
        </span>
        <h3 class="mt-4 text-base font-bold text-ink-950 dark:text-white">{{ m.label }}</h3>
        <p class="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ m.detalle }}</p>

        <!-- Logos de tarjeta: WebP con fallback PNG, centrados y sin amontonarse -->
        <ul v-if="m.logos?.length" class="mt-5 flex flex-wrap items-center justify-center gap-2.5" aria-label="Tarjetas aceptadas">
          <li v-for="l in m.logos" :key="l.alt" class="flex h-9 items-center rounded-lg bg-white px-2.5 shadow-sm ring-1 ring-inset ring-ink-200/70 dark:bg-ink-950 dark:ring-ink-700">
            <picture>
              <source :srcset="l.src" type="image/webp" />
              <img
                :src="l.fallback"
                :alt="l.alt"
                class="h-6 w-auto max-w-[5.5rem] object-contain"
                width="96"
                height="32"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </li>
        </ul>
      </div>
    </div>
  </UiSection>
</template>
