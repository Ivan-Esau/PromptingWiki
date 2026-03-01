import type { ReferencesViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';
import { renderReferenceList } from '../components/referenceList';

export function renderReferencesView(model: ReferencesViewModel): string {
  const referenceList = renderReferenceList(model.references);
  const usage = model.references
    .slice(0, 30)
    .map((reference) => {
      const linkedPages = reference.pages.slice(0, 4).map((page) => `<a href="#/page/${encodeURIComponent(page.slug)}">${escapeHtml(page.title)}</a>`).join(', ');
      return `<li><strong>${escapeHtml(reference.label)}</strong><p>${linkedPages || 'No linked pages'}</p></li>`;
    })
    .join('');

  return `
    <section class="section-intro">
      <p class="eyebrow">Archive</p>
      <h1>Source Archive and Citation Ledger</h1>
      <p>Every source used in the wiki is listed below in bibliography form, then mapped to the entries that cite it.</p>
    </section>
    <section class="linear-panel">${referenceList}</section>
    <section class="linear-panel">
      <h2>Citation Usage Map</h2>
      <ul class="reference-usage-list ledger-list">${usage || '<li>No reference usage data available.</li>'}</ul>
    </section>
  `;
}
