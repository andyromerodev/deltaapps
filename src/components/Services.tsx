import type { PointerEvent as ReactPointerEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Palette, Megaphone, Code2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  fadeUp,
  interactionTransition,
  motionDuration,
  motionEase,
  viewportOnce,
} from '../lib/animations'

const icons = [Palette, Megaphone, Code2]

function cardReveal(index: number): Variants {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionDuration.reveal,
        delay: index * 0.07,
        ease: motionEase.outExpo,
      },
    },
  }
}

export default function Services() {
  const { t } = useLanguage()
  const reducedMotion = useReducedMotion()

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
        {t.services.items.map((service, i) => {
          const Icon = icons[i]
          return (
            <motion.article
              key={service.title}
              variants={cardReveal(i)}
              initial={reducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={viewportOnce}
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
