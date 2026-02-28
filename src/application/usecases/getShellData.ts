import type { ShellViewModel } from '../viewModels';
import type { AppContext } from '../context';
import type { Route } from '../../domain/models/navigation';

export function getShellData(context: AppContext, route: Route): ShellViewModel {
  const activeSection = route.type === 'section' ? route.section : null;
  return {
    route,
    sections: context.sections,
    activeSection
  };
}
