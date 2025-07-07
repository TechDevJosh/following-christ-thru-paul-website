'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import ChatWidget from '../../../components/ChatWidget';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'writer';
}

export default function AuthGuard({ children, requiredRole = 'writer' }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userProfile, setUserProfile] = useState<{ role: string; id: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/studio/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile) {
        router.push('/studio/unauthorized');
        return;
      }

      const hasAccess = requiredRole === 'admin' 
        ? profile.role === 'admin'
        : ['admin', 'writer'].includes(profile.role);

      if (!hasAccess) {
        router.push('/studio/unauthorized');
        return;
      }

      setUserProfile({ role: profile.role, id: session.user.id });
      setAuthorized(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/studio/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authorized || !userProfile) {
    return null;
  }

  return (
    <>
      {children}
      <ChatWidget userRole={userProfile.role} userId={userProfile.id} />
    </>
  );
}