<script setup lang="ts">
import { TESTIMONIOS } from '@/data/testimonios'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
</script>

<template>
  <UiSection id="testimonios">
    <SectionHeading
      title="Lo que dicen nuestros clientes"
      intro="Opiniones de vecinos de la zona que han usado el servicio. Los nombres se publican con autorización."
    />

    <ul class="mt-12 grid gap-6 md:grid-cols-3">
      <li
        v-for="(t, i) in TESTIMONIOS"
        :key="i"
        v-reveal="{ delay: i * 110 }"
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1"
        :class="[
          i % 2 === 0
            ? 'bg-ink-950 text-white ring-1 ring-ink-800'
            : 'bg-white text-ink-900 ring-1 ring-ink-200/60 dark:bg-ink-900 dark:text-white dark:ring-ink-800',
          i === 1 && 'md:mt-10',
        ]"
      >
        <blockquote
          class="text-base leading-relaxed"
          :class="i % 2 === 0 ? 'text-ink-100' : 'text-ink-700 dark:text-ink-300'"
        >
          &ldquo;{{ t.cita }}&rdquo;
        </blockquote>
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