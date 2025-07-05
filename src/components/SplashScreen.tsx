"use client";

import { useEffect, useRef } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const logoLeftRef = useRef<HTMLDivElement>(null);
  const logoRightRef = useRef<HTMLDivElement>(null);
  const slashLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runAnimation = async () => {
      // Dynamic import to avoid build issues
      const animeModule = await import('animejs');
      const anime = animeModule.default || animeModule;
      
      if (!logoLeftRef.current || !logoRightRef.current || !slashLineRef.current || !containerRef.current) return;

      // Animation timeline
      const timeline = anime.timeline({
        complete: () => setTimeout(onComplete, 500)
      });

      timeline
        .add({
          targets: slashLineRef.current,
          opacity: [0, 1],
          translateY: ['-100%', '100%'],
          duration: 800,
          easing: 'easeInOutQuad'
        })
        .add({
          targets: [logoLeftRef.current, logoRightRef.current],
          translateX: (el: HTMLElement, i: number) => i === 0 ? -20 : 20,
          duration: 200,
          easing: 'easeOutQuad'
        }, '-=600')
        .add({
          targets: [logoLeftRef.current, logoRightRef.current],
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          duration: 300,
          easing: 'easeInOutQuad'
        }, '-=400')
        .add({
          targets: [logoLeftRef.current, logoRightRef.current],
          translateX: 0,
          duration: 400,
          easing: 'easeOutElastic(1, .8)'
        })
        .add({
          targets: slashLineRef.current,
          opacity: 0,
          duration: 300
        }, '-=200')
        .add({
          duration: 800
        })
        .add({
          targets: containerRef.current,
          opacity: 0,
          scale: 0.9,
          duration: 600,
          easing: 'easeInQuad'
        });
    };
    
    runAnimation();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center z-50"
    >
      <div className="relative w-40 h-40">
        {/* Left half of logo */}
        <div 
          ref={logoLeftRef}
          className="absolute top-0 left-0 w-20 h-40 overflow-hidden"
        >
          <img
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
            alt="FCTP Logo Left"
            className="w-40 h-40 rounded-full object-cover"
            style={{ objectPosition: 'left center' }}
          />
        </div>
        
        {/* Right half of logo */}
        <div 
          ref={logoRightRef}
          className="absolute top-0 right-0 w-20 h-40 overflow-hidden"
        >
          <img
            src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
            alt="FCTP Logo Right"
            className="w-40 h-40 rounded-full object-cover"
            style={{ objectPosition: 'right center', transform: 'translateX(-50%)' }}
          />
        </div>
        
        {/* Sword slash line */}
        <div 
          ref={slashLineRef}
          className="absolute top-0 left-1/2 w-1 h-full transform -translate-x-1/2 opacity-0"
          style={{
            background: 'linear-gradient(to bottom, transparent, #fbbf24, #f59e0b, #d97706, transparent)',
            boxShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706'
          }}
        />
      </div>
    </div>
  );
}