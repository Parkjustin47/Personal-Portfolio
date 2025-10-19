'use client'

import HomeComponent from './components/HomeComponent/HomeComponent'
import AboutMe from './components/AboutMe/AboutMe'
import MySlider from "./components/SliderCard/MySlider";
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useTheme } from './hooks/useTheme';

export default function Home() {
  // Scroll animation hooks for different elements
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.2 })
  const [descriptionRef, descriptionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [sliderRef, sliderVisible] = useScrollAnimation({ threshold: 0.1 })
  const { isDarkMode } = useTheme()
  return (
    // minimum height = 100vh
    <main className="min-h-screen relative">
      {/* CSS Styles for Recent Works Section */}
      <style jsx>{`
        .next-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #475569 0%, #64748b 20%, #94a3b8 50%, #cbd5e1 80%, #f1f5f9 100%);
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 2rem;
        }

        .section-content {
          color: #475569;
          font-size: clamp(1.5rem, 4vw, 2rem);
          text-align: center;
          opacity: 0.8;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .recent-works-subtitle {
          color: ${isDarkMode ? '#53c9c9' : '#2c3e50'};
          font-size: 3rem;
          font-weight: 800;
          margin-top: 1rem;
        }

        .projects-description {
          max-width: 2xl;
          font-size: 16px;
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          line-height: 2;
          margin-top: 1.25rem;
        }

        .projects-container {
          background: ${isDarkMode 
            ? 'linear-gradient(180deg, #475569 0%, #64748b 20%, #94a3b8 50%, #cbd5e1 80%, #e2e8f0 100%)'
            : 'linear-gradient(180deg, #87CEEB 0%, #4A90E2 20%, #7BB3F0 50%, #B8E0FF 80%, #E6F3FF 100%)'
          };
          width: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding-top: 1.25rem;
          padding-bottom: 6rem;
          margin-top: 0;
          transition: background 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
          .recent-works-subtitle {
            font-size: 2rem;
            padding-left: 1.25rem;
          }
          
          .projects-description {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .recent-works-subtitle {
            padding-left: 80px;
          }
          
          .projects-description {
            padding-left: 80px;
          }
        }
      `}</style>

      {/*Home component self is a closing tag; therefore, we do not need closing tag.*/}
      <HomeComponent />
      
      {/* About Me Section */}
      <AboutMe />
      
      {/* Recent Works Section */}
      <div
        id="projects"
        className="projects-container"
      >
        <div className="container m-auto">
          <div>
            <p 
              ref={subtitleRef}
              className={`recent-works-subtitle ${subtitleVisible ? 'visible' : ''}`}
            >
              Recent Works
            </p>
            <p 
              ref={descriptionRef}
              className={`projects-description ${descriptionVisible ? 'visible' : ''}`}
            >
            Take a look at some of my recent work, highlighting what I’ve been building and learning — from full-stack web applications to AI-powered tools, each project reflects my growth as a developer and my passion for solving real-world problems!
            </p>
          </div>
        </div>
        <div 
          ref={sliderRef}
          className={`scroll-animate-delayed-3 ${sliderVisible ? 'visible' : ''}`}
        >
          <MySlider/>
        </div>
      </div>

    </main>

  )
}

