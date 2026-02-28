# PromptingWiki Architecture

## Overview
The project uses a layered architecture with static content artifacts as the runtime data source.

## Layers
1. `src/domain`
   - Pure models and business rules.
   - No DOM access, no file IO, no JSON imports.
2. `src/application`
   - Use-cases that transform domain data into route-level view models.
   - Orchestrates domain services and repository outputs.
3. `src/infrastructure`
   - Runtime repository adapters for static JSON artifacts.
   - Build-time content pipeline is under `scripts/content`.
4. `src/presentation`
   - Pure render functions (view model -> HTML string).
   - No route parsing or content loading.
5. `src/adapters`
   - Browser integration: hash routing and DOM event binding.
6. `src/app`
   - Composition root and bootstrap wiring.

## Content Pipeline
Build-time content processing is split into:
1. `scripts/content/parse.mjs`
2. `scripts/content/validate.mjs`
3. `scripts/content/index.mjs`
4. `scripts/content/types.mjs`

Entry scripts:
1. `npm run content:validate` -> `scripts/validate-content.mjs`
2. `npm run content:generate` -> `scripts/generate-content.mjs`

Output artifacts:
1. `src/data/content-index.json`
2. `src/data/search-index.json`

## Configuration Sources
Static UI metadata is content-managed:
1. `src/content/_meta/sections.json`
2. `src/content/_meta/glossary.json`
3. `src/content/_meta/home.json`

## Test Strategy
Vitest tests cover:
1. Domain filtering and reference graph behavior.
2. Route parser behavior.
3. Application use-case relation resolution.

## CI Flow
The CI workflow runs:
1. content validation
2. content generation
3. test suite
4. production build

Any contract violation in content fails CI.
