import type { ContentPageViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';
import { renderPageCard } from '../components/pageCard';
import { renderReferenceList } from '../components/referenceList';
import { renderTagChips } from '../components/tagChips';

export function renderPageView(model: ContentPageViewModel): string {
  const page = model.page;
  const relatedMarkup = model.related.length > 0 ? model.related.map(renderPageCard).join('') : '<p class="empty-state">No related pages listed.</p>';
  const tocMarkup =
    page.toc.length > 0
      ? page.toc
          .map(
            (item) =>
              `<li class="${item.depth === 3 ? 'depth-3' : 'depth-2'}"><button type="button" data-toc-target="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button></li>`
          )
          .join('')
      : '<li><span class="empty-state">No table of contents for this page.</span></li>';

  return `
    <article class="content-article">
      <header class="article-header">
        <p class="eyebrow">${escapeHtml(page.section)} / ${escapeHtml(page.subsection)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        <p class="article-summary">${escapeHtml(page.summary)}</p>
        <p class="meta-row">
          <span class="content-type-badge">${escapeHtml(page.content_type.replace('_', ' '))}</span>
          <span>${escapeHtml(page.difficulty)}</span>
          <span>Reviewed ${escapeHtml(page.last_reviewed)}</span>
          <span>${page.reading_time_minutes} min read</span>
        </p>
        <div class="tag-row">${renderTagChips(page.tags)}</div>
      </header>
      <section class="article-body">${page.body_html}</section>
      <section>
        <h2>References</h2>
        ${renderReferenceList(page.references)}
      </section>
      <section>
        <h2>Related Pages</h2>
        <div class="card-grid compact">${relatedMarkup}</div>
      </section>
    </article>
    <aside class="article-toc-panel">
      <h2>On This Page</h2>
      <ul class="toc-list">${tocMarkup}</ul>
    </aside>
  `;
}
