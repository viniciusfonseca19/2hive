<template>
  <section id="projetos" class="projects section" ref="rootRef">
    <div class="projects__head" data-reveal>
      <p class="eyebrow">Mapa de operações</p>
      <h2 class="projects__title">Quatro projetos. Uma central de inteligência.</h2>
    </div>

    <div class="map glass-panel" data-reveal>
      <svg class="map__lines" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet">
        <line v-for="(p, i) in projects" :key="i" x1="400" y1="280" :x2="p.pos.x" :y2="p.pos.y" class="map__line" />
        <circle cx="400" cy="280" r="46" class="map__core-ring" />
      </svg>

      <div class="map__core">
        <span class="map__core-hex"></span>
        <span class="text-mono">2HIVE</span>
      </div>

      <button
        v-for="p in projects"
        :key="p.slug"
        class="node"
        :class="`node--${p.theme}`"
        :style="{ left: p.pos.x / 800 * 100 + '%', top: p.pos.y / 560 * 100 + '%' }"
        @click="selected = p"
      >
        <span class="node__dot"></span>
        <span class="node__label">
          <strong>{{ p.name }}</strong>
          <span class="node__cat">{{ p.category }}</span>
        </span>
        <span class="node__arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ProjectModal from '../ui/ProjectModal.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.15 })

const selected = ref(null)

const projects = [
  {
    slug: 'solara',
    theme: 'solara',
    name: 'Solara Energia',
    category: 'Landing Page · Energia Solar',
    status: 'No ar',
    statusTone: 'live',
    summary: 'Landing page para uma empresa de energia solar do Nordeste, feita para transformar visitas em orçamentos.',
    objective: 'Comunicar economia e confiança, guiando o visitante direto ao pedido de orçamento.',
    result: 'Aumento na taxa de conversão de visitantes em leads qualificados.',
    stack: ['Vue 3', 'CSS puro', 'Node'],
    highlights: ['Interface moderna com identidade de energia limpa', 'Totalmente responsiva', 'Gradientes amarelo + roxo remetendo a sol e inovação'],
    deployUrl: 'https://solara-energia.vercel.app',
    image: '/projects/solara.png',
    pos: { x: 150, y: 130 }
  },
  {
    slug: 'stokk',
    theme: 'stokk',
    name: 'Stokk',
    category: 'Sistema de Gestão Empresarial',
    status: 'No ar',
    statusTone: 'live',
    summary: 'Sistema que organiza produtos, estoque, vendas, clientes e financeiro em um painel vivo.',
    objective: 'Dar visibilidade em tempo real da operação para donos de pequenos negócios.',
    result: 'Redução do tempo gasto em controle manual de estoque e vendas.',
    stack: ['Vue 3', 'PostgreSQL', 'Node', 'Docker'],
    highlights: ['Dashboard com gráficos e indicadores', 'Movimentação de estoque em tempo real', 'Widgets configuráveis'],
    deployUrl: 'https://www.stokk0.tech',
    image: '/projects/stokk.png',
    pos: { x: 650, y: 130 }
  },
  {
    slug: 'vera',
    theme: 'vera',
    name: 'Vera Pizzaria',
    category: 'Mini Sistema de Delivery',
    status: 'Em desenvolvimento',
    statusTone: 'progress',
    summary: 'Painel operacional para acompanhar pedidos, entregas e tempo de preparo de uma pizzaria local.',
    objective: 'Substituir o controle manual de pedidos por um painel simples e rápido.',
    result: 'Menos erros no fluxo de pedidos e maior previsibilidade nas entregas.',
    stack: ['Vue 3', 'Firebase'],
    highlights: ['Status de pedido em tempo real', 'Tempo de preparo estimado', 'Painel pensado para uso na cozinha'],
    deployUrl: 'https://verapizzaria.vercel.app',
    image: '/projects/vera.png',
    pos: { x: 150, y: 430 }
  },
  {
    slug: 'cavalcanti',
    theme: 'cavalcanti',
    name: 'Cavalcanti Associados',
    category: 'Landing Page · Escritório de Advocacia',
    status: 'No ar',
    statusTone: 'live',
    summary: 'Landing page institucional elegante e minimalista para um escritório de advocacia.',
    objective: 'Transmitir autoridade e confiança através de um visual sóbrio, com pouco uso de cor.',
    result: 'Mais contatos qualificados vindos diretamente do site.',
    stack: ['Vue 3', 'CSS puro'],
    highlights: ['Muito branco, muito preto, pouco roxo', 'Áreas de atuação em destaque', 'Visual luxuoso sem exageros'],
    deployUrl: 'https://cavalcanti-associados.vercel.app',
    image: '/projects/cavalcanti.png',
    pos: { x: 650, y: 430 }
  }
]
</script>

<style scoped>
.projects__head {
  max-width: 680px;
  margin-bottom: var(--space-xl);
}
.projects__title {
  font-size: var(--fs-h1);
  margin-top: var(--space-sm);
}

.map {
  position: relative;
  height: min(640px, 80vh);
  overflow: hidden;
}

.map__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.map__line {
  stroke: var(--color-purple);
  stroke-width: 1.5;
  stroke-dasharray: 4 6;
  opacity: 0.5;
  animation: dash-flow 3s linear infinite;
}

@keyframes dash-flow {
  to { stroke-dashoffset: -100; }
}

.map__core-ring {
  fill: none;
  stroke: var(--color-purple-light);
  stroke-width: 1;
  opacity: 0.5;
  animation: ring-pulse 2.6s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% { r: 46; opacity: 0.5; }
  50% { r: 56; opacity: 0.15; }
}

.map__core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2xs);
  z-index: 2;
}

.map__core-hex {
  width: 60px;
  height: 60px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: var(--gradient-purple);
  box-shadow: var(--shadow-glow-purple);
}

.map__core span.text-mono {
  font-size: var(--fs-micro);
  letter-spacing: 0.1em;
  color: var(--color-gray);
}

.node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-bg-panel);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-md);
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  z-index: 2;
  text-align: left;
}

.node:hover {
  transform: translate(-50%, -50%) scale(1.06);
  border-color: var(--color-purple-light);
  box-shadow: var(--shadow-glow-purple);
}

.node__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-purple-light);
  box-shadow: 0 0 10px var(--color-purple-light);
  flex-shrink: 0;
}

.node--solara .node__dot { background: var(--color-amber); box-shadow: 0 0 10px var(--color-amber); }

.node__label {
  display: flex;
  flex-direction: column;
  font-size: var(--fs-small);
}
.node__cat {
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.node__arrow {
  margin-left: auto;
  color: var(--color-purple-light);
  opacity: 0.6;
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.node:hover .node__arrow {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 760px) {
  .map {
    height: auto;
    padding: var(--space-xl) var(--space-sm);
  }
  .map__lines, .map__core {
    display: none;
  }
  .node {
    position: static;
    transform: none;
    width: 100%;
    margin-bottom: var(--space-sm);
  }
  .node:hover {
    transform: none;
  }
}
</style>
