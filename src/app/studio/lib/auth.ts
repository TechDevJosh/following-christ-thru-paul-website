import { supabase } from '../../../../lib/supabase';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/studio/login');
  }

  // Check user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!profile || !['admin', 'writer'].includes(profile.role)) {
    redirect('/studio/unauthorized');
  }

  return { session, profile };
}

export async function requireAdminAuth() {
  const { session, profile } = await requireAuth();
  
  if (profile.role !== 'admin') {
    redirect('/studio/unauthorized');
  }

  return { session, profile };
}