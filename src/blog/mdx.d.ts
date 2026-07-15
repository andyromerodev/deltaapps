declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: {
    title: string
    date: string
    excerpt: string
    tags: string[]
    seoTitle?: string
    seoDescription?: string
    ogImage?: string
  }
  const MDXContent: ComponentType
  export default MDXContent
}
