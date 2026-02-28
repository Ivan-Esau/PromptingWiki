# GitHub Pages Deployment Guide

## Hosting Model
- Host the built Vite site on GitHub Pages using GitHub Actions.
- Keep source on default branch (`main` or `master`).
- Publish `dist/` via workflow artifact deployment (no `gh-pages` branch required).

## One-Time Repository Setup
1. Go to `Settings -> Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to `main` or `master` to trigger `.github/workflows/deploy-pages.yml`.

## Base Path Rules
- `username.github.io` repo deploys from `/`.
- Project repo (for example `PromptingWiki`) deploys from `/<repo>/`.
- `vite.config.ts` auto-detects this from `GITHUB_REPOSITORY`.
- Optional override: add repository variable `VITE_BASE_PATH` (examples: `/`, `/PromptingWiki/`).

## Release Workflow
1. Develop on feature branches.
2. Open PR to default branch.
3. Wait for `CI` workflow to pass.
4. Merge PR to deploy production automatically via `Deploy To GitHub Pages`.
5. If a bad release ships, revert the merge commit and push.

## Recommended Branch Protection
- Require pull request reviews (at least 1).
- Require status checks to pass before merging (`CI`).
- Restrict force pushes on default branch.

## Optional Custom Domain
1. Add `public/CNAME` with your domain.
2. In `Settings -> Pages`, set custom domain and enforce HTTPS.
3. Set repository variable `VITE_BASE_PATH=/` if needed.
