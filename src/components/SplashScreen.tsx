"use client";

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Complete after fade transition
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-[80vw] max-w-2xl aspect-square flex items-center justify-center">
        <img
          src="https://pub-8d4c47a32bf5437a90a2ba38a0f85223.r2.dev/FCTP%20Logo.png"
          alt="Following Christ Thru Paul Logo"
          className="w-full h-full object-contain animate-clip-slash"
        />
      </div>
      
      <style jsx>{`
        @keyframes clip-slash {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          }
          25% {
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
          }
          50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        .animate-clip-slash {
          animation: clip-slash 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}