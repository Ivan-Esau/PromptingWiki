import type { AppContext } from '../context';
import type { ContentPageViewModel } from '../viewModels';
import { getPageBySlug, getRelatedPages } from '../../domain/services/contentQuery';

export function getContentPageData(context: AppContext, slug: string): ContentPageViewModel | null {
  const page = getPageBySlug(context.index, slug);
  if (!page) return null;

  return {
    page,
    related: getRelatedPages(context.index, page)
  };
}
