import { describe, expect, it } from 'vitest';
import { buildReferenceGraph } from '../src/domain/services/referenceGraph';
import type { ContentPage } from '../src/domain/models/content';

function basePage(slug: string, refs: { label: string; url: string; source_type: 'doc' | 'paper' | 'standard' }[]): ContentPage {
  return {
    schema_version: 1,
    title: slug,
    slug,
    content_type: 'reference',
    summary: 'A long enough summary to satisfy type expectations.',
    tags: ['references'],
    provider_scope: 'neutral',
    difficulty: 'intermediate',
    last_reviewed: '2026-02-28',
    references: refs,
    related_pages: [],
    section: 'references',
    subsection: 'references',
    body_html: '<p>Body</p>',
    toc: [],
    excerpt: 'Body',
    reading_time_minutes: 1
  };
}

describe('referenceGraph service', () => {
  it('deduplicates reference nodes by URL and merges page usage', () => {
    const pages = [
      basePage('a', [{ label: 'Ref A', url: 'https://arxiv.org/abs/1', source_type: 'paper' }]),
      basePage('b', [
        { label: 'Ref A (duplicate label ok)', url: 'https://arxiv.org/abs/1', source_type: 'paper' },
        { label: 'Ref B', url: 'https://example.com/spec', source_type: 'standard' }
      ])
    ];

    const graph = buildReferenceGraph(pages);
    expect(graph).toHaveLength(2);

    const refA = graph.find((item) => item.url === 'https://arxiv.org/abs/1');
    expect(refA?.pages).toEqual(['a', 'b']);
  });
});
