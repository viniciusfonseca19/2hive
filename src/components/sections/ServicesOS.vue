<template>
  <section id="servicos" class="services section" ref="rootRef">
    <div class="services__head" data-reveal>
      <p class="eyebrow">Sistema · 2hiveOS v2.1</p>
      <h2 class="services__title">Cinco módulos. Um único sistema operacional para o seu negócio.</h2>
    </div>

    <div class="os" data-reveal>
      <div
        v-for="(m, i) in modules"
        :key="m.id"
        class="module"
        :class="{ 'module--active': active === i }"
        @mouseenter="active = i"
        @focus="active = i"
        tabindex="0"
      >
        <div class="module__header">
          <span class="module__index text-mono">{{ m.id }}</span>
          <span class="module__icon" v-html="m.icon"></span>
          <h3 class="module__name">{{ m.name }}</h3>
        </div>

        <transition name="expand">
          <div v-if="active === i" class="module__body">
            <p class="module__desc">{{ m.desc }}</p>
            <div class="module__viz">
              <div v-for="n in 6" :key="n" class="module__bar" :style="{ height: barHeight(i, n) + '%', animationDelay: n * 0.08 + 's' }"></div>
            </div>
            <div class="module__tags">
              <span v-for="t in m.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.12 })

const active = ref(0)

const modules = [
  {
    id: '01',
    name: 'Landing Pages',
    desc: 'Páginas de alta conversão, com copy orientada a resultado e performance de carregamento acima de 90 no Lighthouse.',
    tags: ['Conversão', 'SEO', 'A/B Test'],
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    id: '02',
    name: 'E-commerce',
    desc: 'Lojas virtuais completas, integradas a meios de pagamento e logística, pensadas para escalar o volume de vendas.',
    tags: ['Checkout', 'Estoque', 'Integrações'],
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16l-1.5 10h-13L4 6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="20" r="1.2" fill="currentColor"/><circle cx="17" cy="20" r="1.2" fill="currentColor"/></svg>'
  },
  {
    id: '03',
    name: 'Sistemas Personalizados',
    desc: 'Plataformas web sob medida para operações específicas: gestão, financeiro, estoque e fluxos internos.',
    tags: ['Dashboards', 'APIs', 'Automação'],
    icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    id: '04',
    name: 'Inteligência Artificial',
    desc: 'Automação de atendimento, análise de dados e agentes de IA integrados aos processos reais da empresa.',
    tags: ['Agentes', 'LLMs', 'Automação'],
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/></svg>'
  },
  {
    id: '05',
    name: 'UI/UX Design',
    desc: 'Interfaces desenhadas com intenção — pesquisa, wireframe, protótipo e um sistema visual consistente.',
    tags: ['Figma', 'Design System', 'Prototipagem'],
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
  }
]

function barHeight(moduleIndex, n) {
  const seed = (moduleIndex + 1) * 17 + n * 13
  return 30 + (seed % 65)
}
</script>

<style scoped>
.services__head {
  max-width: 680px;
  margin-bottom: var(--space-xl);
}

.services__title {
  font-size: var(--fs-h1);
  margin-top: var(--space-sm);
}

.os {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg-panel);
}

.module {
  border-bottom: 1px solid var(--color-line);
  padding: var(--space-md) var(--space-lg);
  cursor: pointer;
  transition: background var(--transition-fast);
  outline: none;
}
.module:last-child {
  border-bottom: none;
}
.module:hover, .module--active {
  background: rgba(124, 58, 237, 0.06);
}

.module__header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.module__index {
  color: var(--color-gray);
  font-size: var(--fs-small);
  width: 2ch;
}

.module__icon {
  width: 28px;
  height: 28px;
  color: var(--color-purple-light);
  transition: transform var(--transition-fast);
}
.module--active .module__icon {
  transform: scale(1.1) rotate(-4deg);
}

.module__name {
  font-size: var(--fs-h3);
  font-weight: 600;
}

.module__body {
  display: grid;
  grid-template-columns: 1.4fr auto 1fr;
  gap: var(--space-lg);
  align-items: center;
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  padding-left: calc(2ch + 28px + var(--space-md) * 2);
}

.module__desc {
  color: var(--color-gray);
  font-size: var(--fs-body);
  max-width: 46ch;
}

.module__viz {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 48px;
}

.module__bar {
  width: 5px;
  background: var(--gradient-purple);
  border-radius: 3px;
  animation: bar-grow 0.6s var(--ease-out-expo) backwards;
}

@keyframes bar-grow {
  from { transform: scaleY(0); transform-origin: bottom; }
  to { transform: scaleY(1); transform-origin: bottom; }
}

.module__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
  justify-content: flex-end;
}

.tag {
  font-size: var(--fs-micro);
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-line-strong);
  color: var(--color-gray);
}

.expand-enter-active, .expand-leave-active {
  transition: opacity 0.35s var(--ease-out-expo), max-height 0.35s var(--ease-out-expo);
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

@media (max-width: 900px) {
  .module__body {
    grid-template-columns: 1fr auto;
    padding-left: 0;
  }
  .module__tags {
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .module__body {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
}
</style>
