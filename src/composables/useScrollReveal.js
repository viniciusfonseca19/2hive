import { onMounted } from 'vue'
import gsap from 'gsap'

/**
 * Observes every element matching `selector` inside `rootRef` and animates
 * it in with GSAP the first time it enters the viewport. Keeps the "cinematic
 * reveal" feel described in the brief without re-triggering on every scroll.
 */
export function useScrollReveal(rootRef, selector = '[data-reveal]', options = {}) {
  const { y = 40, duration = 1, stagger = 0.12, threshold = 0.2 } = options

  onMounted(() => {
    const root = rootRef.value
    if (!root) return
    const els = root.querySelectorAll(selector)
    if (!els.length) return

    gsap.set(els, { opacity: 0, y })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: 'power3.out'
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    els.forEach((el) => observer.observe(el))
  })
}
