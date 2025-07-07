'use client';

import { FileText, BookOpen, Download, HelpCircle } from 'lucide-react';

interface DashboardOverviewProps {
  onSelectSection: (section: string) => void;
}

export default function DashboardOverview({ onSelectSection }: DashboardOverviewProps) {
  const contentTypes = [
    {
      key: 'verse-by-verse',
      label: 'Verse by Verse',
      description: 'Manage sermons',
      icon: FileText,
      color: 'bg-blue-600'
    },
    {
      key: 'topics',
      label: 'Topics',
      description: 'Manage topics',
      icon: BookOpen,
      color: 'bg-green-600'
    },
    {
      key: 'resources',
      label: 'Resources',
      description: 'Manage resources',
      icon: Download,
      color: 'bg-purple-600'
    },
    {
      key: 'ask',
      label: 'Q&A',
      description: 'Manage Q&A',
      icon: HelpCircle,
      color: 'bg-orange-600'
    }
  ];

  return (
    <div className="w-full bg-[#222] overflow-hidden">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Content Studio</h1>
          <p className="text-gray-400">Manage your website content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.key}
                onClick={() => onSelectSection(type.key)}
                className="h-24 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-lg p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer group"
              >
                <div className="flex items-center gap-4 h-full">
                  <div className={`w-10 h-10 ${type.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="text-white" size={20} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {type.label}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}