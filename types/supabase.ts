export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          title: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          created_by?: string;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          sent_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          sent_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          body?: string;
          sent_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: 'admin' | 'writer' | 'user';
          display_name: string | null;
          profile_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role?: 'admin' | 'writer' | 'user';
          display_name?: string | null;
          profile_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'admin' | 'writer' | 'user';
          display_name?: string | null;
          profile_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      verse_by_verse: {
        Row: {
          id: string;
          title: string;
          slug: string;
          book: string;
          passage: string | null;
          youtube_url: string | null;
          content: any | null;
          attachments: any[];
          tags: string[];
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          book: string;
          passage?: string | null;
          youtube_url?: string | null;
          content?: any | null;
          attachments?: any[];
          tags?: string[];
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          book?: string;
          passage?: string | null;
          youtube_url?: string | null;
          content?: any | null;
          attachments?: any[];
          tags?: string[];
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          title: string;
          slug: string;
          series: string | null;
          series_order: number | null;
          description: string;
          content: any | null;
          featured_image_url: string | null;
          youtube_url: string | null;
          tags: string[];
          featured: boolean;
          published_at: string;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          series?: string | null;
          series_order?: number | null;
          description: string;
          content?: any | null;
          featured_image_url?: string | null;
          youtube_url?: string | null;
          tags?: string[];
          featured?: boolean;
          published_at: string;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          series?: string | null;
          series_order?: number | null;
          description?: string;
          content?: any | null;
          featured_image_url?: string | null;
          youtube_url?: string | null;
          tags?: string[];
          featured?: boolean;
          published_at?: string;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resources: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          type: 'pdf' | 'audio' | 'video' | 'link' | 'image';
          category: 'study-guides' | 'audio-series' | 'video-teachings' | 'charts-diagrams' | 'apologetics' | 'reading-lists' | 'devotionals' | 'reference';
          file_url: string | null;
          external_url: string | null;
          youtube_url: string | null;
          file_size: string | null;
          duration: string | null;
          content: any | null;
          thumbnail_url: string | null;
          tags: string[];
          featured: boolean;
          download_count: number;
          published_at: string;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          type: 'pdf' | 'audio' | 'video' | 'link' | 'image';
          category: 'study-guides' | 'audio-series' | 'video-teachings' | 'charts-diagrams' | 'apologetics' | 'reading-lists' | 'devotionals' | 'reference';
          file_url?: string | null;
          external_url?: string | null;
          youtube_url?: string | null;
          file_size?: string | null;
          duration?: string | null;
          content?: any | null;
          thumbnail_url?: string | null;
          tags?: string[];
          featured?: boolean;
          download_count?: number;
          published_at: string;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          type?: 'pdf' | 'audio' | 'video' | 'link' | 'image';
          category?: 'study-guides' | 'audio-series' | 'video-teachings' | 'charts-diagrams' | 'apologetics' | 'reading-lists' | 'devotionals' | 'reference';
          file_url?: string | null;
          external_url?: string | null;
          youtube_url?: string | null;
          file_size?: string | null;
          duration?: string | null;
          content?: any | null;
          thumbnail_url?: string | null;
          tags?: string[];
          featured?: boolean;
          download_count?: number;
          published_at?: string;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ask: {
        Row: {
          id: string;
          question: string;
          slug: string;
          answer: any;
          short_answer: string | null;
          category: 'salvation' | 'dispensations' | 'church-doctrine' | 'bible-versions' | 'prophecy' | 'christian-living' | 'apologetics' | 'pauls-epistles' | 'law-vs-grace' | 'other';
          tags: string[];
          related_verses: any[];
          featured: boolean;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          submitter_info: any | null;
          status: 'draft' | 'review' | 'published' | 'archived';
          published_at: string | null;
          view_count: number;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          slug: string;
          answer: any;
          short_answer?: string | null;
          category: 'salvation' | 'dispensations' | 'church-doctrine' | 'bible-versions' | 'prophecy' | 'christian-living' | 'apologetics' | 'pauls-epistles' | 'law-vs-grace' | 'other';
          tags?: string[];
          related_verses?: any[];
          featured?: boolean;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          submitter_info?: any | null;
          status?: 'draft' | 'review' | 'published' | 'archived';
          published_at?: string | null;
          view_count?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          slug?: string;
          answer?: any;
          short_answer?: string | null;
          category?: 'salvation' | 'dispensations' | 'church-doctrine' | 'bible-versions' | 'prophecy' | 'christian-living' | 'apologetics' | 'pauls-epistles' | 'law-vs-grace' | 'other';
          tags?: string[];
          related_verses?: any[];
          featured?: boolean;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          submitter_info?: any | null;
          status?: 'draft' | 'review' | 'published' | 'archived';
          published_at?: string | null;
          view_count?: number;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}