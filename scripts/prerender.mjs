import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const matter = require('gray-matter')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const postsDir = path.join(root, 'src', 'blog', 'data', 'posts')
const seoConfig = JSON.parse(fs.readFileSync(path.join(root, 'src', 'seo', 'seo.config.json'), 'utf-8'))

const { siteUrl, siteName, twitterHandle, defaultOgImage } = seoConfig.site
const { home: homeSeo, blog: blogSeo } = seoConfig.pages

// Read all posts
function getPosts() {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function buildMetaTags({ title, description, canonical, ogImage, ogType = 'website', jsonLd }) {
  const image = ogImage ?? defaultOgImage
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${absoluteImage}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:site_name" content="${siteName}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${twitterHandle}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${absoluteImage}" />
    ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}`.trim()
}

function injectMeta(template, metaTags) {
  // Remove existing title and description so we don't duplicate them
  let html = template
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, '')
  return html.replace('</head>', `${metaTags}\n  </head>`)
}

function writeHtml(routePath, html) {
  const outDir = path.join(distDir, ...routePath.split('/').filter(Boolean))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
}

function generateSitemap(posts) {
  const urls = [
    { loc: siteUrl, priority: '1.0', changefreq: 'weekly' },
    { loc: `${siteUrl}/blog`, priority: '0.8', changefreq: 'weekly' },
    ...posts.map((p) => ({
      loc: `${siteUrl}/blog/${p.slug}`,
      lastmod: p.date,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml)
  console.log('✓ sitemap.xml generado')
}

function generateRobots() {
  const content = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`
  fs.writeFileSync(path.join(distDir, 'robots.txt'), content)
  console.log('✓ robots.txt generado')
}

// Main
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
const posts = getPosts()

// Home
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: seoConfig.site.organization.logo,
  contactPoint: { '@type': 'ContactPoint', email: seoConfig.site.organization.contactEmail, contactType: 'customer service' },
  sameAs: seoConfig.site.organization.sameAs,
}
const homeHtml = injectMeta(template, buildMetaTags({
  title: homeSeo.title,
  description: homeSeo.description,
  canonical: siteUrl,
  jsonLd: homeJsonLd,
}))
fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml)
console.log('✓ / prerenderizado')

// Blog index
const blogHtml = injectMeta(template, buildMetaTags({
  title: blogSeo.title,
  description: blogSeo.description,
  canonical: `${siteUrl}/blog`,
}))
writeHtml('/blog', blogHtml)
console.log('✓ /blog prerenderizado')

// Blog posts
for (const post of posts) {
  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    image: post.ogImage ?? defaultOgImage,
    datePublished: post.date,
    author: { '@type': 'Organization', name: siteName, url: siteUrl },
    publisher: { '@type': 'Organization', name: siteName, logo: { '@type': 'ImageObject', url: seoConfig.site.organization.logo } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
  }
  const postHtml = injectMeta(template, buildMetaTags({
    title: `${post.seoTitle ?? post.title} — ${siteName}`,
    description: post.seoDescription ?? post.excerpt,
    canonical: `${siteUrl}/blog/${post.slug}`,
    ogImage: post.ogImage ?? `/og-posts/${post.slug}.png`,
    ogType: 'article',
    jsonLd: postJsonLd,
  }))
  writeHtml(`/blog/${post.slug}`, postHtml)
  console.log(`✓ /blog/${post.slug} prerenderizado`)
}

generateSitemap(posts)
generateRobots()
console.log('\n🚀 Prerender completo')
