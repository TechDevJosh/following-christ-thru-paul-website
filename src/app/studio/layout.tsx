'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthGuard from './components/AuthGuard';
import StudioSidebar from '@/components/StudioSidebar';
import StudioTopBar from '@/components/StudioTopBar';
import DashboardOverview from '@/components/DashboardOverview';
import StudioListView from '@/components/StudioListView';
import StudioEditor from '@/components/StudioEditor';
import ResizablePanes from '@/components/ResizablePanes';
import { supabase } from '@/lib/supabase';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [editorData, setEditorData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeView, setActiveView] = useState<'Structure' | 'Vision'>('Structure');

  const showDashboard = !selectedSection;
  const showEditor = selectedItem && selectedSection;

  useEffect(() => {
    const section = searchParams.get('section');
    const item = searchParams.get('item');
    
    setSelectedSection(section);
    setSelectedItem(item);
    
    if (section) {
      loadSectionItems(section);
      
      if (item && item !== 'new') {
        loadItemData(section, item);
      } else if (item === 'new') {
        setEditorData({});
      }
    }
  }, [searchParams]);

  const handleSelectSection = (section: string) => {
    router.push(`/studio?section=${section}`, { shallow: true });
  };

  const handleSelectItem = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('item', id);
    router.push(`/studio?${params.toString()}`, { shallow: true });
  };

  const handleCreateNew = () => {
    const params = new URLSearchParams(searchParams);
    params.set('item', 'new');
    router.push(`/studio?${params.toString()}`, { shallow: true });
  };

  const loadSectionItems = async (section: string) => {
    setLoading(true);
    try {
      const tableName = section.replace('-', '_');
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading items:', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const loadItemData = async (section: string, id: string) => {
    try {
      const tableName = section.replace('-', '_');
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setEditorData(data || {});
    } catch (error) {
      console.error('Error loading item:', JSON.stringify(error, null, 2));
    }
  };

  const getEditorFields = (section: string) => {
    switch (section) {
      case 'verse-by-verse':
        return [
          { name: 'title', label: 'Title', type: 'text' as const, required: true },
          { name: 'book', label: 'Book', type: 'text' as const, required: true },
          { name: 'passage', label: 'Passage', type: 'text' as const },
          { name: 'youtube_url', label: 'YouTube URL', type: 'url' as const },
          { name: 'content', label: 'Content', type: 'textarea' as const, rows: 10 },
          { name: 'tags', label: 'Tags', type: 'text' as const },
          { name: 'seo_title', label: 'SEO Title', type: 'text' as const },
          { name: 'seo_description', label: 'SEO Description', type: 'textarea' as const, rows: 2 },
          { name: 'published_at', label: 'Published Date', type: 'text' as const },
        ];
      case 'topics':
        return [
          { name: 'title', label: 'Title', type: 'text' as const, required: true },
          { name: 'description', label: 'Description', type: 'textarea' as const, rows: 3, required: true },
          { name: 'series', label: 'Series', type: 'text' as const },
          { name: 'series_order', label: 'Series Order', type: 'number' as const },
          { name: 'youtube_url', label: 'YouTube URL', type: 'url' as const },
          { name: 'content', label: 'Content', type: 'textarea' as const, rows: 10 },
          { name: 'tags', label: 'Tags', type: 'text' as const },
          { name: 'featured', label: 'Featured', type: 'checkbox' as const },
          { name: 'seo_title', label: 'SEO Title', type: 'text' as const },
          { name: 'seo_description', label: 'SEO Description', type: 'textarea' as const, rows: 2 },
          { name: 'published_at', label: 'Published Date', type: 'text' as const },
        ];
      case 'resources':
        return [
          { name: 'title', label: 'Title', type: 'text' as const, required: true },
          { name: 'description', label: 'Description', type: 'textarea' as const, rows: 3, required: true },
          { name: 'type', label: 'Type', type: 'select' as const, options: [
            { value: 'pdf', label: 'PDF' },
            { value: 'audio', label: 'Audio' },
            { value: 'video', label: 'Video' },
            { value: 'link', label: 'Link' },
            { value: 'image', label: 'Image' }
          ]},
          { name: 'category', label: 'Category', type: 'select' as const, options: [
            { value: 'study-guides', label: 'Study Guides' },
            { value: 'audio-series', label: 'Audio Series' },
            { value: 'video-teachings', label: 'Video Teachings' },
            { value: 'charts-diagrams', label: 'Charts & Diagrams' },
            { value: 'apologetics', label: 'Apologetics' },
            { value: 'reading-lists', label: 'Reading Lists' },
            { value: 'devotionals', label: 'Devotionals' },
            { value: 'reference', label: 'Reference' }
          ]},
          { name: 'file_url', label: 'File URL', type: 'url' as const },
          { name: 'external_url', label: 'External URL', type: 'url' as const },
          { name: 'content', label: 'Content', type: 'textarea' as const, rows: 6 },
          { name: 'featured', label: 'Featured', type: 'checkbox' as const },
          { name: 'published_at', label: 'Published Date', type: 'text' as const },
        ];
      case 'ask':
        return [
          { name: 'question', label: 'Question', type: 'textarea' as const, rows: 3, required: true },
          { name: 'answer', label: 'Answer', type: 'textarea' as const, rows: 10, required: true },
          { name: 'short_answer', label: 'Short Answer', type: 'textarea' as const, rows: 2 },
          { name: 'category', label: 'Category', type: 'select' as const, options: [
            { value: 'salvation', label: 'Salvation' },
            { value: 'dispensations', label: 'Dispensations' },
            { value: 'church-doctrine', label: 'Church Doctrine' },
            { value: 'bible-versions', label: 'Bible Versions' },
            { value: 'prophecy', label: 'Prophecy' },
            { value: 'christian-living', label: 'Christian Living' },
            { value: 'apologetics', label: 'Apologetics' },
            { value: 'pauls-epistles', label: 'Paul\'s Epistles' },
            { value: 'law-vs-grace', label: 'Law vs Grace' },
            { value: 'other', label: 'Other' }
          ]},
          { name: 'difficulty', label: 'Difficulty', type: 'select' as const, options: [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' }
          ]},
          { name: 'featured', label: 'Featured', type: 'checkbox' as const },
          { name: 'published_at', label: 'Published Date', type: 'text' as const },
        ];
      default:
        return [
          { name: 'title', label: 'Title', type: 'text' as const, required: true },
          { name: 'content', label: 'Content', type: 'textarea' as const, rows: 10 },
          { name: 'seo_title', label: 'SEO Title', type: 'text' as const },
          { name: 'seo_description', label: 'SEO Description', type: 'textarea' as const, rows: 2 },
          { name: 'published_at', label: 'Published Date', type: 'text' as const },
        ];
    }
  };

  const handleSave = async () => {
    if (!selectedItem || !selectedSection) return;
    
    setSaving(true);
    try {
      const tableName = selectedSection.replace('-', '_');
      
      if (selectedItem === 'new') {
        const newData = {
          ...editorData,
          slug: generateSlug(editorData.title || editorData.question || ''),
          published_at: new Date().toISOString(),
        };
        
        const { data, error } = await supabase
          .from(tableName)
          .insert(newData)
          .select()
          .single();
        
        if (error) throw error;
        
        const params = new URLSearchParams(searchParams);
        params.set('item', data.id);
        router.push(`/studio?${params.toString()}`, { shallow: true });
      } else {
        const { error } = await supabase
          .from(tableName)
          .update(editorData)
          .eq('id', selectedItem);
        
        if (error) throw error;
      }
      
      loadSectionItems(selectedSection);
    } catch (error) {
      console.error('Error saving:', JSON.stringify(error, null, 2));
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const getSectionTitle = (section: string) => {
    return section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formatItemsForList = (items: any[], section: string) => {
    return items.map(item => ({
      id: item.id,
      title: item.title || item.question,
      subtitle: section === 'verse-by-verse' 
        ? `${item.book}${item.passage ? ` • ${item.passage}` : ''}`
        : section === 'ask'
        ? item.short_answer || item.category
        : item.description,
      published: true,
      publishedAt: item.published_at || item.created_at,
      slug: item.slug
    }));
  };

  return (
    <AuthGuard>
      <div className="flex h-screen bg-[#111] font-inter antialiased">
        {/* Sidebar */}
        <StudioSidebar 
          onCreateNew={() => {}}
          onSelectItem={handleSelectSection}
          selectedItem={selectedSection}
          onSearch={(query) => {
            // Implement search functionality
            if (query.trim()) {
              // Search across all tables
              Promise.all([
                supabase.from('verse_by_verse').select('id, title, book').ilike('title', `%${query}%`),
                supabase.from('topics').select('id, title, description').ilike('title', `%${query}%`),
                supabase.from('resources').select('id, title, description').ilike('title', `%${query}%`),
                supabase.from('ask').select('id, question').ilike('question', `%${query}%`)
              ]).then(([sermons, topics, resources, qa]) => {
                const results = [
                  ...sermons.data?.map(item => ({ ...item, type: 'verse-by-verse' })) || [],
                  ...topics.data?.map(item => ({ ...item, type: 'topics' })) || [],
                  ...resources.data?.map(item => ({ ...item, type: 'resources' })) || [],
                  ...qa.data?.map(item => ({ ...item, type: 'ask', title: item.question })) || []
                ];
                console.log('Search results:', results);
              });
            }
          }}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <StudioTopBar 
            showPublishButton={!!showEditor}
            isDraft={selectedItem === 'new'}
          />
          
          <div className="flex-1 overflow-hidden">
            <ResizablePanes
              leftPane={<div />}
              centerPane={
                showDashboard ? (
                  <DashboardOverview onSelectSection={handleSelectSection} />
                ) : (
                  <StudioListView
                    title={getSectionTitle(selectedSection)}
                    items={formatItemsForList(items, selectedSection)}
                    onCreateNew={handleCreateNew}
                    onSelectItem={handleSelectItem}
                    selectedItemId={selectedItem}
                    loading={loading}
                  />
                )
              }
              rightPane={
                showEditor ? (
                  <StudioEditor
                    title={selectedItem === 'new' ? `New ${getSectionTitle(selectedSection).slice(0, -1)}` : 'Edit Document'}
                    fields={getEditorFields(selectedSection)}
                    data={editorData}
                    onChange={(field, value) => setEditorData(prev => ({ ...prev, [field]: value }))}
                    onSave={handleSave}
                    saving={saving}
                    isDraft={selectedItem === 'new'}
                    documentId={selectedItem !== 'new' ? selectedItem : null}
                    schemaName={selectedSection}
                  />
                ) : undefined
              }
              defaultLeftWidth={0}
              defaultCenterWidth={600}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}