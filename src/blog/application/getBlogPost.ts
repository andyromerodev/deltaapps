import type { IBlogRepository } from '../domain/IBlogRepository'

export async function getBlogPost(repo: IBlogRepository, slug: string) {
  return repo.getPostBySlug(slug)
}
