---
{
  "title": "Agent Memory and Privacy Controls",
  "slug": "agent-memory-privacy-controls",
  "content_type": "safety",
  "summary": "Safety controls for memory-enabled agents, including instruction hierarchy, data minimization, and privacy-preserving traces.",
  "tags": ["safety", "agents", "memory", "privacy"],
  "task_type": ["security", "agentic"],
  "technique": ["instruction-hierarchy", "memory-scoping", "audit-logging"],
  "risk": ["data-leakage", "memory-poisoning", "privilege-escalation"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "Prompt Injection Attack against LLM-integrated Applications (2023)",
      "url": "https://arxiv.org/abs/2306.05499",
      "source_type": "paper"
    },
    {
      "label": "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions (2024)",
      "url": "https://arxiv.org/abs/2404.13208",
      "source_type": "paper"
    },
    {
      "label": "A Survey on Data Leakage in LLMs (2025)",
      "url": "https://arxiv.org/abs/2502.13172",
      "source_type": "paper"
    },
    {
      "label": "A Survey on Privacy in LLMs and AIGC Systems (2025)",
      "url": "https://arxiv.org/abs/2502.08966",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "prompt-injection-safety-checklist",
    "citation-grounded-rag-answering",
    "web-agent-task-execution",
    "safety-and-jailbreak-research-2023-2026"
  ]
}
---
# Agent Memory and Privacy Controls

## Threat Model

Memory-enabled agents introduce additional attack surfaces:

1. Prompt injection into long-term memory.
2. Sensitive data retention beyond intended scope.
3. Retrieval of stale or policy-invalid memory entries.

## Controls

1. Scope memory by task, tenant, and retention window.
2. Store instruction provenance with each memory item.
3. Apply redaction and secret detection before persistence.
4. Enforce instruction hierarchy so untrusted memory cannot override system policy.

## Failure Handling

When memory safety checks fail:

1. Drop or quarantine suspicious memory entries.
2. Return safe fallback output without privileged actions.
3. Trigger audit event with trace hash and policy reason.
4. Require human review before memory is reinstated.

## References

Treat agent memory as regulated data storage with explicit lifecycle, provenance, and deletion guarantees.
