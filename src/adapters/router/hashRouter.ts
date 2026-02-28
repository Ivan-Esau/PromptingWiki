import type { SectionKey } from '../../domain/models/content';
import type { Route } from '../../domain/models/navigation';

const SECTION_SET = new Set<SectionKey>(['learn', 'library', 'validate', 'operate', 'references', 'glossary']);

export function parseHashRoute(hashValue: string): Route {
  const normalizedHash = hashValue.trim().replace(/^#/, '') || '/';
  const normalizedPath = normalizedHash.startsWith('/') ? normalizedHash : `/${normalizedHash}`;
  const segments = normalizedPath.split('/').filter(Boolean);

  if (segments.length === 0) return { type: 'home' };

  if (segments.length === 1) {
    const section = segments[0] as SectionKey;
    if (SECTION_SET.has(section)) return { type: 'section', section };
  }

  if (segments.length >= 2 && segments[0] === 'page') {
    return { type: 'page', slug: decodeURIComponent(segments.slice(1).join('/')) };
  }

  return { type: 'not-found' };
}

export interface HashRouter {
  getCurrentRoute(): Route;
  navigate(path: string): void;
  subscribe(listener: () => void): () => void;
}

export function createHashRouter(): HashRouter {
  return {
    getCurrentRoute() {
      return parseHashRoute(window.location.hash);
    },
    navigate(path: string) {
      window.location.hash = path.startsWith('/') ? path : `/${path}`;
    },
    subscribe(listener: () => void) {
      window.addEventListener('hashchange', listener);
      return () => {
        window.removeEventListener('hashchange', listener);
      };
    }
  };
}
