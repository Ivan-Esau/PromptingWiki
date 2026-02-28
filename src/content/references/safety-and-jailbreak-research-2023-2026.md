---
{
  "title": "Safety and Jailbreak Research 2023-2026",
  "slug": "safety-and-jailbreak-research-2023-2026",
  "content_type": "reference",
  "summary": "Research references on prompt injection, jailbreak strategies, instruction hierarchy, and privacy risks in LLM systems.",
  "tags": ["references", "safety", "jailbreak", "security"],
  "task_type": ["security", "quality-assurance"],
  "technique": ["instruction-hierarchy", "adversarial-testing", "defense-in-depth"],
  "risk": ["prompt-injection", "jailbreak", "data-leakage"],
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
      "label": "Universal and Transferable Adversarial Attacks on Aligned Language Models (2023)",
      "url": "https://arxiv.org/abs/2307.15043",
      "source_type": "paper"
    },
    {
      "label": "Jailbreaking Black Box LLMs in Twenty Queries (PAIR) (2023)",
      "url": "https://arxiv.org/abs/2312.02119",
      "source_type": "paper"
    },
    {
      "label": "Many-shot Jailbreaking (2024)",
      "url": "https://arxiv.org/abs/2401.05566",
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
    },
    {
      "label": "OWASP Top 10 for Large Language Model Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "source_type": "standard"
    }
  ],
  "related_pages": [
    "prompt-injection-safety-checklist",
    "agent-memory-privacy-controls",
    "policy-compliance-checking",
    "agentic-evaluation-harness"
  ]
}
---
# Safety and Jailbreak Research 2023-2026

This reference set anchors defensive prompting and agent guardrails in empirical attack and mitigation research.

## Attack Families

1. Prompt injection through untrusted context and tool outputs.
2. Jailbreak optimization attacks against alignment policies.
3. Query-efficient black-box attack strategies.
4. Long-context abuse patterns such as many-shot jailbreaks.

## Defense Directions

1. Instruction hierarchy and privilege separation.
2. Structured output contracts with policy checks.
3. Continuous adversarial evaluation with release gates.
4. Memory and data lifecycle controls for privacy.

## Practical Mapping in This Wiki

Apply these works to:

1. Prompt injection checklists.
2. Agent memory and privacy controls.
3. Safety metrics in agentic eval harnesses.
