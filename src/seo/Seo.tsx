import seoConfig from './seo.config.json'

interface SeoProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: object
}

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
}: SeoProps) {
  const image = ogImage ?? seoConfig.site.defaultOgImage
  const absoluteImage = image.startsWith('http') ? image : `${seoConfig.site.siteUrl}${image}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={seoConfig.site.siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoConfig.site.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {jsonLd && (
        <script
          type="application/ld+json"
          // React 19 hoists this to <head> automatically
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}
