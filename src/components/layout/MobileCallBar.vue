<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import IconPhone from '@tabler/icons-vue/dist/esm/icons/IconPhone.mjs'
import IconCalendarEvent from '@tabler/icons-vue/dist/esm/icons/IconCalendarEvent.mjs'
import { SITE } from '@/data/config'
import { useConversion } from '@/composables/useConversion'

const { trackCall } = useConversion()

// En mobile la barra es fija al fondo: cuando el footer entra en pantalla se
// oculta deslizándose hacia abajo para no tapar la información legal.
const ocultar = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const footer = document.querySelector('footer')
  if (!footer) return
  observer = new IntersectionObserver((entries) => {
    ocultar.value = entries[0]?.isIntersecting ?? false
  })
  observer.observe(footer)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-callbar border-t border-ink-200/60 bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-all duration-300 ease-out md:hidden dark:border-ink-800 dark:bg-ink-950/95"
    :class="ocultar ? 'pointer-events-none invisible translate-y-full' : 'translate-y-0'"
  >
    <div class="page-container grid grid-cols-2 gap-2 py-2">
      <a
        :href="`tel:${SITE.telefono}`"
        class="flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-cta ring-1 ring-inset ring-white/10 hover:from-brand-400 dark:from-brand-500 dark:to-brand-700"
        data-testid="callbar-phone"
        @click="trackCall()"
      >
        <IconPhone aria-hidden="true" class="size-4" />
        Llamar ahora
      </a>
      <a
        href="#agendar"
        class="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-ink-900 ring-1 ring-inset ring-ink-200 shadow-sm hover:text-brand-700 hover:ring-brand-400 dark:bg-ink-900 dark:text-ink-100 dark:ring-ink-700"
        data-testid="callbar-schedule"
      >
        <IconCalendarEvent aria-hidden="true" class="size-4" />
        Agendar visita
      </a>
    </div>
  </div>
</template>