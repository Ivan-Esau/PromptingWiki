import type { ReferenceItem } from '../../types/content';
import { escapeHtml } from '../../utils/markdown';

function sourceLabel(sourceType: ReferenceItem['source_type']): string {
  if (sourceType === 'doc') return 'Doc';
  if (sourceType === 'paper') return 'Paper';
  return 'Standard';
}

export function renderReferenceList(references: ReferenceItem[]): string {
  if (references.length === 0) {
    return '<p class="empty-state">No references listed.</p>';
  }

  const items = references
    .map((reference) => {
      return `
        <li>
          <a href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(reference.label)}</a>
          <span class="source-pill">${sourceLabel(reference.source_type)}</span>
        </li>
      `;
    })
    .join('');

  return `<ul class="reference-list">${items}</ul>`;
}
