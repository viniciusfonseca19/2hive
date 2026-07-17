<template>
  <section id="hero" class="hero" ref="rootRef">
    <HexBackground :particle-count="14" glow-y="30%" />

    <div class="hero__inner">
      <p class="eyebrow hero__eyebrow" data-reveal>2Hive · Tecnologia que conecta</p>

      <h1 class="hero__title" data-reveal>
        Construindo sistemas que fazem <span class="gradient-text">empresas crescerem.</span>
      </h1>

      <div class="hero__rotator" data-reveal>
        <span>Nós criamos</span>
        <span class="hero__rotator-word-wrap">
          <transition name="word" mode="out-in">
            <span :key="wordIndex" class="hero__rotator-word gradient-text">{{ words[wordIndex] }}</span>
          </transition>
        </span>
      </div>

      <div class="hero__actions" data-reveal>
        <a href="#projetos" class="btn btn--primary">Ver projetos</a>
        <a href="#cta" class="btn btn--ghost">Iniciar projeto</a>
      </div>

      <div class="hero__stats" data-reveal>
        <div v-for="s in stats" :key="s.label" class="hero__stat">
          <span class="hero__stat-value text-mono">{{ s.value }}</span>
          <span class="hero__stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <div class="hero__visual" ref="visualRef" @pointermove="onVisualMove" @pointerleave="onVisualLeave">
      <div class="hero__logo-badge" aria-hidden="true">
        <div class="hero__logo-ring"></div>
        <img src="/favicon.svg" alt="Logo 2Hive" class="hero__logo-mark" />
      </div>

      <div class="hex-cluster" :style="clusterStyle">
        <div v-for="h in hexNodes" :key="h.id" class="hex-node" :style="h.style"></div>
        <svg class="hex-lines" viewBox="0 0 400 400">
          <line v-for="(l, i) in hexLines" :key="i" :x1="l.x1" :y1="l.y1" :x2="l.x2" :y2="l.y2" />
        </svg>
      </div>
    </div>

    <a href="#sobre" class="hero__scroll">
      <span>Explorar</span>
      <span class="hero__scroll-line"></span>
    </a>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import HexBackground from '../ui/HexBackground.vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.1 })

const words = ['Landing Pages.', 'Sistemas.', 'Inteligência Artificial.', 'Experiências Digitais.']
const wordIndex = ref(0)
let interval

onMounted(() => {
  interval = setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % words.length
  }, 2400)
})
onUnmounted(() => clearInterval(interval))

const stats = [
  { value: '20+', label: 'Projetos entregues' },
  { value: '98%', label: 'Performance média' },
  { value: '15+', label: 'Solicitações atendidas' }
]

// Hex cluster nodes positioned in a loose 3D sphere
const hexNodes = Array.from({ length: 9 }, (_, i) => {
  const angle = (i / 9) * Math.PI * 2
  const radius = 120
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.6
  const z = Math.sin(angle * 2) * 80
  return {
    id: i,
    style: {
      transform: `translate3d(${x}px, ${y}px, ${z}px) rotate(${(i * 37) % 360}deg)`,
      animationDelay: `${i * 0.4}s`
    }
  }
})

const hexLines = [
  { x1: 200, y1: 200, x2: 320, y2: 140 },
  { x1: 200, y1: 200, x2: 300, y2: 280 },
  { x1: 200, y1: 200, x2: 120, y2: 260 },
  { x1: 200, y1: 200, x2: 90, y2: 150 },
  { x1: 200, y1: 200, x2: 220, y2: 60 },
  { x1: 200, y1: 200, x2: 260, y2: 340 }
]

const visualRef = ref(null)
const tilt = ref({ x: 0, y: 0 })

function onVisualMove(e) {
  const rect = visualRef.value.getBoundingClientRect()
  const relX = (e.clientX - rect.left) / rect.width - 0.5
  const relY = (e.clientY - rect.top) / rect.height - 0.5
  tilt.value = { x: relY * -24, y: relX * 24 }
}

function onVisualLeave() {
  tilt.value = { x: 0, y: 0 }
}

const clusterStyle = computed(() => ({
  transform: `rotateX(${tilt.value.x}deg) rotateY(${tilt.value.y}deg)`
}))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  padding: clamp(6rem, 10vh, 8rem) var(--section-padding-x) var(--space-2xl);
  overflow: hidden;
}

