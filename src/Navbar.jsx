import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Install react-icons if you haven't: npm install react-icons

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id) => {
    scrollToSection(id);
    setIsOpen(false); // Close menu on mobile after clicking
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black/60 backdrop-blur-md border-b border-indigo-400 shadow-md z-[9999]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("top")}
          className="text-2xl font-bold text-white hover:text-indigo-400 transition-all"
        >
          AV
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4 text-lg font-medium">
          <button onClick={() => scrollToSection("experience")} className="hover:text-indigo-400 transition-all">Work Experience</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("projects")} className="hover:text-indigo-400 transition-all">Projects</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("skills")} className="hover:text-indigo-400 transition-all">Skills</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("contact")} className="hover:text-indigo-400 transition-all">Contact Me</button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={handleToggle} className="text-white text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md px-6 pb-6 flex flex-col space-y-4 text-lg font-medium">
          <button onClick={() => handleLinkClick("experience")} className="hover:text-indigo-400 transition-all">Work Experience</button>
          <button onClick={() => handleLinkClick("projects")} className="hover:text-indigo-400 transition-all">Projects</button>
          <button onClick={() => handleLinkClick("skills")} className="hover:text-indigo-400 transition-all">Skills</button>
          <button onClick={() => handleLinkClick("contact")} className="hover:text-indigo-400 transition-all">Contact Me</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
