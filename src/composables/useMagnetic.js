/**
 * Applies a magnetic pull effect to an element: as the pointer approaches,
 * the element eases toward it; on leave, it springs back to rest.
 * Usage: <div ref="el" @pointermove="onMove" @pointerleave="onLeave">
 */
export function useMagnetic(strength = 0.35) {
  function onMove(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`
  }

  function onLeave(e) {
    e.currentTarget.style.transform = 'translate(0, 0)'
  }

  return { onMove, onLeave }
}
