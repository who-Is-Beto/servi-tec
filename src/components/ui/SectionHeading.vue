<script setup lang="ts">
/**
 * Encabezado de sección: título + (opcional) párrafo de entrada.
 * Sin "eyebrow" por defecto (regla Taste Skill: máx. 1 por cada 3 secciones).
 */
withDefaults(
  defineProps<{
    title: string
    intro?: string
    className?: string
  }>(),
  { intro: undefined, className: '' },
)
</script>

<template>
  <div v-reveal :class="['max-w-2xl', className]">
    <h2 class="text-3xl font-bold leading-[1.1] tracking-tighter text-ink-950 text-balance sm:text-4xl dark:text-white">
      {{ title }}
    </h2>
    <span
      aria-hidden="true"
      class="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
    />
    <p
      v-if="intro"
      class="mt-4 max-w-[65ch] text-lg leading-relaxed tracking-tight text-ink-600 text-balance dark:text-ink-300"
    >
      {{ intro }}
    </p>
  </div>
</template>