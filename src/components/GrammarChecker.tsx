'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, AlertTriangle, BookOpen, X } from 'lucide-react';

interface GrammarSuggestion {
  id: string;
  type: 'grammar' | 'style' | 'readability' | 'spacing';
  message: string;
  suggestion: string;
  start: number;
  end: number;
  text: string;
  rule: string;
}

interface GrammarStats {
  words: number;
  sentences: number;
  avgWordsPerSentence: number;
  readabilityScore: number;
}

interface GrammarCheckerProps {
  text: string;
  onTextChange: (newText: string) => void;
  className?: string;
  placeholder?: string;
}

export default function GrammarChecker({ text, onTextChange, className = '', placeholder = 'Start writing...' }: GrammarCheckerProps) {
  const [suggestions, setSuggestions] = useState<GrammarSuggestion[]>([]);
  const [stats, setStats] = useState<GrammarStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [ignoredSuggestions, setIgnoredSuggestions] = useState<Set<string>>(new Set());
  const [hoveredSuggestion, setHoveredSuggestion] = useState<GrammarSuggestion | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const editorRef = useRef<HTMLDivElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  // Debounced grammar checking
  const checkGrammar = useCallback(async (textToCheck: string) => {
    if (!textToCheck.trim()) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('/api/grammar-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token'
        },
        body: JSON.stringify({ text: textToCheck, advanced: true })
      });

      if (!response.ok) {
        throw new Error('Grammar check failed');
      }

      const result = await response.json();
      setSuggestions(result.suggestions || []);
      setStats(result.stats || null);
    } catch (error) {
      console.error('Grammar check error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-check grammar when text changes (debounced)
  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }
    
    checkTimeoutRef.current = setTimeout(() => {
      checkGrammar(text);
    }, 1000); // Check 1 second after user stops typing

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [text, checkGrammar]);

  const applySuggestion = (suggestion: GrammarSuggestion) => {
    let newText = text;
    
    // Apply specific fixes based on rule type
    switch (suggestion.rule) {
      case 'double-space':
        newText = text.replace(/  +/g, ' ');
        break;
      case 'repeated-words':
        const beforeText = text.substring(0, suggestion.start);
        const afterText = text.substring(suggestion.end);
        const fixedText = suggestion.text.replace(/\b(\w+)\s+\1\b/gi, '$1');
        newText = beforeText + fixedText + afterText;
        break;
      default:
        // For other suggestions, just highlight - user needs to manually fix
        return;
    }
    
    onTextChange(newText);
    setHoveredSuggestion(null);
  };

  const ignoreSuggestion = (suggestionId: string) => {
    setIgnoredSuggestions(prev => new Set([...prev, suggestionId]));
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
    setHoveredSuggestion(null);
  };

  // Render text with grammar highlights
  const renderHighlightedText = () => {
    const activeSuggestions = suggestions.filter(s => !ignoredSuggestions.has(s.id));
    if (activeSuggestions.length === 0) {
      return <span className="text-transparent">{text}</span>;
    }

    // Sort suggestions by start position
    const sortedSuggestions = [...activeSuggestions].sort((a, b) => a.start - b.start);
    
    const parts = [];
    let lastIndex = 0;

    sortedSuggestions.forEach((suggestion, index) => {
      // Add text before this suggestion
      if (suggestion.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`} className="text-transparent">
            {text.substring(lastIndex, suggestion.start)}
          </span>
        );
      }

      // Add highlighted suggestion
      const underlineColor = getUnderlineColor(suggestion.type);
      parts.push(
        <span
          key={suggestion.id}
          className={`relative cursor-pointer text-transparent ${underlineColor}`}
          onMouseEnter={(e) => {
            setHoveredSuggestion(suggestion);
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltipPosition({
              x: rect.left + rect.width / 2,
              y: rect.bottom + 5
            });
          }}
          onMouseLeave={() => setHoveredSuggestion(null)}
        >
          {suggestion.text}
        </span>
      );

      lastIndex = suggestion.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key="text-end" className="text-transparent">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  const getUnderlineColor = (type: string) => {
    switch (type) {
      case 'grammar': return 'border-b-2 border-red-500 border-dotted';
      case 'style': return 'border-b-2 border-blue-500 border-dotted';
      case 'readability': return 'border-b-2 border-yellow-500 border-dotted';
      case 'spacing': return 'border-b-2 border-orange-500 border-dotted';
      default: return 'border-b-2 border-gray-500 border-dotted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grammar': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'style': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'readability': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'spacing': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grammar': return 'border-red-200 bg-red-50';
      case 'style': return 'border-blue-200 bg-blue-50';
      case 'readability': return 'border-green-200 bg-green-50';
      case 'spacing': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const activeSuggestions = suggestions.filter(s => !ignoredSuggestions.has(s.id));

  return (
    <div className={`relative ${className}`}>
      {/* Simple Editor with Grammar Highlights */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
        />
        
        {/* Grammar Highlights Overlay (when text exists) */}
        {text && suggestions.length > 0 && (
          <div 
            className="absolute inset-0 p-4 pointer-events-none text-sm leading-relaxed whitespace-pre-wrap break-words overflow-hidden bg-transparent"
            style={{ zIndex: 1 }}
          >
            {renderHighlightedText()}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          {stats && (
            <>
              <span>{stats.words} words</span>
              <span>{stats.sentences} sentences</span>
              <span>Readability: {stats.readabilityScore}%</span>
            </>
          )}
          {loading && (
            <span className="flex items-center">
              <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin mr-1"></div>
              Checking grammar...
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeSuggestions.length > 0 && (
            <span className="text-orange-600">
              {activeSuggestions.length} suggestion{activeSuggestions.length !== 1 ? 's' : ''}
            </span>
          )}
          <span className="text-green-600">Grammar checking enabled</span>
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredSuggestion && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex items-start space-x-3">
            {getTypeIcon(hoveredSuggestion.type)}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  {hoveredSuggestion.message}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(hoveredSuggestion.type)}`}>
                  {hoveredSuggestion.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {hoveredSuggestion.suggestion}
              </p>
              
              <div className="text-xs text-gray-500 mb-3">
                "<span className="font-mono bg-gray-100 px-1 rounded">{hoveredSuggestion.text}</span>"
              </div>
              
              <div className="flex space-x-2">
                {['double-space', 'repeated-words'].includes(hoveredSuggestion.rule) && (
                  <button
                    onClick={() => applySuggestion(hoveredSuggestion)}
                    className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Apply Fix
                  </button>
                )}
                <button
                  onClick={() => ignoreSuggestion(hoveredSuggestion.id)}
                  className="text-xs px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}