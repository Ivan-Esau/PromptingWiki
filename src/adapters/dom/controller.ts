import type { LibraryFilters } from '../../domain/models/content';

export interface DomControllerHandlers {
  onSearchInput: (value: string) => void;
  onTaskFilterChange: (value: string) => void;
  onTechniqueFilterChange: (value: string) => void;
  onTypeFilterChange: (value: LibraryFilters['contentType']) => void;
  onTocNavigate: (id: string) => void;
  onMenuToggle: () => void;
}

export function bindDomController(root: HTMLElement, handlers: DomControllerHandlers): void {
  const searchInput = root.querySelector<HTMLInputElement>('#library-search');
  const taskSelect = root.querySelector<HTMLSelectElement>('#library-task-filter');
  const techniqueSelect = root.querySelector<HTMLSelectElement>('#library-technique-filter');
  const typeSelect = root.querySelector<HTMLSelectElement>('#library-type-filter');
  const tocButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-toc-target]'));
  const menuToggle = root.querySelector<HTMLButtonElement>('[data-menu-toggle]');

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      handlers.onSearchInput((event.target as HTMLInputElement).value);
    });
  }

  if (taskSelect) {
    taskSelect.addEventListener('change', (event) => {
      handlers.onTaskFilterChange((event.target as HTMLSelectElement).value);
    });
  }

  if (techniqueSelect) {
    techniqueSelect.addEventListener('change', (event) => {
      handlers.onTechniqueFilterChange((event.target as HTMLSelectElement).value);
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', (event) => {
      handlers.onTypeFilterChange((event.target as HTMLSelectElement).value as LibraryFilters['contentType']);
    });
  }

  for (const button of tocButtons) {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-toc-target');
      if (target) handlers.onTocNavigate(target);
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', handlers.onMenuToggle);
  }
}
