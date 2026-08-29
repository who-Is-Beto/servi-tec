<script setup lang="ts">
import { IconCircleCheckFilled } from '@tabler/icons-vue'
import { TESTIMONIOS } from '@/data/testimonios'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <UiSection id="testimonios">
    <SectionHeading
      title="Lo que dicen nuestros clientes"
      intro="Opiniones reales de vecinos de la zona que han usado el servicio. Los nombres se publican con autorización."
    />

    <ul class="mt-12 grid gap-6 md:grid-cols-3">
      <li
        v-for="(t, i) in TESTIMONIOS"
        :key="i"
        v-reveal="{ delay: i * 110 }"
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1"
        :class="[
          i % 2 === 0
            ? 'bg-ink-950 text-white shadow-card-hover ring-1 ring-ink-800'
            : 'bg-white text-ink-900 ring-1 ring-ink-200/60 shadow-card dark:bg-ink-900 dark:text-white dark:ring-ink-800',
          i === 1 && 'md:mt-10',
        ]"
      >
        <span
          aria-hidden="true"
          class="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          class="pointer-events-none absolute -right-3 -top-8 select-none font-serif text-[7rem] leading-none"
          :class="i % 2 === 0 ? 'text-brand-500/20' : 'text-brand-100 dark:text-brand-950/60'"
        >
          &rdquo;
        </span>
        <div class="relative">
          <div class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" :class="i % 2 === 0 ? 'bg-brand-500/15 text-brand-300' : 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'" aria-hidden="true">
            <IconCircleCheckFilled class="size-3.5" />
            <span class="text-[0.7rem] font-semibold uppercase tracking-wider">
              Cliente verificado
            </span>
          </div>
          <blockquote
            class="mt-5 text-base leading-relaxed"
            :class="i % 2 === 0 ? 'text-ink-100' : 'text-ink-700 dark:text-ink-300'"
          >
            &ldquo;{{ t.cita }}&rdquo;
          </blockquote>
        </div>
        <footer class="mt-6">
          <p class="text-sm font-bold" :class="i % 2 === 0 ? 'text-white' : 'text-ink-950 dark:text-white'">
            {{ t.autor }}
          </p>
          <p class="mt-0.5 text-xs font-medium" :class="i % 2 === 0 ? 'text-ink-400' : 'text-ink-600 dark:text-ink-400'">
            {{ t.zona }}
          </p>
        </footer>
      </li>
    </ul>
  </UiSection>
</template>