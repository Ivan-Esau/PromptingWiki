import type { ContentPage } from '../../domain/models/content';
import { escapeHtml } from '../../utils/markdown';

export function renderDefaultRightRail(): string {
  return `
    <section class="right-rail-card">
      <h2>Build Loop</h2>
      <ol>
        <li>Define prompt objective.</li>
        <li>Select a pattern from the library.</li>
        <li>Run eval with fixed test cases.</li>
        <li>Publish only with references and failure notes.</li>
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
      <h2>Related</h2>
      ${links ? `<ul class="side-list">${links}</ul>` : '<p class="empty-state">No related links.</p>'}
    </section>
  `;
}
