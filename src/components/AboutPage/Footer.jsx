import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  // Custom scroll function with offset for fixed header
  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; // Adjust this value based on your header height
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#1e293b] text-gray-300">
      {/* Main Footer Content */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Uptoskills Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Uptoskills</h4>
            <ul className="text-sm space-y-2">
              <li>
                <HashLink 
                  to="/#home" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#about" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  About
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#programs" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Careers
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Programs</h4>
            <ul className="text-sm space-y-2">
              <li>
                <HashLink 
                  to="/#programs" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Internships
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#programs" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Open Source
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#programs" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Hackathons
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Resources</h4>
            <ul className="text-sm space-y-2">
              <li>
                <HashLink 
                  to="/#help" 
                  scroll={el => scrollWithOffset(el)}
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Help Center
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="" 
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Community
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="" 
                  className="hover:text-yellow-300 transition duration-300"
                >
                  Contact
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Get in Touch</h4>
            <div className="space-y-4">
              {/* Social Media Links */}
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-300">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-300">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-300">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-300">
                  <FaInstagram className="text-xl" />
                </a>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-lg mb-2 text-white">Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-l-md text-gray-800 focus:outline-none text-sm"
                  />
                  <button className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-r-md hover:bg-green-700 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h4 className="font-semibold text-lg mb-2 text-white">Contact Us</h4>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md text-gray-800 focus:outline-none text-sm"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md text-gray-800 focus:outline-none text-sm"
                  />
                  <button className="bg-green-600 text-white w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-green-700 text-sm">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="py-4 text-center text-[14px] text-gray-500 border-t border-gray-800">
        © 2025 UpToSkills. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
