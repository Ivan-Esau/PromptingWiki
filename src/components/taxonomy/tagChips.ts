import { escapeHtml } from '../../utils/markdown';

export function renderTagChips(tags: string[]): string {
  if (tags.length === 0) return '<p class="empty-state">No tags</p>';
  return tags.map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join('');
}
