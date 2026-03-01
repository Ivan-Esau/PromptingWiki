import type { HomeViewModel } from '../../application/viewModels';
import type { SectionMeta } from '../../domain/models/navigation';
import { renderPageCard } from '../components/pageCard';

export function renderHomeView(model: HomeViewModel, sections: SectionMeta[]): string {
  const cards = model.recommended.map(renderPageCard).join('');
  const sectionRows = sections
    .map(
      (section, index) => `
      <li class="line-step">
        <span class="line-index">${index + 1}</span>
        <div class="line-content">
          <h3><a href="#/${section.key}">${section.title}</a></h3>
          <p>${section.description}</p>
        </div>
      </li>
    `
    )
    .join('');

  return `
    <section class="hero library-hero">
      <p class="eyebrow">Prompting Library</p>
      <h1>A linear research library for prompting, agents, and evaluation.</h1>
      <p class="hero-copy">
        Browse this site as a curated collection: fundamentals first, patterns second, use cases third, then benchmarks and references.
        Every entry is linked to source material and connected to the next decision in the workflow.
      </p>
      <div class="hero-actions linear-actions">
        <a href="#/learn" class="action primary">Start at Fundamentals</a>
        <a href="#/references" class="action secondary">Open Source Catalog</a>
      </div>
    </section>
    <section class="linear-panel">
      <h2>Library Route</h2>
      <ol class="line-track">${sectionRows}</ol>
    </section>
    <section class="linear-panel">
      <div class="section-header-inline">
        <h2>Curator Picks</h2>
        <p>Recommended pages to establish a complete prompting workflow from design to verification.</p>
      </div>
      <div class="catalog-stack">${cards || '<p class="empty-state">No recommendations configured.</p>'}</div>
    </section>
  `;
}
