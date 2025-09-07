"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./DiagonalDrawer";
import { useActiveSection } from "../../hooks/useActiveSection";

export default function Header(){
    const activeSection = useActiveSection();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 0);
        };
        window.addEventListener("scroll" , handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        // Stop body scrolling if the drawer is open
        if(isOpen){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <React.Fragment>
            {/*Overlay*/}
            <div
                className = {`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick = {() => setIsOpen(false)}
            ></div>

            {/*Drawer*/}
            <div className = {`diagnol-drawer ${isOpen ? "open" : ""}`}>
                <Drawer isOpen = {isOpen} setIsOpen = {setIsOpen} activeSection = {activeSection} />
            </div>

            {/*Header*/}
            <header
                className = {`fixed top-0 z-50 w-full transition-all duration-500 backdrop-blur-md`}
                style = {{
                    backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.8)" : "rgba(15,23,42, 0.6)",
                    borderBottom: isScrolled ? "1px solid rgba(83, 201, 201, 0.2)" : "1px solid transparent",
                }}
            >
                <div className = "relative flex justify-between items-center p-3" >
                    {/*Hamburger button (☰)*/}
                    <button
                        className = {`text-white text-3xl xl:hidden transition-opacity duration-300 ${
                            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                        onClick = {() => setIsOpen(true)}
                    >
                        ☰
                    </button>

                    {/*Home link*/}
                    <div
                        className = {`flex-grow text-center xl:hidden transition-opacity duration-300 ${
                            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    >
                        <a href = "/#home" className = "text-white text-2xl font-bold">
                            Home
                        </a>
                    </div>

                    {/*Placeholder for allignment*/}
                    <div className ="hidden xl:block w-14"></div>
                </div>

                {/*Navigation Links*/}
                <nav className = "hidden xl:block mt-2">
                    <ul className = "flex justify-center space-x-12">
                        <li>
                            <a
                                className = {`menu-item ${
                                    activeSection === 'home' ? "text-[#53c9c9]" : "text-[#ffffff]"
                                } hover:text-[#53c9c9] font-semibold text-lg transition-colors duration-300`}
                                href = "/#home"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className={`menu-item ${
                                    activeSection === 'about' ? "text-[#53c9c9]" : "text-[#ffffff]"
                                } hover:text-[#53c9c9] font-semibold text-lg transition-colors duration-300`}
                                href="/#about"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                className={`menu-item ${
                                    activeSection === 'projects' ? "text-[#53c9c9]" : "text-[#ffffff]"
                                } hover:text-[#53c9c9] font-semibold text-lg transition-colors duration-300`}
                                href="/#projects"
                            >
                                Projects
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </React.Fragment>
    );
}