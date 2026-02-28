import { bindDomController } from '../adapters/dom/controller';
import { createHashRouter } from '../adapters/router/hashRouter';
import { buildAppContext } from '../application/context';
import { createInitialLibraryFilters, reduceLibraryFilters } from '../application/state/libraryFilterState';
import { getContentPageData } from '../application/usecases/getContentPageData';
import { getGlossaryPageData } from '../application/usecases/getGlossaryPageData';
import { getHomePageData } from '../application/usecases/getHomePageData';
import { getLibraryPageData } from '../application/usecases/getLibraryPageData';
import { getReferencesPageData } from '../application/usecases/getReferencesPageData';
import { getSectionPageData } from '../application/usecases/getSectionPageData';
import { getShellData } from '../application/usecases/getShellData';
import type { ContentPage } from '../domain/models/content';
import type { Route } from '../domain/models/navigation';
import { StaticJsonContentRepository } from '../infrastructure/repositories/staticJsonContentRepository';
import { renderGlossaryView } from '../presentation/views/glossaryView';
import { renderHomeView } from '../presentation/views/homeView';
import { renderLibraryView } from '../presentation/views/libraryView';
import { renderNotFoundView } from '../presentation/views/notFoundView';
import { renderPageView } from '../presentation/views/pageView';
import { renderReferencesView } from '../presentation/views/referencesView';
import { renderDefaultRightRail, renderRelatedRightRail } from '../presentation/views/rightRailView';
import { renderSectionView } from '../presentation/views/sectionView';
import { renderShellView } from '../presentation/views/shellView';

interface RenderResult {
  main: string;
  sectionPages: ContentPage[];
  rightRail: string;
}

export function bootstrapApp(): void {
  const root = document.querySelector<HTMLElement>('#app');
  if (!root) return;

  const repository = new StaticJsonContentRepository();
  const context = buildAppContext(repository);
  const router = createHashRouter();
  let libraryFilters = createInitialLibraryFilters();

  const buildView = (route: Route): RenderResult => {
    if (route.type === 'home') {
      return {
        main: renderHomeView(getHomePageData(context), context.sections),
        sectionPages: [],
        rightRail: renderDefaultRightRail()
      };
    }

    if (route.type === 'not-found') {
      return {
        main: renderNotFoundView(),
        sectionPages: [],
        rightRail: renderDefaultRightRail()
      };
    }

    if (route.type === 'section') {
      if (route.section === 'library') {
        const model = getLibraryPageData(context, libraryFilters);
        return {
          main: renderLibraryView(model),
          sectionPages: model.pages,
          rightRail: renderDefaultRightRail()
        };
      }

      if (route.section === 'references') {
        return {
          main: renderReferencesView(getReferencesPageData(context)),
          sectionPages: getSectionPageData(context, route.section).pages,
          rightRail: renderDefaultRightRail()
        };
      }

      if (route.section === 'glossary') {
        return {
          main: renderGlossaryView(getGlossaryPageData(context)),
          sectionPages: getSectionPageData(context, route.section).pages,
          rightRail: renderDefaultRightRail()
        };
      }

      const model = getSectionPageData(context, route.section);
      return {
        main: renderSectionView(model),
        sectionPages: model.pages,
        rightRail: renderDefaultRightRail()
      };
    }

    const pageModel = getContentPageData(context, route.slug);
    if (!pageModel) {
      return {
        main: renderNotFoundView(),
        sectionPages: [],
        rightRail: renderDefaultRightRail()
      };
    }

    return {
      main: renderPageView(pageModel),
      sectionPages: [],
      rightRail: renderRelatedRightRail(pageModel.related)
    };
  };

  const render = () => {
    const route = router.getCurrentRoute();
    const shell = getShellData(context, route);
    const view = buildView(route);

    root.innerHTML = renderShellView(shell, {
      main: view.main,
      sectionPages: view.sectionPages,
      rightRail: view.rightRail
    });

    bindDomController(root, {
      onSearchInput(value) {
        libraryFilters = reduceLibraryFilters(libraryFilters, { type: 'set-search', value });
        render();
      },
      onTaskFilterChange(value) {
        libraryFilters = reduceLibraryFilters(libraryFilters, { type: 'set-task', value });
        render();
      },
      onTechniqueFilterChange(value) {
        libraryFilters = reduceLibraryFilters(libraryFilters, { type: 'set-technique', value });
        render();
      },
      onTypeFilterChange(value) {
        libraryFilters = reduceLibraryFilters(libraryFilters, { type: 'set-content-type', value });
        render();
      },
      onTocNavigate(id) {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      onMenuToggle() {
        document.body.classList.toggle('menu-open');
      }
    });
  };

  if (!window.location.hash) {
    router.navigate('/');
  }

  render();
  router.subscribe(() => {
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}
