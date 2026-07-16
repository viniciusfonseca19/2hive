<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="project" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal" :class="`modal--${project.theme}`" role="dialog" aria-modal="true">
          <div class="modal__bar">
            <span class="modal__bar-title text-mono">projeto://{{ project.slug }}</span>
            <button class="modal__close" aria-label="Fechar" @click="$emit('close')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="modal__content">
            <div class="modal__head">
              <span class="modal__status" :class="`modal__status--${project.statusTone}`">{{ project.status }}</span>
              <h3 class="modal__name">{{ project.name }}</h3>
              <p class="modal__category">{{ project.category }}</p>
            </div>

            <p class="modal__summary">{{ project.summary }}</p>

            <div v-if="project.image" class="modal__preview">
              <img :src="project.image" :alt="`Preview de ${project.name}`" />
            </div>

            <div v-if="project.deployUrl" class="modal__deploy">
              <a :href="project.deployUrl" target="_blank" rel="noopener noreferrer">Ver deploy</a>
            </div>

            <div class="modal__grid">
              <div class="modal__field">
                <span class="modal__label text-mono">Objetivo</span>
                <p>{{ project.objective }}</p>
              </div>
              <div class="modal__field">
                <span class="modal__label text-mono">Resultado esperado</span>
                <p>{{ project.result }}</p>
              </div>
            </div>

            <div class="modal__field">
              <span class="modal__label text-mono">Tecnologias</span>
              <div class="modal__tags">
                <span v-for="t in project.stack" :key="t" class="tag">{{ t }}</span>
              </div>
            </div>

            <div class="modal__contact">
              <div class="modal__contact-head">
                <span class="modal__label text-mono">Comece o projeto</span>
                <h4>Pronto para construir algo incrível?</h4>
                <p>Preencha o formulário abaixo e a mensagem será enviada diretamente para contato@2Hive.com.br.</p>
              </div>

              <form class="contact-form" @submit.prevent="submitForm">
                <div class="contact-form__grid">
                  <div class="contact-form__field">
                    <label for="fullName">Nome Completo</label>
                    <input id="fullName" v-model="form.fullName" type="text" required placeholder="Seu nome" />
                  </div>

                  <div class="contact-form__field">
                    <label for="serviceType">Tipo de serviço</label>
                    <select id="serviceType" v-model="form.serviceType" required>
                      <option v-for="option in serviceOptions" :key="option" :value="option">{{ option }}</option>
                    </select>
                  </div>

                  <div class="contact-form__field">
                    <label for="companyName">Nome da empresa</label>
                    <input id="companyName" v-model="form.companyName" type="text" required placeholder="Nome da marca ou empresa" />
                  </div>

                  <div class="contact-form__field">
                    <label for="socials">Redes sociais da empresa</label>
                    <input id="socials" v-model="form.socials" type="text" required placeholder="Instagram, LinkedIn, TikTok..." />
                  </div>

                  <div class="contact-form__field contact-form__field--full">
                    <label for="whatsapp">Número de WhatsApp</label>
                    <input id="whatsapp" v-model="form.whatsapp" type="tel" required placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <button class="contact-form__button" type="submit">Quero começar</button>
                <p v-if="submitted" class="contact-form__success">Mensagem preparada para envio. Seu app de e-mail será aberto com os dados preenchidos.</p>
              </form>
            </div>

            <div class="modal__viz">
              <!-- Solara: linhas de energia -->
              <div v-if="project.theme === 'solara'" class="viz-solara">
                <svg viewBox="0 0 300 60" width="100%" height="60">
                  <polyline points="0,40 40,40 55,10 70,50 90,20 110,40 300,40" fill="none" stroke="url(#solaraGrad)" stroke-width="2" />
                  <defs>
                    <linearGradient id="solaraGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stop-color="#F5B942" />
                      <stop offset="1" stop-color="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <!-- Stokk: mini dashboard widgets -->
              <div v-else-if="project.theme === 'stokk'" class="viz-stokk">
                <div class="viz-stokk__widget" v-for="n in 4" :key="n">
                  <span class="viz-stokk__bar" :style="{ height: (30 + n * 14) + '%' }"></span>
                </div>
              </div>

              <!-- Vera: painel operacional -->
              <div v-else-if="project.theme === 'vera'" class="viz-vera">
                <span class="viz-vera__row">Pedido #204 <em>· preparando</em></span>
                <span class="viz-vera__row">Pedido #205 <em>· em rota</em></span>
                <span class="viz-vera__row">Pedido #206 <em>· na fila</em></span>
              </div>

              <!-- Cavalcanti: divisor elegante -->
              <div v-else-if="project.theme === 'cavalcanti'" class="viz-cavalcanti"></div>
            </div>

            <ul class="modal__highlights">
              <li v-for="h in project.highlights" :key="h">{{ h }}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'

defineProps({ project: { type: Object, default: null } })
defineEmits(['close'])

const form = reactive({
  fullName: '',
  serviceType: 'Landing Page',
  companyName: '',
  socials: '',
  whatsapp: ''
})

