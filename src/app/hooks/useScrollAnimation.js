'use client'
import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = (options = {}) => {
    const elementRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() =>{
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting){
                    setIsVisible(true)
                    // Once visible; stop observing
                    observer.unobserve(entry.target)
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the elements are visible
                rootMargin: '-50px 0px', // Start the animation 50px before element enters viewpoint
                ... options
            }
        )

        if (elementRef.current){
            observer.observe(elementRef.current)
        }

        return () => {
            if (elementRef.current){
                observer.unobserve(elementRef.current)
            }
        }
    }, [])

    return [elementRef, isVisible]
}