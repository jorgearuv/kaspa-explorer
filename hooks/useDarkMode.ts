import { useState, useEffect } from 'react'

export function useDarkMode() {
  // Initialize state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // During SSR, return false (light mode) as default
    if (typeof window === 'undefined') return false

    // Check local storage first
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      return stored === 'true'
    }

    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [mounted, setMounted] = useState(false)

  // Effect to synchronize theme with DOM
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Set mounted state
    setMounted(true)

    // Update DOM
    document.documentElement.classList.toggle('dark', isDarkMode)

    // Store preference
    localStorage.setItem('darkMode', String(isDarkMode))

    // Handle system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const hasStoredPreference = localStorage.getItem('darkMode') !== null
      if (!hasStoredPreference) {
        setIsDarkMode(mediaQuery.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  return {
    isDarkMode,
    toggleDarkMode,
    mounted,
  }
}
