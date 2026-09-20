<script setup lang="ts">
defineProps<{
  id?: string
  className?: string
}>()
</script>

<template>
  <!-- Padding vertical unificado: hereda del token spacing.section
       (tailwind.config.ts). Todas las secciones que usan UiSection comparten
       el mismo espaciado; no hardcodear py-* aquí ni en los componentes. -->
  <section :id="id" :class="['py-section', className]">
    <div class="page-container">
      <slot />
    </div>
  </section>
</template>