import type { ContentPage } from '../../types/content';
import { escapeHtml } from '../../utils/markdown';

function toPageUrl(slug: string): string {
  return `#/page/${encodeURIComponent(slug)}`;
}

function formatTypeLabel(contentType: ContentPage['content_type']): string {
  return contentType.replace('_', ' ');
}

export function renderPageCard(page: ContentPage): string {
  const tags = page.tags.slice(0, 4).map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join('');

  return `
    <article class="page-card catalog-record">
      <header class="record-head">
        <h3 class="record-title"><a href="${toPageUrl(page.slug)}">${escapeHtml(page.title)}</a></h3>
        <p class="record-meta">
          <span class="content-type-badge">${escapeHtml(formatTypeLabel(page.content_type))}</span>
          <span>${escapeHtml(page.difficulty)}</span>
          <span>${page.reading_time_minutes} min</span>
        </p>
      </header>
      <p class="record-summary">${escapeHtml(page.summary)}</p>
      <div class="tag-row record-tags">${tags}</div>
    </article>
  `;
}
