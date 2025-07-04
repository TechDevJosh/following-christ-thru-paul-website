"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import GlobalSearch from './GlobalSearch';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isConnectDropdownOpen, setIsConnectDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 w-full overflow-hidden">
      <nav className="container-custom py-4 max-w-full">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-heading text-gray-900 hover:text-blue-700 transition-colors">
              <span className="block sm:hidden text-xl font-bold">FCTP</span>
              <span className="hidden sm:block text-xl lg:text-3xl">Following Christ Thru Paul</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 ml-8">
            {/* Left Navigation */}
            <nav className="flex-1">
              <ul className="flex items-center space-x-8">
              <li><Link href="/about" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">About</Link></li>
              <li><Link href="/verse-by-verse" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium whitespace-nowrap">Verse by Verse</Link></li>
              <li><Link href="/topics" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">Topics</Link></li>
              <li><Link href="/resources" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">Resources</Link></li>
              <li><Link href="/ask" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">Ask</Link></li>
              <li><Link href="/school" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">School</Link></li>
              
              {/* Connect Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsConnectDropdownOpen(!isConnectDropdownOpen)}
                  className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium focus-ring flex items-center"
                >
                  Connect
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isConnectDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 card-elevated py-2 z-20">
                    <Link href="/newsletter" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Subscribe</Link>
                    <Link href="/connect/contact" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Contact</Link>
                    <Link href="/connect/support" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Support</Link>
                  </div>
                )}
              </li>
              </ul>
            </nav>

            {/* Right Navigation */}
            <div className="flex items-center space-x-2 ml-4">
              <GlobalSearch />
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white font-body font-medium rounded-lg hover:bg-blue-700 transition-colors focus-ring whitespace-nowrap text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-1 flex-shrink-0">
            <div className="hidden xs:block">
              <GlobalSearch />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-gray-700 hover:text-blue-700 focus-ring rounded-md flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="container-custom py-4">
            {/* Mobile Search for very small screens */}
            <div className="xs:hidden mb-4">
              <GlobalSearch />
            </div>
            <ul className="space-y-1">
              <li><Link href="/about" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">About</Link></li>
              <li><Link href="/verse-by-verse" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap">Verse by Verse</Link></li>
              <li><Link href="/topics" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">Topics</Link></li>
              <li><Link href="/resources" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">Resources</Link></li>
              <li><Link href="/ask" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">Ask</Link></li>
              <li><Link href="/school" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">School</Link></li>
              
              {/* Mobile Connect Section */}
              <li className="border-t border-gray-100 pt-2 mt-2">
                <div className="px-4 py-2">
                  <p className="font-subheading text-sm text-gray-500 mb-2">Connect</p>
                  <div className="space-y-1 pl-4">
                    <Link href="/newsletter" className="block py-2 font-body text-gray-600 hover:text-blue-700 transition-colors">Subscribe</Link>
                    <Link href="/connect/contact" className="block py-2 font-body text-gray-600 hover:text-blue-700 transition-colors">Contact</Link>
                    <Link href="/connect/support" className="block py-2 font-body text-gray-600 hover:text-blue-700 transition-colors">Support</Link>
                  </div>
                </div>
              </li>

              {/* Mobile Login */}
              <li className="border-t border-gray-100 pt-4 mt-2">
                <div className="px-4">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-body font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>

    {/* Login Modal - Rendered outside header */}
    <LoginModal 
      isOpen={isLoginModalOpen} 
      onClose={() => setIsLoginModalOpen(false)} 
    />
    </>
  );
}
