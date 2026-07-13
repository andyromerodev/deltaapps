import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Palette, Megaphone, Search, Shield } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const valuePropIcons = [Palette, Megaphone, Search, Shield]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Hero() {
  const { lang, t } = useLanguage()
  const reducedMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, 90])
  const parallaxOpacity = useTransform(scrollY, [0, 500], [1, 0.1])

  const words = t.hero.title.split(' ')
  const gradientFrom = words.length - 2

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 right-1/5 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        key={lang}
        variants={container}
        initial="hidden"
        animate="visible"
        style={reducedMotion ? undefined : { y: parallaxY, opacity: parallaxOpacity }}
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <motion.span
          variants={item}
          className="inline-block rounded-full border border-ink/15 bg-ink/5 px-4 py-1.5 text-sm text-ink/70"
        >
          {t.hero.badge}
        </motion.span>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight md:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={item}
              className={`mr-[0.25em] inline-block ${
                i >= gradientFrom
                  ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-ink/60">
          {t.hero.subtitle}
        </motion.p>

        <motion.ul
          variants={item}
          className="mt-8 flex flex-wrap gap-3"
          aria-label="Qué hacemos"
        >
          {t.hero.valueProps.map((prop, i) => {
            const Icon = valuePropIcons[i]
            return (
              <li key={prop}>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/70 transition-colors hover:border-primary/40 hover:text-ink"
                >
                  <Icon className="size-3.5 shrink-0 text-accent" />
                  {prop}
                </motion.span>
              </li>
            )
          })}
        </motion.ul>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.96 }}
            data-cuelume-press
            data-cuelume-release
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#services"
            whileTap={{ scale: 0.96 }}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="rounded-full border border-ink/15 px-6 py-3 font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
