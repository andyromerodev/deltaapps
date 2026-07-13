import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeFromRight, staggerContainer, viewportOnce } from '../lib/animations'
import AnimatedSplitText from './AnimatedSplitText'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-y border-ink/10 bg-surface/50">
      <div className="mx-auto grid max-w-6xl scroll-mt-16 gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <AnimatedSplitText
            as="h2"
            text={t.about.title}
            className="font-display text-3xl font-bold md:text-5xl"
            inViewOptions={{ amount: 0.7, margin: '0px 0px -12%' }}
          />
          <AnimatedSplitText
            as="p"
            text={t.about.text}
            delay={0.14}
            stagger={0.038}
            className="mt-6 text-lg leading-relaxed text-ink/60"
            inViewOptions={{ amount: 0.6, margin: '0px 0px -10%' }}
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6"
        >
          {t.about.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeFromRight}
              className="rounded-2xl border border-ink/10 bg-base p-6"
            >
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-display text-3xl font-bold text-transparent">
                {stat.value}
              </span>
              <p className="mt-2 text-ink/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
