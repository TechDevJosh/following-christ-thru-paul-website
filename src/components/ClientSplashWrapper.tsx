"use client";

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface ClientSplashWrapperProps {
  children: React.ReactNode;
}

export default function ClientSplashWrapper({ children }: ClientSplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem('fctp-visited');
      if (!hasVisited) {
        setShowSplash(true);
        sessionStorage.setItem('fctp-visited', 'true');
      }
    } catch (error) {
      console.error('Session storage error:', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <>{children}</>;
}