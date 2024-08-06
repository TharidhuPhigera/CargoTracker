"use client"
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <button
          className="text-3xl md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex md:space-x-8">
          <Link href="/quote" className="text-xl hover:text-gray-300 transition-colors duration-300">
            Quote
          </Link>
          <Link href="/track" className="text-xl hover:text-gray-300 transition-colors duration-300">
            Track
          </Link>
          <Link href="/ship" className="text-xl hover:text-gray-300 transition-colors duration-300">
            Ship
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-20 left-0 w-full bg-gradient-to-r from-[#3F72AF] to-[#112D4E] text-white p-6 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4">
          <Link href="/quote" className="text-xl hover:text-gray-300 transition-colors duration-300" onClick={toggleMenu}>
            Quote
          </Link>
          <Link href="/track" className="text-xl hover:text-gray-300 transition-colors duration-300" onClick={toggleMenu}>
            Track
          </Link>
          <Link href="/ship" className="text-xl hover:text-gray-300 transition-colors duration-300" onClick={toggleMenu}>
            Ship
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;