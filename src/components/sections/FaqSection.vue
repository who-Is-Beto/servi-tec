<script setup lang="ts">
import { IconChevronDown } from '@tabler/icons-vue'
import { FAQ } from '@/data/faq'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <UiSection id="faq" class="bg-ink-50/50 dark:bg-ink-900/40">
    <div class="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
      <SectionHeading
        title="Preguntas frecuentes"
        intro="Lo que más nos preguntan antes de agendar. ¿Algo más? Llámanos, te respondemos directo."
      />

      <div class="space-y-3">
        <details
          v-for="(item, i) in FAQ"
          :key="i"
          v-reveal="{ delay: Math.min(i, 3) * 80 }"
          class="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-ink-200/60 transition-all duration-200 hover:shadow-card open:ring-brand-300/70 open:shadow-card hover:open:shadow-card-hover dark:bg-ink-900 dark:ring-ink-800 dark:open:ring-brand-600/60"
        >
          <span
            aria-hidden="true"
            class="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 transition-opacity duration-200 group-open:opacity-100"
          />
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold text-ink-950 [&::-webkit-details-marker]:hidden dark:text-white"
          >
            {{ item.pregunta }}
            <span
              aria-hidden="true"
              class="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-all duration-200 group-open:rotate-180 group-open:bg-brand-600 group-open:text-white dark:bg-ink-950 dark:text-brand-300 dark:group-open:bg-brand-600 dark:group-open:text-white"
            >
              <IconChevronDown class="size-4" />
            </span>
          </summary>
          <p class="px-5 pb-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {{ item.respuesta }}
          </p>
        </details>
      </div>
    </div>
  </UiSection>
</template>