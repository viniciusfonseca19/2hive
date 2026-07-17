<template>
  <section id="time" class="team-showcase section" ref="rootRef">
    <div class="team-showcase__head" data-reveal>
      <p class="eyebrow">Time · visão + execução</p>
      <h2 class="team-showcase__title">Os rostos por trás das soluções que ganham atenção.</h2>
      <p class="team-showcase__intro">
        Dois perfis com forte presença técnica e estratégica, prontos para transformar ideias em experiências que convertem.
      </p>
    </div>

    <div class="team-showcase__grid">
      <article
        v-for="person in people"
        :key="person.name"
        class="team-card glass-panel"
        data-reveal
      >
        <div class="team-card__visual">
          <div class="team-card__avatar" :style="{ '--avatar-gradient': person.gradient }">
            <img
              :src="person.image"
              :alt="person.name"
              class="team-card__photo"
              :style="{
                transform: person.imageScale ? `scale(${person.imageScale})` : 'scale(1)',
                objectPosition: person.imagePosition || 'center'
              }"
            />
          </div>
          <div class="team-card__orbit"></div>
          <div class="team-card__glow"></div>
        </div>

        <div class="team-card__body">
          <span class="team-card__role">{{ person.role }}</span>
          <h3 class="team-card__name">{{ person.name }}</h3>
          <p class="team-card__bio">{{ person.bio }}</p>

          <ul class="team-card__specialties">
            <li v-for="specialty in person.specialties" :key="specialty">
              {{ specialty }}
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../../composables/useScrollReveal'

const rootRef = ref(null)
useScrollReveal(rootRef, '[data-reveal]', { stagger: 0.12 })

const people = [
  {
    name: 'Vinícius Fonseca',
    initials: 'VF',
    role: 'Desenvolvedor Fullstack',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
    image: '/users/vinidev.jpg',
    imageScale: '1.04',
    imagePosition: 'center 24%',
    bio: 'Desenvolvedor Fullstack com amplo conhecimento em sites e serviços que chamam a atenção do cliente em minutos.',
    specialties: ['Sites', 'Automações', 'IAs', 'APIs']
  },
  {
    name: 'Micael Rauan',
    initials: 'MR',
    role: 'Desenvolvedor Fullstack',
    gradient: 'linear-gradient(135deg, #ff7a18 0%, #b45309 100%)',
    image: '/users/micaeldev.jpg',
    bio: 'Especialista em resolver problemas complexos e transformar o posicionamento de negócios em experiências marcantes.',
    specialties: ['Sites', 'Automações', 'Design', 'APIs']
  }
]
</script>

<style scoped>
.team-showcase {
  position: relative;
  padding-top: calc(var(--space-xl) + 2rem);
}

.team-showcase__head {
  max-width: 760px;
  margin-bottom: var(--space-xl);
}

.team-showcase__title {
  font-size: var(--fs-h1);
  margin-top: var(--space-sm);
}

.team-showcase__intro {
  margin-top: var(--space-sm);
  color: var(--color-gray);
  max-width: 680px;
  line-height: 1.7;
}

.team-showcase__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-lg);
}

.team-card {
  position: relative;
  overflow: hidden;
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 460px;
  transition: transform 0.35s var(--ease-out-expo), box-shadow 0.35s var(--ease-out-expo), border-color 0.35s ease;
  animation: card-float 7s ease-in-out infinite;
  transform-style: preserve-3d;
}

.team-card:nth-child(2) {
  animation-delay: 1.2s;
}

.team-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.28);
}

.team-card__visual {
  position: relative;
  display: grid;
  place-items: center;
  margin-bottom: var(--space-lg);
  width: 100%;
  min-height: 220px;
}

.team-card__avatar {
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--avatar-gradient);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: avatar-breathe 3.8s ease-in-out infinite;
  overflow: hidden;
}

.team-card__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.team-card__orbit {
  position: absolute;
  inset: -14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  animation: orbit-spin 8s linear infinite;
}

.team-card__glow {
  position: absolute;
  inset: auto 20px 0;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.24), transparent 70%);
  filter: blur(16px);
  opacity: 0.7;
  animation: glow-shift 4s ease-in-out infinite alternate;
}

.team-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.team-card__role {
  color: var(--color-purple-light);
  font-size: var(--fs-small);
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.team-card__name {
  font-size: var(--fs-h3);
}

.team-card__bio {
  color: var(--color-gray);
  line-height: 1.7;
  max-width: 320px;
}

.team-card__specialties {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-xs);
  padding: 0;
  margin: 0;
  list-style: none;
}

.team-card__specialties li {
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.team-card:hover .team-card__specialties li {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.28);
}

@keyframes avatar-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glow-shift {
  from { transform: scaleX(0.9); opacity: 0.55; }
  to { transform: scaleX(1.08); opacity: 0.9; }
}

@keyframes card-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@media (max-width: 900px) {
  .team-showcase__grid {
    grid-template-columns: 1fr;
  }
}
</style>
