import type { IBlogRepository } from '../domain/IBlogRepository'

export async function getBlogPosts(repo: IBlogRepository) {
  return repo.getPosts()
}
