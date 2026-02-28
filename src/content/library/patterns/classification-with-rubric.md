---
{
  "title": "Classification with Rubric",
  "slug": "classification-with-rubric",
  "content_type": "pattern",
  "summary": "Improve classification consistency by forcing rubric-based decisions with confidence and evidence fields.",
  "tags": ["pattern", "classification", "rubric"],
  "task_type": ["classification"],
  "technique": ["rubric-scoring", "confidence-calibration"],
  "risk": ["label-drift", "false-confidence"],
  "provider_scope": "neutral",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Prompt Engineering Guide",
      "url": "https://platform.openai.com/docs/guides/prompt-engineering",
      "source_type": "doc"
    },
    {
      "label": "Anthropic Define Success Criteria",
      "url": "https://docs.anthropic.com/en/docs/test-and-evaluate/define-success",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "few-shot-example-selection",
    "support-triage-automation",
    "prompt-eval-suite-design"
  ]
}
---
# Classification with Rubric

## Problem

Raw classification prompts often produce unstable labels and unhelpful confidence text.

## Baseline Prompt

```text
Classify the message sentiment and urgency.
```

## Improved Prompt

```text
Task:
Classify each message into one urgency label: low, medium, high.

Rubric:
- high: blocked workflow, outage, legal/security risk, or repeated failed attempts.
- medium: degraded experience but workaround exists.
- low: informational or non-urgent request.

Return JSON:
{
  "urgency": "low | medium | high",
  "confidence": 0.00,
  "evidence": ["quoted phrase 1", "quoted phrase 2"]
}

Rules:
- Use only evidence present in input.
- If evidence is weak, lower confidence.
```

## Why It Works

Rubrics turn abstract labels into explicit criteria and prevent hidden model heuristics from dominating.

## Failure Modes

1. Evidence quotes copied with wrong context.
2. Confidence inflation on ambiguous requests.
3. Class imbalance reducing minority-label recall.

## Eval Setup

Use a labeled dataset with class imbalance metrics: macro-F1, per-class recall, and confidence calibration error.

## Cost/Latency Notes

Evidence and confidence fields add tokens but speed human audit and reduce escalation errors.

## References

Pair this pattern with periodic few-shot refresh to keep rubric interpretation aligned with policy changes.
