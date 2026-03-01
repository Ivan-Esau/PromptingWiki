# AI Research Atlas

Scientific library and graph explorer for prompting, LLM, and agentic systems literature.

## Goals

- Track key papers from foundational transformer work to modern agent workflows.
- Show citation flow and topic overlap in a single graph.
- Keep the content maintainable through a clear layer split and a validated corpus.

## Architecture

- `src/domain`: core models and graph-building logic.
- `src/application`: use case for transforming papers into UI-ready snapshots.
- `src/infrastructure`: data source and repository implementation (`papers.json`).
- `src/presentation`: DOM renderer and interactive controls.

## Data and References

- Paper metadata is stored in `src/infrastructure/data/papers.json`.
- Every entry includes primary source URLs (arXiv or equivalent).
- Run `npm run validate:data` to check IDs, references, and URLs before commit.

## Development

```bash
npm install
npm run validate:data
npm run dev
```

## Build

```bash
npm run build
```
