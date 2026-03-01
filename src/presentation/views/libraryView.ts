import type { LibraryViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';
import { renderPageCard } from '../components/pageCard';

function option(value: string, selectedValue: string, label: string): string {
  const selected = value === selectedValue ? ' selected' : '';
  return `<option value="${escapeHtml(value)}"${selected}>${escapeHtml(label)}</option>`;
}

export function renderLibraryView(model: LibraryViewModel): string {
  const cards = model.pages.map(renderPageCard).join('');
  const taskOptions = model.taskOptions.map((item) => option(item, model.filters.task, item)).join('');
  const techniqueOptions = model.techniqueOptions.map((item) => option(item, model.filters.technique, item)).join('');

  return `
    <section class="section-intro">
      <p class="eyebrow">Catalog</p>
      <h1>Prompting Knowledge Catalog</h1>
      <p>Use filters to narrow the collection, then read entries in a single linear stream.</p>
    </section>
    <section class="filter-panel linear-panel">
      <label>
        Search
        <input id="library-search" type="search" value="${escapeHtml(model.filters.search)}" placeholder="Search by task, pattern, or risk">
      </label>
      <label>
        Task type
        <select id="library-task-filter">
          ${option('all', model.filters.task, 'All')}
          ${taskOptions}
        </select>
      </label>
      <label>
        Technique
        <select id="library-technique-filter">
          ${option('all', model.filters.technique, 'All')}
          ${techniqueOptions}
        </select>
      </label>
      <label>
        Page type
        <select id="library-type-filter">
          ${option('all', model.filters.contentType, 'All')}
          ${option('pattern', model.filters.contentType, 'Pattern')}
          ${option('use_case', model.filters.contentType, 'Use Case')}
          ${option('concept', model.filters.contentType, 'Concept')}
          ${option('provider_note', model.filters.contentType, 'Provider Note')}
          ${option('eval', model.filters.contentType, 'Eval')}
          ${option('safety', model.filters.contentType, 'Safety')}
          ${option('reference', model.filters.contentType, 'Reference')}
        </select>
      </label>
    </section>
    <section class="linear-panel">
      <p class="results-count">${model.pages.length} results</p>
      <div class="catalog-stack">${cards || '<p class="empty-state">No pages match the current filters.</p>'}</div>
    </section>
  `;
}
