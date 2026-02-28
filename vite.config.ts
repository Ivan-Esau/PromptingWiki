import { defineConfig } from 'vite';

function normalizeBasePath(basePath: string): string {
  const trimmed = basePath.trim();
  if (!trimmed || trimmed === '/') return '/';
  const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return `/${withoutSlashes}/`;
}

function resolveBasePath(): string {
  const configuredBase = process.env.VITE_BASE_PATH;
  if (configuredBase) return normalizeBasePath(configuredBase);

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
