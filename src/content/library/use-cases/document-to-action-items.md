---
{
  "title": "Document to Action Items",
  "slug": "document-to-action-items",
  "content_type": "use_case",
  "summary": "Turn long meeting notes and project documents into structured action items with owners, deadlines, and uncertainty flags.",
  "tags": ["use-case", "summarization", "action-items"],
  "task_type": ["summarization", "extraction", "transformation"],
  "technique": ["hierarchical-synthesis", "schema-control"],
  "risk": ["missed-actions", "invented-deadlines"],
  "provider_scope": "neutral",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Prompting Guide",
      "url": "https://platform.openai.com/docs/guides/prompting",
      "source_type": "doc"
    },
    {
      "label": "Google Prompt Best Practices",
      "url": "https://ai.google.dev/guide/prompt_best_practices",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "long-context-summarization",
    "structured-json-extraction",
    "output-schema-and-format-control"
  ]
}
---
# Document to Action Items

## Scenario and Constraints

Weekly project notes include decisions, risks, and unresolved tasks. The team needs structured actions without introducing fictional owners or deadlines.

## Prompt Assembly

```text
Stage 1: Section summaries with decision/risk labels.
Stage 2: Action extraction in strict JSON.
Stage 3: Validation pass for missing owner or due date.
```

```json
{
  "action": "string",
  "owner": "string | null",
  "due_date": "YYYY-MM-DD | null",
  "source_quote": "string",
  "confidence": 0.0
}
```

## Test Set

Build a 30-document set with manually curated action lists. Include cases where actions are implied, not explicit.

## Expected Output Rubric

1. Action recall >= 88%.
2. Hallucinated action rate <= 3%.
3. Owner and due-date null handling correct >= 95%.

## Observed Failures and Fixes

1. Inferred deadlines where none existed. Fix: add explicit null requirement.
2. Over-merged action items. Fix: one actionable verb per record.

## Deployment Notes

Show generated actions for human confirmation before syncing to ticketing systems.

## References

Pair this workflow with periodic manual audits to prevent drift in ownership extraction quality.
