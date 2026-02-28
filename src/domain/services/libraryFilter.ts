import type { ContentPage, LibraryFilters } from '../models/content';

function normalizeTerm(value: string): string {
  return value.trim().toLowerCase();
}

function collectSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

export function buildTaskOptions(pages: ContentPage[]): string[] {
  return collectSorted(pages.flatMap((page) => page.task_type ?? []));
}

export function buildTechniqueOptions(pages: ContentPage[]): string[] {
  return collectSorted(pages.flatMap((page) => page.technique ?? []));
}

export function defaultLibraryFilters(): LibraryFilters {
  return {
    search: '',
    task: 'all',
    technique: 'all',
    contentType: 'all'
  };
}

export function matchesLibraryFilters(page: ContentPage, filters: LibraryFilters, indexedText: string): boolean {
  if (filters.contentType !== 'all' && page.content_type !== filters.contentType) {
    return false;
  }

  if (filters.task !== 'all') {
    const tasks = new Set((page.task_type ?? []).map(normalizeTerm));
    if (!tasks.has(normalizeTerm(filters.task))) return false;
  }

  if (filters.technique !== 'all') {
    const techniques = new Set((page.technique ?? []).map(normalizeTerm));
    if (!techniques.has(normalizeTerm(filters.technique))) return false;
  }

  const query = normalizeTerm(filters.search);
  if (!query) return true;

  const localCorpus = [page.title, page.summary, page.tags.join(' '), (page.task_type ?? []).join(' '), (page.technique ?? []).join(' ')]
    .join(' ')
    .toLowerCase();

  return localCorpus.includes(query) || indexedText.toLowerCase().includes(query);
}
