---
{
  "title": "Few-Shot Example Selection",
  "slug": "few-shot-example-selection",
  "content_type": "concept",
  "summary": "How to choose and format few-shot examples that teach behavior without overfitting style or format artifacts.",
  "tags": ["few-shot", "examples", "generalization"],
  "task_type": ["classification", "extraction", "summarization"],
  "technique": ["few-shot", "counterexamples"],
  "risk": ["overfitting", "format-leakage"],
  "provider_scope": "neutral",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "Chain-of-Thought Prompting",
      "url": "https://arxiv.org/abs/2201.11903",
      "source_type": "paper"
    },
    {
      "label": "Self-Consistency Improves Reasoning",
      "url": "https://arxiv.org/abs/2203.11171",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "classification-with-rubric",
    "structured-json-extraction",
    "task-decomposition-for-workflows"
  ]
}
---
# Few-Shot Example Selection

Few-shot prompting should teach intent, not just mimic formatting. Example sets must represent difficult cases, not only clean cases.

## Selection Heuristics

1. Include at least one borderline case.
2. Include at least one negative or abstain case.
3. Keep label distributions realistic.
4. Avoid repeating exact wording from likely live inputs.

## Example Block Pattern

```text
Example 1
Input: ...
Output: ...

Example 2
Input: ...
Output: ...
```

## Anti-Pattern

Using one perfect example creates brittle behavior. The model learns style tokens instead of decision boundaries.

## Review Rule

Rotate examples monthly or when domain language shifts. Stale examples silently reduce production quality.
