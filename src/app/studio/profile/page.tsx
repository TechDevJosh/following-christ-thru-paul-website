'use client';

import { useState, useEffect } from 'react';
import { useUser } from '../../../hooks/useUser';
import { supabase } from '../../../../lib/supabase';
import { User, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setFormData({
        display_name: data.display_name || '',
        email: data.email || '',
        role: data.role || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: formData.display_name,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile(prev => ({ ...prev, ...formData }));
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className=\"flex-1 bg-[#222] flex items-center justify-center\">
        <div className=\"animate-spin rounded-full h-8 w-8 border-b-2 border-[#2EA3F2]\"></div>
      </div>
    );
  }

  return (
    <div className=\"flex-1 bg-[#222] overflow-y-auto\">
      <div className=\"max-w-2xl mx-auto p-6\">
        <div className=\"mb-8\">
          <h1 className=\"text-2xl font-semibold text-white mb-2\">Profile Settings</h1>
          <p className=\"text-[#AAA]\">Manage your account information</p>
        </div>

        <div className=\"bg-[#1A1A1A] rounded-lg border border-[#333] p-6\">
          <div className=\"flex items-center space-x-4 mb-6\">
            <div className=\"w-16 h-16 bg-[#2EA3F2] rounded-full flex items-center justify-center\">
              <User size={24} className=\"text-white\" />
            </div>
            <div>
              <h2 className=\"text-white font-medium\">{formData.display_name || 'User'}</h2>
              <p className=\"text-[#AAA] text-sm capitalize\">{formData.role}</p>
            </div>
          </div>

          <div className=\"space-y-6\">
            <div>
              <label className=\"block text-sm font-medium text-[#AAA] uppercase tracking-wide mb-2\">
                Display Name
              </label>
              <input
                type=\"text\"
                value={formData.display_name}
                onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                className=\"w-full bg-[#222] border border-[#333] rounded p-3 text-white placeholder-[#555] focus:outline-none focus:border-[#2EA3F2] transition-colors\"
                placeholder=\"Enter your display name\"
              />
            </div>

            <div>
              <label className=\"block text-sm font-medium text-[#AAA] uppercase tracking-wide mb-2\">
                Email
              </label>
              <input
                type=\"email\"
                value={formData.email}
                disabled
                className=\"w-full bg-[#111] border border-[#333] rounded p-3 text-[#AAA] cursor-not-allowed\"
              />
              <p className=\"text-xs text-[#555] mt-1\">Email cannot be changed</p>
            </div>

            <div>
              <label className=\"block text-sm font-medium text-[#AAA] uppercase tracking-wide mb-2\">
                Role
              </label>
              <input
                type=\"text\"
                value={formData.role}
                disabled
                className=\"w-full bg-[#111] border border-[#333] rounded p-3 text-[#AAA] cursor-not-allowed capitalize\"
              />
              <p className=\"text-xs text-[#555] mt-1\">Role is managed by administrators</p>
            </div>
          </div>

          <div className=\"flex justify-end mt-8\">
            <button
              onClick={handleSave}
              disabled={saving}
              className=\"inline-flex items-center space-x-2 bg-[#2EA3F2] hover:bg-[#2EA3F2]/90 text-white px-6 py-3 rounded font-medium transition-colors disabled:opacity-50\"
            >
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}