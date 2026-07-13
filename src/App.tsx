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

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SoundProvider>
          <LanguageProvider>
            <Navbar />
            <main>
              <Hero />
              <Marquee />
              <Services />
              <About />
              <Contact />
            </main>
            <Footer />
            <WhatsAppFloatingButton />
          </LanguageProvider>
        </SoundProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}

export default App
