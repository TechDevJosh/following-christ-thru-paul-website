'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import MessageItem from './MessageItem';

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  sent_at: string;
  profiles: {
    email: string;
    role: string;
  };
}

interface Conversation {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
}

interface ChatPanelProps {
  userId: string;
  userRole: string;
  onClose: () => void;
  onUnreadChange?: (count: number) => void;
}

export default function ChatPanel({ userId, userRole, onClose, onUnreadChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversation();
  }, []);

  const loadConversation = async () => {
    try {
      console.log('Loading conversation for user:', userId);
      
      // Get the default conversation (Editorial Chat)
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('title', 'Editorial Chat')
        .limit(1);

      if (convError) {
        console.error('Error fetching conversations:', convError);
        throw convError;
      }

      console.log('Found conversations:', conversations);
      let currentConversation = conversations?.[0];

      // If no conversation exists, create one
      if (!currentConversation) {
        console.log('No conversation found, creating new one...');
        const { data: newConv, error: createError } = await supabase
          .from('conversations')
          .insert([{ title: 'Editorial Chat', created_by: userId }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating conversation:', createError);
          throw createError;
        }
        console.log('Created new conversation:', newConv);
        currentConversation = newConv;
      }

      setConversation(currentConversation);

      // Load messages for this conversation
      await loadMessages(currentConversation.id);

      // Subscribe to new messages
      subscribeToMessages(currentConversation.id);
    } catch (error) {
      console.error('Error loading conversation:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Show more specific error message
      let errorMessage = 'Unable to load chat. ';
      if (error.code === '42P01') {
        errorMessage += 'Database tables missing. Please contact admin.';
      } else if (error.code === '42501') {
        errorMessage += 'Permission denied. Check your user role.';
      } else if (error.message?.includes('auth')) {
        errorMessage += 'Authentication issue. Please log in again.';
      } else {
        errorMessage += 'Please check your connection and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      console.log('Loading messages for conversation:', conversationId);
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:sender_id (
            email,
            role,
            display_name,
            profile_url
          )
        `)
        .eq('conversation_id', conversationId)
        .order('sent_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        throw error;
      }
      console.log('Loaded messages:', data);
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const subscribeToMessages = (conversationId: string) => {
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // Fetch the complete message with profile data
          const { data: newMessage, error } = await supabase
            .from('messages')
            .select(`
              *,
              profiles:sender_id (
                email,
                role,
                display_name,
                profile_url
              )
            `)
            .eq('id', payload.new.id)
            .single();

          if (!error && newMessage) {
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !conversation) return;

    try {
      console.log('Sending message:', {
        conversation_id: conversation.id,
        sender_id: userId,
        body: newMessage.trim()
      });

      const { data, error } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversation.id,
          sender_id: userId,
          body: newMessage.trim()
        }])
        .select();

      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }
      
      console.log('Message sent successfully:', data);
      setNewMessage('');
      
      // Reload messages to see the new one
      await loadMessages(conversation.id);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {conversation?.title || 'Editorial Chat'}
            </h3>
            <p className="text-xs text-white/80">
              {onlineUsers.length > 0 ? `${onlineUsers.length} online` : 'Team chat'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Welcome to Editorial Chat!</h4>
            <p className="text-sm text-gray-500 max-w-xs">
              Start collaborating with your team. Share ideas, discuss content, and stay connected.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={message.sender_id === userId}
                showAvatar={index === 0 || messages[index - 1]?.sender_id !== message.sender_id}
                showTimestamp={
                  index === messages.length - 1 ||
                  new Date(messages[index + 1]?.sent_at).getTime() - new Date(message.sent_at).getTime() > 300000
                }
              />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Someone is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={sendMessage} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm placeholder-gray-500"
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              {newMessage.length}/500
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>Press Enter to send</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Online</span>
          </span>
        </div>
      </div>
    </div>
  );
}