import { motion, useReducedMotion } from 'motion/react'
import { motionDuration, motionEase } from '../lib/animations'

// Logo real de DeltaApps, hereda color vía currentColor.
export default function LogoMark({ className }: { className?: string }) {
  const reducedMotion = Boolean(useReducedMotion())

  return (
    <motion.svg
      viewBox="0 0 1000 900"
      fill="none"
      className={className}
      aria-hidden
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.9 }}
    >
      <motion.path
        d="M500 100 L100 800 L900 800 Z"
        stroke="currentColor"
        strokeWidth="90"
        strokeLinejoin="miter"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: {
                duration: motionDuration.hero,
                ease: motionEase.outExpo,
              },
              opacity: {
                duration: motionDuration.state,
              },
            },
          },
        }}
      />
      <motion.path
        fill="currentColor"
        fillRule="evenodd"
        d="M500 315 L735 700 L650 700 L614 640 L386 640 L350 700 L265 700 Z M500 445 L415 590 L585 590 Z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.92,
            filter: 'blur(4px)',
          },
          visible: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: {
              duration: motionDuration.reveal,
              delay: 0.18,
              ease: motionEase.outExpo,
            },
          },
        }}
      />
    </motion.svg>
  )
}
