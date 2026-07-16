<template>
  <section id="sobre" class="about section" ref="rootRef">
    <div class="about__head" data-reveal>
      <p class="eyebrow">Painel · Visão geral</p>
      <h2 class="about__title">A 2Hive em números, não em promessas.</h2>
      <p class="about__desc">
        Somos um time enxuto de engenheiros e designers que trata cada projeto como um produto —
        com métricas, iteração e um único objetivo: fazer o negócio do cliente crescer.
      </p>
    </div>

    <div class="dashboard glass-panel" data-reveal>
      <div class="dashboard__bar">
        <span class="dashboard__dot dashboard__dot--red"></span>
        <span class="dashboard__dot dashboard__dot--yellow"></span>
        <span class="dashboard__dot dashboard__dot--green"></span>
        <span class="dashboard__bar-title text-mono">2hive://status</span>
      </div>

      <div class="dashboard__grid">
        <div v-for="m in metrics" :key="m.label" class="metric">
          <span class="metric__label text-mono">{{ m.label }}</span>
          <span class="metric__value">
            <span class="text-mono">{{ display[m.label] ?? 0 }}{{ m.suffix }}</span>
          </span>
          <div class="metric__spark">
            <div class="metric__spark-fill" :style="{ width: (display[m.label] ?? 0) / m.target * 100 + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="dashboard__row">
        <div class="dashboard__panel">
          <span class="dashboard__panel-title text-mono">// stack utilizada</span>
          <div class="dashboard__tags">
            <span v-for="t in ['Vue', 'Node', 'IA', 'Figma', 'Docker']" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
        <div class="dashboard__panel">
          <span class="dashboard__panel-title text-mono">// horas economizadas</span>
          <span class="dashboard__big text-mono">{{ display['Horas economizadas'] ?? 0 }}h</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'
import gsap from 'gsap'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.15 })

const metrics = [
  { label: 'Projetos entregues', target: 32, suffix: '' },
  { label: 'Empresas atendidas', target: 18, suffix: '' },
  { label: 'Performance média', target: 97, suffix: '%' },
  { label: 'Tecnologias', target: 10, suffix: '+' },
  { label: 'Horas economizadas', target: 1200, suffix: '' }
]

const display = ref({})

onMounted(() => {
  const el = rootRef.value
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          metrics.forEach((m) => {
            const counter = { val: 0 }
            gsap.to(counter, {
              val: m.target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                display.value = { ...display.value, [m.label]: Math.round(counter.val) }
              }
            })
          })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(el.querySelector('.dashboard'))
})
</script>

<style scoped>
.about__head {
  max-width: 640px;
  margin-bottom: var(--space-xl);
}

.about__title {
  font-size: var(--fs-h1);
  margin: var(--space-sm) 0;
}

.about__desc {
  color: var(--color-gray);
  font-size: var(--fs-body-lg);
}

.dashboard {
  padding: 0;
  overflow: hidden;
  box-shadow: var(--shadow-panel);
}

.dashboard__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-line);
  background: rgba(255,255,255,0.02);
}

.dashboard__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  opacity: 0.6;
}
.dashboard__dot--red { background: #ff5f57; }
.dashboard__dot--yellow { background: #febc2e; }
.dashboard__dot--green { background: #28c840; }

.dashboard__bar-title {
  margin-left: var(--space-sm);
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--color-line);
}

.metric {
  background: var(--color-bg-panel);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.metric__label {
  font-size: var(--fs-micro);
  color: var(--color-gray);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.metric__value {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-white);
}

.metric__spark {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.metric__spark-fill {
  height: 100%;
  background: var(--gradient-purple);
  transition: width 0.4s var(--ease-smooth);
}

.dashboard__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-line);
}

.dashboard__panel {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.dashboard__panel:first-child {
  border-right: 1px solid var(--color-line);
}

.dashboard__panel-title {
  font-size: var(--fs-micro);
  color: var(--color-purple-light);
}

.dashboard__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
}

.tag {
  font-size: var(--fs-micro);
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-line-strong);
  color: var(--color-gray);
}

.dashboard__big {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-purple-light);
}

@media (max-width: 900px) {
  .dashboard__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .dashboard__row {
    grid-template-columns: 1fr;
  }
  .dashboard__panel:first-child {
    border-right: none;
    border-bottom: 1px solid var(--color-line);
  }
}
</style>
