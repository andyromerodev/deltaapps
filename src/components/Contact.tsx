import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import { Send } from 'lucide-react'
import { play } from 'cuelume'
import { useLanguage } from '../i18n/LanguageContext'
import {
  fadeSoft,
  interactionTransition,
  viewportOnce,
} from '../lib/animations'

// Cambiar por el correo real de la empresa
const CONTACT_EMAIL = 'hola@deltaapps.dev'

const inputClasses =
  'w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink placeholder:text-ink/30 outline-none transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-ink/20 focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklch,var(--color-primary)_18%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

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
        variants={fadeSoft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-2xl px-6 py-24"
      >
        <h2 className="text-center font-display text-3xl font-bold md:text-5xl">
          {t.contact.title}
        </h2>
        <p className="mt-4 text-center text-lg text-ink/60">
          {t.contact.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-ink/70 transition-colors [transition-duration:var(--motion-state)] focus-within:text-ink">
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
            <label className="flex flex-col gap-2 text-sm text-ink/70 transition-colors [transition-duration:var(--motion-state)] focus-within:text-ink">
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
          <label className="flex flex-col gap-2 text-sm text-ink/70 transition-colors [transition-duration:var(--motion-state)] focus-within:text-ink">
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
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={interactionTransition}
            data-cuelume-press
            className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 font-medium text-white shadow-lg shadow-primary/30 transition-[box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:shadow-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t.contact.submit}
            <Send className="size-4 transition-transform [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}
