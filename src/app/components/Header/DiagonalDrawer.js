import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DiagonalDrawer({
  isOpen,
  setIsOpen,
  activeSection,
}) {
  const route = useRouter();
  const pathname = usePathname();

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
        className={`fixed top-0 left-0 h-72 w-full bg-white shadow-lg transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b cursor-pointer" >
          <span className="text-lg font-bold text-gray-700">Menu</span>
          
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 text-center">
          <ul className="space-y-4">
            <li className="px-6 py-2">
              <a
                href="/#home"
                className={`font-semibold ${
                  activeSection === 'home' ? "text-[#53c9c9]" : "text-gray-700"
                }`}
                onClick={() => {
                  setIsOpen(false); // Close the drawer after clicking
                }}
              >
                Home
              </a>
            </li>
            <li className="px-6 py-2">
              <a
                href="/#about"
                className={`font-semibold ${
                  activeSection === 'about' ? "text-[#53c9c9]" : "text-gray-700"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                About
              </a>
            </li>
            <li className="px-6 py-2">
              <a
                href="/#projects"
                className={`font-semibold ${
                  activeSection === 'projects' ? "text-[#53c9c9]" : "text-gray-700"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Projects
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
