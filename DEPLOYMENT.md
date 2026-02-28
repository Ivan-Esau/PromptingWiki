# Deployment Guide (GitHub Pages + GitLab Pages)

## Hosting Model
- Host the built Vite site on GitHub Pages (GitHub Actions) or GitLab Pages (GitLab CI).
- Keep source on default branch.
- Publish the Vite `dist/` output directory.

## GitHub One-Time Setup
1. Go to `Settings -> Pages`.
2. Under `Build and deployment`, set `Source` to `GitHub Actions`.
3. Push to `main` or `master` to trigger `.github/workflows/deploy-pages.yml`.

## GitLab One-Time Setup
1. Ensure `.gitlab-ci.yml` exists in the default branch.
2. Push to the default branch to run the `deploy_pages` job.
3. In GitLab, open `Deploy -> Pages` to confirm the published URL.

## Base Path Rules
- `username.github.io` repo deploys from `/`.
- Project repo (for example `PromptingWiki`) deploys from `/<repo>/`.
- `vite.config.ts` auto-detects from `VITE_BASE_PATH` (manual override), `CI_PAGES_URL` (GitLab), and `GITHUB_REPOSITORY` (GitHub).
- Optional override variable examples: `/`, `/PromptingWiki/`, `https://group.gitlab.io/project`.

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
