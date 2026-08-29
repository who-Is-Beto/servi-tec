<script setup lang="ts">
import { ref } from 'vue'
import { IconPhone, IconMenu2, IconX } from '@tabler/icons-vue'
import { SITE } from '@/data/config'
import { useConversion } from '@/composables/useConversion'
import AppButton from '@/components/ui/AppButton.vue'

const { trackCall } = useConversion()
const menuOpen = ref(false)

const navLinks = [
  { href: '#marcas', label: 'Marcas' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#faq', label: 'Preguntas' },
]
</script>

<template>
  <header
    class="sticky top-0 z-header border-b border-ink-200/60 bg-paper/75 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/75"
  >
    <div class="page-container flex h-16 items-center justify-between gap-4 sm:h-[72px]">
      <!-- Marca -->
      <a href="/" class="flex items-center gap-2.5" :aria-label="`${SITE.nombre}: inicio`">
        <span class="grid size-9 place-items-center rounded-xl bg-gradient-to-b from-brand-500 to-brand-700 shadow-cta" aria-hidden="true">
          <svg viewBox="0 0 64 64" class="size-6 text-white" fill="currentColor">
            <path d="M22 20a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v6h-2v-6a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v6h10v-3h2v5a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2v-8Z" />
            <rect x="20" y="30" width="24" height="16" rx="3" />
            <circle cx="24" cy="40" r="1.6" fill="currentColor" />
            <circle cx="31" cy="40" r="1.6" fill="currentColor" />
            <circle cx="38" cy="40" r="1.6" fill="currentColor" />
            <path d="M24 50c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2H24v-2Z" opacity=".7" />
          </svg>
        </span>
        <span class="text-lg font-bold tracking-tight text-ink-950 dark:text-white">
          {{ SITE.nombre }}
        </span>
      </a>

      <!-- Nav desktop -->
      <nav class="hidden items-center gap-6 lg:flex" aria-label="Principal">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <a
          :href="`tel:${SITE.telefono}`"
          class="tnum hidden items-center gap-2 text-sm font-semibold text-ink-900 transition-colors hover:text-brand-700 md:flex dark:text-ink-100 dark:hover:text-brand-300"
          data-testid="header-phone"
          @click="trackCall()"
        >
          <IconPhone aria-hidden="true" class="size-4 text-brand-600" />
          {{ SITE.telefonoDisplay }}
        </a>
        <AppButton href="#agendar" variant="primary" size="md" class="hidden sm:inline-flex">
          Agendar visita
        </AppButton>
        <button
          class="grid size-10 place-items-center rounded-full text-ink-800 hover:bg-ink-100 lg:hidden dark:text-ink-200 dark:hover:bg-ink-900"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="menu-movil"
          aria-label="Abrir menú"
          data-testid="menu-toggle"
          @click="menuOpen = !menuOpen"
        >
          <IconMenu2 v-if="!menuOpen" aria-hidden="true" class="size-6" />
          <IconX v-else aria-hidden="true" class="size-6" />
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <div
      v-if="menuOpen"
      id="menu-movil"
      class="border-t border-ink-200/60 bg-paper/95 backdrop-blur-md lg:hidden dark:border-ink-800 dark:bg-ink-950/95"
    >
      <nav class="page-container flex flex-col gap-1 py-4" aria-label="Menú móvil">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-xl px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-900"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </a>
        <div class="mt-2 flex items-center gap-3 px-3">
          <a
            :href="`tel:${SITE.telefono}`"
            class="tnum flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3 font-semibold text-white shadow-cta ring-1 ring-inset ring-white/10 hover:from-brand-400 dark:from-brand-500 dark:to-brand-700"
            data-testid="mobile-phone"
            @click="menuOpen = false; trackCall()"
          >
            <IconPhone aria-hidden="true" class="size-4" />
            Llamar ahora
          </a>
          <AppButton
            href="#agendar"
            variant="secondary"
            size="md"
            class="flex-1"
            @click="menuOpen = false"
          >
            Agendar visita
          </AppButton>
        </div>
      </nav>
    </div>
  </header>
</template>