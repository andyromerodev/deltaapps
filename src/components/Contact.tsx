import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { play } from 'cuelume'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/animations'

// Cambiar por el correo real de la empresa
const CONTACT_EMAIL = 'hola@deltaapps.dev'

const inputClasses =
  'w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-primary'

export default function Contact() {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`DeltaApps — ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    play('success')
  }

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-2xl px-6 py-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-center font-display text-3xl font-bold md:text-5xl"
        >
          {t.contact.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-center text-lg text-ink/60">
          {t.contact.subtitle}
        </motion.p>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-ink/70">
              {t.contact.name}
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.namePlaceholder}
                className={inputClasses}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-ink/70">
              {t.contact.email}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.emailPlaceholder}
                className={inputClasses}
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-ink/70">
            {t.contact.message}
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contact.messagePlaceholder}
              className={`${inputClasses} resize-none`}
            />
          </label>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            data-cuelume-press
            className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-primary/50"
          >
            {t.contact.submit}
            <Send className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  )
}
