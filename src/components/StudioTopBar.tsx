'use client';

import { useState } from 'react';
import { 
  Eye, 
  MessageCircle, 
  Settings
} from 'lucide-react';

interface TopBarProps {
  isDraft?: boolean;
  onPublishToggle?: (published: boolean) => void;
  showPublishButton?: boolean;
  showPreview?: boolean;
  onPreview?: () => void;
}

export default function StudioTopBar({ 
  isDraft = false, 
  onPublishToggle,
  showPublishButton = false,
  showPreview = false,
  onPreview
}: TopBarProps) {
  const [isPublished, setIsPublished] = useState(!isDraft);

  const handlePublishToggle = () => {
    const newState = !isPublished;
    setIsPublished(newState);
    onPublishToggle?.(newState);
  };

  return (
    <div className="h-12 bg-[#222] border-b border-gray-600 flex items-center justify-between px-4">
      {/* Left side - Structure label and status */}
      <div className="flex items-center space-x-4">
        <span className="text-white text-sm font-medium">Structure</span>
        
        {/* Draft/Published Toggle */}
        {showPublishButton && (
          <button
            onClick={handlePublishToggle}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isPublished
                ? 'bg-green-600 text-white'
                : 'bg-gray-600 text-white'
            }`}
          >
            {isPublished ? 'Published' : 'Draft'}
          </button>
        )}
      </div>

      {/* Right side - Icon buttons */}
      <div className="flex items-center space-x-2">
        {showPreview && (
          <button 
            onClick={onPreview}
            className="p-2 text-white hover:text-blue-400 transition-colors"
            title="Preview"
          >
            <Eye size={20} />
          </button>
        )}
        
        <button className="p-2 text-white hover:text-blue-400 transition-colors" title="Media">
          <MessageCircle size={20} />
        </button>
        
        <button className="p-2 text-white hover:text-blue-400 transition-colors" title="Settings">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}