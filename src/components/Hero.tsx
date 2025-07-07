"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import MicroOnboardingModal from './MicroOnboardingModal';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleStartHereClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <section
      className="relative py-12 px-6 bg-white overflow-hidden hero-section min-h-[calc(100vh-var(--navbar-height))] flex items-center"
      role="banner"
      aria-labelledby="hero-title"
      style={{
        backgroundImage: 'url(/placeholders/pastel-yellow-vignette-concrete-textured-background.jpg)',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center ken-burns-effect hero-background-overlay"
        style={{
          backgroundImage: 'url(/placeholders/mikolaj-Yy9ghY8k348-unsplash.jpg)',
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/placeholders/pastel-yellow-vignette-concrete-textured-background.jpg)',
          opacity: 0.3, // Adjust opacity as needed
          mixBlendMode: 'multiply', // Blend mode for parchment effect
        }}
      ></div>
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Scripture Reference */}
        <p className="text-sm italic text-[rgba(255,255,255,0.7)] mb-2 tracking-wider">
          "To make all men see what is the fellowship of the mystery" – Ephesians 3:9
        </p>

        {/* Logo + Title Combined - Mobile: Stacked, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
          <Image 
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png" 
            alt="Following Christ Thru Paul Ministry Logo" 
            width={112}
            height={112}
            priority
            loading="eager"
            className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full shadow-lg flex-shrink-0"
            sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
          />
          <h1 id="hero-title" className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-center sm:text-left">
            <span className="block text-white text-shadow-sm">Following Christ</span>
            <span className="block text-[#60A5FA]">Thru Paul</span>
          </h1>
        </div>

        {/* Primary Statement */}
        <p className="text-base sm:text-lg md:text-xl text-[#E2E8F0] max-w-3xl leading-relaxed mb-3">
          A <strong className="font-semibold">KJV Bible-believing ministry</strong> committed to serious Bible study, saintly edification, and sound doctrinal teaching.
        </p>

        {/* Doctrinal Focus */}
        <p className="text-sm sm:text-base md:text-lg text-[#E2E8F0] max-w-2xl leading-relaxed mb-6">
          Exploring the depths of Pauline dispensational truth with reverence, precision, and unwavering commitment to Scripture.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/topics"
            className="btn-primary ripple-effect"
            aria-describedby="start-here-desc"
            onClick={handleStartHereClick}
          >
            Start Here
          </Link>
          <span id="start-here-desc" className="sr-only">Begin your Bible study journey with our topical teachings</span>
          <Link
            href="/school"
            className="btn-secondary ripple-effect border border-[#E2E8F0] shadow-md"
            aria-describedby="register-desc"
          >
            Register Now
          </Link>
          <span id="register-desc" className="sr-only">Register for our Bible school program</span>
        </div>

        {/* We Are Strong Proponents Of Section */}
        <div 
          ref={sectionRef}
          className={`pt-6 border-t border-[rgba(203,213,225,0.3)] w-full max-w-3xl transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-sm text-[#E2E8F0] mb-4">We Are Strong Proponents of</p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-[#E2E8F0]">
            <span className="text-xs font-medium whitespace-nowrap">AUTHORIZED VERSION (KJV)</span>
            <span className="w-1 h-1 bg-[rgba(203,213,225,0.3)] rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">PAULINE DISPENSATIONALISM</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
            <span className="text-xs font-medium whitespace-nowrap">SUBMISSION TO A LOCAL BIBLE-BELIEVING CHURCH</span>
          </div>
        </div>
        <MicroOnboardingModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </section>
  );
}