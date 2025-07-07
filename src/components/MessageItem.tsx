'use client';

import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { User } from 'lucide-react';

interface MessageItemProps {
  message: {
    id: string;
    body: string;
    sent_at: string;
    profiles: {
      email: string;
      role: string;
      display_name: string | null;
      profile_url: string | null;
    };
  };
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
}

export default function MessageItem({ message, isOwn, showAvatar = true, showTimestamp = true }: MessageItemProps) {
  const displayName = message.profiles.display_name || message.profiles.email.split('@')[0];
  const roleColor = message.profiles.role === 'admin' ? 'text-red-500' : 'text-blue-500';
  const messageTime = new Date(message.sent_at);
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} items-end space-x-2 group`}>
      {/* Avatar for others */}
      {!isOwn && (
        <div className="flex-shrink-0 mb-1">
          {showAvatar ? (
            message.profiles.profile_url ? (
              <Image
                src={message.profiles.profile_url}
                alt={displayName}
                width={32}
                height={32}
                className="rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
            )
          ) : (
            <div className="w-8 h-8"></div>
          )}
        </div>
      )}
      
      {/* Message Content */}
      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-xs lg:max-w-sm`}>
        {/* Sender name for others */}
        {!isOwn && showAvatar && (
          <div className="flex items-center space-x-2 mb-1 px-1">
            <span className={`text-xs font-semibold ${roleColor}`}>
              {displayName}
            </span>
            <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
              {message.profiles.role}
            </span>
          </div>
        )}
        
        {/* Message Bubble */}
        <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm ${
          isOwn 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md' 
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.body}
          </p>
          
          {/* Message tail */}
          <div className={`absolute bottom-0 ${
            isOwn 
              ? '-right-1 border-l-8 border-l-purple-600 border-t-8 border-t-transparent' 
              : '-left-1 border-r-8 border-r-white border-t-8 border-t-transparent'
          }`}></div>
        </div>
        
        {/* Timestamp */}
        {showTimestamp && (
          <div className={`flex items-center space-x-2 mt-1 px-1 ${
            isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'
          }`}>
            <span className="text-xs text-gray-400">
              {messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {isOwn && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Avatar for own messages */}
      {isOwn && (
        <div className="flex-shrink-0 mb-1">
          {showAvatar ? (
            message.profiles.profile_url ? (
              <Image
                src={message.profiles.profile_url}
                alt={displayName}
                width={32}
                height={32}
                className="rounded-full object-cover ring-2 ring-white shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
            )
          ) : (
            <div className="w-8 h-8"></div>
          )}
        </div>
      )}
    </div>
  );
}