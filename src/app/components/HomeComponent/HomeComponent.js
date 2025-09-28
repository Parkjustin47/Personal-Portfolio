'use client'
import React, { useEffect, useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';
import { useTheme } from '../../hooks/useTheme';

export default function HomeComponent() {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [headingAnimationDone, setHeadingAnimationDone] = useState(false);
  const { isDarkMode, isLightMode } = useTheme();

  useEffect(() => {
    // Robust loading screen hiding logic
    const hideLoadingScreen = () => {
      const loadingScreen = document.getElementById('loading-screen')
      if (loadingScreen) {
        loadingScreen.style.display = 'none'
      }
    }

    // Hide immediately and with timeout as fallback
    hideLoadingScreen()
    const timeoutId = setTimeout(hideLoadingScreen, 50)

    // Shooting Stars Canvas Implementation
    class ShootingStar {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
      }
      
      reset() {
        // Start from random position along top and left edges
        if (Math.random() > 0.5) {
          this.x = Math.random() * this.canvas.width;
          this.y = -10;
        } else {
          this.x = -10;
          this.y = Math.random() * this.canvas.height * 0.3;
        }
        
        // Velocity for diagonal movement
        this.vx = Math.random() * 3 + 2;
        this.vy = Math.random() * 3 + 2;
        
        // Trail properties
        this.trail = [];
        this.trailLength = Math.random() * 20 + 15;
        this.size = Math.random() * 1.5 + 1;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.life = 1.0;
        this.decay = Math.random() * 0.015 + 0.005;
        
        // Color variation - keep all white/blue tones
        this.hue = Math.random() * 30 + 200; // Blue to white range
      }
      
      update() {
        // Store current position in trail
        this.trail.push({ x: this.x, y: this.y, life: this.life });
        
        // Remove old trail points
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Fade out over time
        this.life -= this.decay;
        
        // Check if off screen or faded
        return this.life > 0 && 
               this.x < this.canvas.width + 50 && 
               this.y < this.canvas.height + 50;
      }
      
      draw() {
        this.ctx.save();
        
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const point = this.trail[i];
          const trailOpacity = (i / this.trail.length) * point.life * this.brightness;
          const trailSize = (i / this.trail.length) * this.size;
          
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          this.ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${trailOpacity})`;
          this.ctx.fill();
          
          // Add glow effect
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${trailOpacity * 0.5})`;
          this.ctx.fill();
        }
        
        // Draw main star (brightest point)
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, ${this.life * this.brightness})`;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${this.life * 0.8})`;
        this.ctx.fill();
        
        this.ctx.restore();
      }
    }
    
    class ShootingStarSystem {
      constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.maxStars = 5;
        
        this.resizeCanvas();
        this.animate();
        
        // Create new stars more frequently
        this.starInterval = setInterval(() => {
          if (this.stars.length < this.maxStars && Math.random() > 0.6) {
            this.stars.push(new ShootingStar(this.canvas));
            
            // 50% chance to spawn a second star shortly after
            if (Math.random() > 0.5) {
              setTimeout(() => {
                if (this.stars.length < this.maxStars) {
                  this.stars.push(new ShootingStar(this.canvas));
                }
              }, Math.random() * 500 + 200);
            }
          }
        }, 1500);
        
        // Handle resize
        this.resizeHandler = () => this.resizeCanvas();
        window.addEventListener('resize', this.resizeHandler);
      }
      
      resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
      }
      
      animate() {
        // Completely clear canvas to prevent lingering marks
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw stars
        this.stars = this.stars.filter(star => {
          const alive = star.update();
          if (alive) {
            star.draw();
          }
          return alive;
        });
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
      }
      
      destroy() {
        if (this.starInterval) clearInterval(this.starInterval);
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
      }
    }

    // Create neural network
    function createNeuralNetwork() {
      const container = document.getElementById('neural-network');
      if (!container) return;
      
      const nodes = [];
      const nodeCount = Math.min(10, Math.floor(window.innerWidth / 100));
      
      // Create nodes only in top 60% of screen
      for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * (window.innerWidth - 50) + 25;
        const y = Math.random() * (window.innerHeight * 0.6) + 25;
        
        Object.assign(node.style, {
          position: 'absolute',
          width: '12px',
          height: '12px',
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
          left: x + 'px',
          top: y + 'px',
          animation: 'advancedPulse 4s ease-in-out infinite'
        });
        
        if (i % 2 === 1) node.style.animationDelay = '0.8s';
        if (i % 3 === 0) node.style.animationDelay = '1.6s';
        
        container.appendChild(node);
        nodes.push({ element: node, x, y });
      }
      
      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          );
          
          if (distance < Math.min(200, window.innerWidth * 0.25)) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            
            const angle = Math.atan2(
              nodes[j].y - nodes[i].y,
              nodes[j].x - nodes[i].x
            ) * 180 / Math.PI;
            
            Object.assign(connection.style, {
              position: 'absolute',
              height: '0.5px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              opacity: '0',
              left: nodes[i].x + 'px',
              top: nodes[i].y + 'px',
              width: distance + 'px',
              transform: `rotate(${angle}deg)`,
              transformOrigin: '0 50%',
              animation: 'flow 4s ease-in-out infinite',
              animationDelay: Math.random() * 4 + 's'
            });
            
            container.appendChild(connection);
          }
        }
      }
    }
    
    // Create star network
    function createStarNetwork() {
      const container = document.getElementById('star-network');
      if (!container) return;
      
      const stars = [];
      const starCount = Math.min(6, Math.floor(window.innerWidth / 200));
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-node';
        
        const x = Math.random() * (window.innerWidth - 50) + 25;
        const y = Math.random() * (window.innerHeight * 0.6) + 25;
        
        Object.assign(star.style, {
          position: 'absolute',
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 70%)',
          borderRadius: '50%',
          left: x + 'px',
          top: y + 'px',
          animation: 'advancedStarTwinkle 6s ease-in-out infinite'
        });
        
        if (i % 2 === 1) star.style.animationDelay = '1s';
        if (i % 3 === 0) star.style.animationDelay = '2s';
        
        // Add star cross effect
        const before = document.createElement('div');
        Object.assign(before.style, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '16px',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '2px'
        });
        
        const after = document.createElement('div');
        Object.assign(after.style, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1.5px',
          height: '16px',
          background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
          transform: 'translate(-50%, -50%)',
          borderRadius: '2px'
        });
        
        star.appendChild(before);
        star.appendChild(after);
        
        container.appendChild(star);
        stars.push({ element: star, x, y });
      }
    }
    
    // Create particles
    function createParticles() {
      const container = document.getElementById('home');
      if (!container) return;
      
      const particleCount = Math.min(12, Math.floor(window.innerWidth / 120));
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const initialSize = Math.random() * 2 + 2;
        Object.assign(particle.style, {
          position: 'absolute',
          background: '#ffffff',
          borderRadius: '50%',
          opacity: '0.7',
          width: initialSize + 'px',
          height: initialSize + 'px',
          left: Math.random() * window.innerWidth + 'px',
          top: Math.random() * (window.innerHeight * 0.6) + 'px',
          animation: 'particleFloat 6s ease-in-out infinite',
          animationDelay: Math.random() * 6 + 's',
          animationDuration: (Math.random() * 4 + 4) + 's'
        });
        
        container.appendChild(particle);
      }
    }

    // Create light mode floating particles
    function createLightModeParticles() {
      const container = document.getElementById('home');
      if (!container) return;
      
      const containerRect = container.getBoundingClientRect();
      
      // Create floating particles for light mode
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const particle = document.createElement('div');
          particle.className = 'light-particle';
          particle.style.left = Math.random() * containerRect.width + 'px';
          particle.style.top = containerRect.height + 'px'; // Start from bottom
          particle.style.width = (Math.random() * 4 + 2) + 'px';
          particle.style.height = particle.style.width;
          particle.style.animationDelay = Math.random() * 8 + 's';
          particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
          container.appendChild(particle);
          
          // Remove particle after animation
          setTimeout(() => {
            if (particle.parentNode) {
              particle.remove();
            }
          }, 10000);
        }, i * 300);
      }
    }
    
    // Initialize everything based on theme
    if (isDarkMode) {
      createNeuralNetwork();
      createStarNetwork();
      createParticles();
    }
    
    // Initialize shooting star system only in dark mode
    let shootingStarSystem = null;
    if (isDarkMode) {
      shootingStarSystem = new ShootingStarSystem('shootingCanvas');
    }
    
    // Create light mode particles if in light mode
    if (isLightMode) {
      createLightModeParticles();
    }

    // Activate animations and hide loading screen if shown
    setTimeout(() => {
      const canvas = document.getElementById('shootingCanvas');
      const neuralNetwork = document.getElementById('neural-network');
      const starNetwork = document.getElementById('star-network');
      const loadingScreen = document.getElementById('loading-screen');
      
      if (canvas) canvas.classList.add('active');
      if (neuralNetwork) neuralNetwork.classList.add('active');
      if (starNetwork) starNetwork.classList.add('active');
      
      // Hide loading screen if it exists
      if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }, 300);
    
    // Cleanup function
    return () => {
      // Clear timeout
      clearTimeout(timeoutId);
      
      if (shootingStarSystem) {
        shootingStarSystem.destroy();
      }
      
      // Clean up created elements
      const containers = ['neural-network', 'star-network', 'home'];
      containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
          const elements = container.querySelectorAll('.neural-node, .neural-connection, .star-node, .floating-particle, .light-particle');
          elements.forEach(el => el.remove());
        }
      });
    };
  }, [isDarkMode, isLightMode]);

  // Handler for subtitle animation end
  const handleSubtitleAnimationEnd = () => {
    setHeadingAnimationDone(true)
  }

  return (
<React.Fragment>
      {/* CSS Styles */}
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%);
          overflow: hidden;
          z-index: 0;
        }

        .neural-network, .star-network {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease-in-out;
        }

        .neural-network.active {
          opacity: 0.4;
        }

        .star-network.active {
          opacity: 0.6;
        }

        .shooting-stars-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .shooting-stars-canvas.active {
          opacity: 1;
        }

        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .loading-text {
          color: #53c9c9;
          font-size: 2rem;
          font-weight: bold;
          font-family: 'Inter', Arial, sans-serif;
          text-shadow: 0 0 20px rgba(83, 201, 201, 0.5);
          animation: loadingPulse 1.5s ease-in-out infinite;
        }

        @keyframes loadingPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }

                 .hero-content {
           min-height: 100vh;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           text-align: center;
           transition: padding 0.5s cubic-bezier(0.4,0,0.2,1);
           padding-top: 0;
           padding-bottom: 0;
           position: relative;
           z-index: 10;
         }

         .hero-text {
           color: #53c9c9;
           text-shadow: 0 0 20px rgba(83, 201, 201, 0.5);
           margin-bottom: 0.5rem;
           transition: margin-bottom 0.5s cubic-bezier(0.4,0,0.2,1), margin-top 0.5s cubic-bezier(0.4,0,0.2,1);
         }
         .hero-text.chat-expanded {
           margin-bottom: 0.25rem;
           margin-top: 0;
         }
         .chatbot-hero-wrapper {
           width: 100%;
           max-width: 750px;
           margin: 0 auto;
           display: flex;
           flex-direction: column;
           align-items: center;
         }

         .bottom-fade {
           position: absolute;
           bottom: 0;
           left: 0;
           width: 100%;
           height: 25vh;
           background: linear-gradient(
             to bottom, 
             transparent 0%, 
             rgba(71, 85, 105, 0.05) 15%,
             rgba(71, 85, 105, 0.1) 25%,
             rgba(71, 85, 105, 0.2) 35%,
             rgba(71, 85, 105, 0.35) 50%,
             rgba(71, 85, 105, 0.5) 65%,
             rgba(71, 85, 105, 0.7) 80%,
             rgba(71, 85, 105, 0.85) 90%,
             #475569 100%
           );
           z-index: 5;
           pointer-events: none;
         }

        @keyframes advancedPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% { 
            transform: scale(1.15); 
            opacity: 1;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9), inset 0 1px 0 rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes advancedStarTwinkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: scale(1.3) rotate(45deg); 
            opacity: 1;
          }
          50% { 
            transform: scale(0.8) rotate(90deg); 
            opacity: 0.9;
          }
          75% { 
            transform: scale(1.1) rotate(135deg); 
            opacity: 1;
          }
        }

        @keyframes flow {
          0% { opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.7; 
          }
          25% { 
            transform: translateY(-15px) translateX(5px) scale(0.8); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) scale(0.6); 
            opacity: 0.8; 
          }
          75% { 
            transform: translateY(-20px) translateX(3px) scale(0.4); 
            opacity: 1; 
          }
        }

        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .fade-in-up.delay-1 {
          animation-delay: 0.2s;
        }
        .fade-in-up.delay-2 {
          animation-delay: 1s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .chatbot-hero-wrapper {
            max-width: 98vw;
          }
        }
        @media (max-width: 600px) {
          .chatbot-hero-wrapper {
            max-width: 100vw;
          }
        }
      `}</style>
      <div id="home" className="hero-section">
        {/* Loading Screen */}
        <div id="loading-screen" className="loading-screen">
          <div className="loading-text">Loading...</div>
        </div>
        
        {/* Dark Mode Elements */}
        <canvas className="shooting-stars-canvas" id="shootingCanvas"></canvas>
        <div className="neural-network" id="neural-network"></div>
        <div className="star-network" id="star-network"></div>
        
        {/* Light Mode Elements */}
        <div className="glass-overlay"></div>
        <div className="sun"></div>
        <div className="realistic-cloud cloud1"></div>
        <div className="realistic-cloud cloud2"></div>
        <div className="realistic-cloud cloud3"></div>
        <div className="realistic-cloud cloud4"></div>
        <div className="realistic-cloud cloud5"></div>
        
        {/* Dark Mode Moon */}
        <div className="moon"></div>
        
        <div className="bottom-fade"></div>
        <div className="hero-content">
          <div className={`hero-text${chatExpanded ? ' chat-expanded' : ''}`}> 
            <h1 className="font-black text-3xl md:text-5xl lg:text-5xl xl:text-5xl mt-2 mb-2 fade-in-up delay-1">
          I'm Justin
        </h1>
            <h2
              className="mt-2 py-1 font-bold md:text-xl mb-1 fade-in-up delay-2"
              onAnimationEnd={handleSubtitleAnimationEnd}
            >
              University of Riverside, <br />Riverside Student
        </h2>
          </div>
          {/* AI Chatbot */}
          <div className="chatbot-hero-wrapper">
            <ChatBot onExpand={setChatExpanded} typingReady={headingAnimationDone} />
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <span className="text-white text-sm mb-2 opacity-60">Scroll Down</span>
              <svg 
                className="w-6 h-6 text-white opacity-60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
        </div>
      </div>
    </div>
  </div>
</React.Fragment>
  );
}









            

