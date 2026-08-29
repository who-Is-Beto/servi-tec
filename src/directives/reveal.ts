import type { Directive, DirectiveBinding } from 'vue'

/**
 * Directiva v-reveal: anima la entrada del elemento al entrar al viewport
 * (IntersectionObserver + clase .reveal/.is-revealed). Respeta
 * prefers-reduced-motion (si lo hay, el elemento queda estático y visible).
 * Uso: v-reveal="{ delay: 120, from: 'up' | 'left' | 'right' }"
 */

export interface RevealValue {
  delay?: number
  from?: 'up' | 'left' | 'right'
}

let reducedMotion = false
try {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
} catch {
  reducedMotion = false
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealValue>) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      return
    }
    const { delay = 0, from = 'up' } = binding.value ?? {}
    el.classList.add('reveal')
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.dataset.revealFrom = from

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            observer.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observers.set(el, observer)
    observer.observe(el)
  },
  unmounted(el: HTMLElement) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}