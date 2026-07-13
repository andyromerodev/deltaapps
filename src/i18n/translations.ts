export const translations = {
  es: {
    nav: {
      services: 'Servicios',
      about: 'Nosotros',
      contact: 'Contacto',
      cta: 'Hablemos',
      themeToggle: 'Cambiar tema',
      soundToggle: 'Activar/desactivar sonido',
    },
    hero: {
      badge: 'Diseño · Marketing · Software',
      title: 'Llevamos tu idea al siguiente nivel',
      subtitle:
        'Somos DeltaApps: diseñamos marcas memorables, creamos estrategias de marketing que conectan y desarrollamos software que impulsa tu negocio.',
      valueProps: [
        'Diseñamos tu presencia digital',
        'Promovemos tu sitio',
        'SEO para aparecer en búsquedas',
        'Monitoreamos la seguridad',
      ],
      ctaPrimary: 'Inicia tu proyecto',
      ctaSecondary: 'Ver servicios',
    },
    marquee: [
      'Identidad de marca',
      'UI/UX',
      'Sitios web',
      'Apps móviles',
      'SEO',
      'Redes sociales',
      'E-commerce',
      'Sistemas a medida',
    ],
    services: {
      title: 'Lo que hacemos',
      subtitle:
        'Tres disciplinas, un mismo objetivo: hacer crecer tu negocio.',
      items: [
        {
          title: 'Diseño',
          description:
            'Identidad de marca, UI/UX y diseño gráfico que hacen que tu empresa se vea tan bien como funciona.',
        },
        {
          title: 'Marketing',
          description:
            'Estrategias digitales, redes sociales y campañas que llevan tu mensaje a las personas correctas.',
        },
        {
          title: 'Desarrollo de software',
          description:
            'Sitios web, apps móviles y sistemas a medida construidos con tecnología moderna y escalable.',
        },
      ],
    },
    about: {
      title: 'Sobre nosotros',
      text: 'DeltaApps nace de la convicción de que las pequeñas y medianas empresas merecen diseño, marketing y tecnología de primer nivel. Combinamos creatividad y código para entregar soluciones completas, sin intermediarios y a tu medida.',
      stats: [
        { value: '3 en 1', label: 'Diseño, marketing y desarrollo bajo un mismo techo' },
        { value: '100%', label: 'Proyectos a la medida de cada cliente' },
        { value: 'Δ', label: 'El cambio que tu negocio necesita' },
      ],
    },
    contact: {
      title: '¿Listo para empezar?',
      subtitle:
        'Cuéntanos tu idea y te responderemos en menos de 24 horas.',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto…',
      submit: 'Enviar mensaje',
    },
    footer: {
      tagline: 'Diseño, marketing y software para hacer crecer tu negocio.',
      rights: 'Todos los derechos reservados.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      cta: "Let's talk",
      themeToggle: 'Toggle theme',
      soundToggle: 'Toggle sound',
    },
    hero: {
      badge: 'Design · Marketing · Software',
      title: 'Taking your idea to the next level',
      subtitle:
        'We are DeltaApps: we design memorable brands, craft marketing strategies that connect, and build software that powers your business.',
      valueProps: [
        'We design your digital presence',
        'We promote your site',
        'SEO to rank in search results',
        'We monitor your security',
      ],
      ctaPrimary: 'Start your project',
      ctaSecondary: 'See services',
    },
    marquee: [
      'Brand identity',
      'UI/UX',
      'Websites',
      'Mobile apps',
      'SEO',
      'Social media',
      'E-commerce',
      'Custom systems',
    ],
    services: {
      title: 'What we do',
      subtitle: 'Three disciplines, one goal: growing your business.',
      items: [
        {
          title: 'Design',
          description:
            'Brand identity, UI/UX, and graphic design that make your company look as good as it works.',
        },
        {
          title: 'Marketing',
          description:
            'Digital strategies, social media, and campaigns that carry your message to the right people.',
        },
        {
          title: 'Software development',
          description:
            'Websites, mobile apps, and custom systems built with modern, scalable technology.',
        },
      ],
    },
    about: {
      title: 'About us',
      text: 'DeltaApps was born from the conviction that small and medium businesses deserve first-class design, marketing, and technology. We blend creativity and code to deliver complete solutions — no middlemen, tailored to you.',
      stats: [
        { value: '3 in 1', label: 'Design, marketing, and development under one roof' },
        { value: '100%', label: 'Projects tailored to every client' },
        { value: 'Δ', label: 'The change your business needs' },
      ],
    },
    contact: {
      title: 'Ready to get started?',
      subtitle: "Tell us your idea and we'll get back to you within 24 hours.",
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell us about your project…',
      submit: 'Send message',
    },
    footer: {
      tagline: 'Design, marketing, and software to grow your business.',
      rights: 'All rights reserved.',
    },
  },
} as const

export type Language = keyof typeof translations
export type Translation = (typeof translations)[Language]
