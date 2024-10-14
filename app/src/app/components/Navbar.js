"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes, FaTruck, FaTrash, FaBox } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const menuRef = useRef(null); // Ref for the mobile menu

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Effect to close the dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        menuRef.current && !menuRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setIsOpen(false); // Close the mobile menu
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white shadow-lg fixed top-0 w-full z-20">
      <div className="container mx-auto flex justify-between items-center h-20 px-6 md:px-12">
        {/* Logo */}
        <h1 className="text-4xl md:text-6xl font-bold">
          <Link href="/" className="text-white hover:text-gray-200 transition-colors duration-300">
            VCS
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button className="text-3xl md:hidden" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex md:space-x-8 relative">
          <div className="relative" ref={dropdownRef}>
            <button 
              className="text-xl hover:text-gray-300 transition-colors duration-300 focus:outline-none"
              onClick={toggleDropdown}
            >
              Servizi
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-[#3F72AF] rounded-lg shadow-lg transition-opacity duration-200 ease-in-out opacity-100">
                <Link 
                  href="/traslochi" 
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                >
                  <FaTruck className="mr-2" /> Traslochi
                </Link>
                <Link 
                  href="/smaltimento" 
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                >
                  <FaTrash className="mr-2" /> Smaltimento 
                </Link>
                <Link 
                  href="/logistica" 
                  className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                >
                  <FaBox className="mr-2" /> Logistica
                </Link>
              </div>
            )}
          </div>
          {/* New Contatti Link */}
          <Link 
            href="/contatti" 
            className="text-xl hover:text-gray-300 transition-colors duration-300"
          >
            Contatti
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`md:hidden fixed top-20 left-0 w-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white p-6 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4">
          <button 
            className="text-xl hover:text-gray-300 transition-colors duration-300 flex items-center justify-between w-full"
            onClick={toggleDropdown}
          >
            Servizi
          </button>
          {dropdownOpen && (
            <div className="flex flex-col space-y-2 mt-2">
              <Link 
                href="/traslochi" 
                className="flex items-center text-lg hover:text-gray-300 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <FaTruck className="mr-2 text-sm" /> Traslochi
              </Link>
              <Link 
                href="/smaltimento" 
                className="flex items-center text-lg hover:text-gray-300 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <FaTrash className="mr-2 text-sm" /> Smaltimento 
              </Link>
              <Link 
                href="/logistica" 
                className="flex items-center text-lg hover:text-gray-300 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <FaBox className="mr-2 text-sm" /> Logistica
              </Link>
            </div>
          )}
          <Link 
            href="/contatti" 
            className="flex items-center text-lg hover:text-gray-300 transition-colors duration-300"
            onClick={toggleMenu}
          >
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;