.hero__inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.hero__eyebrow {
  margin-bottom: var(--space-2xs);
}

.hero__title {
  font-size: var(--fs-hero);
  font-weight: 700;
  letter-spacing: -0.03em;
  max-width: 14ch;
}

.hero__rotator {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: var(--fs-h3);
  color: var(--color-gray);
  font-weight: 500;
  height: 2.2em;
}

.hero__rotator-word-wrap {
  display: inline-block;
  min-width: 14ch;
}

.hero__rotator-word {
  font-weight: 700;
  display: inline-block;
}

.word-enter-active, .word-leave-active {
  transition: opacity 0.5s var(--ease-out-expo), transform 0.5s var(--ease-out-expo);
}
.word-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.word-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.hero__actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
}

.btn {
  padding: 0.9rem 1.6rem;
  border-radius: var(--radius-full);
  font-size: var(--fs-small);
  font-weight: 600;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
}

.btn--primary {
  background: var(--gradient-purple);
  color: #fff;
  box-shadow: 0 0 0 rgba(124,58,237,0);
}
.btn--primary:hover {
  box-shadow: var(--shadow-glow-purple);
  transform: translateY(-2px);
}

.btn--ghost {
  border: 1px solid var(--color-line-strong);
  color: var(--color-white);
}
.btn--ghost:hover {
  border-color: var(--color-purple-light);
  color: var(--color-purple-light);
}

.hero__stats {
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-line);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.hero__stat-value {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-purple-light);
}

.hero__stat-label {
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.hero__visual {
  position: relative;
  z-index: 2;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 900px;
}

.hero__logo-badge {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 180px;
  height: 180px;
  display: grid;
  place-items: center;
  z-index: 3;
  animation: logo-float 4.2s ease-in-out infinite;
}

.hero__logo-ring {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(176, 132, 255, 0.55);
  border-radius: 50%;
  box-shadow:
    0 0 0 8px rgba(124, 58, 237, 0.08),
    0 0 36px rgba(124, 58, 237, 0.35),
    inset 0 0 24px rgba(176, 132, 255, 0.18);
  animation: logo-spin 10s linear infinite;
}

.hero__logo-mark {
  width: 92px;
  height: 92px;
  filter: drop-shadow(0 0 18px rgba(176, 132, 255, 0.7));
  animation: logo-pulse 3.2s ease-in-out infinite;
}

.hero__logo-badge::before,
.hero__logo-badge::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  inset: -10px;
  border: 1px solid rgba(176, 132, 255, 0.18);
  animation: logo-spin 14s linear infinite reverse;
}

.hero__logo-badge::after {
  inset: -28px;
  border-color: rgba(255, 255, 255, 0.08);
  animation-duration: 18s;
}

.hex-cluster {
  position: relative;
  width: 400px;
  height: 400px;
  transform-style: preserve-3d;
  animation: cluster-spin 22s linear infinite;
  transition: transform 0.4s var(--ease-smooth);
}

@keyframes cluster-spin {
  from { rotate: y 0deg; }
  to { rotate: y 360deg; }
}

.hex-node {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  margin: -23px 0 0 -23px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(176,132,255,0.15));
  border: 1px solid var(--color-purple-light);
  box-shadow: 0 0 24px rgba(124, 58, 237, 0.45);
  animation: hex-pulse 3.6s ease-in-out infinite;
}

@keyframes hex-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes logo-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes logo-pulse {
  0%, 100% { transform: scale(1); opacity: 0.95; }
  50% { transform: scale(1.06); opacity: 1; }
}

@keyframes logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hex-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.hex-lines line {
  stroke: var(--color-purple);
  stroke-width: 1;
  opacity: 0.35;
}

.hero__scroll {
  position: absolute;
  bottom: var(--space-lg);
  left: var(--section-padding-x);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--fs-micro);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gray);
}

.hero__scroll-line {
  width: 40px;
  height: 1px;
  background: var(--color-gray-dim);
  position: relative;
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-purple-light);
  animation: scroll-line 2.2s ease-in-out infinite;
}

@keyframes scroll-line {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(0); }
  100% { transform: translateX(100%); }
}

@media (max-width: 1000px) {
  .hero {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
    text-align: left;
  }
  .hero__visual {
    height: 320px;
  }
  .hex-cluster {
    width: 280px;
    height: 280px;
    transform: scale(0.8);
  }
  .hero__scroll {
    display: none;
  }
}
</style>
