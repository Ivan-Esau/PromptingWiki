---
{
  "title": "Prompt Structure Fundamentals",
  "slug": "prompt-structure-fundamentals",
  "content_type": "concept",
  "summary": "How to design a stable prompt contract with objective, context, constraints, and output requirements.",
  "tags": ["fundamentals", "prompt-contract", "instruction-design"],
  "task_type": ["general"],
  "technique": ["instruction-clarity", "constraint-framing"],
  "risk": ["ambiguity", "drift"],
  "provider_scope": "neutral",
  "difficulty": "intro",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "OpenAI Prompting Guide",
      "url": "https://platform.openai.com/docs/guides/prompting",
      "source_type": "doc"
    },
    {
      "label": "Anthropic Prompt Engineering Overview",
      "url": "https://docs.anthropic.com/en/docs/prompt-engineering",
      "source_type": "doc"
    }
  ],
  "related_pages": [
    "output-schema-and-format-control",
    "structured-json-extraction",
    "iteration-loop-with-evals"
  ]
}
---
# Prompt Structure Fundamentals

Reliable prompts behave like contracts rather than prose. A contract defines what the model should do, what context it may use, and what output is acceptable.

## Core Prompt Contract

1. Objective: one explicit task sentence.
2. Context: bounded source material and assumptions.
3. Constraints: style, policy, and refusal boundaries.
4. Output requirements: schema, formatting, and confidence expression.

## Recommended Layout

Use stable section headers inside your prompt so edits do not collapse intent.

```text
Objective:
Context:
Constraints:
Output Format:
Quality Checks:
```

## Common Failure Patterns

1. Mixing instructions and examples without labels.
2. Hiding constraints deep in long context.
3. Asking for strict formatting without providing a schema.

## Practical Rule

Before running any eval, rewrite your prompt to make every instruction testable. If a reviewer cannot verify an instruction from output, the instruction is too vague.
