<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import MobileCallBar from '@/components/layout/MobileCallBar.vue'
</script>

<template>
  <a
    href="#contenido"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toaster focus:rounded-xl focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
  >
    Saltar al contenido
  </a>

  <SiteHeader />

  <main id="contenido">
    <RouterView />
  </main>

  <SiteFooter />
  <MobileCallBar />
</template>