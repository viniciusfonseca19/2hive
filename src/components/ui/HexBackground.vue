<template>
  <div class="hex-bg" :class="{ 'hex-bg--dense': dense }" aria-hidden="true">
    <svg class="hex-bg__grid" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern
          id="hex-pattern"
          :width="hexWidth"
          :height="hexHeight"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0,0)"
        >
          <polygon :points="hexPoints" fill="none" stroke="var(--color-purple)" stroke-width="1" />
          <polygon
            :points="hexPoints"
            fill="none"
            stroke="var(--color-purple)"
            stroke-width="1"
            :transform="`translate(${hexWidth / 2}, ${hexHeight / 2})`"
          />
        </pattern>
        <radialGradient id="hex-fade" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#000" stop-opacity="0" />
          <stop offset="70%" stop-color="#000" stop-opacity="0" />
          <stop offset="100%" stop-color="#000" stop-opacity="0.9" />
        </radialGradient>
        <mask id="hex-mask">
          <rect width="100%" height="100%" fill="white" />
          <rect width="100%" height="100%" fill="url(#hex-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" mask="url(#hex-mask)" />
    </svg>

    <svg class="hex-bg__particles" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMidYMid slice">
      <circle
        v-for="p in particles"
        :key="p.id"
        class="hex-bg__particle"
        r="2.2"
        :style="{ offsetPath: `path('${p.path}')`, animationDuration: p.duration + 's', animationDelay: p.delay + 's' }"
      />
    </svg>

    <div class="hex-bg__glow" :style="glowStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  dense: { type: Boolean, default: false },
  particleCount: { type: Number, default: 10 },
  glowX: { type: String, default: '50%' },
  glowY: { type: String, default: '35%' }
})

const width = 1200
const height = 800
const hexSize = props.dense ? 34 : 46
const hexWidth = hexSize * Math.sqrt(3)
const hexHeight = hexSize * 2 * 0.75

const hexPoints = computed(() => {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30)
    const px = hexSize / 2 + (hexSize / 2) * Math.cos(angle)
    const py = hexSize / 2 + (hexSize / 2) * Math.sin(angle)
    pts.push(`${px},${py}`)
  }
  return pts.join(' ')
})

function randomPath() {
  const startX = Math.random() * width
  const startY = Math.random() * height
  const dx = (Math.random() - 0.5) * 300
  const dy = (Math.random() - 0.5) * 200
  return `M ${startX} ${startY} L ${startX + dx} ${startY + dy}`
}

const particles = computed(() =>
  Array.from({ length: props.particleCount }, (_, i) => ({
    id: i,
    path: randomPath(),
    duration: 4 + Math.random() * 5,
    delay: Math.random() * -6
  }))
)

const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${props.glowX} ${props.glowY}, rgba(124,58,237,0.25), transparent 60%)`
}))
</script>

<style scoped>
.hex-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hex-bg__grid,
.hex-bg__particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.hex-bg--dense .hex-bg__grid {
  opacity: 0.35;
}

.hex-bg__particle {
  fill: var(--color-purple-light);
  filter: drop-shadow(0 0 4px var(--color-purple-light));
  offset-distance: 0%;
  animation-name: travel;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes travel {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

.hex-bg__glow {
  position: absolute;
  inset: 0;
}
</style>
