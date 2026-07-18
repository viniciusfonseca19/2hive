<template>
  <div class="app-shell">
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

main {
  position: relative;
  z-index: 1;
}
</style>
