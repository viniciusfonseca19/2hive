import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Tracks the pointer position in viewport coordinates (and normalized -1..1)
 * so components can build parallax / mouse-follow / magnetic effects.
 */
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const normX = ref(0)
  const normY = ref(0)

  function handleMove(e) {
    x.value = e.clientX
    y.value = e.clientY
    normX.value = (e.clientX / window.innerWidth) * 2 - 1
    normY.value = (e.clientY / window.innerHeight) * 2 - 1
  }

  onMounted(() => window.addEventListener('pointermove', handleMove, { passive: true }))
  onUnmounted(() => window.removeEventListener('pointermove', handleMove))

  return { x, y, normX, normY }
}
