<script setup lang="ts">
import { usePageSeo } from '@/composables/useSeo'
import { SITE } from '@/data/config'

usePageSeo({
  title: 'Aviso de Privacidad',
  description:
    'Aviso de privacidad: qué datos personales captura TecServi en el formulario de agendado y cómo los usa. En cumplimiento con la ley de protección de datos mexicana.',
  path: '/aviso-de-privacidad',
})
</script>

<template>
  <article class="py-16 sm:py-24">
    <div class="page-container max-w-3xl">
      <h1 class="text-3xl font-bold leading-[1.05] tracking-tighter text-ink-950 text-balance sm:text-4xl dark:text-white">
        Aviso de Privacidad
      </h1>
      <p class="mt-3 text-sm text-ink-600 dark:text-ink-400">
        Última actualización: enero de 2026
      </p>

      <div class="mt-10 space-y-10 text-sm leading-relaxed text-ink-700 dark:text-ink-300">
        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Responsable</h2>
          <p class="mt-3">
            {{ SITE.nombreLegal }}, con domicilio en la Ciudad de México, es responsable del
            tratamiento de tus datos personales conforme a la Ley Federal de Protección de
            Datos Personales en Posesión de los Particulares y su reglamento.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Qué datos recabamos</h2>
          <p class="mt-3">
            A través del formulario de agendado recabamos únicamente: nombre, teléfono,
            marca y tipo de equipo, zona y horario preferido. Si realizas una llamada,
            tratamos los datos que nos proporciones durante la conversación.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Para qué los usamos</h2>
          <p class="mt-3">
            Tus datos se usan únicamente para: contactarte y confirmar la visita, dar
            seguimiento al servicio, y emitir tu orden de servicio. No vendemos, alquilamos
            ni compartimos tus datos con terceros ajenos al servicio.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Cookies y medición</h2>
          <p class="mt-3">
            Esta página puede utilizar cookies y tecnologías de medición (Google Analytics,
            píxeles de publicidad) para conocer el desempeño de la campaña que te trajo.
            Estas herramientas se activan solo si el sitio está configurado con
            identificadores de medición y no almacenan información que te identifique
            personalmente.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Tus derechos (ARCO)</h2>
          <p class="mt-3">
            Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición
            enviando tu solicitud a {{ SITE.email }}, indicando tu nombre y el motivo.
            Atenderemos tu solicitud en un máximo de 15 días hábiles.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-ink-950 dark:text-white">Cambios</h2>
          <p class="mt-3">
            Si modificamos este aviso, publicaremos la versión actualizada en esta página
            con la fecha de actualización indicada al inicio.
          </p>
        </section>
      </div>
    </div>
  </article>
</template>