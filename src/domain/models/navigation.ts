import type { SectionKey } from './content';

export interface SectionMeta {
  key: SectionKey;
  title: string;
  description: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
}

export interface HomeConfig {
  recommended_slugs: string[];
}

export type Route =
  | { type: 'home' }
  | { type: 'section'; section: SectionKey }
  | { type: 'page'; slug: string }
  | { type: 'not-found' };
