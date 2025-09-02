'use client'
import React, { useEffect, useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';

export default function HomeComponent() {
    const [chatExpanded, setChatExpanded] = useState(false);
    const [headingAnimationDone, setHeadingAnimationDone] = useState(false);

    useEffect(() => {
        // Check if user refreshed page vs first visit
        const isPageRefresh = performance.navigation?.type === 1 || 
            performance.getEntriesByType('navigation')[0]?.type === 'reload';
    
        // Only show loading screen on refresh
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            if (!isPageRefresh) {
                loadingScreen.style.display = 'none';
            }
        }

        // Shooting Stars
        class ShootingStar {
            constructor(canvas){
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.reset();
            }

            reset(){
                // Start from random spots, either from top or the left
                if (Math.random() > 0.5){
                    this.x = Math.random() * this.canvas.width;
                    this.y = -10;
                } else{
                    this.x = -10;
                    this.y = Math.random() * this.canvas.height * 0.3;
                }

                // Velocity for diagnol movement
                this.vx = Math.random() * 3 + 2;
                this.vy = Math.random() * 3 + 2;

                // Star Trail properties
                this.trail = [];
                this.trailLength = Math.random() * 20 + 15;
                this.size = Math.random() * 1.5 + 1; 
                this.brightness = Math.random() * 0.5 + 0.5;
                this.life = 1.0;
                this.decay = Math.random() * 0.015 + 0.005;

                // Color Variations (White and blue tones)
                this.hue = Math.random() * 30 + 200; // blue and white hues
            }

            update(){
                // Store current star trail position
                this.trail.push({x: this.x, y: this.y, life: this.life});
            
                // Get rid of old trail points
                if (this.trail.length > this.trailLength){
                    this.trail.shift();
                }

                // Update Trail position
                this.x += this.vx;
                this.y += this.vy;

                // Fade out over time
                this.life -= this.decay;

                // Check if star off screen or faded
                return this.life > 0 &&
                    this.x < this.canvas.width + 50 && this.y < this.canvas.height + 50;
            }

            draw(){
                this.ctx.save();

                // Drawing star trails
                for (i = 0; i < this.trail.length; i++){
                    const point = this.trail[i];
                    const trailOpacity = (i / this.trail.length) * point.life * this.brightness;
                    const trailSize = (i / this.trail.length) * this.size;

                    this.ctx.beginPath();
                    this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
                    this.ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${trailOpacity})`;
                    this.ctx.fill();

                    // Add glow effect
                    this.ctx.shadowBlur = 8;
                    this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${trailOpacity* 0.5})`;
                    this.ctx.fill();
                }

                // Draw main star (Brightest)
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.Pi * 2);
                this.ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, ${this.life * this.brightness})`;
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${this.life * 0.8})`;
                this.ctx.fill();

                this.ctx.restore();
            }
        }

        class ShootingStarSystem {
            constructor(canvasId){
                this.canvas = document.getElementById(canvasId);
                if (!this.canvas) return;

                this.ctx = this.canvas.getContext('2d');
                this.stars = [];
                this.maxStars = 5;

                this.resizeCanvas();
                this.animate();

                // Create new stars, more often
                this.starInterval = setInterval(() => {
                    if (this.stars.length < this.maxStars && Math.random() > 0.6){
                        this.stars.push(new ShootingStar(this.canvas));

                        // 50-50 chance of a second star spawn
                        if (Math.random() > 0.5){
                            setTimeout(() => {
                                if(this.stars.length < this.maxStars){
                                    this.stars.push(new ShootingStar(this.canvas));
                                }
                            }, Math.random() * 500 +200);
                        }
                    }
                }, 1500);

                // Handle resize
                this.resizeHandler = () => this.resizeCanvas();
                window.addEventListener('resize', this.resizeHandler);
            }

            resizeCanvas(){
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
            }

            animate(){
                // Clear canvas to stop lingering marks
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                // Update and draw stars
                this.stars = this.stars.filter(star => {
                    const alive = star.update();
                    if(alive){
                        star.draw();
                    }
                    return alive;
                });

                this.animationFrame = requestAnimationFrame(() => this.animate());
            }

            destroy(){
                if (this.starInterval) clearInterval(this.starInterval);
                if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
                if (this.resizeHandler) window.removeEventListener('reszie', this.resizeHandler);
            }
        }

        // Create neural network 
        function createNeuralNetwork(){
            const container = document.getElementById('neural-network');
            if (!conainer) return;

            const nodes = [];
            const nodeCount = Math.min(10, Math.floor(window.innerWidth / 100));

            // Nodes for only top 60% of screen
            for (let i = 0; i < nodeCount; i++){
                const node = document.createElement('div');
                node.className = 'neural-node';

                const x = Math.random() * (window.innerWidth - 50) + 25;
                const y = Math.random() * (window.innerHeight * 0.6) + 25;

                Object.assign(node.style,{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(255,255, 255, 0.8), rgba(255,255,255,0.4)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255, 0.3)',
                    boxShawdow: '0 0 10px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
                    left: x + 'px',
                    top: y + 'px',
                    animation: 'advancedPulse 4s ease-in-out infinite'
                });

                if (i & 2 === 1) node.style.animationDelay = '0.8s';
                if (i % 3 === 0) node.style.animationDelay = '1.6s';

                container.appendChild(node);
                nodes.push({element: node, x, y});
            }

            //Create Connections
            for (let i = 0; i < nodes.length; i++){
                for (let j = i + 1; j < nodes.length; j++){
                    const distance = Math.sqrt(
                        Math.pow(nodes[i].x - nodes[j].x, 2) +
                        Math.pow(nodes[i].y - nodes[j].y, 2)
                    );

                    if (distance < Math.min(200, window.innerWidth * 0.25)){
                        const connection = document.createElement('div');
                        connection.className = 'neural-connection';

                        const angle = Math.atan2(
                            nodes[j].y - nodes[i].y,
                            nodes[j].x - nodes[i].x
                        ) * 180 / Math.PI;

                        Object.assign(connection.style,{
                            position: 'absolute',
                            height: '0.5px',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent',
                            opacity: '0',
                            left: nodes[i].x = 'px',
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
        function createStarNetwork(){
            const container = document.getElementById('star-network');
            if (!container) return;

            const stars = [];
            const starCount = Math.min(6, Math.floor(window.innerWidth /200));

            for (let i = 0; i < starCount; i++){
                const star = document.createElement('div');
                star.className = 'star-node';

                const x = Math.random() * (window.innerWidth - 50) + 25;
                const y = Math.random() * (window.innerHeight * 0.6) + 25

                Object.assign(star.style, {
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)',
                    borderRadius: '50%',
                    left: x + 'px',
                    top: y + 'px',
                    animation: 'advancedStarTwinkle 6s ease-in-out infinite'
                });

                if (i % 2 === 1) star.style.animationDelay = '1s';
                if (i % 3 === 0) star.style.animationDelay = '2s';

                // Add star crossing effect
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
                stars.push({element: star, x, y});
            }
        }




            

