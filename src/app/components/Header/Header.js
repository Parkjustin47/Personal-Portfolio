"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./DiagonalDrawer";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import MoonIcon from "../MoonIcon"
import SunIcon from "../SunIcon"

export default function Header() {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scrolling when the drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeSection={activeSection}
      />

      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 backdrop-blur-md border-b ${
          isDarkMode
            ? isScrolled 
              ? 'bg-slate-900/90 border-slate-700/50' 
              : 'bg-slate-900/70 border-transparent'
            : isScrolled
              ? 'bg-white/90 border-slate-200/50'
              : 'bg-white/70 border-transparent'
        }`}
        style={{
          boxShadow: isScrolled 
            ? isDarkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)'
            : 'none'
        }}
      >
        <div className="relative flex justify-between items-center px-4 py-2">
          {/* Mobile Hamburger */}
          <button
            className={`xl:hidden text-2xl transition-all duration-300 hover:scale-110 ${
              isDarkMode ? 'text-white hover:text-[#53c9c9]' : 'text-slate-800 hover:text-[#53c9c9]'
            } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className={`xl:hidden px-3 py-1.5 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/50 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' 
                : 'bg-white/80 border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            } backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <span className="text-sm font-medium">
              {isDarkMode ? <SunIcon/> : <MoonIcon/>}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:block pb-2">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-8">
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'home' 
                    ? "text-[#53c9c9]" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9]" 
                      : "text-slate-700 hover:text-[#53c9c9]"
                }`}
                href="/#home"
              >
                Home
                {activeSection === 'home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#53c9c9] rounded-full"></div>
                )}
              </a>
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'about' 
                    ? "text-[#53c9c9]" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9]" 
                      : "text-slate-700 hover:text-[#53c9c9]"
                }`}
                href="/#about"
              >
                About
                {activeSection === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#53c9c9] rounded-full"></div>
                )}
              </a>
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'projects' 
                    ? "text-[#53c9c9]" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9]" 
                      : "text-slate-700 hover:text-[#53c9c9]"
                }`}
                href="/#projects"
              >
                Projects
                {activeSection === 'projects' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#53c9c9] rounded-full"></div>
                )}
              </a>
            </div>
            
            <div className="ml-6 pl-6 border-l border-slate-600/30">
              <button
                onClick={toggleTheme}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' 
                    : 'bg-white/80 border border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <span className="text-base">
                  {isDarkMode ? <SunIcon/> : <MoonIcon/>}
                </span>
                <span>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}