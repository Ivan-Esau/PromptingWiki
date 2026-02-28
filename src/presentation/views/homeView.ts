import type { HomeViewModel } from '../../application/viewModels';
import type { SectionMeta } from '../../domain/models/navigation';
import { renderPageCard } from '../components/pageCard';

export function renderHomeView(model: HomeViewModel, sections: SectionMeta[]): string {
  const cards = model.recommended.map(renderPageCard).join('');
  const sectionCards = sections
    .map(
      (section) => `
      <article class="overview-card">
        <h2><a href="#/${section.key}">${section.title}</a></h2>
        <p>${section.description}</p>
      </article>
    `
    )
    .join('');

  return `
    <section class="hero">
      <p class="eyebrow">Prompting Wiki</p>
      <h1>Best-practice prompting, grounded in references and evaluated patterns.</h1>
      <p class="hero-copy">
        This wiki is designed for product and engineering teams shipping LLM features.
        Start with fundamentals, move into reusable patterns, and validate each prompt with explicit tests.
      </p>
      <div class="hero-actions">
        <a href="#/learn" class="action primary">Start Learning Path</a>
        <a href="#/library" class="action secondary">Open Pattern Library</a>
      </div>
    </section>
    <section class="section-overview-grid">${sectionCards}</section>
    <section>
      <div class="section-header-inline">
        <h2>Recommended Starting Set</h2>
        <p>Pages selected to move from baseline prompting to evaluation-ready workflows.</p>
      </div>
      <div class="card-grid">${cards || '<p class="empty-state">No recommendations configured.</p>'}</div>
    </section>
  `;
}
