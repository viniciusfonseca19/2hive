# 2Hive — Portfólio

Portfólio institucional da 2Hive construído como se fosse o próprio software da empresa: uma central de comando escura, com malha hexagonal, glassmorphism e transições cinematográficas.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **CSS puro** com variáveis de design (sem Tailwind/Bootstrap)
- **GSAP** para reveals de scroll e contadores animados
- **Vite** como bundler

## Rodando o projeto

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Para build de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  components/
    layout/     → NavBar, FooterSection
    sections/   → Hero, About, Services, Projects, Process, Tech, CTA
    ui/         → HexBackground, ProjectModal (peças reutilizáveis)
  composables/  → useMouse, useMagnetic, useScrollReveal
  styles/       → variables.css (tokens de marca), global.css
  App.vue
  main.js
```

## Personalização

- Cores, espaçamentos e tipografia ficam centralizados em `src/styles/variables.css`.
- Os projetos exibidos no "mapa de operações" estão em `src/components/sections/ProjectsMap.vue` (array `projects`) — edite objetivo, stack e resultado de cada case por ali.
- E-mail, telefone e redes sociais do rodapé ficam em `src/components/layout/FooterSection.vue`.
