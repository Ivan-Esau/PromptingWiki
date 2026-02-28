---
{
  "title": "Support Triage Automation",
  "slug": "support-triage-automation",
  "content_type": "use_case",
  "summary": "A production-oriented support triage workflow combining extraction, rubric classification, and escalation policies.",
  "tags": ["use-case", "support", "triage"],
  "task_type": ["classification", "extraction", "automation"],
  "technique": ["rubric-scoring", "schema-control", "decomposition"],
  "risk": ["misrouting", "false-priority"],
  "provider_scope": "neutral",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Evals Guide",
      "url": "https://platform.openai.com/docs/guides/evals",
      "source_type": "doc"
    },
    {
      "label": "Anthropic Build Empirical Tests",
      "url": "https://docs.anthropic.com/en/docs/build-with-claude/develop-tests",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "classification-with-rubric",
    "structured-json-extraction",
    "task-decomposition-for-workflows",
    "prompt-eval-suite-design"
  ]
}
---
# Support Triage Automation

## Scenario and Constraints

A support inbox receives mixed billing, outage, and account-access requests. The team needs deterministic queue routing with low false-high-priority rates.

## Prompt Assembly

1. Extract key fields with `structured-json-extraction`.
2. Assign urgency with `classification-with-rubric`.
3. Run final quality gate with `task-decomposition-for-workflows`.

```text
Input: raw ticket text + account metadata.
Output: JSON with issue_type, urgency, routing_queue, escalation_reason.
Hard rule: high urgency requires quoted evidence.
```

## Test Set

```text
120 tickets:
- 40 billing
- 40 access
- 40 product/performance
Include 25 ambiguous cases and 20 intentionally noisy tickets.
```

## Expected Output Rubric

1. Routing queue accuracy >= 92%.
2. High-priority precision >= 90%.
3. JSON parse success = 100%.

## Observed Failures and Fixes

1. False high-priority on emotional language. Fix: require policy trigger phrases.
2. Missing account context. Fix: add metadata section with explicit null behavior.

## Deployment Notes

Ship behind shadow mode first. Compare automation output against human triage for one full week before active routing.

## References

Keep escalation policy versioned with prompt revisions. Policy drift causes silent quality decay.
