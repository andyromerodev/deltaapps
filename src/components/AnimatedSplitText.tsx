import { createElement, useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { splitText } from 'animejs/text'
import { useInView, useReducedMotion } from 'motion/react'

type AnimatedTextTag = 'h1' | 'h2' | 'p' | 'span'

type InViewOptions = {
  amount?: number | 'some' | 'all'
  margin?: string
}

interface AnimatedSplitTextProps {
  text: string
  as: AnimatedTextTag
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
  inViewOptions?: InViewOptions
}

export default function AnimatedSplitText({
  text,
  as,
  className,
  delay = 0,
  stagger: staggerDelay = 0.065,
  once = true,
  inViewOptions,
}: AnimatedSplitTextProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const scopeRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(scopeRef, {
    once,
    amount: inViewOptions?.amount ?? 0.6,
    margin: (inViewOptions?.margin ?? '0px 0px -10%') as never,
  })

  useEffect(() => {
    const element = scopeRef.current
    if (!element) return

    if (reducedMotion) {
      element.style.removeProperty('opacity')
      return
    }

    if (!isInView) return

    element.style.opacity = '1'

    const split = splitText(element, {
      words: true,
      accessible: true,
    })

    split.words.forEach((word) => {
      word.style.willChange = 'transform, opacity, filter'
    })

    const animation = animate(split.words, {
      opacity: [0, 1],
      translateY: ['0.85em', '0em'],
      filter: ['blur(8px)', 'blur(0px)'],
      duration: 680,
      delay: stagger(staggerDelay * 1000, { start: delay * 1000 }),
      ease: 'outExpo',
    })

    return () => {
      animation.cancel()
      split.revert()
      element.style.removeProperty('opacity')
    }
  }, [delay, isInView, reducedMotion, staggerDelay, text])

  const Tag = as

  return createElement(
    Tag,
    {
      ref: scopeRef,
      className,
      style: reducedMotion || isInView ? undefined : { opacity: 0 },
    },
    text,
  )
}
