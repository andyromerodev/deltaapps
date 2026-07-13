import type { BlogPost, BlogPostWithContent } from './BlogPost'

export interface IBlogRepository {
  getPosts(): Promise<BlogPost[]>
  getPostBySlug(slug: string): Promise<BlogPostWithContent | null>
}
