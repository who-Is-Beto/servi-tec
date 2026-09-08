<script setup lang="ts">
import { ref } from 'vue'
import { IconPhone, IconMenu2, IconX, IconMail } from '@tabler/icons-vue'
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
  <header class="sticky top-0 z-header">
    <div class="page-container">
      <div
        class="mt-2.5 flex h-[4.5rem] items-center justify-between gap-3 rounded-full border border-white/10 bg-ink-950/70 pl-5 pr-2.5 shadow-panel backdrop-blur-xl sm:h-[76px] sm:pr-3"
      >
        <!-- Marca + tagline -->
        <a href="/" class="flex items-center gap-2.5" :aria-label="`${SITE.nombre}: inicio`">
          <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-700 shadow-cta" aria-hidden="true">
            <svg viewBox="0 0 64 64" class="size-6 text-white" fill="currentColor">
              <path d="M22 20a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v6h-2v-6a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v6h10v-3h2v5a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2v-8Z" />
              <rect x="20" y="30" width="24" height="16" rx="3" />
              <circle cx="24" cy="40" r="1.6" fill="currentColor" />
              <circle cx="31" cy="40" r="1.6" fill="currentColor" />
              <circle cx="38" cy="40" r="1.6" fill="currentColor" />
              <path d="M24 50c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2H24v-2Z" opacity=".7" />
            </svg>
          </span>
          <span class="leading-tight">
            <span class="block text-lg font-bold tracking-tight text-white">
              {{ SITE.nombre }}
            </span>
            <span class="block text-[10px] font-medium uppercase tracking-widest text-ink-400">
              Servicio Especializado en Línea Blanca
            </span>
          </span>
        </a>

        <!-- Nav desktop -->
        <nav class="hidden items-center gap-7 lg:flex" aria-label="Principal">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative text-sm font-medium text-ink-200 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <a
            :href="`mailto:${SITE.email}`"
            class="hidden items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-ink-200 transition-colors hover:text-white xl:flex"
            data-testid="header-email"
          >
            <span class="grid size-8 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-white/10">
              <IconMail aria-hidden="true" class="size-4 text-brand-300" />
            </span>
            {{ SITE.email }}
          </a>
          <a
            :href="`tel:${SITE.telefono}`"
            class="tnum hidden items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-ink-100 transition-colors hover:text-white xl:flex"
            data-testid="header-phone"
            @click="trackCall()"
          >
            <span class="relative grid size-8 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-white/10">
              <IconPhone aria-hidden="true" class="size-4 text-brand-300" />
            </span>
            {{ SITE.telefonoDisplay }}
          </a>
          <AppButton :href="`tel:${SITE.telefono}`" variant="primary" size="md" class="hidden sm:inline-flex" @click="trackCall()">
            <IconPhone aria-hidden="true" class="size-4" />
            ¡Llamar!
          </AppButton>
          <button
            class="grid size-10 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
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
    </div>

    <!-- Menú móvil -->
    <div
      v-if="menuOpen"
      id="menu-movil"
      class="page-container lg:hidden"
    >
      <div class="mt-2 rounded-3xl border border-white/10 bg-ink-950/95 p-3 shadow-panel backdrop-blur-xl">
        <nav class="flex flex-col gap-1" aria-label="Menú móvil">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-xl px-3 py-3 text-base font-medium text-ink-100 transition-colors hover:bg-white/10"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </a>
          <div class="mt-2 flex items-center gap-3 px-1">
            <a
              :href="`tel:${SITE.telefono}`"
              class="tnum flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 px-4 py-3 font-semibold text-white shadow-cta ring-1 ring-inset ring-white/10 hover:from-brand-400"
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
    </div>
  </header>
</template>