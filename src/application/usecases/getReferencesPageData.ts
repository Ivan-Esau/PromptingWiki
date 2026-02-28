import type { AppContext } from '../context';
import type { ReferencesViewModel } from '../viewModels';
import { buildReferenceGraph } from '../../domain/services/referenceGraph';

export function getReferencesPageData(context: AppContext): ReferencesViewModel {
  const referenceNodes = buildReferenceGraph(context.pages);
  const references = referenceNodes.map((node) => ({
    ...node,
    pages: node.pages.map((slug) => context.index.bySlug.get(slug)).filter((item): item is NonNullable<typeof item> => Boolean(item))
  }));
  return { references };
}
