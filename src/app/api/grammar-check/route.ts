import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// Simple grammar and style checker using built-in rules
// This replaces Harper with a custom implementation
class GrammarChecker {
  private rules = [
    // Common grammar issues
    {
      id: 'double-space',
      pattern: /  +/g,
      message: 'Multiple spaces found',
      suggestion: 'Use single spaces between words',
      type: 'spacing'
    },
    {
      id: 'passive-voice',
      pattern: /\b(was|were|is|are|been|being)\s+\w+ed\b/gi,
      message: 'Possible passive voice',
      suggestion: 'Consider using active voice for clarity',
      type: 'style'
    },
    {
      id: 'redundant-words',
      pattern: /\b(very|really|quite|rather|somewhat|pretty)\s+/gi,
      message: 'Redundant modifier',
      suggestion: 'Consider removing or using a stronger word',
      type: 'style'
    },
    {
      id: 'sentence-length',
      pattern: /[.!?]\s*[A-Z][^.!?]{100,}/g,
      message: 'Long sentence detected',
      suggestion: 'Consider breaking into shorter sentences',
      type: 'readability'
    },
    {
      id: 'repeated-words',
      pattern: /\b(\w+)\s+\1\b/gi,
      message: 'Repeated word',
      suggestion: 'Remove duplicate word',
      type: 'grammar'
    },
    {
      id: 'comma-splice',
      pattern: /\w+,\s*[a-z]/g,
      message: 'Possible comma splice',
      suggestion: 'Consider using a semicolon or period',
      type: 'grammar'
    }
  ];

  check(text: string) {
    const suggestions = [];
    let suggestionId = 0;

    for (const rule of this.rules) {
      let match;
      while ((match = rule.pattern.exec(text)) !== null) {
        suggestions.push({
          id: `${rule.id}-${suggestionId++}`,
          type: rule.type,
          message: rule.message,
          suggestion: rule.suggestion,
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
          rule: rule.id
        });
      }
      // Reset regex lastIndex
      rule.pattern.lastIndex = 0;
    }

    return suggestions.sort((a, b) => a.start - b.start);
  }

  async checkAdvanced(text: string) {
    // Additional checks that could integrate with external APIs
    const basicSuggestions = this.check(text);
    
    // Word count and readability
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    if (avgWordsPerSentence > 20) {
      basicSuggestions.push({
        id: 'readability-score',
        type: 'readability',
        message: 'High average sentence length',
        suggestion: 'Consider shorter sentences for better readability',
        start: 0,
        end: text.length,
        text: text,
        rule: 'readability'
      });
    }

    return {
      suggestions: basicSuggestions,
      stats: {
        words,
        sentences,
        avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
        readabilityScore: this.calculateReadabilityScore(words, sentences)
      }
    };
  }

  private calculateReadabilityScore(words: number, sentences: number): number {
    // Simple readability score (higher is better)
    const avgWordsPerSentence = words / sentences;
    if (avgWordsPerSentence < 15) return 90;
    if (avgWordsPerSentence < 20) return 70;
    if (avgWordsPerSentence < 25) return 50;
    return 30;
  }
}

const grammarChecker = new GrammarChecker();

export async function POST(request: Request) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, advanced = false } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid text provided' }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: 'Text too long (max 10,000 characters)' }, { status: 400 });
    }

    // Perform grammar and style analysis
    const result = advanced 
      ? await grammarChecker.checkAdvanced(text)
      : { suggestions: grammarChecker.check(text) };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Grammar check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}