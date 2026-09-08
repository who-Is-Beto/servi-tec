<script setup lang="ts">
import type { Marca } from '@/types'

/**
 * Logotipos TIPOGRÁFICOS estilizados de las marcas atendidas.
 *
 * Son marcas-de-texto recreadas con tipografía propia (Manrope) y acento de
 * color: NO son los logos oficiales de las marcas. Se muestran como
 * referencia para identificar equipos (ver LEGAL.declaracionIndependencia).
 */

const props = defineProps<{ marca: Marca }>()

const PALETA: Record<string, { texto: string; device: string; device2?: string }> = {
  samsung: { texto: '#1428a0', device: '#1428a0' },
  lg: { texto: '#ffffff', device: '#a50034' },
  mabe: { texto: '#007a45', device: '#007a45', device2: '#ffffff' },
  whirlpool: { texto: '#0067b9', device: '#0067b9' },
  'linea-general': { texto: 'currentColor', device: '#2563eb' },
}

const c = PALETA[props.marca.id] ?? { texto: 'currentColor', device: '#2563eb' }
</script>

<template>
  <svg
    viewBox="0 0 160 48"
    preserveAspectRatio="xMidYMid meet"
    class="h-11 w-full max-w-[11rem] select-none dark:opacity-90"
    role="presentation"
    aria-hidden="true"
  >
    <template v-if="marca.id === 'samsung'">
      <ellipse cx="26" cy="24" rx="21" ry="15" :fill="c.device" />
      <text x="118" y="30" text-anchor="end" font-size="22" font-weight="800" letter-spacing="3" :fill="c.texto">SAMSUNG</text>
    </template>

    <template v-else-if="marca.id === 'lg'">
      <circle cx="26" cy="24" r="18" :fill="c.device" />
      <text x="26" y="22" text-anchor="middle" font-size="19" font-weight="800" :fill="c.texto">L</text>
      <text x="26" y="38" text-anchor="middle" font-size="13" font-weight="800" :fill="c.texto" opacity="0.85">G</text>
      <text x="150" y="31" text-anchor="end" font-size="22" font-weight="700" letter-spacing="4" :fill="'#a50034'">LG</text>
    </template>

    <template v-else-if="marca.id === 'mabe'">
      <circle cx="24" cy="24" r="15" :fill="c.device" />
      <text x="24" y="30" text-anchor="middle" font-size="17" font-weight="800" :fill="c.device2">m</text>
      <text x="150" y="32" text-anchor="end" font-size="24" font-weight="800" letter-spacing="1" :fill="c.texto">mabe</text>
    </template>

    <template v-else-if="marca.id === 'whirlpool'">
      <circle cx="24" cy="24" r="16" :fill="c.device" />
      <text x="24" y="30" text-anchor="middle" font-size="14" font-weight="800" :fill="'#ffffff'">W</text>
      <text x="150" y="32" text-anchor="end" font-size="17" font-weight="800" letter-spacing="1" :fill="c.texto">Whirlpool</text>
    </template>

    <template v-else>
      <g :fill="c.device">
        <circle cx="24" cy="24" r="16" />
        <path
          d="M24 14 a3.5 3.5 0 0 0-3.5 3.5 v1.2 l-4.8 8.3 a2.4 2.4 0 0 0 2.1 3.6 h5.2 a2.4 2.4 0 0 0 2.1-3.6 l-4.8-8.3 v-1.2 a3.5 3.5 0 0 0-1.3-2.75"
          stroke="#fff" stroke-width="0" fill="#fff"
        />
      </g>
      <text x="150" y="32" text-anchor="end" font-size="17" font-weight="700" :fill="c.texto">Línea general</text>
    </template>
  </svg>
</template>