---
{
  "title": "Long-Context Summarization",
  "slug": "long-context-summarization",
  "content_type": "pattern",
  "summary": "Summarize long documents using staged constraints and section-level evidence tracking to avoid omission bias.",
  "tags": ["pattern", "summarization", "long-context"],
  "task_type": ["summarization"],
  "technique": ["chunked-summarization", "hierarchical-synthesis"],
  "risk": ["critical-omissions", "hallucinated-summary"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Prompting Guide",
      "url": "https://platform.openai.com/docs/guides/prompting",
      "source_type": "doc"
    },
    {
      "label": "ReAct: Synergizing Reasoning and Acting",
      "url": "https://arxiv.org/abs/2210.03629",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "context-management-and-constraints",
    "document-to-action-items",
    "prompt-eval-suite-design"
  ]
}
---
# Long-Context Summarization

## Problem

Single-pass summarization on large inputs can miss low-frequency but high-impact details.

## Baseline Prompt

```text
Summarize the following report in bullet points.
```

## Improved Prompt

```text
Step 1: Summarize each section separately with evidence quotes.
Step 2: Merge section summaries into a final summary with these headings:
- Key outcomes
- Risks and blockers
- Open decisions

Output rules:
- 5 to 8 bullets total.
- Include at least one explicit risk item.
- Include source section labels for each bullet.
```

## Why It Works

Hierarchical summarization maintains coverage and exposes where each statement comes from.

## Failure Modes

1. Duplicate bullets after synthesis.
2. Over-compression hiding uncertainty.
3. Incorrect section references.

## Eval Setup

Create gold summaries for 20 long documents. Measure fact recall, unsupported claims, and key-risk coverage.

## Cost/Latency Notes

Multi-stage prompts increase latency. Use smaller chunk windows and parallel section summarization where possible.

## References

Treat evidence labeling as mandatory whenever summaries drive downstream decisions.
