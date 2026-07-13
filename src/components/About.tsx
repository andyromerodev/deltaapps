import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeFromRight, fadeUp, staggerContainer, viewportOnce } from '../lib/animations'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-y border-ink/10 bg-surface/50">
      <div className="mx-auto grid max-w-6xl scroll-mt-16 gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <h2 className="font-display text-3xl font-bold md:text-5xl">{t.about.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/60">{t.about.text}</p>
        </motion.div>

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
