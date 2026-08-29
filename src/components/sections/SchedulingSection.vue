<script setup lang="ts">
import { IconShieldCheck, IconClock, IconCalculator, IconBolt, IconPhone, IconArrowRight } from '@tabler/icons-vue'
import { SITE } from '@/data/config'
import UiSection from '@/components/ui/UiSection.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScheduleForm from './ScheduleForm.vue'

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
      intro="Déjanos tus datos y te llamamos para confirmar horario. Si prefieres, llámanos directo: la primera llamada no compromete."
    />

    <div class="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
      <!-- Copy + beneficios -->
      <div>
        <ul class="space-y-3">
          <li
            v-for="(b, i) in beneficios"
            :key="b.titulo"
            v-reveal="{ delay: i * 80 }"
            class="group relative flex items-start gap-4 overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-ink-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-300 dark:bg-ink-900 dark:ring-ink-800"
          >
            <span
              aria-hidden="true"
              class="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
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
          class="group relative mt-6 flex flex-col gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 p-6 text-white shadow-panel ring-1 ring-ink-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover sm:flex-row sm:items-center sm:justify-between dark:from-ink-900 dark:to-ink-950 dark:ring-ink-800"
          data-testid="schedule-phone"
        >
          <span
            aria-hidden="true"
            class="animate-pulse-soft pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-600/25 blur-3xl [animation-duration:5s] dark:bg-brand-500/25"
          />
          <span class="relative flex items-center gap-3">
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_20px_-8px_rgba(39,72,200,0.7)]" aria-hidden="true">
              <IconPhone class="size-5" />
            </span>
            <span>
                  <span class="block text-xs font-semibold uppercase tracking-wider text-ink-400">Llámanos, servicio urgente el mismo día</span>
                  <span class="tnum mt-0.5 block text-lg font-bold leading-tight">{{ SITE.telefonoDisplay }}</span>
            </span>
          </span>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-transform duration-200 group-hover:translate-x-1">
            Llamar ahora
            <IconArrowRight aria-hidden="true" class="size-4" />
          </span>
        </a>
        <p class="mt-3 text-xs text-ink-600 dark:text-ink-400">
          Revisión de $200 MXN: si aceptas la cotización, solo pagas lo presupuestado.
        </p>
      </div>

      <!-- Formulario -->
      <div v-reveal="{ from: 'right' }" class="relative overflow-hidden rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-200/60 sm:p-8 dark:bg-ink-900 dark:ring-ink-800">
        <span
          aria-hidden="true"
          class="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent"
        />
        <ScheduleForm />
      </div>
    </div>
  </UiSection>
</template>