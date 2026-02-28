import type { ReferencesViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';
import { renderReferenceList } from '../components/referenceList';

export function renderReferencesView(model: ReferencesViewModel): string {
  const referenceList = renderReferenceList(model.references);
  const usage = model.references
    .slice(0, 20)
    .map((reference) => {
      const linkedPages = reference.pages.slice(0, 4).map((page) => `<a href="#/page/${encodeURIComponent(page.slug)}">${escapeHtml(page.title)}</a>`).join(', ');
      return `<li><strong>${escapeHtml(reference.label)}</strong>: ${linkedPages || 'No linked pages'}</li>`;
    })
    .join('');

  return `
    <section class="section-intro">
      <p class="eyebrow">References</p>
      <h1>Source Library</h1>
      <p>Primary documentation, papers, and standards backing each best-practice recommendation.</p>
    </section>
    <section>${referenceList}</section>
    <section>
      <h2>Where References Are Used</h2>
      <ul class="reference-usage-list">${usage || '<li>No reference usage data available.</li>'}</ul>
    </section>
  `;
}
