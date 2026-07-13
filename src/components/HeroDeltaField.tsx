import { useEffect } from 'react'
import type { MotionValue } from 'motion/react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { motionDuration, motionEase } from '../lib/animations'

interface HeroDeltaFieldProps {
  scrollProgress: MotionValue<number>
}

const outlines = [
  'M310 42 L568 512 H52 Z',
  'M310 142 L482 454 H138 Z',
]

const structure = [
  'M310 232 L402 454',
  'M310 232 L218 454',
  'M260 352 H360',
  'M310 42 V232',
  'M52 512 L260 352',
  'M568 512 L360 352',
]

const nodes = [
  [310, 42],
  [52, 512],
  [568, 512],
  [310, 232],
  [260, 352],
  [360, 352],
] as const

export default function HeroDeltaField({ scrollProgress }: HeroDeltaFieldProps) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 140, damping: 26, mass: 0.6 })
  const springY = useSpring(pointerY, { stiffness: 140, damping: 26, mass: 0.6 })
  const scrollY = useTransform(scrollProgress, [0, 1], [0, 72])
  const scrollScale = useTransform(scrollProgress, [0, 1], [1, 0.9])
  const scrollOpacity = useTransform(scrollProgress, [0, 0.72, 1], [1, 0.58, 0.2])

  useEffect(() => {
    if (reducedMotion) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 24)
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 16)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pointerX, pointerY, reducedMotion])

  const lineInitial = reducedMotion ? false : { pathLength: 0, opacity: 0 }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute right-[-11rem] top-1/2 size-[34rem] -translate-y-1/2 sm:right-[-13rem] sm:size-[42rem] lg:right-[max(-7rem,calc((100vw-72rem)/2-8rem))] lg:size-[46rem]">
        <motion.div
          style={reducedMotion ? undefined : { y: scrollY, scale: scrollScale, opacity: scrollOpacity }}
          className="size-full"
        >
          <motion.div
            style={reducedMotion ? undefined : { x: springX, y: springY }}
            className="relative size-full"
          >
            <div className="absolute inset-[18%] rounded-full bg-primary/12 blur-3xl" />
            <svg viewBox="0 0 620 560" className="relative size-full overflow-visible">
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {outlines.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    initial={lineInitial}
                    animate={{ pathLength: 1, opacity: index === 0 ? 0.72 : 0.46 }}
                    transition={{
                      pathLength: {
                        duration: motionDuration.hero,
                        delay: index * 0.08,
                        ease: motionEase.outExpo,
                      },
                      opacity: { duration: motionDuration.state, delay: index * 0.08 },
                    }}
                    className={index === 0 ? 'stroke-primary' : 'stroke-accent'}
                    strokeWidth={index === 0 ? 2.5 : 1.5}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {structure.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    initial={lineInitial}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{
                      pathLength: {
                        duration: motionDuration.hero,
                        delay: 0.16 + index * 0.04,
                        ease: motionEase.outExpo,
                      },
                      opacity: { duration: motionDuration.state, delay: 0.16 + index * 0.04 },
                    }}
                    className="stroke-ink"
                    strokeWidth="1"
                    strokeDasharray={index > 2 ? '5 9' : undefined}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>

              {nodes.map(([cx, cy], index) => (
                <motion.circle
                  key={`${cx}-${cy}`}
                  cx={cx}
                  cy={cy}
                  r={index < 3 ? 5 : 3.5}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: index < 3 ? 0.9 : 0.64, scale: 1 }}
                  transition={{
                    duration: motionDuration.state,
                    delay: 0.28 + index * 0.05,
                    ease: motionEase.outExpo,
                  }}
                  className={index % 2 === 0 ? 'fill-accent' : 'fill-primary'}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
