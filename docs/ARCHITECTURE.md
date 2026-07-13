# Arquitectura del Proyecto — DeltaApps

## Stack
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (plugin de Vite, sin `tailwind.config.js`)
- **Motion** (`motion/react`) para animaciones declarativas
- **React Router v7** para navegación SPA
- **MDX** para contenido del blog
- Deploy en **Cloudflare Pages**

---

## Principios SOLID

Cada feature nueva debe respetar estos principios.

### S — Single Responsibility Principle
Un archivo, una responsabilidad.
- **Componentes**: solo renderizan. No llaman a APIs ni acceden a archivos.
- **Use cases**: solo orquestan lógica de negocio. No renderizan nada.
- **Repositorios**: solo acceden a la fuente de datos. No tienen lógica de negocio.

```
❌ BlogPage.tsx haciendo import.meta.glob directamente
✅ BlogPage.tsx → getBlogPosts() → mdxBlogRepository
```

### O — Open/Closed Principle
Abierto a extensión, cerrado a modificación.
- Nueva fuente de datos (Sanity, Contentful, API REST): implementa `IBlogRepository` sin tocar `getBlogPosts.ts` ni los componentes.

```ts
// Nuevo CMS: solo crear este archivo, nada más cambia
export class SanityBlogRepository implements IBlogRepository { ... }
```

### L — Liskov Substitution Principle
Cualquier implementación de `IBlogRepository` es intercambiable.
- `MdxBlogRepository` y cualquier futura implementación deben comportarse igual desde el punto de vista de los use cases.

### I — Interface Segregation Principle
Interfaces pequeñas y específicas.
- `IBlogRepository` solo expone lo que los use cases necesitan:
  ```ts
  getPosts(): Promise<BlogPost[]>
  getPostBySlug(slug: string): Promise<BlogPost | null>
  ```
- No añadir métodos que no consuman los use cases actuales.

### D — Dependency Inversion Principle
Los módulos de alto nivel no dependen de módulos de bajo nivel.
- Los **componentes** dependen de **use cases** (abstracciones).
- Los **use cases** dependen de **`IBlogRepository`** (interfaz).
- La implementación concreta (`MdxBlogRepository`) se pasa desde fuera.

```
UI → application (use case) → IBlogRepository ← MdxBlogRepository
```

---

## Clean Architecture — 4 Capas

Las dependencias siempre fluyen **hacia adentro**. Las capas internas nunca importan capas externas.

```
┌─────────────────────────────────────┐
│  ui (React components, páginas)     │  ← capa más externa
├─────────────────────────────────────┤
│  application (use cases)            │
├─────────────────────────────────────┤
│  data (repositorios concretos)      │
├─────────────────────────────────────┤
│  domain (tipos, interfaces)         │  ← capa más interna
└─────────────────────────────────────┘
```

### `domain/`
- Solo tipos TypeScript e interfaces.
- **Sin imports de librerías externas.**
- Ejemplo: `BlogPost.ts`, `IBlogRepository.ts`

### `data/`
- Implementaciones concretas de los repositorios.
- Accede a la fuente de datos (MDX, API, etc.).
- Solo importa desde `domain/` y librerías externas de acceso a datos.
- Ejemplo: `MdxBlogRepository.ts`, archivos `.mdx`

### `application/`
- Use cases: funciones o clases que implementan un caso de uso.
- Solo importan desde `domain/` (y reciben implementaciones de `data/` por inyección).
- Sin imports de React ni de UI.
- Ejemplo: `getBlogPosts.ts`, `getBlogPost.ts`

### `ui/`
- Componentes React, páginas, elementos visuales.
- Solo llaman a use cases de `application/`. Nunca importan de `data/` directamente.
- Ejemplo: `BlogPage.tsx`, `BlogCard.tsx`, `BlogSection.tsx`

---

## Estructura de Carpetas

Cada feature grande vive en su propia carpeta con las 4 capas:

```
src/
├── blog/
│   ├── domain/
│   ├── data/
│   │   └── posts/          # archivos .mdx
│   ├── application/
│   └── ui/
│       └── components/
├── components/             # componentes compartidos de la landing
├── i18n/                   # sistema de traducciones ES/EN
├── lib/                    # utilidades compartidas (animations.ts, etc.)
├── sound/                  # contexto de sonido
└── theme/                  # contexto de tema
```

---

## Convenciones de Código

- **Nombres de archivos**: `PascalCase` para componentes, `camelCase` para use cases y repositorios.
- **Interfaces**: prefijo `I` solo en interfaces de repositorio (`IBlogRepository`). Los tipos de dominio sin prefijo (`BlogPost`).
- **Exports**: `default export` para componentes React, `named export` para use cases y tipos.
- **Traducciones**: toda cadena visible al usuario pasa por `useLanguage()`. Nunca texto hardcodeado en componentes.
- **Animaciones**: usar variantes de `src/lib/animations.ts` siempre que sea posible antes de crear nuevas.
- **Temas**: usar tokens semánticos (`bg-base`, `text-ink`, `bg-surface`) en vez de colores directos.

---

## Añadir un Nuevo Feature (Checklist)

1. [ ] Definir tipos en `domain/`
2. [ ] Crear interfaz de repositorio en `domain/` si hay acceso a datos
3. [ ] Implementar repositorio en `data/`
4. [ ] Escribir use cases en `application/`
5. [ ] Construir UI en `ui/` consumiendo los use cases
6. [ ] Añadir traducciones ES/EN en `src/i18n/translations.ts`
7. [ ] Si hay nuevas rutas, añadirlas en `src/App.tsx`
8. [ ] Verificar: `pnpm build` sin errores, rutas accesibles en producción
