import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { motionDuration, motionEase, interactionTransition } from '../lib/animations'
import AnimatedSplitText from './AnimatedSplitText'

const projectMeta: Record<string, { url: string; live: boolean; from: string; to: string; initial: string }> = {
  babynanday:  { url: 'https://catalogobabynanday.shop/', live: true,  from: '#7c3aed', to: '#ec4899', initial: 'BN' },
  erislaine:   { url: 'https://erislaine.pages.dev/',    live: false, from: '#0d9488', to: '#3b82f6', initial: 'ET' },
  doctorangel: { url: 'https://doctorangel.pages.dev/',  live: false, from: '#3b82f6', to: '#22d3ee', initial: 'DA' },
  alkilo:      { url: 'https://alkilo.app/',             live: true,  from: '#16a34a', to: '#22d3ee', initial: 'AL' },
}

const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 32, scale: 0.97, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: motionDuration.reveal, ease: motionEase.outExpo },
  },
}

const cardStatic: Variants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export default function Works() {
  const { t } = useLanguage()
  const reducedMotion = Boolean(useReducedMotion())
  const variants = reducedMotion ? cardStatic : cardReveal

  return (
    <section id="works" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <div className="max-w-2xl">
        <AnimatedSplitText
          as="h2"
          text={t.works.title}
          className="font-display text-3xl font-bold md:text-5xl"
          inViewOptions={{ amount: 0.8, margin: '0px 0px -14%' }}
        />
        <AnimatedSplitText
          as="p"
          text={t.works.subtitle}
          delay={0.12}
          stagger={0.05}
          className="mt-4 text-lg text-ink/60"
          inViewOptions={{ amount: 0.75, margin: '0px 0px -14%' }}
        />
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {t.works.items.map((item) => {
          const meta = projectMeta[item.id]
          if (!meta) return null
          return (
            <motion.article
              key={item.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25, margin: '0px 0px -6%' }}
              whileHover={reducedMotion ? undefined : { y: -4, transition: interactionTransition }}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-surface transition-[border-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Gradient header */}
              <div
                className="relative h-44 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}
              >
                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-10 -left-6 size-40 rounded-full bg-white/[0.07]" />
                {/* Initials watermark */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-white/10 select-none">
                  {meta.initial}
                </span>
                {/* Status badge */}
                <div className="absolute left-4 top-4">
                  {meta.live ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <span className="size-1.5 animate-pulse rounded-full bg-green-400" />
                      {t.works.live}
                    </span>
                  ) : (
                    <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                      {t.works.inProgress}
                    </span>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent/80">
                  {item.category}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
                <a
                  href={meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-[gap,opacity] [transition-duration:var(--motion-state)] hover:gap-2.5 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t.works.visit}
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
