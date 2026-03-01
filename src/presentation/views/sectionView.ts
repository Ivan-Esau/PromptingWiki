import type { SectionViewModel } from '../../application/viewModels';
import { renderPageCard } from '../components/pageCard';

export function renderSectionView(model: SectionViewModel): string {
  const cards = model.pages.map(renderPageCard).join('');
  return `
    <section class="section-intro">
      <p class="eyebrow">Section</p>
      <h1>${model.section.title}</h1>
      <p>${model.section.description}</p>
    </section>
    <section class="linear-panel">
      <p class="results-count">${model.pages.length} curated entries</p>
      <div class="catalog-stack">${cards || '<p class="empty-state">No pages published yet.</p>'}</div>
    </section>
  `;
}
