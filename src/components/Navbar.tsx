import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { useSound } from '../sound/SoundContext'
import type { Language } from '../i18n/translations'
import {
  interactionTransition,
  motionDuration,
  motionEase,
} from '../lib/animations'
import LogoMark from './Logo'

const LANGS: Language[] = ['es', 'en']

const iconButtonClasses =
  'flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-[background-color,border-color,color] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-ink/30 hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { soundOn, toggleSound } = useSound()
  const reducedMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16))

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: motionDuration.reveal, ease: motionEase.outExpo }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] ${
        scrolled
          ? 'border-ink/15 bg-base/90 shadow-lg shadow-black/20'
          : 'border-ink/10 bg-base/70'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <motion.span
            whileHover={reducedMotion ? undefined : { y: -1, rotate: -3, scale: 1.04 }}
            transition={interactionTransition}
            className="inline-flex"
          >
            <LogoMark className="size-7" />
          </motion.span>
          <span className="text-[1rem] tracking-[0.18em]">DELTA APPS</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cuelume-hover="tick"
              className="relative py-2 text-sm text-ink/60 transition-colors [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:[transition-duration:var(--motion-state)] after:[transition-timing-function:var(--ease-out-quart)] hover:text-ink hover:after:scale-x-100 focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent focus-visible:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/blog"
            data-cuelume-hover="tick"
            className="relative py-2 text-sm text-ink/60 transition-colors [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:[transition-duration:var(--motion-state)] after:[transition-timing-function:var(--ease-out-quart)] hover:text-ink hover:after:scale-x-100 focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent focus-visible:after:scale-x-100"
          >
            {t.nav.blog}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            data-cuelume-toggle
            aria-label={t.nav.soundToggle}
            aria-pressed={soundOn}
            className={iconButtonClasses}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={soundOn ? 'on' : 'off'}
                initial={reducedMotion ? false : { scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reducedMotion ? undefined : { scale: 0.8, opacity: 0 }}
                transition={{ duration: motionDuration.instant, ease: motionEase.outQuart }}
                className="inline-flex"
              >
                {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={toggleTheme}
            data-cuelume-toggle
            aria-label={t.nav.themeToggle}
            className={iconButtonClasses}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={reducedMotion ? false : { rotate: -70, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reducedMotion ? undefined : { rotate: 50, opacity: 0 }}
                transition={{ duration: motionDuration.instant, ease: motionEase.outQuart }}
                className="inline-flex"
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <div className="relative flex rounded-full border border-ink/15 p-0.5 text-xs font-medium">
            {LANGS.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`relative isolate rounded-full px-2.5 py-1 uppercase transition-colors [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  lang === code ? 'text-ink' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {lang === code && (
                  <motion.span
                    layoutId="active-language"
                    transition={interactionTransition}
                    className="absolute inset-0 -z-10 rounded-full bg-ink/10"
                  />
                )}
                {code}
              </button>
            ))}
          </div>
          <motion.a
            href="#contact"
            whileHover={reducedMotion ? undefined : { y: -1 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            transition={interactionTransition}
            data-cuelume-press
            data-cuelume-release
            className="hidden rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-medium text-white shadow-sm shadow-primary/20 transition-[box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:shadow-md hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block"
          >
            {t.nav.cta}
          </motion.a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            data-cuelume-toggle
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className={`${iconButtonClasses} md:hidden`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={reducedMotion ? false : { opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, rotate: 35, scale: 0.85 }}
                transition={{ duration: motionDuration.instant, ease: motionEase.outQuart }}
                className="inline-flex"
              >
                {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -7, scale: 0.99 }}
            transition={{
              duration: reducedMotion ? 0 : motionDuration.state,
              ease: motionEase.outExpo,
            }}
            className="absolute inset-x-0 top-full origin-top border-t border-ink/10 bg-base shadow-lg shadow-black/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  data-cuelume-hover="tick"
                  className="rounded-lg px-3 py-2 text-ink/70 transition-[background-color,color] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                data-cuelume-hover="tick"
                className="rounded-lg px-3 py-2 text-ink/70 transition-[background-color,color] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t.nav.blog}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-primary to-accent"
      />
    </motion.header>
  )
}
