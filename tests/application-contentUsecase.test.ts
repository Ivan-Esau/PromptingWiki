import { describe, expect, it } from 'vitest';
import { buildAppContext } from '../src/application/context';
import { getContentPageData } from '../src/application/usecases/getContentPageData';
import type { ContentRepository } from '../src/infrastructure/repositories/contentRepository';

const stubRepository: ContentRepository = {
  getPages() {
    return [
      {
        schema_version: 1,
        title: 'Page A',
        slug: 'page-a',
        content_type: 'pattern',
        summary: 'Summary A is sufficiently long for the data contract.',
        tags: ['pattern'],
        provider_scope: 'neutral',
        difficulty: 'intro',
        last_reviewed: '2026-02-28',
        references: [{ label: 'Ref A', url: 'https://example.com/a', source_type: 'doc' }],
        related_pages: ['page-b'],
        section: 'library',
        subsection: 'patterns',
        body_html: '<p>Body A</p>',
        toc: [],
        excerpt: 'Body A',
        reading_time_minutes: 1
      },
      {
        schema_version: 1,
        title: 'Page B',
        slug: 'page-b',
        content_type: 'concept',
        summary: 'Summary B is sufficiently long for the data contract.',
        tags: ['concept'],
        provider_scope: 'neutral',
        difficulty: 'intro',
        last_reviewed: '2026-02-28',
        references: [{ label: 'Ref B', url: 'https://example.com/b', source_type: 'doc' }],
        related_pages: [],
        section: 'learn',
        subsection: 'learn',
        body_html: '<p>Body B</p>',
        toc: [],
        excerpt: 'Body B',
        reading_time_minutes: 1
      }
    ];
  },
  getSearchEntries() {
    return [
      {
        slug: 'page-a',
        title: 'Page A',
        summary: 'Summary',
        content_type: 'pattern',
        section: 'library',
        subsection: 'patterns',
        tags: ['pattern'],
        difficulty: 'intro',
        text: 'page a'
      },
      {
        slug: 'page-b',
        title: 'Page B',
        summary: 'Summary',
        content_type: 'concept',
        section: 'learn',
        subsection: 'learn',
        tags: ['concept'],
        difficulty: 'intro',
        text: 'page b'
      }
    ];
  },
  getSections() {
    return [];
  },
  getGlossaryEntries() {
    return [];
  },
  getHomeConfig() {
    return { recommended_slugs: [] };
  }
};

describe('getContentPageData use-case', () => {
  it('returns page and resolved related pages', () => {
    const context = buildAppContext(stubRepository);
    const result = getContentPageData(context, 'page-a');
    expect(result?.page.slug).toBe('page-a');
    expect(result?.related.map((page) => page.slug)).toEqual(['page-b']);
  });

  it('returns null for unknown page slug', () => {
    const context = buildAppContext(stubRepository);
    expect(getContentPageData(context, 'unknown')).toBeNull();
  });
});
