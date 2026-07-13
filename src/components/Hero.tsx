import { useRef } from 'react'
import type { Variants } from 'motion/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Palette, Megaphone, Search, Shield } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  interactionTransition,
  motionDuration,
  motionEase,
} from '../lib/animations'
import HeroDeltaField from './HeroDeltaField'

const valuePropIcons = [Palette, Megaphone, Search, Shield]

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.outExpo },
  },
}

export default function Hero() {
  const { lang, t } = useLanguage()
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 44])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.82, 0.58])

  const words = t.hero.title.split(' ')
  const gradientFrom = words.length - 2

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <HeroDeltaField scrollProgress={scrollYProgress} />

      <motion.div
        key={lang}
        variants={heroContainer}
        initial={reducedMotion ? false : 'hidden'}
        animate="visible"
        style={reducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24"
      >
        <motion.span
          variants={heroItem}
          className="inline-block rounded-full border border-ink/15 bg-base/55 px-4 py-1.5 text-sm text-ink/70 backdrop-blur-sm"
        >
          {t.hero.badge}
        </motion.span>

        <motion.h1
          variants={heroItem}
          className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight md:text-7xl"
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`mr-[0.25em] inline-block ${
                index >= gradientFrom
                  ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {word}
            </span>
          ))}
        </motion.h1>

        <motion.p variants={heroItem} className="mt-6 max-w-xl text-lg text-ink/60">
          {t.hero.subtitle}
        </motion.p>

        <motion.ul
          variants={heroItem}
          className="mt-8 flex max-w-5xl flex-wrap gap-3"
          aria-label="Qué hacemos"
        >
          {t.hero.valueProps.map((prop, index) => {
            const Icon = valuePropIcons[index]
            return (
              <li key={prop}>
                <motion.span
                  whileHover={reducedMotion ? undefined : { y: -2, scale: 1.02 }}
                  transition={interactionTransition}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-base/55 px-4 py-2 text-sm text-ink/70 backdrop-blur-sm transition-[border-color,color,box-shadow] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-primary/40 hover:text-ink hover:shadow-md hover:shadow-primary/10"
                >
                  <Icon className="size-3.5 shrink-0 text-accent" />
                  {prop}
                </motion.span>
              </li>
            )
          })}
        </motion.ul>

        <motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#contact"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            transition={interactionTransition}
            data-cuelume-press
            data-cuelume-release
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-[box-shadow] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:shadow-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4 transition-transform duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#services"
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            transition={interactionTransition}
            data-cuelume-hover="tick"
            data-cuelume-press
            className="rounded-full border border-ink/15 bg-base/35 px-6 py-3 font-medium text-ink/80 backdrop-blur-sm transition-[background-color,border-color,color] duration-200 [transition-timing-function:var(--ease-out-quart)] hover:border-ink/30 hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
