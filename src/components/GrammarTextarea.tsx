'use client';

import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

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

interface GrammarTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function GrammarTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = ''
}: GrammarTextareaProps) {
  const [suggestions, setSuggestions] = useState<GrammarSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  // Simple client-side grammar checking
  const checkGrammar = (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: GrammarSuggestion[] = [];
    let suggestionId = 0;

    // Check for repeated words
    const repeatedWordsRegex = /\b(\w+)\s+\1\b/gi;
    let match;
    while ((match = repeatedWordsRegex.exec(text)) !== null) {
      newSuggestions.push({
        id: `repeated-${suggestionId++}`,
        type: 'grammar',
        message: 'Repeated word found',
        suggestion: 'Remove the duplicate word',
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        rule: 'repeated-words'
      });
    }

    // Check for double spaces
    const doubleSpaceRegex = /  +/g;
    while ((match = doubleSpaceRegex.exec(text)) !== null) {
      newSuggestions.push({
        id: `space-${suggestionId++}`,
        type: 'spacing',
        message: 'Multiple spaces found',
        suggestion: 'Use single spaces between words',
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        rule: 'double-space'
      });
    }

    // Check for passive voice
    const passiveVoiceRegex = /\b(was|were|is|are|been|being)\s+\w+ed\b/gi;
    while ((match = passiveVoiceRegex.exec(text)) !== null) {
      newSuggestions.push({
        id: `passive-${suggestionId++}`,
        type: 'style',
        message: 'Possible passive voice',
        suggestion: 'Consider using active voice for clarity',
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        rule: 'passive-voice'
      });
    }

    setSuggestions(newSuggestions);
    if (newSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Debounced grammar checking
  useEffect(() => {
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }
    
    checkTimeoutRef.current = setTimeout(() => {
      checkGrammar(value);
    }, 1500);

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [value]);

  const applySuggestion = (suggestion: GrammarSuggestion) => {
    let newText = value;
    
    switch (suggestion.rule) {
      case 'double-space':
        newText = value.replace(/  +/g, ' ');
        break;
      case 'repeated-words':
        const beforeText = value.substring(0, suggestion.start);
        const afterText = value.substring(suggestion.end);
        const fixedText = suggestion.text.replace(/\b(\w+)\s+\1\b/gi, '$1');
        newText = beforeText + fixedText + afterText;
        break;
    }
    
    onChange(newText);
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const ignoreSuggestion = (suggestionId: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none ${className}`}
      />
      
      {/* Grammar Status */}
      <div className="absolute top-1 right-1 flex items-center space-x-1">
        {loading && (
          <div className="text-xs text-blue-400 bg-gray-800 px-2 py-1 rounded flex items-center">
            <div className="w-2 h-2 border border-blue-400 border-t-transparent rounded-full animate-spin mr-1"></div>
            Checking...
          </div>
        )}
        
        {suggestions.length > 0 && !loading && (
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-xs text-orange-400 bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 flex items-center"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
          </button>
        )}
        
        {suggestions.length === 0 && !loading && value.trim() && (
          <div className="text-xs text-green-400 bg-gray-800 px-2 py-1 rounded flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Good
          </div>
        )}
      </div>

      {/* Suggestions Panel */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          <div className="p-3 border-b border-gray-600">
            <h4 className="text-sm font-medium text-white flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-orange-400" />
              Grammar Suggestions ({suggestions.length})
            </h4>
          </div>
          
          <div className="p-3 space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-gray-700 rounded p-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white mb-1">
                      {suggestion.message}
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      {suggestion.suggestion}
                    </div>
                    <div className="text-xs text-gray-400 mb-3">
                      Found: "<span className="font-mono bg-gray-600 px-1 rounded">{suggestion.text}</span>"
                    </div>
                    <div className="flex space-x-2">
                      {['double-space', 'repeated-words'].includes(suggestion.rule) && (
                        <button
                          onClick={() => applySuggestion(suggestion)}
                          className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Apply Fix
                        </button>
                      )}
                      <button
                        onClick={() => ignoreSuggestion(suggestion.id)}
                        className="text-xs px-2 py-1 bg-gray-600 text-gray-300 rounded hover:bg-gray-500"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}