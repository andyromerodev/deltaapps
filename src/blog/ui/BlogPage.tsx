import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { MdxBlogRepository } from '../data/mdxBlogRepository'
import { getBlogPosts } from '../application/getBlogPosts'
import type { BlogPost } from '../domain/BlogPost'
import { fadeUp } from '../../lib/animations'
import BlogCard from './components/BlogCard'

const repo = new MdxBlogRepository()

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts(repo).then((p) => {
      setPosts(p)
      setLoading(false)
    })
  }, [])

  return (
    <main className="mx-auto max-w-6xl scroll-mt-16 px-6 py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-2xl"
      >
        <h1 className="font-display text-4xl font-bold md:text-6xl">Blog</h1>
        <p className="mt-4 text-lg text-ink/60">
          Ideas, tips y novedades sobre diseño, marketing y software.
        </p>
      </motion.div>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-ink/10 border-t-accent" />
        </div>
      ) : posts.length === 0 ? (
        <p className="mt-20 text-center text-ink/50">Próximamente publicaremos nuestros primeros artículos.</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </main>
  )
}
