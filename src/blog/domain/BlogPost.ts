import type { ComponentType } from 'react'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: string
}

export interface BlogPostWithContent extends BlogPost {
  Content: ComponentType
}
