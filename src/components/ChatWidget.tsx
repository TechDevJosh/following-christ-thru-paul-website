'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import ChatPanel from './ChatPanel';

interface ChatWidgetProps {
  userRole: string;
  userId: string;
}

interface Position {
  x: number;
  y: number;
}

export default function ChatWidget({ userRole, userId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 24, y: 600 }); // Start at bottom-left (default)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const chatButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show chat widget for admin and writer roles
    setHasPermission(['admin', 'writer'].includes(userRole));
  }, [userRole]);

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem('chatWidgetPosition');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        setPosition(parsed);
      } catch (e) {
        console.warn('Failed to parse saved chat position');
      }
    } else {
      // Set default position at bottom-left
      setPosition({ x: 24, y: window.innerHeight - 104 });
    }
  }, []);

  // Save position to localStorage
  const savePosition = (newPosition: Position) => {
    localStorage.setItem('chatWidgetPosition', JSON.stringify(newPosition));
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    
    // Start drag detection
    const startTime = Date.now();
    const startX = e.clientX;
    const startY = e.clientY;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - startX);
      const deltaY = Math.abs(moveEvent.clientY - startY);
      const deltaTime = Date.now() - startTime;
      
      // If moved more than 3px, start dragging (immediate drag on movement)
      if (deltaX > 3 || deltaY > 3) {
        setIsDragging(true);
        setHasDragged(true);
        setDragStart({
          x: moveEvent.clientX - position.x,
          y: moveEvent.clientY - position.y
        });
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      // Reset drag flag after a short delay to prevent click
      setTimeout(() => setHasDragged(false), 100);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    e.preventDefault();
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Keep within viewport bounds
      const maxX = window.innerWidth - 80; // Button width + padding
      const maxY = window.innerHeight - 80; // Button height + padding
      
      const boundedPosition = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      };

      setPosition(boundedPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        savePosition(position);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragStart, position]);

  // Handle touch events for mobile dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    
    // Start touch drag detection
    const startTime = Date.now();
    const startX = touch.clientX;
    const startY = touch.clientY;
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = Math.abs(moveTouch.clientX - startX);
      const deltaY = Math.abs(moveTouch.clientY - startY);
      const deltaTime = Date.now() - startTime;
      
      // If moved more than 3px, start dragging (immediate drag on movement)
      if (deltaX > 3 || deltaY > 3) {
        setIsDragging(true);
        setHasDragged(true);
        setDragStart({
          x: moveTouch.clientX - position.x,
          y: moveTouch.clientY - position.y
        });
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      // Reset drag flag after a short delay to prevent click
      setTimeout(() => setHasDragged(false), 100);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    
    e.preventDefault();
  };

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;

      // Keep within viewport bounds (for touch events)
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      const boundedPosition = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      };

      setPosition(boundedPosition);
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        savePosition(position);
      }
    };

    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, position]);

  if (!hasPermission) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        ref={chatButtonRef}
        className="fixed z-50 group"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      >
        <div className="relative">
          <button
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={(e) => {
              if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              setIsOpen(!isOpen);
            }}
            className={`relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-3 ${
              isDragging ? 'scale-105 rotate-2 cursor-grabbing' : 'cursor-grab'
            }`}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
            
            {/* Unread Badge */}
            {unreadCount > 0 && !isOpen && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
            
            {/* Online Indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div 
          className="fixed z-40 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ 
            left: `${Math.max(0, Math.min(position.x, window.innerWidth - 384))}px`, // 384px = w-96
            top: `${Math.min(position.y + 80, window.innerHeight - 512)}px` // 80px = button height + spacing, 512px = panel height
          }}
        >
          <ChatPanel 
            userId={userId} 
            userRole={userRole}
            onClose={() => setIsOpen(false)}
            onUnreadChange={setUnreadCount}
          />
        </div>
      )}
    </>
  );
}