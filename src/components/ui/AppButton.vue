<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * Botón tipado. Renderiza:
 *  - <a href>  para enlaces externos y tel: (click-to-call)
 *  - <RouterLink> para rutas internas
 *  - <button>  para acciones y submit
 */
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    ariaLabel?: string
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false, ariaLabel: undefined },
)

const sizeClasses: Record<string, string> = {
  md: 'px-5 py-3 text-sm sm:text-[0.95rem]',
  lg: 'px-6 py-3.5 text-base sm:px-7 sm:py-4',
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-cta ring-1 ring-inset ring-white/10 hover:from-brand-400 hover:to-brand-600 hover:shadow-panel dark:from-brand-500 dark:to-brand-700',
  secondary:
    'bg-white text-ink-900 ring-1 ring-inset ring-ink-200 shadow-sm hover:ring-brand-400 hover:shadow-card dark:bg-ink-900 dark:text-ink-50 dark:ring-ink-700 dark:hover:ring-brand-500',
  ghost: 'text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-ink-900',
}

const classes = computed(() =>
  [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150',
    'active:translate-y-px active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60',
    sizeClasses[props.size],
    variantClasses[props.variant],
  ].join(' '),
)
</script>

<template>
  <a v-if="href" :href="href" :class="classes" :aria-label="ariaLabel">
    <slot />
  </a>
  <RouterLink v-else-if="to" :to="to" :class="classes" :aria-label="ariaLabel">
    <slot />
  </RouterLink>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>