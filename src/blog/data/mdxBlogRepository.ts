import type { ComponentType } from 'react'
import type { IBlogRepository } from '../domain/IBlogRepository'
import type { BlogPost, BlogPostWithContent } from '../domain/BlogPost'

interface MdxModule {
  default: ComponentType
  title: string
  date: string
  excerpt: string
  tags: string[]
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
        return {
          slug: slugFromPath(path),
          title: mod.title,
          date: mod.date,
          excerpt: mod.excerpt,
          tags: mod.tags ?? [],
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
    return {
      slug,
      title: mod.title,
      date: mod.date,
      excerpt: mod.excerpt,
      tags: mod.tags ?? [],
      Content: mod.default,
    }
  }
}
