declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const title: string
  export const date: string
  export const excerpt: string
  export const tags: string[]
  const MDXContent: ComponentType
  export default MDXContent
}
