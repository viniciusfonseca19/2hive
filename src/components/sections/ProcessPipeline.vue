<template>
  <section id="processo" class="process section" ref="rootRef">
    <div class="process__head" data-reveal>
      <p class="eyebrow">Pipeline · build → deploy</p>
      <h2 class="process__title">O processo é uma esteira, não uma lista.</h2>
    </div>

    <div class="pipeline" data-reveal>
      <div class="pipeline__track"></div>
      <div class="pipeline__progress"></div>

      <div v-for="(step, i) in steps" :key="step.name" class="stage" :style="{ animationDelay: i * 0.15 + 's' }">
        <span class="stage__node"></span>
        <div class="stage__card glass-panel">
          <span class="stage__index text-mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="stage__name">{{ step.name }}</h3>
          <p class="stage__desc">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.1 })

const steps = [
  { name: 'Descoberta', desc: 'Entendemos o negócio, o público e o problema real a ser resolvido.' },
  { name: 'Estratégia', desc: 'Definimos escopo, tecnologia e prioridades com base em resultado.' },
  { name: 'Design', desc: 'Construímos a interface pensando em quem vai usar todos os dias.' },
  { name: 'Desenvolvimento', desc: 'Codificamos com foco em performance, escala e boas práticas.' },
  { name: 'Deploy', desc: 'Publicamos com monitoramento e testes em ambiente real.' },
  { name: 'Suporte', desc: 'Acompanhamos métricas e evoluímos o produto com o cliente.' }
]
</script>

<style scoped>
.process__head {
  max-width: 680px;
  margin-bottom: var(--space-xl);
}
.process__title {
  font-size: var(--fs-h1);
  margin-top: var(--space-sm);
}

.pipeline {
  position: relative;
  display: flex;
  gap: var(--space-lg);
  overflow-x: auto;
  padding: var(--space-lg) 0;
  scroll-snap-type: x proximity;
}

.pipeline__track {
  position: absolute;
  top: calc(var(--space-lg) + 5px);
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-line);
}

.pipeline__progress {
  position: absolute;
  top: calc(var(--space-lg) + 5px);
  left: 0;
  height: 2px;
  width: 100%;
  background: var(--gradient-purple);
  transform-origin: left;
  animation: fill-line 2.4s var(--ease-out-expo) forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

@keyframes fill-line {
  from { transform: scaleX(0); opacity: 1; }
  to { transform: scaleX(1); opacity: 1; }
}

.stage {
  position: relative;
  flex: 0 0 240px;
  scroll-snap-align: start;
  opacity: 0;
  animation: stage-in 0.6s var(--ease-out-expo) forwards;
}

@keyframes stage-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.stage__node {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-purple-light);
  box-shadow: 0 0 10px var(--color-purple-light);
  margin-bottom: var(--space-md);
}

.stage__card {
  padding: var(--space-md);
  height: 160px;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.stage__index {
  color: var(--color-purple-light);
  font-size: var(--fs-small);
}

.stage__name {
  font-size: var(--fs-h3);
}

.stage__desc {
  color: var(--color-gray);
  font-size: var(--fs-small);
}

@media (max-width: 760px) {
  .stage {
    flex-basis: 200px;
  }
}
</style>
