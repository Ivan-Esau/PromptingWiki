import type { AppContext } from '../context';
import type { HomeViewModel } from '../viewModels';
import { getRecommendedPages } from '../../domain/services/contentQuery';

export function getHomePageData(context: AppContext): HomeViewModel {
  return {
    recommended: getRecommendedPages(context.index, context.homeConfig.recommended_slugs)
  };
}
