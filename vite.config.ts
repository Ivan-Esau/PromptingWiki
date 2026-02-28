import { defineConfig } from 'vite';

function normalizeBasePath(basePath: string): string {
  const trimmed = basePath.trim();
  if (!trimmed || trimmed === '/') return '/';
  if (trimmed.includes('://')) {
    try {
      const parsedPath = new URL(trimmed).pathname;
      return normalizeBasePath(parsedPath);
    } catch {
      return '/';
    }
  }
  const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return `/${withoutSlashes}/`;
}

function resolveBasePath(): string {
  const configuredBase = process.env.VITE_BASE_PATH;
  if (configuredBase) return normalizeBasePath(configuredBase);

  const gitLabPagesUrl = process.env.CI_PAGES_URL;
  if (gitLabPagesUrl) return normalizeBasePath(gitLabPagesUrl);

  const repository = process.env.GITHUB_REPOSITORY;
  if (!repository) return '/';

  const [owner, repo] = repository.split('/');
  if (!owner || !repo) return '/';

  if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) return '/';
  return `/${repo}/`;
}

export default defineConfig({
  base: resolveBasePath()
});
