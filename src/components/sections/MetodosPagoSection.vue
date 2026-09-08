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
      </div>
    </div>
  </UiSection>
</template>
