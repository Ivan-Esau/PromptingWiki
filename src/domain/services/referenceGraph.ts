import type { ContentPage, ReferenceItem } from '../models/content';

export interface ReferenceGraphNode extends ReferenceItem {
  pages: string[];
}

export function buildReferenceGraph(pages: ContentPage[]): ReferenceGraphNode[] {
  const map = new Map<string, ReferenceGraphNode>();

  for (const page of pages) {
    for (const reference of page.references) {
      const existing = map.get(reference.url);
      if (existing) {
        existing.pages.push(page.slug);
        continue;
      }
      map.set(reference.url, { ...reference, pages: [page.slug] });
    }
  }

  return Array.from(map.values())
    .map((node) => ({
      ...node,
      pages: Array.from(new Set(node.pages)).sort((a, b) => a.localeCompare(b))
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
