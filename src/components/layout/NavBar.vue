<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <nav class="nav__bar glass-panel">
      <a href="#hero" class="nav__brand" @click="closeMenu">
        <img src="/favicon.svg" alt="2Hive" class="nav__logo" />
      </a>

      <ul class="nav__links">
        <li v-for="item in links" :key="item.href">
          <a :href="item.href" @click="closeMenu">{{ item.label }}</a>
        </li>
      </ul>

      <button type="button" class="nav__cta" @click="$emit('open-start-project')">
        <span class="nav__cta-dot"></span>
        Iniciar Projeto
      </button>

      <button class="nav__toggle" :aria-expanded="menuOpen" aria-label="Abrir menu" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <transition name="menu">
      <div v-if="menuOpen" class="nav__mobile glass-panel">
        <a v-for="item in links" :key="item.href" :href="item.href" @click="closeMenu">{{ item.label }}</a>
        <button type="button" class="nav__mobile-cta" @click="openStartProject">Iniciar Projeto</button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits(['open-start-project'])

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { href: '#time', label: 'Time' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#processo', label: 'Processo' },
  { href: '#tecnologias', label: 'Tecnologias' }
]

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

function closeMenu() {
  menuOpen.value = false
}

function openStartProject() {
  closeMenu()
  emit('open-start-project')
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.nav {
  position: fixed;
  top: var(--space-md);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 0 var(--space-md);
  transition: top var(--transition-base);
}

.nav__bar {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: 0.65rem 0.75rem 0.65rem 1.25rem;
  border-radius: var(--radius-full);
  width: min(920px, 100%);
  transition: box-shadow var(--transition-base), border-color var(--transition-base);
}

.nav--scrolled .nav__bar {
  box-shadow: var(--shadow-panel);
  border-color: var(--color-line-strong);
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.05rem;
  white-space: nowrap;
}

.nav__logo {
  height: 24px;
  width: auto;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  list-style: none;
  flex: 1;
  justify-content: center;
}

.nav__links a {
  font-size: var(--fs-small);
  color: var(--color-gray);
  transition: color var(--transition-fast);
  position: relative;
}

.nav__links a:hover {
  color: var(--color-white);
}

.nav__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--fs-small);
  font-weight: 600;
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius-full);
  background: var(--gradient-purple);
  color: white;
  white-space: nowrap;
  transition: filter var(--transition-fast), transform var(--transition-fast);
}

.nav__cta:hover {
  filter: brightness(1.15);
  transform: translateY(-1px);
}

.nav__cta-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px #fff;
}

.nav__toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

.nav__toggle span {
  width: 18px;
  height: 2px;
  background: var(--color-white);
  border-radius: 2px;
}

.nav__mobile {
  margin-top: 0.75rem;
  padding: var(--space-md);
  border-radius: var(--radius-md);
  width: min(920px, 100%);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.nav__mobile a {
  font-size: var(--fs-body);
  color: var(--color-gray);
  padding: 0.4rem 0;
}

.nav__mobile-cta {
  margin-top: var(--space-2xs);
  text-align: center;
  padding: 0.7rem;
  border-radius: var(--radius-full);
  background: var(--gradient-purple);
  color: #fff;
  font-weight: 600;
}

.menu-enter-active, .menu-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 860px) {
  .nav__links, .nav__cta {
    display: none;
  }
  .nav__toggle {
    display: flex;
  }
  .nav {
    display: block;
  }
  .nav__bar {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
