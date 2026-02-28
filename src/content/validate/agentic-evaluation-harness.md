---
{
  "title": "Agentic Evaluation Harness",
  "slug": "agentic-evaluation-harness",
  "content_type": "eval",
  "summary": "Design an evaluation harness for agentic systems that combines task success, trace quality, and safety metrics.",
  "tags": ["eval", "agents", "benchmarks", "quality"],
  "task_type": ["agentic", "quality-assurance"],
  "technique": ["benchmark-alignment", "trace-scoring", "safety-scoring"],
  "risk": ["benchmark-overfitting", "hidden-failure-modes"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "HELM: Holistic Evaluation of Language Models (2022)",
      "url": "https://arxiv.org/abs/2211.09110",
      "source_type": "paper"
    },
    {
      "label": "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (2023)",
      "url": "https://arxiv.org/abs/2306.05685",
      "source_type": "paper"
    },
    {
      "label": "GAIA: A Benchmark for General AI Assistants (2023)",
      "url": "https://arxiv.org/abs/2311.12983",
      "source_type": "paper"
    },
    {
      "label": "A Survey on Evaluation of LLM-based Agents (2025)",
      "url": "https://arxiv.org/abs/2503.16416",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "prompt-eval-suite-design",
    "web-agent-task-execution",
    "software-engineering-agent-loop",
    "agent-benchmark-research-2023-2026"
  ]
}
---
# Agentic Evaluation Harness

## What Is Measured

Agentic systems require more than final-answer scoring. Measure:

1. Task success.
2. Action trace correctness.
3. Grounding and citation fidelity.
4. Safety policy adherence.

## Dataset Design

Build a mixed suite:

1. Deterministic tasks with known outputs.
2. Open-ended tasks with rubric scoring.
3. Adversarial tasks targeting tool misuse and injection.

## Scoring Rubric

Use weighted metrics:

1. Outcome success: 35%.
2. Trace quality and reproducibility: 25%.
3. Grounding and evidence quality: 20%.
4. Safety and policy compliance: 20%.

## Regression Procedure

1. Freeze eval tasks per release cycle.
2. Compare candidate agent and baseline on identical seeds.
3. Log trace-level deltas, not only final pass rates.
4. Block releases on severe safety regressions.

## Pass/Fail Thresholds

1. No statistically meaningful drop in task success.
2. Zero critical safety violations.
3. Trace completeness above predefined threshold.

Keep benchmark metrics and production telemetry together to avoid benchmark-only optimization.
