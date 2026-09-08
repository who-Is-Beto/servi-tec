<script setup lang="ts">
import { computed } from 'vue'
import { IconBrandWhatsapp } from '@tabler/icons-vue'
import { SITE } from '@/data/config'
import { useSchedulingStore } from '@/stores/scheduling'
import { fallaPorId, OTRA_FALLA_ID } from '@/data/fallas'
import { useConversion } from '@/composables/useConversion'

const { trackWhatsApp } = useConversion()
const store = useSchedulingStore()

// El mensaje se ajusta a la falla seleccionada en el formulario (si la hay),
// para que el técnico llegue con contexto al chat de WhatsApp.
const textoFalla = computed(() => {
  if (!store.form.falla) return ''
  if (store.form.falla === OTRA_FALLA_ID) return store.form.fallaDescripcion.trim()
  return fallaPorId(store.form.falla)?.label ?? ''
})

const waMensaje = computed(() => {
  const base = SITE.whatsappMensaje
  const falla = textoFalla.value
  if (!falla) return base
  return `${base} Mi equipo presenta: ${falla}.`
})

// Enlace wa.me: número internacional + mensaje URL-encoded.
const waLink = computed(() => {
  const numero = SITE.whatsappNumber.replace(/\D/g, '')
  const texto = encodeURIComponent(waMensaje.value)
  return `https://wa.me/${numero}?text=${texto}`
})
</script>

<template>
  <!--
    Botón flotante de WhatsApp, visible en todo el sitio.
    En mobile se posiciona arriba de la barra de llamada inferior (bottom-24)
    para no superponerse; en desktop (barra oculta) baja a la esquina (md:bottom-6).
  -->
  <a
    :href="waLink"
    target="_blank"
    rel="noopener noreferrer"
    class="group fixed right-4 bottom-24 z-callbar grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.7)] ring-4 ring-white/10 transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 md:bottom-6 md:size-16"
    :aria-label="`Chatear por WhatsApp al ${SITE.telefonoDisplay}`"
    data-testid="floating-whatsapp"
    @click="trackWhatsApp()"
  >
    <IconBrandWhatsapp aria-hidden="true" class="size-7 md:size-8" fill="currentColor" />
    <span
      aria-hidden="true"
      class="absolute inset-0 -z-10 animate-ring-pop rounded-full bg-[#25D366]"
    />
  </a>
</template>
