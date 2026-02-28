import fs from 'node:fs/promises';
import path from 'node:path';
import { OUTPUT_ROOT } from './types.mjs';

export function buildSearchIndex(pages) {
  return pages.map((page) => ({
    slug: page.slug,
    title: page.title,
    summary: page.summary,
    content_type: page.content_type,
    section: page.section,
    subsection: page.subsection,
    tags: page.tags,
    difficulty: page.difficulty,
    text: [page.title, page.summary, page.tags.join(' '), page.headings.join(' '), page.plain_text]
      .join(' ')
      .toLowerCase()
  }));
}

export function toPublicPages(pages) {
  return pages.map(({ headings, plain_text, code_fence_count, file_path, ...publicPage }) => ({
    ...publicPage,
    schema_version: publicPage.schema_version ?? 1,
    reading_time_minutes: Math.max(1, Math.round((plain_text.split(/\s+/).filter(Boolean).length / 220) * 10) / 10)
  }));
}

export async function writeContentArtifacts(pages) {
  const contentIndexPath = path.join(OUTPUT_ROOT, 'content-index.json');
  const searchIndexPath = path.join(OUTPUT_ROOT, 'search-index.json');
  const publicPages = toPublicPages(pages);
  const searchIndex = buildSearchIndex(pages);

  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await fs.writeFile(contentIndexPath, JSON.stringify(publicPages, null, 2));
  await fs.writeFile(searchIndexPath, JSON.stringify(searchIndex, null, 2));

  return {
    publicPages,
    searchIndex,
    contentIndexPath,
    searchIndexPath
  };
}
