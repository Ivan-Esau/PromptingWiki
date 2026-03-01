import { staticPaperRepository } from './infrastructure/repositories/staticPaperRepository';
import { renderAtlasApp } from './presentation/renderers/renderAtlas';

const root = document.querySelector<HTMLElement>('#app');

if (!root) {
  throw new Error('Application root #app was not found.');
}

void renderAtlasApp(root, staticPaperRepository);
