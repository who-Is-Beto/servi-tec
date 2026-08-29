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
    <p
      v-if="intro"
      class="mt-4 max-w-[65ch] text-base leading-relaxed text-ink-600 dark:text-ink-300"
    >
      {{ intro }}
    </p>
  </div>
</template>