import contentPages from '../../data/content-index.json';
import searchEntries from '../../data/search-index.json';
import sections from '../../content/_meta/sections.json';
import glossary from '../../content/_meta/glossary.json';
import homeConfig from '../../content/_meta/home.json';
import type { ContentPage, SearchEntry } from '../../domain/models/content';
import type { GlossaryEntry, HomeConfig, SectionMeta } from '../../domain/models/navigation';
import type { ContentRepository } from './contentRepository';

export class StaticJsonContentRepository implements ContentRepository {
  private readonly pages = contentPages as ContentPage[];
  private readonly search = searchEntries as SearchEntry[];
  private readonly sectionMeta = sections as SectionMeta[];
  private readonly glossaryEntries = glossary as GlossaryEntry[];
  private readonly home = homeConfig as HomeConfig;

  getPages(): ContentPage[] {
    return this.pages;
  }

  getSearchEntries(): SearchEntry[] {
    return this.search;
  }

  getSections(): SectionMeta[] {
    return this.sectionMeta;
  }

  getGlossaryEntries(): GlossaryEntry[] {
    return this.glossaryEntries;
  }

  getHomeConfig(): HomeConfig {
    return this.home;
  }
}
