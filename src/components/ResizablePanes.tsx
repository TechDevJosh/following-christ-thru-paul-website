'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface ResizablePanesProps {
  leftPane: React.ReactNode;
  centerPane: React.ReactNode;
  rightPane?: React.ReactNode;
  defaultLeftWidth?: number;
  defaultCenterWidth?: number;
  minPaneWidth?: number;
}

export default function ResizablePanes({
  leftPane,
  centerPane,
  rightPane,
  defaultLeftWidth = 256,
  defaultCenterWidth = 400,
  minPaneWidth = 200
}: ResizablePanesProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [centerWidth, setCenterWidth] = useState(defaultCenterWidth);
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((divider: 'left' | 'right') => {
    setIsDragging(divider);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;

    if (isDragging === 'left') {
      const newLeftWidth = Math.max(minPaneWidth, Math.min(mouseX, containerWidth - minPaneWidth * 2));
      setLeftWidth(newLeftWidth);
    } else if (isDragging === 'right' && rightPane) {
      const newCenterWidth = Math.max(minPaneWidth, Math.min(mouseX - leftWidth, containerWidth - leftWidth - minPaneWidth));
      setCenterWidth(newCenterWidth);
    }
  }, [isDragging, leftWidth, minPaneWidth, rightPane]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="flex h-full overflow-hidden">
      {/* Left Pane */}
      <div style={{ width: leftWidth }} className="flex-shrink-0 overflow-hidden">
        {leftPane}
      </div>

      {/* Left Divider */}
      <div
        className={`w-1 bg-[#333] hover:bg-[#2EA3F2] cursor-col-resize transition-colors ${
          isDragging === 'left' ? 'bg-[#2EA3F2]' : ''
        }`}
        onMouseDown={() => handleMouseDown('left')}
      />

      {/* Center Pane */}
      <div 
        style={{ width: rightPane ? centerWidth : 'auto' }} 
        className={`${rightPane ? 'flex-shrink-0' : 'flex-1'} overflow-hidden`}
      >
        {centerPane}
      </div>

      {/* Right Divider & Pane */}
      {rightPane && (
        <>
          <div
            className={`w-1 bg-[#333] hover:bg-[#2EA3F2] cursor-col-resize transition-colors ${
              isDragging === 'right' ? 'bg-[#2EA3F2]' : ''
            }`}
            onMouseDown={() => handleMouseDown('right')}
          />
          <div className="flex-1 overflow-hidden">
            {rightPane}
          </div>
        </>
      )}
    </div>
  );
}