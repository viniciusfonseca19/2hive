<template>
  <section id="cta" class="cta section" ref="rootRef">
    <div class="terminal glass-panel" data-reveal>
      <div class="terminal__bar">
        <span class="terminal__dot terminal__dot--red"></span>
        <span class="terminal__dot terminal__dot--yellow"></span>
        <span class="terminal__dot terminal__dot--green"></span>
        <span class="terminal__bar-title text-mono">bash — 2hive</span>
      </div>

      <div class="terminal__body text-mono">
        <p class="terminal__line"><span class="terminal__prompt">$</span> Vamos construir seu próximo projeto?<span class="terminal__cursor">▌</span></p>

        <button class="terminal__btn" @click="ripple" ref="btnRef">
          <span class="terminal__btn-prompt">&gt;</span> Iniciar Projeto
          <span v-for="r in ripples" :key="r.id" class="ripple" :style="{ left: r.x + 'px', top: r.y + 'px' }"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.15 })

const btnRef = ref(null)
const ripples = ref([])
let rippleId = 0

function ripple(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const id = rippleId++
  ripples.value.push({ id, x: e.clientX - rect.left, y: e.clientY - rect.top })
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id)
  }, 650)
}
</script>

<style scoped>
.cta {
  display: flex;
  justify-content: center;
}

.terminal {
  width: min(720px, 100%);
  overflow: hidden;
  box-shadow: var(--shadow-panel);
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-line);
  background: rgba(255,255,255,0.02);
}

.terminal__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0.6;
}
.terminal__dot--red { background: #ff5f57; }
.terminal__dot--yellow { background: #febc2e; }
.terminal__dot--green { background: #28c840; }

.terminal__bar-title {
  margin-left: var(--space-sm);
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.terminal__body {
  padding: var(--space-2xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-lg);
}

.terminal__line {
  font-size: clamp(1.1rem, 2.4vw, 1.5rem);
  color: var(--color-white);
}

.terminal__prompt {
  color: var(--color-purple-light);
  margin-right: 0.5rem;
}

.terminal__cursor {
  color: var(--color-purple-light);
  animation: blink 1s steps(1) infinite;
  margin-left: 4px;
}

@keyframes blink {
  50% { opacity: 0; }
}

.terminal__btn {
  position: relative;
  overflow: hidden;
  padding: 0.9rem 1.8rem;
  border-radius: var(--radius-full);
  background: var(--gradient-purple);
  color: #fff;
  font-weight: 600;
  font-size: var(--fs-body);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}
.terminal__btn:hover {
  box-shadow: var(--shadow-glow-purple);
  transform: translateY(-2px);
}

.terminal__btn-prompt {
  margin-right: 0.5rem;
  opacity: 0.8;
}

.ripple {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-anim 0.65s var(--ease-out-expo) forwards;
  pointer-events: none;
}

@keyframes ripple-anim {
  to {
    transform: translate(-50%, -50%) scale(18);
    opacity: 0;
  }
}
</style>
