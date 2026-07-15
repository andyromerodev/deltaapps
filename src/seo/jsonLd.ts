import type { BlogPost } from '../blog/domain/BlogPost'
import seoConfig from './seo.config.json'

export function organizationSchema() {
  const { organization, siteUrl } = seoConfig.site
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: siteUrl,
    logo: organization.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      email: organization.contactEmail,
      contactType: 'customer service',
    },
    sameAs: organization.sameAs,
  }
}

export function blogPostingSchema(post: BlogPost) {
  const { siteUrl, siteName, organization } = seoConfig.site
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    image: post.ogImage ?? seoConfig.site.defaultOgImage,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: organization.logo },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  }
}
