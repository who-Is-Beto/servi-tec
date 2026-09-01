<script setup lang="ts">
import IconPhone from '@tabler/icons-vue/dist/esm/icons/IconPhone.mjs'
import IconClock from '@tabler/icons-vue/dist/esm/icons/IconClock.mjs'
import IconMail from '@tabler/icons-vue/dist/esm/icons/IconMail.mjs'
import { SITE, LEGAL } from '@/data/config'
import { ZONAS_CDMX, ZONAS_EDOMEX } from '@/data/zonas'
import { useConversion } from '@/composables/useConversion'

const { trackCall } = useConversion()
const year = new Date().getFullYear()

const zonasDestacadas = {
  cdmx: ZONAS_CDMX.slice(0, 6),
  edomex: ZONAS_EDOMEX.slice(0, 6),
}
</script>

<template>
  <footer class="border-t border-ink-200/60 bg-ink-950 text-ink-300 dark:border-ink-800">
    <div class="mx-auto h-px max-w-page bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" aria-hidden="true" />
    <div class="page-container py-14 sm:py-16">
      <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <!-- Marca + blurb legal -->
        <div>
          <p class="text-lg font-bold tracking-tight text-white">{{ SITE.nombre }}</p>
          <p class="mt-3 max-w-md text-sm leading-relaxed">
            Servicio técnico especializado en reparación de línea blanca a domicilio en
            Ciudad de México y zona metropolitana.
          </p>
          <p class="mt-4 max-w-md text-xs leading-relaxed text-ink-400">
            {{ LEGAL.declaracionIndependencia }}
          </p>
        </div>

        <!-- Contacto -->
        <div>
          <p class="text-sm font-semibold uppercase tracking-wider text-ink-400">Contacto</p>
          <ul class="mt-4 space-y-3 text-sm">
            <li>
              <a
                :href="`tel:${SITE.telefono}`"
                class="tnum inline-flex items-center gap-2.5 font-semibold text-white transition-colors hover:text-brand-300"
                data-testid="footer-phone"
                @click="trackCall()"
              >
                <IconPhone aria-hidden="true" class="size-4 text-brand-400" />
                {{ SITE.telefonoDisplay }}
              </a>
            </li>
            <li class="inline-flex items-center gap-2.5">
              <IconClock aria-hidden="true" class="size-4 text-brand-400" />
              Lunes a sábado, 9:00 a 19:00
            </li>
            <li>
              <a
                :href="`mailto:${SITE.email}`"
                class="inline-flex items-center gap-2.5 text-ink-300 transition-colors hover:text-brand-300"
              >
                <IconMail aria-hidden="true" class="size-4 text-brand-400" />
                {{ SITE.email }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Cobertura -->
        <div>
          <p class="text-sm font-semibold uppercase tracking-wider text-ink-400">Cobertura</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="z in zonasDestacadas.cdmx"
              :key="z.id"
              class="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-ink-300 ring-1 ring-inset ring-white/10 transition-colors hover:text-white hover:ring-brand-500/50"
            >
              {{ z.nombre }}
            </span>
            <span class="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-ink-400 ring-1 ring-inset ring-white/10">
              +{{ ZONAS_CDMX.length - zonasDestacadas.cdmx.length }} alcaldías más
            </span>
          </div>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <span
              v-for="z in zonasDestacadas.edomex"
              :key="z.id"
              class="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-ink-300 ring-1 ring-inset ring-white/10 transition-colors hover:text-white hover:ring-brand-500/50"
            >
              {{ z.nombre }}
            </span>
            <span class="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-ink-400 ring-1 ring-inset ring-white/10">
              +{{ ZONAS_EDOMEX.length - zonasDestacadas.edomex.length }} municipios más
            </span>
          </div>
          <a
            href="#cobertura"
            class="mt-4 inline-block text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
          >
            Ver mapa de cobertura →
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center"
      >
        <p>© {{ year }} {{ SITE.nombre }}. Todos los derechos reservados.</p>
        <nav class="flex gap-5" aria-label="Legal">
          <RouterLink
            to="/terminos-y-condiciones"
            class="transition-colors hover:text-brand-300"
          >
            Términos y Condiciones
          </RouterLink>
          <RouterLink
            to="/aviso-de-privacidad"
            class="transition-colors hover:text-brand-300"
          >
            Aviso de Privacidad
          </RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>