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




            

