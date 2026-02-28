---
{
  "title": "Structured JSON Extraction",
  "slug": "structured-json-extraction",
  "content_type": "pattern",
  "summary": "Extract structured entities from unstructured text using strict schema constraints and deterministic fallback behavior.",
  "tags": ["pattern", "json", "extraction"],
  "task_type": ["extraction", "transformation"],
  "technique": ["schema-control", "field-level-constraints"],
  "risk": ["invalid-json", "missing-fields"],
  "provider_scope": "multi",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Structured Outputs Guide",
      "url": "https://platform.openai.com/docs/guides/structured-outputs",
      "source_type": "doc"
    },
    {
      "label": "Google Prompt Best Practices",
      "url": "https://ai.google.dev/guide/prompt_best_practices",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "output-schema-and-format-control",
    "document-to-action-items",
    "prompt-eval-suite-design"
  ]
}
---
# Structured JSON Extraction

## Problem

Free-form outputs break automation. Teams need deterministic fields from messy input text.

## Baseline Prompt

```text
Extract the important details from this message and return JSON.
```

## Improved Prompt

```text
Objective:
Extract support ticket fields from the input.

Input:
{{ticket_text}}

Output Format (strict JSON only):
{
  "customer_id": "string | null",
  "issue_type": "billing | access | performance | other",
  "priority": "low | medium | high",
  "summary": "string",
  "needs_human_followup": true
}

Rules:
- Return valid JSON only.
- Do not add extra keys.
- If value is missing, return null and explain why in summary.
```

## Why It Works

Schema-enforced prompts reduce structural variance and make parsing failures observable.

## Failure Modes

1. Enum values outside allowed set.
2. Long summaries that hide uncertainty.
3. Null overuse when clues exist in input.

## Eval Setup

Create 40 tickets with known labels. Check parse rate, enum validity, and label accuracy.

## Cost/Latency Notes

Strict outputs may increase token count, but they lower downstream exception handling and retries.

## References

Use schema-native API features where possible, then keep prompt-level schema text as defense-in-depth.
