import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '../../domain/BlogPost'
import { interactionTransition, motionDuration, motionEase, viewportOnce } from '../../../lib/animations'

interface Props {
  post: BlogPost
  index?: number
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const cardVariants = (index: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.reveal,
      delay: index * 0.1,
      ease: motionEase.outExpo,
    },
  },
})

export default function BlogCard({ post, index = 0 }: Props) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.article
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewportOnce}
      variants={cardVariants(index)}
      whileHover={reducedMotion ? undefined : { y: -4, transition: interactionTransition }}
      className="group flex flex-col rounded-2xl border border-ink/10 bg-surface p-7 transition-[border-color,box-shadow] [transition-duration:var(--motion-state)] [transition-timing-function:var(--ease-out-quart)] hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink/10 px-2.5 py-0.5 text-xs text-ink/50"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-ink/60 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <time className="text-xs text-ink/40" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-1 text-sm font-medium text-accent transition-[gap] [transition-duration:var(--motion-state)] hover:gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Leer más
          <ArrowRight className="size-3.5 transition-transform [transition-duration:var(--motion-state)] group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}
