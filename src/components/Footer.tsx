import { motion, useReducedMotion, type Variants } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import { interactionTransition, motionDuration, motionEase } from '../lib/animations'
import LogoMark from './Logo'

function SocialIcon({
  path,
  viewBox = '0 0 640 640',
}: {
  path: string
  viewBox?: string
}) {
  return (
    <svg viewBox={viewBox} fill="currentColor" className="size-4.5" aria-hidden>
      <path d={path} />
    </svg>
  )
}

const socials = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z',
  },
] as const

const footerItems: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
}

const footerItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: motionDuration.reveal,
      ease: motionEase.outExpo,
    },
  },
}

export default function Footer() {
  const { t } = useLanguage()
  const reducedMotion = Boolean(useReducedMotion())

  return (
    <footer className="border-t border-ink/10">
      <motion.div
        variants={footerItems}
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.55, margin: '0px 0px -10%' }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center md:flex-row md:justify-between md:text-left"
      >
        <motion.div variants={footerItem}>
          <p className="flex items-center justify-center gap-2 font-display font-bold tracking-[0.18em] md:justify-start">
            <LogoMark className="size-5" />
            DELTA APPS
          </p>
          <p className="mt-2 text-sm text-ink/50">{t.footer.tagline}</p>
        </motion.div>

        <motion.div variants={footerItem} className="flex items-center gap-4">
          {socials.map(({ label, href, path }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.03 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={interactionTransition}
              className="flex size-12 items-center justify-center rounded-2xl border border-ink/12 bg-surface text-ink/70 shadow-[0_10px_30px_-22px_color-mix(in_oklch,var(--color-primary)_65%,transparent)] transition-[border-color,color,background-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-accent/45 hover:bg-ink/3 hover:text-accent hover:shadow-[0_16px_36px_-24px_color-mix(in_oklch,var(--color-accent)_55%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <SocialIcon path={path} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      <p className="border-t border-ink/5 py-4 text-center text-xs text-ink/40">
        © {new Date().getFullYear()} DeltaApps. {t.footer.rights}
      </p>
    </footer>
  )
}
