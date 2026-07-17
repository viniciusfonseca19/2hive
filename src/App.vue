<template>
  <div class="app-shell">
    <div class="site-ornaments" aria-hidden="true">
      <div class="site-ornament corner-top-left">
        <img src="/favicon.svg" alt="" />
      </div>
      <div class="site-ornament corner-top-right">
        <img src="/favicon.svg" alt="" />
      </div>
      <div class="site-ornament corner-bottom-left">
        <img src="/favicon.svg" alt="" />
      </div>
      <div class="site-ornament corner-bottom-right">
        <img src="/favicon.svg" alt="" />
      </div>
    </div>

    <NavBar @open-start-project="isStartProjectModalOpen = true" />
    <main>
      <HeroSection />
      <TeamSpotlight />
      <AboutDashboard />
      <ServicesOS />
      <ProjectsMap />
      <ProcessPipeline />
      <TechWall />
      <CtaTerminal @open-start-project="isStartProjectModalOpen = true" />
    </main>
    <FooterSection />
    <StartProjectModal v-if="isStartProjectModalOpen" @close="isStartProjectModalOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/layout/NavBar.vue'
import FooterSection from './components/layout/FooterSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutDashboard from './components/sections/AboutDashboard.vue'
import ServicesOS from './components/sections/ServicesOS.vue'
import ProjectsMap from './components/sections/ProjectsMap.vue'
import ProcessPipeline from './components/sections/ProcessPipeline.vue'
import TeamSpotlight from './components/sections/TeamSpotlight.vue'
import TechWall from './components/sections/TechWall.vue'
import CtaTerminal from './components/sections/CtaTerminal.vue'
import StartProjectModal from './components/ui/StartProjectModal.vue'

const isStartProjectModalOpen = ref(false)
</script>

<style>
.app-shell {
  position: relative;
  overflow: hidden;
}

.site-ornaments {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.site-ornament {
  position: absolute;
  width: 56px;
  height: 56px;
  opacity: 0.14;
  filter: blur(0.2px);
}

.site-ornament img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.corner-top-left {
  top: 82px;
  left: 24px;
}

.corner-top-right {
  top: 82px;
  right: 24px;
}

.corner-bottom-left {
  bottom: 24px;
  left: 24px;
}

.corner-bottom-right {
  bottom: 24px;
  right: 24px;
}

main {
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .site-ornament {
    width: 40px;
    height: 40px;
    opacity: 0.1;
  }

  .corner-top-left {
    top: 88px;
    left: 12px;
  }

  .corner-top-right {
    top: 88px;
    right: 12px;
  }
}
</style>
