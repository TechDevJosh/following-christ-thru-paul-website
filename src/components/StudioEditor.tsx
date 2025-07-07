'use client';

import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import SEOValidator from './SEOValidator';
import InternalLinkAnalyzer from './InternalLinkAnalyzer';
import HeadingStructureValidator from './HeadingStructureValidator';
// import SimpleGrammarChecker from './SimpleGrammarChecker';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'select' | 'checkbox' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
}

interface StudioEditorProps {
  title: string;
  fields: Field[];
  data: Record<string, any>;
  onChange: (field: string, value: any) => void;
  onSave: () => void;
  onDelete?: () => void;
  saving?: boolean;
  isDraft?: boolean;
  documentId?: string;
  schemaName?: string;
}

export default function StudioEditor({
  title,
  fields,
  data,
  onChange,
  onSave,
  onDelete,
  saving = false,
  isDraft = false,
  documentId,
  schemaName
}: StudioEditorProps) {
  const [showFieldActions, setShowFieldActions] = useState<string | null>(null);

  const renderField = (field: Field) => {
    const value = data[field.name] || '';

    switch (field.type) {
      case 'textarea':
        // Use grammar checker for content fields
        if (field.name === 'content' || field.name === 'description' || 
            field.name === 'question' || field.name === 'answer' || 
            field.name === 'short_answer' || field.name === 'detailed_answer') {
          return (
            <div className="space-y-2">
              <textarea
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                placeholder={field.placeholder || `Start writing...`}
                rows={field.rows || 8}
                className="min-h-[200px] bg-[#222] border border-[#333] rounded p-3 w-full text-white placeholder-[#555] focus:outline-none focus:border-[#2EA3F2] transition-colors resize-none"
              />
            </div>
          );
        }
        
        // Regular textarea for other fields
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="bg-[#222] border border-[#333] rounded p-2 w-full text-white placeholder-[#555] focus:outline-none focus:border-[#2EA3F2] transition-colors resize-none"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="bg-[#222] border border-[#333] rounded p-2 w-full text-white focus:outline-none focus:border-[#2EA3F2] transition-colors"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="w-4 h-4 text-[#2EA3F2] bg-[#222] border-[#333] rounded focus:ring-[#2EA3F2] focus:ring-2"
            />
            <span className="text-white">{field.label}</span>
          </label>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(field.name, parseInt(e.target.value) || 0)}
            placeholder={field.placeholder}
            className="bg-[#222] border border-[#333] rounded p-2 w-full text-white placeholder-[#555] focus:outline-none focus:border-[#2EA3F2] transition-colors"
          />
        );
      
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="bg-[#222] border border-[#333] rounded p-2 w-full text-white placeholder-[#555] focus:outline-none focus:border-[#2EA3F2] transition-colors"
          />
        );
    }
  };

  return (
    <div className="w-full bg-[#1A1A1A] border-l border-[#333] flex flex-col h-screen font-inter">
      {/* Header */}
      <div className="p-4 border-b border-[#333]">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">{title}</h2>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDraft ? 'bg-[#555] text-[#AAA]' : 'bg-[#33D17A] text-white'
            }`}>
              {isDraft ? 'Draft' : 'Published'}
            </div>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[calc(100vh-200px)]">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-[#AAA] uppercase tracking-wide">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              
              <button
                onClick={() => setShowFieldActions(showFieldActions === field.name ? null : field.name)}
                className="p-1 text-[#555] hover:text-[#AAA] rounded transition-colors"
              >
                <MoreHorizontal size={12} />
              </button>
            </div>

            {field.type !== 'checkbox' && renderField(field)}
            {field.type === 'checkbox' && (
              <div className="pt-1">
                {renderField(field)}
              </div>
            )}

            {showFieldActions === field.name && (
              <div className="bg-[#222] border border-[#333] rounded p-2 text-xs">
                <div className="text-[#AAA] mb-2">Field actions</div>
                <button className="block w-full text-left px-2 py-1 text-[#AAA] hover:text-white hover:bg-[#333] rounded transition-colors">
                  Clear field
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SEO Analysis */}
      <div className="px-4 space-y-4">
        <SEOValidator
          title={data.title}
          description={data.description}
          content={data.content}
          seoTitle={data.seo_title}
          seoDescription={data.seo_description}
        />
        
        {data.content && (
          <>
            <InternalLinkAnalyzer
              content={data.content}
              currentUrl={`/${schemaName}/${data.slug}`}
            />
            <HeadingStructureValidator content={data.content} />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-[#333] flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-[#2EA3F2] hover:bg-[#2EA3F2]/90 text-white rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}