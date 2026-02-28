import type { GlossaryViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';

export function renderGlossaryView(model: GlossaryViewModel): string {
  const rows = model.entries
    .map(
      (entry) => `
    <article class="glossary-item">
      <h2>${escapeHtml(entry.term)}</h2>
      <p>${escapeHtml(entry.definition)}</p>
    </article>`
    )
    .join('');

  return `
    <section class="section-intro">
      <p class="eyebrow">Glossary</p>
      <h1>Prompting Vocabulary</h1>
      <p>Terms used throughout this wiki to keep implementation conversations precise and consistent.</p>
    </section>
    <section class="glossary-grid">${rows || '<p class="empty-state">No glossary entries configured.</p>'}</section>
  `;
}
