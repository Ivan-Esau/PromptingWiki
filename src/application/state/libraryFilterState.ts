import type { LibraryFilters } from '../../domain/models/content';
import { defaultLibraryFilters } from '../../domain/services/libraryFilter';

export type LibraryFilterAction =
  | { type: 'set-search'; value: string }
  | { type: 'set-task'; value: string }
  | { type: 'set-technique'; value: string }
  | { type: 'set-content-type'; value: LibraryFilters['contentType'] }
  | { type: 'reset' };

export function createInitialLibraryFilters(): LibraryFilters {
  return defaultLibraryFilters();
}

export function reduceLibraryFilters(state: LibraryFilters, action: LibraryFilterAction): LibraryFilters {
  if (action.type === 'set-search') return { ...state, search: action.value };
  if (action.type === 'set-task') return { ...state, task: action.value };
  if (action.type === 'set-technique') return { ...state, technique: action.value };
  if (action.type === 'set-content-type') return { ...state, contentType: action.value };
  return defaultLibraryFilters();
}
