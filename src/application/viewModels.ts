import type { ContentPage, LibraryFilters, ReferenceItem, SectionKey } from '../domain/models/content';
import type { GlossaryEntry, Route, SectionMeta } from '../domain/models/navigation';

export interface ShellViewModel {
  route: Route;
  sections: SectionMeta[];
  activeSection: SectionKey | null;
}

export interface HomeViewModel {
  recommended: ContentPage[];
}

export interface SectionViewModel {
  section: SectionMeta;
  pages: ContentPage[];
}

export interface LibraryViewModel {
  pages: ContentPage[];
  filters: LibraryFilters;
  taskOptions: string[];
  techniqueOptions: string[];
}

export interface ContentPageViewModel {
  page: ContentPage;
  related: ContentPage[];
}

export interface ReferenceGraphItem extends ReferenceItem {
  pages: ContentPage[];
}

export interface ReferencesViewModel {
  references: ReferenceGraphItem[];
}

export interface GlossaryViewModel {
  entries: GlossaryEntry[];
}
