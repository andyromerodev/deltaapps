import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import {
  Palette,
  Megaphone,
  Code2,
  Server,
  Lightbulb,
  Search,
  Video,
  ShoppingCart,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  fadeUp,
  interactionTransition,
  motionDuration,
  motionEase,
  viewportOnce,
} from '../lib/animations'

const iconMap: Record<string, React.ElementType> = {
  design: Palette,
  marketing: Megaphone,
  software: Code2,
  maintenance: Server,
  consulting: Lightbulb,
  seo: Search,
  multimedia: Video,
  ecommerce: ShoppingCart,
}

const serviceCardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.965,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: motionDuration.reveal,
      ease: motionEase.outExpo,
    },
  },
}

const serviceCardStatic: Variants = {
  hidden: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0,
    },
  },
}

function getServiceCardReveal(reducedMotion: boolean): Variants {
  return reducedMotion ? serviceCardStatic : serviceCardReveal
}

const serviceCardViewport = { once: true, amount: 0.55, margin: '0px 0px -8%' } as const

export default function Services() {
  const { t } = useLanguage()
  const reducedMotion = Boolean(useReducedMotion())
  const cardReveal = getServiceCardReveal(reducedMotion)

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    event.currentTarget.style.setProperty('--spot-x', `${x}%`)
    event.currentTarget.style.setProperty('--spot-y', `${y}%`)
  }

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-2xl"
      >
        <h2 className="font-display text-3xl font-bold md:text-5xl">{t.services.title}</h2>
        <p className="mt-4 text-lg text-ink/60">{t.services.subtitle}</p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {t.services.items.map((service) => {
          // Fallback to Palette if the id somehow doesn't exist, though it always should.
          const Icon = iconMap[service.id] || Palette
          return (
            <motion.article
              key={service.id}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={serviceCardViewport}
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -4, transition: interactionTransition }
              }
              onPointerMove={handlePointerMove}
              data-cuelume-hover="chime"
              className="service-card group rounded-2xl border border-ink/10 bg-surface p-8 transition-[border-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 transition-transform [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] group-hover:-rotate-3 group-hover:scale-[1.06]">
                <Icon className="size-6 text-accent" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-ink/60">{service.description}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
