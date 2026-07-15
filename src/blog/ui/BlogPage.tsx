import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MdxBlogRepository } from '../data/mdxBlogRepository'
import { getBlogPosts } from '../application/getBlogPosts'
import type { BlogPost } from '../domain/BlogPost'
import { fadeUp } from '../../lib/animations'
import BlogCard from './components/BlogCard'
import Seo from '../../seo/Seo'
import seoConfig from '../../seo/seo.config.json'

const repo = new MdxBlogRepository()
const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getBlogPosts(repo).then((p) => {
      setPosts(p)
      setLoading(false)
    })
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  return (
    <>
      <Seo
        title={seoConfig.pages.blog.title}
        description={seoConfig.pages.blog.description}
        canonical={`${seoConfig.site.siteUrl}/blog`}
      />
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
        <>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Página anterior"
                className="flex size-10 items-center justify-center rounded-full border border-ink/10 transition-[background-color,border-color,opacity] [transition-duration:var(--motion-state)] hover:border-ink/20 hover:bg-surface disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm font-medium text-ink/80">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Siguiente página"
                className="flex size-10 items-center justify-center rounded-full border border-ink/10 transition-[background-color,border-color,opacity] [transition-duration:var(--motion-state)] hover:border-ink/20 hover:bg-surface disabled:opacity-30 disabled:hover:border-ink/10 disabled:hover:bg-transparent"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </>
      )}
    </main>
    </>
  )
}
