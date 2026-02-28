---
{
  "title": "Policy Compliance Checking",
  "slug": "policy-compliance-checking",
  "content_type": "use_case",
  "summary": "Evaluate generated or human-authored text against policy controls with citations, risk levels, and escalation triggers.",
  "tags": ["use-case", "compliance", "policy"],
  "task_type": ["classification", "rag", "quality-assurance"],
  "technique": ["rubric-scoring", "grounded-generation", "abstention-policy"],
  "risk": ["false-compliance", "policy-mismatch"],
  "provider_scope": "multi",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OWASP LLM Top 10",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "source_type": "standard"
    },
    {
      "label": "Anthropic Prompt Engineering Overview",
      "url": "https://docs.anthropic.com/en/docs/prompt-engineering",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "citation-grounded-rag-answering",
    "classification-with-rubric",
    "prompt-injection-safety-checklist"
  ]
}
---
# Policy Compliance Checking

## Scenario and Constraints

A moderation team reviews AI-generated outbound content against internal policy. The checker must provide evidence and avoid confident guesses when policy text is missing.

## Prompt Assembly

```text
Input:
- content_to_check
- policy_chunks (id + text)

Output:
- decision: allow | review | block
- violated_rules: policy ids
- rationale: short text
- confidence: 0.00
- abstain: true/false
```

Use `citation-grounded-rag-answering` for evidence mapping and `classification-with-rubric` for severity labels.

## Test Set

Create 75 policy-check examples with balanced allow/review/block outcomes and at least 15 low-evidence cases.

## Expected Output Rubric

1. Policy citation precision >= 95%.
2. False allow rate <= 2%.
3. Abstain behavior triggered correctly when policy context is insufficient.

## Observed Failures and Fixes

1. Blocking on soft language cues. Fix: severity rubric tied to explicit rule IDs.
2. Missing citations in long responses. Fix: enforce max rationale length and required citation array.

## Deployment Notes

Route `block` and `low-confidence review` decisions to human approval until the regression suite remains stable for multiple releases.

## References

Treat policy prompts as controlled artifacts with ownership and change approval, similar to production rulesets.
