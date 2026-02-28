---
{
  "title": "Self-Refine and Reflexion Prompt Loop",
  "slug": "self-refine-reflexion-loop",
  "content_type": "pattern",
  "summary": "An iterative prompting pattern where the model critiques its output and revises it against explicit quality rubrics.",
  "tags": ["pattern", "self-improvement", "iteration"],
  "task_type": ["general", "classification", "summarization"],
  "technique": ["self-refine", "reflexion", "critique-loop"],
  "risk": ["error-reinforcement", "verbosity-drift"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "Self-Refine: Iterative Refinement with Self-Feedback (2023)",
      "url": "https://arxiv.org/abs/2303.17651",
      "source_type": "paper"
    },
    {
      "label": "Reflexion: Language Agents with Verbal Reinforcement Learning (2023)",
      "url": "https://arxiv.org/abs/2303.11366",
      "source_type": "paper"
    },
    {
      "label": "Optimization by Prompting (OPRO) (2023)",
      "url": "https://arxiv.org/abs/2309.03409",
      "source_type": "paper"
    },
    {
      "label": "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines (2023)",
      "url": "https://arxiv.org/abs/2310.03714",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "iteration-loop-with-evals",
    "classification-with-rubric",
    "prompt-eval-suite-design",
    "tool-use-planning-react-tot"
  ]
}
---
# Self-Refine and Reflexion Prompt Loop

## Problem

One-pass prompting leaves quality gains unrealized, especially on nuanced reasoning or structured writing tasks.

## Baseline Prompt

```text
Produce the final answer directly.
```

## Improved Prompt

```text
Stage A - Draft:
Generate an initial answer.

Stage B - Critique:
Evaluate the draft against this rubric:
- correctness
- completeness
- policy compliance
- schema validity

Stage C - Revision:
Revise the answer using critique findings.

Return JSON:
{
  "draft": "string",
  "critique": ["string"],
  "final": "string",
  "confidence": 0.0
}
```

## Why It Works

Structured self-critique shifts the model from generation-only mode to detect-and-correct mode before final output.

## Failure Modes

1. Critique copies draft language without real error detection.
2. Revisions increase length but not correctness.
3. Iteration loops overfit style while content errors remain.

## Eval Setup

Measure pre/post revision deltas on fixed tasks with human-verified answers. Track improvements in factual correctness and schema conformance.

## Cost/Latency Notes

Each iteration adds cost. Cap at 1 to 2 refinement rounds unless measurable gains justify more.

## References

Treat self-refine loops as a controlled optimization step with clear stop criteria and measurable gains.
