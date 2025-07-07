'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  BookOpen, 
  Download, 
  HelpCircle 
} from 'lucide-react';

interface SidebarProps {
  onCreateNew: (type: string) => void;
  onSelectItem: (type: string, id?: string) => void;
  selectedItem?: string;
  onSearch?: (query: string) => void;
}

export default function StudioSidebar({ onCreateNew, onSelectItem, selectedItem, onSearch }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    'verse-by-verse': true,
    topics: true,
    resources: true,
    ask: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const sections = [
    {
      id: 'verse-by-verse',
      title: 'Verse by Verse',
      icon: FileText,
    },
    {
      id: 'topics',
      title: 'Topics',
      icon: BookOpen,
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: Download,
    },
    {
      id: 'ask',
      title: 'Q&A',
      icon: HelpCircle,
    }
  ];

  return (
    <div className="w-64 bg-[#1A1A1A] border-r border-gray-600 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <h1 className="text-white font-semibold text-lg">Following Christ Thru Paul</h1>
        <p className="text-[#AAA] text-sm">Content Studio</p>
      </div>

      {/* Create Button */}
      <div className="p-4">
        <button
          onClick={() => onCreateNew('general')}
          className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AAA]" size={16} />
          <input
            type="text"
            placeholder="Search list"
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded pl-10 pr-3 py-2 text-sm placeholder-[#AAA] focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-2">
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id as keyof typeof expandedSections];
            const isActive = selectedItem?.startsWith(section.id);

            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center w-full px-3 py-2 text-sm text-[#AAA] hover:text-white hover:bg-gray-700 rounded transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="mr-2" />
                  ) : (
                    <ChevronRight size={16} className="mr-2" />
                  )}
                  <Icon size={16} className="mr-2" />
                  <span>{section.title}</span>
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    <button
                      onClick={() => onSelectItem(section.id)}
                      className={`block w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                        selectedItem === section.id
                          ? 'bg-blue-600 text-white border-l-4 border-blue-500'
                          : 'text-[#AAA] hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      All {section.title}
                    </button>
                    <button
                      onClick={() => onSelectItem(section.id, 'new')}
                      className={`block w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                        selectedItem === `${section.id}/new`
                          ? 'bg-blue-600 text-white border-l-4 border-blue-500'
                          : 'text-[#AAA] hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      Create New
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}