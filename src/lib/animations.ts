import type { Variants } from 'motion/react'

type CubicBezier = [number, number, number, number]

export const motionDuration = {
  instant: 0.12,
  state: 0.22,
  reveal: 0.52,
  hero: 0.76,
} as const

export const motionEase: Record<'outQuart' | 'outExpo' | 'in', CubicBezier> = {
  outQuart: [0.25, 1, 0.5, 1],
  outExpo: [0.16, 1, 0.3, 1],
  in: [0.7, 0, 0.84, 0],
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.outExpo },
  },
}

export const fadeSoft: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionDuration.reveal, ease: motionEase.outQuart },
  },
}

export const fadeFromRight: Variants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: motionDuration.reveal, ease: motionEase.outExpo },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

export const viewportOnce = { once: true, margin: '-80px' } as const

export const interactionTransition = {
  duration: motionDuration.state,
  ease: motionEase.outQuart,
}
