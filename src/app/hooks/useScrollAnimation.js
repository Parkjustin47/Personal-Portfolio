'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const observerOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    ...options
  }), [options.threshold, options.rootMargin])

  const handleIntersection = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
      observer.unobserve(entry.target)
    }
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, observerOptions)
    observer.observe(element)

    return () => observer.disconnect()
  }, [handleIntersection, observerOptions])

  return [elementRef, isVisible]
} 