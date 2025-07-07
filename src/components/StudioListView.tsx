'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  published?: boolean;
  publishedAt?: string;
  slug?: string;
}

interface StudioListViewProps {
  title: string;
  items: ListItem[];
  onCreateNew: () => void;
  onSelectItem: (id: string) => void;
  selectedItemId?: string;
  loading?: boolean;
}

export default function StudioListView({ 
  title, 
  items, 
  onCreateNew,
  onSelectItem,
  selectedItemId,
  loading = false 
}: StudioListViewProps) {
  if (loading) {
    return (
      <div className="flex-1 bg-gray-800 overflow-hidden">
        <div className="p-4">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-4 h-20 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#222] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-gray-400 text-sm mt-1">{items.length} items</p>
          </div>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm font-medium transition-colors"
          >
            Add New
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[calc(100vh-120px)]">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-400 mb-2">No items yet</h3>
            <p className="text-gray-500 mb-6">Create your first {title.toLowerCase()} to get started</p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              <span>Create {title.slice(0, -1)}</span>
            </button>
          </div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className={`block w-full text-left bg-gray-700 border border-gray-600 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer ${
                selectedItemId === item.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-sm text-gray-400 mt-1 truncate">{item.subtitle}</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    {item.slug && (
                      <span>/{item.slug}</span>
                    )}
                    {item.publishedAt && (
                      <span>
                        Published {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}