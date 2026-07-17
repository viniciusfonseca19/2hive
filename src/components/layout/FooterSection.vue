<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <svg class="footer__logo" viewBox="0 0 40 40" fill="none">
          <path d="M12 8h10l-8 9h8l-10 15" stroke="url(#footGrad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <defs>
            <linearGradient id="footGrad" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0" stop-color="#7C3AED" />
              <stop offset="1" stop-color="#B084FF" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <p class="footer__name">2Hive</p>
          <p class="footer__tagline">Tecnologia que conecta. Soluções que transformam.</p>
        </div>
      </div>

      <div class="footer__contact">
        <a href="mailto:contato@2hive.com.br" class="footer__link">contato@2hive.com.br</a>
        <a href="tel:+558594480856" class="footer__link">+55 85 94480-856</a>
      </div>

      <div class="footer__social">
        <a href="https://www.instagram.com/2hive.br/" aria-label="Instagram" class="footer__icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
        <a href="https://github.com/KODE-Desenvolvimento-Web" aria-label="GitHub" class="footer__icon">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M9 19c-4 1.5-4-1.5-6-2m12 4v-3.4c0-1 .1-1.5-.5-2.1 2.5-.3 5-1.3 5-5.5a4.3 4.3 0 0 0-1.2-3 4 4 0 0 0-.1-3s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C6.9 3.7 5.9 4 5.9 4a4 4 0 0 0-.1 3 4.3 4.3 0 0 0-1.2 3c0 4.2 2.5 5.2 5 5.5-.4.4-.4.9-.5 1.6V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <span class="hex-mini"></span>
      <p>© {{ year }} 2Hive. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: var(--space-2xl) var(--section-padding-x) var(--space-lg);
  border-top: 1px solid var(--color-line);
  max-width: var(--max-width);
  margin: 0 auto;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.footer__logo {
  width: 30px;
  height: 30px;
}

.footer__name {
  font-weight: 700;
  font-size: 1.1rem;
}

.footer__tagline {
  color: var(--color-gray);
  font-size: var(--fs-small);
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
  justify-content: center;
}

.footer__link {
  color: var(--color-gray);
  font-size: var(--fs-small);
  transition: color var(--transition-fast);
}
.footer__link:hover {
  color: var(--color-purple-light);
}

.footer__social {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.footer__icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--color-line-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  transition: color var(--transition-fast), border-color var(--transition-fast);
}
.footer__icon:hover {
  color: var(--color-purple-light);
  border-color: var(--color-purple-light);
}

.footer__bottom {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-gray);
  font-size: var(--fs-micro);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-line);
}

.hex-mini {
  width: 10px;
  height: 10px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background: var(--gradient-purple);
}
</style>
