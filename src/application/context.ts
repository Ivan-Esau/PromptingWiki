import type { ContentPage, SearchEntry } from '../domain/models/content';
import type { GlossaryEntry, HomeConfig, SectionMeta } from '../domain/models/navigation';
import { buildContentIndex, type ContentIndex } from '../domain/services/contentQuery';
import type { ContentRepository } from '../infrastructure/repositories/contentRepository';

export interface AppContext {
  pages: ContentPage[];
  searchEntries: SearchEntry[];
  sections: SectionMeta[];
  glossary: GlossaryEntry[];
  homeConfig: HomeConfig;
  index: ContentIndex;
}

export function buildAppContext(repository: ContentRepository): AppContext {
  const pages = repository.getPages();
  const searchEntries = repository.getSearchEntries();
  return {
    pages,
    searchEntries,
    sections: repository.getSections(),
    glossary: repository.getGlossaryEntries(),
    homeConfig: repository.getHomeConfig(),
    index: buildContentIndex(pages, searchEntries)
  };
}
