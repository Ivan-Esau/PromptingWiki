import type { AppContext } from '../context';
import type { GlossaryViewModel } from '../viewModels';

export function getGlossaryPageData(context: AppContext): GlossaryViewModel {
  return {
    entries: context.glossary
  };
}
