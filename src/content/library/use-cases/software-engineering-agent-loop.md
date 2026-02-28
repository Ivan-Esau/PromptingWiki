---
{
  "title": "Software Engineering Agent Loop",
  "slug": "software-engineering-agent-loop",
  "content_type": "use_case",
  "summary": "A code-agent workflow for issue resolution with test-driven prompting, patch verification, and rollback safety gates.",
  "tags": ["use-case", "software-engineering", "agents"],
  "task_type": ["automation", "coding"],
  "technique": ["decomposition", "test-driven-prompting", "reflective-repair"],
  "risk": ["regression", "incorrect-patch", "unsafe-edits"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (2023)",
      "url": "https://arxiv.org/abs/2310.06770",
      "source_type": "paper"
    },
    {
      "label": "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering (2024)",
      "url": "https://arxiv.org/abs/2405.15793",
      "source_type": "paper"
    },
    {
      "label": "MLGym: A New Framework and Benchmark for Advancing AI Research Agents (2025)",
      "url": "https://arxiv.org/abs/2502.14499",
      "source_type": "paper"
    },
    {
      "label": "AgentBench: Evaluating LLMs as Agents (2023)",
      "url": "https://arxiv.org/abs/2308.03688",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "task-decomposition-for-workflows",
    "self-refine-reflexion-loop",
    "agentic-evaluation-harness",
    "prompt-eval-suite-design"
  ]
}
---
# Software Engineering Agent Loop

## Scenario and Constraints

A coding agent must resolve incoming bug issues with minimal regressions and transparent change rationale.

## Prompt Assembly

```text
Workflow:
1) Reproduce issue from ticket and tests.
2) Propose patch plan with risk estimate.
3) Apply minimal code change.
4) Run targeted and full test suites.
5) If tests fail, enter one repair loop and explain root cause.

Output:
- patch summary
- changed files
- tests executed
- residual risk
```

## Test Set

```text
Use a held-out issue set with:
- small bug fixes
- API compatibility fixes
- flaky or incomplete test scenarios
```

## Expected Output Rubric

1. Issue resolution accuracy (benchmark-defined).
2. Regression rate in unaffected tests.
3. Patch minimality and explainability.

## Observed Failures and Fixes

1. Overly broad refactors. Fix: prompt-level file-scope constraints.
2. Passing local tests but failing integration. Fix: mandatory expanded verification phase.

## Deployment Notes

Use shadow-mode patch proposals first, then gated auto-apply only for low-risk classes.

## References

Combine benchmark-style evaluation with repository-specific guardrails; public benchmarks alone are insufficient.