const serviceOptions = ['Landing Page', 'E-commerce', 'Sistema', 'Design', 'Automação', 'Inteligência Artificial']
const submitted = ref(false)

function submitForm() {
  const subject = encodeURIComponent(`Novo projeto - ${form.serviceType}`)
  const body = encodeURIComponent(
    `Nome Completo: ${form.fullName}\nTipo de serviço: ${form.serviceType}\nNome da empresa: ${form.companyName}\nRedes sociais da empresa: ${form.socials}\nNúmero de WhatsApp: ${form.whatsapp}`
  )

  window.location.href = `mailto:contato@2Hive.com.br?subject=${subject}&body=${body}`
  submitted.value = true
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 6, 10, 0.75);
  backdrop-filter: blur(6px);
  padding: var(--space-md);
}

.modal {
  width: min(680px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  background: var(--color-bg-panel);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 90px rgba(0,0,0,0.6), var(--shadow-glow-purple);
}

.modal--cavalcanti {
  box-shadow: 0 30px 90px rgba(0,0,0,0.6);
  border-color: var(--color-luxo-line);
}

.modal__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-line);
  position: sticky;
  top: 0;
  background: var(--color-bg-panel);
}

.modal__bar-title {
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.modal__close {
  color: var(--color-gray);
  padding: 4px;
  border-radius: 50%;
  transition: color var(--transition-fast), background var(--transition-fast);
}
.modal__close:hover {
  color: var(--color-white);
  background: rgba(255,255,255,0.06);
}

.modal__content {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.modal__status {
  display: inline-flex;
  width: fit-content;
  font-size: var(--fs-micro);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.7rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
}
.modal__status--live { background: rgba(40,200,64,0.12); color: #4ade80; }
.modal__status--progress { background: rgba(245,185,66,0.14); color: var(--color-amber); }

.modal__name {
  font-size: var(--fs-h2);
  margin-top: var(--space-2xs);
}

.modal__category {
  color: var(--color-purple-light);
  font-size: var(--fs-small);
}

.modal__summary {
  color: var(--color-gray);
  font-size: var(--fs-body-lg);
}

.modal__preview {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: rgba(255,255,255,0.03);
}

.modal__preview img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.modal__deploy {
  display: flex;
}

.modal__deploy a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1rem;
  border-radius: var(--radius-full);
  background: var(--gradient-purple);
  color: var(--color-white);
  font-weight: 600;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.modal__deploy a:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.24);
}

.modal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.modal__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.modal__label {
  font-size: var(--fs-micro);
  color: var(--color-gray);
  text-transform: uppercase;
}

.modal__field p {
  color: var(--color-white);
  font-size: var(--fs-body);
}

.modal__tags {
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

.modal__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.03);
}

.modal__contact-head {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.modal__contact-head h4 {
  font-size: var(--fs-h4);
  color: var(--color-white);
}

.modal__contact-head p {
  color: var(--color-gray);
  font-size: var(--fs-small);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.contact-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-form__field--full {
  grid-column: 1 / -1;
}

.contact-form__field label {
  font-size: var(--fs-micro);
  color: var(--color-gray);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.contact-form__field input,
.contact-form__field select {
  width: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-sm);
  background: rgba(6, 6, 10, 0.75);
  color: var(--color-white);
  font: inherit;
}

.contact-form__field input:focus,
.contact-form__field select:focus {
  outline: none;
  border-color: var(--color-purple-light);
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.18);
}

.contact-form__button {
  align-self: flex-start;
  padding: 0.8rem 1.15rem;
  border-radius: var(--radius-full);
  background: var(--gradient-purple);
  color: var(--color-white);
  font-weight: 600;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.contact-form__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.24);
}

.contact-form__success {
  color: #86efac;
  font-size: var(--fs-small);
}

.modal__viz {
  min-height: 60px;
}

.modal__highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  color: var(--color-gray);
  font-size: var(--fs-small);
}

.modal__highlights li::before {
  content: '— ';
  color: var(--color-purple-light);
}

.viz-solara svg {
  filter: drop-shadow(0 0 6px rgba(245, 185, 66, 0.5));
}

.viz-stokk {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-end;
  height: 60px;
}
.viz-stokk__widget {
  flex: 1;
  height: 100%;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: flex-end;
  padding: 4px;
  background: rgba(124,58,237,0.04);
}
.viz-stokk__bar {
  width: 100%;
  background: var(--gradient-purple);
  border-radius: 3px;
}

.viz-vera {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
}
.viz-vera__row {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm);
  color: var(--color-white);
}
.viz-vera__row em {
  color: var(--color-purple-light);
  font-style: normal;
}

.viz-cavalcanti {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-white), transparent);
  opacity: 0.4;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal, .modal-leave-active .modal {
  transition: transform 0.35s var(--ease-out-expo), opacity 0.35s var(--ease-out-expo);
}
.modal-enter-from .modal, .modal-leave-to .modal {
  transform: scale(0.94) translateY(12px);
  opacity: 0;
}

@media (max-width: 600px) {
  .modal__grid {
    grid-template-columns: 1fr;
  }

  .contact-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
