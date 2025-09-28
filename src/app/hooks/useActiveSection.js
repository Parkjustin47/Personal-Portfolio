'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds = ['home', 'about', 'projects']) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    // Get all valid section elements in one pass
    const validElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (validElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            
            // Update URL hash without triggering scroll
            const newUrl = `${window.location.pathname}#${entry.target.id}`
            window.history.replaceState({ path: newUrl }, '', newUrl)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
      }
    )

    // Observe all valid elements
    validElements.forEach(element => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
} 