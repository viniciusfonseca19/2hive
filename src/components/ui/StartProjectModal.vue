<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="modal__bar">
            <span class="modal__bar-title text-mono">start://projeto</span>
            <button class="modal__close" aria-label="Fechar" @click="$emit('close')">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="modal__content">
            <div class="modal__head">
              <span class="modal__status">Pronto para começar</span>
              <h3>Conte-nos sobre o seu projeto</h3>
              <p>Preencha os dados abaixo e a mensagem será enviada para vinifonsecadev@gmail.com.</p>
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
                  <input id="companyName" v-model="form.companyName" type="text" required placeholder="Nome da empresa" />
                </div>

                <div class="contact-form__field">
                  <label for="socials">Redes sociais</label>
                  <input id="socials" v-model="form.socials" type="text" required placeholder="Instagram, LinkedIn, TikTok..." />
                </div>

                <div class="contact-form__field contact-form__field--full">
                  <label for="whatsapp">Número de WhatsApp</label>
                  <input id="whatsapp" v-model="form.whatsapp" type="tel" required placeholder="(11) 99999-9999" />
                </div>
              </div>

              <button class="contact-form__button" type="submit">Quero começar</button>
              <p v-if="submitted" class="contact-form__success">Mensagem pronta para envio. Seu app de e-mail foi aberto com os dados preenchidos.</p>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['close'])

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

  window.location.href = `mailto:vinifonsecadev@gmail.com?subject=${subject}&body=${body}`
  submitted.value = true
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 6, 10, 0.75);
  backdrop-filter: blur(6px);
  padding: var(--space-md);
}

.modal {
  width: min(640px, 100%);
  max-height: 86vh;
  overflow-y: auto;
  background: var(--color-bg-panel);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 90px rgba(0,0,0,0.6), var(--shadow-glow-purple);
}

.modal__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-line);
}

.modal__bar-title {
  font-size: var(--fs-micro);
  color: var(--color-gray);
}

.modal__close {
  color: var(--color-gray);
  padding: 4px;
  border-radius: 50%;
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

.modal__head {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
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
  background: rgba(124, 58, 237, 0.14);
  color: var(--color-purple-light);
}

.modal__head h3 {
  font-size: var(--fs-h3);
  color: var(--color-white);
}

.modal__head p {
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

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal, .modal-leave-active .modal {
  transition: transform 0.35s var(--transition-base), opacity 0.35s var(--transition-base);
}
.modal-enter-from .modal, .modal-leave-to .modal {
  transform: scale(0.94) translateY(12px);
  opacity: 0;
}

@media (max-width: 600px) {
  .contact-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
