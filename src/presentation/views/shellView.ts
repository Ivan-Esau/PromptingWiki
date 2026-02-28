import type { ContentPage, SectionKey } from '../../domain/models/content';
import type { ShellViewModel } from '../../application/viewModels';
import { escapeHtml } from '../../utils/markdown';

export interface ShellSlots {
  main: string;
  rightRail: string;
  sectionPages: ContentPage[];
}

function renderSectionLink(sectionKey: string, title: string, activeSection: SectionKey | null): string {
  const className = activeSection === sectionKey ? 'section-link active' : 'section-link';
  return `<a href="#/${sectionKey}" class="${className}">${escapeHtml(title)}</a>`;
}

export function renderShellView(model: ShellViewModel, slots: ShellSlots): string {
  const topNav = model.sections
    .map((section) => {
      const active = model.route.type === 'section' && model.route.section === section.key ? 'top-nav-link active' : 'top-nav-link';
      return `<a href="#/${section.key}" class="${active}">${escapeHtml(section.title)}</a>`;
    })
    .join('');

  const sectionNav = model.sections
    .map((section) => renderSectionLink(section.key, section.title, model.activeSection))
    .join('');

  const sectionPagesList = slots.sectionPages
    .slice(0, 12)
    .map((page) => `<li><a href="#/page/${encodeURIComponent(page.slug)}">${escapeHtml(page.title)}</a></li>`)
    .join('');

  return `
    <div class="app-shell">
      <header class="top-header">
        <div class="brand">
          <button type="button" class="menu-toggle" data-menu-toggle aria-label="Toggle menu">Menu</button>
          <a href="#/" class="brand-link">Prompting Wiki</a>
        </div>
        <nav class="top-nav">${topNav}</nav>
      </header>
      <div class="layout-grid">
        <aside class="left-sidebar">
          <section class="side-panel">
            <h2>Explore</h2>
            <p class="side-panel-lead">Move from concept to pattern to evaluated production usage.</p>
            <nav class="section-nav">${sectionNav}</nav>
          </section>
          ${
            sectionPagesList
              ? `<section class="side-panel"><h2>Section Pages</h2><ul class="side-list">${sectionPagesList}</ul></section>`
              : ''
          }
        </aside>
        <main class="content-area">${slots.main}</main>
        <aside class="right-sidebar">${slots.rightRail}</aside>
      </div>
    </div>
  `;
}
