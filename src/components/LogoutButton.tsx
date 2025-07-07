'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/studio/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
      title="Sign out"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
}