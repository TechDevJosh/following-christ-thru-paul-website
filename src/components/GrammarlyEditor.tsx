'use client';

import { useState } from 'react';
import GrammarChecker from './GrammarChecker';
import { Save, Eye, FileText } from 'lucide-react';

interface GrammarlyEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  onPreview?: () => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  className?: string;
}

export default function GrammarlyEditor({ 
  initialContent = '', 
  onSave, 
  onPreview,
  placeholder = 'Start writing your content...',
  title = '',
  onTitleChange,
  className = ''
}: GrammarlyEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;
    
    setSaving(true);
    try {
      await onSave(content);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-4">
          <FileText className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Content Editor</h2>
            <p className="text-sm text-gray-500">Grammar checking enabled</p>
          </div>
          {onTitleChange && (
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter title..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onPreview && (
            <button
              onClick={onPreview}
              className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </button>
          )}
          
          {onSave && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4 mr-1" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          )}
        </div>
      </div>

      {/* Grammar-enabled Editor */}
      <div className="flex-1 p-4">
        <GrammarChecker 
          text={content}
          onTextChange={setContent}
          placeholder={placeholder}
          className="h-full"
        />
      </div>
    </div>
  );
}