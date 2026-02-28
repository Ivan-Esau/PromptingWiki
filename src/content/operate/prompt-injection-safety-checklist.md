---
{
  "title": "Prompt Injection Safety Checklist",
  "slug": "prompt-injection-safety-checklist",
  "content_type": "safety",
  "summary": "Operational checklist for defending prompt pipelines against instruction override, context leakage, and unsafe tool actions.",
  "tags": ["safety", "prompt-injection", "operations"],
  "task_type": ["security", "quality-assurance"],
  "technique": ["instruction-hierarchy", "input-sanitization", "tool-guardrails"],
  "risk": ["prompt-injection", "data-leakage", "unsafe-tool-use"],
  "provider_scope": "neutral",
  "difficulty": "advanced",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OWASP Top 10 for LLM Applications",
      "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      "source_type": "standard"
    },
    {
      "label": "OpenAI Prompt Engineering Guide",
      "url": "https://platform.openai.com/docs/guides/prompt-engineering",
      "source_type": "doc"
    },
    {
      "label": "Prompt Injection Attack against LLM-integrated Applications (2023)",
      "url": "https://arxiv.org/abs/2306.05499",
      "source_type": "paper"
    },
    {
      "label": "The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions (2024)",
      "url": "https://arxiv.org/abs/2404.13208",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "citation-grounded-rag-answering",
    "policy-compliance-checking",
    "prompt-eval-suite-design",
    "agent-memory-privacy-controls",
    "safety-and-jailbreak-research-2023-2026"
  ]
}
---
# Prompt Injection Safety Checklist

## Threat Model

Identify where untrusted instructions can enter:

1. User input fields.
2. Retrieved documents.
3. Tool output from external systems.
4. Browser or web-scraped content.

## Controls

1. Keep trusted instructions in system-level prompt and never concatenate blindly with user text.
2. Label untrusted text boundaries explicitly.
3. Restrict tool permissions with allowlists and parameter validation.
4. Enforce response schema so unsafe outputs can be caught automatically.

## Failure Handling

If injection is detected or suspected:

1. Return a safe abstain response.
2. Log triggering input and model output for incident review.
3. Disable risky tools for the session.
4. Re-run with high-safety prompt profile.

## References

Treat prompt injection as an application security concern, not only a prompting concern. Controls should be layered across prompt, retrieval, and tool execution.
