import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { MdxBlogRepository } from '../data/mdxBlogRepository'
import { getBlogPosts } from '../application/getBlogPosts'
import type { BlogPost } from '../domain/BlogPost'
import { fadeUp, viewportOnce } from '../../lib/animations'
import BlogCard from './components/BlogCard'

const repo = new MdxBlogRepository()

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getBlogPosts(repo).then((all) => setPosts(all.slice(0, 3)))
  }, [])

  if (posts.length === 0) return null

  return (
    <section id="blog" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <h2 className="font-display text-3xl font-bold md:text-5xl">Del blog</h2>
          <p className="mt-3 text-lg text-ink/60">
            Ideas y recursos para hacer crecer tu negocio digital.
          </p>
        </div>
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-sm font-medium text-accent transition-[gap] duration-200 hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ver todos los artículos
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  )
}
