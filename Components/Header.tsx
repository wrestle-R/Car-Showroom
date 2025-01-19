"use client"
import React, { useState } from 'react';
import { Menu, X, Car } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <>
  <header className="bg-gradient-to-r from-gray-900 to-black">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Car className="h-6 w-6 text-blue-600 mr-2" />
            <a href="#" className="text-2xl font-bold text-blue-600">
              AutoShow
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Car Finder
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3">
              <a
                href="#"
                className="block text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a href="#" className="block text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
              
                Car Finder
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  
    </>
);
    
};

export default Header;