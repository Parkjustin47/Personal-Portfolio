'use client'
import { useState, useEffect } from 'react'

export function useActiveSection(){
    const [activeSection, setActiveSection] = useState('home')

    useEffect(() => {
        const sections = [
            { id: 'home', element: null },
            { id: 'about', element: null },
            { id: 'projects', element: null }
        ]

        // Get section elements
        sections.forEach(section => {
            const element = document.getElementById(section.id)
            if (element) {
                section.element = element
            }
        })

        // Filter out sections that do not exist
        const validSections = sections.filter(section => section.element)

        if (validSections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting){
                        const sectionId = entry.target.id
                        setActiveSection(sectionId)

                        // update URL hash without triggering scroll
                        const newUrl = `${window.location.pathname}#${sectionId}`
                        window.history.replaceState({ path: newUrl }, '', newUrl)
                    }
                })
            },
            {
                threshold: 0.3, // Section is 30% visible
                rootMargin: '-20% 0px -20% 0px' // Adjust when section is active
            }
        )

        // Observe all sections
        validSections.forEach(section => {
            observer.observe(section.element)
        })

        return () => {
            observer.disconnect()
        }
    }, [])
    return activeSection
}