'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Handle theme toggle with smooth transition
  const toggleTheme = () => {
    setIsTransitioning(true)
    setIsDarkMode(prev => !prev)
    
    // Reset transition flag after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 2000) // Match the CSS transition duration
  }

  // Apply theme class to body
  useEffect(() => {
    const body = document.body
    if (isDarkMode) {
      body.classList.remove('light-theme')
      body.classList.add('dark-theme')
    } else {
      body.classList.remove('dark-theme')
      body.classList.add('light-theme')
    }
  }, [isDarkMode])

  const value = {
    isDarkMode,
    isLightMode: !isDarkMode,
    isTransitioning,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}