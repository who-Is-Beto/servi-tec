<script setup lang="ts">
defineProps<{
  id?: string
  className?: string
}>()
</script>

<template>
  <section :id="id" :class="['py-16 sm:py-24 lg:py-28', className]">
    <div class="page-container">
      <slot />
    </div>
  </section>
</template>