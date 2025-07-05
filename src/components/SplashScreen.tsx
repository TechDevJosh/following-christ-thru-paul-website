"use client";

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeline = [
      { delay: 0, phase: 1 },     // Slash appears
      { delay: 400, phase: 2 },   // Logo splits
      { delay: 800, phase: 3 },   // Logo reunites
      { delay: 1500, phase: 4 },  // Hold
      { delay: 2500, phase: 5 },  // Fade out
    ];

    timeline.forEach(({ delay, phase }) => {
      setTimeout(() => setPhase(phase), delay);
    });

    setTimeout(onComplete, 3500);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center z-50 transition-all duration-600 ${
        phase === 5 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative w-40 h-40">
        {/* Left half of logo */}
        <div 
          className={`absolute top-0 left-0 w-20 h-40 overflow-hidden transition-all duration-300 ${
            phase === 2 ? '-translate-x-5 brightness-125' : 'translate-x-0 brightness-100'
          }`}
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
          className={`absolute top-0 right-0 w-20 h-40 overflow-hidden transition-all duration-300 ${
            phase === 2 ? 'translate-x-5 brightness-125' : 'translate-x-0 brightness-100'
          }`}
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
          className={`absolute top-0 left-1/2 w-1 h-full transform -translate-x-1/2 transition-all duration-800 ${
            phase >= 1 && phase <= 3 ? 'opacity-100' : 'opacity-0'
          } ${
            phase === 1 ? 'animate-slash' : ''
          }`}
          style={{
            background: 'linear-gradient(to bottom, transparent, #fbbf24, #f59e0b, #d97706, transparent)',
            boxShadow: '0 0 20px #fbbf24, 0 0 40px #f59e0b, 0 0 60px #d97706'
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes slash {
          0% { transform: translateX(-50%) translateY(-100%); }
          100% { transform: translateX(-50%) translateY(100%); }
        }
        .animate-slash {
          animation: slash 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}