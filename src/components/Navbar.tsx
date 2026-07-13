import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { useSound } from '../sound/SoundContext'
import type { Language } from '../i18n/translations'
import LogoMark from './Logo'

const LANGS: Language[] = ['es', 'en']

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { soundOn, toggleSound } = useSound()
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
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-ink/15 bg-base/90 shadow-lg shadow-black/20'
          : 'border-ink/10 bg-base/70'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5 font-display font-bold">
          <motion.span
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <LogoMark className="size-7" />
          </motion.span>
          <span className="text-[1rem] tracking-[0.18em]">DELTA APPS</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cuelume-hover="tick"
              className="text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            data-cuelume-toggle
            aria-label={t.nav.soundToggle}
            aria-pressed={soundOn}
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={soundOn ? 'on' : 'off'}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2 }}
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
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <div className="flex overflow-hidden rounded-full border border-ink/15 text-xs font-medium">
            {LANGS.map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1.5 uppercase transition-colors ${
                  lang === code ? 'bg-ink/10 text-ink' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href="#contact"
            data-cuelume-press
            data-cuelume-release
            className="hidden rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-medium text-white transition-transform hover:scale-105 sm:block"
          >
            {t.nav.cta}
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            data-cuelume-toggle
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink/70 md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  data-cuelume-hover="tick"
                  className="rounded-lg px-3 py-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
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
