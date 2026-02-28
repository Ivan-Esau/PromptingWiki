import type { AppContext } from '../context';
import type { LibraryViewModel } from '../viewModels';
import type { LibraryFilters } from '../../domain/models/content';
import { buildTaskOptions, buildTechniqueOptions, matchesLibraryFilters } from '../../domain/services/libraryFilter';
import { getLibraryPages } from '../../domain/services/contentQuery';

export function getLibraryPageData(context: AppContext, filters: LibraryFilters): LibraryViewModel {
  const libraryPages = getLibraryPages(context.pages);
  const filtered = libraryPages.filter((page) => matchesLibraryFilters(page, filters, context.index.searchBySlug.get(page.slug) ?? ''));

  return {
    pages: filtered,
    filters,
    taskOptions: buildTaskOptions(libraryPages),
    techniqueOptions: buildTechniqueOptions(libraryPages)
  };
}
