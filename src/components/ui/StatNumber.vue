<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Número con conteo animado al entrar al viewport (ease-out cúbico).
 * Respeta prefers-reduced-motion (muestra el valor final de inmediato) y
 * expone el valor definitivo a lectores de pantalla.
 */
const props = withDefaults(
  defineProps<{
    value: number
    prefix?: string
    suffix?: string
    duration?: number
  }>(),
  { prefix: '', suffix: '', duration: 1100 },
)

const elRef = ref<HTMLElement | null>(null)
const display = ref(props.value)

let raf = 0
let observer: IntersectionObserver | null = null

function animate(): void {
  let reduced = false
  try {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    reduced = false
  }
  if (reduced || !('IntersectionObserver' in window)) {
    display.value = props.value
    return
  }
  const start = performance.now()
  const tick = (now: number): void => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = Math.round(props.value * eased)
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  const el = elRef.value
  if (!el) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        animate()
        observer?.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <span ref="elRef" class="inline-block">
    <span class="tnum" aria-hidden="true">{{ prefix }}{{ display }}{{ suffix }}</span>
    <span class="sr-only">{{ prefix }}{{ value }}{{ suffix }}</span>
  </span>
</template>