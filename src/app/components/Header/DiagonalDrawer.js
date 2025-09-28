import React from "react";
import { useTheme } from "../../hooks/useTheme";

export default function DiagonalDrawer({
  isOpen,
  setIsOpen,
  activeSection,
}) {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)} // Close drawer on overlay click
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-80 w-full shadow-2xl transform backdrop-blur-xl border-b transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-700' 
            : 'bg-white/95 border-slate-200'
        }`}
      >
        {/* Drawer Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <span className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isDarkMode 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="space-y-6">
            <li>
              <a
                href="/#home"
                className={`block py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 ${
                  activeSection === 'home' 
                    ? "text-[#53c9c9] bg-[#53c9c9]/10" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9] hover:bg-slate-800/50" 
                      : "text-slate-700 hover:text-[#53c9c9] hover:bg-slate-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                🏠 Home
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className={`block py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 ${
                  activeSection === 'about' 
                    ? "text-[#53c9c9] bg-[#53c9c9]/10" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9] hover:bg-slate-800/50" 
                      : "text-slate-700 hover:text-[#53c9c9] hover:bg-slate-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                👨‍💻 About
              </a>
            </li>
            <li>
              <a
                href="/#projects"
                className={`block py-3 px-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 ${
                  activeSection === 'projects' 
                    ? "text-[#53c9c9] bg-[#53c9c9]/10" 
                    : isDarkMode 
                      ? "text-white hover:text-[#53c9c9] hover:bg-slate-800/50" 
                      : "text-slate-700 hover:text-[#53c9c9] hover:bg-slate-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                🚀 Projects
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
