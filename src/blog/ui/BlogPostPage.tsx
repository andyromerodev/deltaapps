import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { MdxBlogRepository } from '../data/mdxBlogRepository'
import { getBlogPost } from '../application/getBlogPost'
import type { BlogPostWithContent } from '../domain/BlogPost'
import { fadeSoft, fadeUp } from '../../lib/animations'

const repo = new MdxBlogRepository()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPostWithContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getBlogPost(repo, slug).then((p) => {
      if (!p) navigate('/blog', { replace: true })
      else setPost(p)
      setLoading(false)
    })
  }, [slug, navigate])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="size-8 animate-spin rounded-full border-2 border-ink/10 border-t-accent" />
      </main>
    )
  }

  if (!post) return null

  return (
    <main className="mx-auto max-w-3xl px-6 py-32">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-ink/50 transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="size-4" />
          Volver al blog
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 px-2.5 py-0.5 text-xs text-ink/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <time className="mt-3 block text-sm text-ink/40" dateTime={post.date}>
          Publicado el {formatDate(post.date)}
        </time>
      </motion.div>

      <motion.div
        variants={fadeSoft}
        initial="hidden"
        animate="visible"
        className="prose-blog mt-12"
      >
        <post.Content />
      </motion.div>
    </main>
  )
}
