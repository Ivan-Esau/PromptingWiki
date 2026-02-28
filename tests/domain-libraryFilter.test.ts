import { describe, expect, it } from 'vitest';
import type { ContentPage, LibraryFilters } from '../src/domain/models/content';
import { buildTaskOptions, buildTechniqueOptions, matchesLibraryFilters } from '../src/domain/services/libraryFilter';

function page(overrides: Partial<ContentPage>): ContentPage {
  return {
    schema_version: 1,
    title: 'Example Page',
    slug: 'example-page',
    content_type: 'pattern',
    summary: 'Example summary that is long enough for schema validation checks.',
    tags: ['pattern'],
    task_type: ['classification'],
    technique: ['rubric-scoring'],
    risk: ['label-drift'],
    provider_scope: 'neutral',
    difficulty: 'intermediate',
    last_reviewed: '2026-02-28',
    references: [{ label: 'Ref', url: 'https://example.com', source_type: 'doc' }],
    related_pages: [],
    section: 'library',
    subsection: 'patterns',
    body_html: '<p>Body</p>',
    toc: [],
    excerpt: 'Body',
    reading_time_minutes: 1,
    ...overrides
  };
}

describe('libraryFilter service', () => {
  it('builds sorted unique task and technique options', () => {
    const pages = [
      page({ slug: 'a', task_type: ['summarization', 'classification'], technique: ['few-shot', 'schema-control'] }),
      page({ slug: 'b', task_type: ['classification', 'rag'], technique: ['schema-control'] })
    ];

    expect(buildTaskOptions(pages)).toEqual(['classification', 'rag', 'summarization']);
    expect(buildTechniqueOptions(pages)).toEqual(['few-shot', 'schema-control']);
  });

  it('matches filters using page metadata and indexed text', () => {
    const sample = page({ slug: 'sample', title: 'RAG Pattern', task_type: ['rag'], technique: ['grounded-generation'] });
    const filters: LibraryFilters = { search: 'citation', task: 'rag', technique: 'grounded-generation', contentType: 'pattern' };

    expect(matchesLibraryFilters(sample, filters, 'citation evidence grounded output')).toBe(true);
    expect(matchesLibraryFilters(sample, { ...filters, task: 'classification' }, '')).toBe(false);
    expect(matchesLibraryFilters(sample, { ...filters, contentType: 'use_case' }, '')).toBe(false);
  });
});
