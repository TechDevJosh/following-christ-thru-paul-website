"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GlobalSearch from './GlobalSearch';
import LoginModal from './LoginModal';
import ReportModal from './ReportModal';

export default function Navbar() {
  const router = useRouter();
  const [isConnectDropdownOpen, setIsConnectDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.connect-dropdown')) {
        setIsConnectDropdownOpen(false);
      }
    };

    if (isConnectDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isConnectDropdownOpen]);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsConnectDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsConnectDropdownOpen(false);
    }, 200); // 200ms delay
  };



  return (
    <>
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 w-full relative" style={{zIndex: 998}}>
      <nav className="px-4 sm:px-6 lg:px-8 py-4 max-w-full" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/"
              className="flex items-center space-x-2 font-heading text-gray-900 hover:text-blue-700 transition-colors"
            >
              <Image 
                src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
                alt="Following Christ Thru Paul Ministry Logo" 
                width={40}
                height={40}
                priority
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
                sizes="(max-width: 640px) 32px, 40px"
              />
              <span className="hidden sm:block text-lg lg:text-xl font-bold">Following Christ Thru Paul</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 ml-8">
            {/* Left Navigation */}
            <nav className="flex-1">
              <ul className="flex items-center space-x-8">
                <li><Link href="/about" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">About</Link></li>
                <li><Link href="/verse-by-verse" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium whitespace-nowrap">Verse by Verse</Link></li>
                <li><Link href="/topics" className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium">Topics</Link></li>
                {/* More Dropdown */}
                <li 
                  className="relative connect-dropdown"
                  
                >
                  <button 
                    className="font-body text-gray-700 hover:text-blue-700 transition-colors font-medium focus-ring flex items-center relative z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsConnectDropdownOpen(!isConnectDropdownOpen);
                    }}
                  >
                    More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${
                      isConnectDropdownOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
                    }`}
                    style={{zIndex: 10000}}
                  >
                    <Link href="/resources" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Resources</Link>
                    <Link href="/ask" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Ask</Link>
                    <Link href="/school" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">School</Link>
                    <Link href="/newsletter" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Subscribe</Link>
                    <Link href="/connect/contact" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Contact</Link>
                    <Link href="/connect/support" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Support</Link>
                    <button 
                      onClick={() => setIsReportModalOpen(true)}
                      className="block w-full text-left px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                      data-report-trigger="true"
                    >
                      Report an Issue
                    </button>
                  </div>
                </li>
              </ul>
            </nav>

            {/* Right Navigation */}
            <div className="flex items-center space-x-1 ml-2">
              {showSearchInput && <GlobalSearch />}
              <button
                onClick={() => setShowSearchInput(!showSearchInput)}
                className="p-2 text-gray-700 hover:text-blue-700 focus-ring rounded-full"
                aria-label="Toggle search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLoginModalOpen(true);
                }}
                className="inline-flex items-center px-2 py-1.5 bg-blue-600 text-white font-body font-medium rounded-lg hover:bg-blue-700 transition-colors focus-ring whitespace-nowrap text-sm relative"
                style={{zIndex: 1001}}
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
            <button 
              onClick={() => setShowSearchInput(!showSearchInput)} 
              className="p-3 text-gray-700 hover:text-blue-700 focus-ring rounded-md flex-shrink-0 touch-manipulation relative"
              aria-label="Toggle search"
              style={{minHeight: '44px', minWidth: '44px'}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-3 text-gray-700 hover:text-blue-700 focus-ring rounded-md flex-shrink-0 touch-manipulation relative"
              aria-label="Toggle mobile menu"
              style={{zIndex: 1000, minHeight: '44px', minWidth: '44px'}}
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
      {/* Mobile Search Input */}
      {showSearchInput && (
        <div className="lg:hidden px-4 pb-4">
          <GlobalSearch />
        </div>
      )}
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white backdrop-blur-sm" style={{zIndex: 999}}>
          <div className="container-custom py-4">
            <ul className="space-y-1">
              <li><Link href="/about" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">About</Link></li>
              <li><Link href="/verse-by-verse" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap">Verse by Verse</Link></li>
              <li><Link href="/topics" className="block py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors">Topics</Link></li>
              {/* Mobile More Dropdown */}
              <li className="relative connect-dropdown">
                <button 
                  className="block w-full text-left py-3 px-4 font-body text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-md transition-colors focus-ring flex items-center relative z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsConnectDropdownOpen(!isConnectDropdownOpen);
                  }}
                >
                  More
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`relative top-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${
                    isConnectDropdownOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
                  }`}
                  style={{zIndex: 999}}
                >
                  <Link href="/resources" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Resources</Link>
                  <Link href="/ask" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Ask</Link>
                  <Link href="/school" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">School</Link>
                  <Link href="/newsletter" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Subscribe</Link>
                  <Link href="/connect/contact" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Contact</Link>
                  <Link href="/connect/support" className="block px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors">Support</Link>
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="block w-full text-left px-4 py-2 font-body text-gray-700 hover:bg-gray-50 hover:text-blue-700 transition-colors"
                    data-report-trigger="true"
                  >
                    Report an Issue
                  </button>
                </div>
              </li>

              {/* Mobile Login */}
              <li className="border-t border-gray-100 pt-4 mt-2">
                <div className="px-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsLoginModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-body font-medium rounded-lg hover:bg-blue-700 transition-colors touch-manipulation"
                    style={{minHeight: '44px'}}
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
    
    {/* Report Modal - Rendered outside header */}
    <ReportModal 
      isOpen={isReportModalOpen} 
      onClose={() => setIsReportModalOpen(false)} 
    />
    </>
  );
}
