export type ContentType = 'concept' | 'pattern' | 'use_case' | 'eval' | 'safety' | 'provider_note' | 'reference';
export type ProviderScope = 'neutral' | 'openai' | 'anthropic' | 'google' | 'multi';
export type Difficulty = 'intro' | 'intermediate' | 'advanced';
export type SectionKey = 'learn' | 'library' | 'validate' | 'operate' | 'references' | 'glossary';

export interface ReferenceItem {
  label: string;
  url: string;
  source_type: 'doc' | 'paper' | 'standard';
  year?: number;
  authors?: string[];
  venue?: string;
  doi?: string;
}

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

export interface ContentPage {
  schema_version?: number;
  title: string;
  slug: string;
  content_type: ContentType;
  summary: string;
  tags: string[];
  task_type?: string[];
  technique?: string[];
  risk?: string[];
  provider_scope: ProviderScope;
  difficulty: Difficulty;
  last_reviewed: string;
  references: ReferenceItem[];
  related_pages: string[];
  section: SectionKey;
  subsection: string;
  body_html: string;
  toc: TocItem[];
  excerpt: string;
  reading_time_minutes: number;
}

export interface SearchEntry {
  slug: string;
  title: string;
  summary: string;
  content_type: ContentType;
  section: SectionKey;
  subsection: string;
  tags: string[];
  difficulty: Difficulty;
  text: string;
}

export interface LibraryFilters {
  search: string;
  task: string;
  technique: string;
  contentType: 'all' | ContentType;
}
