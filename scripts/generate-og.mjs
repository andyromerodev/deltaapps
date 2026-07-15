import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const matter = require('gray-matter')
const { Resvg } = await import('@resvg/resvg-js')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const postsDir = path.join(root, 'src', 'blog', 'data', 'posts')
const seoConfig = JSON.parse(fs.readFileSync(path.join(root, 'src', 'seo', 'seo.config.json'), 'utf-8'))

const FONT_INTER = path.join(root, 'node_modules/@fontsource/inter/files/inter-latin-700-normal.woff')
const FONT_SPACE = path.join(root, 'node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff')

// Brand colors
const C = {
  base: '#0a0a0f',
  surface: '#12121a',
  purple: '#7c3aed',
  cyan: '#22d3ee',
  white: '#ffffff',
  gray400: '#a1a1aa',
  gray500: '#71717a',
  gray600: '#52525b',
}

function svgToPng(svg) {
  const resvg = new Resvg(svg, {
    font: {
      fontBuffers: [
        new Uint8Array(fs.readFileSync(FONT_INTER)),
        new Uint8Array(fs.readFileSync(FONT_SPACE)),
      ],
      loadSystemFonts: true,
      defaultFontFamily: 'Inter',
    },
  })
  return resvg.render().asPng()
}

// Wrap text into lines of ~maxChars
function wrapText(text, maxChars) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (test.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 2) // max 2 lines
}

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Default OG image for the site
function buildDefaultSvg() {
  const { siteName, siteUrl } = seoConfig.site
  const domain = siteUrl.replace('https://', '')

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${C.purple}"/>
      <stop offset="1" stop-color="${C.cyan}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0%" cy="0%" r="70%">
      <stop stop-color="${C.purple}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${C.base}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${C.base}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Large decorative triangle bottom-right -->
  <polygon points="1080,160 1200,630 960,630" fill="${C.purple}" opacity="0.06"/>
  <polygon points="1180,0 1200,100 1160,0" fill="${C.cyan}" opacity="0.08"/>

  <!-- Top accent bar -->
  <rect x="80" y="80" width="80" height="5" rx="3" fill="${C.purple}"/>
  <rect x="168" y="80" width="28" height="5" rx="3" fill="${C.cyan}"/>

  <!-- Site name -->
  <text x="80" y="220" font-family="Space Grotesk" font-weight="700" font-size="88" fill="${C.white}">${escape(siteName)}</text>

  <!-- Tagline -->
  <text x="80" y="296" font-family="Inter" font-weight="700" font-size="36" fill="${C.gray400}">Diseño · Marketing · Software</text>

  <!-- Subtitle -->
  <text x="80" y="356" font-family="Inter" font-size="28" fill="${C.gray500}">Llevamos tu idea al siguiente nivel.</text>

  <!-- Divider -->
  <rect x="80" y="430" width="100" height="2" rx="1" fill="url(#accentLine)"/>

  <!-- URL -->
  <text x="80" y="530" font-family="Inter" font-size="24" fill="${C.gray600}">${escape(domain)}</text>
</svg>`
}

// Per-post OG image
function buildPostSvg(post) {
  const { siteName, siteUrl } = seoConfig.site
  const domain = siteUrl.replace('https://', '')
  const title = post.seoTitle ?? post.title
  const lines = wrapText(title, 34)
  const tags = (post.tags ?? []).slice(0, 3)

  const titleY1 = 270
  const titleY2 = titleY1 + 76
  const hasSecondLine = lines.length > 1

  // Tag pills (approximate: each char ~13px + padding 32px)
  let tagX = 80
  const tagPills = tags.map((tag) => {
    const width = tag.length * 13 + 32
    const pill = `
    <rect x="${tagX}" y="170" width="${width}" height="34" rx="17" fill="${C.surface}" stroke="${C.purple}" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="${tagX + width / 2}" y="192" font-family="Inter" font-size="16" fill="${C.cyan}" text-anchor="middle">${escape(tag)}</text>`
    tagX += width + 12
    return pill
  }).join('')

  const excerptY = hasSecondLine ? titleY2 + 52 : titleY1 + 52
  const excerpt = (post.seoDescription ?? post.excerpt ?? '').substring(0, 90)
  const showExcerpt = excerptY < 490

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${C.purple}"/>
      <stop offset="1" stop-color="${C.cyan}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0%" cy="0%" r="70%">
      <stop stop-color="${C.purple}" stop-opacity="0.14"/>
      <stop offset="1" stop-color="${C.base}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="${C.base}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Decorative triangle -->
  <polygon points="1080,160 1200,630 960,630" fill="${C.purple}" opacity="0.05"/>

  <!-- Top accent bar -->
  <rect x="80" y="80" width="80" height="5" rx="3" fill="${C.purple}"/>
  <rect x="168" y="80" width="28" height="5" rx="3" fill="${C.cyan}"/>

  <!-- Tag pills -->
  ${tagPills}

  <!-- Post title -->
  <text x="80" y="${titleY1}" font-family="Space Grotesk" font-weight="700" font-size="66" fill="${C.white}">${escape(lines[0])}</text>
  ${hasSecondLine ? `<text x="80" y="${titleY2}" font-family="Space Grotesk" font-weight="700" font-size="66" fill="${C.white}">${escape(lines[1])}</text>` : ''}

  <!-- Excerpt -->
  ${showExcerpt ? `<text x="80" y="${excerptY}" font-family="Inter" font-size="26" fill="${C.gray500}">${escape(excerpt)}${excerpt.length >= 90 ? '…' : ''}</text>` : ''}

  <!-- Divider -->
  <rect x="80" y="530" width="100" height="2" rx="1" fill="url(#accentLine)"/>

  <!-- Footer -->
  <text x="80" y="592" font-family="Inter" font-size="22" fill="${C.gray600}">${escape(siteName)} Blog · ${escape(domain)}</text>
</svg>`
}

// Read posts
const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((file) => {
    const slug = file.replace('.mdx', '')
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf-8'))
    return { slug, ...data }
  })

// Generate default OG
fs.writeFileSync(path.join(distDir, 'og-image.png'), svgToPng(buildDefaultSvg()))
console.log('✓ og-image.png generada')

// Generate per-post OG images
const ogPostsDir = path.join(distDir, 'og-posts')
fs.mkdirSync(ogPostsDir, { recursive: true })

for (const post of posts) {
  fs.writeFileSync(
    path.join(ogPostsDir, `${post.slug}.png`),
    svgToPng(buildPostSvg(post))
  )
  console.log(`✓ og-posts/${post.slug}.png generada`)
}

console.log('\n🖼️  OG images completas')
