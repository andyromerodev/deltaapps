import { Route, Routes, Outlet } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import { SoundProvider } from './sound/SoundContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton'
import BlogSection from './blog/ui/BlogSection'
import BlogPage from './blog/ui/BlogPage'
import BlogPostPage from './blog/ui/BlogPostPage'
import Seo from './seo/Seo'
import seoConfig from './seo/seo.config.json'
import { organizationSchema } from './seo/jsonLd'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppFloatingButton />
    </>
  )
}

function LandingPage() {
  return (
    <>
      <Seo
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        canonical={seoConfig.site.siteUrl}
        jsonLd={organizationSchema()}
      />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <BlogSection />
        <Contact />
      </main>
    </>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SoundProvider>
          <LanguageProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
              </Route>
            </Routes>
          </LanguageProvider>
        </SoundProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
