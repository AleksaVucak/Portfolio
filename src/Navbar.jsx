// Import React and useState for component state management
import React, { useState } from "react";
// Import hamburger (FiMenu) and close (FiX) icons from react-icons
import { FiMenu, FiX } from "react-icons/fi";

// Helper function to smoothly scroll to a section by element id
const scrollToSection = (id) => {
  // Find the target element by id
  const target = document.getElementById(id);
  // If the element exists, scroll it into view smoothly
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

// Navbar component providing responsive navigation with a mobile menu
const Navbar = () => {
  // Track whether the mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu open/closed
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // On link click: scroll to section and close the mobile menu
  const handleLinkClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  // Render the fixed, translucent navbar with desktop and mobile layouts
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-black/60 backdrop-blur-md border-b border-indigo-400 shadow-md z-[9999]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("top")}
          className="text-2xl font-bold text-white hover:text-indigo-400 transition-all"
        >
          AV
        </button>

        <div className="hidden md:flex items-center space-x-4 text-lg font-medium">
          <button onClick={() => scrollToSection("experience")} className="hover:text-indigo-400 transition-all">Work Experience</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("projects")} className="hover:text-indigo-400 transition-all">Projects</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("skills")} className="hover:text-indigo-400 transition-all">Skills</button>
          <div className="w-px h-6 bg-indigo-400 animate-pulse opacity-60" />
          <button onClick={() => scrollToSection("contact")} className="hover:text-indigo-400 transition-all">Contact Me</button>
        </div>

        <div className="md:hidden">
          <button onClick={handleToggle} className="text-white text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
 
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

// Export the Navbar as the default export
export default Navbar;