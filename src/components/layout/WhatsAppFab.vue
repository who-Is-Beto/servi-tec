<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { WHATSAPP } from '@/data/config'
import { useConversion } from '@/composables/useConversion'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'

/**
 * Botón flotante persistente "Chat por WhatsApp".
 * Abre wa.me con el saludo prellenado. Es la acción primaria de la página:
 * una sola decisión, cero pasos. En móvil se coloca sobre la barra de llamada.
 */
const { trackWhatsApp } = useConversion()

// En móvil la barra de llamada (MobileCallBar) ocupa la parte inferior;
// el FAB se eleva para no quedar tapada. En desktop se ancla directo al fondo.
const esMovil = ref(false)
let mq: MediaQueryList | undefined
let listener: (() => void) | undefined

onMounted(() => {
  try {
    mq = window.matchMedia('(max-width: 767px)')
    listener = () => (esMovil.value = mq!.matches)
    esMovil.value = mq.matches
    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', listener)
  } catch {
    esMovil.value = true
  }
})

onBeforeUnmount(() => {
  if (mq && listener) {
    try {
      mq.removeEventListener('change', listener)
    } catch {
      /* noop */
    }
  }
})
</script>

<template>
  <a
    :href="WHATSAPP.enlace"
    target="_blank"
    rel="noopener noreferrer"
    data-testid="whatsapp-fab"
    aria-label="Escribir por WhatsApp a TecServi"
    class="group fixed right-4 z-toaster flex items-center gap-2.5 rounded-full bg-[#188038] p-3.5 text-white shadow-[0_12px_28px_-10px_rgba(18,26,32,0.55)] ring-1 ring-inset ring-white/20 transition-all duration-200 hover:bg-[#12602a] active:translate-y-px active:scale-[0.98] sm:right-6 sm:p-4"
    :class="esMovil ? 'bottom-[5.5rem] md:bottom-6' : 'bottom-6'"
    @click="trackWhatsApp('fab')"
  >
    <WhatsAppIcon class="size-7 sm:size-8" />
    <span
      class="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold leading-none transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-1 md:block"
    >
      Chat por WhatsApp
    </span>
  </a>
</template>
