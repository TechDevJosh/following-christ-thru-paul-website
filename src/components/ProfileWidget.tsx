'use client';

import Image from 'next/image';
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

export function ProfileWidget() {
  const { profile, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const displayName = profile.display_name || profile.email.split('@')[0];
  const avatarUrl = profile.profile_url || '/default-avatar.png';

  return (
    <button
      onClick={() => router.push('/studio/profile')}
      className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
      title="View profile"
    >
      {profile.profile_url ? (
        <Image
          src={avatarUrl}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
      )}
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-gray-900">{displayName}</span>
        <span className="text-xs text-gray-500 capitalize">{profile.role}</span>
      </div>
    </button>
  );
}