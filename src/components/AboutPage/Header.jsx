import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from "../../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center py-[15px] px-[30px] bg-[#1e293b] text-white font-sans shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-b border-[rgba(255,255,255,0.2)] backdrop-blur-sm">
        <div className="logo">
          <HashLink to="/#home" smooth>
            <img
              src={logo}
              alt="Logo"
              className="h-[40px] cursor-pointer"
            />
          </HashLink>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <nav className="hidden md:flex gap-8">
          <HashLink to="/#home" smooth className="text-white hover:text-[#FF6A28]">Home</HashLink>
          <HashLink to="/#about" smooth className="text-white hover:text-[#FF6A28]">About</HashLink>
          <HashLink to="/#programs" smooth className="text-white hover:text-[#FF6A28]">Programs</HashLink>
          <HashLink to="/#contact" smooth className="text-white hover:text-[#FF6A28]">Contact</HashLink>
        </nav>

        {/* Mobile menu button - hidden on desktop */}
        <div className="md:hidden text-2xl cursor-pointer text-white z-[1001]" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="fixed md:hidden top-[70px] right-[20px] bg-[#1e293b] rounded-lg py-[15px] px-[20px] flex flex-col gap-4 shadow-[0_8px_16px_rgba(0,0,0,0.2)] z-[999]">
          <HashLink to="/#home" smooth onClick={closeMenu} className="text-white hover:text-[#FF6A28] text-base">Home</HashLink>
          <HashLink to="/#about" smooth onClick={closeMenu} className="text-white hover:text-[#FF6A28] text-base">About</HashLink>
          <HashLink to="/#programs" smooth onClick={closeMenu} className="text-white hover:text-[#FF6A28] text-base">Programs</HashLink>
          <HashLink to="/#contact" smooth onClick={closeMenu} className="text-white hover:text-[#FF6A28] text-base">Contact</HashLink>
        </nav>
      )}
    </>
  );
};

export default Header;