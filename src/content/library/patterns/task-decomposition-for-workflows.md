---
{
  "title": "Task Decomposition for Workflows",
  "slug": "task-decomposition-for-workflows",
  "content_type": "pattern",
  "summary": "Break multi-step business tasks into explicit subtasks with intermediate checks before final output generation.",
  "tags": ["pattern", "decomposition", "workflow"],
  "task_type": ["general", "automation"],
  "technique": ["step-planning", "intermediate-validation"],
  "risk": ["skipped-steps", "error-propagation"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "ReAct: Synergizing Reasoning and Acting",
      "url": "https://arxiv.org/abs/2210.03629",
      "source_type": "paper"
    },
    {
      "label": "Large Language Models are Zero-Shot Reasoners",
      "url": "https://arxiv.org/abs/2205.11916",
      "source_type": "paper"
    },
    {
      "label": "Tree of Thoughts: Deliberate Problem Solving with LLMs",
      "url": "https://arxiv.org/abs/2305.10601",
      "source_type": "paper"
    },
    {
      "label": "Plan-and-Solve Prompting",
      "url": "https://arxiv.org/abs/2305.04091",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "few-shot-example-selection",
    "support-triage-automation",
    "document-to-action-items",
    "tool-use-planning-react-tot",
    "agentic-frameworks-research-2023-2026"
  ]
}
---
# Task Decomposition for Workflows

## Problem

Single-prompt workflows can hide reasoning errors and make debugging impossible.

## Baseline Prompt

```text
Read the request and generate the final action plan.
```

## Improved Prompt

```text
Perform this in stages and show each stage output:
1) Intent extraction
2) Constraint detection
3) Action plan generation
4) Quality check against constraints

Return JSON:
{
  "intent": "string",
  "constraints": ["string"],
  "action_plan": ["string"],
  "quality_check": {
    "passes_constraints": true,
    "issues": ["string"]
  }
}
```

## Why It Works

Decomposition makes failures local and testable. Each stage can be evaluated separately.

## Failure Modes

1. Intermediate stages becoming too verbose.
2. Quality check rubber-stamping invalid plans.
3. Downstream systems ignoring stage-level flags.

## Eval Setup

Score stage-level accuracy first, then final plan usefulness. Regression-test each stage independently.

## Cost/Latency Notes

Stage outputs increase tokens but reduce incident triage time by exposing where errors entered.

## References

Use decomposition only when workflow complexity justifies extra latency and review overhead.
