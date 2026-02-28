---
{
  "title": "Prompt Research 2022-2026",
  "slug": "prompt-research-2022-2026",
  "content_type": "reference",
  "summary": "Curated scientific backbone for modern prompting methods from chain-of-thought to prompt optimization frameworks.",
  "tags": ["references", "prompting", "research"],
  "task_type": ["general"],
  "technique": ["cot", "self-consistency", "prompt-optimization"],
  "risk": ["misapplied-techniques"],
  "provider_scope": "neutral",
  "difficulty": "intermediate",
  "last_reviewed": "2026-02-28",
  "references": [
    {
      "label": "Chain-of-Thought Prompting Elicits Reasoning in LLMs (2022)",
      "url": "https://arxiv.org/abs/2201.11903",
      "source_type": "paper"
    },
    {
      "label": "Self-Consistency Improves Chain of Thought Reasoning (2022)",
      "url": "https://arxiv.org/abs/2203.11171",
      "source_type": "paper"
    },
    {
      "label": "Least-to-Most Prompting Enables Complex Reasoning (2022)",
      "url": "https://arxiv.org/abs/2205.10625",
      "source_type": "paper"
    },
    {
      "label": "ReAct: Synergizing Reasoning and Acting in LMs (2022)",
      "url": "https://arxiv.org/abs/2210.03629",
      "source_type": "paper"
    },
    {
      "label": "Tree of Thoughts: Deliberate Problem Solving with LLMs (2023)",
      "url": "https://arxiv.org/abs/2305.10601",
      "source_type": "paper"
    },
    {
      "label": "Optimization by Prompting (OPRO) (2023)",
      "url": "https://arxiv.org/abs/2309.03409",
      "source_type": "paper"
    },
    {
      "label": "DSPy: Compiling Declarative LM Calls into Self-Improving Pipelines (2023)",
      "url": "https://arxiv.org/abs/2310.03714",
      "source_type": "paper"
    },
    {
      "label": "A Systematic Survey of Prompt Engineering in Large Language Models (2024/2025 update)",
      "url": "https://arxiv.org/abs/2402.07927",
      "source_type": "paper"
    }
  ],
  "related_pages": [
    "prompt-structure-fundamentals",
    "few-shot-example-selection",
    "self-refine-reflexion-loop",
    "tool-use-planning-react-tot"
  ]
}
---
# Prompt Research 2022-2026

This page tracks the core scientific progression of prompting methods and how they map to practical production patterns.

## Foundational Reasoning Methods

1. Chain-of-thought established explicit intermediate reasoning as a useful prompting scaffold.
2. Self-consistency improved reliability by sampling and selecting across multiple reasoning paths.
3. Least-to-most prompting formalized decomposition from simpler subproblems to harder targets.

## Planning and Acting Extensions

1. ReAct introduced structured thought-action-observation loops for tool use.
2. Tree of Thoughts introduced deliberate branch exploration before final commitment.
3. These ideas directly support modern agentic prompting and workflow decomposition.

## Prompt Optimization and Compilation

1. OPRO showed that prompts can be optimized as objective-driven artifacts.
2. DSPy reframed prompt engineering as a compilable pipeline with measurable improvements.
3. Survey work in 2024 to 2025 consolidated best practices and failure patterns for practitioners.

## Practical Mapping in This Wiki

Use these papers to inform:

1. Prompt contract design.
2. Iterative refinement loops.
3. Planning prompts for tool-augmented agents.
