import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { bind, setEnabled } from 'cuelume'

interface SoundContextValue {
  soundOn: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

const STORAGE_KEY = 'deltaapps-sound'

function detectInitialSound(): boolean {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored !== 'off'
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOn] = useState<boolean>(detectInitialSound)

  useEffect(() => {
    bind()
  }, [])

  useEffect(() => {
    setEnabled(soundOn)
    localStorage.setItem(STORAGE_KEY, soundOn ? 'on' : 'off')
  }, [soundOn])

  const toggleSound = () => setSoundOn((s) => !s)

  return <SoundContext.Provider value={{ soundOn, toggleSound }}>{children}</SoundContext.Provider>
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}
