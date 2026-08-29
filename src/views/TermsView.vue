<script setup lang="ts">
import { usePageSeo } from '@/composables/useSeo'
import { SITE, LEGAL } from '@/data/config'

usePageSeo({
  title: 'Términos y Condiciones',
  description:
    'Condiciones del servicio técnico de reparación de línea blanca a domicilio: garantía, cotización previa, refacciones y política de cancelaciones.',
  path: '/terminos-y-condiciones',
})
</script>

<template>
  <article class="py-16 sm:py-24">
    <div class="page-container max-w-3xl">
      <h1 class="text-3xl font-bold leading-[1.05] tracking-tighter text-ink-950 text-balance sm:text-4xl dark:text-white">
        Términos y Condiciones
      </h1>
      <p class="mt-3 text-sm text-ink-600 dark:text-ink-400">
        Última actualización: enero de 2026
      </p>

      <div class="mt-10 space-y-10 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">1. General</h2>
          <p class="mt-3">
            Estos términos regulan el servicio de reparación de línea blanca a domicilio
            prestado por {{ SITE.nombreLegal }}. Al agendar una visita, aceptas las
            condiciones aquí descritas.
          </p>
          <p class="mt-3">
            {{ LEGAL.declaracionIndependencia }}
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">2. Revisión y cotización</h2>
          <p class="mt-3">
            La revisión en sitio tiene un costo de $200 MXN. Si se acepta la reparación,
            ese monto se acredita y solo se paga lo presupuestado. Si no se acepta, se
            cubre únicamente el costo de la revisión. Si durante el trabajo se detectan
            fallas adicionales, se informará antes de continuar.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">3. Garantía</h2>
          <p class="mt-3">
            La mano de obra y las refacciones instaladas cuentan con garantía de 90 días a
            partir de la fecha de reparación, excepto daños por mal uso, golpes, descargas
            eléctricas, inundaciones o manipulaciones de otros técnicos. La garantía se hace
            efectiva presentando la orden de servicio.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">4. Refacciones</h2>
          <p class="mt-3">
            Las refacciones se cotizan por separado. Se utilizan refacciones originales o
            equivalentes compatibles, según disponibilidad y presupuesto del cliente, quien
            autoriza su instalación por escrito.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">5. Cancelaciones</h2>
          <p class="mt-3">
            Puedes reagendar o cancelar tu visita sin costo siempre que nos avises con al
            menos 2 horas de anticipación por teléfono o por el mismo medio en que se
            agendó.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">6. Contacto</h2>
          <p class="mt-3">
            Para dudas sobre estos términos: teléfono
            <a class="tnum font-semibold text-brand-700 underline dark:text-brand-300" :href="`tel:${SITE.telefono}`">{{ SITE.telefonoDisplay }}</a>
            o correo {{ SITE.email }}.
          </p>
        </section>
      </div>
    </div>
  </article>
</template>