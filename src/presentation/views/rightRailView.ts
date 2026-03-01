import type { ContentPage } from '../../domain/models/content';
import { escapeHtml } from '../../utils/markdown';

export function renderDefaultRightRail(): string {
  return `
    <section class="right-rail-card">
      <h2>Reading Loop</h2>
      <ol>
        <li>Start with fundamentals.</li>
        <li>Select a pattern entry.</li>
        <li>Review use-case and eval guidance.</li>
        <li>Trace all claims to references.</li>
      </ol>
    </section>
  `;
}

export function renderRelatedRightRail(relatedPages: ContentPage[]): string {
  const links = relatedPages
    .map((page) => `<li><a href="#/page/${encodeURIComponent(page.slug)}">${escapeHtml(page.title)}</a></li>`)
    .join('');

  return `
    <section class="right-rail-card">
      <h2>Adjacent Entries</h2>
      ${links ? `<ul class="side-list">${links}</ul>` : '<p class="empty-state">No related links.</p>'}
    </section>
  `;
}
