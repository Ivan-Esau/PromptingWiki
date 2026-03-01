import type { ReferenceItem } from '../../types/content';
import { escapeHtml } from '../../utils/markdown';

function sourceLabel(sourceType: ReferenceItem['source_type']): string {
  if (sourceType === 'doc') return 'Doc';
  if (sourceType === 'paper') return 'Paper';
  return 'Standard';
}

function extractYear(label: string): string | null {
  const match = label.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : null;
}

export function renderReferenceList(references: ReferenceItem[]): string {
  if (references.length === 0) {
    return '<p class="empty-state">No references listed.</p>';
  }

  const items = references
    .map((reference, index) => {
      const year = reference.year ?? extractYear(reference.label);
      return `
        <li class="reference-record">
          <span class="reference-index">${index + 1}.</span>
          <div class="reference-body">
            <a href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">${escapeHtml(reference.label)}</a>
            <p class="reference-meta-line">
              <span class="source-pill">${sourceLabel(reference.source_type)}</span>
              ${year ? `<span class="source-pill">${year}</span>` : ''}
            </p>
          </div>
        </li>
      `;
    })
    .join('');

  return `<ol class="reference-list">${items}</ol>`;
}
