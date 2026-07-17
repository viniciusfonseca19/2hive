<template>
  <section id="tecnologias" class="tech section" ref="rootRef">
    <div class="tech__head" data-reveal>
      <p class="eyebrow">Stack</p>
      <h2 class="tech__title">Uma parede viva de tecnologia.</h2>
    </div>

    <div class="wall" data-reveal>
      <span
        v-for="(t, i) in technologies"
        :key="t"
        class="chip"
        :style="{ animationDelay: (i % 6) * 0.3 + 's' }"
        @pointermove="onMove"
        @pointerleave="onLeave"
      >
        {{ t }}
      </span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useMagnetic } from '../../composables/useMagnetic'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.05 })
const { onMove, onLeave } = useMagnetic(0.3)

const technologies = ['Java', 'Spring Boot', 'NodeJs', 'NestJs', 'NextJs', 'VueJs', 'Javascript', 'Typescript', 'Express', 'Tailwind', 'Figma', 'HTML', 'CSS']
</script>

<style scoped>
.tech__head {
  max-width: 680px;
  margin-bottom: var(--space-xl);
}
.tech__title {
  font-size: var(--fs-h1);
  margin-top: var(--space-sm);
}

.wall {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.chip {
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-full);
  font-size: var(--fs-body-lg);
  font-weight: 500;
  color: var(--color-gray);
  transition: transform var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  animation: float 5s ease-in-out infinite;
  cursor: default;
}

.chip:hover {
  color: var(--color-white);
  border-color: var(--color-purple-light);
  box-shadow: 0 0 24px rgba(124, 58, 237, 0.3);
}

@keyframes float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -6px; }
}
</style>
