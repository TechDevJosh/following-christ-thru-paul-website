import AuthGuard from '../components/AuthGuard';
import Link from 'next/link';
import { FileText, BookOpen, Download, HelpCircle } from 'lucide-react';

export default function StudioDashboard() {
  const cards = [
    {
      title: 'Verse by Verse',
      subtitle: 'Sermon content',
      href: '/studio/verse-by-verse',
      icon: FileText,
      badge: 'V',
      color: '#2EA3F2'
    },
    {
      title: 'Topics',
      subtitle: 'Topic content',
      href: '/studio/topics',
      icon: BookOpen,
      badge: 'T',
      color: '#33D17A'
    },
    {
      title: 'Resources',
      subtitle: 'Downloadable content',
      href: '/studio/resources',
      icon: Download,
      badge: 'R',
      color: '#FF6B6B'
    },
    {
      title: 'Q&A',
      subtitle: 'Questions & answers',
      href: '/studio/ask',
      icon: HelpCircle,
      badge: 'Q',
      color: '#FFD93D'
    }
  ];

  return (
    <AuthGuard>
      <div className="flex-1 bg-[#111] overflow-hidden font-inter">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-white font-semibold text-2xl mb-2">Content Studio</h1>
            <p className="text-[#AAA] text-sm">Manage your website content</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 p-6 transition-all duration-150 group"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.badge}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-semibold text-base group-hover:text-gray-700 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{card.subtitle}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}