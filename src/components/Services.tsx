import { motion } from 'motion/react'
import { Palette, Megaphone, Code2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/animations'

const icons = [Palette, Megaphone, Code2]

export default function Services() {
  const { t } = useLanguage()

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

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {t.services.items.map((service, i) => {
          const Icon = icons[i]
          return (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              data-cuelume-hover="chime"
              className="group rounded-2xl border border-ink/10 bg-surface p-8 transition-colors hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="size-6 text-accent" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-ink/60">{service.description}</p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}
