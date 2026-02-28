import type { ContentPage, SearchEntry, SectionKey } from '../models/content';

export interface ContentIndex {
  pages: ContentPage[];
  bySlug: Map<string, ContentPage>;
  searchBySlug: Map<string, string>;
}

export function buildContentIndex(pages: ContentPage[], searchEntries: SearchEntry[]): ContentIndex {
  return {
    pages,
    bySlug: new Map(pages.map((page) => [page.slug, page])),
    searchBySlug: new Map(searchEntries.map((entry) => [entry.slug, entry.text]))
  };
}

export function sortByTitle(pages: ContentPage[]): ContentPage[] {
  return [...pages].sort((a, b) => a.title.localeCompare(b.title));
}

export function getSectionPages(pages: ContentPage[], section: SectionKey): ContentPage[] {
  return sortByTitle(pages.filter((page) => page.section === section));
}

export function getLibraryPages(pages: ContentPage[]): ContentPage[] {
  return sortByTitle(pages.filter((page) => page.section === 'library'));
}

export function getPageBySlug(index: ContentIndex, slug: string): ContentPage | undefined {
  return index.bySlug.get(slug);
}

export function getRelatedPages(index: ContentIndex, page: ContentPage): ContentPage[] {
  return page.related_pages.map((slug) => index.bySlug.get(slug)).filter((item): item is ContentPage => Boolean(item));
}

export function getRecommendedPages(index: ContentIndex, slugs: string[]): ContentPage[] {
  return slugs.map((slug) => index.bySlug.get(slug)).filter((item): item is ContentPage => Boolean(item));
}
