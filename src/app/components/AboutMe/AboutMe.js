'use client'
import React, { use } from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function AboutMe(){
    const [sectionRef, sectionVisible] = useScrollAnimation({threshold: 0.2})
    const [photoRef, photoVisible] = useScrollAnimation({ threshold: 0.3})
    const [contentRef, contentVisible] = useScrollAnimation({threshold: 0.3})
    const [hobbiesRef, hobbiesVisible] = useScrollAnimation({threshold : 0.3})

    return (
        <div className = "about-me-section" id="about">
            <style jsx>{`
                .about-me-section {
                    min-height: 100vh;
                    background: linear-gradient(180deg, #475569 0%, #64748b 30%, #943b8 60%, #cbd5e1 90%, #e2e8f0 100%);
                    padding: 4rem 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .about-container {
                    max-width: 1200px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .about-title {
                    font-size: clamp(3rem, 6vw, 4rem);
                    font-weight: bold;
                    color: #F7FBFD;
                    text-align: center;
                    margin-bottom: 3rem;
                    font-family: 'Inter', Arial, sans-serif;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
                }
                
                .about-title.visible{
                    opacity: 1;
                    transform: translateY(0);
                }

                .aboutContent{
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 3rem;
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shawdow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 3rem;
                    align-items: start;
                    margin-bottom: 4rem;
                    max-width: 1200px;
                    margin: 0 auto 4rem auto;
                }

                .photo-section{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    opacity: 0;
                    transform: translateX(-40px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
                }

                .photo-section.visible{
                    opacity: 1;
                    transform: translateX(0);
                }

                .profile-photo{
                    width: 280px;
                    height: 350px;
                    border-redius: 20px;
                    object-fit: cover;
                    box-shawdow: 0 20px 40px rgba(0,0,0,0.3);
                    margin-bottom: 1.5rem;
                    border: 4px solid rgba(255,255,255,0.1);
                }

                .info-section{
                    opacity: 0;
                    transform: translateX(40px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
                }

                .info-section.visible{
                    opacity: 1;
                    transform: translateX(0);
                }

                .info-content{
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .education, .involvement, .interests{
                    border-left: 4px solid #05d9e8;
                    padding-left: 1.5rem;
                }

                .education h3, .involvement h3, .interests h3{
                    color: #05d9e8;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-bottom: 0rem;
                    font-family: 'Inter', Arial, sans-serif;
                }

                .education p, .involvement p, .interets p {
                    color: #ffffff;
                    font-size: 1.2rem;
                    line-height: 1.8;
                    margin: 0;
                }

                .resume-button-section{
                    margin-top: 2rem;
                    display: flex;
                    justify-content: flex-start;
                }
                
                .resume-button{
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: linear-gradient(135deg, #05d9e8, #53c9c9);
                    color: #ffffff;
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shawdow: 0 4px 15px rgba(5, 217, 232, 0.3);
                    border: 1px solid rgba(255,255,255,0.2);
                    backdrop-filter: blur(10px);
                    font-family: 'Inter'. Arial, sans-serif;
                }

                .resume-button:hover{
                    transform: translateY(-2px);
                    box-shawdow: 0 8px 25px rgba(5,217,232,0.5);
                    background: linear-gradient(135deg, #53c9c9, #05d9e8);
                }
                
                .resume-button:active{
                    transform: translateY(0);
                }

                .resume-icon{
                    width: 20px;
                    height: 20px;
                }

                .involvement-item{
                    margin-bottom: 0.5rem;
                }

                .involvement-item:last-child{
                    margin-bottom: 0;
                }

                .hobbies{
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 3rem;
                    border: 1px solid rgba(255,255,255,0.2);
                    box-shawdow: 0 10px 30px rgba(0,0,0,0.2);
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .hobbies.visible{
                    opacity: 1;
                    transform: translateY(0);
                }

                .hobbies h3{
                    color: #05d9e8;
                    font-size: 1.8rem;
                    font-weight: bold;
                    margin-bottom: 1.5rem;
                    font-family: 'Inter', Arial, sans-serif;
                }
            `}</style>
        </div>
    )
}


