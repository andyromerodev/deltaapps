# Plan — Landing Page DeltaApps

## Contexto

Landing page para DeltaApps, pequeña empresa de diseño, marketing y desarrollo de software. Proyecto desde cero en este folder.

Decisiones confirmadas:
- **Stack**: React + Vite (TypeScript) + Tailwind CSS v4
- **Animaciones**: Motion (sucesor de Framer Motion) + lucide-react para iconos
- **Estilo**: oscuro moderno tech — fondo casi negro (`#0A0A0F`), acento gradiente violeta → cian (`#7C3AED` → `#22D3EE`), glow, bordes `white/10`
- **Tipografía**: Space Grotesk (títulos) + Inter (texto), vía Google Fonts
- **Idioma**: bilingüe ES/EN con toggle en navbar (i18n propio ligero, sin biblioteca)
- **Secciones**: Hero, Servicios, Sobre nosotros, Contacto/CTA

## Subtareas

Ejecutar en orden. Cada subtarea es autocontenida para poder medir el consumo de tokens por separado (anotar el consumo en la tabla al final).

### Subtarea 1 — Scaffold y configuración
- [x] `pnpm create vite@latest . --template react-ts`
- [x] `pnpm add motion lucide-react` y `pnpm add -D tailwindcss @tailwindcss/vite`
- [x] Configurar plugin `@tailwindcss/vite` en `vite.config.ts`
- [x] `src/index.css`: `@import "tailwindcss";` + tokens de diseño con `@theme` (colores de fondo, superficie, acentos, fuentes)
- [x] `index.html`: fuentes Google (Space Grotesk + Inter), title y meta description
- [x] Limpiar boilerplate de Vite (App.css, assets demo)
- [x] Verificar: `pnpm dev` levanta sin errores

### Subtarea 2 — i18n ligero
- [x] `src/i18n/translations.ts`: diccionarios `es` y `en` con todo el copy de la página (navbar, hero, servicios, about, contacto, footer)
- [x] `src/i18n/LanguageContext.tsx`: contexto con `lang`, `setLang`, helper `t()`; idioma inicial del navegador; persistencia en `localStorage`
- [x] Verificar: compila con `pnpm build`

### Subtarea 3 — Navbar y Hero
- [x] `src/components/Navbar.tsx`: sticky con `backdrop-blur`, logo DeltaApps (Δ con gradiente), links a secciones, toggle ES/EN, entrada con fade-down
- [x] `src/components/Hero.tsx`: titular con reveal escalonado (Motion `stagger`), orbes de gradiente animados de fondo (blur + loop infinito), badge "Diseño · Marketing · Software", CTA con glow al hover
- [x] Montar en `App.tsx` dentro de `LanguageProvider`
- [x] Verificar en navegador: animaciones del hero y toggle de idioma funcionando

### Subtarea 4 — Servicios y Sobre nosotros
- [x] `src/components/Services.tsx`: 3 tarjetas (Diseño, Marketing, Desarrollo de software) con icono lucide, reveal al scroll (`whileInView`, `once: true`), hover con elevación y borde gradiente
- [x] `src/components/About.tsx`: presentación + 2-3 stats/valores con reveal al scroll
- [x] Variante compartida `fadeUp` reutilizable para los reveals (`src/lib/animations.ts`)
- [x] Verificar en navegador: reveals al hacer scroll

### Subtarea 5 — Contacto y Footer
- [x] `src/components/Contact.tsx`: CTA final con formulario (nombre, email, mensaje) que abre `mailto:` al enviar, fondo con glow
- [x] `src/components/Footer.tsx`: logo, redes (placeholders con texto — lucide-react eliminó los iconos de marcas), copyright
- [x] Verificar: flujo completo de la página de arriba a abajo

### Subtarea 6 — Pulido y verificación final
- [x] Respetar `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` en App + `useReducedMotion` en orbes del Hero)
- [x] Responsive: revisado en 375px (mobile) y 1280px (desktop); menú móvil hamburguesa agregado al navbar
- [x] Probar ambos idiomas completos y persistencia al recargar
- [x] Consola del navegador sin errores; `pnpm build` limpio

## Registro de consumo de tokens

| Subtarea | Tokens (según /ctx-stats o /cost) | Notas |
|---|---|---|
| 1 — Scaffold | | |
| 2 — i18n | | |
| 3 — Navbar + Hero | | |
| 4 — Servicios + About | | |
| 5 — Contacto + Footer | | |
| 6 — Pulido | | |
