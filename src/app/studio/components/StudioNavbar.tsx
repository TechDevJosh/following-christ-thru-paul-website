'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileWidget } from '../../../components/ProfileWidget';
import { LogoutButton } from '../../../components/LogoutButton';
import { useUser } from '../../../hooks/useUser';

const navigation = [
  { name: 'Dashboard', href: '/studio/dashboard' },
  { name: 'Verse by Verse', href: '/studio/verse-by-verse' },
  { name: 'Topics', href: '/studio/topics' },
  { name: 'Resources', href: '/studio/resources' },
  { name: 'Q&A', href: '/studio/ask' },
];

export default function StudioNavbar() {
  const pathname = usePathname();
  const { loading } = useUser();

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-300 h-6 w-32 rounded"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-300 h-8 w-24 rounded"></div>
              <div className="animate-pulse bg-gray-300 h-8 w-16 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/studio/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">CMS Studio</h1>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Profile and Logout */}
          <div className="flex items-center space-x-4">
            <ProfileWidget />
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium transition-colors ${
                pathname === item.href
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}