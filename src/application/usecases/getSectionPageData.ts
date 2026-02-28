import type { AppContext } from '../context';
import type { SectionViewModel } from '../viewModels';
import type { SectionKey } from '../../domain/models/content';
import { getSectionPages } from '../../domain/services/contentQuery';

export function getSectionPageData(context: AppContext, section: SectionKey): SectionViewModel {
  const meta = context.sections.find((item) => item.key === section);
  if (!meta) {
    throw new Error(`Unknown section "${section}"`);
  }
  return {
    section: meta,
    pages: getSectionPages(context.pages, section)
  };
}
