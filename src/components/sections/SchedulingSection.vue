<script setup lang="ts">
import { computed } from 'vue'
import IconShieldCheck from '@tabler/icons-vue/dist/esm/icons/IconShieldCheck.mjs'
import IconClock from '@tabler/icons-vue/dist/esm/icons/IconClock.mjs'
import IconCalculator from '@tabler/icons-vue/dist/esm/icons/IconCalculator.mjs'
import IconBolt from '@tabler/icons-vue/dist/esm/icons/IconBolt.mjs'
import IconPhone from '@tabler/icons-vue/dist/esm/icons/IconPhone.mjs'
import IconArrowRight from '@tabler/icons-vue/dist/esm/icons/IconArrowRight.mjs'
import { SITE } from '@/data/config'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon.vue'
import { useConversion } from '@/composables/useConversion'
import ScheduleForm from './ScheduleForm.vue'

const { trackWhatsApp } = useConversion()

const waLink = computed(() => {
  const numero = SITE.whatsappNumber.replace(/\D/g, '')
  const texto = encodeURIComponent(SITE.whatsappMensaje)
  return `https://wa.me/${numero}?text=${texto}`
})

const beneficios = [
  {
    icono: IconShieldCheck,
    titulo: 'Garantía de 90 días',
    texto: 'En el trabajo realizado y las refacciones que instalamos.',
  },
  {
    icono: IconCalculator,
    titulo: 'Revisión de $200 acreditable',
    texto: 'Si aceptas la cotización, solo pagas lo presupuestado.',
  },
  {
    icono: IconClock,
    titulo: 'Horarios de 9:00 a 19:00',
    texto: 'Elige la franja: mañana, tarde o vespertino.',
  },
  {
    icono: IconBolt,
    titulo: 'Servicio urgente el mismo día',
    texto: 'Llámanos y coordinamos una urgencia a domicilio el mismo día.',
  },
]
</script>

<template>
  <UiSection id="agendar" class="bg-paper-mute dark:bg-ink-950">
    <SectionHeading
      title="Agenda tu visita a domicilio"
      intro="La forma más rápida es escribirnos por WhatsApp: responde en minutos y no necesitas llenar nada. Si prefieres un formulario, también está abajo."
    />

    <div class="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
      <!-- Copy + beneficios -->
      <div>
        <!-- Acción primaria de esta sección: WhatsApp -->
        <a
          :href="waLink"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="schedule-whatsapp"
          class="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-[#188038] p-6 text-white shadow-[0_16px_36px_-18px_rgba(31,189,90,0.6)] ring-1 ring-inset ring-white/20 transition-all duration-200 hover:bg-[#12602a] sm:p-7"
          @click="trackWhatsApp()"
        >
          <span class="flex items-center gap-4">
            <span class="grid size-12 shrink-0 place-items-center rounded-full bg-white/20" aria-hidden="true">
              <WhatsAppIcon class="size-7" />
            </span>
            <span>
              <span class="block text-lg font-bold leading-tight">Escríbenos por WhatsApp</span>
              <span class="mt-0.5 block text-sm text-white">Responde en minutos, sin formularios.</span>
            </span>
          </span>
          <span class="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#188038] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            <IconArrowRight class="size-5" />
          </span>
        </a>

        <p class="mt-3 text-xs text-ink-600 dark:text-ink-400">
          Revisión de $200 MXN: si aceptas la cotización, solo pagas lo presupuestado.
        </p>

        <ul class="mt-6 space-y-3">
          <li
            v-for="(b, i) in beneficios"
            :key="b.titulo"
            v-reveal="{ delay: i * 80 }"
            class="group relative flex items-start gap-4 overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-ink-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-300 dark:bg-ink-900 dark:ring-ink-800"
          >
            <span
              class="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(39,72,200,0.6)] dark:from-brand-400 dark:to-brand-600"
              aria-hidden="true"
            >
              <component :is="b.icono" class="size-5" />
            </span>
            <div>
              <h3 class="text-sm font-bold text-ink-950 dark:text-white">{{ b.titulo }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ b.texto }}</p>
            </div>
          </li>
        </ul>

        <a
          :href="`tel:${SITE.telefono}`"
          class="group relative mt-4 flex flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-ink-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-300 sm:flex-row sm:items-center sm:justify-between dark:bg-ink-900 dark:ring-ink-800"
          data-testid="schedule-phone"
        >
          <span class="flex items-center gap-3">
            <span
              class="relative grid size-11 shrink-0 place-items-center rounded-full bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-100"
              aria-hidden="true"
            >
              <IconPhone class="size-5" />
            </span>
            <span>
              <span class="block text-xs font-semibold text-ink-600 dark:text-ink-400">O llámanos directo</span>
              <span class="tnum mt-0.5 block text-lg font-bold leading-tight text-ink-950 dark:text-white">{{ SITE.telefonoDisplay }}</span>
            </span>
          </span>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-transform duration-200 group-hover:translate-x-1 dark:text-brand-300">
            Llamar
            <IconArrowRight aria-hidden="true" class="size-4" />
          </span>
        </a>
      </div>

      <!-- Formulario -->
      <div v-reveal="{ from: 'right' }" class="relative overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-200/60 sm:p-8 dark:bg-ink-900 dark:ring-ink-800">
        <ScheduleForm />
      </div>
    </div>
  </UiSection>
</template>