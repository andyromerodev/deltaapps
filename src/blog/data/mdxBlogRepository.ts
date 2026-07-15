import type { ComponentType } from 'react'
import type { IBlogRepository } from '../domain/IBlogRepository'
import type { BlogPost, BlogPostWithContent } from '../domain/BlogPost'

interface MdxModule {
  default: ComponentType
  frontmatter: {
    title: string
    date: string
    excerpt: string
    tags: string[]
    seoTitle?: string
    seoDescription?: string
    ogImage?: string
  }
}

const modules = import.meta.glob<MdxModule>('./posts/*.mdx')

function slugFromPath(path: string): string {
  return path.replace('./posts/', '').replace('.mdx', '')
}

export class MdxBlogRepository implements IBlogRepository {
  async getPosts(): Promise<BlogPost[]> {
    const posts = await Promise.all(
      Object.entries(modules).map(async ([path, load]) => {
        const mod = await load()
        const fm = mod.frontmatter
        return {
          slug: slugFromPath(path),
          title: fm.title,
          date: fm.date,
          excerpt: fm.excerpt,
          tags: fm.tags ?? [],
          seoTitle: fm.seoTitle,
          seoDescription: fm.seoDescription,
          ogImage: fm.ogImage,
        }
      })
    )
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  async getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
    const path = `./posts/${slug}.mdx`
    const load = modules[path]
    if (!load) return null
    const mod = await load()
    const fm = mod.frontmatter
    return {
      slug,
      title: fm.title,
      date: fm.date,
      excerpt: fm.excerpt,
      tags: fm.tags ?? [],
      seoTitle: fm.seoTitle,
      seoDescription: fm.seoDescription,
      ogImage: fm.ogImage,
      Content: mod.default,
    }
  }
}
