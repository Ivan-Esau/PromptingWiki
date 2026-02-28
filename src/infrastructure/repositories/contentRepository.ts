import type { ContentPage, SearchEntry } from '../../domain/models/content';
import type { GlossaryEntry, HomeConfig, SectionMeta } from '../../domain/models/navigation';

export interface ContentRepository {
  getPages(): ContentPage[];
  getSearchEntries(): SearchEntry[];
  getSections(): SectionMeta[];
  getGlossaryEntries(): GlossaryEntry[];
  getHomeConfig(): HomeConfig;
}
